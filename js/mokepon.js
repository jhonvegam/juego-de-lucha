const seccionAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('reiniciar')

const seccionSeleccionMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const contenedorAtaques = document.getElementById('contenedor-ataques')


let inputGorila 
let inputLeopardo 
let inputZorro

let ataqueFuegobt 
let ataqueAguabt
let ataqueTierrabt 

let ataqueJugador
let ataqueEnemigo = []

let vidasJugador = 3 
let vidasEnemigo = 3

let mascotaJugador
let opcionDeMokepones

let botones = []
let ataqueJugadorSec = []

let ataquesMokeponEnemigo

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let mokepones = []

let gorila = new Mokepon("Gorila", "./assets/gorila.png", 5)
let leopardo = new Mokepon("Leopardo", "./assets/leopardo.png", 5)
let zorro = new Mokepon("Zorro", "./assets/zorro.png", 5)

gorila.ataques.push(
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "fuego", id: "boton-fuego"}
)

leopardo.ataques.push(
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "tierra", id: "boton-tierra"}
)

zorro.ataques.push(
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "tierra", id: "boton-tierra"}
)

mokepones.push(gorila, leopardo, zorro)

function iniciarJuego()
{
    seccionAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>   
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

         inputGorila = document.getElementById('Gorila')
         inputLeopardo = document.getElementById('Leopardo')
         inputZorro = document.getElementById('Zorro')
    })

    seccionReiniciar.style.display = 'none'
    //Agregar el atributo de escucha de eventos, para este caso se escucha el evento de click sobr el boton.
    //@param: click, tipo de acción a escuchar del botón
    //@param: funcióv+n, función a ejecutar al hacer click en el botón, tipo de acción a escuchar del botón
    botonMascotaJugador.addEventListener('click', seleccionarMascota)
    botonReiniciar.addEventListener('click', reiniciar)
}

function seleccionarMascota()
{
    seccionSeleccionMascota.style.display = 'none'
    seccionAtaque.style.display = 'flex'

    if(inputGorila.checked)
    {
        spanMascotaJugador.innerHTML = inputGorila.id
        mascotaJugador = inputGorila.id
    }
    else if(inputLeopardo.checked)
    {
        spanMascotaJugador.innerHTML = inputLeopardo.id
        mascotaJugador = inputLeopardo.id
    }
    else if(inputZorro.checked)
    {
        spanMascotaJugador.innerHTML = inputZorro.id
        mascotaJugador = inputZorro.id
    }
    else
    {
        alert('Debe seleccionar una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo()
{
    mascotaAleatoria = mokepones[aleatorio(0,mokepones.length-1)]
    spanMascotaEnemigo.innerHTML = mascotaAleatoria.nombre
    ataquesMokeponEnemigo = mascotaAleatoria.ataques

    botonesAtaques()
}

function botonesAtaques()
{   
    extraerAtaques(mascotaJugador).forEach(ataque => {
        botonAtaqueMascota = `
        <button id = ${ataque.id} class="boton-de-ataque BAtaque"> ${ataque.nombre} </button> 
        `
        contenedorAtaques.innerHTML += botonAtaqueMascota
    })

    ataqueFuegobt = document.getElementById('boton-fuego')
    ataqueAguabt = document.getElementById('boton-agua')
    ataqueTierrabt = document.getElementById('boton-tierra')

    botones = document.querySelectorAll(".BAtaque")

    secuenciaAtaque()
}

function extraerAtaques(nombreMasctota)
{
    let resAtaque 
    mokepones.forEach(mokepon => {
        if(mokepon.nombre === nombreMasctota)
        {
            resAtaque = mokepon.ataques
        }
    })

    return resAtaque
}

function secuenciaAtaque()
{
    botones.forEach(boton =>{
        boton.addEventListener("click", (e) => {
            if(e.target.textContent.trim() === "fuego")
            {
                ataqueJugadorSec.push("fuego")
                console.log(ataqueJugadorSec)
                boton.style.background = "#112f58"
            }
            else if(e.target.textContent.trim() === "agua")
            {
                ataqueJugadorSec.push("agua")
                console.log(ataqueJugadorSec) 
                boton.style.background = "#112f58"
            }
            else
            {
                ataqueJugadorSec.push("tierra")
                console.log(ataqueJugadorSec)
                boton.style.background = "#112f58"
            }
            
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo()
{
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length-1)

    if(ataqueAleatorio == 1)
    {
        ataqueEnemigo.push("fuego")
    }
    else if(ataqueAleatorio == 2)
    {
        ataqueEnemigo.push("agua")
    }
    else
    {
        ataqueEnemigo.push("tierra")
    }

    console.log(ataqueEnemigo)
    crearMensaje()
}

function crearMensaje()
{
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado()
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    revisarVidas()
}


function revisarVidas()
{
    if(vidasJugador == 0)
    {
        crearMensajeFinal('PERDISTE LA GUERRA')
    }
    else if(vidasEnemigo == 0)
    {
        crearMensajeFinal('GANASTE LA GUERRA')
    }
}

function crearMensajeFinal(resultadoFinal)
{
    document.getElementById('resultado').innerHTML = resultadoFinal
    
    ataqueFuegobt.disabled = true

    ataqueAguabt.disabled = true

    ataqueTierrabt.disabled = true

    seccionReiniciar.style.display = 'block'

}

function resultado()
{
    res = ''
    if (ataqueJugador == ataqueEnemigo){
        res = 'EMPATE'
    }

    else{
        if(ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua')
        {
            res = 'GANASTE'
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo

        }

        else if(ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra')
        {
            res = 'GANASTE'
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }

       else if(ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego')
        {
            res = 'GANASTE'
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }

        else
        {
            res = 'PERDISTE'
            vidasJugador--
            spanVidasJugador.innerHTML = vidasJugador
        }
    }

    return res
}

function reiniciar()
{
    location.reload()
}

function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min+1)) + min;
}

//Acción que escucha cuando el evento de carga total de la pagina se completó
window.addEventListener('load', iniciarJuego)