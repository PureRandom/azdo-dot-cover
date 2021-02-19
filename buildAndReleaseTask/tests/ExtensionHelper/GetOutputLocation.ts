import * as assert from 'assert';
import { ExtensionHelpers } from '../../helpers';

describe('Name Pair Check Success', function () {

    before(function () {

    });

    after(() => {

    });

    var withExtensionPaths = [
        'myoutput/put.xml',
        'myoutput/put.html'
    ]
    withExtensionPaths.forEach(element => {
        test_GetOutputLocation('output with correct extention', element, '', '', '', element);
    });

    var targetWorkingDir = 'mylocation/justhere';
    test_GetOutputLocation('no output', '', targetWorkingDir, '', '', targetWorkingDir);

    var noExtensionPaths = [
        ['myoutput/', 'myoutput/'],
        ['myoutput\\', 'myoutput\\'],
        ['myoutput', 'myoutput\\']
    ]
    noExtensionPaths.forEach(element => {
        var reportType = 'xml';
        var DefaultOutputFilename = 'DefaultOutputFilename';
        var expectedResult = element[1] + DefaultOutputFilename + '.' + reportType;
        test_GetOutputLocation('output with no extention', element[0], '', reportType, DefaultOutputFilename, expectedResult);
    });

    function test_GetOutputLocation(testName: string, output: string, targetWorkingDir: string, reportType: string, outputFilename: string, expectedResult: string) {
        it(testName, function (done: Mocha.Done) {

            // Arrange
            var extensionHelpers = new ExtensionHelpers();

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