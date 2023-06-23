import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import {
    app,
    BooleanProperty,
    DateTimeTitleAgo,
    EntityAction,
    Enum,
    EnumProperty,
    ImageTd,
    List,
    Text,
    TitleSubtitle,
    ValueWithTitle,
} from 'List'
import PostForm from './Form'
import {
    ManageHierarchies,
    ManageTags,
} from 'Taxonomy'
import { EntitySeo } from 'Seo'
import { ViewComments } from 'Social'

const filters = <>
    <Text
        property='Title'
        placehodler='Title'
    />
    <Enum
        property='StateId'
        placeholder='State'
        entityType='BlogState'
    />
</>

const headers = <>
    <th></th>
    <th start>Title</th>
    <th>Last update</th>
    <th>State</th>
    <th>Comments enabled?</th>
</>

const row = entity => {

    const styleProvider = (enumKey) => {
        switch (enumKey) {
            case "Draft":
            default:
                return "bg-red-400 text-white"
            case "Published":
                return "bg-green-400"
        }
    }

    return <>
        <ImageTd
            url={entity.relatedItems.imageUrl}
            uploadUrl={`/blogPost/setImage?id=${entity.id}`}
            deletionUrl={`/blogPost/deleteImage?id=${entity.id}`}
        />
        <td>
            <a target='_blank' href={`${app.env('SITE_URL')}/post/${entity.slug}`}>
                <TitleSubtitle
                    title={<ValueWithTitle
                        value={entity.title.cut(30)}
                        title={entity.summary}
                    />}
                    subtitle={entity.slug}
                />
            </a>
        </td>
        <td>
            <DateTimeTitleAgo
                date={entity.lastUpdateUtcDate || entity.utcDate}
                ago={entity.relatedItems.lastUpdateTimeAgo || entity.relatedItems.timeAgo}
            />
        </td>
        <td>
            <EnumProperty
                enumeration='BlogState'
                property='StateId'
                styleProvider={styleProvider}
                currentKey={entity.relatedItems.stateKey}
                currentStyle={styleProvider(entity.relatedItems.stateKey)}
                actionUrl={`/blogPost/changeState/${entity.id}`}
            />
        </td>
        <td>
            <BooleanProperty
                value={entity.acceptsComment}
                actionUrl={`/blogPost/toggleBoolean?id=${entity.id}&property=AcceptsComment`}
            />
        </td>
    </>
}

const entityActions = entity => <>
    <EntitySeo
        entityType='BlogPost'
        entityGuid={entity.guid}
    />
    <EntityAction
        title='Edit content'
        icon={TextSnippetIcon}
        goTo={`/postContent?id=${entity.id}`}
    />
    <ManageTags
        entityType='BlogPost'
        entityGuid={entity.guid}
    />
    <ManageHierarchies
        title='Manage categories'
        entityType='BlogPost'
        entityGuid={entity.guid}
    />
    <ViewComments
        entityType='BlogPost'
        entityGuid={entity.guid}
        goTo={`/postComments?parentEntityType=blogPost&parentId=${entity.id}`}
    />

</>

const BlogPosts = () => {
    return <List
        title='Posts'
        entityType='BlogPost'
        breadcrumbItems={[
            {
                title: 'Blog'
            }
        ]}
        filters={filters}
        headers={headers}
        row={row}
        hasEdit
        hasDelete
        entityActions={entityActions}
        separateRowForActions
        create={PostForm}
    // menuForActions
    // dialogs={[PostForm, ManageTags]}
    />
}

export default BlogPosts
