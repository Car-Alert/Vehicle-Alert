const botToken = "8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw";
const chatId = "8078122204";

const params = new URLSearchParams(window.location.search);
const vehicle = params.get("v") || "Grand Vitara";

document.getElementById("vehicleText").innerText =
  "Vehicle: " + vehicle;

function sendAlert(issue) {
  alert(issue);

  const message =
    "🚨 Vehicle Alert\n" +
    "Vehicle: " + vehicle + "\n" +
    "Issue: " + issue + "\n" +
    "Time: " + new Date().toLocaleString();

 fetch("https://api.telegram.org/bot8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw/sendMessage", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "chat_id=" + encodeURIComponent(8078122204) + "&text=" + encodeURIComponent(message)
})
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
   

