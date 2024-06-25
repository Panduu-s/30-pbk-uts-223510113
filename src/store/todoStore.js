import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref([
    { id: 0, text: 'Learn HTML', checked: true, editing: false },
    { id: 1, text: 'Learn JavaScript', checked: true, editing: false },
    { id: 2, text: 'Learn Vue', checked: false, editing: false }
  ])
  let id = 3

  const newTask = ref('')
  const hideCompleted = ref(false)

  const filteredTodos = computed(() => {
    return hideCompleted.value
      ? tasks.value.filter((task) => !task.checked)
      : tasks.value
  })

  function addTask() {
    if (newTask.value.trim() === '') {
      alert("Agenda tidak boleh kosong!")
    } else {
      tasks.value.unshift({ id: id++, text: newTask.value, checked: false, editing: false })
      newTask.value = ''
      saveData()
    }
  }

  function toggleTask(task) {
    if (!task.editing) {
      task.checked = !task.checked
      saveData()
    }
  }

  function removeTask(task) {
    tasks.value = tasks.value.filter((t) => t !== task)
    saveData()
  }

  function editTask(task) {
    task.editing = true
    task.checked = false
  }

  function updateTask(task) {
    if (task.text.trim() === '') {
      alert("Harus ada isi!")
    } else {
      task.editing = false
      saveData()
    }
  }

  function cancelEdit(task) {
    task.editing = false
  }

  function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks.value))
  }

  function loadData() {
    const savedTasks = localStorage.getItem("tasks")
    tasks.value = savedTasks ? JSON.parse(savedTasks) : []
  }

  loadData()

  return {
    tasks,
    newTask,
    hideCompleted,
    filteredTodos,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    updateTask,
    cancelEdit,
  }
})
