document = h:(block_head)? b:(block)*
            {
              return {type: "document", head: (h? h : []), body: (b? b : [])};
            }

block_head = HEAD_TAG KO ht:(sentence_head_tags)* KC
             {
               console.log("Entramos en block_head");
               return (ht)? ht : [];
             }
             
sentence_head_tags = tag:TAG p:(parameters)? t:( KO t:text KC { return t; } )?
                     {
                       console.log("sentence_head_tags");
                       return {type: "head_block", tag: tag, parameters: (p? p : []), content: (t? t : "") };
                     }
                     
parameters = PO p:parameter ps:(SEMICOLON p:parameter { return p; })* PC
             {
               console.log("parameters");
               return [p].concat( ps? ps : [] );
             }
             
parameter = i:ID ':' QUOTE  v:$( ([^"\\] / "\\".)* ) QUOTE
            {
              return {id: i, value: v};
            }

block =  tag:TAG id:ID? classes:(DOT clid:ID { return clid; })* p:(parameters)? body:(SEMICOLON { return null; } / (KO content:(block / text)+ KC { return content; } ))
                     {
                       console.log("bloque :D -> Dani");
                       return {type: "block", tag: tag, id: id, classes: (classes? classes : []), parameters: (p? p : []), content: body };
                     }

text = 't' { console.log("text");  return 't'; }


// Blancos
_           = $[ \t\n\r]*

KO       = _ !("\\") '{' _
KC       = _ !("\\") '}' _

PO       = _ '(' _
PC       = _ ')' _

SEMICOLON = _ ';' _
DOT       = _ '.' _

QUOTE     = _ ["] _

HEAD_TAG = _ !("\\")'@head' _

/*HEAD_TAGS = _  !("\\")'@' t:("style" / "meta" / "base" / "title" / "link" / "script" / "noscript") _
            {
              return { type: 'HEAD TAG', value: t }; 
            }*/
            
TAG = _  !("\\") '@' id:$([a-zA-Z_][a-zA-Z_0-9]*) _
        {
          return { type: 'TAG', value: id }; 
        }
        
ID = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _
       { 
         return { type: 'ID', value: id }; 
       }
