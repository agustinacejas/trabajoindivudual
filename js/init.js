const CATEGORIES_URL = "http://localhost:3000/cat";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/vender";
const PRODUCTS_URL = "http://localhost:3000/productos/" + localStorage.getItem('catID');
const PRODUCT_INFO_URL = "http://localhost:3000/producto/" + localStorage.getItem('prodID') ; 
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/comentarios/" + localStorage.getItem('prodID');
const CART_INFO_URL = "http://localhost:3000/user_cart";
const CART_BUY_URL = "http://localhost:3000/buy";
const EXT_TYPE = ".json";

document.addEventListener("DOMContentLoaded", function(e){
 
  document.getElementById('cerrar_sesion').addEventListener('click', function () {
      window.location = "login.html"
      localStorage.removeItem('user');
      localStorage.removeItem('catID');
      localStorage.removeItem('prodID');
      localStorage.removeItem('name');
      localStorage.removeItem('apellido');
      localStorage.removeItem('segNombre');
      localStorage.removeItem('segApellido');
      localStorage.removeItem('telefono');




  })
  document.getElementById('mi_carrito').addEventListener('click', function(){
      window.location = "cart.html"
  })

  document.getElementById('mi_perfil').addEventListener('click', function(){
      validation()
      precargarInfo()
      
  })

})

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function validation(){
  let usuario = localStorage.getItem('user')
  if(!usuario == " "){
  window.location = "my-profile.html";
  }else{
  alert('Debe estar logueado para ingresar a mi perfil')
  window.location = "login.html"
  
  }
}

function precargarInfo(){
  let name = localStorage.getItem('name')
  if(name != null){
    document.getElementById('primerNombre').value = localStorage.getItem('name')
    document.getElementById('segNombre').value = localStorage.getItem('segNombre')
    document.getElementById('segApellido').value = localStorage.getItem('segApellido')
    document.getElementById('primerApellido').value = localStorage.getItem('apellido')
    document.getElementById('telefono').value = localStorage.getItem('telefono')
  }
  

}

