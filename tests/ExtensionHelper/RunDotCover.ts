import * as assert from 'assert';
import { ExtensionHelpers } from '../../helpers';

describe('Run DotCover Full', function () {

    before(function () {

    });

    after(() => {

    });

    test_RunDotCover('success run',"Console Completed");

    function test_RunDotCover(testName: string, expectedResult: string) {

        it(testName, async function () {
            this.timeout(10000);

            // Arrange
            var extensionHelpers = new ExtensionHelpers();

            // Act
            var path = __dirname + '/../testProjects'
            var executable = path + '/bin/Debug/netcoreapp3.1/testProjects.dll'
            const DotCoverCommand = "cover";

            var response = await extensionHelpers.RunDotCover('',path,'JSON',DotCoverCommand,'','',executable,'','','','','','','','','','','','','','').catch(issue => {
                
            console.log('issue: ', issue);
            });
            // Assert
            console.log('Expected response: ', expectedResult);
            console.log('Output Response: ', response);
            //assert.strictEqual(response, expectedResult, 'should match expecting');
           
        });
    }

});