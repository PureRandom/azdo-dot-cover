import * as assert from 'assert';
import { ExtensionHelpers } from '../../helpers';

describe('Name Pair Check', function () {

    before(function () {

    });

    after(() => {

    });

    var name = 'myName';
    var value = 'myValue'
    test_NamePairCheck('value no quotes', name, value, false, ' /' + name + '=' + value);
    test_NamePairCheck('value with quotes', name, value, true, ' /' + name + '="' + value + '"');
    test_NamePairCheck('no value', name, '', false, '');

    function test_NamePairCheck(testName: string, name: string, value: string, addQuotes: boolean, expectedResult: string) {

        it(testName, function (done: Mocha.Done) {

            // Arrange
            var extensionHelpers = new ExtensionHelpers();

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