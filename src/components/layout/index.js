import LayoutMaster from './LayoutMaster.vue'

export default {
    install(app, options){
        app.component('LayoutMaster', LayoutMaster)
        app.config.globalProperties.$navbar = {
            notes:{
                layout: 'grid',
                changeLayout(opt){
                    this.layout = opt;
                }
            }
        }
    }
}