// Función que genera el código asociado a un nodo del AST. Delega la
// generación del código a la función adecuada.
function generate_code (node) {
  if (!node) return "";

  var code;
  switch (node.type) {
    case 'document':
      code = generate_document_code(node);
      break;
    case 'block':
      code = generate_block_code(node);
      break;
    case 'text':
      code = generate_text_code(node);
      break;
  }

  return code;
}

function generate_document_code (doc) {
  var code = '<!DOCTYPE html>\n<html>\n';

  // HEAD
  if (doc.head) {
    code += '<head>\n';
    for (var i in doc.head)
      code += generate_code(doc.head[i]);
    code += '</head>\n';
  }

  // BODY
  code += '<body>\n';
  for (var i in doc.body)
    code += generate_code(doc.body[i]);
  code += '</body>\n';

  code += '</html>';

  return code;
}

function generate_block_code (block) {
  var code = '<' + block.tag;

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
        code += '="' + block.parameters[i].value + '"';
    }
  }

  code += '>';

  if (block.content) {
    if (block.content.length > 1 || (block.content[0] && block.content[0].type != 'text'))
      code += '\n';
    for (var i in block.content)
      code += generate_code(block.content[i]);
  }

  code += '</' + block.tag + '>\n';

  return code;
}

function generate_text_code (text) {
  var code = '';

  if (text.content.length > 1) {
    for (var i in text.content)
      code += text.content[i] + '\n';
  }
  else
    code += text.content[0];

  return code;
}
