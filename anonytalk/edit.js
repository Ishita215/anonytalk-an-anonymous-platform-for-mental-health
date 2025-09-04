let selectedAvatar = "https://api.dicebear.com/9.x/adventurer/svg?seed=Kingston";

window.onload = function () {
  const profile = JSON.parse(localStorage.getItem("anonProfile"));
  if (profile) {
    selectedAvatar = profile.avatar || selectedAvatar;
    document.getElementById("selectedAvatar").src = selectedAvatar;
    document.getElementById("nickname").value = profile.nickname || "";
    document.getElementById("mood").value = profile.mood || "";
    document.getElementById("song").value = profile.song || "";
    document.getElementById("funfact").value = profile.funfact || "";
    document.getElementById("theme").value = profile.theme || "default";
    document.getElementById("ghostMode").checked = profile.ghost || false;
    updateNamePreview();
    changeTheme(profile.theme || "default");
  }
};

function selectAvatar(img) {
  document.querySelectorAll(".avatars img").forEach(i => i.classList.remove("selected"));
  img.classList.add("selected");
  selectedAvatar = img.src;
  document.getElementById("selectedAvatar").src = selectedAvatar;
}

function updateNamePreview() {
  const name = document.getElementById("nickname").value || "Your Nickname";
  document.getElementById("previewName").innerText = name;
}

function changeTheme(theme) {
  document.body.className = theme === "default" ? "" : theme;
}

function saveProfile() {
  const profile = {
    avatar: selectedAvatar,
    nickname: document.getElementById("nickname").value || "Nameless One",
    mood: document.getElementById("mood").value || "🫥 Undefined",
    song: document.getElementById("song").value || "Nothing playing",
    funfact: document.getElementById("funfact").value || "A mystery...",
    ghost: document.getElementById("ghostMode").checked,
    theme: document.getElementById("theme").value || "default",
  };

  localStorage.setItem("anonProfile", JSON.stringify(profile));
  window.location.href = "profiles.html";
}
