import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const isLoading = ref(false)
  const selectedUser = ref(null)
  const selectedUserName = ref('')
  const users = ref([])
  const posts = ref([])

  const fetchUser = async () => {
    try {
      isLoading.value = true
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      users.value = data
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchPosts = async () => {
    if (!selectedUser.value) return
    isLoading.value = true
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
      const data = await response.json()
      posts.value = data
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    selectedUser,
    selectedUserName,
    users,
    posts,
    fetchUser,
    fetchPosts
  }
})
