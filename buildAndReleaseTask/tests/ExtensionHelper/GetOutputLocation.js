"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = __importStar(require("assert"));
var helpers_1 = require("../../helpers");
describe('Name Pair Check Success', function () {
    before(function () {
    });
    after(function () {
    });
    var withExtensionPaths = [
        'myoutput/put.xml',
        'myoutput/put.html'
    ];
    withExtensionPaths.forEach(function (element) {
        test_GetOutputLocation('output with correct extention', element, '', '', '', element);
    });
    var targetWorkingDir = 'mylocation/justhere';
    test_GetOutputLocation('no output', '', targetWorkingDir, '', '', targetWorkingDir);
    var noExtensionPaths = [
        ['myoutput/', 'myoutput/'],
        ['myoutput\\', 'myoutput\\'],
        ['myoutput', 'myoutput\\']
    ];
    noExtensionPaths.forEach(function (element) {
        var reportType = 'xml';
        var DefaultOutputFilename = 'DefaultOutputFilename';
        var expectedResult = element[1] + DefaultOutputFilename + '.' + reportType;
        test_GetOutputLocation('output with no extention', element[0], '', reportType, DefaultOutputFilename, expectedResult);
    });
    function test_GetOutputLocation(testName, output, targetWorkingDir, reportType, outputFilename, expectedResult) {
        it(testName, function (done) {
            // Arrange
            var extensionHelpers = new helpers_1.ExtensionHelpers();
            // Act
            var outputlocation = extensionHelpers.GetOutputLocation(output, targetWorkingDir, reportType, outputFilename);
            // Assert
            console.log('Expected: ', expectedResult);
            console.log('output location: ', outputlocation);
            assert.strictEqual(outputlocation, expectedResult, 'should match expecting');
            done();
        });
    }
});
