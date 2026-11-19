// ==========================================
// ETAPA 4 - JavaScript Interactivo
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. MODO OSCURO / CLARO ---
    const btnModo = document.getElementById("btn-modo");

    if (btnModo) {
        btnModo.addEventListener("click", () => {
            document.body.classList.toggle("oscuro");

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
            e.preventDefault();

            const inputAlias = formContacto.querySelector("input[type='text']");
            const inputEmail = formContacto.querySelector("input[type='email']");
            const textareaMensaje = formContacto.querySelector("textarea");

            if (inputAlias && inputEmail && textareaMensaje) {
                if (
                    inputAlias.value.trim() === "" ||
                    inputEmail.value.trim() === "" ||
                    textareaMensaje.value.trim() === ""
                ) {
                    alert("ERROR DE RED: Todos los campos obligatorios deben estar completos para transmitir.");
                    return;
                }
            }

            alert("¡TRANSMISIÓN EXITOSA! Los datos fueron encriptados y enviados a la red.");
            formContacto.reset();
        });
    }

    // --- 3. MOSTRAR / OCULTAR CONTENIDO ("VER MÁS") ---
    const btnVerMas = document.getElementById("btn-ver-mas");
    const infoAdicional = document.getElementById("info-adicional");

    if (btnVerMas && infoAdicional) {
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

    // --- 4. FILTRO / BUSCADOR EN TIEMPO REAL ---
    const inputBuscador = document.getElementById("buscador-distritos");
    const tarjetas = document.querySelectorAll(".col-md-4");

    if (inputBuscador && tarjetas.length > 0) {
        inputBuscador.addEventListener("input", () => {
            const termino = inputBuscador.value.toLowerCase().trim();

            tarjetas.forEach((tarjeta) => {
                const textoTarjeta = tarjeta.innerText.toLowerCase();
                if (textoTarjeta.includes(termino)) {
                    tarjeta.style.display = "";
                } else {
                    tarjeta.style.display = "none";
                }
            });
        });
    }

    // --- 5. ACORDEÓN / MENÚ DESPLEGABLE PROPIO ---
    const botonesAcordeon = document.querySelectorAll(".btn-acordeon");

    botonesAcordeon.forEach((btn) => {
        btn.addEventListener("click", () => {
            const panel = btn.nextElementSibling;
            if (panel) {
                const estaVisible = panel.style.display === "block";
                panel.style.display = estaVisible ? "none" : "block";
            }
        });
    });

});