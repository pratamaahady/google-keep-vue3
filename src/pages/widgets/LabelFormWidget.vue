<template>
    <Modal title="Edit Label" ref="modal">
        <div class="formLabel">
            <ButtonIcon size="sm" @click.prevent="clearHandler"><CancelIcon /></ButtonIcon>
            <input v-model="new_label" placeholder="Buat label baru" @keyup.enter="createHandler"/>
            <ButtonIcon size="sm" @click.prevent="createHandler"><CheckIcon /></ButtonIcon>
        </div>
        <div class="formLabel" v-for="(label, labelIndex) in labels" :key="labelIndex">
            <ButtonIcon size="sm" @click.prevent="deleteHandler(label)"><TrashIcon /></ButtonIcon>
            <input v-model="label.name" placeholder="Buat label baru" @keyup.enter="updateHandler(label)"/>
            <ButtonIcon size="sm" @click.prevent="updateHandler(label)"><PencilIcon /></ButtonIcon>
        </div>
        <template #footer>
            <button class="btn" @click.prevent="hide">Selesai</button>
        </template>
    </Modal>
</template>
<script>
import { label } from '@/firebase/firestore'
export default {
    data() {
        return {
            labels: [],
            new_label: null,
        };
    },
    methods: {
        fetchLabels() {
            label.getLabels()
                .then(snapshot => {
                this.labels = snapshot.docs
                    .map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
            });
        },
        clearHandler(){
            this.new_label = null;
        },
        createHandler(){
            label.createLabel({ name: this.new_label })
                .then(() => {
                    this.labels.push({
                        name: this.new_label
                    });
                    this.clearHandler();
                })
        },
        updateHandler(data){
            label.updateLabel(data.id,{ name: data.name })
        },
        deleteHandler(data){
            if(data.id){
                label.deleteLabel(data.id)
                    .then(() => {
                        var index = this.labels.indexOf(data);
                        this.labels.splice(index,1);
                    })
            }else{
                var index = this.labels.indexOf(data);
                this.labels.splice(index,1);
            }
        },
        show(){
            this.clearHandler()
            this.$refs.modal.show();
        },
        hide(){
            this.emitter.emit('get-labels');
            this.$refs.modal.hide();
        },
    },
    mounted() {
        this.fetchLabels();
    },
}
</script>
<style lang="scss">
.formLabel{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: .5rem 0;

    input{
        width: 70%;
        background: transparent;
        border: none;
        outline: none;
        padding-bottom: 5px;
        color: white;
        font-weight: bold;

        &:focus{
            border-bottom: 1px solid rgba(255,255,255,.3);
            color: $body-color;
        }
    }
}
</style>