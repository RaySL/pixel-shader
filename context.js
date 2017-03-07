var Context = {};

Context.create = function(canvas){
  var attributes = {
    alpha:                          false,
    depth:                          false,
    stencil:                        false,
    antialias:                      false,
    premultipliedAlpha:             false,
    preserveDrawingBuffer:          true,
    failIfMajorPerformanceCaveat:   true
  };

  //Create a webgl context
  var ctx = canvas.getContext('webgl',              attributes) ||
            canvas.getContext('experimental-webgl', attributes);

  //If WebGL is not available
  if (!ctx){
    throw 'WebGL not supported, try a different browser?';
    return;
  }

  ctx.viewport(0, 0, ctx.drawingBufferWidth, ctx.drawingBufferHeight);

  return ctx;
};
