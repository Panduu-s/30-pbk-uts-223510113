<template>
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="active">My To-do List</router-link>
        <router-link to="/posts">Postingan</router-link>
        <router-link to="/Albums">Album</router-link>
      </nav>
    </header>
    <q-page class="q-pa-md">
      <q-spinner v-if="isLoading" size="lg" color="primary" />
      <q-card v-else-if="photo" class="q-pa-md">
        <q-img :src="photo.url" class="q-mb-md" :alt="photo.title" />
        <div>{{ photo.title }}</div>
        <q-btn @click="goBack" color="primary" class="q-mt-md"
          >Kembali ke Album</q-btn
        >
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const photo = ref(null);
  const isLoading = ref(false);
  
  const fetchPhoto = async (id) => {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      photo.value = await response.json();
    } catch (error) {
      console.error("Error fetching photo:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const goBack = () => {
    router.push("/albums");
  };
  
  onMounted(() => {
    fetchPhoto(route.params.photoId);
  });
  </script>
  
  <style scoped>
  .q-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  }
/* Navbar styles */

.navbar {
    display: flex;
    justify-content: center;
    /* Center horizontally */
    align-items: center;
    /* Center vertically */
    width: 100%;
    /* Make sure the navbar spans the full width */
}

.navbar a {
    font-size: 1rem;
    color: white;
    margin: 0 3rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    /* Add transition for smooth effect */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    /* Add box-shadow */
}

.navbar a:hover {
    transform: translateY(-2px);
    /* Move up on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    /* Increase box-shadow on hover */
}


/* Header styles */
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
  
  .q-img {
    max-width: 100%;
    max-height: 80vh;
  }
  </style>