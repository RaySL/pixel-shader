var Program = function(ctx){
  Program.create = function(){
    return ctx.createProgram();
  };

  Program.add = function(program, shader){
    ctx.attachShader(program, shader);
  };

  Program.link = function(program){
    ctx.linkProgram(program);

    //Program Error Display
    if(!ctx.getProgramParameter(program, ctx.LINK_STATUS)){
        console.log(ctx.getProgramInfoLog(program));
        return;
    }
  };

  Program.use = function(program){
    ctx.useProgram(program);
  };

  return Program;
};
