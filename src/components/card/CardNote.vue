<template>
    <div class="cardNote">
        <div class="" @click.prevent="clickHandler">
            <div class="cardNoteHeader" v-if="hasSlot('header')">
                <slot name="header"></slot>
            </div>
            <div class="cardNoteBody" v-if="hasSlot('body')">
                <slot name="body"></slot>
            </div>
        </div>
        <div class="cardNoteFooter" v-if="hasSlot('footer')">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        onClick: Function,
    },
    methods:{
        hasSlot(name){
            return !!this.$slots[name];
        },
        clickHandler(){
            if(this.onClick){
                this.onClick();
            }
        }
    },
}
</script>
<style lang="scss">
.cardNote{
    border:1px solid #5f6368;
    border-radius: $radius;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $body-background;

    .cardNoteHeader{
        display: flex;
        padding: 15px;
        padding-bottom: 0;
        color: rgba(255,255,255, 1);
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5rem;
        letter-spacing: .00625em;
        font-family: $ff-roboto;
        word-break: break-word;
    
        .inputNoteTitle{
            border: none;
            outline: none;
            width: 100%;
            background: none;
            color: rgba(255,255,255, 1);
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.5rem;
            letter-spacing: .00625em;
            font-family: $ff-roboto;
        }
    }

    .cardNoteBody{
        padding: 15px;
        color: rgba(255,255,255, 1);
        font-size: .875rem;
        font-weight: 500;
        line-height: 1.5rem;
        letter-spacing: .00625em;
        font-family: $ff-roboto;
        word-break: break-word;

        .inputNoteBody{
            border: none;
            outline: none;
            width: 100%;
            background: none;
            color: rgba(255,255,255, 1);
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.5rem;
            letter-spacing: .00625em;
            font-family: $ff-roboto;
            resize: none;
        }
    }

    .cardNoteFooter{
        padding: 5px 15px;
    }
}
</style>