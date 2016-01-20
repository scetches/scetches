

function picker(canvas, hueHeight, padding){
  var ctx = canvas.getContext('2d'),
      rainbow = ctx.createLinearGradient(0, 0, canvas.width, 0),
      light = ctx.createLinearGradient(0, canvas.height, canvas.width, canvas.height),
      dark = ctx.createLinearGradient(canvas.width, 0, canvas.width, canvas.height),
      x,y,z,
      h,s,l,
      r,g,b,
      color,
      colorBox = document.getElementById('color');
  rainbow.addColorStop(0,   'rgb(255,0,0)');
  rainbow.addColorStop(1/6, 'rgb(255,255,0)');
  rainbow.addColorStop(2/6, 'rgb(0,255,0)');
  rainbow.addColorStop(3/6, 'rgb(0,255,255)');
  rainbow.addColorStop(4/6, 'rgb(0,0,255)');
  rainbow.addColorStop(5/6, 'rgb(255,0,255)');
  rainbow.addColorStop(1,   'rgb(255,0,0)');

  light.addColorStop(1,     'transparent');
  light.addColorStop(0,     'white');
  dark.addColorStop(0,      'transparent');
  dark.addColorStop(1,      'black');

  canvas.height = canvas.width + padding + hueHeight;

  canvas.style.padding = padding + 'px';

  function render(){
    h = z / canvas.width;
    s = x / canvas.width;
    v = (y * - 1 + canvas.width) / canvas.width;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = rainbow;
    ctx.fillRect(0, canvas.height - hueHeight, canvas.width, hueHeight);
    color = hsvToRgb(h, 1, 1);
    r = color[0];
    g = color[1];
    b = color[2];
    ctx.beginPath();
    ctx.moveTo(z, canvas.height - hueHeight);
    ctx.lineTo(z, canvas.height);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = 'rgb('+ r +','+ g +','+ b +')';
    ctx.fillRect(0, 0, canvas.width, canvas.width);
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, canvas.width, canvas.width);
    ctx.fillStyle = dark;
    ctx.fillRect(0, 0, canvas.width, canvas.width);
    color = hsvToRgb(h,s,v);
    r = color[0];
    g = color[1];
    b = color[2];
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
    color = 'rgb('+ r + ',' + g + ',' + b + ')';
    colorBox.style.background = color;
  }
  canvas.addEventListener('mousedown', clickHandler);
  canvas.addEventListener('mousemove', clickHandler);

  function clickHandler(e){
    if (e.which && (e.offsetY - padding > canvas.width + padding/2)){
      z = clamp(e.offsetX - padding, 0, canvas.width);
    } else if(e.which && (e.offsetY - padding < canvas.width + padding/2)){
      x = clamp(e.offsetX - padding, 0, canvas.width);
      y = clamp(e.offsetY - padding, 0, canvas.width);
    }
    render();
  }
  render();
  //yield color;

}

function rgbToHsv(r, g, b){
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

function clamp(value, low, high){
  return value<low?low:(value>high?high:value);
}

function hsvToRgb(h, s, v){
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
picker(canvas = document.getElementById('c'), 20, 50);
