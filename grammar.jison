/* description: Parses simple present tense and convert to past tense. */

/* lexical grammar */
%lex
%%
    \s+                   /* skip whitespace */
    ("Vijay"|"Parmatma"|"Pooja"|"Srijayanth"|"Dolly")                   return 'NOUN'
    ("drinks"|"plays"|"eats"|"likes")                                   return 'VERB'
    ("water"|"work"|"banana"|"cricket"|"lassi")                         return 'NOUN'
    <<EOF>>                                                             return 'EOF';


/lex

% start sentence

%% /* language grammar*/

sentence
    :NOUN VERB EOF{
        console.log($1,$2)
    }
    |NOUN VERB NOUN EOF{
        console.log($1,$2,$3)
    };

