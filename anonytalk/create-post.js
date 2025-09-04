const categorySelect = document.getElementById("category");
    const emojiSelect    = document.getElementById("emoji");
    const emojiPreview   = document.getElementById("emojiPreview");
    const particlesWrap  = document.getElementById("particles");

    
    const THEMES = {
      Breakup:    { bgStart: "#3E3E3E", bgEnd: "#8D5973", accent: "#F5F5F5", symbol: "💔" },
      Healing:    { bgStart: "#cde4d0", bgEnd: "#e0f7f1", accent: "#2e7d32", symbol: "🍃" },
      Motivation: { bgStart: "#ffbd63", bgEnd: "#ffd44d", accent: "#ff6f00", symbol: "✨" }
    };

    function applyTheme(cat) {
      const theme = THEMES[cat] || THEMES["Healing"];
      document.documentElement.style.setProperty("--bg-start", theme.bgStart);
      document.documentElement.style.setProperty("--bg-end",   theme.bgEnd);
      document.documentElement.style.setProperty("--accent",   theme.accent);
      spawnParticles(theme.symbol);
    }

   
    function spawnParticles(symbol) {
      
      particlesWrap.innerHTML = "";
      for (let i = 0; i < 18; i++) {
        const span = document.createElement("span");
        span.className = "particle";
        span.innerText = symbol;
        span.style.left = Math.random() * 100 + "%";
        span.style.bottom = -10 + "vh"; // start slightly below viewport
        span.style.fontSize = Math.random() * 1.2 + 1 + "rem";
        span.style.animationDuration = 8 + Math.random() * 4 + "s";
        particlesWrap.appendChild(span);
      }
    }

    
    emojiSelect.addEventListener("change", () => {
      emojiPreview.textContent = emojiSelect.value;
      emojiPreview.style.opacity = 1;
    });

    
    categorySelect.addEventListener("change", () => {
      applyTheme(categorySelect.value);
    });

    
    applyTheme("Healing");

   
    function submitPost() {
      const title     = document.getElementById("title").value.trim();
      const content   = document.getElementById("content").value.trim();
      const category  = categorySelect.value;
      const emoji     = emojiSelect.value;

      if (!title || !content || !category || !emoji) {
        alert("Please complete all fields ✨");
        return;
      }

      const post = { title, content, category, emoji, timestamp: new Date().toLocaleString() };
      const posts = JSON.parse(localStorage.getItem("userPosts") || "[]");
      posts.push(post);
      localStorage.setItem("userPosts", JSON.stringify(posts));

      
      for (let i = 0; i < 40; i++) {
        const c = document.createElement("span");
        c.className = "confetti";
       
        const angle = Math.random()*Math.PI*2;
        const radius= Math.random()*120+40;
        c.style.setProperty("--dx", Math.cos(angle)*radius+"px");
        c.style.setProperty("--dy", Math.sin(angle)*radius+"px");
        c.style.background = i % 2 ? "#fff" : "var(--accent)";
        document.body.appendChild(c);
       
        setTimeout(()=>c.remove(),700);
      }

      
      setTimeout(()=>window.location.href="feed.html", 800);
    }