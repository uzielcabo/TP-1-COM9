document.addEventListener("DOMContentLoaded", () => {

    // 1. MODO OSCURO / CLARO (CON PERSISTENCIA EN LOCALSTORAGE)
    const btnModo = document.getElementById("btn-modo");

    function actualizarBotonModo() {
        if (!btnModo) return;
        btnModo.innerText = document.body.classList.contains("oscuro")
            ? "Modo Claro"
            : "Modo Oscuro";
    }

    if (localStorage.getItem("temaNightCity") === "oscuro") {
        document.body.classList.add("oscuro");
    }
    actualizarBotonModo();

    if (btnModo) {
        btnModo.addEventListener("click", () => {
            document.body.classList.toggle("oscuro");
            const esOscuro = document.body.classList.contains("oscuro");
            localStorage.setItem("temaNightCity", esOscuro ? "oscuro" : "normal");
            actualizarBotonModo();
        });
    }

    // 2. VALIDACIÓN DEL FORMULARIO DE CONTACTO
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

    // 3. MOSTRAR / OCULTAR CONTENIDO ("VER MÁS")
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

    // 4. BUSCADOR EN TIEMPO REAL DE DISTRITOS
    const inputBuscador = document.getElementById("buscador-distritos");
    const tarjetasDistritos = document.querySelectorAll(".row .col-md-4");

    if (inputBuscador && tarjetasDistritos.length > 0) {
        inputBuscador.addEventListener("input", () => {
            const termino = inputBuscador.value.toLowerCase().trim();

            tarjetasDistritos.forEach((tarjeta) => {
                const texto = tarjeta.innerText.toLowerCase();
                tarjeta.style.display = texto.includes(termino) ? "" : "none";
            });
        });
    }

    // 5. LLUVIA DE NÚMEROS EN EL FONDO (ESTILO MATRIX)
    const canvasMatrix = document.getElementById("matrix-bg");

    if (canvasMatrix) {
        const ctx = canvasMatrix.getContext("2d");
        const caracteres = "0123456789";
        const tamanoFuente = 15;
        let columnas = 0;
        let gotas = [];

        function ajustarCanvasMatrix() {
            canvasMatrix.width = window.innerWidth;
            canvasMatrix.height = window.innerHeight;
            columnas = Math.floor(canvasMatrix.width / tamanoFuente);
            gotas = Array.from({ length: columnas }, () => Math.random() * -50);
        }

        ajustarCanvasMatrix();
        window.addEventListener("resize", ajustarCanvasMatrix);

        function dibujarMatrix() {
            const esOscuro = document.body.classList.contains("oscuro");
            ctx.fillStyle = esOscuro
                ? "rgba(240, 242, 245, 0.14)"
                : "rgba(11, 9, 26, 0.12)";
            ctx.fillRect(0, 0, canvasMatrix.width, canvasMatrix.height);

            ctx.fillStyle = esOscuro ? "#00897b" : "#00ffcc";
            ctx.font = `${tamanoFuente}px "Share Tech Mono", monospace`;

            for (let i = 0; i < gotas.length; i++) {
                const numero = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                const x = i * tamanoFuente;
                const y = gotas[i] * tamanoFuente;

                ctx.fillText(numero, x, y);

                if (y > canvasMatrix.height && Math.random() > 0.975) {
                    gotas[i] = 0;
                }
                gotas[i] += 0.65;
            }
        }

        setInterval(dibujarMatrix, 45);
    }

    // 6. RELOJ DE SISTEMA EN TIEMPO REAL (HUD)
    const relojHud = document.getElementById("reloj-hud");

    if (relojHud) {
        function actualizarRelojHud() {
            const ahora = new Date();
            const hh = String(ahora.getHours()).padStart(2, "0");
            const mm = String(ahora.getMinutes()).padStart(2, "0");
            const ss = String(ahora.getSeconds()).padStart(2, "0");
            relojHud.innerText = `SYS_TIME // ${hh}:${mm}:${ss}`;
        }

        actualizarRelojHud();
        setInterval(actualizarRelojHud, 1000);
    }

});