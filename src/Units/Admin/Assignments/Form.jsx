import {
    DialogForm,
    Text,
} from 'Form'
import { EntityTypeField } from 'Entities'
import {
    // HierarchyField,
    TagField,
} from 'Taxonomy'
import UnitField from '../Unit/Field'

const inputs = <>
    <EntityTypeField />
    {/* <HierarchyField /> */}
    <TagField />
    {/* <Text
        property='EntityGuid'
    /> */}
    <UnitField />
</>

const AssignmentForm = <DialogForm
    entityType='Assignment'
    inputs={inputs}
/>

export default AssignmentForm
