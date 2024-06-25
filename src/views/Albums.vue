<template>
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="active">My To-do List</router-link>
        <router-link to="/posts">Postingan</router-link>
        <router-link to="/Albums">Album</router-link>
      </nav>
    </header>
    <q-page class="q-pa-xl">
      <q-spinner v-if="isLoading" size="lg" color="primary" />
      <div v-else class="photo-grid">
        <q-img
          v-for="photo in photos"
          :key="photo.id"
          :src="photo.thumbnailUrl"
          :alt="photo.title"
          class="cursor-pointer"
          @click="selectPhoto(photo.id)"
          style="width: 150px; height: 150px;"
        ></q-img>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const photos = ref([]);
  const isLoading = ref(false);
  
  const fetchPhotos = async (albumId = 1) => {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      ); // Directly fetch filtered data
      const data = await response.json();
      photos.value = data.map((photo) => ({
        id: photo.id,
        thumbnailUrl: photo.thumbnailUrl,
        url: photo.url,
        title: photo.title,
      }));
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const selectPhoto = (photoId) => {
    router.push({ path: `/albums/${photoId}` });
  };
  
  onMounted(() => {
    fetchPhotos();
  });
  </script>
  
  <style scoped>
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
  .cursor-pointer {
    cursor: pointer;
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }

  .q-pa-xl {
    background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
}
  </style>
  