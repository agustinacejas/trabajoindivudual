function login() {
    let usuario = document.getElementById("nombre").value;
    let clave = document.getElementById("clave").value;

    if (usuario != "" && clave != "") {
        localStorage.setItem('user',usuario);
        location.href = "index.html";
        
    } else {
        alert("Usuario y clave son obligatorios");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("inicio").addEventListener("click", () =>{
        login();
    });
    
});
