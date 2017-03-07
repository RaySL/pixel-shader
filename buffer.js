var Buffer = function(ctx){
  Buffer = {};

  Buffer.create = function(target, usage){
    return {
      buffer: ctx.createBuffer(),
      target: target,
      usage:  usage
    };
  };

  Buffer.bind = function(buffer){
    ctx.bindBuffer(buffer.target, buffer.buffer);
  };

  Buffer.data = function(buffer, data){
    Buffer.bind(buffer);
    ctx.bufferData(buffer.target, data, buffer.usage);
  };

  return Buffer;
};
