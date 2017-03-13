var FPS = 30;

var quadverts = new Float32Array([
    -1,-1,+1,
    -1,-1,+1,
    -1,+1,+1,
    -1,+1,+1
]);

var mousepos = [0, 0];

window.addEventListener("load", function(){
  var canvas = document.getElementsByTagName("canvas").item(0);
  var code1 = document.getElementById("pixel-shader").text;
  var code2 = document.getElementById("pixel-shader2").text;
  if (!canvas) return;

  var ctx = Context.create(canvas);
  Program(ctx);
  Shader(ctx);
  Buffer(ctx);
  Texture(ctx);
  FrameBuffer(ctx);
  Uniform(ctx);
  Effect(ctx);


  var buff1 = Buffer.create(ctx.ARRAY_BUFFER, ctx.STATIC_DRAW);
  Buffer.data(buff1, quadverts);

  var effect1 = Effect.create();
  Effect.source(effect1, code1, ctx.FRAGMENT_SHADER);
  Effect.source(effect1, 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0,1);}', ctx.VERTEX_SHADER);
  Effect.init(effect1);

  var effect2 = Effect.create();
  Effect.source(effect2, code1, ctx.FRAGMENT_SHADER);
  Effect.source(effect2, 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0,1);}', ctx.VERTEX_SHADER);
  Effect.init(effect2);

  var copier = Effect.create();
  Effect.source(copier, code2, ctx.FRAGMENT_SHADER);
  Effect.source(copier, 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0,1);}', ctx.VERTEX_SHADER);

  //copier.texture = true;
  //copier.framebuffer = true;

  Effect.init(copier);

  var fnum = 0;
  function frame(){
    fnum++;

    if (fnum % 2){
      Program.use(effect1.program);
      ctx.uniform1f(ctx.getUniformLocation(effect1.program, "time"), fnum / FPS);
      ctx.uniform2f(ctx.getUniformLocation(effect1.program, "mpos"), mousepos[0], mousepos[1]);
      Effect.pipe(effect1, effect2);
      Effect.render(effect2);
      Program.use(effect1.program);
      ctx.uniform2f(ctx.getUniformLocation(effect1.program, "pmpos"), mousepos[0], mousepos[1]);
    } else {
      Program.use(effect2.program);
      ctx.uniform1f(ctx.getUniformLocation(effect2.program, "time"), fnum / FPS);
      ctx.uniform2f(ctx.getUniformLocation(effect2.program, "mpos"), mousepos[0], mousepos[1]);
      Effect.pipe(effect2, effect1);
      Effect.render(effect1);
      Program.use(effect2.program);
      ctx.uniform2f(ctx.getUniformLocation(effect2.program, "pmpos"), mousepos[0], mousepos[1]);
    }

    window.setTimeout(function(){
        window.requestAnimationFrame(frame);
    }, 1000 / FPS);
  }

  window.requestAnimationFrame(frame);
});

window.addEventListener("mousemove", function(event){
  mousepos[0] = event.clientX;
  mousepos[1] = 400-event.clientY;
});
