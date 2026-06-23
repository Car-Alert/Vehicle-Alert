const botToken = "8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw";
const chatId = "2105892713";

const params = new URLSearchParams(window.location.search);
const vehicle = params.get("v") || "Grand Vitara";

document.getElementById("vehicleText").innerText =
  "Vehicle: " + vehicle;

function sendAlert(issue) {

  var message =
    "🚨 Vehicle Alert\n" +
    "Vehicle: " + vehicle + "\n" +
    "Issue: " + issue + "\n" +
    "Time: " + new Date().toLocaleString();

  fetch("https://api.telegram.org/bot" + 8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw + "/sendMessage"), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      "chat_id=" + encodeURIComponent(2105892713) +
      "&text=" + encodeURIComponent(hiiii)
  }
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    if (data.ok) {
      alert("Alert Sent Successfully");
    } else {
      alert("Telegram Error: " + data.description);
    }

  })
  .catch(function(error) {
    alert("Network Error");
    console.log(error);
  });

}
   

