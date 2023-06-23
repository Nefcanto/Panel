import AdministrativeDivisionForm from './AdministrativeDivision/Form'
import AdministrativeDivisions from './AdministrativeDivision/List'
import Cities from './City/List'
import CityDivisionField from './CityDivision/Field'
import CityDivisionForm from './CityDivision/Form'
import CityDivisions from './CityDivision/List'
import Countries from './Country/List'
import CountryField from './Country/Field'
import CountryForm from './Country/Form'
import GeoFields from './GeoFields'
import PublicIcon from '@mui/icons-material/Public'

const GeoRoutes = [
    {
        path: '/countries',
        component: Countries
    },
    {
        path: '/administrativeDivisions',
        component: AdministrativeDivisions
    },
    {
        path: '/cities',
        component: Cities
    },
    {
        path: '/cityDivisions',
        component: CityDivisions
    }
]

const GeoMenu = [
    {
        title: 'Countries',
        icon: PublicIcon,
        path: '/countries'
    }
]

export { AdministrativeDivisionForm }
export { AdministrativeDivisions }
export { Cities }
export { CityDivisionField }
export { CityDivisionForm }
export { CityDivisions }
export { Countries }
export { CountryField }
export { CountryForm }
export { GeoFields }
export { GeoMenu }
export { GeoRoutes }
