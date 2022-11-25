let comentariosJson = [];
let ejemploPrueba = [1]

document.addEventListener("DOMContentLoaded", function () {
 getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productosUbicados = resultObj.data;
      mostrarProductoSeleccionado(productosUbicados);
      desplegarProductosRelacionados(productosUbicados.relatedProducts);
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentariosJson = resultObj.data;
      mostrarComentarios(comentariosJson);
    }
    
  });


  document.getElementById("agregar").addEventListener("click", function () {
    let nuevoComentario = agregarNuevoComentario();
    console.log("Log3:" + nuevoComentario);
    comentariosJson.push(nuevoComentario);
    mostrarComentarios(comentariosJson);
    document.getElementById("descripcion").value = ""; //deja el valor de descripcion en vacio
  });
  document.getElementById("nombre_usuario").innerHTML =
    localStorage.getItem("user");

});

function mostrarComentarios(jsoncomentarios) {
  // for que me recorre la cantidad de puntos y va pintando las estrellas
  let comentario = "";

  for (let i = 0; i < jsoncomentarios.length; i++) {
    let comentarioActual = jsoncomentarios[i];

    let puntos = "";
    for (let i = 0; i < 5; i++) {
      if (i <= comentarioActual.score - 1) {
        puntos += `<span class="fa fa-star checked" ></span> `; //estrella llena
      } else {
        puntos += `<span class="fa fa-star" ></span> `; //estrella vacia
      }
    }

    comentario +=
`
            <div class="list-group-item list-group-item">

            <div>
            <b><p> ` +
comentarioActual.user +
`</p></b>
            <p> ` +
comentarioActual.dateTime +
`</p> 
            <p> ` +
comentarioActual.description +
`</p> 
            <div> ${puntos} </div>
            </div>
            </div>
                `;
}

document.getElementById("comentarios").innerHTML = comentario;
}

function mostrarProductoSeleccionado(productoActual) {
let imagen = [];

for (let i = 0; i < productoActual.images.length; i++) {
    let imagenActual = productoActual.images[i];

    imagen += `
            <div id= "hola" class="col-3">
                <img src="${imagenActual}"style="width:290px;height:190px;">
            </div>
        `;
}

let productos = `
    
    <div>
    <div>
    
     <h1 style="margin-top: 20px"> ${productoActual.name} 
     <button onclick="agregarProductosALocalStorage()" id="boton" type="button" class="btn btn-success" style="float:right" >Comprar</button></h1>
     
     </div>
       <hr>
       <div>
       <h6> Precio </h6>
       <small class="text-muted"> ${productoActual.currency} ${productoActual.cost}</small>
       <br>
       <br>
       <h6>Descripcion</h6>
       <small class="text-muted"> ${productoActual.description}</small>
       <br>
       <br>
       <h6>Cantidad Vendidos</h6>
       <small class="text-muted"> ${productoActual.soldCount}</small>
       <br>
       <br>
       <h6> Imágenes Ilustrativas </h6>
       <div id="imagenes">
            ${imagen}
       </div>
       
       </div>
    </div>


        `;

  document.getElementById("productosDibujados").innerHTML = productos;
}

function agregarNuevoComentario() {
let new_comment = {};
new_comment.product = parseInt(localStorage.getItem("prodID"));
new_comment.score = parseInt(document.getElementById("puntos").value);
new_comment.description = document.getElementById("descripcion").value;
new_comment.user = localStorage.getItem("user");
var d = new Date();
dformat =
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
    " " +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
new_comment.dateTime = dformat;

return new_comment;
}

/* Entrega 4: Mostrar los productos relacionados y al pulsar sobre uno de los productos relacionados, 
se debe actualizar la página mostrando ahora la información de dicho producto. */

function desplegarProductosRelacionados(productoRelacionados) {
let productoR = "";

for (let i = 0; i < productoRelacionados.length; i++) {
    let productosRelacionado = productoRelacionados[i];

    productoR +=
`  
<div class="col-md-4">
<div id="productosRelacionados" class="card mt-3">
<div class="card-img-top">
<div onclick="prodID(${productosRelacionado.id})">         
<img class="card-img" src="` + productosRelacionado.image +`" alt="related image">
<h3 class= card-title"> ${productosRelacionado.name} </h3> 
</div> 
</div>
</div>
</div>


            `;
}

document.getElementById("productosRelacionados").innerHTML = productoR;
}

function prodID(id) {
localStorage.setItem("prodID", id);
window.location = "product-info.html";
}

/* Fin ejercicio 1 entrega 4, lo que realice fue un for para que se desplieguen los productos relacionados del producto seleccionado primeramente, 
utilizando la funcio getJsonData en donde le paso la funcion desplegarProductosRelacionados (como paramentro le paso la info del JSON).
Para que al momento de que se haga click sobre un producto se rediriga a esa producto, utilice la funcion prodID, que guarda el id en el local storage 
al mismo tiempo que se redirige a prodcuts-info.html */

/* Comienzo ejercicio de entrega 4 parte 2:  Convierte el nombre del usuario en un menú desplegable 
(manteniendo el nombre de usuario cómo botón) y agrega allí las opciones, mi carrito, mi pefil, cerrar sesión. En el HTML, se coloco el menu desplegable de Bootstrap,
se necesita crear funcion para cerrar sesion, desarrollado en linea 37 a 41*/

function agregarProductosALocalStorage(){
  var carritoLocalStorage = localStorage.getItem("cart") // a) null   b) 'id1,id3'

  var listaCarritoLocalStorage = convertirCarritoLocalStorageALista(carritoLocalStorage) // a) []   b) [id1, id2]
  
  var idProductoActual = localStorage.getItem("prodID")
  if(!listaCarritoLocalStorage.includes(idProductoActual)){
    listaCarritoLocalStorage.push(idProductoActual) 
  }else{
    alert("Este producto ya fue agregado a su carrito, puede agregar mas desde 'Mi carrito'")
  }
   // este if consulta antes de hacer el push si el producto actual ya se encuentra en el array, si no se encuentra realiza el push 


  localStorage.setItem('cart', listaCarritoLocalStorage) // mandamos al localstorage
}

function convertirCarritoLocalStorageALista(listaCarrito){
  if(listaCarrito == null){
    return []
  } else {
    return listaCarrito.split(",")
  }
}

function buscarRepetidos(array){
  let aux = 0

  for(let i=0; i < array.length; i++){
    for(let j = i +1; j < array.length; j++ ){
      if(array[i] === array[j] && aux){
      
    }
  }

}
}



