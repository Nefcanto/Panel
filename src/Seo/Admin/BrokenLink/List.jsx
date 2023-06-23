import SearchIcon from '@mui/icons-material/Search'
import {
    List,
    ListAction,
    post,
    Text,
} from 'List'

const listActions = () => {

    const find = ({
        error,
        reloadList,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post('/brokenLink/find')
            .then(data => {
                setProgress(false)
                reloadList()
                success('Check finished')
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <>
        <ListAction
            title='Find'
            icon={SearchIcon}
            click={(params) => find(params)}
            notApplicableToEntities
        />
    </>
}

const filters = <>
    <Text property="BrokenLinkUrl" />
    <Text property="AnchorText" />
</>

const headers = <>
    <th>Page</th>
    <th>URL</th>
    <th>Text</th>
    <th>Code</th>
</>

const row = entity => <>
    <td>{entity.pageUrl}</td>
    <td>{entity.brokenLinkUrl}</td>
    <td>{entity.anchorText}</td>
    <td>{entity.responseCode}</td>
</>

const BrokenLinks = () => {
    return <List
        title='Broken links'
        entityType='BrokenLink'
        listActions={listActions}
        filters={filters}
        headers={headers}
        row={row}
        hasDelete
    />
}

export default BrokenLinks
