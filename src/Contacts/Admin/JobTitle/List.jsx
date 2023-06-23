import {
    List,
} from 'List'
import JobTitleForm from './Form'

const row = entity => <>
    {
        <>
            <div>{entity.text}</div>
        </>
    }
</>

const JobTitles = (props) => {
    return <List
        title='Job Titles'
        entityType='JobTitle'
        row={row}
        create={JobTitleForm}
        {...props}
    />
}

export default JobTitles
