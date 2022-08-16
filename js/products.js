let categoriaArray = [];


function mostrarAutos (array){
    let auto = "";
    
    for(let i = 0; i < array.products.length; i++) {
        let products = array.products[i];
        auto += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + " - " + products.currency + " " + products.cost +`</h4> 
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + " vendidos" + `</small> 
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
            categoriaArray = resultObj.data;
            mostrarAutos(categoriaArray);
        }
    });
});