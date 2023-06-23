import {
    DialogForm,
    LongText,
} from 'Form'
import NaturalPersonField from '../NaturalPerson/Field'
import JuridicalPersonField from '../JuridicalPerson/Field'
import JobTitle from '../JobTitle/Field'

const inputs = <>
    <NaturalPersonField />
    <JuridicalPersonField />
    <JobTitle />
    <LongText
        property='Description'
        placeholder='Description'
    />
</>

const RelationForm = <DialogForm
    entityType='Relation'
    inputs={inputs}
/>

export default RelationForm
