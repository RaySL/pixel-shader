//◄▓▒░Swax97░▒▓►\\

/*global PixelShader, PixelShaderUniform*/

var shader;
function frame(){
    shader.display();
    window.setTimeout(function(){
        window.requestAnimationFrame(frame);
    }, 1000 / 30);
}

window.addEventListener("load", function(){
    var canvas = document.getElementsByTagName("canvas").item(0);
    var code = document.getElementById("pixel-shader").text;
    if (!canvas) return;
    
    shader = new PixelShader(canvas);
    shader.code = code;
    
    shader.addUniform(PixelShader.time);
    PixelShader.timeUpdater.start();
    
    var res = new PixelShaderUniform("resolution", "uniform2f");
    res.update([canvas.width, canvas.height]);
    
    shader.addUniform(res);
    
    shader.setup();
    frame();
});