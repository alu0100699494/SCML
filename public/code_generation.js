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
    for (var i in text.content)
      code += text.content[i] + '\n';
  }
  else
    code += text.content[0];

  return escape_entities(code);
}

function escape_entities (str) {
  var entities = {
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&apos;'
  };

  return str.replace(/\\/g, '').replace(/[<>"']/g, function(tag) { return entities[tag] || tag; });
}
