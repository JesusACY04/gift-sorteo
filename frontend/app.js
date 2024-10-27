// app.js

document.getElementById("numeroForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();
    const telefono = document.getElementById("telefono").value;
    
    // Validación de número de teléfono (10 dígitos)
    const telefonoRegex = /^[0-9]{10}$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Introduce un número de teléfono válido de 10 dígitos.");
        return;
    }

    localStorage.setItem("telefono", telefono);
    window.location.href = "formulario.html";
});

document.getElementById("registroForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();

    const participante = {
        telefono: localStorage.getItem("telefono"),
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        numeroControl: document.getElementById("numeroControl").value
    };

    // Validaciones adicionales en el frontend
    const correoRegex = /^[a-zA-Z0-9._%+-]+@cancun\.tecnm\.mx$/;
    const numeroControlRegex = /^L\d{8}$/;

    if (!correoRegex.test(participante.correo)) {
        alert("Por favor, utiliza un correo institucional (@cancun.tecnm.mx).");
        return;
    }

    if (!numeroControlRegex.test(participante.numeroControl)) {
        alert("El número de control debe tener el formato correcto (L########).");
        return;
    }

    try {
        const response = await fetch("https://tuservidor.vercel.app/api/participantes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(participante)
        });
        if (response.ok) {
            localStorage.removeItem("telefono");
            window.location.href = "gracias.html";
        } else {
            console.error("Error en el registro");
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
});

