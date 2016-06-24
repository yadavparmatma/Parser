var parser = require("./grammar.js").parser;
var fs = require('fs');
var _ = require('lodash');
var inputFile = process.argv[2];

var contents = fs.readFileSync(inputFile,"utf8");
var sentences = parser.parse(contents);

var actBasedSepratedSentences = function(sentences){
    var mapper = sentenceMapper(sentences);
    var seprateSentences = _.map(sentences,mapper);
    return _.compact(seprateSentences);
}

var sentenceMapper = function(sentences){
  return function(sentence,index){
    if(sentences[index+1] && sentence.verb == sentences[index+1].verb){
      sentence.object = sentence.object.concat(sentences[index+1].object);
      return sentence;
    }
  }
}

var getOutputSentences = function (){
  var output = actBasedSepratedSentences(sentences).map(function (sentence) {
      return sentence.noun+' '+sentence.verb+' '+sentence.object.join(' and ') + sentence.fullstop;
  }).join(' ');
  return output;
};

console.log(getOutputSentences());
