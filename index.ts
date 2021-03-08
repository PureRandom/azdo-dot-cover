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

        var result = await extensionHelpers.RunDotCover(
            CustomDotCoverPath, 
            TargetWorkingDir, 
            ReportType, 
            DotCoverCommand, 
            ProjectPattern, 
            TargetArguments, 
            TargetExecutable,
            TempDir, 
            InheritConsole, 
            AnalyseTargetArguments, 
            LogFile, 
            Scope, 
            Filters, 
            AttributeFilters, 
            DisableDefaultFilters, 
            SymbolSearchPaths, 
            AllowSymbolServerAccess, 
            ReturnTargetExitCode, 
            ProcessFilters, 
            HideAutoProperties, 
            CoreInstructionSet
        )

        if (result == "Console Completed") {
            tl.setResult(tl.TaskResult.Failed, result);
        } else {
            tl.setResult(tl.TaskResult.Succeeded, result);
        }

    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();