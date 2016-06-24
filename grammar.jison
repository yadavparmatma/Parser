/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
("ram")                               return 'NOUN';
("hates"|"likes")                     return 'VERB';
("tea"|"coffee"|"butter"|"cheese"|"biscuits")		return 'OBJECT'
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
  |EOF;
