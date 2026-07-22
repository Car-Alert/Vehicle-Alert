/* ==========================================
   VEHICLE ALERT SYSTEM
   FINAL PREMIUM SCRIPT.JS
========================================== */

let selectedIssue = "";
let pendingAction = "";

/* ------------------------------
   Load Vehicle Details
------------------------------ */

const params = new URLSearchParams(window.location.search);

const owner = params.get("owner") || "Unknown Owner";
const car = params.get("car") || "Unknown Vehicle";
const number = params.get("number") || "Unknown";
const mobile = params.get("mobile") || "";
const type = params.get("type") || "car";

/* ------------------------------
   Page Load
------------------------------ */

window.onload = () => {

    // Vehicle Details
    const ownerEl = document.getElementById("ownerName");
    const carEl = document.getElementById("carName");
    const plateEl = document.getElementById("plateNumber");

    if (ownerEl) ownerEl.textContent = owner;
    if (carEl) carEl.textContent = car;
    if (plateEl) plateEl.textContent = number;

    // Vehicle Icon
    const icon = document.getElementById("vehicleIcon");

    if (icon) {

        switch (type) {

            case "bike":
                icon.innerHTML = "🏍️";
                break;

            default:
                icon.innerHTML = "🚘";

        }

    }

    // Character Counter
    const otherIssue = document.getElementById("otherIssue");

    if (otherIssue) {

        otherIssue.addEventListener("input", function () {

            const count = document.getElementById("charCount");

            if (count) {
                count.innerHTML = this.value.length + " / 200";
            }

        });

    }

};

/* ------------------------------
   Select Issue
------------------------------ */

function selectIssue(button, issue) {

    selectedIssue = issue;

    document.querySelectorAll(".opt").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const sendBtn = document.getElementById("sendBtn");

    sendBtn.disabled = false;
    sendBtn.classList.add("active");

    // Other Issue Textbox

    const box = document.getElementById("otherIssue");

    if (box) {

        if (issue === "Other Issue") {

            box.style.display = "block";
            box.focus();

        } else {

            box.style.display = "none";
            box.value = "";

            const count = document.getElementById("charCount");

            if (count) {
                count.innerHTML = "0 / 200";
            }

        }

    }

}

/* ------------------------------
   Send Alert
------------------------------ */

function sendAlert() {

    if (selectedIssue === "") {
        alert("Please select an issue.");
        return;
    }

    if (selectedIssue === "Other Issue") {

        const txt = document.getElementById("otherIssue").value.trim();

        if (txt === "") {
            alert("Please describe the issue.");
            return;
        }
    }

    document.getElementById("confirmPopup").classList.add("show");

}

/* ------------------------------
   Close Confirm
------------------------------ */

function closeConfirm() {

    document.getElementById("confirmPopup").classList.remove("show");

}

/* ------------------------------
   Confirm Send
------------------------------ */

function confirmSend() {

    document.getElementById("confirmPopup").classList.remove("show");

    document.getElementById("loadingOverlay").classList.add("show");

    const sendBtn = document.getElementById("sendBtn");

    sendBtn.disabled = true;
    sendBtn.classList.remove("active");

    setTimeout(() => {

        document.getElementById("loadingOverlay").classList.remove("show");

        sendTelegram();

    }, 2000);

}
/* ------------------------------
   Telegram
------------------------------ */

function sendTelegram() {

    // Custom Issue

    let issueText = selectedIssue;

    if (selectedIssue === "Other Issue") {

        const txt = document.getElementById("otherIssue").value.trim();

        if (txt === "") {

            alert("Please describe the issue.");

            const sendBtn = document.getElementById("sendBtn");

            sendBtn.disabled = false;
            sendBtn.classList.add("active");
            sendBtn.innerHTML = "🚨 Send Alert";

            return;

        }

        issueText = txt;

    }

    const BOT_TOKEN = "8078122204:AAHFTan8c_tsAG1QZ3cdRk_tI33E9_hjybw";
    const CHAT_ID = "2105892713";

    const sendBtn = document.getElementById("sendBtn");

    function sendTelegramMessage(lat, lon) {

        const locationText = (lat && lon)
            ? `📍 Sender Location\nhttps://maps.google.com/?q=${lat},${lon}`
            : `📍 Sender Location\nPermission Denied`;

        const message = `🚨 VEHICLE ALERT

👤 Owner: ${owner}

🚘 Vehicle: ${car}

🚗 Number: ${number}

⚠️ Issue: ${issueText}

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

            body:
                `chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`

        })

        .then(res => res.json())

        .then(data => {

            if (data.ok) {

                showSuccess();

            } else {

                sendBtn.disabled = false;
                sendBtn.classList.add("active");
                sendBtn.innerHTML = "🚨 Send Alert";

                alert("Telegram Error : " + data.description);

            }

        })

        .catch(() => {

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

function showSuccess() {

    const popup = document.getElementById("success");

    popup.classList.add("show");

    const sendBtn = document.getElementById("sendBtn");

    sendBtn.innerHTML = "✅ Alert Sent";
    sendBtn.disabled = true;

    // Reset after 3 seconds

    setTimeout(() => {

        popup.classList.remove("show");

        // Reset Issue Buttons
        document.querySelectorAll(".opt").forEach(btn => {
            btn.classList.remove("active");
        });

        // Hide Other Issue Box
        const box = document.getElementById("otherIssue");

        if (box) {
            box.style.display = "none";
            box.value = "";
        }

        // Reset Counter
        const count = document.getElementById("charCount");

        if (count) {
            count.innerHTML = "0 / 200";
        }

        // Reset Button
        sendBtn.innerHTML = "🚨 Send Alert";
        sendBtn.disabled = true;
        sendBtn.classList.remove("active");

        // Reset Selected Issue
        selectedIssue = "";

    }, 3000);

}

function sendSMS() {

    pendingAction = "sms";

    document.querySelector("#confirmPopup h2").innerHTML =
        "💬 Confirm SMS";

    document.querySelector("#confirmPopup p").innerHTML =
        "Are you sure you want to send an SMS to the vehicle owner?";

    document.getElementById("confirmPopup").classList.add("show");

}

    function openSMS(lat, lon) {

        const location =
            (lat && lon)
            ? `https://maps.google.com/?q=${lat},${lon}`
            : "Location Permission Denied";

        const message =

`🚨 VEHICLE ALERT

👤 Owner: ${owner}

🚘 Vehicle: ${car}

🚗 Number: ${number}

⚠️ Issue: ${issueText}

📍 Location:
${location}

🕒 Time:
${new Date().toLocaleString()}

🌐 Vehicle Page:
${window.location.href}

━━━━━━━━━━━━━━━━━━
Sent via Vehicle Alert`;

        window.location.href =
`sms:${mobile}?body=${encodeURIComponent(message)}`;

    }


function sendSMS() {

    pendingAction = "sms";

    document.querySelector("#confirmPopup h2").innerHTML =
        "💬 Confirm SMS";

    document.querySelector("#confirmPopup p").innerHTML =
        "Are you sure you want to send an SMS to the vehicle owner?";

    document.getElementById("confirmPopup").classList.add("show");

}

function callOwner() {

    pendingAction = "call";

    document.querySelector("#confirmPopup h2").innerHTML =
        "📞 Confirm Call";

    document.querySelector("#confirmPopup p").innerHTML =
        "Are you sure you want to call the vehicle owner?";

    document.getElementById("confirmPopup").classList.add("show");

}