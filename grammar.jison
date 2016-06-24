/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
("ram"|"sita")                               return 'NOUN';
("hates"|"likes")                     return 'VERB';
("tea"|"coffee"|"butter"|"cheese"|"biscuits"|"sita"|"ram")		return 'OBJECT'
"."										                return 'FULLSTOP'
<<EOF>>               					      return 'EOF';

/lex

%start Paragraph

/* language grammer */
%%

Paragraph
  :Sentences{
    return $1;
  };

Sentences
  : Sentence
  | Sentences Sentence {
    $$ = ($1).concat($2)
  };

Sentence
	: NOUN VERB OBJECT FULLSTOP{
	   $$ = [{"noun":$1,"verb":$2,"object":[$3],"fullstop":$4}];
	}
	| NOUN VERB NOUN FULLSTOP{
	   $$ = [{"noun":$1,"verb":$2,"object":[$3],"fullstop":$4}];
	}
  	|EOF;
/*OBJECT
	: NOUN {
		$$ = $1;
	};*/
