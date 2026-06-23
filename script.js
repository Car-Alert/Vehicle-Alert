const botToken ="8078122204:AAEiHYxdsX92FJx-dIzXbl2FLz8gucB9JPc";
const chatId = "YOUR_CHAT_ID";

let selectedIssue = "";

// show vehicle
const params = new URLSearchParams(window.location.search);
const vehicle = params.get("v") || "Unknown";

document.getElementById("vehicleText").innerText =
"Vehicle: " + vehicle;

// select issue
function selectIssue(btn, issue) {

  document.querySelectorAll(".opt").forEach(b => {
    b.classList.remove("active");
  });

  btn.classList.add("active");

  selectedIssue = issue;

  const sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = false;
  sendBtn.classList.add("active");
}

// send message
function sendAlert() {

  if (!selectedIssue) return;

  const message =
`🚨 Vehicle Alert
Vehicle: ${vehicle}
Issue: ${selectedIssue}
Time: ${new Date().toLocaleString()}`;

  fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      "chat_id=" + encodeURIComponent(chatId) +
      "&text=" + encodeURIComponent(message)
  })
  .then(res => res.json())
  .then(data => {

    if (data.ok) {

      showSuccess();

      // reset after send
      selectedIssue = "";
      document.querySelectorAll(".opt").forEach(b => {
        b.classList.remove("active");
      });

      const sendBtn = document.getElementById("sendBtn");
      sendBtn.disabled = true;
      sendBtn.classList.remove("active");

    } else {
      alert("Error: " + data.description);
    }

  })
  .catch(err => {
    alert("Network Error");
    console.log(err);
  });
}

// success screen
function showSuccess() {
  const box = document.getElementById("success");
  box.style.display = "flex";

  setTimeout(() => {
    box.style.display = "none";
  }, 2500);
}