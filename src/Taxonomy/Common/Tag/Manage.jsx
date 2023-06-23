import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { EntityAction } from 'List'
import TagsDialog from './TagsDialog'

const ManageTags = ({ dialog, ...rest }) => <EntityAction
    {...rest}
    title="Manage tags"
    icon={LocalOfferIcon}
    dialog={dialog || TagsDialog}
/>

export default ManageTags
