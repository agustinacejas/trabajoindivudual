


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
          }else{
            guardarDatosEnLocalStorage()
          
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("nombre_usuario").innerHTML = localStorage.getItem("user") 
    document.getElementById("email").value = localStorage.getItem("user")
     // como asignale a un input el valor del localStorage (???)
     precargarInfo()
    
  



})

function guardarDatosEnLocalStorage(){
    let nombre = document.getElementById('primerNombre').value
    let apellido1 = document.getElementById('primerApellido').value
    let telefono = document.getElementById('telefono').value
    let segundoNombre = document.getElementById('segNombre').value
    let segundoApellido = document.getElementById('segApellido').value
    
    

    if(nombre !="" && apellido1 !="" && telefono != ""){
    localStorage.setItem('name', nombre)
    localStorage.setItem('apellido', apellido1)
    localStorage.setItem('telefono', telefono)
    localStorage.setItem('segNombre', segundoNombre)
    localStorage.setItem('segApellido', segundoApellido)
    
    
    
  }else{
        alert("Debe completar los campos obligatorios");
    }

}





