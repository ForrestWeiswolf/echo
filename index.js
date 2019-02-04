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

recordAudio()