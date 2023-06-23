import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import EntityAction from './EntityAction'

const ContentAction = ({ url }) => {
    return <EntityAction
        title='Edit content'
        icon={TextSnippetIcon}
        goTo={url}
    />
}

export default ContentAction
