import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('Basic With Download', function () {

    before( function() {

    });

    after(() => {

    });

    it('success no params', function(done: Mocha.Done) {
    
        let tp = path.join(__dirname, 'integrationParameters.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        console.log('Test run');
        tr.run();
        console.log('Test Success', tr.succeeded);
        assert.strictEqual(tr.succeeded, true, 'should have succeeded');
        assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
        assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");
        console.log('Test stdout', tr.stdout);
        done();
    });

   
});