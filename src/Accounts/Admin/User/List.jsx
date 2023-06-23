import SyncAltIcon from '@mui/icons-material/SyncAlt'
import {
    DateTime,
    List,
    ListAction,
    post,
    Text,
    ValueWithTitle,
} from 'List'

const listActions = () => {

    const syncUsers = ({
        error,
        reloadList,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post('/user/sync').then(data => {
            reloadList()
            setProgress(false)
            success('Users are synced')
        }, e => {
            setProgress(false)
            error(e)
        })
    }

    return <>
        <ListAction
            title='Sync'
            icon={SyncAltIcon}
            click={(params) => syncUsers(params)}
            notApplicableToEntities
        />
    </>
}

const filters = <>
    <Text
        property='FirstName'
        placeholder='Name'
    />
</>

const sorts = [
    {
        caption: 'Name, A-Z',
        direction: 'asc',
        property: 'Name'
    },
    {
        property: 'Name',
        direction: 'desc',
        caption: 'Name, Z-A'
    }
]

const headers =
    <>
        <th>User name</th>
        <th>Last Sync Date</th>
    </>

const row = entity => {
    return <>
        <td>
            <ValueWithTitle
                value={entity.userName}
                title={entity.guid}
            />
        </td>
        <td>
            <DateTime
                date={entity.lastSyncUtcDate}
            />
        </td>
    </>
}

const Users = () => {
    return <List
        title='Users'
        entityType='user'
        headers={headers}
        row={row}
        filters={filters}
        sorts={sorts}
        listActions={listActions}
    />
}

export default Users
