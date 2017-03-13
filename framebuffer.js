var FrameBuffer = function(ctx){
  FrameBuffer = {};

  FrameBuffer.create = function(target){
    return {
      framebuffer: ctx.createFramebuffer(),
      target: target
    };
  };

  FrameBuffer.bind = function(framebuffer){
    ctx.bindFramebuffer(framebuffer.target, framebuffer.framebuffer);
  };

  FrameBuffer.texture2D = function(framebuffer, texture){
    FrameBuffer.bind(framebuffer);
    ctx.framebufferTexture2D(framebuffer.target, ctx.COLOR_ATTACHMENT0, ctx.TEXTURE_2D, texture.texture, 0);
  };

  FrameBuffer.delete = function(framebuffer){
    ctx.deleteFramebuffer(framebuffer);
  };

  FrameBuffer.unbind = function(target){
    if (typeof target == "undefined"){
      target = ctx.FRAMEBUFFER;
    }
    ctx.bindFramebuffer(target, null);
  };

  return FrameBuffer;
};
