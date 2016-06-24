%{
	var sentences = [];
%}

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
"ram"                                    return 'NOUN'
("hates"|"likes")                        return 'VERB'
("tea"|"coffee"|"butter"|"cheese")       return 'OBJECT'
"."                                      return 'FULLSTOP'
<<EOF>>                                  return 'EOF';

/lex

%start sentences

/* language grammar*/
%%

sentences
	:sentence{
		return $$;
	};

sentence
    : NOUN VERB OBJECT FULLSTOP sentence{
		sentences.push({"noun":$1,"verb":$2,"object":[$3]})
		$$ = sentences;
    }
    | EOF;