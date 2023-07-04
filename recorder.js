var audio_context;
var recorder;
var startTime;
var isRecording = false;
var recordings = {};

function startUserMedia(stream) {
  let input = audio_context.createMediaStreamSource(stream);
  recorder = new Recorder(input, {
    bufferLen: 4096,
    numChannels: 1,
    mimeType: 'audio/wav'
  });
}

async function startRecording() {
  if (isRecording)
    return;

  // wait 300ms to avoid recording keystroke
  await new Promise(r => setTimeout(r, 300));

  isRecording = true;
  recorder && recorder.record();

  startTime = Date.now();
  var width = 1;
  var id = setInterval(frame, 10);

  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width = (Date.now() - startTime) / 10;
      document.getElementById("Bar").style.width = width + "%";
    }
  }

  setTimeout(stopRecording, 1000);
}

function stopRecording() {
  recorder && recorder.stop();
  createDownloadLink();
  recorder.clear();
  document.getElementById("Bar").style.width = "0%";
  isRecording = false;
}

function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    let url = URL.createObjectURL(blob);
    let li = document.createElement('li');
    let au = document.createElement('audio');
    let hf = document.createElement('a');
    let hash = makeID(8);

    recordings[hash] = blob;

    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = hash + '.wav';
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);
    recordingslist.appendChild(li);
  });
}

window.onload = () => {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    audio_context = new AudioContext({sampleRate: 16000});
  } catch (e) {
    alert('No web audio support in this browser!' + e);
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {});

  document.addEventListener("keypress", function onPress(event) {
    if (event.key === " ") {
      audio_context.resume();
      startRecording();
    }
  });
}

function downloadZip() {
  let zip = new JSZip();

  for(let hash in recordings) {
    zip.file(hash + '.wav', recordings[hash]);
  }

  zip.generateAsync({type:"blob"})
    .then(function(content) {
      saveAs(content, "recordings.zip");
    }
  );
}

function makeID(length) {
  let result = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; ++i)
    result += chars.charAt(Math.floor(Math.random() * chars.length));

  return result;
}
