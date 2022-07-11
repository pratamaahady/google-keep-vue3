<template>
    <CreateNoteWidget :addParams="{ is_archive: true }"/>
    <NotesWidget 
        title="LAINNYA"
        :data="notes"
        :showUnarchive="true"
        :showOther="true"
        />
</template>
<script>
import CreateNoteWidget from "./widgets/CreateNoteWidget.vue";
import NotesWidget from "./widgets/NotesWidget.vue"
import { note } from "@/firebase/firestore";

export default {
    components:{ CreateNoteWidget, NotesWidget },
    data(){
        return {
            notes:[]
        }
    },
    created(){
        this.emitter.on('get-notes', this.fetchData)
    },
    methods:{
        fetchData(){
            this.emitter.emit('sync', true)
            note.getArchiveNotes()
                .then(snapshot => {
                    this.notes = snapshot.docs
                        .map(doc => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            }
                        });
                })
                .catch(err => {
                    console.log(err)
                })
                .then(() => {
                    this.emitter.emit('sync', false)
                })
        }
    },
    mounted(){
        this.emitter.emit('get-notes');
    },
    unmounted(){
        this.emitter.off('get-notes', this.fetchData)
    }
}
</script>