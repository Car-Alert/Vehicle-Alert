/* ==========================================
   VEHICLE ALERT SYSTEM
   FINAL SCRIPT.JS
========================================== */

let selectedIssue = "";

/* ------------------------------
   Load Vehicle Details
------------------------------ */

const params = new URLSearchParams(window.location.search);

const owner = params.get("owner") || "Unknown Owner";
const car = params.get("car") || "Unknown Vehicle";
const number = params.get("number") || "Unknown";
const type =
params.get("type") || "car";

const icon =
document.getElementById("vehicleIcon");

if(icon){

    if(type==="bike"){

        icon.innerHTML="🏍️";

    }else{

        icon.innerHTML="🚘";

    }

}

/* ------------------------------
   Page Load
------------------------------ */

window.onload = () => {

    const ownerEl = document.getElementById("ownerName");
    const carEl = document.getElementById("carName");
    const plateEl = document.getElementById("plateNumber");

    if (ownerEl) ownerEl.textContent = owner;
    if (carEl) carEl.textContent = car;
    if (plateEl) plateEl.textContent = number;

};

/* ------------------------------
   Select Issue
------------------------------ */

function selectIssue(button, issue){

    selectedIssue = issue;

    document.querySelectorAll(".opt").forEach(btn=>{
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const sendBtn = document.getElementById("sendBtn");
    sendBtn.disabled = false;
    sendBtn.classList.add("active");
const box = document.getElementById("otherIssue");

if(issue === "Other Issue"){
    box.style.display = "block";
}else{
    box.style.display = "none";
    box.value = "";
}
}

/* ------------------------------
   Open Confirm Popup
------------------------------ */

function sendAlert(){

    if(selectedIssue === ""){
        alert("Please select an issue.");
        return;
    }

    document.getElementById("confirmPopup").classList.add("show");
}

/* ------------------------------
   Close Confirm Popup
------------------------------ */

function closeConfirm(){

    document.getElementById("confirmPopup").classList.remove("show");

}

/* ------------------------------
   Confirm & Send
------------------------------ */

function confirmSend(){

    document.getElementById("confirmPopup").classList.remove("show");

    const sendBtn = document.getElementById("sendBtn");

    sendBtn.disabled = true;
    sendBtn.innerHTML = "⏳ Sending Alert...";

    sendTelegram();

}

/* ------------------------------
   Telegram
------------------------------ */
 
function sendTelegram() {

    const BOT_TOKEN = "8078122204:AAHFTan8c_tsAG1QZ3cdRk_tI33E9_hjybw";

    const CHAT_ID = "2105892713";

    const sendBtn = document.getElementById("sendBtn");
    sendBtn.innerHTML = "📍 Getting Location...";

    function sendTelegramMessage(lat, lon) {

        const locationText = (lat !== null && lon !== null)
            ? `📍 Sender Location\nhttps://maps.google.com/?q=${lat},${lon}`
            : `📍 Sender Location\nPermission Denied`;

        const message = `🚨 VEHICLE ALERT

👤 Owner: ${owner}

🚘 Vehicle: ${car}

🚗 Number: ${number}

⚠️ Issue: ${selectedIssue}

${locationText}

🕒 Time: ${new Date().toLocaleString()}

🌐 Vehicle Page:
${window.location.href}

━━━━━━━━━━━━━━━━━━
📢 Sent via Vehicle Alert System`;

        sendBtn.innerHTML = "🚨 Sending Alert...";

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`
        })
        .then(res => res.json())
        .then(data => {

            if (data.ok) {

                showSuccess();

            } else {

                sendBtn.disabled = false;
                sendBtn.classList.add("active");
                sendBtn.innerHTML = "🚨 Send Alert";

                alert("Telegram Error: " + data.description);

            }

        })
        .catch(err => {

            console.error(err);

            sendBtn.disabled = false;
            sendBtn.classList.add("active");
            sendBtn.innerHTML = "🚨 Send Alert";

            alert("Network Error");

        });

    }

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                sendTelegramMessage(
                    position.coords.latitude,
                    position.coords.longitude
                );

            },

            function() {

                sendTelegramMessage(null, null);

            },

            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0
            }

        );

    } else {

        sendTelegramMessage(null, null);

    }

}

/* ------------------------------
   Success Popup
------------------------------ */

function showSuccess(){

    const popup=document.getElementById("success");

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

        location.reload();

    },3000);

}