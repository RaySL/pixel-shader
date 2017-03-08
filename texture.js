var Texture = function(ctx){
  Texture = {};

  Texture.create = function(target){
    return {
      texture: ctx.createTexture(),
      target:  target
    };
  };

  Texture.bind = function(texture){
    ctx.bindTexture(texture.target, texture.texture);
  };


  /**
    * Texture.image2D(Texture texture, GLenum format, GLenum type)
    *
    * It is common to use ctx.RGBA as format and ctx.UNSIGNED_BYTE as type
    *
  **/

  Texture.image2D = function(texture, format, type, width, height){
    Texture.bind(texture);

    ctx.texParameteri(texture.target, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
    ctx.texParameteri(texture.target, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
    ctx.texParameteri(texture.target, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
    ctx.texParameteri(texture.target, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);

    ctx.texImage2D(texture.target, 0, format, width, height, 0, format, type, null);

    //ctx.texParameteri(ctx.TETXURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
    //ctx.texParameteri(ctx.TETXURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
    //ctx.texParameteri(ctx.TETXURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR);
  };

  return Texture;
};
