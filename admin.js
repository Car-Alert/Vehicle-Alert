/* ==========================================
   VEHICLE ALERT
   ADMIN PANEL V2
========================================== */

let vehicleNumber = "";
let vehicleQR = "";
let vehicleLink = "";

const STICKER_TEMPLATE = "images/sticker-template.png";

/* ==========================================
   GENERATE QR
========================================== */

function generateQR() {

    const owner = document.getElementById("owner").value.trim();

    const car = document.getElementById("car").value.trim();

    const number = document.getElementById("number")
        .value.trim()
        .toUpperCase();

    const mobile = document.getElementById("mobile")
        .value.trim();

    const type = document.getElementById("vehicleType")
        .value;

    if (!owner || !car || !number || !mobile) {

        alert("Please fill all fields.");

        return;

    }

    vehicleNumber = number;

    const baseURL =
        "https://car-alert.github.io/Vehicle-Alert/";

    vehicleLink =
`${baseURL}?type=${encodeURIComponent(type)}&owner=${encodeURIComponent(owner)}&car=${encodeURIComponent(car)}&number=${encodeURIComponent(number)}&mobile=${encodeURIComponent(mobile)}`;

    vehicleQR =
`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(vehicleLink)}`;

    document.getElementById("result").style.display = "block";

    document.getElementById("result").innerHTML = `
    
<h2>✅ Vehicle Created</h2>

<img
id="qrImage"
src="${vehicleQR}"
alt="QR Code">

<p style="margin-top:18px;font-weight:bold;">
Vehicle Link
</p>

<input
type="text"
id="vehicleLink"
value="${vehicleLink}"
readonly>

<button
class="action-btn"
onclick="copyLink()">

📋 Copy Link

</button>

<button
class="download-btn"
onclick="downloadQR()">

💾 Download QR

</button>

<button
class="sticker-btn"
onclick="downloadSticker()">

🖼️ Download Sticker

</button>

`;

}
/* ==========================================
   COPY VEHICLE LINK
========================================== */

function copyLink() {

    const input = document.getElementById("vehicleLink");

    input.select();
    input.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(vehicleLink)
    .then(() => {

        alert("✅ Vehicle Link Copied");

    })
    .catch(() => {

        alert("Unable to copy link.");

    });

}

/* ==========================================
   DOWNLOAD QR
========================================== */

function downloadQR() {

    const link = document.createElement("a");

    link.href = vehicleQR;

    link.download = vehicleNumber + "-QR.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

/* ==========================================
   FINAL UTILITIES
========================================== */

// Auto Uppercase Vehicle Number

document.getElementById("number").addEventListener("input", function () {

    this.value = this.value.toUpperCase();

});

// Enter Key Support

document.querySelectorAll("input").forEach(input => {

    input.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            generateQR();

        }

    });

});

// QR Image Load Check

window.addEventListener("load", () => {

    console.log("✅ Vehicle Alert Admin Panel Loaded");

}
);
/* ==========================================
   DOWNLOAD STICKER V3
========================================== */

async function downloadSticker() {

    const canvas = document.createElement("canvas");
    canvas.width = 1536;
    canvas.height = 1536;

    const ctx = canvas.getContext("2d");

    // Template Load
    const template = new Image();
    template.crossOrigin = "anonymous";
    template.src = STICKER_TEMPLATE;

    await new Promise(resolve => {
        template.onload = resolve;
    });

    ctx.drawImage(template,0,0,1536,1536);

    // QR Load
    const qr = new Image();
    qr.crossOrigin = "anonymous";
    qr.src = vehicleQR;

    await new Promise(resolve=>{
        qr.onload = resolve;
    });

    // QR Position
    ctx.drawImage(
        qr,
        800,      // X
        500,      // Y
        540,      // Width
        540       // Height
    );

    const link=document.createElement("a");

    link.download =
    vehicleNumber + "-Vehicle-Alert-Sticker.png";

    link.href=canvas.toDataURL("image/png");

    link.click();

}