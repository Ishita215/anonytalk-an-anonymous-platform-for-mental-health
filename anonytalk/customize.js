document.getElementById("saveBtn").addEventListener("click", function() {
    localStorage.setItem("username", document.getElementById("username").value);
    localStorage.setItem("status", document.getElementById("status").value);
    localStorage.setItem("fontSize", document.getElementById("fontSize").value);
    localStorage.setItem("animations", document.getElementById("animations").checked);
    localStorage.setItem("messageFormatting", document.getElementById("message-formatting").checked);
    alert("Settings Saved!");
});

document.getElementById("backBtn").addEventListener("click", function() {
    window.location.href = "index.html";
});

window.onload = function() {
    document.getElementById("username").value = localStorage.getItem("username") || "";
    document.getElementById("status").value = localStorage.getItem("status") || "";
    document.getElementById("fontSize").value = localStorage.getItem("fontSize") || "medium";
    document.getElementById("animations").checked = localStorage.getItem("animations") === "true";
    document.getElementById("message-formatting").checked = localStorage.getItem("messageFormatting") === "true";

    createBubbles();
};

// Bubbles Animation Function
function createBubbles() {
    const container = document.querySelector(".bubbles-container");
    for (let i = 0; i < 20; i++) {
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        let size = Math.random() * 50 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(bubble);
    }
}
