const getPersonajes = async () => {
    const response = await fetch('http://localhost:4000/api/personajes', { method: 'GET' });
    const characters = await response.json();
    return characters;
}

const createCharacterCards = async () => {
    try {
        const characterContainer = document.querySelector('.section_characters_container');
        const characterFragment = document.createDocumentFragment();

        // Obtener los personajes favoritos de la base de datos local
        const personajes = await getPersonajes();
        console.log(personajes)

        // Verificar si personajesFavoritos es un objeto y no un array
        if (typeof personajes.result === 'object' && personajes.result !== null) {
            // Convertir personajesFavoritos en un array para manejarlo como iterable
            const personajesArray = Object.values(personajes.result);

            // Recorrer los personajes favoritos y obtener la información de la API para cada uno
            for (const personaje of personajesArray) {

                if (personaje) {
                    const character = document.createElement('div');
                    character.className = "character";
                    character.setAttribute(`character-id`,personaje.personajeID)
                    character.innerHTML = ` 
                        <div class="character-img">
                            <img src="${personaje.image}"/>
                        </div>
                        <div class="character-info">
                            <div class="info_name_container">
                                <p class="info_name">Nombre: ${personaje.name}</p>
                            </div>
                            <div class="info_description_container">
                                <p class="info_description">Género: ${personaje.gender}</p>
                                <p class="info_description">Especie: ${personaje.species}</p>
                            </div>
                            <div class="addList">
                                <a href="actualizarPersonaje.html?id=${personaje.personajeID}">Editar personaje</a>
                                <button class="deleteButton" data-character-id="${personaje.personajeID}">Eliminar personaje</button>
                            </div>
                        </div>`;

                    characterFragment.appendChild(character);
                }
            }

            characterContainer.appendChild(characterFragment);

            // Agregar evento de clic para los botones de eliminar
            const deleteButtons = document.querySelectorAll('.deleteButton');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const characterID = button.getAttribute('data-character-id');
                    deleteCharacter(characterID);
                    // Puedes realizar alguna acción adicional después de eliminar el personaje
                });
            });
        } else {
            console.log("No se encontraron personajes favoritos.");
        }

    } catch (error) {
        console.log("Ocurrió un error: ", error);
    }
}
const deleteCharacter = async (characterID) => {
    try {
        const response = await fetch(`http://localhost:4000/api/borrar-personaje/${characterID}`, { method: 'DELETE' });
        const data = await response.json();
        console.log(data); // Puedes manejar la respuesta del servidor aquí

        // Eliminar la tarjeta del personaje de la pantalla una vez que se ha eliminado
        const characterCard = document.querySelector(`[character-id="${characterID}"]`);
        if (characterCard) {
            characterCard.remove();
        } else {
            console.log("No se encontró la tarjeta del personaje para eliminar.");
        }
    } catch (error) {
        console.error("Error al borrar el personaje:", error);
    }
}

createCharacterCards();