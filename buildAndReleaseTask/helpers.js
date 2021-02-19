"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionHelpers = void 0;
var fs = require("fs");
var https = require("https");
var extractZip = require("extract-zip");
var path = require("path");
/// Extension helpers
var ExtensionHelpers = /** @class */ (function () {
    function ExtensionHelpers() {
    }
    /// Check value contains content befor returning string value
    ExtensionHelpers.prototype.NamePairCheck = function (name, value, addQuotes) {
        if (value != undefined && value != '') {
            var argument = ' /' + name;
            if (addQuotes == true) {
                argument += '="' + value + '"';
            }
            else {
                argument += '=' + value;
            }
            console.log(argument);
            return argument;
        }
        else {
            return '';
        }
    };
    /// Download Dot Cover or get some local repo
    ExtensionHelpers.prototype.DownloadDotCover = function (customDotCoverPath) {
        return __awaiter(this, void 0, void 0, function () {
            var DotCoverPath, outputLocation, downloadFileName, url, zipLocation;
            var _this = this;
            return __generator(this, function (_a) {
                DotCoverPath = "CommandLineTools-2020-1-3";
                outputLocation = __dirname + "\\download\\" + DotCoverPath;
                // Check if folder exists 
                if (customDotCoverPath != undefined && customDotCoverPath != '') {
                    console.debug("Command Line Tools Custom Path: ", customDotCoverPath);
                    outputLocation = customDotCoverPath;
                }
                else if (fs.existsSync(outputLocation)) {
                    console.debug("Command Line Tools Using Existing Download");
                }
                else {
                    downloadFileName = 'JetBrains.dotCover.CommandLineTools.2020.1.3';
                    console.log("Downloading Command Line Tools ", downloadFileName);
                    url = "https://download.jetbrains.com/resharper/ReSharperUltimate.2020.1.3/" + downloadFileName + ".zip";
                    zipLocation = outputLocation + '.zip';
                    this.download(url, zipLocation).then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // Unzip
                                    console.debug('extract to ' + outputLocation);
                                    return [4 /*yield*/, extractZip(outputLocation + '.zip', { dir: outputLocation })
                                        // Remove Zip
                                    ];
                                case 1:
                                    _a.sent();
                                    // Remove Zip
                                    fs.unlink(outputLocation + '.zip', function (err) {
                                        if (err)
                                            console.debug('Original File not deleted!');
                                        console.debug('Original File deleted!');
                                    });
                                    return [2 /*return*/, outputLocation];
                            }
                        });
                    }); });
                }
                return [2 /*return*/, outputLocation];
            });
        });
    };
    /**
     * Download a resource from `url` to `dest`.
     * @param {string} url - Valid URL to attempt download of resource
     * @param {string} dest - Valid path to save the file.
     * @returns {Promise<void>} - Returns asynchronously when successfully completed download
     */
    ExtensionHelpers.prototype.download = function (url, dest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = https.get(url, function (response) {
                console.debug('download response code ', response.statusCode);
                if (response.statusCode === 200) {
                    var file_1 = fs.createWriteStream(dest, { flags: 'wx' });
                    file_1.on('finish', function () { return resolve(); });
                    file_1.on('error', function (err) {
                        console.debug('error ', err);
                        file_1.close();
                        if (err.message === 'EEXIST')
                            reject('File already exists');
                        else
                            fs.unlink(dest, function () { return reject(err.message); }); // Delete temp file
                    });
                    if (fs.existsSync(dest)) {
                        fs.rmdir(dest, { recursive: true }, function (err) {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                    response.pipe(file_1);
                }
                else if (response.statusCode === 302 || response.statusCode === 301) {
                    //Recursively follow redirects, only a 200 will resolve.
                    var redirectlocation = '';
                    if (response.headers.location != undefined)
                        redirectlocation = response.headers.location;
                    _this.download(redirectlocation, dest).then(function () { return resolve(); });
                }
                else {
                    reject("Server responded with " + response.statusCode + ": " + response.statusMessage);
                }
            });
            request.on('error', function (err) {
                reject(err.message);
            });
        });
    };
    /// Workout output location
    ExtensionHelpers.prototype.GetOutputLocation = function (outputLocation, targetWorkingDir, reportType, outputFilename) {
        if (outputFilename == undefined || outputFilename == '')
            outputFilename = "CodeAnalyseResults";
        if (outputLocation == undefined || outputLocation == '') {
            outputLocation = targetWorkingDir;
        }
        else if (outputLocation.includes('.xml') == false && outputLocation.includes('.html') == false) {
            if (outputLocation.substring(outputLocation.length - 1).includes("\\") || outputLocation.substring(outputLocation.length - 1).includes("/")) {
                outputLocation += outputFilename + "." + reportType;
            }
            else {
                outputLocation += "\\" + outputFilename + "." + reportType;
            }
        }
        console.debug('Output Location: ', outputLocation);
        return outputLocation;
    };
    /// run Dot Cover command
    ExtensionHelpers.prototype.RunDotCoverTask = function (cmdline, callBack) {
        console.log("**** - Run Command Line Script.. Starting - **** ");
        var exec = require("child_process").exec;
        exec(cmdline, function (error, stdout, stderr) {
            if (error) {
                callBack("error: " + error.message, false);
                return;
            }
            if (stderr) {
                callBack("stderr: " + stderr, true);
                return;
            }
            callBack("stdout: " + stdout, true);
        });
        console.log("**** - Run Command Line Script.. Ending - **** ");
    };
    /// Get the dynamic Test Assemblies
    ExtensionHelpers.prototype.GetTestAssemblies = function (projectPattern, targetWorkingDir, targetArguments) {
        if (projectPattern != undefined && projectPattern != '') {
            var searchPath = targetWorkingDir + '';
            var childItems = this.GetAllFiles(searchPath, new RegExp(projectPattern), undefined, undefined);
            console.log("**** - Fetching list of Test Assembilies.. Begin - **** ");
            var testAssmbilies_1 = "";
            childItems.forEach(function (file) {
                if (!testAssmbilies_1.includes(file)) {
                    console.debug("Test Assembilie: ", file);
                    testAssmbilies_1 = testAssmbilies_1 + '\"' + file + '\"' + " ";
                }
            });
            targetArguments = testAssmbilies_1 + " " + targetArguments;
            if (testAssmbilies_1 == undefined || testAssmbilies_1 == '') {
                console.error("No Files Found.");
            }
            console.log("**** - Fetching list of Test Assembilies.. End - **** ");
        }
        return targetArguments;
    };
    /// Search Directories
    ExtensionHelpers.prototype.GetAllFiles = function (dir, regex, files, result) {
        files = files || fs.readdirSync(dir);
        result = result || [];
        for (var i = 0; i < files.length; i++) {
            var file = path.join(dir, files[i]);
            if (fs.statSync(file).isDirectory()) {
                try {
                    result = this.GetAllFiles(file, regex, fs.readdirSync(file), result);
                }
                catch (error) {
                    continue;
                }
            }
            else {
                if (regex.test(file) && result != undefined) {
                    result.push(file);
                }
            }
        }
        return result;
    };
    return ExtensionHelpers;
}());
exports.ExtensionHelpers = ExtensionHelpers;
