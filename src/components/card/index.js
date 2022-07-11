import CardNote from "./CardNote.vue"

export { CardNote }
export default {
    install(app, options){
        app.component('CardNote', CardNote)
    }
}