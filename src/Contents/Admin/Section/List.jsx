import CategoryIcon from '@mui/icons-material/Category'
import ListAltIcon from '@mui/icons-material/ListAlt'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import TheatersIcon from '@mui/icons-material/Theaters'
import {
    Chip,
    EntityAction,
    List,
    Text,
    TitleSort,
} from 'List'
import { EntityConfigsAction } from 'Configuration'
import SectionForm from './Form'

const filters = <>
    <Text
        property='Name'
    />
</>

const sorts = [
    ...TitleSort,
    {
        caption: "Name A-Z",
        property: "Name",
        direction: "asc"
    },
    {
        caption: "Name Z-A",
        property: "Name",
        direction: "desc"
    }
]

const headers = <>
    <td superAdmin>Key</td>
    <td>Name</td>
</>

const row = entity => {
    return <>
        <td superAdmin>{entity.key}</td>
        <td>{entity.name}</td>
    </>
}

const entityActions = entity => <>
    {
        entity?.relatedItems?.configs?.sectionHasItems &&
        <EntityAction
            title='Manage items'
            icon={ListAltIcon}
            goTo={`/section/items?sectionId=${entity.id}`}
        />
    }
    {
        entity?.relatedItems?.configs?.sectionHasContent &&
        <EntityAction
            title='Edit content'
            icon={TextSnippetIcon}
            goTo={`/section/content?id=${entity.id}`}
        />
    }
    <EntityConfigsAction
        entityType={entity.relatedItems.entityType}
        entityGuid={entity.guid}
        superAdmin
    />
    <EntityAction
        title='Manage parts'
        icon={CategoryIcon}
        goTo={`/sectionParts?sectionId=${entity.id}`}
        superAdmin
    />
    {
        entity.relatedItems.hasBlobs &&
        <EntityAction
            title='Edit media'
            icon={TheatersIcon}
            goTo={`/section/blobs?sectionId=${entity.id}&parentEntityType=section&parentId=${entity.id}`}
        />
    }
    {
        entity.relatedItems.hasData &&
        <EntityAction
            title='Edit data'
            icon={TextFieldsIcon}
            goTo={`/section/data?sectionId=${entity.id}`}
        />
    }
</>

const Sections = ({ isSuperAdmin }) => {
    return <List
        title='Sections'
        subtitle='Manage sections of your website here'
        entityType='Section'
        breadcrumbItems={[
            {
                title: 'Sections',
            }
        ]}
        create={isSuperAdmin && SectionForm}
        filters={filters}
        sorts={sorts}
        headers={headers}
        row={row}
        entityActions={entityActions}
        hasDelete={isSuperAdmin}
        hasEdit={isSuperAdmin}
        separateRowForActions={isSuperAdmin}
    />
}

export default Sections
