$(document).ready(function() {
  $('#parse').click(function() {
    try {
      var tree = scml.parse($('#input').val());
      var result = generate_code(tree);
      $('#output').text(result);
      //$('#output').html(JSON.stringify(tree,undefined,2));
    } catch (e) {
      $('#output').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }
  });

  $("#examples").change(function(ev) {
    var f = ev.target.files[0]; 
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      input.innerHTML = contents;
    }
    r.readAsText(f);
  });

});
