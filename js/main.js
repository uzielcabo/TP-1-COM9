// ==========================================
// ETAPA 4 - JavaScript Interactivo (Commit 2)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MODO OSCURO / CLARO ---
    const btnModo = document.getElementById("btn-modo");
    
    if (btnModo) {
        btnModo.addEventListener("click", () => {
            // Alterna la clase 'oscuro' en el body
            document.body.classList.toggle("oscuro");
            
            // Cambia el texto del botón según el estado actual
            if (document.body.classList.contains("oscuro")) {
                btnModo.innerText = "Modo Claro";
            } else {
                btnModo.innerText = "Modo Oscuro";
            }
        });
    }

    // --- 2. VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
    const formContacto = document.querySelector("form");

    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            // Prevenimos que el formulario se envíe por defecto
            e.preventDefault();

            const inputAlias = formContacto.querySelector("input[type='text']");
            const inputEmail = formContacto.querySelector("input[type='email']");
            const textareaMensaje = formContacto.querySelector("textarea");

            // Verificamos si algún campo principal está vacío
            if (inputAlias && inputEmail && textareaMensaje) {
                if (inputAlias.value.trim() === "" || inputEmail.value.trim() === "" || textareaMensaje.value.trim() === "") {
                    alert("ERROR DE RED: Todos los campos obligatorios deben estar completos para transmitir.");
                    return;
                }
            }

            alert("¡TRANSMISIÓN EXITOSA! Los datos fueron encriptados y enviados a la red.");
            formContacto.reset();
        });
    }

    // --- 3. MOSTRAR / OCULTAR CONTENIDO ("VER MÁS") ---
    // Creamos un botón dinámico o buscamos si existe uno para desplegar información
    const btnVerMas = document.getElementById("btn-ver-mas");
    const infoAdicional = document.getElementById("info-adicional");

    if (btnVerMas && infoAdicional) {
        // Ocultamos el contenido extra por defecto al cargar
        infoAdicional.style.display = "none";

        btnVerMas.addEventListener("click", () => {
            if (infoAdicional.style.display === "none") {
                infoAdicional.style.display = "block";
                btnVerMas.innerText = "Ocultar Información";
            } else {
                infoAdicional.style.display = "none";
                btnVerMas.innerText = "Ver Más";
            }
        });
    }

})