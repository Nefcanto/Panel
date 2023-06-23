import Grid4x4Icon from '@mui/icons-material/Grid4x4'
import { EntityAction } from 'List'
import SectionsDialog from './SectionsDialog'

const ManageSections = (props) => <EntityAction
    {...props}
    title="Manage sections"
    icon={Grid4x4Icon}
    dialog={SectionsDialog}
    superAdmin
/>

export default ManageSections
