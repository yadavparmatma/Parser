var parser = require("./grammar.js").parser;
var fs = require('fs');
var _ = require('lodash');
var inputFile = process.argv[2];

var contents = fs.readFileSync(inputFile,"utf8");
var sentences = parser.parse(contents);

var actBasedSepratedSentences = function(sentences){
    return _.map(sentences,function(sentence,index){
        if(sentences[index+1]){
            if(sentence.verb == sentences[index+1].verb){
                sentence.object = sentence.object.concat(sentences[index+1].object);
                return sentence;
            }
        }
    });
}
var output = _.compact(actBasedSepratedSentences(sentences)).map(function (sentence) {
    return sentence.noun+' '+sentence.verb+' '+sentence.object.join(' and ') + sentence.fullstop;
}).join(' ');

console.log(output);
