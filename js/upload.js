//-----video----///    
const arrow = document.getElementById('navbarArrow');
const howToRecordCancel = document.getElementById('howToRecordCancel');
const myGifsSection = document.getElementById('gifsResults');
const continueButton = document.getElementById('howToRecordContinue');
const howToRecordDiv = document.getElementById('howToRecordDiv');
const recordDiv = document.getElementById('recordDiv');
const video = document.getElementById('uploadVideo');
const counter = document.getElementById('recordCounter');
const buttonRepeat = document.getElementById('recordButtonRepeat');
const buttonStop = document.getElementById('recordButtonStop');
const buttonstart = document.getElementById('recordButtonStart');
const divButtonsStart = document.getElementById('divButtonsStart');
const divButtonsStop = document.getElementById('divButtonsStop');
const divButtonsUpload = document.getElementById('divButtonsUpload');
const recordTitle = document.getElementById('recordTitle');
const buttonUpload = document.getElementById('recordButtonUpload');
const divUploading = document.getElementById('divUploading');
const divuploadDone = document.getElementById('divuploadDone');
const gifPreviewSmall = document.getElementById('gifPreviewSmall');
const uploadURL = "https://upload.giphy.com/v1/gifs?api_key=7XAfLbRx6fo17egr2laJiqXeh98R8llU";
const gifPreview = document.getElementById('gifPreview');
const buttonCancelUpload = document.getElementById('recordbuttonCancelUpload');
const copyGifURL = document.getElementById('copyGifURL');
const saveGif = document.getElementById('saveGif');
const uploadDone = document.getElementById('uploadDone');
let blob = null;
let url = '';
const date = new Date();
date.setHours(0, 0, 0);

arrow.addEventListener('click', () => {
  window.location.assign('index.html');
});

getMyGifs(gifsResultsGrid);

howToRecordCancel.addEventListener('click', () => {
  window.location.assign('index.html');
});

continueButton.addEventListener('click', () => {
  myGifsSection.style.display = 'none';
  howToRecordDiv.style.display = 'none';
  recordDiv.style.display = 'block';
  getStream(video);
});

buttonstart.addEventListener('click', async () => {
  divButtonsStart.style.display = 'none';
  counter.style.display = 'block';
  divButtonsStop.style.display = 'block';
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
  recordGif(stream);
  recordTitle.innerText = 'Capturando tu guifo';
  const countSeconds = setInterval(function () {
    let seconds = date.getSeconds();
    seconds++;
    date.setSeconds(seconds);
    const dateTemplate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    counter.innerHTML = dateTemplate;
    buttonStop.onclick = () => {
      clearInterval(countSeconds);
    };
  }, 1000);
});

buttonStop.addEventListener('click', async () => {
  recordTitle.innerText = 'Vista Previa';
  await recorder.stopRecording();
  blob = await recorder.getBlob();
  url = URL.createObjectURL(blob);
  video.style.display = 'none';
  gifPreview.src = url;
  gifPreview.style.display = 'block';
  divButtonsStop.style.display = 'none';
  divButtonsUpload.style.display = 'block';
});

buttonRepeat.addEventListener('click', () => {
  recordTitle.innerText = 'Un chequeo antes de empezar';
  date.setHours(0, 0, 0);
  counter.innerHTML = '0:0:0';
  counter.style.display = 'none';
  divButtonsUpload.style.display = 'none';
  divButtonsStart.style.display = 'block';
  gifPreview.style.display = 'none';
  video.style.display = 'block';
});

buttonUpload.addEventListener('click', () => {
  recordDiv.style.display = 'none';
  divUploading.style.display = 'block';
  const formData = new FormData();
  formData.append('file', blob, 'myGif.gif');
  console.log(formData.get('file'))
  const xhr = new XMLHttpRequest();
  xhr.open('POST', uploadURL, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const gifObject = JSON.parse(xhr.response);
      saveMyGifs(gifObject.data.id);
      divUploading.style.display = 'none';  
      divuploadDone.style.display = 'block';
      gifPreviewSmall.src = url;
    }
  }
  try {
    xhr.send(formData);
  } catch (e) {
    alert('Error al enviar el gif:' + e);
  }
});

buttonCancelUpload.addEventListener('click', () => {
  divUploading.style.display = 'none';
  recordDiv.style.display = 'block';
});

copyGifURL.addEventListener('click', () => {
  try {
    copyToClipboard(url);
    alert('Enlace copiado con éxito!');
  } catch (e) {
    alert('Error al copiar el enlace');
  }
});

saveGif.addEventListener('click', () => {
  invokeSaveAsDialog(blob);
});

uploadDone.addEventListener('click', () => {
  counter.innerHTML = '0:0:0';
  date.setHours(0, 0, 0);
  window.location.assign('upload.html');
});


async function postToGiphy(formData) {
  const pathToUpload = "https://upload.giphy.com/v1/gifs?";
  const parameterToUpload = {
      headers: new Headers(), // Create empty header
      body: formData, // The gif we send (in function parameter)
      method: "POST",
      mode: "cors"
  };

  /** Upload with fetch :
   *   - First parameter will be the endpoint URL : https://upload.giphy.com/v1/gifs?api_key=7XAfLbRx6fo17egr2laJiqXeh98R8llU
   *   - Second parameter will be the gif (formData)
   */
  const response = await fetch(pathToUpload + apiKey, parameterToUpload);

  return await response.json();
}