let mediaRecorder = null
let recording = false
let interval = null

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
  } else {
    mediaRecorder.then(recorder => recorder.stop())
      .then(() => {
        recording = false
      })
  }
}

$('#start').on('click', () => {
  if (!interval) {
    $('#start').text('Stop')
    interval = setInterval(() => {
      toggleRecording()
    }, 3000)
  } else {
    $('#start').text('Start')
    clearInterval(interval)
    interval = null
  }
})

// $('#play').on('click', () => {})