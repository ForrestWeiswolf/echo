function recordAudio() {
  return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start()
      console.log('started recording')
      return mediaRecorder
    })
}

let recording = false
let mediaRecorder = null
$('#record').on('click', () => {
  if(!recording){
    mediaRecorder = recordAudio()
    $('#record').text('Stop')
  } else {
    mediaRecorder.stop()
    $('#record').text('Record')
  }

  recording = !recording
})