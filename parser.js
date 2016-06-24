var parser = require("./grammar.js").parser;
var fs = require('fs');
var _ = require('lodash');
var inputFile = process.argv[2];

var contents = fs.readFileSync(inputFile,"utf8");
var sentences = parser.parse(contents);

var actBasedSepratedSentences = function(sentences){
    var sentenceSet = [];
    var combiner = combinesameVerbSentence(sentenceSet);
    sentences.forEach(combiner)
    return _.compact(sentenceSet);
};


var combinesameVerbSentence = function (sentenceSet) {
    return function(sentence){
        var index = isSentecePresent(sentenceSet,sentence);
        (index > -1) ? sentenceSet[index].object = _.union(sentenceSet[index].object, sentence.object) :
            sentenceSet.push(sentence);
    };
}

var isSentecePresent = function (sentenceSet,newSentence) {
    return _.findIndex(sentenceSet,function (sentence) {
        return newSentence.verb == sentence.verb && newSentence.noun == sentence.noun;
    });
};

var appendConjuctionAtLast = function (sentence) {
    var lastObj = _.last(sentence.object);
    var combinedObjectExceptLast = sentence.object.slice(0, sentence.object.indexOf(lastObj)).join(',');
    var objectsWithConjuction = sentence.object.length > 1 ?
    combinedObjectExceptLast.concat(' and '+lastObj) : lastObj;
    return sentence.noun+' '+sentence.verb+' '+ objectsWithConjuction+sentence.fullstop;
}

var getOutputSentences = function (){
  var output = actBasedSepratedSentences(sentences).map(function (sentence) {
      return appendConjuctionAtLast(sentence);
  }).join(' ');
  return output;
};

console.log(getOutputSentences());
