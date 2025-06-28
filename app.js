async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value.trim();
  if (!userText) return;

  chatBox.innerHTML += `<div><b>أنت:</b> ${userText}</div>`;
  input.value = "";

  chatBox.innerHTML += `<div><i>زيريوس الرابع يفكر...</i></div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    const botReply = data.reply || "زيريوس الرابع لا يرد الآن.";
    chatBox.innerHTML += `<div><b>زيريوس الرابع:</b> ${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div><b>زيريوس الرابع:</b> حصل خطأ في الاتصال بالخادم.</div>`;
  }
}
