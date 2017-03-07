var Shader = function(ctx){
  Shader = {};

  Shader.create = function(type){
    return ctx.createShader(type);
  };

  Shader.fragment = function(){
    return Shader.create(ctx.FRAGMENT_SHADER);
  };

  Shader.vertex = function(){
    return Shader.create(ctx.VERTEX_SHADER)
  };

  Shader.source = function(shader, source){
    ctx.shaderSource(shader, source);
  };

  Shader.compile = function(shader){
    ctx.compileShader(shader);

    if(!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)){
        console.log(ctx.getShaderInfoLog(shader));
        return;
    }
  };

  return Shader;
};
