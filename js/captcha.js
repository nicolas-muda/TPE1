"use strict";

function generarcaptcha(){
    let n1 = Math.floor((Math.random() * 99999) + 1);
    let cambiodecaptcha = document.getElementById("random").innerHTML = n1;
    
    return n1;
}