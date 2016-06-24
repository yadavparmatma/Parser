var fs =  require("fs");
var parser = require("./grammar.js").parser;
var content = fs.readFileSync('./sentence','utf8');
var parsedConteent = parser.parse(content);
