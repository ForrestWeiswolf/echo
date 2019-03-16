let mediaRecorder = null
let recording = false
let timeout = null

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
  $('#content').toggleClass('recording-active')
  if (!recording) {
    recordAudio()
    timeout = setTimeout(() => {
      toggleRecording()
    }, $('input[name="Record for"]').val() * 1000)
  } else {
    mediaRecorder.then(recorder => recorder.stop())
      .then(() => {
        recording = false
        timeout = setTimeout(() => {
          toggleRecording()
        }, ($('input[name="Record for"]').val() * 1000) + $('input[name="Wait for"]').val() * 1000)
      })
  }
}

$('#start').on('click', () => {
  if (!timeout) {
    $('#start').text('Stop')
    toggleRecording()
  } else {
    $('#start').text('Start')
    clearTimeout(timeout)
    timeout = null
  }
})

// $('#play').on('click', () => {})