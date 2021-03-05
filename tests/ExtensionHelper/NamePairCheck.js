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
    var name = 'myName';
    var value = 'myValue';
    test_NamePairCheck('value no quotes', name, value, false, ' /' + name + '=' + value);
    test_NamePairCheck('value with quotes', name, value, true, ' /' + name + '="' + value + '"');
    test_NamePairCheck('no value', name, '', false, '');
    function test_NamePairCheck(testName, name, value, addQuotes, expectedResult) {
        it(testName, function (done) {
            // Arrange
            var extensionHelpers = new helpers_1.ExtensionHelpers();
            // Act
            var namesPaired = extensionHelpers.NamePairCheck(name, value, addQuotes);
            // Assert
            console.log('Expected: ', expectedResult);
            console.log('Paired Names: ', namesPaired);
            assert.strictEqual(namesPaired, expectedResult, 'should match expecting');
            done();
        });
    }
});
