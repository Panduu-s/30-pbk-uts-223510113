<template>
  <div class="container">
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="active">My To-do List</router-link>
        <router-link to="/posts">Postingan</router-link>
        <router-link to="/Albums">Album</router-link>
      </nav>
    </header>
    <div class="todo-app">
      <h2>My To-Do List</h2>
      <div class="row">
        <input
          type="text"
          v-model="newTask"
          placeholder="Tulis Yang Ingin Anda Kerjakan!"
        />
        <button @click="addTask">Tambahkan</button>
      </div>
      <div class="filters">
        <button @click="toggleCompletedVisibility" class="button-74">
          {{
            hideCompleted
              ? "Tampilkan Yang Selesai"
              : "Sembunyikan Yang Selesai"
          }}
        </button>
      </div>
      <ul style="font-family: Helvetica; text-align: left">
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          :class="{ checked: task.checked }"
          @click="toggleTask(task)"
        >
          <input
            v-if="task.editing"
            type="text"
            v-model="task.text"
            @blur="task.editing = false"
            @keyup.enter="task.editing = false"
            style="
              font-size: 17px;
              padding: 12px 8px 12px 50px;
              background-color: #f9f9f9;
              border-radius: 5px;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            "
          />
          <span v-else>{{ task.text }}</span>
          <span @click.stop="removeTask(task)" style="float: right">×</span>
          <span @click.stop="editTask(task)" style="float: right">✎</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const newTask = ref("");
const tasks = ref([]);
const hideCompleted = ref(false);

const filteredTasks = computed(() => {
  return hideCompleted.value
    ? tasks.value.filter((task) => !task.checked)
    : tasks.value;
});

const addTask = () => {
  if (newTask.value.trim() === "") {
    alert("Harus ada isi!");
  } else {
    tasks.value.unshift({
      id: Date.now(),
      text: newTask.value,
      checked: false,
      editing: false,
    });
    newTask.value = "";
    saveData();
  }
};

const toggleTask = (task) => {
  task.checked = !task.checked;
  saveData();
};

const removeTask = (task) => {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
    saveData();
  }
};

const editTask = (task) => {
  task.editing = true;
};

const toggleCompletedVisibility = () => {
  hideCompleted.value = !hideCompleted.value;
};

const saveData = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const loadData = () => {
  const savedTasks = localStorage.getItem("tasks");
  tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
};

loadData();
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
    h2 ul li {
        color: #000;
        /* Mengatur warna teks jadi hitam pada dark mode */
    }
}

section {
    min-height: 100vh;
    padding: 10rem 9% 2rem;
    /* Adjust padding for different screen sizes */
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

.container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
    padding: 10px;
    margin-top: -10px;
    margin-left: -10px;
    margin-bottom: -10px;
}


.todo-app {
    width: 100%;
    max-width: 540px;
    background: #fff;
    margin: 100px auto 20px;
    padding: 40px 30px 70px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.todo-app h2 {
    color: rgb(49, 58, 136);
    position: center;
    left: 18vh;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #edeef0;
    border-radius: 30px;
    padding-left: 20px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 15px;
    font-weight: 14px;
}

.row button {
    border: none;
    outline: none;
    padding: 16px 20px;
    background: #3d3fc1;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border-radius: 40px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.row button:hover {
    background: #2c2d8e;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

ul li {
    list-style: none;
    font-size: 17px;
    padding: 15px 8px 25px 50px;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #f9f9f9;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

ul li:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

ul li::before {
    content: '';
    position: absolute;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    background-image: url(../assets/unchecked.png);
    background-size: cover;
    background-position: center;
    top: 22px;
    left: 10px;
}

ul li.checked {
    color: #555;
    text-decoration: line-through;
    background-color: #e0e0e0;
}

ul li.checked::before {
    background-image: url(../assets/checked.png);
}

ul li span {
    position: left;
    left: 0;
    top: 5px;
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: #555;
    line-height: 40px;
    text-align: left;
    border-radius: 50%;
    transition: all 0.3s ease;
}

ul li span:hover {
    background: #edeef0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.filters {
    position: relative;
    padding-top: 3vh;
}

.filters button {
    margin-left: 20px;
}


.button-74 {
    position: center;
    left: 7rem;
    background-color: #ffffff;
    border: none;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
    color: #000000;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    font-size: 18px;
    padding: 0 18px;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    transition: all 0.3s ease;
}


.button-74:hover {
    background-color: #e9e9e9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.button-74:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
}

@media (min-width: 768px) {
    .button-74 {
        min-width: 120px;
        padding: 0 25px;
    }
}
</style>
