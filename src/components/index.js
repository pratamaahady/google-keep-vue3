import Icon from './icon'
import Card from './card'
import Layout from './layout'
import Button from './button'
import Dropdown from './dropdown'
import Modal from './modal'

export default {
    install(app, options) {
        app.use(Icon)
        app.use(Card)
        app.use(Layout)
        app.use(Button)
        app.use(Dropdown)
        app.use(Modal)
    }
}