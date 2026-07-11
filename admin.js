/* ==========================================
   VEHICLE QR GENERATOR
   FINAL ADMIN.JS
========================================== */

function generateQR() {

    const owner = document.getElementById("owner").value.trim();
    const car = document.getElementById("car").value.trim();
    const number = document.getElementById("number").value.trim().toUpperCase();
 const mobile = document.getElementById("mobile").value.trim();
 const photo = document.getElementById("photo").value.trim();
 const type = document.getElementById("vehicleType").value;

    if (!owner || !car || !number || !mobile ) {
        alert("Please fill all fields.");
        return;
    }

    /* IMPORTANT
       Replace this URL with YOUR GitHub Pages URL
       Example:
       https://username.github.io/VehicleAlert/
    */

    const baseURL = "https://car-alert.github.io/Vehicle-Alert/";

    const vehicleURL =
`${baseURL}?type=${encodeURIComponent(type)}&owner=${encodeURIComponent(owner)}&car=${encodeURIComponent(car)}&number=${encodeURIComponent(number)}&mobile=${encodeURIComponent(mobile)}`;

    const qrURL =
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(vehicleURL)}`;

    document.getElementById("result").style.display = "block";

    document.getElementById("result").innerHTML = `

<h2>✅ Vehicle Created</h2>

<img id="qrImage" src="${qrURL}" alt="QR Code">

<p style="margin-top:15px;font-weight:bold;">
Vehicle Link
</p>

<input
type="text"
id="vehicleLink"
value="${vehicleURL}"
readonly>

<button class="action-btn" onclick="copyLink()">
📋 Copy Link
</button>

<button class="download-btn" onclick="downloadQR()">
💾 Download QR
</button>

`;

}

function copyLink() {

    const link = document.getElementById("vehicleLink");

    link.select();
    link.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(link.value);

    alert("Vehicle Link Copied.");

}

function downloadQR() {

    const image = document.getElementById("qrImage");

    const a = document.createElement("a");

    a.href = image.src;

    a.download = "VehicleQR.png";

    a.click();

}

function downloadSticker(){

    alert("Sticker Generator Coming in Step 2");

}