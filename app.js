var FPS = 30;

window.addEventListener("load", function(){
  var canvas = document.getElementsByTagName("canvas").item(0);
  var code = document.getElementById("pixel-shader").text;
  if (!canvas) return;

  var ctx = Context.create(canvas);
  Program = Program(ctx);
  Shader  = Shader(ctx);
  Buffer  = Buffer(ctx);
  Toy     = Toy(ctx);

  var toy = Toy.create(code);

  function frame(){
    Toy.display(toy);
    window.setTimeout(function(){
        window.requestAnimationFrame(frame);
    }, 1000 / FPS);
  }

  window.requestAnimationFrame(frame);
});
