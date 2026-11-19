document.addEventListener("DOMContentLoaded", () => {

    // MODO OSCURO / CLARO (CON PERSISTENCIA EN LOCALSTORAGE)
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

    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    const formContacto = document.querySelector("main form") || document.querySelector("form:not(#form-busqueda-nav)");

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

    // MOSTRAR / OCULTAR CONTENIDO ("VER MÁS")
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

    // BUSCADOR EN TIEMPO REAL DE DISTRITOS
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

    // LLUVIA DE NÚMEROS EN EL FONDO (ESTILO MATRIX)
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

    // RELOJ DE SISTEMA EN TIEMPO REAL (HUD)
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

    // BUSCADOR EN NAVBAR CON MINI MENÚ DESPLEGABLE
    const inputNav = document.getElementById("buscador-nav");
    const menuNav = document.getElementById("menu-busqueda-nav");

    const zonasNav = [
        {
            titulo: "WATSON",
            desc: "Distrito industrial y ex-corazón comercial transformado en un laberinto controlado por bandas y clínicas clandestinas.",
            link: "lugares.html"
        },
        {
            titulo: "AFTERLIFE",
            desc: "El santuario definitivo del bajo mundo, donde mercenarios, netrunners y fixers cierran contratos de alto riesgo.",
            link: "lugares.html"
        },
        {
            titulo: "JAPANTOWN",
            desc: "El corazón de la cultura oriental en Night City, con tradiciones ancestrales y tecnología futurista.",
            link: "lugares.html"
        },
        {
            titulo: "CITY CENTER",
            desc: "El corazón corporativo de las megacorps, con torres de cristal y neón puro.",
            link: "lugares.html"
        },
        {
            titulo: "BADLANDS",
            desc: "Desierto tóxico abandonado por las corporaciones donde la supervivencia depende de tu blindaje.",
            link: "lugares.html"
        },
        {
            titulo: "LA CIUDAD / HISTORIA",
            desc: "Origen de Coronado City en 1994, Guerras Corporativas y archivos desclasificados.",
            link: "ciudad.html"
        },
        {
            titulo: "CONTACTO / FIXERS",
            desc: "Canal de comunicación encriptado y nodos alternativos de emergencia.",
            link: "contacto.html"
        }
    ];

    function ejecutarBusquedaNav() {
        if (!inputNav || !menuNav) return;

        const termino = inputNav.value.toLowerCase().trim();
        menuNav.innerHTML = "";

        if (!termino) {
            menuNav.style.display = "none";
            return;
        }

        const coincidencias = zonasNav.filter((z) =>
            `${z.titulo} ${z.desc}`.toLowerCase().includes(termino)
        );

        if (coincidencias.length === 0) {
            menuNav.innerHTML = `
                <div class="p-2 text-danger text-mono small">
                    // Sin resultados para "${inputNav.value.trim()}"
                </div>
            `;
        } else {
            coincidencias.forEach((z) => {
                menuNav.innerHTML += `
                    <div class="p-2 mb-2 bg-cyber-dark border border-neon rounded text-mono">
                        <div class="text-neon fw-bold font-orbitron small">// ${z.titulo}</div>
                        <div class="text-light mt-1" style="font-size: 0.78rem;">${z.desc}</div>
                        <div class="mt-2 text-end">
                            <a href="${z.link}" class="btn btn-outline-neon btn-sm py-0 px-2 font-orbitron" style="font-size: 0.72rem;">IR</a>
                        </div>
                    </div>
                `;
            });
        }

        menuNav.style.display = "block";
    }

    if (inputNav && menuNav) {
        inputNav.addEventListener("input", ejecutarBusquedaNav);

        inputNav.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                ejecutarBusquedaNav();
            }
        });

        document.addEventListener("click", (e) => {
            if (!inputNav.contains(e.target) && !menuNav.contains(e.target)) {
                menuNav.style.display = "none";
            }
        });
    }

});