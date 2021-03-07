import * as assert from 'assert';
import { ExtensionHelpers } from '../../helpers';
const DotCoverPath = "/CommandLineTools-2020-1-3";
let downloadPath = __dirname + "/download"
let expectedOutputPath = downloadPath + DotCoverPath;
expectedOutputPath = expectedOutputPath.replace('/tests/ExtensionHelper', '').replace('\\tests\\ExtensionHelper', '');
let outputRunningPath = downloadPath + "/../../../" + DotCoverPath;
var fs = require('fs');

function clearDir() {
    var downloadDir = expectedOutputPath.replace('/tests/ExtensionHelper', '')
    console.log('Clear folder', fs.existsSync(downloadDir));
    console.log('Clear folder', downloadDir);
    if (fs.existsSync(downloadDir)) {
        console.log('Clearing download folder');
        fs.rmdir(downloadDir, { recursive: true }, function (err: any) {
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
        const customLocation = 'mylocation/justhere';
        const expectedResult = customLocation;
        const extensionHelpers = new ExtensionHelpers();

        clearDir();
        // Act
        return extensionHelpers.DownloadDotCover(customLocation).then(response => {

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
        const customLocation = '';
        const expectedResult = expectedOutputPath;
        const extensionHelpers = new ExtensionHelpers();


        // Act
        extensionHelpers.DownloadDotCover(customLocation).then(response => {

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