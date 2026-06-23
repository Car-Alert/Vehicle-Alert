// ====== CONFIG (yahan values baad mein replace karna hai) ======
const botToken = "YOUR_BOT_TOKEN";
const chatId = "YOUR_CHAT_ID";

// Vehicle from URL
const params = new URLSearchParams(window.location.search);
const vehicle = params.get("v") || "Unknown Vehicle";

document.getElementById("vehicleText").innerText =
"Vehicle: " + vehicle;

// Send message function
function sendAlert(issue) {

  const message =
`🚨 Vehicle Alert
Vehicle: ${vehicle}
Issue: ${issue}
Time: ${new Date().toLocaleString()}`;

  const url =
`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(res => {
      alert("Alert Sent Successfully!");
    })
    .catch(err => {
      alert("Error sending alert");
    });
}