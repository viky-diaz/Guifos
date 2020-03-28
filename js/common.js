const body = document.querySelector('body');
const logo = document.getElementById('navbarLogo');
const bodyClass = sessionStorage.getItem('bodyClass');
const uploadButton = document.getElementById('uploadButton');
const myGifsButton = document.getElementById('myGifsButton');
const searchSection = document.getElementById('search');
const suggestedSection = document.getElementById('suggested');
const gifsResultsText = document.getElementById('gifsResultsText');
const gifsResultsGrid = document.getElementById('gifsResultsGrid');
const chooseThemeDiv = document.getElementById('chooseThemeDiv');
const chooseThemeButtonA = document.getElementById('chooseThemeButtonA');
const chooseThemeButtonB = document.getElementById('chooseThemeButtonB');
const themesDiv = document.getElementById('themesDiv');
const lightButton = document.getElementById('lightThemeButton');
const darkButton = document.getElementById('darkThemeButton');

const activateThemes = (bodyclass) => {
  if (bodyclass === 'light') {
    body.classList.remove('dark');
    body.classList.add('light');
    logo.src = 'img/gifOF_logo.png';
  }
  if (bodyclass === 'dark') {
    body.classList.remove('light');
    body.classList.add('dark');
    logo.src = 'img/gifOF_logo_dark.png';
  } else {
    body.classList.add('light');
  }
};

activateThemes(bodyClass);

logo.addEventListener('click', () => {
  window.location.assign('index.html');
});

uploadButton.addEventListener('click', () => {
  window.location.assign('upload.html');
});

myGifsButton.addEventListener('click', () => {
  searchSection.style.display = 'none';
  suggestedSection.style.display = 'none';
  gifsResultsText.innerHTML = 'Mis Guifos';
  getMyGifs(gifsResultsGrid);
});

chooseThemeDiv.addEventListener('click', () => {
  if (chooseThemeButtonA.classList.contains('button--primaryactive')) {
    chooseThemeButtonA.classList.remove('button--primaryactive');
    chooseThemeButtonB.classList.remove('button--primaryactive');
    themesDiv.style.display = 'none';
  } else {
    chooseThemeButtonA.classList.add('button--primaryactive');
    chooseThemeButtonB.classList.add('button--primaryactive');
    themesDiv.style.display = 'block';
  }
});

const changeThemes = (themeToAdd, themeToRemove) => {
  body.classList.remove(`${themeToRemove}`);
  body.classList.add(`${themeToAdd}`);
  themesDiv.style.display = 'none';
  chooseThemeButtonA.classList.remove('button--primaryactive');
  chooseThemeButtonB.classList.remove('button--primaryactive');
  sessionStorage.setItem('bodyClass', `${themeToAdd}`);
};

lightButton.addEventListener('click', () => {
  changeThemes('light', 'dark');
  logo.src = 'img/gifOF_logo.png';
});

darkButton.addEventListener('click', () => {
  changeThemes('dark', 'light');
  logo.src = 'img/gifOF_logo_dark.png';
});