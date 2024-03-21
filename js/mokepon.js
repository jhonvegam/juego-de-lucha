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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null

let inputGorila 
let inputLeopardo 
let inputZorro

let ataqueFuegobt 
let ataqueAguabt
let ataqueTierrabt 

let ataqueJugadorSec
let ataqueEnemigo

let vidasJugador = 3 
let vidasEnemigo = 3

let mascotaJugador
let mascotaJugadorObjeto
let opcionDeMokepones

let botones = []
let mokeponesEnemigos = []

let ataquesMokeponEnemigo

let indexAtaqueJugador
let indexAtaqueEnemigo

let lienzo = mapa.getContext("2d")
let intervalo 

let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20

alturaQueBuscamos = anchoDelMapa*600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa)
{
    anchoDelMapa = anchoMaximoDelMapa - 20
}

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 50
        this.alto = 70
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0 , mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon()
    {
        lienzo.drawImage(this.mapaFoto,this.x,this.y,this.ancho,this.alto)
    }


}

let mokepones = []

let gorila = new Mokepon("Gorila", "./assets/gorila.png", 5, './assets/gorila.png')
let leopardo = new Mokepon("Leopardo", "./assets/leopardo.png", 5, "./assets/leopardo.png")
let zorro = new Mokepon("Zorro", "./assets/zorro.png", 5, "./assets/zorro.png")

const GORILA_ATAQUES = [
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "fuego", id: "boton-fuego"}
]

const LEOPARDO_ATAQUES = [
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "tierra", id: "boton-tierra"}
]

const ZORRO_AATAQUES = [
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "tierra", id: "boton-tierra"}
]

gorila.ataques.push(...GORILA_ATAQUES)
leopardo.ataques.push(...LEOPARDO_ATAQUES)
zorro.ataques.push(...ZORRO_AATAQUES)

mokepones.push(gorila, leopardo, zorro)

function iniciarJuego()
{
    seccionAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>   
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        spanVidasJugador.innerHTML = vidasJugador
        spanVidasEnemigo.innerHTML = vidasEnemigo

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

    unirseAlJuego()
}

//Funcion que une la applicacion con el servidor
function unirseAlJuego()
{
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            console.log(res)
            if(res.ok)
            {
                res.text()
                    .then(function(respuesta){
                        jugadorId = respuesta
                        console.log(respuesta)
                    })
            }
        })


}

function seleccionarMascota()
{
    seccionSeleccionMascota.style.display = 'none'
    //seccionAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'

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

    seleccionarMokepon(mascotaJugador)

    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador)
{
    fetch("http://localhost:8080/mokepon/" + jugadorId, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo)
{
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques

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

function extraerAtaques(nombreMascota)
{
    let resAtaque 
    mokepones.forEach(mokepon => {
        if(mokepon.nombre === nombreMascota)
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

            let elemento = document.createElement('p')
            elemento.textContent = e.target.textContent.trim()
            ataquesDelJugador.appendChild(elemento)
            ataqueJugadorSec = e.target.textContent.trim()
            
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo()
{
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length-1)

    let elemento = document.createElement("p")
    let ataqueAct = ataquesMokeponEnemigo[ataqueAleatorio].nombre
    elemento.textContent = ataqueAct
    ataqueEnemigo = ataqueAct

    ataquesDelEnemigo.appendChild(elemento)

    resultado()
}


function crearMensaje(mensaje)
{
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = mensaje
    nuevoAtaqueDelJugador.innerHTML = ataqueJugadorSec
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    // ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    // ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
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
    if(ataqueJugadorSec == ataqueEnemigo)
    {
        crearMensaje("EMPATE")
    }
    else if(ataqueJugadorSec == "fuego" && ataqueEnemigo == "tierra")
    {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }
    else if(ataqueJugadorSec == "agua" && ataqueEnemigo == "fuego")
    {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    }
    else if(ataqueJugadorSec == "tierra" && ataqueEnemigo == "agua")
    {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    }
    else{
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador

    }
    revisarVidas()
}

function revisarVidas()
{
    if(vidasJugador > 0 && vidasEnemigo == 0)
    {
        crearMensajeFinal("HAS GANADO LA GUERRA")
    }
    else if(vidasEnemigo > 0 && vidasJugador == 0)
    {
        crearMensajeFinal("HAS PERDIDO LA GUERRA :(")
    }
}

function reiniciar()
{
    location.reload()
}

function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min+1)) + min;
}

function pintarCanvas()
{
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0,0,mapa.width, mapa.height)

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    

    mokeponesEnemigos.forEach(function(enemigo) {
        if(enemigo != undefined)
        {
            enemigo.pintarMokepon()      
        }
    })


    // if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.y !== 0)
    // {

    // }   
}

function enviarPosicion(x,y)
{
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x:x, // se puede escribir solo x dado que el valor y la llaven se llaman igual x:x, lo hago para y
            y
        })
    })
        .then(function(res)
        {
            if(res.ok)
            {
                res.json()
                    .then(function({enemigos}){
                        console.log(enemigos)

                        if(enemigos != undefined)
                        {
                            mokeponesEnemigos = enemigos.map(function(enemigo) {
                                if(enemigo.mokepon != undefined)
                                {
                                    let mokeponEnemigo = null
                                    const mokeponNombre = enemigo.mokepon.nombre || ""

                                    if(mokeponNombre === "Gorila")
                                    {
                                        mokeponEnemigo = new Mokepon("Gorila", "./assets/gorila.png", 5, './assets/gorila.png')
                                    }
                                    else if(mokeponNombre === "Leopardo")
                                    {
                                        mokeponEnemigo = new Mokepon("Leopardo", "./assets/leopardo.png", 5, "./assets/leopardo.png")
                                    }
                                    else if(mokeponNombre === "Zorro")
                                    {
                                        mokeponEnemigo = new Mokepon("Zorro", "./assets/zorro.png", 5, "./assets/zorro.png")
                                    }

                                    mokeponEnemigo.x = enemigo.x
                                    mokeponEnemigo.y = enemigo.y
                                    return mokeponEnemigo
                                }
                            })
                        }
                    })
            }
        })
}

function moverDerecha()
{
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda()
{
    mascotaJugadorObjeto.velocidadX = -5

}

function moverAbajo()
{
    mascotaJugadorObjeto.velocidadY = 5

}

function moverArriba()
{
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event)
{
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        
        case 'ArrowDown':
            moverAbajo()
            break
        
        case 'ArrowLeft':
            moverIzquierda()
            break

        case 'ArrowRight':
            moverDerecha()
            break
        
        default:
            break
    }
}

function iniciarMapa()
{ 
    mascotaJugadorObjeto = obtenerObjetoMascota()

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota()
{
    for (let i = 0; i < mokepones.length; i++) 
    {
        if(mokepones[i].nombre === mascotaJugador)
        {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo)
{
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x 

    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo)
    {
      return  
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detectó una colisión')
    seccionAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    // alert("Hay colision" + enemigo.nombre)
}


//Acción que escucha cuando el evento de carga total de la pagina se completó
window.addEventListener('load', iniciarJuego)