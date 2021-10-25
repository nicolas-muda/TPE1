"use strict";

document.querySelector("#menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".botonera").classList.toggle("show");
}