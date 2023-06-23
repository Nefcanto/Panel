import { List } from 'List'
import InstructorForm from './Form'
import { EntitySeo } from 'Seo'

const headers = <>
    <th start>NaturalPersonName</th>
    <th>JuridicalPersonName</th>
</>

const row = entity => <>
    <td>{entity.naturalPersonName}</td>
    <td>{entity.juridicalPersonName}</td>
</>

const entityActions = entity => <>

    <EntitySeo
        entityType="Person"
        entityGuid={entity.contactsPersonGuid}
    />

</>

const Instructors = () => {

    return <>
        <List
            entityType="Instructor"
            headers={headers}
            create={InstructorForm}
            row={row}
            entityActions={entityActions}
            hasDelete
        />
    </>
}

export default Instructors
