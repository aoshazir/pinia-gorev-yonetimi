import {defineStore} from 'pinia'

export const useTaskStore=defineStore('gorevStore',{
    state:()=>({
        gorevler:[],
        isim:"AOS Görev Yönetimi",
        yukleniyor:false
    }),
    getters:{
        favoriler(){
            return this.gorevler.filter(g=>g.favori)
        },
        favoriSayisi(){
            return this.gorevler.reduce((p,c)=>{
                return c.favori ? p+1:p
            },0)
        },
        gorevlerSayisi:(state)=>{
            return state.gorevler.length
        }
    },
    actions:{
        async gorevlerGetir(){
            this.yukleniyor=true
            const res=await fetch('http://localhost:3000/gorevler')
            const data=await res.json()

            this.gorevler=data
            this.yukleniyor=false
        },
        async gorevEkleme(gorev){
            this.gorevler.push(gorev)

            const res=await fetch('http://localhost:3000/gorevler',{
                method:'POST',
                body:JSON.stringify(gorev),
                headers:{'Content-Type':'application/json'}
            })

            if(res.error){
                console.log(res.error);
            }
        },
        async gorevSil(id){
            this.gorevler=this.gorevler.filter(t=>{
                return t.id!==id
            })

            const res=await fetch('http://localhost:3000/gorevler/'+id,{
                method:'DELETE'
            })

            if(res.error){
                console.log(res.error);
            }


        },
        async toggleFavori(id){
            const gorev=this.gorevler.find(t=>t.id===id)
            gorev.favori=!gorev.favori

            const res=await fetch('http://localhost:3000/gorevler/'+id,{
                method:'PUT',
                body:JSON.stringify({favori:gorev.favori,baslik:gorev.baslik}),
                headers: {'Content-Type': 'application/json'}

            })

            if (res.error) {
                console.log(res.error)
            }
        }
    }
})