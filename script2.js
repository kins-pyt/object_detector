const activateCameraButton = document.getElementById('activateCamera');
const webcam = document.getElementById('webcam');
const cameraContainer = document.getElementById('cameraContainer');

activateCameraButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcam.srcObject = stream;
        cameraContainer.style.display = 'block';
        activateCameraButton.style.display = 'none';
    } catch (error) {
        alert('Unable to access the camera. Please allow camera permissions');
    }
})
