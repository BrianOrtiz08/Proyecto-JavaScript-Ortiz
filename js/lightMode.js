//EVENTO MODO CLARO
modoClaroId.addEventListener("click", () => {
    for(elem of botonesGenerales){
        elem.classList.toggle("botonesGeneralesOscuros")
    }
    document.body.classList.toggle("bodyClaro"),
    tituloId.classList.toggle("tituloOscuro"),
    headerId.classList.toggle("headerOscuro"),
    buscarId.classList.toggle("buscarClaro"),
    noEncId.classList.toggle("noEncOscuro"),
    footerId.classList.toggle("footerOscuro"),
    footerEnlaceId.classList.toggle("footerEnlaceOscuro")
    climaId.classList.toggle("climaOscuro")

    if(document.body.classList.contains("bodyClaro")){
        localStorage.setItem("modoClaro", "true")
        modoClaroId.innerText = "Dark Mode"
    }else{
        localStorage.setItem("modoClaro", "false")
        modoClaroId.innerText = "Light Mode"
    }
})

//COMPROBAR LOCALSTORAGE
if (JSON.parse(localStorage.getItem("modoClaro")) === true) {
    document.body.classList.add("bodyClaro")
    for(elem of botonesGenerales){
        elem.classList.add("botonesGeneralesOscuros")
    }
    document.body.classList.add("bodyClaro"),
    tituloId.classList.add("tituloOscuro"),
    headerId.classList.add("headerOscuro"),
    buscarId.classList.add("buscarClaro"),
    noEncId.classList.add("noEncOscuro"),
    footerId.classList.add("footerOscuro"),
    footerEnlaceId.classList.add("footerEnlaceOscuro"),
    climaId.classList.add("climaOscuro"),
    modoClaroId.innerText = "Dark Mode"
} else {
    document.body.classList.remove("bodyClaro")
    for(elem of botonesGenerales){
        elem.classList.remove("botonesGeneralesOscuros")
    }
    document.body.classList.remove("bodyClaro"),
    tituloId.classList.remove("tituloOscuro"),
    headerId.classList.remove("headerOscuro"),
    buscarId.classList.remove("buscarClaro"),
    noEncId.classList.remove("noEncOscuro"),
    footerId.classList.remove("footerOscuro"),
    footerEnlaceId.classList.remove("footerEnlaceOscuro"),
    climaId.classList.remove("climaOscuro"),
    modoClaroId.innerText = "Light Mode"
}