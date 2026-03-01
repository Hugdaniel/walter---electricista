document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar datos básicos
    document.getElementById('nombre').innerText = CONFIG.nombre;
    document.getElementById('profesion').innerText = CONFIG.profesion;

    // 2. Generar botones de servicios dinámicamente
    const container = document.getElementById('botones-container');
    const btnWa = document.createElement('button');
    btnWa.className = 'btn-servicio boton-whatsapp';
    btnWa.innerHTML = '<span>📱</span>enviar WhatsApp';
    btnWa.onclick = () => {
        const textoLink = encodeURIComponent(CONFIG.mensajeWa);
        const url = `https://wa.me/549${CONFIG.telefono}?text=${textoLink}`;
        window.open(url, '_blank');
    }
    container.prepend(btnWa);
    
    CONFIG.servicios.forEach(servicio => {
        const btn = document.createElement('button');
        btn.className = 'btn-servicio boton-electrico';
        btn.innerText = servicio;
        container.appendChild(btn);
    });
});

// 3. Función para descargar la vCard (usando los datos de config)
function descargarVCard() {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:${CONFIG.nombre}
TEL;TYPE=CELL:${CONFIG.telefono}
EMAIL:${CONFIG.email}
ORG:${CONFIG.profesion}
NOTE:${CONFIG.vCardNote}
END:VCARD`;

    const blob = new Blob([vcardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${CONFIG.nombre.replace(" ", "_")}.vcf`;
    a.click();
}

