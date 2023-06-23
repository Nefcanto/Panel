import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import {
    EntityAction,
    ImageTd,
    List,
    SvgProperty,
    Text,
    TitleSubtitle,
    ValueWithTitle,
} from 'List'
import { ManageImages } from 'Media'
import BrandForm from './Form'

const filters = <>
    <Text
        property='Name'
    />
</>

const sorts = [
    {
        caption: "Name A-Z",
        property: 'Name',
        direction: 'asc'
    },
    {
        caption: 'Name Z-A',
        property: 'Name',
        direction: 'desc'
    }
]

const headers = <>
    <th></th>
    <th>Name</th>
    <th>SVG</th>
</>

const row = entity => <>
    <ImageTd
        url={entity.relatedItems.logoUrl}
        uploadUrl={`/brand/setImage?id=${entity.id}&property=LogoGuid`}
        deletionUrl={`/brand/deleteImage?id=${entity.id}&property=LogoGuid`}
    />
    <td>
        <a target='_blank' href={`${app.env('SITE_URL')}/brand/${entity.slug}`}>
            <TitleSubtitle
                title={<ValueWithTitle
                    value={entity.name?.cut(30)}
                    title={entity.summary}
                />}
                subtitle={entity.slug}
            />
        </a>
    </td>
    <td>
        <SvgProperty
            value={entity.logoSvg}
            actionUrl={`/brand/setSvg?id=${entity.id}`}
        />
    </td>
</>

const entityActions = entity => {
    return <>
        <ManageImages
            entityType={entity.relatedItems.entityType}
            entityGuid={entity.guid}
        />
        <EntityAction
            title='Edit content'
            icon={TextSnippetIcon}
            goTo={`/brandContent?id=${entity.id}`}
        />
    </>
}

const Brands = () => {
    return <List
        title='Brands'
        entityType='Brand'
        create={BrandForm}
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        entityActions={entityActions}
        hasEdit
        hasDelete
    />
}

export default Brands
