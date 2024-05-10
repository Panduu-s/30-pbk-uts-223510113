<template>
  <div class="container">
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="active">My To-do List</router-link>
        <router-link to="/posts">Postingan</router-link>
      </nav>
    </header>
    <div class="posts" id="posts">
      <h1>Postingan user</h1>
      <h2>{{ selectedUserName }}</h2>
      <select v-model="selectedUser" class="selectModel" @change="fetchPosts">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>

      <div v-if="isLoading" class="loading-animation">
        <div class="loading-spinner"></div>
        <span class="loading-message">Memuat postingan ...</span>
      </div>

      <div v-if="!isLoading" class="tweet-container">
        <div v-for="post in posts" :key="post.id" class="tweet">
          <div class="tweet-header">
            <img src="https://via.placeholder.com/50" alt="User Avatar" class="avatar">
            <div class="user-info">
              <h3>{{ post.title }}</h3>
              <span class="username">@{{ selectedUserName }}</span>
            </div>
          </div>
          <div class="tweet-body">
            <p>{{ post.body }}</p>
          </div>
          <div class="tweet-footer">
            <button class="tweet-action">
              <i class="fa fa-comment"></i>
              <span>Balasan</span>
            </button>
            <button class="tweet-action">
              <i class="fa fa-retweet"></i>
              <span>Retweet</span>
            </button>
            <button class="tweet-action">
              <i class="fa fa-heart"></i>
              <span>Suka</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isLoading = ref(false);
const selectedUser = ref(null);
const selectedUserName = ref('');
const users = ref([]);
const posts = ref([]);

const fetchUser = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchPosts = async () => {
  if (!selectedUser.value) return;
  isLoading.value = true;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUser();
});

watch(selectedUser, () => {
  posts.value = [];
  fetchPosts();
  const selectedUserObject = users.value.find(user => user.id === selectedUser.value);
  selectedUserName.value = selectedUserObject ? selectedUserObject.name : '';
}, { immediate: true }); 
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  .todo-app h2 ul li {
    color: #000;
  }
}

section {
  min-height: 100vh;
  padding: 10rem 9% 2rem;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.navbar a {
  font-size: 1rem;
  color: white;
  margin: 0 3rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.navbar a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0%;
  z-index: 1000;
  background: linear-gradient(90deg, rgb(109, 57, 129) 7%, hsla(275, 19%, 88%, 1) 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  padding: 10px;
  margin-top: -10px;
  margin-left: -10px;
  margin-bottom: -10px;
}

.posts {
  width: 100%;
  max-width: 1200px;
  background: #fff;
  margin: 20vh auto;
  padding: 40px 30px 70px;
  border-radius: 10px;
}

.loading-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-message {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.5rem;
  animation: loading 1s infinite;
}

@keyframes loading {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.selectModel {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
}

.selectModel:focus {
  outline: none;
  border-color: #4CAF50;
}

.tweet-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tweet {
  border: 1px solid #e6ecf0;
  border-radius: 5px;
  padding: 10px;
}

.tweet-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info h3 {
  margin: 0;
  font-size: 16px;
}

.username {
  color: #657786;
  font-size: 14px;
}

.tweet-body p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.tweet-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.tweet-action {
  background-color: transparent;
  border: none;
  color: #657786;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.tweet-action:hover {
  color: #1da1f2;
}

.fa {
  font-size: 16px;
}
</style>
