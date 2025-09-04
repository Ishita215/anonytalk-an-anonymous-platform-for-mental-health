document.addEventListener("DOMContentLoaded", function () {
    let savedUsername = localStorage.getItem("username") || "Anonymous";
    let savedProfilePic = localStorage.getItem("profilePic") || "😊";
    let savedStatus = localStorage.getItem("status") || "Set your status...";

    document.getElementById("username").textContent = savedUsername;
    document.getElementById("profilePic").textContent = savedProfilePic;
    document.getElementById("status").textContent = savedStatus;
});

function redirectToCustomization() {
    window.location.href = "customize.html";
}
