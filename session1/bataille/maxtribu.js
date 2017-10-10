const IsoGradRunner = require('../../IsoGradRunner/runner');

var input = [];

function setInput(data) {
    input = data;
}

function isOK(result, expected) {
    return result === parseInt(expected[0]);
}
// IsoGradRunner.run(2, setInput, ContestResponse);
// IsoGradRunner.unitTest(1, setInput, ContestResponse, isOK);
IsoGradRunner.uniTestAll(3, setInput, ContestResponse, isOK);

function ContestResponse() {
    var nbTribu = parseInt(input.shift()), counts = [];

    function countWarrior(tribeId, visited) {
        var t = input[tribeId].split(' '), c = parseInt(t[0]), tid;
        visited.push(tribeId);
        for (var i = 1; i < t.length; i++) {
            tid = parseInt(t[i]);
            if (visited.findIndex(function (e) {
                    return e === tid;
                }) === -1) {
                c += countWarrior(tid, visited);
            }
        }
        return c;
    }

    function getMax(t) {
        var max = 0;
        for (var i = 0; i < t.length; i++) {
            max = t[i] > max ? t[i] : max;
        }
        return max;
    }

    // init
    for (var i = 0; i < input.length; i++) {
        counts.push(countWarrior(i, []));
    }

    var res = getMax(counts);
    console.log(res);
    return res;
}
