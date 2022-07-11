<template>
    <form class="createNoteForm" @submit.prevent="saveHandler">
        <CardNote>
            <template #header v-if="isFocus">
                <input v-model="params.title" class="inputNoteTitle" placeholder="Judul" @focus="focusHandler(true)"/>
            </template>
            <template #body>
                <textarea v-model="params.content" class="inputNoteBody" placeholder="Buat catatan..." rows="1" @focus="focusHandler(true)"></textarea>
            </template>
            <template #footer v-if="isFocus">
                <div class="cardNoteFooterClose">
                    <button class="btn" @click.prevent="closeHandler">Tutup</button>
                    <button class="btn" type="submit" v-if="params.title || params.content">Save</button>
                </div>
            </template>
        </CardNote>
    </form>
</template>

<script>
import { note } from '@/firebase/firestore';
import { autoExpand } from '@/helpers';
export default {
    props:{
        addParams: Object,
    },
    data(){
        return {
            isFocus: false,
            params:{
                title: null,
                content: null,
                ...this.addParams,
            },
        }
    },
    methods:{
        resetParams(){
            this.params.title = null;
            this.params.content = null;
        },
        focusHandler(focus){
            if(this.params.title || this.params.content){
                return false
            }
            this.isFocus = focus
        },
        closeHandler(){
            this.resetParams();
            this.focusHandler(false);
        },
        saveHandler(){
            note.createNote(this.params)
                .then(() => {
                    this.emitter.emit('get-notes');
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.resetParams();
                    this.focusHandler(false);
                })
        },
        blurHandler(event){
            var isClickInsideElement = this.$el.contains(event.target);
            if (!isClickInsideElement) {
                this.focusHandler(false);
            }
        },
    },
    mounted(){
        document.addEventListener('click', this.blurHandler);
        document.addEventListener('input', event => {
            if (event.target.tagName.toLowerCase() !== 'textarea') {
                return;
            }
            autoExpand(event.target);
        }, false);
    },
    unmounted(){
        document.removeEventListener('click', this.blurHandler)
    }
}
</script>

<style lang="scss">
    .createNoteForm{
        width: 30%;
        margin: 0 auto;
        margin-bottom: 3rem;
    }
</style>
