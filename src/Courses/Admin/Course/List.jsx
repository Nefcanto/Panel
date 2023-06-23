import {
    Boolean,
    BooleanProperty,
    Chip,
    ImageTd,
    List,
    Title,
    TitleSort,
} from 'List'
import CourseForm from './Form'
import CourseTitle from '../../Common/Course/CourseTitle'
import DeliveryFilter from '../../Common/Course/DeliveryFilter'
import entityActions from './EntityActions'
import Images from '../../Common/Course/Images'
import listActions from './ListActions'
import PricingFilter from '../../Common/Course/PricingFilter'
import StateFilter from '../../Common/State/Filter'
import StateProperty from '../../Common/State/Property'

const filters = <>
    <Title />
    {StateFilter}
    <Boolean property='Featured' />
    {PricingFilter}
    {DeliveryFilter}
</>

const sorts = [
    ...TitleSort
]

const headers = <>
    <th></th>
    <th start>Title</th>
    <th>Images</th>
    <th>Featured</th>
    <th>Delivery</th>
    <th>State</th>
</>

const row = entity => <>
    <ImageTd
        url={entity.relatedItems.imageUrl}
    />
    <td>{CourseTitle(entity)}</td>
    {Images(entity)}
    <td>
        <BooleanProperty
            value={entity.featured}
            actionUrl={`/course/toggleBoolean?id=${entity.id}&property=Featured`}
            nullForFalse
        />
    </td>
    <td>
        <Chip
            className='bg-slate-200'
            text={entity.hasOfflineAccess ? 'Offline' : 'Online'}
        />
    </td>
    {StateProperty(entity)}
</>

const classProvider = entity => {
    var style = entity.stateKey.toLowerCase() + " "
    switch (entity.stateKey.toLowerCase()) {
        case 'approved':
            style += "bg-green-200"
            break
        case 'new':
        case 'edited':
            style += 'bg-blue-200'
            break
        case 'rejected':
            style += 'bg-yellow-200'
            break
        default:
            style += ''
    }
    return style
}

const Courses = ({
    entityType,
    title,
}) => {
    return <List
        title='Courses'
        entityType='Course'
        listActions={listActions}
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        entityActions={entityActions}
        edit={CourseForm}
        separateRowForActions
    />
}

export default Courses
