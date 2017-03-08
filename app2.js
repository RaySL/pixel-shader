var FPS = 30;

var quadverts = new Float32Array([
    -1,-1,+1,
    -1,-1,+1,
    -1,+1,+1,
    -1,+1,+1
]);

window.addEventListener("load", function(){
  var canvas = document.getElementsByTagName("canvas").item(0);
  var code1 = document.getElementById("pixel-shader").text;
  var code2 = document.getElementById("pixel-shader2").text;
  if (!canvas) return;

  var ctx = Context.create(canvas);
  Program     = Program(ctx);
  Shader      = Shader(ctx);
  Buffer      = Buffer(ctx);
  Texture     = Texture(ctx);
  FrameBuffer = FrameBuffer(ctx);

  var prog1 = Program.create();
  var prog2 = Program.create();

  var frag1 = Shader.fragment();
  var frag2 = Shader.fragment();
  var vert = Shader.vertex();

  Shader.source(frag1, code1);
  Shader.source(frag2, code2);
  Shader.source(vert, 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0,1);}');

  Shader.compile(frag1);
  Shader.compile(frag2);
  Shader.compile(vert);

  Program.add(prog1, frag1);
  Program.add(prog2, frag2);
  Program.add(prog1, vert);
  Program.add(prog2, vert);

  Program.link(prog1);
  Program.link(prog2);

  var buff1 = Buffer.create(ctx.ARRAY_BUFFER, ctx.STATIC_DRAW);
  Buffer.data(buff1, quadverts);

  var tex1 = Texture.create(ctx.TEXTURE_2D);
  Texture.image2D(tex1, ctx.RGBA, ctx.UNSIGNED_BYTE, ctx.drawingBufferWidth, ctx.drawingBufferHeight);
  var tex2 = Texture.create(ctx.TEXTURE_2D);
  Texture.image2D(tex2, ctx.RGBA, ctx.UNSIGNED_BYTE, ctx.drawingBufferWidth, ctx.drawingBufferHeight);

  var fb1 = FrameBuffer.create(ctx.FRAMEBUFFER);
  FrameBuffer.texture2D(fb1, tex1);
  var fb2 = FrameBuffer.create(ctx.FRAMEBUFFER);
  FrameBuffer.texture2D(fb2, tex2);

  Program.use(prog1);

  ctx.uniform2f(ctx.getUniformLocation(prog1, "resolution"), ctx.drawingBufferWidth, ctx.drawingBufferHeight);

  //Enable vertex shader position attributes
  var positionLocation = ctx.getAttribLocation(prog1, 'a_position');
  ctx.enableVertexAttribArray(positionLocation);
  ctx.vertexAttribPointer(positionLocation, 2, ctx.FLOAT, false, 0, 0);

  Program.use(prog2);

  //Enable vertex shader position attributes
  var positionLocation = ctx.getAttribLocation(prog2, 'a_position');
  ctx.enableVertexAttribArray(positionLocation);
  ctx.vertexAttribPointer(positionLocation, 2, ctx.FLOAT, false, 0, 0);

  ctx.uniform2f(ctx.getUniformLocation(prog2, "resolution"), ctx.drawingBufferWidth, ctx.drawingBufferHeight);

  var buffer = false;

  time = 0;
  function frame(d_time){
    time += 1 / FPS;

    Program.use(prog1);

    if (buffer){
      FrameBuffer.bind(fb1);
      Texture.bind(tex2);
    } else {
      FrameBuffer.bind(fb2);
      Texture.bind(tex1);
    }
    ctx.uniform1f(ctx.getUniformLocation(prog1, "time"), time);
    ctx.drawArrays(ctx.TRIANGLES, 0, 6);
    if (buffer){
      FrameBuffer.unbind(fb1);
    } else {
      FrameBuffer.unbind(fb2);
    }
    buffer = !buffer;

    Program.use(prog2);
    if (buffer){
      Texture.bind(tex1);
    } else {
      Texture.bind(tex2);
    }
    ctx.drawArrays(ctx.TRIANGLES, 0, 6);

    window.setTimeout(function(){
        window.requestAnimationFrame(frame);
    }, 1000 / FPS);
  }

  window.requestAnimationFrame(frame);
});
