document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // --- ASISTENTE VIRTUAL (CHAT) ---
    // ==========================================

    // Dirección del backend. Cambiará cuando lo publiquemos.
    const URL_API = 'http://localhost:3000/preguntar';
    const TIEMPO_MAXIMO_MS = 15000;

    const MENSAJE_BIENVENIDA =
        '¡Hola! Soy el asistente virtual de DAEGRO. Puedo resolver dudas frecuentes sobre horarios, cotizaciones y financiamiento. ¿En qué te ayudo?';
    const MENSAJE_ERROR =
        'No pude responder en este momento. Escríbenos por WhatsApp y un asesor te ayudará.';
    const MENSAJE_LIMITE =
        'Has hecho varias preguntas seguidas. Espera un minuto e inténtalo de nuevo.';

    const btnChat = document.getElementById('btnChat');
    const panelChat = document.getElementById('panelChat');
    const btnCerrarChat = document.getElementById('btnCerrarChat');
    const areaMensajes = document.getElementById('chatMensajes');
    const formChat = document.getElementById('formChat');
    const entrada = document.getElementById('chatPregunta');
    const btnEnviar = document.getElementById('btnEnviarChat');

    // Si falta alguna pieza del HTML, no hacemos nada (así no rompemos el resto del sitio)
    if (!btnChat || !panelChat || !btnCerrarChat || !areaMensajes || !formChat || !entrada || !btnEnviar) return;

    let bienvenidaMostrada = false;
    let ocupado = false;

    function agregarMensaje(texto, tipo) {
        const burbuja = document.createElement('div');
        burbuja.className = `mensaje mensaje-${tipo}`;
        burbuja.textContent = texto; // textContent, NUNCA innerHTML: el texto se trata como texto, no como HTML
        areaMensajes.appendChild(burbuja);
        areaMensajes.scrollTop = areaMensajes.scrollHeight;
        return burbuja;
    }

    function abrirChat() {
        panelChat.hidden = false;
        btnChat.setAttribute('aria-expanded', 'true');
        if (!bienvenidaMostrada) {
            agregarMensaje(MENSAJE_BIENVENIDA, 'bot');
            bienvenidaMostrada = true;
        }
        entrada.focus();
    }

    function cerrarChat(devolverFoco = true) {
        panelChat.hidden = true;
        btnChat.setAttribute('aria-expanded', 'false');
        if (devolverFoco) btnChat.focus();
    }

    btnChat.addEventListener('click', () => (panelChat.hidden ? abrirChat() : cerrarChat()));
    btnCerrarChat.addEventListener('click', () => cerrarChat());

    // Escape cierra el panel y devuelve el foco al botón
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !panelChat.hidden) cerrarChat();
    });

    // El enlace "contáctanos" lleva al formulario: cerramos el panel para que no tape la página
    panelChat.querySelectorAll('.chat-aviso a').forEach((enlace) => {
        enlace.addEventListener('click', () => cerrarChat(false));
    });

    formChat.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pregunta = entrada.value.trim();
        if (!pregunta || ocupado) return;

        ocupado = true;
        btnEnviar.disabled = true;
        agregarMensaje(pregunta, 'usuario');
        entrada.value = '';
        const pendiente = agregarMensaje('Escribiendo…', 'bot');
        pendiente.classList.add('mensaje-pendiente');

        // Si el servidor no responde a tiempo, cancelamos la petición
        const controlador = new AbortController();
        const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);

        let textoRespuesta = MENSAJE_ERROR;
        try {
            const respuesta = await fetch(URL_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pregunta }),
                signal: controlador.signal
            });

            if (respuesta.status === 429) {
                textoRespuesta = MENSAJE_LIMITE;
            } else if (respuesta.ok) {
                const datos = await respuesta.json();
                if (typeof datos.respuesta === 'string') textoRespuesta = datos.respuesta;
            }
        } catch {
            // Servidor apagado, sin red o tiempo agotado: se conserva el mensaje de error
        } finally {
            clearTimeout(temporizador);
        }

        // Se reemplaza la burbuja "Escribiendo…" por un mensaje nuevo (así el lector de pantalla lo anuncia)
        pendiente.remove();
        agregarMensaje(textoRespuesta, 'bot');
        ocupado = false;
        btnEnviar.disabled = false;
        entrada.focus();
    });
});
