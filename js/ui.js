let catalogoPelisSeries = [];

const vistaCatalogo = document.getElementById("vista-catalogo");
const vistaFormulario = document.getElementById("vista-formulario");
const btnNavHome = document.getElementById("btn-nav-home");
const btnNavAgregar = document.getElementById("btn-nav-agregar");


let generoSeleccionado = "";

if (genero.value === "accion") {
    generoSeleccionado = "ACCION"; 
} else if (genero.value === "cienciaficcion") {
    generoSeleccionado = "CIENCIAFICCION";    
} else if (genero.value === "comedia") {
    generoSeleccionado = "COMEDIA";   
} else if (genero.value === "drama") {
    generoSeleccionado = "DRAMA";  
} else if (genero.value === "romantica") {
    generoSeleccionado = "ROMANTICA";   
} else if (genero.value === "terror") {
    generoSeleccionado = "TERROR";    
}

let rutaImagenLocal = "../img/" + generoSeleccionado + ".png";

function navegarA(vista) {
    if (vista === "home") {
        vistaCatalogo.classList.remove("d-none");
        vistaFormulario.classList.add("d-none");
        btnNavHome.classList.add("active");
        btnNavAgregar.classList.remove("active");
        mostrarTarjetas(); 
    } else if (vista === "agregar") {
        vistaCatalogo.classList.add("d-none");
        vistaFormulario.classList.remove("d-none");
        btnNavHome.classList.remove("active");
        btnNavAgregar.classList.add("active");
    }
}

btnNavHome.addEventListener("click", (e) => { e.preventDefault(); navegarA("home"); });
btnNavAgregar.addEventListener("click", (e) => { e.preventDefault(); navegarA("agregar"); });

function mostrarTarjetas() {
    const contenedor = document.getElementById("contenedorTarjetas");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (catalogoPelisSeries.length === 0) {
        contenedor.innerHTML = `
        <div class="col-12 text-center py-5">
            <h3 class="text-muted">No hay películas o series en el catálogo</h3>
            <p>¡Hacé clic en "Agregar Pelicula/Serie" para empezar!</p>
        </div>
        `;
        return;
    }

    catalogoPelisSeries.forEach(item => {
        const imagenTarjeta = item.posterURL ? item.posterURL : "https://via.placeholder.com/300x450?text=Sin+Imagen";

        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${rutaImagenLocal}" class="card-img-top" alt="Póster de ${item.titulo}" style="height: 320px; object-fit: cover;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${item.titulo}</h5>
                        <p class="card-text mb-1">
                            <span class="badge bg-secondary text-capitalize">${item.tipo}</span>
                            <small class="text-muted text-capitalize"> - ${item.genero}</small>
                        </p>
                        <p class="card-text small text-truncate-3">${item.sinopsis}</p>
                    </div>
                    <div class="mt-3">
                        <span class="badge bg-info text-capitalize d-block mb-2">${item.estado}</span>
                        <button class="btn btn-danger btn-sm w-100" onclick="eliminarItem(${item.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}


function eliminarItem(idBuscar) {
    catalogoPelisSeries = catalogoPelisSeries.filter(item => item.id !== idBuscar);
    mostrarTarjetas();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarTarjetas();
});

