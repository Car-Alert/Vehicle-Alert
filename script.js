const botToken = "8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw";
const chatId = "2105892713";

const params = new URLSearchParams(window.location.search);
const vehicle = params.get("v") || "Unknown Vehicle";

document.getElementById("vehicleText").innerText =
  "Vehicle: " + vehicle;

function sendAlert(issue) {

  const message =
`🚨 Vehicle Alert
Vehicle: {vehicle}
Issue: {issue}
Time: {new Date().toLocaleString()};

  fetch(
    "https://api.telegram.org/bot" +
  (8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw)+
    "/sendMessage",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "chat_id=" +
        (2105892713) +
        "&text=" +
        (message)
    }
  )
  .then(response => response.json())
  .then(data => {

    if (data.ok) {
      alert("Alert Sent Successfully");
    } else {
      alert("Telegram Error: " + data.description);
    }

  })
  .catch(error => {
    alert("Network Error");
    console.log(error);
  });

}
