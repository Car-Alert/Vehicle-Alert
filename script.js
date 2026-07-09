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

    if(ownerEl) ownerEl.textContent = owner;

    if(carEl) carEl.textContent = car;

    if(plateEl) plateEl.textContent = number;


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

const sendBtn = document.getElementById("sendBtn");

sendBtn.disabled = true;
sendBtn.innerHTML = "⏳ Sending Alert...";


    if(selectedIssue===""){

        alert("Please select an issue.");

        return;

    }

 const confirmAlert = confirm(
`Send this alert?

Issue: ${selectedIssue}

Do you want to continue?`
);

if (!confirmAlert) {
    return;
}

    // Telegram

    const BOT_TOKEN =
    "8078122204:AAHa6OmL2Qg_pXTFtZXuUQzPkg1QC3nAs_g";

    const CHAT_ID =
    "2105892713";

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


━━━━━━━━━━━━━━━━━━

📢 _Sent via Vehicle Alert System_

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

    const popup = document.getElementById("success");

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

        const sendBtn = document.getElementById("sendBtn");

        sendBtn.innerHTML = "🚨 Send Alert";
        sendBtn.disabled = true;
        sendBtn.classList.remove("active");

        location.reload();

    },3000);

}