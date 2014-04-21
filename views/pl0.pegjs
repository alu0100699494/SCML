DOCUMENT = h:(BLOCK_HEAD)? b:(BLOCK)*
            {
			  return {type: "DOCUMENT", head: (h? h : []), body: (b? b : [])};
			}



		
HEAD_TAGS = _ !('\')'@'t:("style" / "meta" / "base" / "title" / "link" / "script" / "noscript") _
            {
			  return { type: 'HEAD TAG', value: t }; 
			}

ID = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _
       { 
         return { type: 'ID', value: id }; 
       }
	   
TAG = _ !('\')'@' id:$([a-zA-Z_][a-zA-Z_0-9]*) _
        {
	      return { type: 'TAG', value: id }; 
	    }
