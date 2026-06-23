const botToken = "8078122204:AAEiHYxdsX92FJx-dIzXbl2FLz8gucB9JPc";
const chatId = "2105892713";

const params = new URLSearchParams(window.location.search);
const vehicle = params.get("v") || "Grand Vitara";

document.getElementById("vehicleText").innerText =
  "Vehicle: " + vehicle;

function sendAlert(issue) {
  alert(issue);

  var message =
    "🚨 Vehicle Alert\n" +
    "Vehicle: " + vehicle + "\n" +
    "Issue: " + issue + "\n" +
    "Time: " + new Date().toLocaleString();

 fetch("https://api.telegram.org/bot8078122204:AAEiHYxdsX92FJx-dIzXbl2FLz8gucB9JPc/sendMessage", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "chat_id=" + encodeURIComponent(2105892713) + "&text=" + encodeURIComponent(message)
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
   

