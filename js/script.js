//Pour éviter de remettre l'url à chaque fois
const apiUrl = "https://rickandmortyapi.com/api/";

let currentPage = 1;

//Fonction fetch
function fetchData(url) {
    return fetch(url).then(response => response.json());
}

function loadData(action) {
    if (action === 'prev') {
        currentPage = Math.max(1, currentPage - 1);
    } else if (action === 'next') {
        currentPage++;
    }

    // Choisissez l'URL en fonction de la section actuellement affichée
    let apiUrl;
    let displayFunction;
    if (document.getElementById("output").innerHTML.includes("Dimension")) {
        apiUrl = `${apiUrl}location?page=${currentPage}`;
        displayFunction = displayLocations;
    } else if (document.getElementById("output").innerHTML.includes("Épisode")) {
        apiUrl = `${apiUrl}episode?page=${currentPage}`;
        displayFunction = displayEpisodes;
    } else {
        apiUrl = `${apiUrl}character?page=${currentPage}`;
        displayFunction = displayCharacters;
    }

    fetchData(apiUrl).then(data => {
        displayFunction(data.results);
    });
}

//Fonction rechercheS des persos
function displayCharacters(characters) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    characters.forEach(character => {
        const characterDiv = document.createElement("div");
        characterDiv.innerHTML = `<p>${character.name}</p><img src="${character.image}" alt="${character.name}">`;
        outputDiv.appendChild(characterDiv);
    });
}

//Fonction recherche des lieux
function displayLocations(locations) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    locations.forEach(location => {
        const locationDiv = document.createElement("div");
        const residents = location.residents.map(resident => `<li>${resident}</li>`).join("");
        locationDiv.innerHTML = `<p>${location.name}</p><p>Dimension: ${location.dimension}</p><ul>${residents}</ul>`;
        outputDiv.appendChild(locationDiv);
    });
}

//Fonction recherche des épisodes
function displayEpisodes(episodes) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    episodes.forEach(episode => {
        const episodeDiv = document.createElement("div");
        episodeDiv.innerHTML = `<p>${episode.name}</p><p>Épisode: ${episode.episode}</p><p>Date de sortie: ${episode.air_date}</p>`;
        outputDiv.appendChild(episodeDiv);
    });
}

//Affichage des fonctions

//premier bouton
function loadCharacters() {
    const charactersUrl = apiUrl + "character";
    fetchData(charactersUrl).then(data => {
        displayCharacters(data.results);
    });
}

//second bouton
function loadLocations() {
    const locationsUrl = apiUrl + "location";
    fetchData(locationsUrl).then(data => {
        displayLocations(data.results);
    });
}

//troisième bouton
function loadEpisodes() {
    const episodesUrl = apiUrl + "episode";
    fetchData(episodesUrl).then(data => {
        displayEpisodes(data.results);
    });
}
