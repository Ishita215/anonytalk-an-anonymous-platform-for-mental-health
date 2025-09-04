window.onload = function () {
  const profile = JSON.parse(localStorage.getItem("anonProfile"));
  if (!profile) {
    window.location.href = "edit.html";
    return;
  }

  document.getElementById("finalAvatar").src = profile.avatar;
  document.getElementById("finalName").innerText = profile.nickname;
  document.getElementById("finalMood").innerText = profile.mood;
  document.getElementById("finalSong").innerText = profile.song;
  document.getElementById("finalFact").innerText = profile.funfact;
  document.getElementById("finalGhost").innerText = profile.ghost ? "Enabled 👻" : "Disabled 👀";

  document.body.className = profile.theme === "default" ? "" : profile.theme;
  if (profile.ghost) {
    document.getElementById("finalProfile").classList.add("ghost");
  }
};
