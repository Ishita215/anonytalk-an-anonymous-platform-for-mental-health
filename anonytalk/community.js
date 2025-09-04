class CommunityManager {
    constructor() {
        this.initializeStorage();
        this.posts = JSON.parse(localStorage.getItem('anonytalk-posts'));
        this.init();
    }

    initializeStorage() {
        if (!localStorage.getItem('anonytalk-posts')) {
            localStorage.setItem('anonytalk-posts', JSON.stringify([{
                id: Date.now(),
                content: "Welcome to AnonyTalk!",
                timestamp: new Date().toISOString(),
                upvotes: 0,
                replies: []
            }]));
        }
    }

    init() {
        this.renderPosts();
        this.setupEventListeners();
    }

    renderPosts() {
        const container = document.getElementById('postsContainer');
        container.innerHTML = this.posts.map(post => `
            <div class="post p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-sm opacity-75">Anonymous</span>
                        <span class="text-xs opacity-50">${this.formatTime(post.timestamp)}</span>
                    </div>
                    <button class="upvote-btn text-xs px-2 py-1 rounded-full border">
                        ▲ ${post.upvotes}
                    </button>
                </div>
                <p class="post-content">${post.content}</p>
            </div>
        `).join('');
    }

    formatTime(timestamp) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(timestamp).toLocaleTimeString('en-US', options);
    }

    createPost(content) {
        const newPost = {
            id: Date.now(),
            content,
            timestamp: new Date().toISOString(),
            upvotes: 0,
            replies: []
        };
        
        this.posts.unshift(newPost);
        localStorage.setItem('anonytalk-posts', JSON.stringify(this.posts));
        this.renderPosts();
    }

    setupEventListeners() {
        document.getElementById('postButton').addEventListener('click', () => this.handlePost());
        document.getElementById('postInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handlePost();
            }
        });
    }

    handlePost() {
        const input = document.getElementById('postInput');
        const content = input.value.trim();

        if (content.length < 10) {
            this.showError("Minimum 10 characters required");
            return;
        }

        this.createPost(content);
        input.value = '';
    }

    showError(message) {
        alert(message);
    }
}

// Initialize on page load
window.addEventListener('load', () => new CommunityManager());
