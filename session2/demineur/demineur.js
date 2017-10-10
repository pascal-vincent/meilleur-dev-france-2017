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

// IsoGradRunner.run(3, setInput, ContestResponse);
// IsoGradRunner.unitTest(6, setInput, ContestResponse, isOK);
IsoGradRunner.uniTestAll(6, setInput, ContestResponse, isOK);

function ContestResponse() {
    var H = input.shift(), L = input.shift(), grid = [], count;

    function print() {
        for (var i = 0; i < grid.length; i++) {
            console.log(grid[i].join(''));
        }
    }

    function findX() {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 'x') {
                    return {i: i, j: j};
                }
            }
        }
    }

    function isInGrid(p) {
        return (p.i >= 0 && p.i < grid.length && p.j >= 0 && p.j < grid[p.i].length);
    }

    function isBoom(p) {
        if (isInGrid(p)) return grid[p.i][p.j] === '*';
        return false;
    }

    // retourne les points en voisinage de x
    function neighbors(x) {
        var n = [
            {i: x.i - 1, j: x.j - 1}, // upleft
            {i: x.i - 1, j: x.j}, // upmiddle
            {i: x.i - 1, j: x.j + 1}, // upright
            {i: x.i, j: x.j - 1}, // left
            {i: x.i, j: x.j + 1}, // right
            {i: x.i + 1, j: x.j - 1}, // downleft
            {i: x.i + 1, j: x.j}, // downmiddle
            {i: x.i + 1, j: x.j + 1} // downright
        ];

        return n.filter(function (e){
            return isInGrid(e);
        });
    }

    function isMineProximity(p) {
        var n = neighbors(p);
        for(var i=0;i<n.length;i++){
            if(isBoom(n[i])) return true;
        }
        return false;
    }
    
    function isVisited(p, v) {
        for(var i=0;i<v.length;i++){
            if( (v[i].i === p.i) && (v[i].j === p.j)) return true;
        }
        return false;
    }

    function click(x, visited) {
        var c = 0;
        if(isBoom(x) || isVisited(x, visited)) return 0;
        c++;
        visited.push(x);
        // console.log('visited ' + JSON.stringify(x));
        if(!isMineProximity(x)) {
            var n = neighbors(x);
            for(var i=0;i<n.length;i++) {
                c += click(n[i], visited);
            }
        }
        return c;
    }

    // init
    for (var i = 0; i < H; i++) {
        grid.push(input[i].split(''));
    }
    // print();

    count = click(findX(), []);
    console.log(count);

    // return pour les tests
    return count;
}