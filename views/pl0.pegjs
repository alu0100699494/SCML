document = h:(block_head)? b:(block)*
            {
			  return {type: "DOCUMENT", head: (h? h : []), body: (b? b : [])};
			}

block_head = HEAD_TAG KO ht:(sentence_head_tags)* KC
             {
			   return (ht)? ht : [];
			 }
			 
sentence_head_tags = tag:HEAD_TAGS p:(parameters)? text:( KO t:text KC { return t; } )?
                     {
					   return {type: tag, parameters: (p? p : []), content: text};
					 }
					 
parameters = PO p:parameter ps:(SEMICOLON parameter)* PC
             {
			   return [p].concat( ps? ps : [] );
			 }
			 
parameter = /* empty */

block = /* empty */

text = /* empty */


// Blancos
_           = $[ \t\n\r]*

KO       = _ !('\\') '{' _
KC       = _ !('\\') '}' _

PO       = _ '(' _
PC       = _ ')' _

SEMICOLON = _ ';' _

HEAD_TAG = _ !('\\')'@head' _

HEAD_TAGS = _ !('\\') '@' t:("style" / "meta" / "base" / "title" / "link" / "script" / "noscript") _
            {
			  return { type: 'HEAD TAG', value: t }; 
			}
			
TAG = _ !('\\') '@' id:$([a-zA-Z_][a-zA-Z_0-9]*) _
        {
	      return { type: 'TAG', value: id }; 
	    }
		
ID = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _
       { 
         return { type: 'ID', value: id }; 
       }
