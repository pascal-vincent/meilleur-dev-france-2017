const fs = require('fs');

function fileContentAsStringArray(datapath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(datapath, (err, data) => {
            if (err) return reject(err);
            return resolve(data.toString().split('\n'));
        });
    });
}

function run(datasetId, setInput, contestResponse) {
    let dataset = createDataset(datasetId);
    return fileContentAsStringArray(dataset.input)
        // horrible hack pour setter l'input via une closure,
        .then(setInput)
        // ils auraient pas pu passer l'input en paramètre de ContestResponse ...   
        .then(() => contestResponse())
        .catch((err)=>console.log('run error ! ' + err.message));
}

function createDataset(i) {
    return {input: './input' + i + '.txt', output: './output' + i + '.txt'};
}

function unitTest(datasetId, setInput, contestResponse, isOK) {
    let dataset = createDataset(datasetId);
    run(datasetId, setInput, contestResponse)
        .then((result)=> {
            fileContentAsStringArray(dataset.output)
                .then((expectedOutput)=> {
                    // la fonction isOK est à implémenter dans chaque exercice 
                    let testCompleted = isOK(result, expectedOutput);
                    // on sort le stylo rouge quand c'est pas bon
                    let logger = testCompleted ? console.log : console.error;
                    logger('test --- ' + dataset.input + ' -- ' + (testCompleted ? 'OK' : 'KO')
                        + '\ntest --- result :\t\t' + result
                        + '\ntest --- expected :\t\t' + expectedOutput);
                    return testCompleted;
                })
                .catch((err)=>console.log('test error ! ' + err.message));
        });
}

// @param n : nombre de dataset (couple [input/output][num].txt)
function unitTestAll(n, setInput, contestResponse, isOK) {
    for (let i = 1; i <= n; i++) {
        unitTest(i, setInput, contestResponse, isOK);
    }
}

module.exports = {
    run: run,
    unitTest: unitTest,
    uniTestAll: unitTestAll
};