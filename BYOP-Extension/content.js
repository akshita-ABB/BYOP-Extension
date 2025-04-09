(() => {
  if (window.__chatbotInjected) return;
  window.__chatbotInjected = true;

  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('popup.html');
  iframe.id = 'chatbot-iframe';
  Object.assign(iframe.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '360px',
    height: '500px',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    zIndex: '9999',
    background: 'white'
  });

  document.body.appendChild(iframe);

  // Listen for close command from iframe
  window.addEventListener("message", (event) => {
    if (event.data?.type === "CLOSE_CHATBOT_IFRAME") {
      document.getElementById("chatbot-iframe")?.remove();
      window.__chatbotInjected = false;
    }
  });
})();
