<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const task = ref({
  title: '',
  //status: 'open',
  created_at: new Date().toISOString().slice(0, 16),
  is_done: false
});

const createTask = async () => {
  try {
    const myApiPath=ref('none');
 
   if (sessionStorage.getItem("apiPath")==null) {
       throw new Error(`Error: You did not set the api path !`);
     }
    myApiPath.value=sessionStorage.getItem("apiPath");
 
    const response = await fetch(`${myApiPath.value}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
            "title": task.value.title//the api only allows this and puts opened and created_at automaticaly at create task
        }
      )
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    router.push('/tasks');
  } catch (error) {
    console.error('Error creating task:', error);
  }
};
</script>

<template>
    <div class="container mt-4">
      <h1 class="h3 mb-4">Add Task</h1>
      <form @submit.prevent="createTask">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input v-model="task.title" type="text" class="form-control" required />
        </div>
        
        <button type="submit" class="btn btn-success">Add Task</button>
      </form>
    </div>
  </template>
  