import NoteAltIcon from '@mui/icons-material/NoteAlt'
import FieldForm from './Field/Form'
import Fields from './Field/List'
import Forms from './Form/List'
import SavedForms from './SavedForm/List'

const FormsRoutes = [
    {
        path: "/forms",
        component: Forms
    },
    {
        path: "/fields",
        component: Fields
    },
    {
        path: "/field",
        component: FieldForm
    },
    {
        path: "/savedForms",
        component: SavedForms
    }
]

const FormsMenu = [
    {
        title: "Forms",
        icon: NoteAltIcon,
        superAdmin: true,
        path: "/forms"
    }
]

export { Forms }
export { FormsMenu }
export { FormsRoutes }
export { SavedForms }
