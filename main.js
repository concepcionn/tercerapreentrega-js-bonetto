function programaPrincipal() {
     //array de productos
    let productos = [
   {id: 1, nombre: "Hongos de pino", categoria: "natural", rutaImagen: "./img/hongos-pino.jpg", stock: 4, precio: 2200 },
   {id: 4, nombre: "Aceitunas", categoria: "gourmet", rutaImagen: "./img/aceitunas.jpg", stock: 10, precio: 2000 },
   {id: 7, nombre: "Pasta de mani", categoria: "gourmet", rutaImagen: "./img/pasta-mani.jpg", stock: 15, precio: 800},
   {id: 9, nombre: "Champignones", categoria: "natural", rutaImagen: "./img/hongos-champi.jpg", stock: 6, precio: 1800 },
   {id: 11, nombre: "Frutos secos", categoria: "natural", rutaImagen: "./img/frutos-secos.jpg", stock: 8, precio: 3500 },
   {id: 15, nombre: "Fideos secos", categoria: "gourmet", rutaImagen: "./img/fideos.jpg", stock: 20, precio: 950 },
   {id: 18, nombre: "Escabeche", categoria: "gourmet", rutaImagen: "./img/escabeche.jpg",  stock: 9, precio: 1450 },
   {id: 24, nombre: "Aceite de oliva extra virgen", categoria: "gourmet", rutaImagen: "./img/oliva.jpg",  stock: 10, precio: 2500 },
   {id: 29, nombre: "Chocolate", categoria: "gourmet", rutaImagen: "./img/chocolate.jpg", stock: 14, precio: 900},
]

    //creacion de carrito
    let carrito = []
    let carritoJSON = JSON.parse(localStorage.getItem("carrito"))

    if (carritoJSON) {
    carrito = carritoJSON
    }

    //filtro de busqueda
    //por nombre
    let buscador = document.getElementById("buscador")
    buscador.addEventListener("input", () => filtrar(productos))

    let contenedorFiltros = document.getElementById("filtros")

    //carrito
    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click", mostrarOcultar)


    crearFiltros(productos, contenedorFiltros)

    crearTarjeta (productos, carrito)

    crearCarrito (carrito)

    let finalizar = document.getElementById("finalizar")
    finalizar.addEventListener("click", () => finalizarCompra(carrito))
}
   
programaPrincipal()

function crearTarjeta(array, carrito) {
    // creacion de tarjetas de productos
    let contenedor = document.getElementById("padre")
    contenedor.innerHTML = ""

    array.forEach(element => {
    let mensaje = element.precio
    
    let tarjeta = document.createElement("div")

    if (element.stock === 0) {
        mensaje = "Sin stock"
    }

    tarjeta.classList.add("tarjetaProducto")

    tarjeta.innerHTML = `
    <h3>${element.nombre}</h3>
    <img src="${element.rutaImagen}">
    <h4>$${mensaje}</h4>
    <a id="${element.id}" class="btn btn-secondary"  role="button" aria-disabled="false">Agregar</a>
    `
    contenedor.append(tarjeta)

    let botonAgregarCarrito = document.getElementById(element.id)
    botonAgregarCarrito.addEventListener("click", () => agregarAlCarrito(array, element.id, carrito))
})
}

function filtrar (productos) {
    let arrayFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    crearTarjeta(arrayFiltrado)
}

//filtro de botones por categoria
function crearFiltros (arrayDeElementos, contenedorFiltros, contenedorTarjetas) {
    let filtros = ["principal"]
    arrayDeElementos.forEach(prod => {
     if (!filtros.includes(prod.categoria))
     filtros.push(prod.categoria)
 })
 
 filtros.forEach(filtro => {
     let boton = document.createElement("button")
     boton.id = filtro
     boton.innerText = filtro
     contenedorFiltros.append(boton)
   
    let botonesFiltro = document.getElementById(filtro)
    botonesFiltro.addEventListener("click", (event) => filtrarPorCategoria(event.target.id, arrayDeElementos, contenedorTarjetas))
})
}

function filtrarPorCategoria (id, productos) {
    if (id === "principal") {
        crearTarjeta(productos)
    } else {
        let arrayFiltrado = productos.filter(producto => producto.categoria === id)
        crearTarjeta(arrayFiltrado) 
    }   
} 

function mostrarOcultar() {
    let padreProd = document.getElementById("padreProd")
    let carrito = document.getElementById("contenedorCarrito")
    padreProd.classList.toggle("oculto")
    carrito.classList.toggle("oculto")
}

// agregar al carrito
function agregarAlCarrito (productos, id, carrito) {
    let productoBuscado = productos.find(prod => prod.id === id)
    let posicionProdEnCarrito = carrito.findIndex(prod => prod.id === id)

    if (posicionProdEnCarrito !== -1) {
        carrito[posicionProdEnCarrito].unidades++
        carrito[posicionProdEnCarrito].subtotal = carrito[posicionProdEnCarrito].unidades * carrito[posicionProdEnCarrito].precioUnitario
    } else { 
        carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: 1,
        subtotal: productoBuscado.precio
    })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    crearCarrito(carrito)
}

function crearCarrito (carritoJSON) {
    let carritoReal = document.getElementById("carrito")
    carritoReal.innerHTML = `
        <p>Unidades</p>
        <p>Nombre</p>
        <p>Precio</p>
        <p>Subtotal</p> 
    `


    carritoJSON.forEach(prod => {
        let elementoCarrito = document.createElement("div")
        elementoCarrito.classList.add("elementoCarrito")
        elementoCarrito.innerHTML = `
            <p>${prod.unidades}<p> 
            <p>${prod.nombre}</p> 
            <p>${prod.precioUnitario}</p> 
            <p>${prod.subtotal}</p>
        `
        carritoReal.append(elementoCarrito)
        
    })
        
}

// finalizar compra
function finalizarCompra (carrito) {
    let carritoReal = document.getElementById("carrito")
    carritoReal.innerHTML = ""
    localStorage.removeItem("carrito")
    carrito = []
    
}



/* let nombre = prompt("Ingrese su nombre") .toLowerCase()
 while (!isNaN(nombre) || (nombre == " ")){
    nombre = (prompt("Por favor ingrese un nombre")) 
}
alert("Bienvenido/a, " + nombre)

let edad = Number(prompt("Ingrese su edad"))

let mensaje = "Seleccione una opción: \n1- Ver lista de productos \n2- Comprar productos \n3- Ver precio de cada producto \n4- Ver productos más económicos \n5- Ver carrito \n6- Ver total del carrito y finalizar compra \n0- Salir"

let respuesta

let carrito = []


while ((isNaN(edad)) || (edad == " ")) {
    edad = (prompt("Por favor ingrese su edad en números"))   
} 

if (edad < 18) {
        alert("Ud. no posee edad suficiente para realizar esta compra")
        alert("Muchas gracias por su visita")
} else {
        alert("A continuación se habilitará su carrito de compras")
        do {
            respuesta = Number(prompt(mensaje))
            if (respuesta === 1) {
                alert(listar(productos))
            } else if (respuesta === 2) {
                let id = Number(prompt("Escoja el ID de su producto:\n" + listar(productos)))
                let productoBuscado = productos.find(prod => prod.id === id)
                let posicionProductoCarrito = carrito.findIndex(prod => prod.id === productoBuscado.id)
                if (posicionProductoCarrito === -1){
                    carrito.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.nombre,
                    precioUnitario: productoBuscado.precio,
                    cantidad: 1,
                    subtotal: productoBuscado.precio
                }) 
                } else {
                    carrito[posicionProductoCarrito].cantidad++
                    carrito[posicionProductoCarrito].subtotal = [posicionProductoCarrito].precioUnitario * [posicionProductoCarrito].cantidad
                }
                console.log(carrito)

            } else if (respuesta === 3) {
                let productosPrecio = productos.map((producto) => producto.id + " - " + producto.nombre + " - $" + producto.precio + "\n")
                alert(productosPrecio)          
            } else if (respuesta === 4) {
                let productosEconomicos = productos.filter(((el) => el.precio < 2000))
                alert(listar(productosEconomicos))
            } else if (respuesta === 5) {
                 if (carrito.length > 0) {
                    alert(listar(carrito))
                } else {
                    alert("Primero debe ingresar un producto")
                }
            } else if (respuesta === 6){
                 let precioFinal = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
                alert("El total de su carrito es de: " + precioFinal)
                validarTotal(precioFinal)
            } else {
                alert("Debe ingresar un número del 0 al 6") 
            }
        } while (respuesta !== 0)
alert("Muchas gracias por su visita") 
}



function validarTotal(total) {
    if (total === 0){
        return "Debe agregar al menos un producto"
    } else {
        return "Muchas gracias por su compra. Lo esperamos pronto"
    }
}

function listar (arrayListado){
    let opcion = "ID - Nombre\n"
    arrayListado.forEach(element => { opcion = opcion + element.id + " - " + element.nombre + "\n"    
    });
    return opcion
}


 
 */