import {
    DialogForm,
    Slug,
} from 'Form'

const inputs = <>
    <Slug />
</>

const CourseForm = <DialogForm
    entityType='course'
    inputs={inputs}
/>

export default CourseForm
