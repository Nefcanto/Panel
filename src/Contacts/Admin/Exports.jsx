import Addresses from './Address/List'
import AddressForm from './Address/Form'
import ImageProperty from './Person/ImageProperty'
import JobTitles from './JobTitle/List'
import JuridicalPersonField from './JuridicalPerson/Field'
import JuridicalPersons from './JuridicalPerson/List'
import NaturalPersonField from './NaturalPerson/Field'
import NaturalPersonForm from './NaturalPerson/Form'
import NaturalPersons from './NaturalPerson/List'
import PersonIcon from '@mui/icons-material/Person'
import PersonInfo from '../Common/Profile/PersonInfo'
import Persons from './Person/List'
import Phones from './Phone/List'
import Relations from './Relation/List'
import Titles from './Titles/List'

const ContactsMenu = [
    {
        title: 'Contacts',
        icon: PersonIcon,
        children: [
            {
                title: "Titles",
                path: "/titles"
            },
            {
                title: "Job Titles",
                path: "/jobTitles"
            },
            {
                title: 'Natural Persons',
                path: '/naturalPersons'
            },
            {
                title: 'Juridical Persons',
                path: '/juridicalPersons'
            },
            {
                title: 'Relations',
                path: '/relations'
            }
        ]
    }
]

const ContactsRoutes = [
    {
        path: '/persons',
        component: Persons
    },
    {
        path: '/naturalPersons',
        component: NaturalPersons
    },
    {
        path: '/juridicalPersons',
        component: JuridicalPersons
    },
    {
        path: '/titles',
        component: Titles
    },
    {
        path: '/jobTitles',
        component: JobTitles
    },
    {
        path: '/relations',
        component: Relations
    },
    {
        path: '/profile',
        component: PersonInfo
    },
    {
        path: '/addresses',
        component: Addresses
    },
    {
        path:'/phones',
        component:Phones
    }
]

export { Addresses }
export { AddressForm }
export { ContactsMenu }
export { ContactsRoutes }
export { ImageProperty }
export { JobTitles }
export { JuridicalPersonField }
export { NaturalPersonField }
export { NaturalPersonForm }
export { NaturalPersons }
export { PersonInfo }
export { Persons }
export { Phones }
