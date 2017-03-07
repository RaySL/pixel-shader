var Toy = function(ctx){
  Toy = {};

  Toy.create = function(code){
    var prog = Program.create();

    var frag = Shader.fragment();
    var vert = Shader.vertex();

    Shader.source(frag, code);
    Shader.source(vert, 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0,1);}');

    Shader.compile(frag);
    Shader.compile(vert);

    Program.add(prog, frag);
    Program.add(prog, vert);

    Program.link(prog);

    var buff = Buffer.create(ctx.ARRAY_BUFFER, ctx.STATIC_DRAW);
    Buffer.data(buff, new Float32Array([
        -1,-1,+1,
        -1,-1,+1,
        -1,+1,+1,
        -1,+1,+1
    ]));

    Program.use(prog);

    //Enable vertex shader position attributes
    var positionLocation = ctx.getAttribLocation(prog, 'a_position');
    ctx.enableVertexAttribArray(positionLocation);
    ctx.vertexAttribPointer(positionLocation, 2, ctx.FLOAT, false, 0, 0);

    ctx.uniform2f(ctx.getUniformLocation(prog, "resolution"), ctx.drawingBufferWidth, ctx.drawingBufferHeight);

    return {
      program: prog,
      buffer:  buff,
      runTime: 0
    };
  };

  Toy.display = function(toy){
    toy.runTime += 0.03333;

    Program.use(toy.program);

    ctx.clear(ctx.COLOR_BUFFER_BIT);

    ctx.uniform1f(ctx.getUniformLocation(toy.program, "time"), toy.runTime);

    ctx.drawArrays(ctx.TRIANGLES, 0, 6);
  };

  return Toy;
};
