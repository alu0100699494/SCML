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
    
    assert.throws(function() { scml.parse("@head { @title { esta fiera condición, } } @head"); }, /^Expected/);
    
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
    
    assert.throws(function() { scml.parse("@head { @title { Y sí haremos, pues estamos } } @vacia{}"); }, /^Expected/);
    
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
    
    assert.throws(function() { scml.parse("@head { @title id_malvada { y la experiencia me enseña, } }"); }, /^Expected/);
    assert.throws(function() { scml.parse("@head { @title { que el hombre que vive, sueña } } @kangry mokona id_malvada { lo que es, hasta despertar. }"); }, /^Expected/);
    
    expect(tree.head[0].id).to.not.exist;
    
    assert.equal(tree.body[0].id,"mokona");
    assert.match(text,/<kangry id=\"mokona\">/);
    
    expect(tree.body[1].id).to.be.null;
  });
  
  test('Clases: ', function(){
    
    tree = scml.parse("@head { @title { Sueña el rey que es rey, y vive } } @kangry .mokona { con este engaño mandando, } @kangry .clase1 .clase2; @sin_clases;")
    text = generate_code(tree);
    
    assert.throws(function() { scml.parse("@head { @title .clase_malvada { disponiendo y gobernando; } }"); }, /^Expected/);
    assert.throws(function() { scml.parse("@kangry .clase id_malvada { y este aplauso, que recibe }"); }, /^Expected/);
    
    expect(tree.head[0].classes).to.not.exist;
    
    assert.equal(tree.body[0].classes[0].id,"mokona");
    assert.match(text,/<kangry class=\"mokona\">/);
    
    assert.equal(tree.body[1].classes[0].id,"clase1");
    assert.equal(tree.body[1].classes[1].id,"clase2");
    assert.match(text,/<kangry class=\"clase1 clase2\">/);
    
    expect(tree.body[2].classes).to.be.null;
  });
  
  test('Atributos: ', function(){
    
    tree = scml.parse("@head { @meta (charset: \"utf-8\"); @link (rel: \"icon\", type: \"image/jpg\", href: \"/images/favicon.png\"); } @sin_atributos;")
    text = generate_code(tree);
    
    assert.throws(function() { scml.parse("@head { @title (rel=\"utf-8\") { prestado, en el viento escribe } }"); }, /^Expected/);
    assert.throws(function() { scml.parse("@kangry () { y en cenizas le convierte }"); }, /^Expected/);
    
    expect(tree.head[0].parameters).to.exist;
    assert.equal(tree.head[0].parameters[0].id,"charset");
    assert.equal(tree.head[0].parameters[0].value,"utf-8");
    assert.match(text,/<meta charset="utf-8">/);
    
    assert.lengthOf(tree.head[1].parameters, 3);
    assert.match(text,/<link rel="icon" type="image\/jpg" href="\/images\/favicon.png">/);

    expect(tree.body[0].parameters).to.be.null;
  });
  
  test('Contenido - Texto: ', function(){

  });
  
  test('Contenido - Literal: ', function(){

  });
  
  test('Comentarios: ', function(){

  });

});