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
var tl = require("azure-pipelines-task-lib/task");
var helpers_1 = require("./helpers");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var extensionHelpers, TargetExecutable_1, TargetArguments_1, TargetWorkingDir_1, TempDir_1, ReportType_1, Output_1, InheritConsole_1, AnalyseTargetArguments_1, Scope_1, Filters_1, AttributeFilters_1, DisableDefaultFilters_1, SymbolSearchPaths_1, AllowSymbolServerAccess_1, ReturnTargetExitCode_1, ProcessFilters_1, HideAutoProperties_1, LogFile_1, ProjectPattern_1, CoreInstructionSet_1, CustomDotCoverPath, DotCoverCommand_1;
        return __generator(this, function (_a) {
            try {
                extensionHelpers = new helpers_1.ExtensionHelpers();
                TargetExecutable_1 = tl.getInput('TargetExecutable', true);
                TargetArguments_1 = tl.getInput('TargetArguments', false);
                TargetWorkingDir_1 = tl.getInput('TargetWorkingDir', true);
                TempDir_1 = tl.getInput('TempDir', false);
                ReportType_1 = tl.getInput('ReportType', false);
                Output_1 = tl.getInput('Output', false);
                InheritConsole_1 = tl.getInput('InheritConsole', false);
                AnalyseTargetArguments_1 = tl.getInput('AnalyseTargetArguments', false);
                Scope_1 = tl.getInput('Scope', false);
                Filters_1 = tl.getInput('Filters', false);
                AttributeFilters_1 = tl.getInput('AttributeFilters', false);
                DisableDefaultFilters_1 = tl.getInput('DisableDefaultFilters', false);
                SymbolSearchPaths_1 = tl.getInput('SymbolSearchPaths', false);
                AllowSymbolServerAccess_1 = tl.getInput('AllowSymbolServerAccess', false);
                ReturnTargetExitCode_1 = tl.getInput('ReturnTargetExitCode', false);
                ProcessFilters_1 = tl.getInput('ProcessFilters', false);
                HideAutoProperties_1 = tl.getInput('HideAutoProperties', false);
                LogFile_1 = tl.getInput('LogFile', false);
                ProjectPattern_1 = tl.getInput('ProjectPattern', false);
                CoreInstructionSet_1 = tl.getInput('CoreInstructionSet', false);
                CustomDotCoverPath = tl.getInput('CustomDotCoverPath', false);
                DotCoverCommand_1 = "cover";
                // Get Dot Cover Path
                extensionHelpers.DownloadDotCover(CustomDotCoverPath).then(function (dotCoverLocation) {
                    // -- Check Output Directory
                    Output_1 = extensionHelpers.GetOutputLocation(Output_1, TargetWorkingDir_1, ReportType_1);
                    // Create Command
                    console.log("**** - Create Command Line Script.. Starting - **** ");
                    var cmdline = dotCoverLocation.replace('zip', '') + '/dotCover.exe ' + DotCoverCommand_1;
                    // -- Get Assembilies
                    var targetArguments = extensionHelpers.GetTestAssemblies(ProjectPattern_1, TargetWorkingDir_1, TargetArguments_1);
                    console.log("**** - Setting options.. Starting - **** ");
                    cmdline += extensionHelpers.NamePairCheck("TargetExecutable", TargetExecutable_1, true);
                    cmdline += extensionHelpers.NamePairCheck("TargetWorkingDir", TargetWorkingDir_1, true);
                    cmdline += extensionHelpers.NamePairCheck("TempDir", TempDir_1, true);
                    cmdline += extensionHelpers.NamePairCheck("ReportType", ReportType_1, true);
                    cmdline += extensionHelpers.NamePairCheck("Output", Output_1, true);
                    var argus = extensionHelpers.NamePairCheck("TargetArguments", targetArguments, false);
                    cmdline += ' "' + argus.substring(1) + '" ';
                    cmdline += extensionHelpers.NamePairCheck("InheritConsole", InheritConsole_1, true);
                    cmdline += extensionHelpers.NamePairCheck("AnalyseTargetArguments", AnalyseTargetArguments_1, true);
                    cmdline += extensionHelpers.NamePairCheck("LogFile", LogFile_1, true);
                    cmdline += extensionHelpers.NamePairCheck("Scope", Scope_1, true);
                    cmdline += extensionHelpers.NamePairCheck("Filters", Filters_1, true);
                    cmdline += extensionHelpers.NamePairCheck("AttributeFilters", AttributeFilters_1, true);
                    cmdline += extensionHelpers.NamePairCheck("DisableDefaultFilters", DisableDefaultFilters_1, true);
                    cmdline += extensionHelpers.NamePairCheck("SymbolSearchPaths", SymbolSearchPaths_1, true);
                    cmdline += extensionHelpers.NamePairCheck("AllowSymbolServerAccess", AllowSymbolServerAccess_1, true);
                    cmdline += extensionHelpers.NamePairCheck("ReturnTargetExitCode", ReturnTargetExitCode_1, true);
                    cmdline += extensionHelpers.NamePairCheck("ProcessFilters", ProcessFilters_1, true);
                    cmdline += extensionHelpers.NamePairCheck("HideAutoProperties", HideAutoProperties_1, true);
                    cmdline += extensionHelpers.NamePairCheck("CoreInstructionSet", CoreInstructionSet_1, false);
                    console.log("**** - Setting options.. End - **** ");
                    console.debug("command running:", cmdline);
                    console.log("**** - Create Command Line Script.. Starting - **** ");
                    // -- Run Command
                    extensionHelpers.RunDotCoverTask(cmdline, function (msg, result) {
                        result ? console.log(msg) : console.error(msg);
                        if (result == false) {
                            tl.setResult(tl.TaskResult.Failed, msg);
                        }
                        else {
                            tl.setResult(tl.TaskResult.Succeeded, "Console Completed");
                        }
                    });
                });
            }
            catch (err) {
                tl.setResult(tl.TaskResult.Failed, err.message);
            }
            return [2 /*return*/];
        });
    });
}
run();
