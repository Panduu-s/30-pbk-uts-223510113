<template>
  <div class="container">
    <div class="todo-app">
      <h2>My To-Do List</h2>
      <div class="row">
        <input type="text" v-model="newTask" placeholder="Tulis Yang Ingin Anda Kerjakan!">
        <button @click="addTask">Tambahkan</button>
      </div>
      <div class="filters">
        <button @click="hideCompleted = !hideCompleted" class="button-74">
          {{ hideCompleted ? 'Tampilkan Yang Selesai' : 'Sembunyikan Yang Selesai' }}
        </button>
      </div>
      <ul>
        <li v-for="(task, index) in filteredTodos" :key="task.id" :class="{ checked: task.checked }" @click="toggleTask(task)">
          {{ task.text }}
          <span @click.stop="removeTask(task)">&#xd7;</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const newTask = ref('');
const tasks = ref([]);
const hideCompleted = ref(false);

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? tasks.value.filter((task) => !task.checked)
    : tasks.value;
});

function addTask() {
  if (newTask.value.trim() === '') {
    alert("Harus ada isi!");
  } else {
    tasks.value.unshift({ id: Date.now(), text: newTask.value, checked: false });
    newTask.value = '';
    saveData();
  }
}

function toggleTask(task) {
  task.checked = !task.checked; 
  saveData();
}

function removeTask(task) {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
    saveData();
  }
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function loadData() {
  const savedTasks = localStorage.getItem("tasks");
  tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
}

loadData();
</script>


<style scoped>@media (prefers-color-scheme: dark) {
  h2 ul li {
    color: #000; /* Mengatur warna teks jadi hitam pada dark mode */
  }
}
.container {
  width: 100%;
  min-height: 100vh;
  background: -webkit-linear-gradient(90deg, hsl(342, 47%, 52%) 0%, hsla(250, 100%, 5%) 100%);
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#E4E7E4", endColorstr="#0A1647", GradientType=1 );
  padding: 10px;
  margin-top: -10px;
  margin-left: -10px;
  margin-bottom: -10px;
}

.todo-app {
  width: 200%;
  max-width: 540px;
  background: #fff;
  margin: 100px auto 20px;
  padding: 40px 30px 70px;
  border-radius: 10px;
}

.todo-app h2{
  color: rgb(67, 81, 27);
  position: relative;
  left: 18vh;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #edeef0;
  border-radius: 30px;
  padding-left: 20px;
}

input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 10px;
  font-weight: 14px;
}

.row button {
  border: none;
  outline: none;
  padding: 16px 50px;
  background: #3d3fc1;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 40px;
}

ul li {
  list-style: none;
  font-size: 17px;
  padding: 12px 8px 12px 50px;
  user-select: none;
  cursor: pointer;
  position: relative;
}

ul li::before {
  content: '';
  position: absolute;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-image: url(assets/unchecked.png);
  background-size: cover;
  background-position: center;
  top: 12px;
  left: 8px;
}

ul li.checked {
  color: #555;
  text-decoration: line-through;
}

ul li.checked::before {
  background-image: url(assets/checked.png);
}

ul li span {
  position: absolute;
  right: 0;
  top: 5px;
  width: 40px;
  height: 40px;
  font-size: 22px;
  color: #555;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
}

ul li span:hover {
  background: #edeef0;
}

.filters{
  position: relative;
  padding-top: 3vh;
}

.filters button{
  margin-left: 20px;
}


.button-74 {
  position: relative;
  left: 7rem;
  background-color: #ffffff;
  border: 2px solid #444444;
  border-radius: 30px;
  box-shadow: #333333 4px 4px 0 0;
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
}

.button-74:hover {
  background-color: #e9e9e9;
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
