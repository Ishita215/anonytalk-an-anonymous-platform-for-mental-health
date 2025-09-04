    document.addEventListener("DOMContentLoaded", function() {
        createBubbles();
    });

    function selectAvatar(avatarId) {
        localStorage.setItem("selectedAvatar", avatarId);
        alert("Avatar Selected! You can now save your selection.");
    }

    function saveAvatar() {
        const selectedAvatar = localStorage.getItem("selectedAvatar");
        if (selectedAvatar) {
            alert(`Your avatar has been saved successfully!`);
            window.location.href = "profile.html"; // This path is correct
        } else {
            alert("Please select an avatar before saving.");
        }
    }

    function createBubbles() {
        const bubbleContainer = document.createElement("div");
        bubbleContainer.classList.add("bubbles");
        document.body.appendChild(bubbleContainer);

        for (let i = 0; i < 5; i++) {
            let bubble = document.createElement("span");
            bubbleContainer.appendChild(bubble);
        }
    }
    
