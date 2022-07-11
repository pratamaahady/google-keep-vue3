import ArchiveIcon from "./ArchiveIcon.vue";
import BellIcon from "./BellIcon.vue";
import CancelIcon from "./CancelIcon.vue";
import GoogleKeepIcon from "./GoogleKeepIcon.vue";
import GridIcon from "./GridIcon.vue";
import LabelIcon from "./LabelIcon.vue";
import ListIcon from "./ListIcon.vue";
import MenuIcon from "./MenuIcon.vue";
import PencilIcon from "./PencilIcon.vue";
import RefreshIcon from "./RefreshIcon.vue";
import SearchIcon from "./SearchIcon.vue";
import SettingIcon from "./SettingIcon.vue";
import TrashIcon from "./TrashIcon.vue";
import BellPlusIcon from "./BellPlusIcon.vue";
import OtherIcon from "./OtherIcon.vue";
import SpinnerIcon from './SpinnerIcon.vue'
import CheckIcon from './CheckIcon.vue'
import RestoreIcon from './RestoreIcon.vue'

const IconPlugin = {
    // eslint-disable-next-line no-unused-vars
    install(app, options){
        app.component('ArchiveIcon', ArchiveIcon);
        app.component('BellIcon', BellIcon);
        app.component('CancelIcon', CancelIcon);
        app.component('GoogleKeepIcon', GoogleKeepIcon);
        app.component('GridIcon', GridIcon);
        app.component('LabelIcon', LabelIcon);
        app.component('ListIcon', ListIcon);
        app.component('MenuIcon', MenuIcon);
        app.component('PencilIcon', PencilIcon);
        app.component('RefreshIcon', RefreshIcon);
        app.component('SearchIcon', SearchIcon);
        app.component('SettingIcon', SettingIcon);
        app.component('TrashIcon', TrashIcon);
        app.component('BellPlusIcon', BellPlusIcon);
        app.component('OtherIcon', OtherIcon);
        app.component('SpinnerIcon', SpinnerIcon);
        app.component('CheckIcon', CheckIcon);
        app.component('RestoreIcon',RestoreIcon);
    }
}

export { 
    ArchiveIcon,
    BellIcon,
    CancelIcon,
    GoogleKeepIcon,
    GridIcon,
    LabelIcon,
    ListIcon,
    MenuIcon,
    PencilIcon,
    RefreshIcon,
    SearchIcon,
    SettingIcon,
    TrashIcon,
    BellPlusIcon,
    OtherIcon,
    SpinnerIcon,
    CheckIcon,
    RestoreIcon,
}

export default IconPlugin