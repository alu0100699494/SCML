var assert = chai.assert;
var expect = chai.expect;

suite('Tests', function(){
 
  test('Hola Mundo: ', function(){
    
    text = generate_code(scml.parse("/* Hola Mundo en SCML */ @head { @title { Hola Mundo SCML } @meta (charset: \"ISO-8859-1\"); } Hola Mundo"));
    assert.equal(text, "<!DOCTYPE html>\n<html>\n<head>\n  <title>Hola Mundo SCML</title>\n  <meta charset=\"ISO-8859-1\"></meta>\n</head>\n<body>\nHola Mundo\n</body>\n</html>")
  });
  
  test('Estructura HTML: ', function(){
    
    tree = scml.parse("@head { @title { Es verdad, pues: reprimamos } }")
    text = generate_code(tree);
    
    assert.throws(function() { scml.parse("@head { @title { esta fiera condición, } @head"); }, /^Expected/);
    
    assert.equal(tree.type, "document");
    assert.match(text,/^<!DOCTYPE html>/);
    assert.match(text,/<html>/); assert.match(text,/<\/html>$/);
    
    expect(tree.head).to.not.be.null;
    assert.match(text,/<head>/); assert.match(text,/<\/head>/);
    
    expect(tree.body).to.exist;
    assert.match(text,/<body>/); assert.match(text,/<\/body>/);
  });

  test('Etiqueta: ', function(){
    
    tree = scml.parse("@head { @title { esta furia, esta ambición, } } @k_an-gry { por si alguna vez soñamos. } @vacia;")
    text = generate_code(tree);
    
    assert.throws(function() { scml.parse("@head { @title { Y sí haremos, pues estamos } @vacia{}"); }, /^Expected/);
    
    assert.equal(tree.head[0].type,"block");
    assert.equal(tree.head[0].tag,"title");
    expect(tree.head[0].content).to.exist;
    assert.match(text,/<title>esta furia, esta ambici&oacute;n,<\/title>/);
    
    assert.equal(tree.body[0].tag,"k_an-gry");
    expect(tree.body[0].tag.content).to.not.be.null;
    assert.match(text,/<k_an-gry>por si alguna vez so&ntilde;amos.<\/k_an-gry>/);
    
    assert.equal(tree.body[1].tag,"vacia");
    expect(tree.body[1].content).to.be.null;
    assert.match(text,/<vacia><\/vacia>/);
  });
  
  test('ID: ', function(){
    
    tree = scml.parse("@head { @title { en mundo tan singular, } } @kangry mokona { que el vivir sólo es soñar; } @sin_id;")
    text = generate_code(tree);
    
    assert.throws(function() { scml.parse("@head { @title id_malvada { y la experiencia me enseña, }"); }, /^Expected/);
    assert.throws(function() { scml.parse("@head { @title { que el hombre que vive, sueña } @kangry mokona id_malvada { lo que es, hasta despertar. }"); }, /^Expected/);
    
    expect(tree.head[0].id).to.not.exist;
    
    assert.equal(tree.body[0].id,"mokona");
    assert.match(text,/<kangry id=\"mokona\">/);
    
    expect(tree.body[1].id).to.be.null;
  });
  
  test('Clases: ', function(){
    
  });
  
  test('Atributos: ', function(){
    
  });
  
  test('Contenido - Texto: ', function(){

  });
  
  test('Contenido - Literal: ', function(){

  });
  
  test('Comentarios: ', function(){

  });

});