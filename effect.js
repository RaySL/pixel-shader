var Effect = function(ctx){
  Effect = {};

  Effect.create = function(){
    return {
      uniforms: [],
      program: false,
      linked: false,

      texture: false,
      framebuffer: false,

    };
  };

  Effect.source = function(effect, code, type){
    var shader = Shader.create(type);
    Shader.source(shader, code);
    Shader.compile(shader);

    if (!effect.program){
      effect.program = Program.create();
    }

    Program.add(effect.program, shader);
  };

  Effect.init = function(effect){
    if (!effect.linked){
      Program.link(effect.program);
      effect.linked = true;
    }

    if (!effect.texture){
      effect.texture = Texture.create(ctx.TEXTURE_2D);
      Texture.image2D(effect.texture, ctx.RGBA, ctx.UNSIGNED_BYTE, ctx.drawingBufferWidth, ctx.drawingBufferHeight);
    }

    if (!effect.framebuffer){
      effect.framebuffer = FrameBuffer.create(ctx.FRAMEBUFFER);
      FrameBuffer.texture2D(effect.framebuffer, effect.texture);
    }

    Program.use(effect.program);

    var res2 = Uniform.create(effect.program, "resolution", "vec2");
    Uniform.set(res2, [ctx.drawingBufferWidth, ctx.drawingBufferHeight]);

    var positionLocation = ctx.getAttribLocation(effect.program, 'a_position');
    ctx.enableVertexAttribArray(positionLocation);
    ctx.vertexAttribPointer(positionLocation, 2, ctx.FLOAT, false, 0, 0);
  };

  Effect.bindTexture = function(){
    Texture.bind(texture);
  };

  Effect.pipe = function(effect1, effect2){
    Texture.bind(effect1.texture);
    FrameBuffer.bind(effect2.framebuffer);

    Program.use(effect1.program);

    //handle uniforms

    ctx.drawArrays(ctx.TRIANGLES, 0, 6);
  };

  Effect.render = function(effect){
    Texture.bind(effect.texture);
    FrameBuffer.unbind();
    Program.use(effect.program);
    ctx.drawArrays(ctx.TRIANGLES, 0, 6);
  };

  return Effect;
};
