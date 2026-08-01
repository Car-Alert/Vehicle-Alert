/* ==========================================
   VEHICLE ALERT v4.0
   PREMIUM SCRIPT
========================================== */

"use strict";

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let selectedIssue = "";
let pendingAction = "";

/* ==========================================
   URL PARAMETERS
========================================== */

const params = new URLSearchParams(window.location.search);

const owner  = params.get("owner")  || "Unknown Owner";
const car    = params.get("car")    || "Unknown Vehicle";
const number = params.get("number") || "Unknown";
const mobile = params.get("mobile") || "";
const type   = params.get("type")   || "car";

/* ==========================================
   DOM ELEMENTS
========================================== */

const ownerEl      = document.getElementById("ownerName");
const carEl        = document.getElementById("carName");
const plateEl      = document.getElementById("plateNumber");
const iconEl       = document.getElementById("vehicleIcon");

const otherIssue   = document.getElementById("otherIssue");
const charCount    = document.getElementById("charCount");

const sendBtn      = document.getElementById("sendBtn");

const confirmPopup = document.getElementById("confirmPopup");
const loading      = document.getElementById("loadingOverlay");
const success      = document.getElementById("success");

/* ==========================================
   PAGE LOAD
========================================== */

window.onload = function () {

    if (ownerEl) ownerEl.textContent = owner;
    if (carEl) carEl.textContent = car;
    if (plateEl) plateEl.textContent = number;

    if (iconEl) {

        switch (type.toLowerCase()) {

            case "bike":
                iconEl.innerHTML = "🏍️";
                break;

            case "truck":
                iconEl.innerHTML = "🚚";
                break;

            case "bus":
                iconEl.innerHTML = "🚌";
                break;

            default:
                iconEl.innerHTML = "🚘";

        }

    }

    if (otherIssue && charCount) {

        otherIssue.addEventListener("input", function () {

            charCount.textContent =
                this.value.length + " / 200";

        });

    }

};

/* ==========================================
   SELECT ISSUE
========================================== */

function selectIssue(button, issue) {

    selectedIssue = issue;

    document.querySelectorAll(".opt").forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");

    sendBtn.disabled = false;
    sendBtn.classList.add("active");

    if (issue === "Other Issue") {

        otherIssue.style.display = "block";
        otherIssue.focus();

    }

    else {

        otherIssue.style.display = "none";
        otherIssue.value = "";

        if (charCount) {

            charCount.textContent = "0 / 200";

        }

    }

}

/* ==========================================
   OPEN CONFIRM POPUP
========================================== */

function openConfirm(title, text, action) {

    pendingAction = action;

    document.querySelector("#confirmPopup h2").innerHTML = title;

    document.querySelector("#confirmPopup p").innerHTML = text;

    confirmPopup.classList.add("show");

}

/* ==========================================
   CLOSE CONFIRM POPUP
========================================== */

function closeConfirm() {

    confirmPopup.classList.remove("show");

}

/* ==========================================
   SEND ALERT
========================================== */

function sendAlert() {

    if (selectedIssue === "") {
        alert("Please select an issue.");
        return;
    }

    if (
        selectedIssue === "Other Issue" &&
        otherIssue.value.trim() === ""
    ) {
        alert("Please describe the issue.");
        otherIssue.focus();
        return;
    }

    openConfirm(
        "🚨 Confirm Alert",
        "Are you sure you want to send this alert to the vehicle owner?",
        "alert"
    );

}

/* ==========================================
   CONFIRM BUTTON
========================================== */

function confirmSend() {

    closeConfirm();

    switch (pendingAction) {

        case "alert":
            startAlertSending();
            break;

        case "call":
            startCall();
            break;

        case "sms":
            startSMS();
            break;

    }

}

/* ==========================================
   START ALERT
========================================== */

function startAlertSending() {

    loading.classList.add("show");

    sendBtn.disabled = true;
    sendBtn.classList.remove("active");

    setTimeout(() => {

        loading.classList.remove("show");

        sendTelegram();

    }, 1800);

}

/* ==========================================
   TELEGRAM
========================================== */

function sendTelegram() {

    let issueText = selectedIssue;

    if (selectedIssue === "Other Issue") {
        issueText = otherIssue.value.trim();
    }

    // -----------------------------
    // Telegram Configuration
    // -----------------------------

    const BOT_TOKEN = "8078122204:AAHFTan8c_tsAG1QZ3cdRk_tI33E9_hjybw";
    const CHAT_ID = "2105892713";

    // -----------------------------

    function sendMessage(lat, lon) {

        const location = lat && lon
            ? `https://maps.google.com/?q=${lat},${lon}`
            : "Permission Denied";

        const message =
`🚨 VEHICLE ALERT

👤 Owner : ${owner}

🚘 Vehicle : ${car}

🚗 Number : ${number}

⚠️ Issue : ${issueText}

📍 Location
${location}

🕒 ${new Date().toLocaleString()}

🌐 ${window.location.href}`;

        fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/x-www-form-urlencoded"
                },
                body:
                    "chat_id=" + CHAT_ID +
                    "&text=" +
                    encodeURIComponent(message)
            }
        )

        .then(res => res.json())

        .then(data => {

            if (data.ok) {

                showSuccess();

            } else {

                alert("Telegram Error");

                sendBtn.disabled = false;
                sendBtn.classList.add("active");

            }

        })

        .catch(() => {

            alert("Network Error");

            sendBtn.disabled = false;
            sendBtn.classList.add("active");

        });

    }

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            pos => {

                sendMessage(
                    pos.coords.latitude,
                    pos.coords.longitude
                );

            },

            () => {

                sendMessage(null, null);

            },

            {
                enableHighAccuracy: true,
                timeout: 8000
            }

        );

    } else {

        sendMessage(null, null);

    }

}
/* ==========================================
   PART 3 / 4
   CALL + SMS
========================================== */

/* ==========================================
   CALL BUTTON
========================================== */

function callOwner() {

    openConfirm(
        "📞 Confirm Call",
        "Are you sure you want to call the vehicle owner?",
        "call"
    );

}

/* ==========================================
   SMS BUTTON
========================================== */

function sendSMS() {

    if (selectedIssue === "") {
        alert("Please select an issue.");
        return;
    }

    if (
        selectedIssue === "Other Issue" &&
        otherIssue.value.trim() === "")
{
        alert("Please describe the issue.");
        otherIssue.focus();
        return;
    }
    openConfirm(
        "💬 Confirm SMS",
        "Are you sure you want to send an SMS to the vehicle owner?",
        "sms"
    );

}

/* ==========================================
   DIRECT CALL
========================================== */

function startCall() {

    if (!mobile) {

        alert("Owner mobile number not found.");
        return;

    }

    window.location.href = `tel:${mobile}`;

}

/* ==========================================
   START SMS
========================================== */

function startSMS() {

    if (!mobile) {

        alert("Owner mobile number not found.");
        return;

    }

    let issueText = selectedIssue;

    if (selectedIssue === "Other Issue") {

        issueText = otherIssue.value.trim();

    }

    function openSMS(lat, lon) {

        const location =

            (lat && lon)

            ? `https://maps.google.com/?q=${lat},${lon}`

            : "Location Permission Denied";

        const message =

`🚨 VEHICLE ALERT

👤 Owner : ${owner}

🚘 Vehicle : ${car}

🚗 Number : ${number}

⚠️ Issue : ${issueText}

📍 Sender Location
${location}

🕒 ${new Date().toLocaleString()}

🌐 Vehicle Page
${window.location.href}

━━━━━━━━━━━━━━━━━━
Sent via Vehicle Alert`;

        window.location.href =
            `sms:${mobile}?body=${encodeURIComponent(message)}`;

    }

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            position => {

                openSMS(
                    position.coords.latitude,
                    position.coords.longitude
                );

            },

            () => {

                openSMS(null, null);

            },

            {

                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0

            }

        );

    }

    else {

        openSMS(null, null);

    }

}
/* ==========================================
   PART 4 / 4
   SUCCESS + RESET
========================================== */

/* ==========================================
   SUCCESS POPUP
========================================== */

function showSuccess() {

    success.classList.add("show");

    sendBtn.innerHTML = "✅ Alert Sent";
    sendBtn.disabled = true;

    setTimeout(() => {

        success.classList.remove("show");

        resetForm();

    }, 3000);

}

/* ==========================================
   RESET FORM
========================================== */

function resetForm() {

    // Reset Selected Issue
    selectedIssue = "";
    pendingAction = "";

    // Reset Issue Buttons
    document.querySelectorAll(".opt").forEach(btn => {

        btn.classList.remove("active");

    });

    // Reset Other Issue
    if (otherIssue) {

        otherIssue.value = "";
        otherIssue.style.display = "none";

    }

    // Reset Counter
    if (charCount) {

        charCount.textContent = "0 / 200";

    }

    // Reset Send Button
    sendBtn.disabled = true;
    sendBtn.classList.remove("active");
    sendBtn.innerHTML = "🚨 Send Alert";

}

/* ==========================================
   CLOSE POPUPS ON OUTSIDE CLICK
========================================== */

window.addEventListener("click", function (e) {

    if (e.target === confirmPopup) {

        closeConfirm();

    }

});

/* ==========================================
   ESC KEY SUPPORT
========================================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeConfirm();

    }

});

/* ==========================================
   PREVENT DOUBLE CLICK
========================================== */

sendBtn.addEventListener("dblclick", function (e) {

    e.preventDefault();

});

/* ==========================================
   END OF SCRIPT
========================================== */

console.log(
    "%cVehicle Alert v4.0 Loaded Successfully",
    "color:#2563eb;font-size:15px;font-weight:bold;"
);
