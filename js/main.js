//VARIABLE PARA LUXON
const DateTime = luxon.DateTime;

setInterval(() => {
    let fechaNow = DateTime.now();
    footerFechaId.innerHTML = `${fechaNow.toLocaleString(DateTime.DATE_HUGE)} - ${fechaNow.toLocaleString(DateTime.TIME_WITH_SECONDS)}`
}, 1000)

//CLASS CONSTRUCTOR
class Jugador {
    constructor(numero, nombre, edad, club, liga, partidos, valor, imagen) {
        //Propiedades
        this.numero = numero,
            this.nombre = nombre,
            this.edad = edad,
            this.club = club,
            this.liga = liga,
            this.partidos = partidos,
            this.valor = valor,
            this.imagen = imagen
    }
}

let jugadores = []

let jugadoresCarrito = localStorage.getItem("Carrito") ? JSON.parse(localStorage.getItem("Carrito")) : [];

//CARGANDO ARRAY DE JUGADORES CON FETCH Y ASYNC AWAIT
async function cargarJugadores() {
    const respuesta = await fetch("./json/jugadores.json")
    const informacionJson = await respuesta.json()

    for (let jugador of informacionJson) {
        let jugadorJson = new Jugador(jugador.numero, jugador.nombre, jugador.edad, jugador.club, jugador.liga, jugador.partidos, jugador.valor, jugador.imagen)
        jugadores.push(jugadorJson)
    }

    localStorage.setItem("jugadoresDOM", JSON.stringify(jugadores))
    mostrarJugDom(jugadores)
}

//TESTEO DE LOCAL STORAGE PARA EL ARRAY JUGADORES Y LOADER
setTimeout(() => {
    cargandoContainerId.classList.add("borrarLoader")
    if (localStorage.getItem("jugadoresDOM")) {
        jugadores = JSON.parse(localStorage.getItem("jugadoresDOM"))
        if (jugadores.length === 0) {
            noEncId.innerText = "No hay jugadores agregados"
        } else {
            noEncId.innerText = ""
            mostrarJugDom(JSON.parse(localStorage.getItem("jugadoresDOM")))
        }
    } else {
        cargarJugadores()
    }
}, 3000)

//REMOVER LOADER
setTimeout(() => {
    cargandoContainerId.remove()
}, 3500)

//FUNCION PARA MOSTRAR EL CLIMA
function obtenerClima() {
    let apiKey = '38fa05337c4da13c58b921a3ee347036';
    let ciudad = 'Venado Tuerto'; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        let temp = kelvACent(data.main.temp);
        let tempMin = kelvACent(data.main.temp_min);
        let tempMax = kelvACent(data.main.temp_max);
        let iconCode = data.weather[0].icon;

        let ciudadId = document.getElementById("ciudadId");
        let tempId = document.getElementById("tempId");
        let tempMinId = document.getElementById("tempMinId");
        let tempMaxId = document.getElementById("tempMaxId");
        let iconoId = document.getElementById("iconoId");

        ciudadId.innerText = ciudad;
        tempId.innerText = `${temp} °C`;
        tempMinId.innerText = `Mín: ${tempMin} °C`;
        tempMaxId.innerText = `Máx: ${tempMax} °C`;
        iconoId.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    })
    .catch(error => console.error('Error al obtener datos del clima:', error));
}

obtenerClima()

//FUNCION PARA CONVERTIR DE KELVIN A CENTIGRADOS
function kelvACent(k) {
    return Math.round(k - 273.15);
}

//FUNCTION PARA MOSTRAR LA LISTA DE JUGADORES
function mostrarJugDom(array) {
    contenedorCardsId.innerHTML = "" //Limpio pantalla para que no queden repetidos
    noEncId.innerText = ""
    for (let i = 0; i < array.length; i++) {
        let divJugadorAdd = document.createElement("div")

        divJugadorAdd.innerHTML = `
            <div class="cardJugador">
                <div class="cardImagen">
                    <img src="${array[i].imagen}" alt="" class="cardImg">
                </div>

                <div class="cardInfo">
                    <h3 class="cardNombre">${array[i].numero} - ${array[i].nombre}</h3>
                    <p class="cardItem cardEdad">Edad: ${array[i].edad} años</p>
                    <p class="cardItem cardClub">Club: ${array[i].club}</p>
                    <p class="cardItem cardLiga">Liga: ${array[i].liga}</p>
                    <p class="cardItem cardPartidos">Partidos: ${array[i].partidos}</p>
                    <p class="cardItem cardValor">Valor: $${array[i].valor} millones</p>

                    <button class="comprarJugador botonesGenerales" id="comprarJugador${array[i].numero}">Comprar</button>
                </div>
            </div>
        `

        contenedorCardsId.append(divJugadorAdd)

        //Evento para los botones de compra
        let comprarJugador = document.getElementById(`comprarJugador${array[i].numero}`)
        comprarJugador.addEventListener("click", () => {
            addCarrito(array[i].numero)
        })
    }
}

//FUNCTION PARA AGREGAR UN JUGADOR
function addJugador() {
    let inputNombreId = document.getElementById("inputNombreId")
    let inputEdadId = document.getElementById("inputEdadId")
    let inputClubId = document.getElementById("inputClubId")
    let inputLigaId = document.getElementById("inputLigaId")
    let inputImagenId = document.getElementById("inputImagenId")

    let inputPartidosId = document.getElementById("inputPartidosId")

    let jugadorAdd = new Jugador(jugadores.length + 1, inputNombreId.value, inputEdadId.value, inputClubId.value, inputLigaId.value, inputPartidosId.value, inputValorId.value, inputImagenId.value)

    jugadores.push(jugadorAdd)

    inputNombreId.value = ""
    inputEdadId.value = ""
    inputClubId.value = ""
    inputLigaId.value = ""
    inputPartidosId.value = ""
    inputValorId.value = ""
    inputImagenId.value = ""

    localStorage.setItem("jugadoresDOM", JSON.stringify(jugadores)) //Vuelvo a pisar el localStorage para que cuando vuelva a ingresar no se pierdan los datos

    mostrarJugDom(jugadores)
}

//FUNCTION PARA ELIMINAR UN JUGADOR
function deleteJugador(array, numJugador) {

    let i = -1; // Inicializa el índice con -1

    for (let elem of array) {
        if (elem.numero === numJugador) {
            i = array.indexOf(elem);
            array.splice(i, 1); // Elimina el elemento si se encuentra
        }
    }

    if (i === -1) {
        inputJugadorEliminadoId.value = ""
        inputJugadorEliminadoId.placeholder = "Jugador no encontrado";
    } else {
        for (let j = 0; j < array.length; j++) {
            array[j].numero = j + 1;
        }

        cardEliminarJugadorId.classList.remove("cardEliminarJugadorMostrar")
        inputJugadorEliminadoId.value = ""

        localStorage.setItem("jugadoresDOM", JSON.stringify(jugadores))

        mostrarJugDom(array)
    }
}

//FUNCTION PARA ORDENAR ALFABÉTICAMENTE A LOS JUGADORES
function ordenNombre(array) {
    let jugadoresAlf = array.concat()

    jugadoresAlf.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1
        }
        if (a.nombre > b.nombre) {
            return 1
        }
        return 0
    })

    mostrarJugDom(jugadoresAlf)
}

//FUNCTION PARA ORDENAR POR EDAD A LOS JUGADORES
function ordenEdad(array) {
    let jugadoresEdad = array.concat()

    jugadoresEdad.sort((a, b) => {
        if (a.edad < b.edad) {
            return -1
        }
        if (a.edad > b.edad) {
            return 1
        }
        return 0
    })

    mostrarJugDom(jugadoresEdad)
}

//FUNCTION PARA ORDENAR POR PARTIDOS JUGADOS A LOS JUGADORES
function ordenPartidos(array) {
    let jugadoresPartidos = array.concat()

    jugadoresPartidos.sort((a, b) => {
        if (b.partidos < a.partidos) {
            return -1
        }
        if (b.partidos > a.partidos) {
            return 1
        }
        return 0
    })

    mostrarJugDom(jugadoresPartidos)
}

//FUNCTION PARA BUSCAR INFORMACION
function buscarInfo(caracter, array) {
    let res = array.filter(
        (elem) => {
            return elem.nombre.toLowerCase().includes(caracter.toLowerCase()) || elem.club.toLowerCase().includes(caracter.toLowerCase()) || elem.liga.toLowerCase().includes(caracter.toLowerCase())
        }
    )

    //Ternario.
    res.length == 0 ? (noEncId.innerText = "No hay coincidencias", mostrarJugDom(jugadores)) : (mostrarJugDom(res), noEncId.innerText = "")
}

//FUNCTION PARA AGREGAR JUGADOR AL CARRITO
function addCarrito(numJugador) {
    let jugadorAdd = jugadores.find((jugador) => jugador.numero === numJugador)

    if (jugadorAdd === undefined) {
        console.log("No se encontró el jugador")
    } else {
        let enCarrito = jugadoresCarrito.some((jugador) => jugador.numero === numJugador)

        if (!enCarrito) {
            jugadoresCarrito.push(jugadorAdd)
            localStorage.setItem("Carrito", JSON.stringify(jugadoresCarrito))
            Toastify(
                {
                    text: `El jugador ${jugadorAdd.nombre} se agregó al carrito`,
                    duration: 2000,
                    gravity: "bottom",
                    position: "left",
                    style: {
                        background: "#24C86F",
                        color: "black"
                    }
                }
            ).showToast();
            addCarritoDom(jugadoresCarrito)
        } else {
            Toastify(
                {
                    text: `El jugador ${jugadorAdd.nombre} ya está en el carrito`,
                    duration: 2000,
                    gravity: "bottom",
                    position: "left",
                    style: {
                        background: "#D42D3D",
                        color: "black"
                    }
                }
            ).showToast();
        }
    }
}

//FUNCTION PARA AGREGAR AL CARRITO DOM
function addCarritoDom(array) {
    cardCarritoDosId.innerHTML = ""

    array.forEach((jugador) => {
        cardCarritoDosId.innerHTML += `
        <div class="cardCarritoDosContenedor" id="cardCarritoDosContenedor${jugador.numero}">
                <button class="cardCarritoEliminar botonesGenerales" id="cardCarritoEliminarId${jugador.numero}">
                    <img src="./img/deleteLight.svg" alt="" class="cardCarritoEliminarImg">
                </button>

                <div class="cardCarritoDosContenedorA">
                    <p>${jugador.nombre}</p>
                    <p>$${jugador.valor} millones</p>
                </div>
            </div>
        `
    })

    //forEach para eliminar jugadores con el botón
    array.forEach((jugador) => {
        document.getElementById(`cardCarritoEliminarId${jugador.numero}`).addEventListener("click", () => {
            //Borrar del DOM
            let divJugador = document.getElementById(`cardCarritoDosContenedor${jugador.numero}`)
            divJugador.remove()
            //Borrar del array
            let indJugador = array.indexOf(jugador)
            array.splice(indJugador, 1)
            //Borrar del storage
            localStorage.setItem("Carrito", JSON.stringify(array))
            addCarritoDom(array)
        })
    })

    calcularTotal(array)
}

//FUNCTION PARA CALCULAR EL TOTAL
function calcularTotal(array) {
    let totalValor = array.reduce((acc, elem) => acc + elem.valor, 0)

    totalValor == 0 ? (cardCarritoPrecioId.innerText = `No hay jugadores en el carrito`, cardCarritoPrecioId.classList.add("start")) : (cardCarritoPrecioId.innerText = `Total: $${totalValor} millones`, cardCarritoPrecioId.classList.remove("start"))

    return totalValor
}

//FUNCTION PARA FINALIZAR COMPRA
function finalizarCompra(array) {
    let totalCompra = calcularTotal(array)

    if (totalCompra > 0) {
        Swal.fire({
            title: 'Felicitaciones!',
            text: `El monto a pagar es $${totalCompra} millones`,
            imageUrl: 'img/finalizarCompra.jpeg',
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: 'Selección Argentina campeona en Qatar 2022',
        })
    } else {
        Swal.fire({
            title: 'Uf que pena!',
            text: `No hay jugadores en el carrito`,
            icon: 'error',
        })
    }

    jugadoresCarrito = []

    localStorage.removeItem("Carrito")
}