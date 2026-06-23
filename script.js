let selectedIssue = "";

function selectIssue(button, issue) {

  selectedIssue = issue;

  document.querySelectorAll(".opt").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  const sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = false;
  sendBtn.classList.add("active");
}

function sendAlert(issue) {

  if (!selectedIssue) {
    alert("Please select an issue");
    return;
  }

  const botToken = "8078122204:AAEItG8nXVq6mTc6JBx3Kz2aHjctouYGQlQ";
  const chatId = "2105892713";

  const vehicle =
    new URLSearchParams(window.location.search).get("v") ||
    "GRAND VITARA";

  const message =
`🚨 Vehicle Alert

Vehicle: ${vehicle}

Issue: ${selectedIssue}

Time: ${new Date().toLocaleString()}`;

  fetch(`https://api.telegram.org/bot${8078122204:AAEItG8nXVq6mTc6JBx3Kz2aHjctouYGQlQ}/sendMessage`, {
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

      document.getElementById("success").style.display = "flex";

      setTimeout(() => {
        location.reload();
      }, 3000);

    } else {

      alert("Telegram Error: " + data.description);

    }

  })
  .catch(err => {

    console.log(err);

    alert("Network Error");

  });
}
