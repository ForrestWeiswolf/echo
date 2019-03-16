let mediaRecorder = null
let recording = false
let timeout = null

let recordTime = null
let waitTime = null

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

    $('#content').addClass('recording-active')

    timeout = setTimeout(() => {
      toggleRecording()
    }, recordTime)
  } else {
    mediaRecorder.then(recorder => recorder.stop())
      .then(() => {
        $('#content').removeClass('recording-active')

        recording = false

        timeout = setTimeout(() => {
          toggleRecording()
        }, recordTime + waitTime)
      })
  }
}

$('#start').on('click', () => {
  recordTime = $('input[name="Record for"]').val() * 1000
  waitTime = $('input[name="Wait for"]').val() * 1000

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