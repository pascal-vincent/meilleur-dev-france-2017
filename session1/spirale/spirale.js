const IsoGradRunner = require('../../IsoGradRunner/runner');

var input = [];

// hack closure pour mettre à jour la variable globale input
function setInput(data) {
    input = data;
}

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
// IsoGradRunner.run(1, setInput, ContestResponse);
// IsoGradRunner.unitTest(1, setInput, ContestResponse, isOK);
IsoGradRunner.uniTestAll(2, setInput, ContestResponse, isOK);

function ContestResponse() {
    // coord centre spirale = (N-1)/2
    var n = input, x = (n - 1) / 2, y = (n - 1) / 2, r = 0, map, invert = -1, xdir = invert, ydir= -invert;

    function initMap(s) {
        var m = [], c = (s-1)/2;
        for (var i = 0; i < s; i++) {
            m[i] = [];
            for (var j = 0; j < s; j++) {
                m[i][j]='=';
            }
        }
        m[c][c] = '#';
        return m;
    }

    function markX(m, x, y, r, dir) {
        var newX = x;
        for(var i=1;i<=r;i++){
            newX = x + (i*dir);
            if(newX >= m.length || newX < 0) return false;
            // console.log('mark : y ' + y + ' x ' + (x + (i*dir)) + ' as #');
            m[y][newX] = '#';
        }
        return true;
    }
    function markY(m, x, y, r, dir) {
        var newY = y;
        for(var i=1;i<=r;i++){
            newY = y + (i*dir);
            if(newY >= m.length || newY < 0) return false;
            // console.log('mark : y ' + y + ' x ' + (x + (i*dir)) + ' as #');
            m[newY][x] = '#';
        }
        return true;
    }

    function printMap(m) {
        var result = [], line;
        for(var i=0;i<m.length;i++){
            line = m[i].join('');
            result.push(line);
            console.log(line);
        }
        return result;
    }

    map = initMap(n);
    // tant qu'on a pas atteind le bord

    // printMap(map);

    while(r<n){
        r++;
        if(!markX(map, x, y, r, xdir) || r>=n) break;
        // printMap(map);
        x += xdir*r;
        xdir *= invert;
        r++;
        if(!markY(map, x, y, r, ydir) || r>=n) break;
        // printMap(map);
        y += ydir*r;
        ydir *= invert;
    }

    return printMap(map);
}