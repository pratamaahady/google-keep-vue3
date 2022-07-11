<template>
    <div :class="['note', show ? 'show' : '']" v-if="note">
        <div class="noteBackdrop" @click.prevent="hideHandler"></div>
        <div class="noteBox">
            <CardNote :onClick="showHandler">
                <template #header>
                    <div v-html="note.title" v-if="!show" class="noteTitle"></div>
                    <input v-model="params.title" class="inputNoteTitle" placeholder="Judul" v-else />
                </template>
                <template #body>
                    <div v-html="note.content" v-if="!show" class="noteContent"></div>
                    <textarea v-model="params.content" class="inputNoteBody" placeholder="Buat catatan..." rows="1" v-else></textarea>
                </template>
                <template #footer>
                    <div class="noteLabel">
                        <div class="noteLabelItem" v-for="(label, labelIndex) in note.labels" :key="labelIndex">
                            {{ label }}
                            <div class="noteLabelItemAction" @click.prevent="deleteLabelHandler(label)"><CancelIcon /></div>
                        </div>
                    </div>
                    <div class="noteAction">
                        <ButtonIcon size="sm" tooltip="Ingatkan Saya" v-if="showReminder"><BellPlusIcon/></ButtonIcon>
                        <ButtonIcon size="sm" @click.prevent="archiveHandler" tooltip="Arsipkan" v-if="showArchive"><ArchiveIcon/></ButtonIcon>
                        <ButtonIcon size="sm" @click.prevent="unarchiveHandler" tooltip="Batal Arsipkan" v-if="showUnarchive"><ArchiveIcon/></ButtonIcon>
                        <ButtonIcon size="sm" @click.prevent="deletePermanentHandler" tooltip="Hapus Permanen" v-if="showDeletePermanent"><TrashIcon/></ButtonIcon>
                        <ButtonIcon size="sm" @click.prevent="restoreHandler" tooltip="Pulihkan" v-if="showRestore"><TrashIcon /></ButtonIcon>
                        <DropDown v-if="showOther">
                            <template #dropdown-button>
                                <ButtonIcon size="sm" tooltip="Lainnya"><OtherIcon/></ButtonIcon>
                            </template>
                            <template #dropdown-item>
                                <div class="dropdownItem" @click.prevent="deleteHandler">Hapus Catatan</div>
                                <div class="dropdownItem" @click.prevent="addLabelToggleHandler">Tambahkan Label</div>
                            </template>
                        </DropDown>
                        <div class="addNoteLabel" v-if="addLabelShow">
                            <div class="addNoteLabelDialog">
                                <div class="header">Catatan Label</div>
                                <div class="body">
                                    <div class="addNoteLabelList" v-for="(d, dIndex) in labels" :key="dIndex">
                                        <input type="checkbox" @change="changeLabelHandler($event, d)" :checked="note.labels.includes(d.name)"/> {{ d.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn" @click.prevent="hideHandler" v-if="show">Tutup</button>
                        <button class="btn" @click.prevent="saveHandler" v-if="show">Save</button>
                    </div>
                </template>
            </CardNote>
        </div>
    </div>
</template>
<script>
import { note as notes, label as labels } from '@/firebase/firestore'
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        note: Object,
        showReminder: Boolean,
        showArchive: Boolean,
        showUnarchive: Boolean,
        showDeletePermanent: Boolean,
        showRestore: Boolean,
        showOther: Boolean,
    },
    data(){
        return{
            show: false,
            params:{
                ...this.note
            },
            labels:[],
            addLabelShow: false,
        }
    },
    methods:{
        resetHandler(){
            this.params = {
                ...this.note
            }
        },
        showHandler(){
            if(!this.show){
                this.resetHandler();
                this.show = true;
            }
        },
        hideHandler(){
            if(this.show){
                this.show = false;
            }
        },
        archiveHandler(){
            notes.archiveNote(this.id)
                .then(() => {
                    this.emitter.emit('get-notes');
                })
        },
        unarchiveHandler(){
            notes.unarchiveNote(this.id)
                .then(() => {
                    this.emitter.emit('get-notes');
                })
        },
        deleteHandler(){
            notes.deleteNote(this.id)
                .then(() => {
                    this.emitter.emit('get-notes');
                })
        },
        restoreHandler(){
            notes.restoreNote(this.id)
                .then(() => {
                    this.emitter.emit('get-notes');
                })
        },
        deletePermanentHandler(){
            notes.deletePermanentNote(this.id)
                .then(() => {
                    this.emitter.emit('get-notes');
                })
        },
        saveHandler(){
            notes.updateNote(this.id,this.params)
                .then(() => {
                    this.emitter.emit('get-notes')
                })
                .catch(err => console.log(err))
                .then(() => {
                    this.hideHandler();
                })
        },
        changeLabelHandler(e, label){
            if(e.target.checked){
                this.addLabelHandler(label.name)
            }else{
                this.deleteLabelHandler(label.name);
            }
        },
        deleteLabelHandler(label){
            var labelIndex = this.params.labels.indexOf(label)
            this.params.labels.splice(labelIndex, 1);
            this.saveHandler();
        },
        addLabelHandler(label){
            this.params.labels.push(label);
            this.saveHandler();
        },
        addLabelToggleHandler(){
            if(!this.addLabelShow){
                this.fetchLabels()
                    .then(() => {
                        this.addLabelShow = true;
                    })
            }else{
                this.addLabelShow = false;
            }
        },
        addLabelHideHandler(){
            this.addLabelShow = false;
        },
        fetchLabels(){
            return labels.getLabels()
                .then(snapshot => {
                    this.labels = snapshot.docs
                        .map(doc => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            }
                        })
                })
        },
    },
    watch:{
        addLabelShow(val){
            if(val){
                document.addEventListener('click', this.addLabelHideHandler)
            }else{
                document.removeEventListener('click', this.addLabelHideHandler)
            }
        }
    }
}
</script>
<style lang="scss">
.note{
    transition: $transition;
    
    .noteBackdrop{ 
        background: rgba(0,0,0,.2);
        display: none;
    }

    .noteLabel{
        display:flex;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: .5rem;

        .noteLabelItem{
            font-size: 11px;
            border:1px solid;
            border-radius: 1rem;
            padding: 5px 10px;
            position: relative;
            overflow: hidden;
            margin-right: .5rem;

            .noteLabelItemAction{
                display: none;
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                padding: 0 5px;
                background:#303236;

                svg{
                    width: 15px;
                    aspect-ratio: 1/1;
                    fill: white;
                }
            }

            &:hover{
                .noteLabelItemAction{
                    display: block;
                }
            }
        }
    }

    .noteAction{
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    
    &.show{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        display: flex;
        // align-items: center;
        justify-content: center;

        .noteBackdrop{
            position: absolute;
            display: block;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
        }

        .noteBox{
            position: relative;
            width: 40%;
            margin-top: 10%;
            height: fit-content;
        }
    }
}

.addNoteLabel{
    position: relative;

    .addNoteLabelDialog{
        position: absolute;
        background: #313235;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.6), 0 4px 8px 3px rgba(0,0,0,0.3);
        height: fit-content;
        left: 0;
        width: 200px;
        padding: .7rem;

        .addNoteLabelList{
            font-size: 12px;
            display: flex;
            align-items: center;
            margin-bottom: .5rem;

            input[type="checkbox"]{
                margin: 0;
                margin-right: 1rem;
            }
        }

        .header{
            font-size: 14px;
        }

        .body{
            padding-top: 1rem;
        }
    }
}
</style>