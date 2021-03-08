
function importTest(name: string, path: string) {
    describe(name, function () {
        require(path);
    });
}

describe('run Unit Test Suite', function () {

    importTest('Get Output Location', './ExtensionHelper/GetOutputLocation.js');
    importTest('Name Pair Check', './ExtensionHelper/NamePairCheck.js');
    importTest('Dot Cover Download', './ExtensionHelper/DotCoverDownload.js');
    importTest('Run Dot Cover', './ExtensionHelper/RunDotCoverTask.js');
    importTest('Get Test Assemblies', './ExtensionHelper/GetTestAssemblies.js');
    importTest('Get Test Assemblies', './ExtensionHelper/RunDotCover.js');

});