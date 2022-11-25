let urlDeCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let elementosCarrito = []


document.addEventListener("DOMContentLoaded", function () {
  getJSONData(urlDeCart).then(function (resultObj) {
    if (resultObj.status === "ok") {
      unificarElementosCarrito(resultObj.data)

      var productosGuardadosLocalStorage = localStorage.getItem("cart") == null ? 
                                  [] : localStorage.getItem("cart").split(",")
      if (productosGuardadosLocalStorage.length == 0){
        mostrarCarrito(elementosCarrito)
        return;
      }
      for (idProducto of productosGuardadosLocalStorage){

        getJSONData(buildProductUrl(idProducto)).then(function(resultObj){
          if (resultObj.status === 'ok') {
      
            elementosCarrito.push(resultObj.data)
            
          }
          mostrarCarrito(elementosCarrito) 
        }) 
    
      
      }
    }
  });

  document.getElementById("nombre_usuario").innerHTML =
    localStorage.getItem("user");

  document.getElementById('tarjetaCred').addEventListener("click", function(){
    inhabilitar()
    validacion()

  })
  document.getElementById('trasfBanc').addEventListener("click", function(){
    inhabilitar()
    validacion()

  })
  
     
    
  

});

/*Entrega 5: punto 1, realizar peticion web, usando la url que contiene 
un id de usuario (25801), el cual ya contiene un producto precargado.
Primer paso utilizar la función getJsonData*/

/* Se crea funcion con un for para mostrar los datos de la tabla que se 
solicitan, se coloco un id al th que contiene los td y luego del for
se agrega al HTML*/

function mostrarCarrito(datosArt) {
  let subtotal= 0
  let articulos = "";
  
  for (let i = 0; i < datosArt.length; i++) {
    let datos_articulos = datosArt[i];
    
    articulos += ` 
    <tr>
    <td><img class="img-thumbnail" alt="" src=" ${datos_articulos.images[0]}" style="width:125px;height:90px;"> </td>
    <td>${datos_articulos.name} </td>
    
    <td class="precio" id="cost">${datos_articulos.cost}</td>
    <td ><input onchange="modSubtotal()" id="cantidad${i}" class="cantidad" type="number"name="tentacles" value= "1" min="1"></td>
    <td class="subtotal" id="idsubtotal">${datos_articulos.cost}</td>
    </tr>
    `;
    
    subtotal= subtotal + datos_articulos.cost
  }
  
  
  let boton= document.getElementsByClassName('form-check-input')
  for(let i= 0; i < boton.length; i++) {
    boton[i].addEventListener('change', function(){
    costoDeEnvio(boton[i].value)
 
  })

}
document.getElementById('tabla').innerHTML = articulos;
document.getElementById('subTotal').innerHTML= subtotal + " USD";
costoDeEnvio("option1")

  

}

/* Entrega 4.3: se crea funcion que tome el valor de cantidad y cost, lo multiplique
y lo muestre en el subtotal */

function modSubtotal() {
  let cantidad = document.getElementsByClassName('cantidad')
  let precio = document.getElementsByClassName('precio')
  let sub = document.getElementsByClassName('subtotal')
  let subtotales = document.getElementById('subTotal')
  let total = 0

  for(let i = 0; i < precio.length; i++){
    sub[i].innerHTML= parseInt(precio[i].innerHTML) * parseInt(cantidad[i].value)
    total = total + parseInt(precio[i].innerHTML) * parseInt(cantidad[i].value)
    

  }
  subtotales.innerHTML= total
  let boton= document.getElementsByClassName('form-check-input')
  for(let i= 0; i < boton.length; i++) {
    if(boton[i].checked){
      envio= boton[i].value
    }
    
 
  }
  costoDeEnvio(envio)
  
  
  
  


}

function unificarElementosCarrito(cart25801) {
  
      let imageList = []
      imageList.push(cart25801.articles[0].image)
      var productoPorDefecto = {}
      productoPorDefecto.id = cart25801.articles[0].id
      productoPorDefecto.name = cart25801.articles[0].name
      productoPorDefecto.description = ""
      productoPorDefecto.cost = cart25801.articles[0].unitCost
      productoPorDefecto.currency = cart25801.articles[0].currency
      productoPorDefecto.soldCount = 0
      productoPorDefecto.images = imageList
      productoPorDefecto.relatedProducts = []

      elementosCarrito.push(productoPorDefecto) // Meto dentro de la lista elementosCarrito el elemento por defecto

      return elementosCarrito

}

function buildProductUrl(idProduct){
  return "https://japceibal.github.io/emercado-api/products/" + idProduct + ".json"; 

}




//Codigo para modal 
// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(function () {
  'use strict'

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          validacion()
        }else{
          compraConExito()
          let direccion = document.getElementById('validationCustom01').value
          let numeroDeCasa = document.getElementById('validationCustom02').value
          let esq= document.getElementById('validationCustom02').value
          console.log(direccion)
        
            fetch("http://localhost:3000/guardar", {
              headers: { "Content-Type": "application/json; charset=utf-8" },
              method: "POST",
              body: JSON.stringify({
                calle: direccion,
                numero: numeroDeCasa,
                esquina: esq,



              }),
              

            })
            .then((response) => response.json())
              .then((reponse) => {console.log(reponse)});
              
        
  
            event.preventDefault()
            event.stopPropagation()
        }
        

        form.classList.add('was-validated')
      }, false)
      
      
    })
    

})()


// Funcion para inhabilitar unos de los radios
function inhabilitar(){
  let numeroTarj = document.getElementById('numeroDeTarjeta')
  let codigoDeSeg = document.getElementById('codigoDeSeg')
  let vencimiento = document.getElementById('vencimiento')
  let numeroCuenta = document.getElementById('numeroDeCuenta')
  let tarjetaDeCred= document.getElementById('tarjetaCred')
  

  if(tarjetaDeCred.checked){
    numeroTarj.disabled = false
    vencimiento.disabled = false
    codigoDeSeg.disabled = false
    numeroCuenta.disabled = true
  }else{
    numeroTarj.disabled = true
    vencimiento.disabled = true
    codigoDeSeg.disabled = true
    numeroCuenta.disabled = false

  }

  
}

function validacion(){
  let transferencia = document.getElementById('trasfBanc')
  let tarjetaDeCred= document.getElementById('tarjetaCred')

  if(transferencia.checked || tarjetaDeCred.checked){
    document.getElementById('span').innerHTML= ""
  }else{
    document.getElementById('span').innerHTML= "Debe ingresar"
  }
  
}

function costoDeEnvio(tipoDeEnvio){
  subtotal = document.getElementById('subTotal').innerHTML

  if(tipoDeEnvio == "option1") { 
    document.getElementById('envio').innerHTML= (parseInt(subtotal) * 0.15).toFixed(0) + " USD"
    document.getElementById('total').innerHTML = ((parseInt(subtotal) * 0.15) + parseInt(subtotal)) + " USD"

  }else if(tipoDeEnvio == "option2"){ 
    document.getElementById('envio').innerHTML= (parseInt(subtotal) * 0.07).toFixed(0) + " USD"
     document.getElementById('total').innerHTML = ((parseInt(subtotal) * 0.07) + parseInt(subtotal)) + " USD"

  }else{
    document.getElementById('envio').innerHTML= (parseInt(subtotal) * 0.05).toFixed(0) + " USD"
    document.getElementById('total').innerHTML = ((parseInt(subtotal) * 0.05) + parseInt(subtotal)) + " USD"

  }
  


}


function compraConExito() {
    document.getElementById("alert-success").classList.add("show");
}

