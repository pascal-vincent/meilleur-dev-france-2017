const IsoGradRunner = require('../../IsoGradRunner/runner');

var input = [];

function setInput(data) {
    input = data;
}

// fonction de test pour les TU
// @param expected = réponse attendue sous forme de tableau
function isOK(result, expected) {
    return result === parseInt(expected);
}

IsoGradRunner.run(1, setInput, ContestResponse);
// IsoGradRunner.unitTest(3, setInput, ContestResponse, isOK);
// IsoGradRunner.uniTestAll(5, setInput, ContestResponse, isOK);

function ContestResponse() {
    var N = parseInt(input.shift()),
        count,
        grid = [],
        tracks = [],
        i, j, k;

    function print() {
        console.log('-------------------------------');
        for (var i = 0; i < tracks.length; i++) {
            console.log(tracks[i].join('|'));
        }
    }

    // max du score des cases éligibles voisines
    function score(i, j) {
        var upscore = i > 0 ? tracks[i - 1][j] : 0;
        var leftscore = j > 0 ? tracks[i][j - 1] : 0;
        var uplelftscore = (i > 0 && j > 0) ? tracks[i - 1][j - 1] : 0;
        var max = 0, gate = grid[i][j] === 'X' ? 1 : 0;
        [uplelftscore, leftscore, upscore].forEach(function (e) {
            if (e > max) max = e;
        });
        return max + gate;
    }

    // init grille du parcours
    for (i = 0; i < N; i++) {
        grid.push(input[i].split(''));
    }

    // init tableau qui contiendra le poids de chaque case
    for (i = 0; i < N; i++) {
        tracks[i] = [];
    }

    // l'idée est d'affecter à chaque case un poids
    // le poids étant le plus grand nombre de portes "collectable" jusqu'à ce point
    // on parcours le terrain par étape
    // à chaque étape on étend la découverte du terrain d'une ligne et d'une colonne
    // le poids à retenir pour une case est le plus grand des 3 cases voisines prédécentes 
    // c-a-d les cases par lesquelles on a pu passer : au-dessus, en haut à gauche, à gauche
    for (k = 0; k < N; k++) {
        for (i = 0; i < k; i++) {
            tracks[i][k] = score(i, k);
        }
        for (j = 0; j < k; j++) {
            tracks[k][j] = score(k, j);
        }
        tracks[k][k] = score(k, k);
    }

    print();
    count = tracks[N - 1][N - 1];
    console.log(count);
// return pour les tests
    return count;
}