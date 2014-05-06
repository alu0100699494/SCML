// Repetición
String.prototype.repeat = function(count) {
  if (count < 1) return '';
  var result = '', pattern = this.valueOf();
  while (count > 0) {
    if (count & 1) result += pattern;
    count >>= 1, pattern += pattern;
  }
  return result;
};


// Adaptador para ser llamado por el usuario
function generate_code (node) {
  return gen_code(node, 0);
}

// Función que genera el código asociado a un nodo del AST. Delega la
// generación del código a la función adecuada.
function gen_code (node, nest) {
  if (!node) return "";

  var code;
  switch (node.type) {
    case 'document':
      code = gen_document_code(node);
      break;
    case 'block':
      code = gen_block_code(node, nest);
      break;
    case 'text':
      code = gen_text_code(node);
      break;
  }

  return code;
}

function gen_document_code (doc) {
  var code = '<!DOCTYPE html>\n<html>\n';

  // HEAD
  if (doc.head) {
    code += '<head>\n';
    for (var i in doc.head)
      code += gen_code(doc.head[i], 1);
    code += '</head>\n';
  }

  // BODY
  code += '<body>\n';
  for (var i in doc.body)
    code += gen_code(doc.body[i], 1);

  if (doc.body.length == 1 && doc.body[0].type == 'text')
    code += '\n';
  code += '</body>\n';

  code += '</html>';

  return code;
}

function gen_block_code (block, nest) {  
  var code = ' '.repeat(nest*2) + '<' + block.tag;

  if (block.id)
    code += ' id="' + block.id + '"';

  if (block.classes) {
    code += ' class="';
    for (var i in block.classes)
      code += block.classes[i].id + ' ';

    code = code.slice(0, -1);
    code += '"';
  }

  if (block.parameters) {
    for (var i in block.parameters) {
      code += ' ' + block.parameters[i].id;

      if (block.parameters[i].value)
        code += '="' + escape_entities(block.parameters[i].value) + '"';
    }
  }

  code += '>';

  var next_nest = 0;
  if (block.content) {
    if (block.content.length > 1 || (block.content[0] && block.content[0].type != 'text')) {
      code += '\n';
      next_nest = nest+1;
    }
    for (var i in block.content)
      code += gen_code(block.content[i], next_nest);
  }

  if (next_nest != 0)
    code += ' '.repeat(nest*2);

  code += '</' + block.tag + '>\n';

  return code;
}

function gen_text_code (text) {
  var code = '';

  if (text.content.length > 1) {
    for (var i in text.content) {
      if (text.content[i].type == 'literal')
        code += escape_entities(text.content[i].content);
      else if (text.content[i].type == 'raw_literal')
        code += text.content[i].content;
      code += '\n';
    }
  }
  else {
    if (text.content[0].type == 'literal')
      code += escape_entities(text.content[0].content);
    else if (text.content[0].type == 'raw_literal')
      code += text.content[0].content;
  }

  return code;
}

function escape_entities (str) {
  var entities = {
   '"': '&quot;',
   '&': '&amp;',
   "'": '&apos;',
   '<': '&lt;',
   '>': '&gt;',
   '¡': '&iexcl;',
   '¢': '&cent',
   '£': '&pound;',
   '¤': '&curren;',
   '¥': '&yen;',
   '¦': '&brvbar;',
   '§': '&sect;',
   '¨': '&uml;',
   '©': '&copy;',
   'ª': '&ordf;',
   '«': '&latquo;',
   '¬': '&not;',
   '®': '&reg;',
   '¯': '&macr;',
   '°': '&deg;',
   '±': '&plusmn;',
   '²': '&sup2;',
   '³': '&sup3;',
   '´': '&acute;',
   'µ': '&micro;',
   '¶': '&para;',
   '·': '&middot;',
   '¸': '&cedil;',
   '¹': '&sup1;',
   'º': '&ordm;',
   '»': '&raquo;',
   '¼': '&frac14;',
   '½': '&frac12;',
   '¾': '&frac34;',
   '¿': '&iquest;',
   'À': '&Agrave;',
   'Á': '&Aacute;',
   'Â': '&Acirc;',
   'Ã': '&Atilde;',
   'Ä': '&Auml;',
   'Å': '&Aring;',
   'Æ': '&AElig;',
   'Ç': '&Ccedil;',
   'È': '&Egrave;',
   'É': '&Eacute;',
   'Ê': '&Ecirc;',
   'Ë': '&Euml;',
   'Ì': '&Igrave;',
   'Í': '&Iacute;',
   'Î': '&Icirc;',
   'Ï': '&Iuml;',
   'Ð': '&ETH;',
   'Ñ': '&Ntilde;',
   'Ò': '&Ograve;',
   'Ó': '&Oacute;',
   'Ô': '&Ocirc;',
   'Õ': '&Otilde;',
   'Ö': '&Ouml;',
   '×': '&times;',
   'Ø': '&Oslash;',
   'Ù': '&Ugrave;',
   'Ú': '&Uacute;',
   'Û': '&Ucirc;',
   'Ü': '&Uuml;',
   'Ý': '&Yacute;',
   'Þ': '&THORN;',
   'ß': '&szlig;',
   'à': '&agrave;',
   'á': '&aacute;',
   'â': '&acirc;',
   'ã': '&atilde;',
   'ä': '&auml;',
   'å': '&aring;',
   'æ': '&aelig;',
   'ç': '&ccedil;',
   'è': '&egrave;',
   'é': '&eacute;',
   'ê': '&ecirc;',
   'ë': '&euml;',
   'ì': '&igrave;',
   'í': '&iacute;',
   'î': '&icirc;',
   'ï': '&iuml;',
   'ð': '&eth;',
   'ñ': '&ntilde;',
   'ò': '&ograve;',
   'ó': '&oacute;',
   'ô': '&ocirc;',
   'õ': '&otilde;',
   'ö': '&ouml;',
   '÷': '&divide;',
   'ø': '&oslash;',
   'ù': '&ugrave;',
   'ú': '&uacute;',
   'û': '&ucirc;',
   'ü': '&uuml;',
   'ý': '&yacute;',
   'þ': '&thorn;',
   'ÿ': '&yuml;',
   'Œ': '&OElig;',
   'œ': '&oelig;',
   'Š': '&Scaron;',
   'š': '&scaron;',
   'Ÿ': '&Yuml;',
   'ƒ': '&fnof;',
   'ˆ': '&circ;',
   '˜': '&tilde;',
   'Γ': '&Gamma;',
   'Δ': '&Delta;',
   'Θ': '&Theta;',
   'Λ': '&Lambda;',
   'Ξ': '&Xi;',
   'Π': '&Pi;',
   'Σ': '&Sigma;',
   'Φ': '&Phi;',
   'Ψ': '&Psi;',
   'Ω': '&Omega;',
   'α': '&alpha;',
   'β': '&beta;',
   'γ': '&gamma;',
   'δ': '&delta;',
   'ε': '&epsilon;',
   'ζ': '&zeta;',
   'η': '&eta;',
   'θ': '&theta;',
   'ι': '&iota;',
   'κ': '&kappa;',
   'λ': '&lambda;',
   'μ': '&mu;',
   'ν': '&nu;',
   'ξ': '&xi;',
   'π': '&pi;',
   'ρ': '&rho;',
   'ς': '&sigmaf;',
   'σ': '&sigma;',
   'τ': '&tau;',
   'υ': '&upsilon;',
   'φ': '&phi;',
   'χ': '&chi;',
   'ψ': '&psi;',
   'ω': '&omega;',
   'ϑ': '&thetasym;',
   'ϒ': '&upsih;',
   'ϖ': '&piv;',
   '‘': '&lsquo;',
   '’': '&rsquo;',
   '‚': '&sbquo;',
   '“': '&ldquo;',
   '”': '&rdquo;',
   '„': '&bdquo;',
   '†': '&dagger;',
   '‡': '&Dagger;',
   '•': '&bull;',
   '…': '&hellip;',
   '‰': '&permil;',
   '′': '&prime;',
   '″': '&Prime;',
   '‹': '&lsaquo;',
   '›': '&rsaquo;',
   '‾': '&oline;',
   '⁄': '&frasl;',
   '€': '&euro;',
   'ℑ': '&image;',
   '℘': '&weierp;',
   'ℜ': '&real;',
   '™': '&trade;',
   'ℵ': '&alefsym;',
   '←': '&larr;',
   '↑': '&uarr;',
   '→': '&rarr;',
   '↓': '&darr;',
   '↔': '&harr;',
   '↵': '&crarr;',
   '⇐': '&lArr;',
   '⇑': '&uArr;',
   '⇒': '&rArr;',
   '⇓': '&dArr;',
   '⇔': '&hArr;',
   '∀': '&forall;',
   '∂': '&part;',
   '∃': '&exist;',
   '∅': '&empty;',
   '∇': '&nabla;',
   '∈': '&isin;',
   '∉': '&notin;',
   '∋': '&ni;',
   '∏': '&prod;',
   '∑': '&sum;',
   '∗': '&lowast;',
   '√': '&radic;',
   '∝': '&prop;',
   '∞': '&infin;',
   '∠': '&ang;',
   '∧': '&and;',
   '∨': '&or;',
   '∩': '&cap;',
   '∪': '&cup;',
   '∫': '&int;',
   '∴': '&there4;',
   '∼': '&sim;',
   '≅': '&cong;',
   '≈': '&asymp;',
   '≠': '&ne;',
   '≡': '&equiv;',
   '≤': '&le;',
   '≥': '&ge;',
   '⊂': '&sub;',
   '⊃': '&sup;',
   '⊄': '&nsub;',
   '⊆': '&sube;',
   '⊇': '&supe;',
   '⊕': '&oplus;',
   '⊗': '&otimes;',
   '⊥': '&perp;',
   '⋅': '&sdot;',
   '⋮': '&vellip;',
   '⌈': '&lceil;',
   '⌉': '&rceil;',
   '⌊': '&lfloor;',
   '⌋': '&rfloor;',
   '〈': '&lang;',
   '〉': '&rang;',
   '◊': '&loz;',
   '♠': '&spades;',
   '♣': '&clubs;',
   '♥': '&hearts;',
   '♦': '&diams;'
  };

  for (var i = 0; i < str.length; ++i) {
    if (entities.hasOwnProperty(str[i])){
      var ent = entities[str[i]];
      str = str.substr(0, i) + ent + str.substr(i+1);
      i += ent.length-1;
    }
  }

  return str.replace(/\\(?!\\)/g, '').replace(/[\s\n\r]*$/, '');
}
