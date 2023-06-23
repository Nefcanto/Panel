import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import {
    app,
    BooleanProperty,
    EntityAction,
    Enum,
    Image,
    List,
    Text,
    TitleSubtitle,
    ValueWithTitle,
} from 'List'
import { EntitySeo } from 'Seo'
import PageForm from './Form'
import ManageSections from '../Section/Manage'

const filters = <>
    <Text
        property='Title'
        placehodler='Title'
    />
</>

const headers = <>
    <th></th>
    <th start>Title</th>
    <th>Comments enabled?</th>
</>

const row = entity => <>
    <td>
        <Image
            url={entity.relatedItems.imageUrl}
            uploadUrl={`/page/setImage?id=${entity.id}`}
            deletionUrl={`/page/deleteImage?id=${entity.id}`}
        />
    </td>
    <td>
        <a target='_blank' href={`${app.env('SITE_URL')}/page/${entity.slug}`}>
            <TitleSubtitle
                title={<ValueWithTitle
                    value={entity.title}
                    title={entity.description}
                />}
                subtitle={entity.slug}
            />
        </a>
    </td>
    <td>
        <BooleanProperty
            value={entity.acceptsComment}
            actionUrl={`/page/toggleBoolean?id=${entity.id}&property=AcceptsComment`}
        />
    </td>
</>

const entityActions = entity => <>
    <EntitySeo
        entityType='Page'
        entityGuid={entity.guid}
    />
    <EntityAction
        title='Edit content'
        icon={TextSnippetIcon}
        goTo={`/pageContent?id=${entity.id}`}
    />
    <ManageSections pageId={entity.id} />
</>

const Pages = () => {

    return <List
        title="Pages"
        entityType="Page"
        breadcrumbItems={[
            {
                title: 'Pages',
            },
        ]}
        filters={filters}
        headers={headers}
        row={row}
        entityActions={entityActions}
        create={PageForm}
        hasEdit
        hasDelete
    />
}

export default Pages
