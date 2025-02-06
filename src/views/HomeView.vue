<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
  if (sessionStorage.getItem("apiPath")==null) {//alert('null');
    sessionStorage.setItem("apiPath", "http://localhost:8000/api");
  }
});
const myapipath=ref("");
const changeApiPath=()=>{
  sessionStorage.setItem("apiPath", myapipath.value);   
  alert("Path changed to: "+sessionStorage.getItem("apiPath"));
};
const showApiPath=()=>{
  if (!sessionStorage.getItem("apiPath")) {
   alert("No api path is saved!");
  }
  else
  {
  alert("Path changed to: "+sessionStorage.getItem("apiPath"));
  }
};
</script>

<template>
  <main class="text-center">
    <h2>Home Page</h2>
    <p>
    Hello, this Vue 3 app works with my previous Task Api Laravel 10 App.
    <br>
    <br>
     Verifica linkul api-ului utilizat de aplicatie apasand mai jos:<br>
     <button @click="showApiPath()">Show Api Path</button>
     <br>
     <br>
     Change the api path (default value is http://localhost:8000/api):<br>
    </p>
    <input type="text" v-model="myapipath"><br><br>
    <button @click="changeApiPath()">Change Api Path</button>
    <br>
    <br>
    <br>
  </main>
</template>
