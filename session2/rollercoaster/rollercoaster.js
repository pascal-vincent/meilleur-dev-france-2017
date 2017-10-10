const IsoGradRunner = require('../../IsoGradRunner/runner');

var input = [];

function setInput(data) {
    input = data;
}

// @param expected = réponse attendue sous forme de tableau
function isOK(result, expected) {
    // on compte simplement le nombre de 'bosses' dans le tableau
    function rollCount(a){
        let count = 0, currentRoll;
        a.reduce(function (lastRoll, current, index){
            currentRoll = (parseInt(a[index])-parseInt(a[index+1]))>0;
            if(currentRoll !== lastRoll) count++;
            return currentRoll;
        }, true);
        return count+1;
    }
    let s1 = rollCount(result.split(' ')), s2 = rollCount(expected[0].split(' '));
    console.log('s1 : ' + s1 + ' s2 : ' + s2);
    return s1 === s2;
}

// IsoGradRunner.run(2, setInput, ContestResponse);
// IsoGradRunner.unitTest(5, setInput, ContestResponse, isOK);
IsoGradRunner.uniTestAll(5, setInput, ContestResponse, isOK);

// on pourrait chercher à maximiser le total des différences entre chaque élément d'input
// mais la solution isograd est simplement d'alterner les hauteurs de poteaux il faut générer un ordre tel que [h1>h2,h2<h3,h3>h4, etc.]
// une solution est d'extraire itérativement les valeurs min et max du tableau input et de reconstituer un tableau de sortie avec les valeurs extraites
function ContestResponse() {
    var nbPot = input.shift(), res = [], r;

    function getMinMax(a) {
        var min = parseInt(input[0]), max = parseInt(input[0]), h;
        for (var i = 0; i < nbPot; i++) {
            h = parseInt(input[i]);
            if (h < min) {
                min = h;
            }
            if (h > max) {
                max = h;
            }
        }
        a = a.filter(function (e) {
            return (parseInt(e) !== min && parseInt(e) !== max);
        });
        return {min: min, max: max, a: a};
    }

    while(input.length>1) {
        r = getMinMax(input);
        input = r.a;
        res.push(r.min);
        res.push(r.max);
    }

    console.log(res.join(' '));

    return res.join(' ');
}