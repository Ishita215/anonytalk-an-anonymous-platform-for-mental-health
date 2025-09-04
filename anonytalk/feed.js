// Dummy starter posts
let starterPosts = [
  {
    title: "Healing after heartbreak",
    emoji: "🌱",
    category: "Breakup",
    content: "I thought I'd never heal, but here I am slowly rebuilding.",
    timestamp: "2025-06-21 10:15"
  },
  {
    title: "Feeling lost",
    emoji: "😢",
    category: "Overthinking",
    content: "Overthinking everything has drained me emotionally.",
    timestamp: "2025-06-20 18:40"
  }
];

let userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

const feed = document.getElementById("feed");
const allPosts = [...starterPosts, ...userPosts];

function renderFeed(posts) {
    
  posts.reverse().forEach(post => {
    const el = document.createElement("div");
    el.classList.add("post");
    el.innerHTML = `
      <h3>${post.emoji} ${post.title}</h3>
      <p><strong>Category:</strong> ${post.category}</p>
      <p>${post.content}</p>
      <small>${post.timestamp}</small>
    `;
    feed.appendChild(el);
  });
}

renderFeed(allPosts);
