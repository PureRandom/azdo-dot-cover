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
describe('Get Test Assemblies', function () {
    before(function () {
    });
    after(function () {
    });
    var existingArguments = 'my starting arguments';
    var currentPath = __dirname;
    test_GetTestAssemblies('no change', existingArguments, '', '', existingArguments);
    var expectedResult = '"' + currentPath + '/GetTestAssemblies.ts"  ' + existingArguments;
    test_GetTestAssemblies('fail cmd', expectedResult, 'Assemblies.ts', currentPath, existingArguments);
    function test_GetTestAssemblies(testName, expectedResult, projectPattern, targetWorkingDir, targetArguments) {
        it(testName, function (done) {
            // Arrange
            var extensionHelpers = new helpers_1.ExtensionHelpers();
            // Act
            var testAssembilies = extensionHelpers.GetTestAssemblies(projectPattern, targetWorkingDir, targetArguments);
            // Assert
            console.log('Expected: ', expectedResult);
            console.log('pattern: ', projectPattern);
            console.log('working dir: ', targetWorkingDir);
            console.log('target arg: ', targetArguments);
            console.log('Result: ', testAssembilies);
            assert.notStrictEqual(undefined, testAssembilies);
            assert.strictEqual(true, testAssembilies === null || testAssembilies === void 0 ? void 0 : testAssembilies.includes(projectPattern), 'should match expecting');
            done();
        });
    }
});
