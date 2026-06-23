function sendAlert(issue) {

  const botToken = "8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw";
  const chatId = "2105892713";

  const vehicle = new URLSearchParams(window.location.search).get("v") || "Unknown";

  const message =
`🚨 Vehicle Alert
Vehicle: ${vehicle}
Issue: ${issue}
Time: ${new Date().toLocaleString()}`;

// IMPORTANT: form-data style request (works everywhere)
fetch(`https://api.telegram.org/bot${8078122204:AAGulJMo5Cb71XvWUdm7rV3d0bElEuXY3kw}/sendMessage`, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `chat_id=${2105892713}&text=${encodeURIComponent(message)}`
})
.then(res => res.json())
.then(data => {
  console.log(data);

  if (data.ok) {
    alert("Alert Sent Successfully 👍");
  } else {
    alert("Telegram Error: " + data.description);
  }
})
.catch(err => {
  console.log(err);
  alert("Network Error");
});
}
