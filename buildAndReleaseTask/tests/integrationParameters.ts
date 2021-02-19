import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

console.log('running: ');
let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

const CustomDotCoverPath =  path.join(__dirname,'..\\download\\CommandLineTools-2020-1-3');
console.log('download: ' + CustomDotCoverPath);
tmr.setInput('CustomDotCoverPath', CustomDotCoverPath);

const TargetExecutable = 'C:\\Program Files\\dotnet\\dotnet.exe';
console.log('TargetExecutable: ' + TargetExecutable);
tmr.setInput('TargetExecutable',TargetExecutable);

const TargetArguments = path.join(__dirname,'testProjects\\bin\\Debug\\netcoreapp3.1\\testProjects.dll');
console.log('TargetArguments: ' + TargetArguments);
tmr.setInput('TargetArguments',TargetArguments);

const TargetWorkingDir = path.join(__dirname,'..\\download\\TargetWorkingDir');
console.log('TargetWorkingDir: ' + TargetWorkingDir);
tmr.setInput('TargetWorkingDir',TargetWorkingDir);

const Output = path.join(__dirname,'..\\download\\Output');
console.log('Output: ' + Output);
tmr.setInput('Output',Output);

const ReportType = 'xml';
console.log('ReportType: ' + ReportType);
tmr.setInput('ReportType',ReportType);

tmr.run();
