/* ==========================================
   VEHICLE ALERT SYSTEM
   FINAL SCRIPT.JS
========================================== */

let selectedIssue = "";

/* ------------------------------
   Load Vehicle Details
------------------------------ */

const params = new URLSearchParams(window.location.search);

const owner =
params.get("owner") || "Unknown Owner";

const car =
params.get("car") || "Unknown Vehicle";

const number =
params.get("number") || "Unknown";

/* ------------------------------
   Page Load
------------------------------ */

window.onload = () => {

    // Vehicle Details

    const ownerEl = document.getElementById("ownerName");
    const carEl = document.getElementById("carName");
    const plateEl = document.getElementById("plateNumber");
    const qrEl = document.getElementById("qrCode");

    if(ownerEl) ownerEl.textContent = owner;

    if(carEl) carEl.textContent = car;

    if(plateEl) plateEl.textContent = number;

    // QR Code

    if(qrEl){

        qrEl.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
        encodeURIComponent(window.location.href);

    }

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

    const sendBtn =
    document.getElementById("sendBtn");

    sendBtn.disabled = false;

    sendBtn.classList.add("active");

}


/* ------------------------------
   Send Telegram Alert
------------------------------ */

function sendAlert(){

    if(selectedIssue===""){

        alert("Please select an issue.");

        return;

    }

    // Telegram

    const BOT_TOKEN =
    "YOUR_BOT_TOKEN";

    const CHAT_ID =
    "YOUR_CHAT_ID";

    // Message

    const message =

`🚨 VEHICLE ALERT

👤 Owner : ${owner}

🚘 Vehicle : ${car}

🚗 Number : ${number}

⚠️ Issue : ${selectedIssue}

🕒 Time : ${new Date().toLocaleString()}

🌐 Page :

${window.location.href}
`;

    fetch(
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
{

method:"POST",

headers:{
"Content-Type":"application/x-www-form-urlencoded"
},

body:

`chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`

}

)

.then(res=>res.json())

.then(data=>{

if(data.ok){

showSuccess();

}else{

alert("Telegram Error : " + data.description);

}

})

.catch(()=>{

alert("Network Error");

});

}


/* ------------------------------
   Success Popup
------------------------------ */

function showSuccess(){

    const popup =
    document.getElementById("success");

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

        location.reload();

    },3000);

}