<script setup>
import {ref, watchEffect} from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import TaskCard from '@/components/TaskCard.vue';

/*
const mytasksExample=ref([{
            "id": 1,
            "title": "task1",
            "is_done": false,
            "created_at": "2023-10-22T07:27:32.000000Z",
            "status": "open"
        },
        {
            "id": 2,
            "title": "task2",
            "is_done": true,
            "created_at": "2023-10-22T07:28:27.000000Z",
            "status": "finished"
        }]);
*/
const route = useRoute();
const router = useRouter();
const page = ref(0);

const mydata=ref({data:[], links:[]});
const mytasks=ref([]);
const isLastPage=ref(true);//default=is last page
const perPage=ref(0);
const totalPages=ref(0);
//const file = "http://localhost:8000/api/tasks";
const myApiPath=ref('none');
 function getSessionApiPath()
 {
 if (sessionStorage.getItem("apiPath")==null) {
     throw new Error(`Error: You did not set the api path !`);
  }
  myApiPath.value=sessionStorage.getItem("apiPath");
 }
getSessionApiPath();

async function getTasksData() {
    
try {
  
  const mypage=ref(0);//must be local variab inside the function first
  if (route.params.page) {
    mypage.value = Number(route.params.page);
  }
  else {mypage.value=1;}
     
    const response = await fetch (`${myApiPath.value}/tasks?page=${mypage.value}`,
         {
                                    method: 'GET',
                                    headers: {
                                    "Content-Type": "application/json",
                                    },
                                });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    mydata.value = await response.json();
    
    mytasks.value=mydata.value.data;
    isLastPage.value=(mydata.value.meta.to==mydata.value.meta.total)? true: false;
    perPage.value=mydata.value.meta.per_page;
    totalPages.value=Math.ceil(mydata.value.meta.total/mydata.value.meta.per_page);
    page.value=mypage.value;//i must update the page here after fetching else there will be a visible two steps update 
    console.log('Success!');
  } catch (error) {
    console.error(error.message);
  }
}

 
 //watchEffect() keeps track of changes in the route and refetches
 //  data whenever page changes.
 watchEffect(() => {
  
  getTasksData();
  
});
 
//getTasksData();// must not be on onMounted !!!!
//console.log(`page ${Number(page.value)} ${Boolean(isLastPage.value)}`);
 
</script>

<template>
    <p class="mb-5 mt-5 d-flex" style="line-height:30px;justify-content: center; align-items:center;"><span style="margin-right: 10px;font-size: 30px;line-height: 30px;">Tasks </span> 
    <RouterLink to="/tasks/add" style="font-size: 16px;line-height:30px; text-align: center; background-color: green; color:white;border-radius: 50%;"> <i class="pi pi-plus m-2"></i> </RouterLink>
    </p>
    <main>
        <section>
        <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
             <TaskCard v-for="(value,key) in mytasks" :nr="`${key+perPage*(Number(page)-1)+1}`" :myid="value.id"
              :title="value.title" :is_done="value.is_done" :mystatus="value.status"
            :created_at="value.created_at"
            @taskUpdated="getTasksData()"
            @taskDeleted="getTasksData()"
            :myApiPath="myApiPath"/>
        </div> 
        <!-- Pagination Controls -->
        <div class="d-flex justify-content-center mt-5 mb-5" style="flex-wrap: wrap;">
             <!-- First Page Button -->
             <button @click="router.push('/tasks/page/1');" class="btn btn-outline-secondary  btn-md d-flex align-items-center m-1">
              <i class="pi pi-angle-double-left me-2"></i> First
             </button>
            <!--Previous and Next Buttons-->
            <button type="button" @click="page <= 1 ? '' : router.push(`/tasks/page/${Number(page) - 1}`)" :disabled="page <= 1"
            class="btn btn-success btn-md d-flex align-items-center m-1">
            <i class="pi pi-angle-left me-2"></i>
            Previous
            </button>
            <!-- Current Page Indicator -->
              <span class="fw-bold fs-5 text-success mx-3 m-1">
                Page {{ page }} of {{ totalPages }}
               </span>

            <button type="button" @click="isLastPage ? '' : router.push(`/tasks/page/${Number(page) + 1}`)" :disabled="isLastPage"
            class="btn btn-success btn-md d-flex align-items-center m-1">
              Next <i class="pi pi-angle-right ms-2"></i>
            </button>
            <!--Last page Button-->
            <button @click="router.push(`/tasks/page/${totalPages}`);" class="btn btn-outline-secondary btn-md d-flex align-items-center m-1">
             Last <i class="pi pi-angle-double-right ms-2"></i>
            </button>
        </div>
       
        </div>
        </section>
    </main>
    
</template>