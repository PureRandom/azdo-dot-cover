import tl = require('azure-pipelines-task-lib/task');
import { ExtensionHelpers } from './helpers';

async function run() {
    try {

        var extensionHelpers = new ExtensionHelpers();

        // Get the inputs.
        const TargetExecutable: string | undefined = tl.getInput('TargetExecutable', true);
        let TargetArguments: string | undefined = tl.getInput('TargetArguments', false);
        const TargetWorkingDir: string | undefined = tl.getInput('TargetWorkingDir', true);
        const TempDir: string | undefined = tl.getInput('TempDir', false);
        const ReportType: string | undefined = tl.getInput('ReportType', false);
        let Output: string | undefined = tl.getInput('Output', false);
        const InheritConsole: string | undefined = tl.getInput('InheritConsole', false);
        const AnalyseTargetArguments: string | undefined = tl.getInput('AnalyseTargetArguments', false);
        const Scope: string | undefined = tl.getInput('Scope', false);
        const Filters: string | undefined = tl.getInput('Filters', false);
        const AttributeFilters: string | undefined = tl.getInput('AttributeFilters', false);
        const DisableDefaultFilters: string | undefined = tl.getInput('DisableDefaultFilters', false);
        const SymbolSearchPaths: string | undefined = tl.getInput('SymbolSearchPaths', false);
        const AllowSymbolServerAccess: string | undefined = tl.getInput('AllowSymbolServerAccess', false);
        const ReturnTargetExitCode: string | undefined = tl.getInput('ReturnTargetExitCode', false);
        const ProcessFilters: string | undefined = tl.getInput('ProcessFilters', false);
        const HideAutoProperties: string | undefined = tl.getInput('HideAutoProperties', false);
        const LogFile: string | undefined = tl.getInput('LogFile', false);
        const ProjectPattern: string | undefined = tl.getInput('ProjectPattern', false);
        const CoreInstructionSet: string | undefined = tl.getInput('CoreInstructionSet', false);
        const CustomDotCoverPath: string | undefined = tl.getInput('CustomDotCoverPath', false);

        const DotCoverCommand = "cover";

        // Get Dot Cover Path
        extensionHelpers.DownloadDotCover(CustomDotCoverPath).then(dotCoverLocation => {

            // -- Check Output Directory
            Output = extensionHelpers.GetOutputLocation(Output, TargetWorkingDir, ReportType);

            // Create Command
            console.log("**** - Create Command Line Script.. Starting - **** ");
            let cmdline = dotCoverLocation.replace('zip', '') + '/dotCover.exe ' + DotCoverCommand

            // -- Get Assembilies
            const targetArguments = extensionHelpers.GetTestAssemblies(ProjectPattern, TargetWorkingDir, TargetArguments);

            console.log("**** - Setting options.. Starting - **** ");
            cmdline += extensionHelpers.NamePairCheck("TargetExecutable", TargetExecutable, true);
            cmdline += extensionHelpers.NamePairCheck("TargetWorkingDir", TargetWorkingDir, true);
            cmdline += extensionHelpers.NamePairCheck("TempDir", TempDir, true);
            cmdline += extensionHelpers.NamePairCheck("ReportType", ReportType, true);
            cmdline += extensionHelpers.NamePairCheck("Output", Output, true);
            let argus = extensionHelpers.NamePairCheck("TargetArguments", targetArguments, false);
            cmdline += ' "' + argus.substring(1) + '" '
            cmdline += extensionHelpers.NamePairCheck("InheritConsole", InheritConsole, true);
            cmdline += extensionHelpers.NamePairCheck("AnalyseTargetArguments", AnalyseTargetArguments, true);
            cmdline += extensionHelpers.NamePairCheck("LogFile", LogFile, true);
            cmdline += extensionHelpers.NamePairCheck("Scope", Scope, true);
            cmdline += extensionHelpers.NamePairCheck("Filters", Filters, true);
            cmdline += extensionHelpers.NamePairCheck("AttributeFilters", AttributeFilters, true);
            cmdline += extensionHelpers.NamePairCheck("DisableDefaultFilters", DisableDefaultFilters, true);
            cmdline += extensionHelpers.NamePairCheck("SymbolSearchPaths", SymbolSearchPaths, true);
            cmdline += extensionHelpers.NamePairCheck("AllowSymbolServerAccess", AllowSymbolServerAccess, true);
            cmdline += extensionHelpers.NamePairCheck("ReturnTargetExitCode", ReturnTargetExitCode, true);
            cmdline += extensionHelpers.NamePairCheck("ProcessFilters", ProcessFilters, true);
            cmdline += extensionHelpers.NamePairCheck("HideAutoProperties", HideAutoProperties, true);
            cmdline += extensionHelpers.NamePairCheck("CoreInstructionSet", CoreInstructionSet, false);

            console.log("**** - Setting options.. End - **** ");

            console.debug("command running:", cmdline);

            console.log("**** - Create Command Line Script.. Starting - **** ");

            // -- Run Command
            extensionHelpers.RunDotCoverTask(cmdline, (msg: string, result: boolean) => {
                result ? console.log(msg) : console.error(msg);
                if (result == false) {
                    tl.setResult(tl.TaskResult.Failed, msg);
                } else {
                    tl.setResult(tl.TaskResult.Succeeded, "Console Completed");
                }
            });
        });

    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();