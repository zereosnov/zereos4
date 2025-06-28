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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ضع_مفتاحك_هنا"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userText }]
      })
    });

    const data = await response.json();
    const botReply = data.choices?.[0]?.message?.content || "لم أفهم سؤالك، يا زيريوس.";
    chatBox.innerHTML += `<div><b>زيريوس الرابع:</b> ${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div><b>زيريوس الرابع:</b> حصل خطأ في الاتصال بالذكاء الاصطناعي.</div>`;
  }
}
