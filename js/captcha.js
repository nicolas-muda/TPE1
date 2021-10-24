"use strict";

document.addEventListener('DOMContentLoaded', iniciar);

function iniciar(){
let n1 = generarcaptcha();
let filtrar =  document.getElementById("filtrar").addEventListener("click",mostrarSelecto);
let btn = document.getElementById("submitcaptcha").addEventListener("click",sendData);
let agregarxtres = document.getElementById("btn-tres").addEventListener("click", agregarTres);
let comentarios = []
let usuario = { };



const url = 'https://60c36aa22df2cb00178ab1f9.mockapi.io/api/usuario';

//Funcion de filtro que muestra el dia que se ponga en el input del html
async function mostrarSelecto(){
    let filtro = document.getElementById("filtro").value;
    let table = document.getElementById("contentabla");
    table.innerHTML = "";
    try {
        let res = await fetch(url);
        let json = await res.json(); 
        console.log(json);
        for (const usuario of json) {
            let dia = usuario.dia;
            if(dia == filtro){   
            let nombre = usuario.nombre;
            let comentario = usuario.comentario;
            let id = usuario.id;
            table.innerHTML += `<tr><td>${nombre}</td>
                                <td>${comentario}</td>
                                <td>${dia}</td>
                                <td><button type="button" class="borrar" name="${id}">Borrar</button></td>
                                <td><button type="button" class="editar" name="${id}">Editar</button></td>`;
            }
        }
        let btnborrar = document.querySelectorAll(".borrar");
        btnborrar.forEach(btn => {
            btn.addEventListener("click", function(){
                borrar(this);
            })
        });
        let btneditar = document.querySelectorAll(".editar");
        document.addEventListener("click",function(){
            llamarBorrar(btneditar);
        })
        btneditar.forEach(btn => {
            btn.addEventListener("click", function(){
                editar(this);
            })
        });
    } catch (error) {
        console.log(error);
    }
}

function generarcaptcha(){
    let n1 = Math.floor((Math.random() * 99999) + 1);
    let cambiodecaptcha = document.getElementById("random").innerHTML = n1;
    
    return n1;
}

//Obtiene los datos del mockapi y los muestra en la tabla
async function obtenerDatos() {
    let table = document.getElementById("contentabla");
    table.innerHTML = "";
    try {
        let res = await fetch(url); 
        let json = await res.json(); 
        console.log(json);
        for (const usuario of json) {
            let nombre = usuario.nombre;
            let comentario = usuario.comentario;
            let dia = usuario.dia;
            let id = usuario.id;
            table.innerHTML += `<tr><td>${nombre}</td>
                                <td>${comentario}</td>
                                <td>${dia}</td>
                                <td><button type="button" class="borrar" name="${id}">Borrar</button></td>
                                <td><button type="button" class="editar" name="${id}">Editar</button></td>`;
        }
        let btnborrar = document.querySelectorAll(".borrar");
        btnborrar.forEach(btn => {
            btn.addEventListener("click", function(){
                borrar(this);
            })
        });
        let btneditar = document.querySelectorAll(".editar"); //Genera un json con todos los id
        btneditar.forEach(btn => {
            btn.addEventListener("click", function(){
                editar(this);
            })
        });
    } catch (error) {
        console.log(error);
    }
}

obtenerDatos();

function corroborar(){
    let nombre = document.getElementById("nombre").value;
    let comentario = document.getElementById("comentario").value;
    let fecha = document.getElementById("dia").value;
    let captcha = document.getElementById("captchatextbox").value;
    let valido = false;
    if(!( captcha == n1) ) { 
        infocaptcha.innerHTML = "Ingrese bien el captcha";
        return valido;
      }
     
    if( nombre.length === 0 ) { 
      infocaptcha.innerHTML = "Ingrese un nombre";
      return valido;
    }
    if( comentario.length === 0 ) { 
        infocaptcha.innerHTML = "Ingrese un comentario";
        return valido;
    }
    if( fecha.length === 0 ) { 
        infocaptcha.innerHTML = "Ingrese una fecha";
        return valido;
    }
    else{
        return valido = true;
    }
}
//Agrega un usuario al mockapi
async function sendData(){
    let nombre = document.getElementById("nombre").value;
    let comentario = document.getElementById("comentario").value;
    let fecha = document.getElementById("dia").value;
    let validar = corroborar();
    if(validar){
        let usuario = {
            "nombre": nombre,
            "comentario": comentario,
            "dia" : fecha
        };
    
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(usuario)
            });
            let json = await res.json();
    
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    }
    obtenerDatos();
    limpiarCampos();
  }
//Toma el name del button que corresponde al id del objeto
  async function editar(valor){
    let id = valor.name;
    let validar = corroborar();
    let nombre = document.getElementById("nombre").value;
    let comentario = document.getElementById("comentario").value;
    let fecha = document.getElementById("dia").value;
    if(validar){
        let usuario = {
            "nombre": nombre,
            "comentario": comentario,
            "dia" : fecha
        };
    
        try {
            let res = await fetch(url + "/" + id, {
                "method": "PUT",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(usuario)
            });
            let json = await res.json();
    
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    }
      obtenerDatos();
      limpiarCampos();
  }

async function borrar(valor){
    let id = valor.name;
    console.log("Funciona"); 
    try {
        let res = await fetch(url + "/" + id, {
            "method": "DELETE",
            "headers": { "Content-type": "application/json" },
        });
        let json = await res.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
  obtenerDatos();
}
function limpiarCampos(){
    let nombre = document.getElementById("nombre").value = " ";
    let comentario = document.getElementById("comentario").value = " ";
    let fecha = document.getElementById("dia").value = " ";
    let captcha = document.getElementById("captchatextbox").value = " ";
    let mail = document.getElementById("mail").value = " ";
}
async function agregarTres(){ //funcion que agrega valores a la tabla para el boton x3
    let usuarios= []; //creo el arreglo de usuarios dentro de la funcion
    usuario = {
        "nombre" : "Ariel",
        "comentario" : "Muy buen servicio",
        "dia" : "Thusrday",
    }
    usuarios.push(usuario);
    usuario = {
        "nombre" : "Pedro",
        "comentario" : "Buenos tiempos de respuesta",
        "dia" : "Friday",
    }
    usuarios.push(usuario);
    usuario = {
        "nombre" : "Carlos",
        "comentario" : "Una maravilla",
        "dia" : "Wednesday",
    }
    usuarios.push(usuario);
    for(let i=0; i<usuarios.length; i++){ //for recorre todo el arreglo de usuarios
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(usuarios[i])
            });
            let json = await res.json();

            console.log(json);
        } catch (error) {
            console.log(error);
    }
    }
    obtenerDatos();
}
}
    
