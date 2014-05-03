document = h:(block_head)? b:(block)*
         {
           return {type: "document", head: (h? h : []), body: (b? b : [])};
         }

block_head = HEAD_TAG KO ht:(sentence_head_tags)* KC
           {
             return (ht)? ht : [];
           }
             
sentence_head_tags = tag:TAG p:(parameters)? t:( SEMICOLON { return null; } / (KO t:text KC { return t; }) )?
                   {
                     return {type: "head_block", tag: tag, parameters: (p? p : []), content: (t? t : "") };
                   }
                     
parameters = PO p:parameter ps:(COMMA p:parameter { return p; })* PC
           {
             return [p].concat( ps? ps : [] );
           }
             
parameter = i:ID v:(':' QUOTE  $( ([^"\\] / "\\".)* ) QUOTE)?
          {
            return {id: i, value: v? v[2] : null};
          }

block =  tag:TAG id:ID? classes:(DOT clid:ID { return clid; })* p:(parameters)? body:(SEMICOLON { return null; } / (KO content:(block / text)+ KC { return content; } ))
      {
        return {type: "block", tag: tag, id: id, classes: (classes? classes : []), parameters: (p? p : []), content: body };
      }

text = t:(literal / $(!OPEN_LITERAL ( "\\". / [^@}] ) )+ )+
     {
       return {type: "text", content: t };
     }

literal = OPEN_LITERAL l:$(!(CLOSE_LITERAL) . )* CLOSE_LITERAL 
        {
          return l;
        }

// Blancos
_       = COMMENT / [ \t\n\r]* COMMENT?

COMMENT = "/*" ([*]!("/") / [^*])* "*/" _ /
          "//"([^\n\r]![\r\n])*. _

KO       = _ !("\\") '{' _
KC       = _ !("\\") '}' _

OPEN_LITERAL  = _ '(")>' _
CLOSE_LITERAL = _ '<(")' _

PO       = _ '(' _
PC       = _ ')' _

COMMA     = _ ',' _
SEMICOLON = _ ';' _
DOT       = _ '.' _

QUOTE     = _ ["] _

HEAD_TAG = _ !("\\")'@head' _

TAG = _  !("\\") '@' id:$([a-zA-Z_][a-zA-Z_0-9-]*) _
    {
      return { type: 'TAG', value: id }; 
    }

ID = _ id:$([a-zA-Z_][a-zA-Z_0-9-]*) _
   {
     return { type: 'ID', value: id }; 
   }
