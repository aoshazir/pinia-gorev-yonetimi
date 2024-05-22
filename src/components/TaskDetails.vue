<template>
    <div class="task">
        <h3>{{ gorev.baslik }}</h3>
        <div class="icons">
            <i class="material-icons" @click="gorevStore.gorevSil(gorev.id)">delete</i>
            <i class="material-icons" :class="{active:gorev.favori}" @click="gorevStore.toggleFavori(gorev.id)">favorite</i>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '@/stores/TaskStore';

export default{
    props:["gorev"],
    setup(){
        const gorevStore=useTaskStore()

        return {gorevStore}
    }
}

</script>

<style  scoped>

</style>