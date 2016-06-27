var parser = require("./grammar.js").parser;
var fs = require('fs');
var _ = require('lodash');
var inputFile = process.argv[2];

var contents = fs.readFileSync(inputFile,"utf8");
var sentences = _.compact(parser.parse(contents));
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
        return newSentence.verb.mainVerb == sentence.verb.mainVerb && newSentence.noun == sentence.noun;
    });
};

var appendConjuctionAtLast = function (sentence,conjunction) {
    var lastObj = sentence.object.pop();
    var combinedObjects = sentence.object.toString();
    var objectsWithConjuction = sentence.object.length > 0 ?
        combinedObjects.concat(conjunction + lastObj) : lastObj;
    return format(sentence,objectsWithConjuction);
}

var format = function(sentence,objects){
  return [sentence.noun,sentence.verb.mainVerb,objects].join(' ').concat(sentence.fullstop);
}

var generateSymanticError = function (sentence) {
    var sentenceFormat = [sentence.noun,sentence.verb.adverb,sentence.verb.mainVerb, sentence.object.toString()].join(' ');
    return "Symantic Error: \n"+sentenceFormat+" <- also appeared before context.";
}

var getSentences = function (){
    if(sentences[0].error)
        return generateSymanticError(sentences[0].sentence)
    else {
        return actionBasedSentenceSet(sentences).map(function (sentence) {
            return appendConjuctionAtLast(sentence," and ");
        }).join(' ');
    }
};

console.log(getSentences());
