const form = document.getElementById("personajeForm");

// Obtén el ID del personaje de la URL
const urlParams = new URLSearchParams(window.location.search);
const personajeID = urlParams.get('id');

// Realiza la solicitud GET al servidor para obtener los datos del personaje y mostrarlos en el formulario
fetch(`http://localhost:4000/api/personaje/${personajeID}`)
    .then(response => response.json())
    .then(data => {
        const personaje = Array.isArray(data.result) ? data.result[0] : data.result;
        document.getElementById("name").value = personaje.name;
        document.getElementById("gender").value = personaje.gender;
        document.getElementById("species").value = personaje.species;
        document.getElementById("image").value = personaje.image;
        document.getElementById("status").value = personaje.status;
    })
    .catch(error => {
        console.error("Error al obtener los datos del personaje:", error);
    });

// Agrega un evento de escucha para el envío del formulario
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(form);

    // Realiza la solicitud PUT al servidor para actualizar los datos del personaje
    fetch(`http://localhost:4000/api/actualizar-personaje/${personajeID}`, {
        method: 'PUT',
        body: JSON.stringify(Object.fromEntries(formData)),
mode:"cors",
headers: {
    'Content-Type': 'application/json'
},
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Maneja la respuesta del servidor
    })
    .catch(error => {
        console.error("Error al actualizar el personaje:", error);
    });
});