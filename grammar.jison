/* description: Parses simple present tense and convert to past tense. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
("Vijay"|"Parmatma"|"Pooja"|"Srijayanth"|"Dolly")                   return 'NOUN'
("drinks"|"plays"|"eats"|"likes")                                   return 'VERB'
("water"|"work"|"banana"|"cricket"|"lassi")                         return 'OBJECT'
<<EOF>>                                                             return 'EOF';
/lex

%start sentence

/* language grammar*/
%%

sentenceWithObject
    :NOUN VERB OBJECT sentence{
        console.log($1,$2,$3);
    }
    |NOUN VERB OBJECT{
        console.log($1,$2,$3);
    };

sentence
    : NOUN VERB sentence{
        $$ = $1+' '+$2;
    }
    | NOUN VERB{
        $$ = $1+' '+$2;
    }
    | sentenceWithObject
    |EOF;