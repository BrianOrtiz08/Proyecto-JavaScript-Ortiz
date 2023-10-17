//Evento para mostrar card de agregar jugador
agregarJugadorId.addEventListener("click", () => {
    cardAgregarJugadorId.classList.toggle("cardAgregarJugadorMostrar")
    if (cardAgregarJugadorId.classList.contains("cardAgregarJugadorMostrar")) {
        agregarJugadorId.innerHTML = "Cerrar Card";
    } else {
        agregarJugadorId.innerHTML = "Agregar Jugador";
    }
})

//Evento para capturar datos de los inputs de la card para agregar un jugador
guardarJugadorId.addEventListener("click", () => {
    addJugador(),
    cardAgregarJugadorId.classList.remove("cardAgregarJugadorMostrar")
    agregarJugadorId.innerHTML = "Agregar Jugador";
    mostrarJugDom(JSON.parse(localStorage.getItem("jugadoresDOM")))
})

//Evento para mostrar card de eliminar jugador
eliminarJugadorId.addEventListener("click", () => {
    cardEliminarJugadorId.classList.toggle("cardEliminarJugadorMostrar")
    if (cardEliminarJugadorId.classList.contains("cardEliminarJugadorMostrar")) {
        eliminarJugadorId.innerHTML = "Cerrar Card";
    } else {
        eliminarJugadorId.innerHTML = "Eliminar Jugador";
    }
})

//Evento para capturar datos de los inputs de la card para eliminar un jugador al dar enter
inputJugadorEliminadoId.addEventListener("keypress", (tecla) => {
    if (tecla.keyCode === 13) {
        let numero = parseInt(inputJugadorEliminadoId.value)
        deleteJugador(jugadores, numero)
        
        
        if(jugadores.length === 0){
            console.log("no hay jugadoers")
            noEncId.innerText = "No hay jugadores agregados"
            eliminarJugadorId.innerHTML = "Eliminar Jugador";
        }else{
            noEncId.innerText = ""
            mostrarJugDom(JSON.parse(localStorage.getItem("jugadoresDOM")))
            eliminarJugadorId.innerHTML = "Eliminar Jugador";
        }
    }
})

//Evento para ordenar según la opción elegida
opcionesOrdenarId.addEventListener("change", () => {
    switch (opcionesOrdenarId.value) {
        case "1":
            ordenNombre(jugadores)
            break

        case "2":
            ordenEdad(jugadores)
            break

        case "3":
            ordenPartidos(jugadores)
            break

        default:
            mostrarJugDom(jugadores)
            break
    }
})

//Evento para capturar caracteres del input y buscar en base a ello
buscarId.addEventListener("input", () => {
    buscarInfo(buscarId.value, jugadores)
})

//Evento para mostrar el carrito
carritoId.addEventListener("click", () => {
    cardCarritoId.classList.toggle("cardCarritoMostrar")
    addCarritoDom(jugadoresCarrito)
})

//Evento para cerrar carrito con la cruz
cardCarritoXId.addEventListener("click", () => {
    cardCarritoId.classList.remove("cardCarritoMostrar")
})

//Evento para cerrar carrito desde el "cerrar"
cardCarritoCerrarId.addEventListener("click", () => {
    cardCarritoId.classList.remove("cardCarritoMostrar")
})

//Evento para finalizar compra
cardCarritoFinalizarId.addEventListener("click", () => {
    finalizarCompra(jugadoresCarrito)
    cardCarritoId.classList.remove("cardCarritoMostrar")
})