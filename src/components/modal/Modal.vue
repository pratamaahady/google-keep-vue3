<template>
    <div :class="['modal', visible ? 'show' : '']">
        <div class="modalBackdrop" @click.prevent="hide"></div>
        <div class="modalDialog">
            <div class="modalHeader">
                <div class="modalTitle">{{ title }}</div>
            </div>
            <div class="modalBody">
                <slot></slot>
            </div>
            <div class="modalFooter">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title: String,
    },
    data(){
        return {
            visible: false,
        }
    },
    methods:{
        hide(){
            this.visible = false;
        },
        show(){
            this.visible = true;
        },
    }

}
</script>
<style lang="scss">
.modal{
    position: fixed;
    top: 0;
    left: 0;
    display:none;
    // align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 100;

    .modalBackdrop{
        background: rgba(0,0,0,.3);
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .modalDialog{
        position: relative;
        background: #313235;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.6), 0 4px 8px 3px rgba(0,0,0,0.3);
        min-width: 20%;
        height: fit-content;
        margin-top: 10%;

        .modalHeader{
            display:flex;
            justify-content: flex-start;
            padding: 10px;
        }
        .modalBody{
            padding: 10px;
        }

        .modalFooter{
            display:flex;
            justify-content: flex-end;
            padding: 10px;
        }
    }

    &.show{
        display: flex;
    }
}
</style>