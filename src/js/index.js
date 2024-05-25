// Funcion para devolver todos los personajes
const getCharacters = async () => {
    try {
        const random = Math.floor(Math.random() * 42);
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${random}`);
        const characters = await response.json();
        console.log(characters.results)
        return characters;
    } catch (error) {
        console.log("Ocurrió un error: ", error);
    }
};
//   Funcion para crear las tarjeta para la informacion de los personajes

const createCharacterCard = async () => {
    try {
        const characters = await getCharacters();
        const characterContainer = document.querySelector('.section_characters_container');
        const characterFragment = document.createDocumentFragment();

        characters.results.forEach((characterData) => {
            const character = document.createElement('div');
            character.className = "character";
            character.innerHTML = ` 
            <div class="character-img">
                <img src="${characterData.image}"/>
            </div>
                <div class="character-info">
                    <div class="info_name_container">
                        <p class="info_name">Nombre: ${characterData.name}</p>
                    </div>
                <div class="info_description_container">
                    <p class="info_description">Genero: ${characterData.gender}</p>
                    <p class="info_description">Especie: ${characterData.species}</p>
                </div>
                <div class="addList" data-character-id="${characterData.id}">
                    <p>Agrgar a favoritos</p>
                </div>
            </div> `
            characterFragment.appendChild(character);
        });

        characterContainer.appendChild(characterFragment);
        addList();

    } catch (error) {
        console.log("Ocurrió un error: ", error);
    }
}
// Funcion para agregar a la lista de favoritos
const addList = async () => {
    const addListElements = Array.from(document.querySelectorAll('.addList'));
    addListElements.forEach((element, i) => {
        element.addEventListener('click', () => {
            fetch('http://localhost:4000/api/guardar-personaje-favorito', {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {personajeID: element.getAttribute('data-character-id') })
            })
         })
    });
}

createCharacterCard()