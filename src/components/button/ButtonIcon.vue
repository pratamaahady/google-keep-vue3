<template>
    <button :class="['btnIcon', size]">
        <slot></slot>
        <div class="btnTooltip" v-if="tooltip">{{ tooltip }}</div>
    </button>
</template>
<script>
export default {
    props:{
        size: String,
        tooltip: String,
    },
}
</script>
<style lang="scss">
.btnIcon{
    border: none;
    background: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    svg{
        fill: #9aa0a6;
        path{
            fill: #9aa0a6;
            &.fillNone { fill: none; }
        }

    }

    .btnTooltip{
        position: absolute;
        color: white;
        top: 110%;
        display: none;
        background: rgb(151, 151, 151);
        border-radius: 1rem;
        width: auto;
        white-space: nowrap;
    }

    &:hover{
        background-color: rgba(232,234,237,.08);

        svg{
           fill: #fff !important;
            path{
                fill: #fff;
                &.fillNone { fill: none; }
            }
        }

        .btnTooltip{
            display: block;
            font-size: 11px;
            padding: 3px 5px;
        }
    }

    &.sm{
        width: 30px;
        height: 30px;
    }
}
</style>