import * as assert from 'assert';
import { ExtensionHelpers } from '../../helpers';

describe('Get Test Assemblies', function () {

    before(function () {

    });

    after(() => {

    });

    const existingArguments = 'my starting arguments';
    let currentPath = __dirname;
    test_GetTestAssemblies('no change',existingArguments, '','',existingArguments);
    let expectedResult = '"' + currentPath + '\\GetTestAssemblies.ts"  ' + existingArguments;
    test_GetTestAssemblies('fail cmd', expectedResult, 'Assemblies.ts',currentPath, existingArguments);

    function test_GetTestAssemblies(testName: string, expectedResult: string, projectPattern: string, targetWorkingDir: string, targetArguments: string) {

        it(testName, function (done: Mocha.Done) {

            // Arrange
            var extensionHelpers = new ExtensionHelpers();

            // Act
           var testAssembilies = extensionHelpers.GetTestAssemblies(projectPattern,targetWorkingDir,targetArguments);

            // Assert
            console.log('Expected: ', expectedResult);
            console.log('pattern: ', projectPattern);
            console.log('working dir: ', targetWorkingDir);
            console.log('target arg: ', targetArguments);
            console.log('Result: ', testAssembilies);
            assert.strictEqual(testAssembilies, expectedResult, 'should match expecting');

            done();
        });
    }

});