import tl = require('azure-pipelines-task-lib/task');
import { ExtensionHelpers } from './helpers';

async function run() {
    try {

        var extensionHelpers = new ExtensionHelpers();

        // Get the inputs.
        const CoverCommand: string | undefined = tl.getInput('CoverCommand', true);
        const TargetExecutable: string | undefined = tl.getInput('TargetExecutable', true);
        const TargetWorkingDir: string | undefined = tl.getInput('TargetWorkingDir', true);
        let TargetArguments: string | undefined = tl.getInput('TargetArguments', false);
        const ReportType: string | undefined = tl.getInput('ReportType', false);
        let Output: string | undefined = tl.getInput('Output', false);
        let CustomDotCoverPath: string | undefined = tl.getInput('CustomDotCoverPath', false);
        let AdditionalCommands: string | undefined = tl.getInput('AdditionalCommands', false);

        //const ProjectPattern: string | undefined = tl.getInput('ProjectPattern', false);
        //{
        //    "name": "ProjectPattern",
        //    "type": "string",
        //    "label": "Project Pattern",
        //    "defaultValue": "",
        //    "required": false,
        //    "helpMarkDown": "Use this to search the Target Wroking Directory for all file in a pattern",
        //    "groupName": "advanced"
        //},

        var result = await extensionHelpers.RunDotCover(CoverCommand,
            TargetExecutable,
            TargetWorkingDir,
            TargetArguments,
            ReportType,
            Output,
            CustomDotCoverPath,
            AdditionalCommands
        ).catch(issue => {
                
            console.log('issue found: ', issue);
            tl.setResult(tl.TaskResult.Succeeded, issue);
        });

        if (result == "Console Completed") {
            tl.setResult(tl.TaskResult.Failed, result);
        }

    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();