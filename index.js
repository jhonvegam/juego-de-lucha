//libreria para conectar el servidor con la aplicación
const express = require("express")
//libreria para que no me genere errores de conexión
const cors = require("cors")

const app = express()

//deshabilitar todos los posibles errores por cors
app.use(cors())
//habilitar recibir peticiones post en formato json
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon)
    {
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y)
    {
        this.x = x
        this.y = y
    }

    asignarAtaque(ataque)
    {
        this.ataque = ataque
    }
}

class Mokepon {
    constructor(nombre)
    {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) =>{
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {//se ponen 2 puntos porque es la forma de definir que ahí va una variable (jugadorId es una variable que será pasada por parametro)
    const jugadorId = req.params.jugadorId || "" //Se accede a la variable que se envió por medio de la URL
    const nombre = req.body.mokepon || "" //accede al body del json que se envió 
    const mokepon = new Mokepon(nombre)
    const jugadorIndex= jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if(jugadorIndex>=0)
    {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
}) 

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "" //Se accede a la variable que se envió por medio de la URL
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex= jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if(jugadorIndex>=0)
    {
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})  

app.post("/mokepon/:jugadorId/ataque", (req, res) => {
    const jugadorId = req.params.jugadorId || "" //Se accede a la variable que se envió por medio de la URL
    const ataque = req.body.ataque

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex>=0)
    {
        jugadores[jugadorIndex].asignarAtaque(ataque)
    }

    res.end()
})  

app.get("/mokepon/:jugadorId/ataque", (req, res) =>{
    const jugadorId = req.params.jugadorId || "" //Se accede a la variable que se envió por medio de la URL
    const jugador = jugadores.find((jugador) => jugadorId === jugador.id)

    res.send({
        ataque: jugador.ataque || ""
    })

})


app.listen(8080, () => {
    console.log("Servidor funcionando")
})