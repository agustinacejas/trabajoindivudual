const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem('catID') + ".json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem('prodID') + ".json"; 
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem('prodID') + ".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
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

