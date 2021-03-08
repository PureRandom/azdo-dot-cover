import fs = require('fs');
import https = require('https');
import extractZip = require('extract-zip');
import path = require('path');
import { resolve } from 'q';

/// Extension helpers
export class ExtensionHelpers {

    /// Check value contains content befor returning string value
    NamePairCheck(name: string, value: string | undefined, addQuotes: boolean) {

        if (value != undefined && value != '') {
            let argument = ' /' + name;
            if (addQuotes == true) {
                argument += '="' + value + '"';
            } else {
                argument += '=' + value;
            }
            console.log(argument);
            return argument;
        } else {
            return '';
        }

    }

    /// Download Dot Cover or get some local repo
    async DownloadDotCover(customDotCoverPath: string | undefined) {

        const DotCoverPath = "CommandLineTools-2020-1-3";
        const download = "/download/"
        let outputLocation = __dirname + download + DotCoverPath;

        // Check if folder exists 
        if (customDotCoverPath != undefined && customDotCoverPath != '') {
            console.debug("Command Line Tools Custom Path: ", customDotCoverPath);
            outputLocation = customDotCoverPath
        }
        else if (fs.existsSync(outputLocation)) {
            console.debug("Command Line Tools Using Existing Download");
        }
        else {
            const downloadFileName = 'JetBrains.dotCover.CommandLineTools.2020.1.3';
            console.log("Downloading Command Line Tools ", downloadFileName);
            if (fs.existsSync(__dirname + download) == false)
                fs.mkdirSync(__dirname + download);
            if (fs.existsSync(outputLocation) == false)
                fs.mkdirSync(outputLocation);

            // Download Command Line Tools
            const url = "https://download.jetbrains.com/resharper/ReSharperUltimate.2020.1.3/" + downloadFileName + ".zip"
            const zipLocation = outputLocation + '.zip';
            await this.download(url, zipLocation).then(async () => {

                // Unzip
                console.debug('extract to ' + outputLocation);
                await extractZip(outputLocation + '.zip', { dir: outputLocation })


                // Remove Zip
                fs.unlink(outputLocation + '.zip', function (err) {
                    if (err) console.debug('Original File not deleted!');
                    console.debug('Original File deleted!');
                });

                console.debug('Output location ' + outputLocation);
                return outputLocation;
            });
        }

        return outputLocation;
    }

    /**
     * Download a resource from `url` to `dest`.
     * @param {string} url - Valid URL to attempt download of resource
     * @param {string} dest - Valid path to save the file.
     * @returns {Promise<void>} - Returns asynchronously when successfully completed download
     */
    download(url: string, dest: string) {
        return new Promise<void>((resolve, reject) => {
            const request = https.get(url, response => {
                console.debug('download response code ', response.statusCode);
                if (response.statusCode === 200) {

                    const file = fs.createWriteStream(dest, { flags: 'wx' });
                    file.on('finish', () => resolve());
                    file.on('error', err => {
                        console.debug('error ', err);
                        file.close();
                        if (err.message === 'EEXIST') reject('File already exists');
                        else fs.unlink(dest, () => reject(err.message)); // Delete temp file
                    });
                    if (fs.existsSync(dest)) {
                        fs.rmdir(dest, { recursive: true }, (err: any) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                    response.pipe(file);
                } else if (response.statusCode === 302 || response.statusCode === 301) {
                    //Recursively follow redirects, only a 200 will resolve.
                    let redirectlocation = '';
                    if (response.headers.location != undefined)
                        redirectlocation = response.headers.location;
                    this.download(redirectlocation, dest).then(() => resolve());
                } else {
                    reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
                }
            });

            request.on('error', err => {
                reject(err.message);
            });
        });
    }

    /// Workout output location
    GetOutputLocation(outputLocation: string | undefined, targetWorkingDir: string | undefined, reportType: string | undefined, outputFilename?: string) {

        if (outputFilename == undefined || outputFilename == '')
            outputFilename = "CodeAnalyseResults";

        if (outputLocation == undefined || outputLocation == '') {
            outputLocation = targetWorkingDir
        }
        else if (outputLocation.includes('.xml') == false && outputLocation.includes('.html') == false) {
            if (outputLocation.substring(outputLocation.length - 1).includes("\\") || outputLocation.substring(outputLocation.length - 1).includes("/")) {
                outputLocation += outputFilename.replace("\\","/") + "." + reportType;
            } else {
                outputLocation += "/" + outputFilename + "." + reportType;
            }
        }
        console.debug('Output Location: ', outputLocation);

        return outputLocation;
    }

    /// run Dot Cover command
    RunDotCoverTask(cmdline: string, callBack: any) {

        console.log("**** - Run Command Line Script.. Starting - **** ");
        const { exec } = require("child_process");

        exec(cmdline, (error: { message: any; }, stdout: any, stderr: any) => {
            if (error) {
                callBack(`error: ${error.message}`, false);
                return;
            }
            if (stderr) {
                callBack(`stderr: ${stderr}`, true);
                return;
            }
            callBack(`stdout: ${stdout}`, true);
        });

        console.log("**** - Run Command Line Script.. Ending - **** ");

    }

    RunDotCoverTaskWrapper(cmdline: string) : Promise<string>{
    return new Promise((resolve, reject) => {
        this.RunDotCoverTask(cmdline,(msg: string, result: boolean) => {
            result ? console.log(msg) : console.error(msg);
            var response = "";
            if (result == false) {
                response = msg;
            } else {
                response =  "Console Completed";
            }
            resolve(response)
        });
    });
}

    /// Get the dynamic Test Assemblies
    GetTestAssemblies(projectPattern: string | undefined, targetWorkingDir: string | undefined, targetArguments: string | undefined) {

        if (projectPattern != undefined && projectPattern != '') {
            const searchPath = targetWorkingDir + '';
            const childItems = this.GetAllFiles(searchPath, new RegExp(projectPattern), undefined, undefined);

            console.log("**** - Fetching list of Test Assembilies.. Begin - **** ");
            let testAssmbilies = "";
            childItems.forEach(file => {
                if (!testAssmbilies.includes(file)) {
                    console.debug("Test Assembilie: ", file);
                    testAssmbilies = testAssmbilies + '\"' + file + '\"' + " "
                }
            });

            targetArguments = testAssmbilies + " " + targetArguments;

            if (testAssmbilies == undefined || testAssmbilies == '') {
                console.error("No Files Found.");
            }

            console.log("**** - Fetching list of Test Assembilies.. End - **** ");
        }

        return targetArguments;

    }

    /// Search Directories
    GetAllFiles(dir: string, regex: RegExp, files: Array<string> | undefined, result: Array<string> | undefined): string[] {
        files = files || fs.readdirSync(dir);
        result = result || [];

        for (let i = 0; i < files.length; i++) {
            let file = path.join(dir, files[i]);
            if (fs.statSync(file).isDirectory()) {
                try {
                    result = this.GetAllFiles(file, regex, fs.readdirSync(file), result);
                } catch (error) {
                    continue;
                }
            } else {
                if (regex.test(file) && result != undefined) {
                    result.push(file);
                }
            }
        }
        return result;
    }

    async RunDotCover(CustomDotCoverPath: string | undefined, TargetWorkingDir: string | undefined, ReportType: string | undefined, DotCoverCommand: string | undefined, ProjectPattern: string | undefined, TargetArguments: string | undefined, TargetExecutable: string | undefined, TempDir: string | undefined, InheritConsole: string | undefined, AnalyseTargetArguments: string | undefined, LogFile: string | undefined, Scope: string | undefined, Filters: string | undefined, AttributeFilters: string | undefined, DisableDefaultFilters: string | undefined, SymbolSearchPaths: string | undefined, AllowSymbolServerAccess: string | undefined, ReturnTargetExitCode: string | undefined, ProcessFilters: string | undefined, HideAutoProperties: string | undefined, CoreInstructionSet: string | undefined)
        : Promise<string>{
        
        // Get Dot Cover Path
        var dotCoverLocation = await this.DownloadDotCover(CustomDotCoverPath);

        // -- Check Output Directory
        var Output = this.GetOutputLocation(Output, TargetWorkingDir, ReportType);

        // Create Command
        console.log("**** - Create Command Line Script.. Starting - **** ");
        let cmdline = dotCoverLocation.replace('zip', '') + '/dotCover.exe ' + DotCoverCommand

        // -- Get Assembilies
        const targetArguments = this.GetTestAssemblies(ProjectPattern, TargetWorkingDir, TargetArguments);

        console.log("**** - Setting options.. Starting - **** ");
        cmdline += this.NamePairCheck("TargetExecutable", TargetExecutable, true);
        cmdline += this.NamePairCheck("TargetWorkingDir", TargetWorkingDir, true);
        cmdline += this.NamePairCheck("TempDir", TempDir, true);
        cmdline += this.NamePairCheck("ReportType", ReportType, true);
        cmdline += this.NamePairCheck("Output", Output, true);
        let argus = this.NamePairCheck("TargetArguments", targetArguments, false);
        cmdline += ' "' + argus.substring(1) + '" '
        cmdline += this.NamePairCheck("InheritConsole", InheritConsole, true);
        cmdline += this.NamePairCheck("AnalyseTargetArguments", AnalyseTargetArguments, true);
        cmdline += this.NamePairCheck("LogFile", LogFile, true);
        cmdline += this.NamePairCheck("Scope", Scope, true);
        cmdline += this.NamePairCheck("Filters", Filters, true);
        cmdline += this.NamePairCheck("AttributeFilters", AttributeFilters, true);
        cmdline += this.NamePairCheck("DisableDefaultFilters", DisableDefaultFilters, true);
        cmdline += this.NamePairCheck("SymbolSearchPaths", SymbolSearchPaths, true);
        cmdline += this.NamePairCheck("AllowSymbolServerAccess", AllowSymbolServerAccess, true);
        cmdline += this.NamePairCheck("ReturnTargetExitCode", ReturnTargetExitCode, true);
        cmdline += this.NamePairCheck("ProcessFilters", ProcessFilters, true);
        cmdline += this.NamePairCheck("HideAutoProperties", HideAutoProperties, true);
        cmdline += this.NamePairCheck("CoreInstructionSet", CoreInstructionSet, false);

        console.log("**** - Setting options.. End - **** ");

        console.debug("command running:", cmdline);

        console.log("**** - Create Command Line Script.. Starting - **** ");

        var resultMessage = "";
        // -- Run Command
        resultMessage = await this.RunDotCoverTaskWrapper(cmdline);
        
        return resultMessage;
    }
}

