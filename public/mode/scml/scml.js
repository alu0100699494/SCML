// LUA mode. Ported to CodeMirror 2 from Franciszek Wawrzak's
// CodeMirror 1 mode.
// highlights keywords, strings, comments (no leveling supported! ("[==[")), tokens, basic indenting

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("scml", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  
  var ID = new RegExp("[a-zA-Z_][a-zA-Z_0-9]*");
  var TAG = new RegExp("@[a-zA-Z_][a-zA-Z_0-9]*");

  return {
    startState: function(basecolumn) {
      return {
        context: "none",
      };
    },
    
    token: function(stream, state) {
      if(state.context == "in_literal")
      {
        if(stream.match("<(\")"))
        {
          state.context = "none";
          return "literal";
        }
        else
        {
          stream.next();
          return "literal";
        }
      }
      else if(state.context == "after_tag")
      {
        if (stream.eatSpace())
          return null;
        else if(stream.match(/[a-zA-Z_][a-zA-Z_0-9]*/, true))
        {
          state.context = "after_id";
          return "builtin";
        }
        else if(stream.match(/[/][*]/))
        {
          while(!stream.match(/[*][/]/) && stream.next() != null );
          return "comment";
        }
        else if(stream.match(/[/][/]/))
        {
          stream.skipToEnd();
          return "comment";
        }
        else
        {
          state.context = "after_id";
          return null;
        }
      }
      else if(state.context == "after_id")
      {
        if (stream.eatSpace())
          return null;
        else if( stream.match(/[.][a-zA-Z_][a-zA-Z_0-9]*/, true) )
        {
          return "class"
        }
        else if(stream.match(/[/][*]/))
        {
          while(!stream.match(/[*][/]/) && stream.next() != null );
          return "comment";
        }
        else if(stream.match(/[/][/]/))
        {
          stream.skipToEnd();
          return "comment";
        }
        else
        {
          state.context = "after_class";
          return null;
        }
      }
      else if(state.context == "after_class")
      {
        // Buscar paréntesis
        if (stream.eatSpace())
          return null;
        else if( stream.match(/[(]/, true) )
        {
          state.context = "in_parenthesis";
          return null;
        }
        else if(stream.match(/[/][*]/))
        {
          while(!stream.match(/[*][/]/) && stream.next() != null );
          return "comment";
        }
        else if(stream.match(/[/][/]/))
        {
          stream.skipToEnd();
          return "comment";
        }
        else
        {
          state.context = "in_parenthesis";
          return null;
        }
      }
      else if(state.context == "in_parenthesis")
      {
        // Buscar paréntesis
        if (stream.eatSpace())
          return null;
        else if( stream.match(/:|,/, true) )
        {
          return null;
        }
        // Cazar con el valor de un atributo
        else if( stream.match(/"((?:[^"\\]|\\.)*)"/, true) )
        {
          return "attrib_value";
        }
        // Cazar con un atributo
        else if( stream.match(/[a-zA-Z_][\-a-zA-Z_0-9]*/, true) )
        {
          return "attrib";
        }
        else if( stream.match(/[)]/, true) )
        {
          state.context = "none";
          return null;
        }
        else if(stream.match(/[/][*]/))
        {
          while(!stream.match(/[*][/]/) && stream.next() != null );
          return "comment";
        }
        else if(stream.match(/[/][/]/))
        {
          stream.skipToEnd();
          return "comment";
        }
        else
        {
          state.context = "none";
          return null;
        }
      }
      else
      {
        if (stream.eatSpace())
          return null;
        else if(stream.match(/(?!\\)@head(?=[\s{;])/, true))  // Cazar con @head
          return "keyword-head";
        else if(stream.match( /(?!\\)@[a-zA-Z_][a-zA-Z_0-9]*/, true )) // Cazar con cualquier tag
        {
          state.context = "after_tag"
          return "keyword";
        }
        else if(stream.match( /[(]\"[)]>/, true )) // Cazar con un literal
        {
          state.context = "in_literal";
          return "literal";
        }
        else if(stream.match(/[/][*]/))
        {
          while(!stream.match(/[*][/]/) && stream.next() != null );
          return "comment";
        }
        else if(stream.match(/[/][/]/))
        {
          stream.skipToEnd();
          return "comment";
        }
        else {
          stream.next()
          return null;
        }
      }
      
      return null;
    }
  }
});

CodeMirror.defineMIME("text/scml", "scml");

});
