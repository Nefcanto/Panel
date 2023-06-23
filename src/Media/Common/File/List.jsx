import UploadIcon from '@mui/icons-material/Upload'
import { List } from 'List'
import CreateForm from './CreateForm'
import EditForm from './EditForm'

const headers = <>
    <th>Title</th>
</>

const row = entity => {
    return <>
        <td>
            <a href={entity.relatedItems?.fileUrl}>
                {entity.title}
            </a>
        </td>
    </>
}

const Files = (props) => {
    return <List
        title='Files'
        entityType='File'
        create={CreateForm}
        upsertionText="Upload"
        upsertionIcon={UploadIcon}
        headers={headers}
        row={row}
        edit={<EditForm />}
        hasDelete
        {...props}
    />
}

export default Files
