<template>
    <div :class="['notes', layout ]">
        <div class="notesTitle" v-if="title">{{ title }}</div>
        <div class="notesBody">
            <NoteWidget 
                :id="d.id" 
                :note="d" 
                :showReminder="showReminder"
                :showArchive="showArchive"
                :showUnarchive="showUnarchive"
                :showDeletePermanent="showDeletePermanent"
                :showRestore="showRestore"
                :showOther="showOther"
                v-for="d in data" :key="d"
                />
        </div>
    </div>
</template>
<script>
import NoteWidget from './NoteWidget.vue'
export default {
    components: { NoteWidget },
    props:{
        title: String,
        data: Array,
        showReminder: Boolean,
        showArchive: Boolean,
        showUnarchive: Boolean,
        showDeletePermanent: Boolean,
        showRestore: Boolean,
        showOther: Boolean,
    },
    data(){
        return {
            layout: 'grid',
        }
    },
    created(){
        this.emitter.on('notes-layout', layout => {
            this.layout = layout;
        })
    },
}
</script>

<style lang="scss">
.notes{
    width: 80%;
    margin: 0 auto;

    .notesTitle{
        color: #9aa0a6;
        letter-spacing: .07272727em;
        font-family: $ff-roboto;
        font-size: .6875rem;
        font-weight: 500;
        line-height: 1rem;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    .notesBody{
        & > *{
            margin-bottom: 1rem;
        }
    }

    &.grid{
        .notesBody{ 
            display: grid;
            grid-template-columns: 24% 24% 24% 25%;
            grid-gap: 1%;
        }
    }

    &.list{
        width: 30%;
        margin: 0 auto;
        .notesBody{
            column-count: 1;
        }
    }
}
</style>