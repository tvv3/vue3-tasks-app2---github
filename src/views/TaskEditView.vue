<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const task = ref({ id: '', title: '', status: 'open', is_done: false });
const task_id=ref(0);
const task_title=ref('');
//const task_status=ref('');
const task_is_done=ref(false);
const getData=async () => {
  const taskId = route.params.task;
  
  try {
    const myApiPath=ref('none');
 
   if (sessionStorage.getItem("apiPath")==null) {
       throw new Error(`Error: You did not set the api path !`);
     }
    myApiPath.value=sessionStorage.getItem("apiPath");
 
    const response = await fetch(`${myApiPath.value}/tasks/${taskId}`,
        {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     
        }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    task.value = await response.json();
    task_id.value=task.value.data.id;
    task_title.value=task.value.data.title;
  //  task_status.value=task.value.data.status;
    task_is_done.value=task.value.data.is_done;
  } catch (error) {
    console.error('Error fetching task:', error);
  }
};

onMounted(getData); 

const updateTask = async () => {
  try {
    const myApiPath=ref('none');
 
    if (!sessionStorage.getItem("apiPath")) {
         throw new Error(`Error: You did not set the api path !`);
     }
  
     myApiPath.value=sessionStorage.getItem("apiPath");

    const response = await fetch(`${myApiPath.value}/tasks/${task_id.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
            'title':task_title.value,
            'is_done':task_is_done.value===true ? true : false
        }
      )
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    router.push('/tasks');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};
</script>

<template>
    
    <div class="container mt-4">
      <h1 class="h3 mb-4">Edit Task</h1>
      <form @submit.prevent="updateTask">
        <div class="mb-3">
          <label class="form-label" for="title">Title</label>
          <input v-model="task_title" name="title" id="title" type="text" class="form-control" required />
        </div>
        
        <div class="mb-3 form-check">
          <input type="checkbox" v-model="task_is_done" name="is_done" class="form-check-input" id="is_done" />
          <label class="form-check-label" for="is_done">Mark as Finished</label>
        </div>
        <button type="submit" class="btn btn-primary">Update Task</button>
      </form>
    </div>
  </template>