<template>
    <div :class="['dropdown', show ? 'show' : '']">
        <div class="dropdownButton" @click.prevent="dropdownToggle">
            <slot name="dropdown-button"></slot>
        </div>
        <div class="dropdownDialog" v-show="show">
            <slot name="dropdown-item"></slot>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            show: false,
        }
    },
    methods:{
        dropdownToggle(){
            this.show = !this.show;
        },
        hideHandler(event){
            var isClickInsideElement = this.$el.contains(event.target);
            if (!isClickInsideElement) {
                if(this.show){
                    this.dropdownToggle();
                }
            }
        },
        dropdownItemAddListener(){
            var elements = this.$el.querySelectorAll('.dropdownItem');
            elements.forEach(element => {
                element.addEventListener('click', this.dropdownToggle);
            })
        },
        dropdownItemRemoveListener(){
            var elements = this.$el.querySelectorAll('.dropdownItem');
            elements.forEach(element => {
                element.removeEventListener('click', this.dropdownToggle);
            })
        }
    },
    mounted(){
        document.addEventListener('click', this.hideHandler)
        this.dropdownItemAddListener();
    },
    unmounted(){
        document.removeEventListener('click', this.hideHandler)
        this.dropdownItemRemoveListener();
    }
}
</script>
<style lang="scss">
.dropdown{
    position: relative;

    .dropdownDialog{
        position: absolute;
        top: 100%;
        left: 0;
        background: $body-background;
        box-shadow: 0 1px 2px 0 rgba(0,0,0, 0.6), 0 2px 6px 2px rgba(0,0,0, 0.3);
        min-width: 200px;
        border-radius: 4px;
        display: none;

        .dropdownItem{
            padding: 10px;
            cursor: pointer;
            font-size: $fz-sm;

            &:hover{
                background: rgba(255,255,255,.2);
            }
        }
    }

    &.show{
        .dropdownDialog{
            display: block;
        }
    }
}

</style>