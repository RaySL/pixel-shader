var Uniform = function(ctx){
  Uniform = {};

  var TYPE_TO_POSTFIX = {
    "float": "1f",
    "vec2":  "2f",
    "vec3":  "3f",
    "vec4":  "4f",

    "int":   "1i",
    "ivec2": "2i",
    "ivec3": "3i",
    "ivec4": "4i",
  };

  var TYPE_TO_ARGCOUNT = {
    "float": 1,
    "vec2":  2,
    "vec3":  3,
    "vec4":  4,

    "int":   1,
    "ivec2": 2,
    "ivec3": 3,
    "ivec4": 4,
  };

  Uniform.create = function(program, name, type){
    console.log(Program.use);

    Program.use(program);

    return {
      location: ctx.getUniformLocation(program, name),
      method: ("uniform" + TYPE_TO_POSTFIX[type]),
      type: type,
      values: new Array(TYPE_TO_ARGCOUNT[type])
    };
  };

  Uniform.update = function(uni){
    if (uni.values.length == TYPE_TO_ARGCOUNT[uni.type]){
      ctx[uni.method].apply(ctx, [uni.location].concat(uni.values));
    } else {
      console.log("Uniform.set(): Bad uniform value count");
    }
  };

  Uniform.set = function(uni, vals){
    var argcount = TYPE_TO_ARGCOUNT[uni.type];
    if (vals.length >= argcount){
      for (var i = 0; i < argcount; i++){
        uni.values[i] = vals[i];
      }
    }

    console.log("vals:" + uni.values);

    Uniform.update(uni);
  };

  return Uniform;
};
