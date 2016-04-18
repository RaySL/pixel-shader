//◄▓▒░Swax97░▒▓►\\

/*global PixelShader*/

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
    
    shader.setup();
    frame();
});