import ChooseLocale from '../Common/ChooseLocale'
import LocaleField from './Locale/Field'
import Locales from './Locale/List'
import TranslateIcon from '@mui/icons-material/Translate'
import Translations from './Translation/List'

const GlobalizationRoutes = [
    {
        path: "/locales",
        component: Locales
    },
    {
        path: "/translations",
        component: Translations
    }
]

const GlobalizationMenu = [
    {
        title: "Globalization",
        icon: TranslateIcon,
        superAdmin: true,
        children: [
            {
                title: "Locales",
                path: "/locales"
            },
            {
                title: "Translations",
                path: "/translations"
            }
        ]
    }
]

export { ChooseLocale }
export { GlobalizationMenu }
export { GlobalizationRoutes }
export { Locales }
export { Translations }
export { LocaleField }
