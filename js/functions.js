const apiKey = '7XAfLbRx6fo17egr2laJiqXeh98R8llU';
let arrayMyGIfs = [];
let arrayString = [];
let recorder = null;

const renderGifs = (gifs, container, search) => {
  let template = '';
  for (let gif of gifs) {
    let clase = 'gif';
    if ((gif.images.original.width / gif.images.original.height) >= 2) {
      clase = 'giflarge';
    } else {
      clase = 'gif';
    }
    template += ` 
        <div class="gifcontainer">
            <img class="${clase}" src="${gif.images.original.url}">      
            <footer class="giftext">
                <p>${getHashtags(gif, search)}</p>
            </footer>
        </div>
        `;
  }
  container.innerHTML = template;
};

const getHashtags = (gif, search) => {
  let hashtags = '';
  let slugArray = gif.slug.split('-');
  slugArray.pop();
  if (slugArray.length !== 0) {
    slugArray = slugArray.map(e => `#${e}`);
    if (slugArray.length > 3) {
      slugArray.splice(2, slugArray.length - 1);
    }
    hashtags = slugArray.join(' ');
  } else {
    if (gif.title !== '') {
      let title = gif.title.trim();
      title = title.substring(0, title.indexOf('GIF'));
      hashtags = title.split(' ').map(e => `#${e}`).join(' ');
    } else {
      if (search) {
        hashtags = `#${search}`;
      }
    }
  }
  return hashtags;
};

const searchGifs = (searchValue, container) => {
  fetch(`https://api.giphy.com/v1/gifs/search?q=${searchValue}&apiKey=${apiKey}&limit=20`)
    .then((res) => {
      return res.json();
    }).then((res) => {
      renderGifs(res.data, container);
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchCategoryGifs = (searchValue, img) => {
  fetch(`https://api.giphy.com/v1/gifs/search?q=${searchValue}&apiKey=${apiKey}&limit=1`)
    .then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res);
      img.src = res.data[0].images.original.url;
    })
    .catch((error) => {
      console.log(error);
    });
};


localStorage.removeItem('searchString');
const saveSearchs = (search) => {
  if (localStorage.getItem('searchString') == null) {
    arrayString.push(search);
  } else {
    arrayString = localStorage.getItem('searchString').split(',');
    if (arrayString.length < 3) {
      arrayString.push(search);
    }
    if (arrayString.length === 3) {
      arrayString.shift();
      arrayString.push(search);
    }
  }
  localStorage.setItem('searchString', arrayString.join());
  for (let i = 0; i < arrayString.length; i++) {
    const button = document.getElementById(`searchresult${i}`);
    button.childNodes[0].nodeValue = `${arrayString[i]}`;
    button.style.display = 'block';
  }
};

const getStream = async (video) => {
  const constraints = {
    audio: false,
    video: {
      height: 400,
      width: 750
    }
  };
  stream = navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      console.log('Cámara capturada');
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log('Cámara no capturada' + err);
    });
};

const recordGif = async (stream) => {
  recorder = new RecordRTCPromisesHandler(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    hidden: 240,
    onGifRecordingStarted: function () {
      console.log('Comenzó la grabación');
    }
  });
  recorder.startRecording();
};

const saveMyGifs = (gifID) => {
  if (localStorage.getItem('arrayMyGifs') == null) {
    arrayMyGIfs.push(gifID);
  } else {
    arrayMyGIfs = localStorage.getItem('arrayMyGifs').split(',');
    arrayMyGIfs.push(gifID);
  }
  localStorage.setItem('arrayMyGifs', arrayMyGIfs.join());
};

const getMyGifs = (container) => {
  const gifs = localStorage.getItem('arrayMyGifs');
  if (gifs) {
    fetch(`https://api.giphy.com/v1/gifs?apiKey=${apiKey}&ids=${gifs}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        renderGifs(res.data, container, 'MyGifs');
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    container.innerHTML = '';
  }
};

const copyToClipboard = (text) => {
  const hiddentextarea = document.createElement('textarea');
  document.body.appendChild(hiddentextarea);
  hiddentextarea.value = text;
  hiddentextarea.select();
  document.execCommand('copy');
  document.body.removeChild(hiddentextarea);
};

function uploadYourGif() {
  let form = new FormData();
  form.append('file', recorder.getBlob(), 'myGif.gif')
  console.log(form.get('file'))
  const uploadURL = 'https://upload.giphy.com/v1/gifs?api_key=7XAfLbRx6fo17egr2laJiqXeh98R8llU'
  fetch(uploadURL, {
      method: 'POST',
      body: form,
  }).then(response => response.json()
  ).then(success => console.log(success)
  ).catch(error => console.log(error)
  );
};