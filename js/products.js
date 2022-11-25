const ORDENAR_ASCENDENTE_EN_PRODUCTO = "ASCENDENTE"
const ORDENAR_DESCENDENTE_EN_PRODUCTO = "DESCENDENTE"
const ORDER_DESCENDENTE_POR_RELEVANCIA = "RELEVANCIA"

let jsonDataResponse = [];


function mostrarProductos(jsonProductos) {
    let producto = "";

    for (let i = 0; i < jsonProductos.length; i++) {
        let productoActual = jsonProductos[i];

        producto += `
        <div onclick="setProdID(${productoActual.id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productoActual.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ productoActual.name + " - " + productoActual.currency + " " + productoActual.cost + `</h4> 
                        <p> `+ productoActual.description + `</p> 
                        </div>
                        <small class="text-muted">` + productoActual.soldCount + " vendidos" + `</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("productos").innerHTML = producto;

}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
    console.log('Hola')

}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data)
            jsonDataResponse = resultObj.data.products;
            document.getElementById("frase").innerHTML = "Verás aqui todos los productos de la categoria " + resultObj.data.catName
            mostrarProductos(jsonDataResponse);
        }
    });

    // Agrego listener al elemento sortAsc, para cuando alguien hace click ejecuto la funcion que esta en seundo parametro function() { ... } QUE ES UNA FUNCION TAMBIEN!!
    document.getElementById("sortAsc").addEventListener("click", function () {
        dibujarProductosOrdenados(ORDENAR_ASCENDENTE_EN_PRODUCTO);

    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        dibujarProductosOrdenados(ORDENAR_DESCENDENTE_EN_PRODUCTO);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        dibujarProductosOrdenados(ORDER_DESCENDENTE_POR_RELEVANCIA);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        valorMin = parseInt(document.getElementById("rangeFilterCountMin").value);
        valorMax = parseInt(document.getElementById("rangeFilterCountMax").value);
        let infoJson = jsonDataResponse
        let filtrados = infoJson.filter(p => p.cost >= valorMin && p.cost <= valorMax)
        mostrarProductos(filtrados)

    })

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        valorMin = undefined;
        valorMax = undefined;

        mostrarProductos(jsonDataResponse);
    });
    document.getElementById("nombre_usuario").innerHTML = localStorage.getItem("user");
});

// TODO: (significa "Pendiente de Hacer" en ingles)
// 1) Agregar un listener en el boton Filtrar, que cuando se haga click en el boton obtenga mediante un document.getElementById("rangeFilterCountMin"). Mismo para el max
// 2) Hacer lo mismo que con el sort(), pero con la funcion de javascript filter(), que en este caso, va a recibir como parametro la funcion que va a hacer el filtro de productos
// Basicamente, el filtro de productos va a hacer algo asi: lista_de_productos.filter(function(producto) {producto > min && producto < max} )

function dibujarProductosOrdenados(criterioDeOrdenamiento) {
    //guardo el jsonDataResponse en una variable local para evitar modificarla
    let auxListaProductos = jsonDataResponse;
    let auxCriterioDeOrdenamiento

    if (criterioDeOrdenamiento != undefined) {
        auxCriterioDeOrdenamiento = criterioDeOrdenamiento;
    }

    let productosLuegoDeOrdenados = ordenarProductosPorCriterio(auxCriterioDeOrdenamiento, auxListaProductos)
    mostrarProductos(productosLuegoDeOrdenados)
}

// Deberia recibir por parametro un criterio para ordenar los productos, y usando la funcion sort de javascript y una funcion dentro de sort, ordenar los productos
function ordenarProductosPorCriterio(criterio, listaDeData) {

    if (criterio == "ASCENDENTE") {
        listaDeData.sort(function (a, b) {
            //condicion de ordenamiento de productos ascendente
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0
        });
    }

    if (criterio == "DESCENDENTE") {
        listaDeData.sort(function (a, b) {
            //condicion de ordenamiento de productos descendente
            if (a.cost < b.cost) { return 1 }
            if (a.cost > b.cost) { return -1 }
            return 0
        });
    }

    if (criterio == "RELEVANCIA") {
        listaDeData.sort(function (a, b) {
            //condicion de ordenamiento de productos por relevancia
            if (a.soldCount < b.soldCount) { return 1 }
            if (a.soldCount > b.soldCount) { return -1 }
            return 0

        });
    }

    return listaDeData;
}

