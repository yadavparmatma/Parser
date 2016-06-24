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
        return newSentence.verb == sentence.verb;
    });
};


var getOutputSentences = function (){
  var output = actBasedSepratedSentences(sentences).map(function (sentence) {
      return sentence.noun+' '+sentence.verb+' '+sentence.object.join(' and ') + sentence.fullstop;
  }).join(' ');
  return output;
};

console.log(getOutputSentences());
