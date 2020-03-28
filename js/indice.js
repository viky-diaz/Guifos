//---- Variables ----//
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsEl = document.getElementById("results");
const trendingEl = document.getElementById("trending");
const randomGif = document.getElementById("random-gif");
const fakeInput = document.querySelector("h3.fakeInput");
const fakeInput2 = document.querySelector("h3.fakeInput:last-of-type");
let tags = [];
let resultadoSugerido = document.getElementById("resultadoSugerido");

let resultadosSugeridos1 = [
    "Alpaca",
    "Bear",
    "Cat",
    "Dog",
    "Eagle",
    "Frog",
    "Goat",
    "Hamster",
    "Iguana",
    "Jay",
    "Koala",
    "Lion",
    "Monkey",
    "Nightingale",
    "Owl",
    "Pig",
    "Quail",
    "Racoon",
    "Sheep",
    "Turkey",
    "Unicorn",
    "Vulture",
    "Whale",
    "Xerus",
    "Yacare",
    "Zebra"
];
let resultadosSugeridos2 = [
    "Avocado",
    "Banana",
    "Cherries",
    "Delicious",
    "Eat",
    "Figs",
    "Grape",
    "Ham",
    "Ingredients",
    "Jelly",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Peach",
    "Quesadilla",
    "Raspberries",
    "Soap",
    "Tomatoes",
    "Utensils",
    "Vanilla",
    "Wine",
    "Xacut",
    "Yellow",
    "Zucchini"
];
let resultadosSugeridos3 = [
    "Algorithm",
    "Bit",
    "CSS",
    "Digital",
    "Emoticon",
    "Facebook",
    "Github",
    "HTML",
    "Internet",
    "JavaScript",
    "Keyboard",
    "Link",
    "Mouse",
    "Network",
    "Online",
    "Programming",
    "QWERTY",
    "Ruby",
    "Server",
    "Trash",
    "Upload",
    "Virtual",
    "Web",
    "XML",
    "Yahoo",
    "Zip"
];

let aleatorio = Math.round(Math.random() * 12);
let resultSugeridos1 = document.createElement("input");
let resultSugeridos2 = document.createElement("input");
let resultSugeridos3 = document.createElement("input");
resultSugeridos1.value = resultadosSugeridos1[aleatorio];
resultSugeridos2.value = resultadosSugeridos2[aleatorio];
resultSugeridos3.value = resultadosSugeridos3[aleatorio];
resultSugeridos1.id = "search-sugerencia1";
resultSugeridos2.id = "search-sugerencia2";
resultSugeridos3.id = "search-sugerencia3";
resultSugeridos1.style.cursor = "pointer";
resultSugeridos2.style.cursor = "pointer";
resultSugeridos3.style.cursor = "pointer";
let fakeInput01 = document.querySelector(".fakeInput01");

//---- Evento para submit ----//
searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let q = searchInput.value;
    search(q);
    trendingEl.innerHTML = "";
    randomGif.innerHTML = "";
    fakeInput.innerHTML = "";
    fakeInput2.innerHTML = "";
    fakeInput.style.border = "none";
    fakeInput2.style.border = "none";
    fakeInput01.innerHTML = `<input value= "${q}" readonly class="inputFake fakeInput01">`;
    crearTags();
});

let input1created = false,
    input2created = false,
    input3created = false;
function showSuggestion() {
    if (searchInput.value == "") {
        resultadoSugerido.style.display = "none";
        /* Remove only if created earlier the input */
        if (input1created) {
            resultadoSugerido.removeChild(resultSugeridos1);
            input1created = false;
        }
        if (input2created) {
            resultadoSugerido.removeChild(resultSugeridos2);
            input2created = false;
        }
        if (input3created) {
            resultadoSugerido.removeChild(resultSugeridos3);
            input3created = false;
        }
    } else if (searchInput.value.length === 1) {
        /* Search words in suggestions only for the first letter */
        let output = [];
        let q = searchInput.value;
        /* For each words list find if a words start with the letter entered in the input */
        for (let index = 0; index < resultadosSugeridos1.length; ++index) {
            let value1 = resultadosSugeridos1[index];
            let value2 = resultadosSugeridos2[index];
            let value3 = resultadosSugeridos3[index];
            /* Do not bother with upper and lower case letter */
            value1 = value1.toLowerCase();
            value2 = value2.toLowerCase();
            value3 = value3.toLowerCase();
            q = q.toLowerCase();
            /* Find in each suggest list if the word start with the letter in input */
            if (value1[0] === q) {
                output.push(value1);
            }
            if (value2[0] === q) {
                output.push(value2);
            }
            if (value3[0] === q) {
                output.push(value3);
            }
            /* When we have the first three words stop loop */
            if (output.length === 3) {
                break;
            }
        }
        /* If we find one matching word create first suggestion */
        if (output.length >= 1) {
            resultSugeridos1.value = output[0];
            resultadoSugerido.appendChild(resultSugeridos1);
            /* inputcreated used to indicate we add an input and remove it when we erase search input value */
            input1created = true;
            resultSugeridos1.className = "boton-resultados";
            document.getElementsByClassName(
                "boton-resultados"
            )[0].readOnly = true;
        }
        /* If we find two matching words create the second suggestion */
        if (output.length >= 2) {
            resultSugeridos2.value = output[1];
            input2created = true;
            resultadoSugerido.appendChild(resultSugeridos2);
            resultSugeridos2.className = "boton-resultados";
            document.getElementsByClassName(
                "boton-resultados"
            )[1].readOnly = true;
        }
        /* If we find three matching words create the third suggestion */
        if (output.length >= 3) {
            resultSugeridos3.value = output[2];
            input3created = true;
            resultadoSugerido.appendChild(resultSugeridos3);
            resultSugeridos3.className = "boton-resultados";
            document.getElementsByClassName(
                "boton-resultados"
            )[2].readOnly = true;
        }
        resultadoSugerido.style.display = "block";
    }
}

resultSugeridos1.onclick = function() {
    aleatorio = Math.round(Math.random() * 12);
    let q = resultSugeridos1.value;
    search(resultSugeridos1.value);
    searchInput.value = resultSugeridos1.value;
    resultSugeridos1.value = resultadosSugeridos1[aleatorio];
    resultSugeridos2.value = resultadosSugeridos2[aleatorio];
    resultSugeridos3.value = resultadosSugeridos3[aleatorio];
    fakeInput01.innerHTML = `<input value= "${q}" readonly class="inputFake fakeInput01">  `;
    trendingEl.innerHTML = "";
    randomGif.innerHTML = "";
    fakeInput.innerHTML = "";
    fakeInput2.innerHTML = "";
    fakeInput.style.border = "none";
    fakeInput2.style.border = "none";
    crearTags();
};

resultSugeridos2.onclick = function() {
    aleatorio = Math.round(Math.random() * 12);
    let q = resultSugeridos2.value;
    search(resultSugeridos2.value);
    searchInput.value = resultSugeridos2.value;
    resultSugeridos1.value = resultadosSugeridos1[aleatorio];
    resultSugeridos2.value = resultadosSugeridos2[aleatorio];
    resultSugeridos3.value = resultadosSugeridos3[aleatorio];
    fakeInput01.innerHTML = `<input value= "${q}" readonly class="inputFake fakeInput01">  `;
    trendingEl.innerHTML = "";
    randomGif.innerHTML = "";
    fakeInput.innerHTML = "";
    fakeInput2.innerHTML = "";
    fakeInput.style.border = "none";
    fakeInput2.style.border = "none";
    crearTags();
};

resultSugeridos3.onclick = function() {
    aleatorio = Math.round(Math.random() * 12);
    let q = resultSugeridos3.value;
    search(resultSugeridos3.value);
    searchInput.value = resultSugeridos3.value;
    resultSugeridos1.value = resultadosSugeridos1[aleatorio];
    resultSugeridos2.value = resultadosSugeridos2[aleatorio];
    resultSugeridos3.value = resultadosSugeridos3[aleatorio];
    fakeInput01.innerHTML = `<input value= "${q}" readonly class="inputFake fakeInput01">  `;
    trendingEl.innerHTML = "";
    randomGif.innerHTML = "";
    fakeInput.innerHTML = "";
    fakeInput2.innerHTML = "";
    fakeInput.style.border = "none";
    fakeInput2.style.border = "none";
    crearTags();
};

let i = 0;

function crearTags() {
    let padre = resultsEl.parentNode;
    tags.push(searchInput.value + " ");
    let tag = document.createElement("button");
    console.log(padre);
    padre.insertBefore(tag, fakeInput01);
    tag.innerHTML = tags[i];
    tag.className = "boton-tags";
    tagEtiqueta = document.querySelectorAll("button.boton-tags");
    tagEtiqueta.forEach(function(valor, index) {
        valor.onclick = function() {
            let q = valor.innerHTML;
            search(valor.innerHTML);
            searchInput.value = valor.innerHTML;
            fakeInput01.innerHTML = `<input value= "${q}" readonly class="inputFake fakeInput01">  `;
        };
    });
    i++;
}




//---- Funcion Search ----//
function search(q) {
    let apikey = "7XAfLbRx6fo17egr2laJiqXeh98R8llU";
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=20`;

    fetch(path)
        .then(function(res) {
            return res.json();
        })
        .then(function(json) {
            console.log(json.data[0]);
            let resultsHTML = "";

            json.data.forEach(function(obj) {
                const url = obj.images.fixed_height.url;
                const height = obj.images.fixed_height.height;
                const title = obj.title;

                resultsHTML += `<img
                class="item"
            src="${url}"
            height="${height}"
            alt="${title}"
            >`;
            });
            resultsEl.innerHTML = resultsHTML;
        })
        .catch(function(err) {
            console.log(err.message);
        });
}

//---- Funcion "HOY TE SUGERIMOS" ----//
const random = fetch(
    `https://api.giphy.com/v1/gifs/search?q=tecnology&api_key=7XAfLbRx6fo17egr2laJiqXeh98R8llU&limit=4`
)
    .then(response => response.json())
    .then(json => {
        console.log(json.data);
        let resultsHTML = "";
        json.data.map(obj => {
            const url = obj.images.fixed_height.url;
            const height = obj.images.fixed_height.height;
            const title = obj.title;

            resultsHTML += ` <div > <span id="titlegif"> ${title} <img
            src="assets/button3.svg"
            alt="boton cierre ventana"
            class="boton-cierre"
        /></span>
            <img
                class="item"
            src="${url}"
            height="${height}"
            alt="${title}"
            ><div id="img-boton">  <button class="boton-gif"> <a href="${url}"  target="_blank" class="a-gif">Ver más... </a></button></div> </div>`;
        });
        randomGif.innerHTML = resultsHTML;
    });

//---- Funcion "TENDENCIAS" ----//
let apiKey = "7XAfLbRx6fo17egr2laJiqXeh98R8llU";
const trending = fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=24`
)
    .then(response => response.json())
    .then(json => {
        let resultsHTML = "";
        json.data.map(obj => {
            const url = obj.images.fixed_height.url;
            const height = obj.images.fixed_height.height;
            const title = obj.title;

            resultsHTML += ` <div class="intento"><img
            class="item item1"
        src="${url}"
        height="${height}"
        alt="${title}"
        ><div class="hover"><p id="hovergif"> ${title} </p></div> </div>`;
        });
        trendingEl.innerHTML = resultsHTML;
    });