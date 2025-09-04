function createLines() {
    const container = document.querySelector(".glowing-lines");
    for (let i = 0; i < 30; i++) {
        let line = document.createElement("span");
        line.style.left = Math.random() * 100 + "%";
        line.style.animationDuration = Math.random() * 5 + 3 + "s";
        container.appendChild(line);
    }
}

document.addEventListener("DOMContentLoaded", createLines);
