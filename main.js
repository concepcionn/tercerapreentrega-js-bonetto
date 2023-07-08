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

// creacion de tarjetas de productos
let contenedor = document.getElementById("padre")

crearTarjeta (productos, contenedor)

function crearTarjeta(array) {
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

    let botonCarrito = document.getElementById(element.id)
    botonCarrito.addEventListener("click", (e)=>console.log(e.target.id))
})
}

//filtro de busqueda
//por nombre
let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrar)

function filtrar () {
    let arrayFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value))
    crearTarjeta(arrayFiltrado)
}


//filtro de botones por categoria
let botonesFiltro = document.getElementsByClassName("filtro")
    for (const botonFiltro of botonesFiltro){
    botonFiltro.addEventListener("click", filtrarPorCategoria)
} 


function filtrarPorCategoria (event) {
    let arrayFiltrado = productos.filter(producto => productos.categoria === event.target.value)
    crearTarjeta(arrayFiltrado) 
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




    



 

