import NotesPage from '@/pages/NotesPage.vue'
import ReminderPage from '@/pages/ReminderPage.vue'
import LabelPage from '@/pages/LabelPage.vue'
import ArchivePage from '@/pages/ArchivePage.vue'
import TrashPage from '@/pages/TrashPage.vue'

export default [
    {
        path: '/',
        component: NotesPage
    },
    {
        path: '/reminder',
        component: ReminderPage,
    },
    {
        path: '/label/:label',
        component: LabelPage,
    },
    {
        path: '/archive',
        component: ArchivePage,
    },
    {
        path: '/trash',
        component: TrashPage,
    },
]