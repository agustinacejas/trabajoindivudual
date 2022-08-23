let jsonDataResponse = [];


function mostrarAutos (jsonAutos){
    let auto = "";
    
    for(let i = 0; i < jsonAutos.products.length; i++) {
        let productoActual = jsonAutos.products[i];
        auto += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productoActual.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ productoActual.name + " - " + productoActual.currency + " " + productoActual.cost +`</h4> 
                        <p> `+ productoActual.description +`</p> 
                        </div>
                        <small class="text-muted">` + productoActual.soldCount + " vendidos" + `</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("autos").innerHTML = auto; 
    }  
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            console.log(resultObj.data)
            jsonDataResponse = resultObj.data;
            mostrarAutos(jsonDataResponse);
        }
    });
});