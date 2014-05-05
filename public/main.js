$(document).ready(function() {
  $('#parse').click(function() {
    var editor = $('.CodeMirror')[0].CodeMirror;
	  var source = editor.getValue();
    
    try {
     // Generar y mostrar el árbol
      var tree = scml.parse(source);
      $('#output').html(JSON.stringify(tree,undefined,2));
      
      // Generar y mostrar el código
      var result = generate_code(tree);
      var html_output = $('.CodeMirror')[1].CodeMirror;
	    html_output.setValue(result);
      
      //$('#output').text(result);
      //$('#output').html(JSON.stringify(tree,undefined,2));

    } catch (e) {
      $('#output').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }
  });
  
  $('#download').click(function() {
    var editor = $('.CodeMirror')[1].CodeMirror;
	  var source = editor.getValue();
    
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(source));
    pom.setAttribute('download', 'index.html');
    pom.click();
  });

  $("#examples").change(function(ev) {
    var f = ev.target.files[0]; 
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      //input.innerHTML = contents;
	  var editor = $('.CodeMirror')[0].CodeMirror;
	  editor.setValue(contents);
    }
    r.readAsText(f);
  });

});
