<script setup>
import {useTaskStore} from './stores/TaskStore'
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
import {ref} from 'vue'
import { storeToRefs } from 'pinia';

const gorevStore=useTaskStore();

gorevStore.gorevlerGetir()

const {gorevler,yukleniyor,gorevlerSayisi,favoriSayisi,favoriler}=storeToRefs(gorevStore)

const filter=ref('all')

</script>

<template>
 <main>
  <header>
    <h1>{{gorevStore.isim}}</h1>
  </header>

  <div class="new-task-form">
    <TaskForm />
  </div>

  <nav class="filter">
    <button @click="filter='all'">Bütün Görevler</button>
    <button @click="filter='favs'">Favori Görevler</button>
  </nav>

  <div class="loading" v-if="yukleniyor">Veriler Yükleniyor...</div>

  <div class="task-list"  v-if="filter==='all'">
    <p  v-if="!yukleniyor">Bütün Görevlerin Sayısı : {{ gorevlerSayisi }}</p>
    <div v-for="gorev in gorevler" :key="gorev.id">
      <TaskDetails :gorev="gorev" />
    </div>
  </div>

  <div class="task-list" v-if="filter==='favs'">
    <p>Favori Görevlerin Sayısı : {{ favoriSayisi }}</p>
    <div v-for="gorev in favoriler" :key="gorev.id">
      <TaskDetails :gorev="gorev" />
    </div>
  </div>

  
 </main>
</template>

<style scoped>

</style>
