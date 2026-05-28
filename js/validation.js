const form = document.getElementById("form-registro");
const titulo = document.getElementById("titulo");
const tipoPeli = document.getElementById("tipo-peli");
const tipoSerie = document.getElementById("tipo-serie");
const radioError = document.getElementById("radio-error");
const genero = document.getElementById("genero");
const estado = document.getElementById("estado");
const posterURL = document.getElementById("posterURL");
const sinopsis = document.getElementById("sinopsis");

function mostrarError(input, mensaje) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    let feedback = input.parentNode.querySelector(".invalid-feedback");
    if (!feedback) {
        feedback = document.createElement("div");
        feedback.classList.add("invalid-feedback");
        input.parentNode.appendChild(feedback);
    }
    feedback.textContent = mensaje;
}

function mostrarValido(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    let feedback = input.parentNode.querySelector(".invalid-feedback");
    if (feedback) {
        feedback.textContent = "";
    }
}

function validarTipo() {
    const seleccionado = tipoPeli.checked || tipoSerie.checked;
    if (!seleccionado) {
        tipoPeli.classList.add("is-invalid");
        tipoSerie.classList.add("is-invalid");
        radioError.style.display = "block";
        return false;
    } else {
        tipoPeli.classList.remove("is-invalid");
        tipoSerie.classList.remove("is-invalid");
        radioError.style.display = "none";    
        return true;
    }
}

titulo.addEventListener('input', () => {
    if (titulo.value.trim() === "") {
        mostrarError(titulo, "El título está vacío");
    } else if (titulo.value.trim().length < 2) {
        mostrarError(titulo, "El título debe tener al menos 2 caracteres");
    } else if (titulo.value.trim().length > 100) {
        mostrarError(titulo, "El título no puede tener más de 100 caracteres");
    } else {
        mostrarValido(titulo);
    }
});

tipoPeli.addEventListener("change", validarTipo);
tipoSerie.addEventListener("change", validarTipo);

function validarFormularioCompleto () {
    let esValido = true;
    
    if (titulo.value.trim().length < 2) {
        mostrarError(titulo, "Mínimo 2 caracteres");
        esValido = false;
    } else mostrarValido(titulo);
    
    if (!tipoPeli.checked && !tipoSerie.checked) {
        radioError.style.display = "block";
        esValido = false;
    } else {
        radioError.style.display = "none";
    }

    if (genero.value.trim() === "") {
        mostrarError(genero, "Debe seleccionar un género");
        esValido = false;
    } else {
        mostrarValido(genero);
    }

    if (estado.value.trim() === "") {
        mostrarError(estado, "Debe seleccionar un estado");
        esValido = false;
    } else {
        mostrarValido(estado);
    }

    return esValido;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (validarFormularioCompleto()) {

        const nuevoItem = {
            id: Date.now(),
            titulo: titulo.value.trim(),
            tipo: tipoPeli.checked ? "pelicula" : "serie",
            genero: genero.value,
            estado: estado.value,
            sinopsis: sinopsis.value.trim() || 'Sin sinopsis',
            posterURL: posterURL.value.trim() || null,
            fecha: new Date().toISOString()
        };

        catalogoPelisSeries.push(nuevoItem);

        alert("¡Guardado correctamente!");
        
        form.reset();
        titulo.classList.remove("is-valid");
        genero.classList.remove("is-valid");
        estado.classList.remove("is-valid");


        navegarA("home");
    }
});