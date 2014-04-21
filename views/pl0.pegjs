document = h:(block_head)? b:(block)*
            {
			  return {type: "DOCUMENT", head: (h? h : []), body: (b? b : [])};
			}

block_head = HEAD_TAG KO ht:(sentence_head_tags)* KC
             {
			   console.log("Entramos en block_head");
			   return (ht)? ht : [];
			 }
			 
sentence_head_tags = tag:HEAD_TAGS p:(parameters)? t:( KO t:text KC { return t; } )?
                     {
					   console.log("sentence_head_tags");
					   return {type: tag, parameters: (p? p : []), content: (t? t : "") };
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

block = 'b' { console.log("block"); return 'b'; }

text = 't' { console.log("text");  return 't'; }


// Blancos
_           = $[ \t\n\r]*

KO       = _ !("\\") '{' _
KC       = _ !("\\") '}' _

PO       = _ '(' _
PC       = _ ')' _

SEMICOLON = _ ';' _

QUOTE     = _ ["] _

HEAD_TAG = _ !("\\")'@head' _

HEAD_TAGS = _  !("\\")'@' t:("style" / "meta" / "base" / "title" / "link" / "script" / "noscript") _
            {
			  return { type: 'HEAD TAG', value: t }; 
			}
			
TAG = _  !("\\") '@' id:$([a-zA-Z_][a-zA-Z_0-9]*) _
        {
	      return { type: 'TAG', value: id }; 
	    }
		
ID = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _
       { 
         return { type: 'ID', value: id }; 
       }
