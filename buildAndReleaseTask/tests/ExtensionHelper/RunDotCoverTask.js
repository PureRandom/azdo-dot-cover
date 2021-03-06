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
describe('Name Pair Check', function () {
    before(function () {
    });
    after(function () {
    });
    test_RunDotCoverTask('success cmd', true, 'dir');
    test_RunDotCoverTask('fail cmd', false, 'ls');
    function test_RunDotCoverTask(testName, expectedResult, cmdString) {
        it(testName, function (done) {
            // Arrange
            var extensionHelpers = new helpers_1.ExtensionHelpers();
            // Act
            extensionHelpers.RunDotCoverTask(cmdString, function (msg, result) {
                console.log(msg);
                // Assert
                console.log('Expected: ', expectedResult);
                console.log('cmd string: ', cmdString);
                console.log('Result: ', result);
                assert.strictEqual(result, expectedResult, 'should match expecting');
                done();
            });
        });
    }
});
