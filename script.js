// ====== CONFIG (yahan values baad mein replace karna hai) ======
const botToken = "8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw";
const chatId = "2105892713";

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
`https://api.telegram.org/bot${8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw}/sendMessage?chat_id=${2105892713}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(res => {
      alert("Alert Sent Successfully!");
    })
    .catch(err => {
      alert("Error sending alert");
    });
}
