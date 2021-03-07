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
var DotCoverPath = "/CommandLineTools-2020-1-3";
var downloadPath = __dirname + "/download";
var expectedOutputPath = downloadPath + DotCoverPath;
expectedOutputPath = expectedOutputPath.replace('/tests/ExtensionHelper', '').replace('\\tests\\ExtensionHelper', '');
var outputRunningPath = downloadPath + "/../../../" + DotCoverPath;
var fs = require('fs');
function clearDir() {
    var downloadDir = expectedOutputPath.replace('/tests/ExtensionHelper', '');
    console.log('Clear folder', fs.existsSync(downloadDir));
    console.log('Clear folder', downloadDir);
    if (fs.existsSync(downloadDir)) {
        console.log('Clearing download folder');
        fs.rmdir(downloadDir, { recursive: true }, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('Cleared download folder');
        });
    }
}
describe('Dot Cover Download 1', function () {
    it('custom output', function () {
        // Arrange
        var customLocation = 'mylocation/justhere';
        var expectedResult = customLocation;
        var extensionHelpers = new helpers_1.ExtensionHelpers();
        clearDir();
        // Act
        return extensionHelpers.DownloadDotCover(customLocation).then(function (response) {
            // Assert
            console.log('Expected Location: ', expectedResult);
            console.log('Output Location: ', response);
            assert.strictEqual(response, expectedResult, 'should match expecting');
        });
    });
});
describe('Dot Cover Download 2', function () {
    it('download to  output', function (done) {
        this.timeout(10000);
        // Arrange
        var customLocation = '';
        var expectedResult = expectedOutputPath;
        var extensionHelpers = new helpers_1.ExtensionHelpers();
        // Act
        extensionHelpers.DownloadDotCover(customLocation).then(function (response) {
            // Assert
            console.log('Expected Location: ', expectedResult);
            console.log('Output Location: ', response);
            assert.strictEqual(response, expectedResult, 'should match expecting');
            clearDir();
        }).then(done, done);
    });
});
/*
describe('Dot Cover Download 3', function () {

    before(function () {
        clearDir()
    });
    after(function () {
        clearDir()
    });

    it('existing output', function () {

        // Arrange
        const customLocation = '';
        const expectedResult = expectedOutputPath;

        if (!fs.existsSync(outputRunningPath)) {
            fs.mkdirSync(outputRunningPath);
        }

        const extensionHelpers = new ExtensionHelpers();

        // Act
        return extensionHelpers.DownloadDotCover(customLocation).then(response => {

            // Assert
            console.log('Expected Location: ', expectedResult);
            console.log('Output Location: ', response);
            assert.strictEqual(response, expectedResult, 'should match expecting');

        })
    });


});
*/ 
