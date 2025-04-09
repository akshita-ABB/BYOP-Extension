document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('chat-input');
  const log = document.getElementById('chat-log');

  appendMessage("Hello! I'm your Maintenance Assistant. Ask me anything.", 'bot');

  input.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter' && input.value.trim()) {
      const msg = input.value.trim();
      appendMessage(msg, 'user');
      input.value = '';

      try {
        const response = await fetch("http://localhost:8000/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: msg })
        });
        const result = await response.json();
        appendMessage(result.answer || 'No response', 'bot');
      } catch (err) {
        appendMessage("Error: Could not reach backend.", 'bot');
      }
    }
  });

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', sender);

    if (text.length > 300) {
      const shortText = text.slice(0, 300) + "...";
      const fullText = text;

      const span = document.createElement('span');
      span.textContent = shortText;

      const toggle = document.createElement('a');
      toggle.href = "#";
      toggle.textContent = " Show more";
      toggle.style.marginLeft = "6px";
      toggle.style.fontSize = "0.85em";
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (span.textContent === shortText) {
          span.textContent = fullText;
          toggle.textContent = " Show less";
        } else {
          span.textContent = shortText;
          toggle.textContent = " Show more";
        }
      });

      msgDiv.appendChild(span);
      msgDiv.appendChild(toggle);
    } else {
      msgDiv.textContent = text;
    }

    log.appendChild(msgDiv);
    log.scrollTop = log.scrollHeight;
  }

  document.getElementById('close-chatbot')?.addEventListener('click', () => {
    window.parent.postMessage({ type: "CLOSE_CHATBOT_IFRAME" }, "*");
  });
});
