/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
("ram"|"sita")                                    return 'noun';
("hates"|"likes")                                 return 'verb';
("tea"|"coffee"|"butter"|"cheese"|"biscuits")	  return 'object';
"also"											  return 'adverb';
"."										          return 'fullStop';
<<EOF>>               					          return 'EOF';

/lex

%start paragraph

/* language grammer */
%%

paragraph
  :sentences{
    return $1;;
  };

sentences
  : sentence
  | sentences sentence {
    $$ = ($1).concat($2)
  };

sentence
	: noun verbPhrase objectPhrase fullStop{
	   $$ = [{"noun":$1,"verb":$2,"object":[$3],"fullstop":$4}];
	}
  |EOF;

verbPhrase
	:verb{
		$$ = {"mainVerb": $1};
	}
	| adverb verb{
		$$ = {"adverb": $1, "mainVerb": $2};
	};

objectPhrase
  : noun {
    $$ = $1;
  }
  | object {
  	$$ = $1;
  };
