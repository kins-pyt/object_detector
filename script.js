const webcamButton = document.getElementById('webcamButton');
const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');

let model = null;

// Load the pre-trained COCO-SSD model
cocoSsd.load().then((loadedModel) => {
  model = loadedModel;
  console.log("Model loaded!");
  webcamButton.disabled = false; // Enable the button after model is loaded
});

// Array to keep track of drawn objects
const children = [];

// Enable Webcam and start object detection
function enableWebcam() {
  // Hide the button
  webcamButton.style.display = 'none';

  // Check if browser supports webcam access
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const constraints = {
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.style.display = 'block';
      video.addEventListener('loadeddata', predictWebcam);
    });
  } else {
    console.error("Webcam not supported in this browser.");
  }
}

// Prediction loop
function predictWebcam() {
  model.detect(video).then((predictions) => {
    // Clear previous highlights
    children.forEach((child) => liveView.removeChild(child));
    children.length = 0;
    // Draw new predictions
    predictions.forEach((prediction) => {
      if (prediction.score > 0.66) {
        const p = document.createElement('p');
        p.innerText = `${prediction.class} - ${Math.round(prediction.score * 100)}% confidence.`;
        p.style = `
          position: absolute;
          left: ${prediction.bbox[0]}px;
          top: ${prediction.bbox[1]}px;
          margin: 0;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.8);
          padding: 2px;
          border-radius: 4px;
        `;

        const highlighter = document.createElement('diy');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = `
          left: ${prediction.bbox[0]}px;
          top: ${prediction.bbox[1]}px;
          width: ${prediction.bbox[2]}px;
          height: ${prediction.bbox[3]}px;
          position: absolute;
            `;
          
        liveView.appendChild(highlighter);
        liveView.appendChild(p);

        children.push(highlighter);
        children.push(p);
      }
    });
    // Keep predicting
    window.requestAnimationFrame(predictWebcam);
  });
}
// Event listener for the webcam button
webcamButton.addEventListener('click', enableWebcam);