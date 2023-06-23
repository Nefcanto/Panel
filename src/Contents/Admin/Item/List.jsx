import {
    useEffect,
    useState,
} from 'react'
import CategoryIcon from '@mui/icons-material/Category'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TheatersIcon from '@mui/icons-material/Theaters'
import app, { get } from 'App'
import {
    EntityAction,
    List,
    ListAction,
} from 'List'
import SectionItemForm from './Form'

const listActions = <>
    <ListAction
        title='Manage parts'
        icon={CategoryIcon}
        url={query => `/section/itemParts?${query}`}
        superAdmin
        notApplicableToEntities
    />
</>

const entityActions = entity => <>
    {
        entity.relatedItems.hasBlobs &&
        <EntityAction
            title='Edit media'
            icon={TheatersIcon}
            goTo={`/section/item/blobs?sectionId=${entity.sectionId}&itemId=${entity.id}&parentEntityType=item&parentId=${entity.id}`}
        />
    }
    {
        entity.relatedItems.hasData &&
        <EntityAction
            title='Edit data'
            icon={TextFieldsIcon}
            goTo={`/section/item/data?sectionId=${entity.sectionId}&itemId=${entity.id}&parentEntityType=item&parentId=${entity.id}`}
        />
    }
</>

const Items = ({
    isSuperAdmin,
    setProgress,
}) => {

    const { sectionId } = app.parseQuery()
    const [section, setSection] = useState()

    useEffect(() => {
        setProgress(true)
        get(`/section/get/${sectionId}`)
            .then(data => {
                setProgress(false)
                setSection(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }, [])

    return section && <List
        title='Section items'
        subtitle='Parts are non-repeating, while items are repeating'
        entityType='SectionItem'
        breadcrumbItems={[
            {
                title: `${section.name}`,
                link: `/sections?name=${section.name}`
            },
            {
                title: 'Items',
            }
        ]}
        listActions={listActions}
        numbered
        entityActions={entityActions}
        create={(isSuperAdmin || section?.relatedItems?.configs?.variableSectionItems) && SectionItemForm}
        hasDelete={isSuperAdmin || section?.relatedItems?.configs?.variableSectionItems}
    />
}

export default Items
