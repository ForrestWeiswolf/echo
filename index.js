let mediaRecorder = null
let recording = false

function recordAudio() {

  mediaRecorder = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    .then(stream => {
      const audioChunks = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start()
      recording = true

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      })

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks)
        const audio = new Audio(URL.createObjectURL(audioBlob))
        audio.play()
      })

      return mediaRecorder
    })
}

function toggleRecording() {
  if (!recording) {
    recordAudio()
    $('#start').text('Stop')
  } else {
    console.log(mediaRecorder)
    mediaRecorder.then(recorder => recorder.stop())
      .then(() => {
        $('#start').text('Start')
        recording = false
      })
  }
}

$('#start').on('click', toggleRecording)

// $('#play').on('click', () => {})