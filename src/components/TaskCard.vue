<script setup>
import { defineProps, defineEmits } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
const task=  defineProps(['nr','title','is_done','created_at', 'mystatus', 'myid','myApiPath']);
const route=useRoute();
const router=useRouter();
const emit = defineEmits(['taskUpdated','taskDeleted']); // Define an event

function formatDate(dateString) {
  if (!dateString) return ''; // Handle empty value
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE'); // 'de-DE' formats as dd.mm.yyyy
}
const updateStatus = async () => {
  try {
    const response = await fetch(`${task.myApiPath}/tasks/${task.myid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
            'is_done':task.is_done===true ? false : true
        }
      )
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  //  window.location.reload();
  emit('taskUpdated'); // Notify the parent to refresh tasks
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

const deleteTask = async () => 
{
  const result = await Swal.fire({
    title: "Are you sure you want to delete this task?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      //try begin
      const response = await fetch(`${task.myApiPath}/tasks/${task.myid}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      Swal.fire("Deleted!", "Your task has been deleted.", "success");
      emit('taskDeleted'); // Notify parent to refresh the list
     //try end
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire("Error!", "Failed to delete the task.", "error");
    }
  }
};

</script>

<template>
  <div class="col">
    <div
      :class="`card h-100 shadow-sm border-0 ${task.is_done ? 'bg-closed text-muted' : 'bg-light'}`"
    >
      <div class="card-body p-3">
        <h5 class="card-title fw-bold">{{ `Task ${task.nr}` }}</h5>
        <h6 class="card-subtitle mb-2 text-secondary">{{ task.mystatus }}</h6>
        <p class="card-text">{{ task.title }}</p>
      </div>  
        <div class="card-footer bg-transparent border-0">
        <div class="d-flex flex-wrap gap-2">
          <RouterLink :to="`/tasks/${task.myid}`" class="btn btn-success btn-sm d-flex align-items-center">
            <i class="pi pi-pencil me-1"></i> Edit
          </RouterLink>
          <button @click="updateStatus" class="btn btn-warning btn-sm d-flex align-items-center">
            <i :class="`pi ${task.is_done ? 'pi-refresh' : 'pi-check-circle'} me-1`"></i> 
            {{ task.is_done ? "Open" : "Finish" }}
          </button>
          <button @click="deleteTask" class="btn btn-danger btn-sm d-flex align-items-center">
            <i class="pi pi-trash me-1"></i> Delete
          </button>
        </div>
      
      <small class="text-muted d-block text-end mt-3">{{ formatDate(task.created_at) }}</small>
      </div>  
    </div>
  </div>
</template>



<style scoped>
   .bg-closed{background-color:rgb(236, 234, 234)!important;}
</style>