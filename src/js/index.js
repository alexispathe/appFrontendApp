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
        const characterContainer = document.querySelector('.section_characters');
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
                    <p class="info_description">Genero: Hombre</p>
                    <p class="info_description">Especie: Alien</p>
                </div>
            </div> `
            characterFragment.appendChild(character);
        });

        characterContainer.appendChild(characterFragment);
    } catch (error) {
        console.log("Ocurrió un error: ", error);
    }
}
createCharacterCard()