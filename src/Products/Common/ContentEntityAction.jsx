import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import { EntityAction } from 'List'

const ContentEntityAction = (entity) => <EntityAction
    title='Edit content'
    icon={TextSnippetIcon}
    goTo={`/productContent?id=${entity.id}`}
/>

export default ContentEntityAction
