var parser = require("./grammar.js").parser;
var fs = require('fs');
var _ = require('lodash');
var inputFile = process.argv[2];

var contents = fs.readFileSync(inputFile,"utf8");
var sentences = parser.parse(contents);

var actionBasedSentenceSet = function(sentences){
    var sentenceSet = [];
    var combiner = findActionBasedSet(sentenceSet);
    sentences.forEach(combiner)
    return _.compact(sentenceSet);
};


var findActionBasedSet = function (sentenceSet) {
    return function(sentence){
        var index = isSentecePresent(sentenceSet,sentence);
        (index > -1) ? sentenceSet[index].object =
        _.union(sentenceSet[index].object, sentence.object) : sentenceSet.push(sentence);
    };
}

var isSentecePresent = function (sentenceSet,newSentence) {
    return _.findIndex(sentenceSet,function (sentence) {
        return newSentence.verb == sentence.verb && newSentence.noun == sentence.noun;
    });
};

var appendConjuctionAtLast = function (sentence,conjunction) {
    var lastObj = sentence.object.pop();
    var combinedObjects = sentence.object.toString();
    var objectsWithConjuction = sentence.object ? combinedObjects.concat(conjunction + lastObj) : lastObj;
    return sentence.noun+' '+sentence.verb+' '+ objectsWithConjuction+sentence.fullstop;
}

var getSentences = function (){
  var output = actionBasedSentenceSet(sentences).map(function (sentence) {
      return appendConjuctionAtLast(sentence," and ");
  });
  return output.join(' ');
};

console.log(getSentences());
