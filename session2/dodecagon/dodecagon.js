const IsoGradRunner = require('../../IsoGradRunner/runner');

var input = [];

function setInput(data) {
    input = data;
}

// fonction de test pour les TU
// @param expected = réponse attendue sous forme de tableau
function isOK(result, expected) {
    let testCompleted = false;
    // suppression d'un éventuel dernier élement correspondant à une dernière ligne vide dans le fichier output
    if (expected[expected.length - 1] === '') expected.pop(); // oui, c'est moche :(

    // comparer chaque ligne
    for (let i = 0; i < expected.length; i++) {
        // comparaison sous forme de string
        if (result[i].toString() === expected[i]) testCompleted = true;
        else {
            testCompleted = false;
            break;
        }
    }
    return testCompleted;
}

// IsoGradRunner.run(2, setInput, ContestResponse);
// IsoGradRunner.unitTest(3, setInput, ContestResponse, isOK);
IsoGradRunner.uniTestAll(3, setInput, ContestResponse, isOK);

function ContestResponse() {
    var N = parseInt(input[0]);
    var dode = [], motif = '*';

    function initDode(d, n) {
        for (var i = 0; i < n; i++) {
            d[i] = [];
            for (var j = 0; j < n; j++) {
                d[i][j] = '.';
            }
        }
        return d;
    }

    function print(d) {
        for (var i = 0; i < d.length; i++) {
            console.log(d[i].join(''));
        }
    }

    // mise à jour d'un dodecagon d de taille n avec le motif m
    // à partir de l'indice k
    function dodecagon(d, k, n, m) {
        for (var i = k; i < n; i++) {
            for (var j = k; j < n; j++) {
                if (!(i === k && j === k)
                    && !(i === k && j === (n - 1))
                    && !(i === (n - 1) && j === k)
                    && !(i === (n - 1) && j === (n - 1))) {
                    d[i][j] = m;
                }
            }
        }
        return d;
    }

    dode = initDode(dode, N);

    for(var i=N, k=0, n=N;i>=3;i=i-2,k++,n--){
        dodecagon(dode, k, n, motif);
        motif = (motif==='*')?'#':'*';
    }

    print(dode);

    // return pour les tests
    return dode.map(function(e){
          return e.join('');
    });
}