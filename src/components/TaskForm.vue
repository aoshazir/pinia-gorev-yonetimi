<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="görev giriniz" v-model="yeniGorev" />
        <button>Ekle</button>
    </form>
</template>

<script setup>
import {ref} from 'vue'
import {useTaskStore} from '../stores/TaskStore'

const gorevStore=useTaskStore();

const yeniGorev=ref('')

const handleSubmit=()=>{
    if(yeniGorev.value.length>0){
        gorevStore.gorevEkleme({
            baslik:yeniGorev.value,
            favori:false,
            id:Math.floor(Math.random()*1000000)
        })
        yeniGorev.value=''
    }
}

</script>

<style lang="scss" scoped>

</style>