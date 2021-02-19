import * as assert from 'assert';
import { ExtensionHelpers } from '../../helpers';

describe('Name Pair Check', function () {

    before(function () {

    });

    after(() => {

    });

    test_RunDotCoverTask('success cmd',true, 'dir');
    test_RunDotCoverTask('fail cmd', false, 'ls');

    function test_RunDotCoverTask(testName: string, expectedResult: boolean, cmdString: string) {

        it(testName, function (done: Mocha.Done) {

            // Arrange
            var extensionHelpers = new ExtensionHelpers();

            // Act
            extensionHelpers.RunDotCoverTask(cmdString, (msg: string, result: boolean) => {
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