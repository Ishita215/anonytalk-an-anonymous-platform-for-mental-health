function sendMessage() {
    const userInput = document.getElementById("userInput").value.toLowerCase().trim();
    const messages = document.getElementById("messages");
    
    if (!userInput) return;
    
    const userMessage = `<p><strong>You:</strong> ${userInput}</p>`;
    messages.innerHTML += userMessage;

    const response = chatbotResponses[userInput] || "I'm here to listen. Could you try rephrasing your question or tell me more about how you're feeling?";
    const botMessage = `<p><strong>Bot:</strong> ${response}</p>`;
    messages.innerHTML += botMessage;

    document.getElementById("userInput").value = "";
    messages.scrollTop = messages.scrollHeight;
}
