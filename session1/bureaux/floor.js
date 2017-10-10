const IsoGradRunner = require('../../IsoGradRunner/runner');

var input = [];

function setInput(data) {
    input = data;
}

function isOK(result, expected) {
    return result === parseInt(expected[0]);
}
// IsoGradRunner.run(1, setInput, ContestResponse);
// IsoGradRunner.unitTest(1, setInput, ContestResponse, isOK);
IsoGradRunner.uniTestAll(3, setInput, ContestResponse, isOK);


// pas plus de 2 équipes par étages
// une équipe sur un seul étage
// remplir les étages au max
// revient à compter les monomes ou pairs des élements dont la somme est égale à la capacité de l'étage

function ContestResponse() {
    var capEtage = parseInt(input.shift()), nbTeam = parseInt(input.shift()), count = 0, c1, c2;
    for(var i=0;i<input.length;i++){
        c1 = parseInt(input[i]);
        if(c1 == capEtage) {
            count++;
        } else if(c1>0 && c1<capEtage) {
            // on cherche le complément
            for(var j=i+1;j<input.length;j++) {
                c2 = parseInt(input[j]);
                if(c1 + c2 === capEtage) {
                    count++;
                    input[j] = 0;
                    break;
                }
            }
        }
    }
    console.log(count);
    return count;
}
