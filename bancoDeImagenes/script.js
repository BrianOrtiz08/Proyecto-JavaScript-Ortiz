let cargandoContainerId = document.getElementById("cargandoContainerId")
let oculto = document.getElementById("oculto")

setTimeout(() => {
    cargandoContainerId.remove()
}, 4500)

setTimeout(() => {
    oculto.classList.remove("ocultar")
}, 3500)