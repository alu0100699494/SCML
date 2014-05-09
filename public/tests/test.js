var assert = chai.assert;

suite('Tests', function(){
 
  test('Prueba: ', function(){
    object = scml.parse("^^")
    assert.equal(object.type, "document")
  });

});