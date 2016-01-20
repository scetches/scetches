var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d'),
    canvas2 = document.getElementById('cc'),
    ctx2 = canvas2.getContext('2d'),
    colorBox =  document.getElementById('color'),
    body = document.getElementsByTagName('body')[0],
    imgCanvas = document.getElementById('image'),
    imgCtx = imgCanvas.getContext('2d'),
    theImg = new Image(),
    x = 5,
    y = 5,
    h = 0,
    padding = 5,
    rainbow = ctx2.createLinearGradient(0, 0, 256, 20),
    light = ctx.createLinearGradient(0, 255, 255, 255),
    dark = ctx.createLinearGradient(255, 0, 255, 255);

    rainbow.addColorStop(0,   'rgb(255,0,0)');
    rainbow.addColorStop(1/6, 'rgb(255,0,255)');
    rainbow.addColorStop(2/6, 'rgb(0,0,255)');
    rainbow.addColorStop(3/6, 'rgb(0,255,255)');
    rainbow.addColorStop(4/6, 'rgb(0,255,0)');
    rainbow.addColorStop(5/6, 'rgb(255,255,0)');
    rainbow.addColorStop(1,   'rgb(255,0,0)');
    light.addColorStop(1,     'transparent');
    light.addColorStop(0,     'white');
    dark.addColorStop(0,      'transparent');
    dark.addColorStop(1,      'black');

render();

theImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATQAAACkCAMAAAAuTiJaAAABVlBMVEX////+CA3+kwdByQP+9QYqw/wCJfNWMMP+AAApw///9wb+lAf+kQf/AAD+lwYqw/34AAAqxvxZMcD++gX+jQcAEfM1xqcAHfMsxgJIFsAopPbb1+r74Ar9mQgACvMsyvw4LNjh7Qj8vgglnPUzxcI7x2788vL7zwsrxOz4t7f8hQ772gn7qgv6Uw88x1P8ngoruvn64eH60tP7QRH87e2Z2gv7eg+s4Aza6wt41Ar7twtLG8A2xpYwKt8RJu77cg8txNw4x3o9yDQaYvE9yEI7yF8zxa73cnNRKML2SUv6WRD4l5j5yMi8tN75gYL7Kg/2OT5fQcFdzgkQQfL2ICP5oaIab/IXYvMSUPJnTMK/t94qr/cefPPLxeT4kZIRSvIggPMhkfX86Qv6WFr7aGuekNa+5Q0vxNAMNPH3MTQ1x4uMe82AbMeuo9lyWcPp6PEegPUxxMcmhLU5AAAUrElEQVR4nOWd+VdTyRLHWfXmJoTEJAIOIYAKBnDYZFdwZ5EBB9cZHBdwEOfpLP//L6+TgNyu+lZ33+QmwZk67505B3VMPvlW1beq+2ZaWs5NjEzPFIsv3u6sfzzc3Hxajs3Nw4/rO29fFIsz0yPNfn3nKkZmik/WN1tTniVSzw/XnxRn/vPwZoo7myewWu1R/n1dqdThTnG62a+8OTFdXP/sSgvAS33+r5GbeXKo9NVVBS9C7vDFTLPfS0Ni+kUJWE28NHIK3L9ccdvr0QELgGvd2W72O6tTjBRLEosW2Bm31Mdis99g9FE8jFxiBFzXv4zb9sd6aUzn5qXW/yV5Ov22IcROubU+udXsd1xzFDe9rkYRO8GWOvyu5TbSSJEFubW+aPZbrzamlb9oPLETbN7O9+jetjebIbKz6PIOv7dpYftzc5GVwvM2vydsClljq78Qnvf0e+kJ5wVZKbq8p9+D2maeNj8xg+F5h+e9Jdw6PF/ISuF56+d627uTqjoxd2dnt7bW1ubnx8aylRhTsba2tnVzdrdWbKknzSYjRrEqZLM3t+bH2pL5ZCni8Xjp/2dR/mk+Gc/Or23VAM9Lnc9hfvpp2MTcVbgSJVoKTpslSvjU7xxb26qOnPIf53Am3QlXzGa35ttKuBQOGy+NXUl4Y2s3qyDX5b1tNiMS22EmptmtsWTeQV0Gcvns2s3Q2Lzn58p+fHRGtrs1XypR1fI6AxfP58fCpqqaSJtN6ltsuzaA3a2xKIB9A5fMt63NhsPWek7E5iiz3a1slMROweXjobidD7HNuFWzaDXGuIXI067nTZ8Q3ro0zdn5ZL2IVUI1hi1nap7X3BXliIs328rWl1g5VEd1l5t32ERmDkZjd63OIjsLZeBcq5uXalo/eGtFNjufT4Zzr7WEsiEJxyxtWopu2pjNjuUbBuyUWzLuiu1jE5BNt1rMWROQhcLmPW/4wshWzmbHGlXKeCSTTtgaXthemJHtVqWyRFviLLLZ8j+qxNbmhK2x+6J1I7Pd+XDISoRKkZycmFgeXh4ux7KKicl85ZdC04snsy6dtJGLD3MLWHNPzIqiJpeHR8cPOvwMio6D/vHR5Yl8hV0IbPkxB9/WsHYw8tnEbFblhhsvRSG/rGgpWH4pOnCUfqkMb3R4Ih4GXDy/5kBtsyHMbrUamDkWMwWsbWK0v6OMS4DF4Sl0itykO7hkm33p1vW5AcymTW1zywFZKSEnRg8UAVdchFzHuDO4eH7emqNea92th4nZbtaemSolh/v9qoCdgfOV4iYSWRdsyaRVbF6qzqcHpkXQlq0BKI1NDh/UBCyguI7xZSduSWtD6ErVdVk0Y5DZmEVmCaWxg4xzCXPh5o9PqOJoi7hVbF49qc2kxL/3prmaKZEt90eiMR1cpmN00l7e8vPNo2bQ2XzejGxytCNyYhVsqr4tZ21pmmyzWN26UZsWdbabMKSmEtmEElk9iJ1wU3LLW7DF85a5qk7dQO6bWwaZKWSlSlY/ZBVsmfFJCzZbitaF2i2R2ZrMTLW34TrlJePWP2HGlkyYu2hX9H5tRJwD5K5ZQubXMS9DYrN1Ue951NCkeXNXvl2gErOjYchcsNkKW9RzqLTXkJ1GIiSyysyeGQpExi/ZujDOzrfUtqS5sHVFuvOQ9mdiC0hkJ5zLv4I1tHg0t7TX3t5Lor19b2luYXHId66Lfma0zeB3k2NmrUV4/P5EYCa2gGx+3OVtlnAdLSztnQDCUfnFpYWjIbeNSMYfNogtbm4HXmS73KLAbF5oASozHZD5/uLCUruBFmOnyC12OPyLMweTstjicTO1iM4NJFMrtc1SZlqBDS0sOfPSyC0tDFk/EZWj8mgVTxqng4jsmmDQhD1QIjtqeVNKYnPt4YGdgWufW7Qlqt9h6KN5E7VojMcmPt8UmGUnzD2zRKx6YGfglo7M3FQfFcUWN1OLoIXuCDqDVqMkM+NbGVIaq5XYKbe5RfPfpcQmas1kc2u/sbAdhll20lTNfP9or3aRBbm1L5j6gqpsVVKrsRncwk0AMjM3TSWySIlVsPUuDRmwZQ7yEjZTN/BStUHD05PAbFyWmb+4FDmxE257i4ZPyhdT1FTXumqap3BBg14jYUjNzOJenZBVsB3J2FSKCv0gb/BrtZQ1XNCgp81OiKlZX2Q2bJl+oYvGkyZq1S9yYUFbA8xK5UzKkLojq2ATk9TvmBSotRmgVe3WDpHQ0IwulzN/qF61jGETW4KfEQpbPGugtl4dMzhyol1QIiGWs7kGIStjmxP8rp8ZxtRMOw+vqge5R1ByziKd5Q/wi80cReVkHan1SqVNagdJ+YpMdb7jEIxPu6CeZSexw2xcZgaw7Qk5Kvlcw53JahIUJicwaIkJnBT+QsORlbEtCNTGsdYMdq2KwQAlJzAbympgmTWiZ0Jqgth8wXrIxsNrDcsMLbhB45SYHTUJWRkbFlumH2otLjeDsJdL0Q0E0ASwpfU7qqpm9x8+unf5LG7fe/TwfnXUluAnKVAzNYNwFvc5gMYP67DO/MWwTfP67Wt3b8RQdN799PiPH8Nzg1ZXUUMJKm88wp3poRvvY67MQnWAR5c/FSp8ujtBdFd+7ca12w9DQetdQC9NoGYoayHOWZBF22JNIDEJc9Pdzz66fFekpUf5t30KA653CWYo7KGGshbCrIEusMsKWiIPX5Zr17x3LV1KP/coie7GY+dU7W0fQi8P+jX5Grh7L0DHT8ChodQccntH1/9xUxhQXOGxq956UWETqIluzXM9nAJ3EPhqIwtmJ3/RRWYPH6dDSYxxu3HbkRqaqjLLgJq88HA9ZgFbtFk2pqO9hpM7u3e3Ko0FQyXqP05pCh1bZgKUNdl3ONoOYDdYcqJTJ5e2ebtQg8iC2LrvXnehNgfSwc8DamKCuq2+wdDJkjO7DJjZ2+bl7lpFdhYqS+9VSa0DDFTxhCg1lx0Rv73HOqcyG1z1VmaXIxHZWXS7YEPTgY/smpignsNzQEW+EaK2NpHgyyCrzv6IUGUBbI/s1LjW4FJSPGhxkBoX2k2WnP3sddh0dv1GtCo7jVjsk20+hdRAMxAtrl1qoKKxJsAPUSw6u/8pepWdRnfsso3aHMjQJKcmzqBWqXGh0S6Q4BOnpW/ejriYUWo3LP4DdANU1uJxCdrTsELjXYAVNLM/e3ijfjKrRCx2zUKN+zVU1uReYN7h8msItAtkx9kLMM4Bt+tMrIKtYBZb7xEva+A0VOoF5hURHwZmSXIChzZkYna33jI7oWapbL2LLEEPQIJKl7+NYwE/gSKzQCLOW5HhtT7qDFXN0up/3yIstrtmamzngUZ3UWqGk6lpbjf0ipbgyenvya/0sjMyBalQKHRO7V85jf2pTvWTgju8WKcxRfd4WeO+Q7QdKfkRIH5JKEGExpLTNxwH/OPGTPFK73/4+9WzC7lgDOSO3736++p+iZwbtZhp+8HtGkpQaQTtkr9dmO3RiK9NtNHOaWic9x38bElfU1dfvlOEenousOjp6ckN9Lx+c7XTjVvssYkaa6EgQWWpScz4yQARGt9tyE3gob2cKWJX3jzDvDR0udy79/su3GKfTNRYMwAdVLohKZ4WsJ0QFRqb033xFT6yGtpCYf/l6oAF2Bm4geM3U3ZusRsGau0sQbnFlaQmuQ5+1klaJ1vWygXtnsVppAtT758NuAE74/buQ9rGzUiNbTwyy0xqUlUTXMc69RukdXKLJha0P8zM0oX9V7lcGGIn3HK5lza5xQryBM/Kmt/BpSZ4NeGIhbUBMgwkWEmQmZmRXXkXTmRBbgOvLdUtljZQo24N9ALJq8FWwMZOcg0hO0o/JsmhGZkpZCHzkmF7tV8wUes2UGNuLcPWHdIECncd7NtX5zWhJZIkOUW3cc/ErLBfvcoC2KZM2GIFWWo0QZHUBGjgXOoWZbZrEZqUnNcN9Szd+aBmZGVsuTemUSGWlqmxBJ2k0KSLfiA/2YOw+h6N2Q1/Cb+qH2Vm6cIHR4dhj9zxFUNpM/RQmqD+OJWadAgKrBpbChG7QYZO6Vz4vuzP0lOvByJCdqGUow86DdREl8u2RNzhCt+qwL+Hmc3qut9I5KnQhNckz06FD7moZHaC7cIVubIZJiq71CSDa81O3W/QA3Vpwf0pJnz66fSrCGV2EgNvDNT+kKRGl99caoLrYPlJs3PXLDShCzyWdFbYP45WZpXIvZM+pM7umLQp6iWXcrnUhFZA85P1Tr0N0Nbpz8GXc11kdjWSpsmjZ1VM0W6xhdIlUYYeg0jH7aR/sgUH2W+QvwYvN+4LfTNdeBN9ap7GwFWJmrjLpesOn3k1YQAl/pY+BqUfDWSHidCw3bgrCK3wsn7MTIWtW1pKMtvRRqpaHE8FXfrWm86da0GhJeh6A9sNabmdfl3FbB6G2kvJscWE+39Mauw8TzgC1fJzmy449AmKrDcyUGg/Ymbp9LP6lLOzyL0UtCZ6XCI1vviW8jO4H6KHAyQ7+12EJji0+jMzURPcGpUaO2MR8lN74pjubLXeSScoXNGk5AzBbPX4zuBp3LlzvHrB+Y/K1ATfQaXGDS6GFjAdzHDoxpb4Ddg6H2Jmhddub3z1zuDGxUskLm4M3ll1pobrmpCgTGp0QyScFQSKGl2ladmZyOr//g7o0XDnLDxw6QF3BhWvizDUzweduA28x9SkYz3i1TLDFJqQnzNiSdOzk94SQkLDO7TCGzuzVZlYKG7KryGb2B0TpKaviFgrEPyt90QsadqBCtlv4KkTfspqDrCK7KIR2DdwF+/Yqe1jqeEbRXQCZQMonj/PitoInTv1TRqpmeglwC6Q3rcxG3RD5ooNl1WhF/QSaHQqEObPb0WN3hXSjjvpGRRccuPFoyWpHFXmjK3nHWyhwjRF9mo8P/Gp1DenRv+jWfOm7ER+4xpiZmmcx+GQVbCZVyU5PFDF8BMHe8SxU6uWxNBOnRodPPVh3e437iOhFT6YknN1MDSyMrZBo9ZwWesWpKa3ApafeCj4dumKDJ7aKo2MULANXAPFJD1lapx3qkJWxnbHKDbcC+C9edIKWH7ionZ61ZtuurVFN81OcNZ5HzErmCaB6mTmILaeByhBpR2RuX8KS+8U7gPBDUecOFuUnWhdm/4gC201fDXTqG0YqA1cgQmKpaZPBezqsjBJVewtPR4IujTibOHzAp28opmS87gWYpWQ23LPMToPjf0DlUbyk14hEpxa5aCA/jeHtezU148Z8Fej69uFV2JyVl/OAmKTzUfub5Cg3TF4UYFYNZ+2T1zUKl+6TJ630AZPshVC2Vng2WmwtVEwM1ObQlUNrohofhLTgddDJxfVSPPUnvBPWEeoR6CiyV0gGmYmaj2voFmD0OZ0pY26dwLaPOcNJQ30TnAbOS3OnFExM1Eb2OfI0jH8kKP+7qjpwDdhvBGwFwr+yYS+SkOnnUhoknGPjpmiJnUDKDXsOuiqgzw8i7+vo9w+6emd1gf0kgbmzttAaJLdWI2QmYHawBRqoKgV9C4Yixq+01Fun+RLOLQVh+7S0BExWD6KFc1CYWNjpe8kVlY2HLCFkhpcRuqrSLqJxIvI8kqNfKFEcMVBTgeA4UDTwBVc0XpMHEq8/vz9px9O4tevXy712cCJLncANFDhYErvc+SkAC86ytMn+Vlwa0sGT2A4QHZK2w3D7LTR98vXH1pI/PXrFws3qRn0oG0Hzk+tqNFry3h7W/YcxHEEmyc5UgEljWen5NHkgray8fUvSuwkfv2zz4RNKms9qKih/CRLNXq8grdDrXxtG7xipfcBNEOBNvASC0168yuXfhKIleOHLyZsQoLmPnBqeEFEihrpBHiQSnGbFvxDWe1RKODSwHlKAX/6QnJubHw1IStj+6VPlhpOULjDxScsulMjMzs+x1NGje44gs1Tv5Xmc6HxTVr6KvQbQnL2/c+GrBQ/GcSGpQZbAVrg9mrpSa8PCZ5jmnrb4AaSzAOgD/APtPAAZucglNnKby7MVPy5IkHD27Xce56fcP7Ux086Ewgj+wz1tsEnLhL6d0nwPgAMRwEyg0Lb+EWq/zy+SimKewHKT2g6dHvL2ic2akW6TQvaNNI8eR/gj6akr6DshBZt5YszMhW/SdSw1NBUAIuavlMj7VMwakV6uh7ccZDmyc+heEkrwN6JhNb3exhmqh8I1LDUUP+ERU2/CUNW3vgb0b0XdIoKelv9Lh84Jea3q+CsjoQWlplMDUqt5zXIT/SFCvoikjzKiB/D8N7SvW3wgIA4DuDS6NIWO1sgtBWntulGDeZnDigNPZDRa/YcENoOPfQMDATk6yR48+T7R7zg4B5t48/wzErWA+YnlFqOn7B0o+fM9PZJDz8xtHX68F1gICDjOr//yPsANhz8jW5Uw6yl5XfsPCC09yA/wfipD1J0ZIcjgfex5bP+k8BRFLFp3HGAPoCqMl899rHp3DF+Rm0YtgK0H0JXYfRnGemJFFxDeoctz/WfBK4k6DsOcD7wiUGLOWXnSugmcBp/oQTF+bkKoKEnfzTPwdwtmqO8TboZCjZPzduCcZ03T7hK42+zWmbK5MIEhfnJJyk4E2gjO3W3jtCCzXPYYtPc+gDrnX2uwxMKxAzmJ+gE8H6fbtR8F2hPDUrTT1X4joMPUdDa0pK28UsNzFp+BVKDuw5gb/Hpim7U4ppRgxO7EVrWAo0/bYGWtszZ1iQ0LLUN5Kj5LXn4iBlxt/laoY2bBwK+TCscg4+cZufPNTHDVQ38tah9dtuhTUYLjfUBfj6QdihpK8ZFrUOABnoJQXsG2ieC1qFDa6sRWr8ZGr9iNQWaJy1pfTUya/kf92qXkMIvAGjgATMKrValWaCxm7Zw8iTQNkIthFCAJRHsBOB0Bbpb7UCKnBJgaJvU3IrQ+JUENhDAVTfZ2Tova+UA+YnsLVh5o+VQVdDI7Bk5NJJMNWdnS8sXnp/oVCoSaNCnHVJo4gFetdDIu6vJpFXiJ94/keeoH7SPdDVUb2hVj51ngfZqjVRa1zpdQga2HPWAVrPhKEU9oZHuCbccO3TdHdin6T4tImi194GWFnDiEB20IDNhn/b2/3OpI2sElldSAAAAAElFTkSuQmCC"

theImg.crossOrigin = "Anonymous";
theImg.onload = function(){
  imgCtx.drawImage(theImg,0,0);
  console.log(imgCanvas.toDataURL());
}


function render(){
  var color;
  ctx2.save();
  ctx2.clearRect(0,0,256,20);
  ctx2.fillStyle = rainbow;
  ctx2.fillRect(0,0,256,20);
  color = hsvToRgb((h * - 1 + 256)/256, 1, 1);
  ctx2.beginPath();
  ctx2.moveTo(h, 0);
  ctx2.lineTo(h, 20);
  ctx2.stroke();
  ctx2.restore();

  ctx.save();
  ctx.clearRect(0,0,256,256);
  ctx.fillStyle = 'rgb('+ Math.round(color[0])+','+Math.round(color[1])+','+Math.round(color[2])+')';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, 256, 256);
  color = hsvToRgb((h * - 1 + 255)/255, (x)/255, (y * - 1 + 255)/255);
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
  colorBox.style.background = 'rgb('+ color[0] + ',' + color[1] + ',' + color[2] + ')';
}

canvas.addEventListener('mousedown', shade);
canvas.addEventListener('mousemove', shade);
canvas2.addEventListener('mousedown', hue);
canvas2.addEventListener('mousemove', hue);
function hue(e){
  if(e.which){
    h = clamp(e.offsetX - padding, 0, 255);
  }
  render();
}

function shade(e){
  if(e.which){
    x = clamp(e.offsetX - padding, 0, 255);
    y = clamp(e.offsetY - padding, 0, 255);
  }
  render();
}

function clamp(value, low, high){
  return value<low?low:(value>high?high:value);
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

imgCanvas.addEventListener('click', function(e){
  var color = imgCtx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  var hsv = rgbToHsv(color[0], color[1], color[2]);

  h = Math.round(hsv[0] * 255) * -1 + 255;
  x = Math.round(hsv[1] * 255);
  y = Math.round(hsv[2] * 255) * -1 + 255;
  render();
});
