import {
    BooleanProperty,
    ImageTd,
    List,
    Title,
    TitleSort,
    TitleSubtitle,
    ValueWithTitle,
} from 'List'
import TagForm from './Form'
import { EntitySeo } from 'Seo'

const filters = <>
    <Title />
</>

const sorts = [
    ...TitleSort
]

const headers = <>
    <th></th>
    <th start>Title</th>
    <th>Is active?</th>
</>

const row = entity => <>
    <ImageTd
        url={entity.relatedItems.imageUrl}
        uploadUrl={`/tag/setImage?tagId=${entity.id}`}
    />
    <td>
        <TitleSubtitle
            title={
                <ValueWithTitle
                    value={entity.title}
                    title={entity.description}
                />}
            subtitle={entity.slug}
        />
    </td>
    <td>
        <BooleanProperty
            value={entity.isActive}
            actionUrl={`/tag/toggleBoolean?id=${entity.id}&property=IsActive`}
        />
    </td>
</>

const entityActions = entity => <>
    <EntitySeo
        entityType='Tag'
        entityGuid={entity.guid}
    />
</>

const Tags = (
    {
        entityType,
        ...rest
    }) => {
    return <List
        title='Tags'
        entityType={entityType || 'Tag'}
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        entityActions={entityActions}
        upsert={TagForm}
        hasEdit
        hasDelete
        {...rest}
    // separateRowForActions
    />
}

export default Tags
