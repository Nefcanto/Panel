import AccountTreeIcon from '@mui/icons-material/AccountTree'
import { EntityAction } from 'List'
import HierarchiesDialog from './HierarchiesDialog'

const ManageHierarchies = ({
    pluralName,
    dialog,
    ...rest
}) => {

    return <EntityAction
        {...rest}
        title={`Manage ${pluralName || "hierarchies"}`}
        icon={AccountTreeIcon}
        dialog={dialog || HierarchiesDialog}
    />
}

export default ManageHierarchies
