import {
  BooleanProperty,
  DateTimeTitleAgo,
  Enum,
  EnumProperty,
  ImageTd,
  List,
  Text,
  TitleSubtitle,
  UploadVideoAction,
  ValueWithTitle,
} from 'List'
import {
  ManageHierarchies,
  ManageTags,
} from 'Taxonomy'
import { EntitySeo } from 'Seo'
import EditForm from './EditForm'
import CreateForm from './CreateForm'

const filters = <>
  <Text
    property='Title'
    placehodler='Title'
  />
  <Enum
    property='StateId'
    placeholder='State'
    entityType='VlogState'
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
      url={entity.relatedItems.thumbnailUrl}
      uploadUrl={`/vlogVideo/setImage?id=${entity.id}&property=ThumbnailGuid`}
      deletionUrl={`/vlogVideo/deleteImage?id=${entity.id}&property=ThumbnailGuid`}
    />
    <td>
      <TitleSubtitle
        title={<ValueWithTitle
          value={entity.title.cut(30)}
          title={entity.description}
        />}
        subtitle={entity.slug}
      />

    </td>
    <td>
      <DateTimeTitleAgo
        date={entity.lastUpdateUtcDate || entity.utcDate}
        ago={entity.relatedItems.lastUpdateTimeAgo || entity.relatedItems.timeAgo}
      />
    </td>
    <td>
      <EnumProperty
        enumeration='VlogState'
        property='StateId'
        styleProvider={styleProvider}
        currentKey={entity.relatedItems.stateKey}
        currentStyle={styleProvider(entity.relatedItems.stateKey)}
        actionUrl={`/vlogVideo/changeState/${entity.id}`}
      />
    </td>
    <td>
      <BooleanProperty
        value={entity.acceptsComment}
        actionUrl={`/vlogVideo/toggleBoolean?id=${entity.id}&property=AcceptsComment`}
      />
    </td>
  </>
}

const entityActions = entity => <>
  <EntitySeo
    entityType='VlogVideo'
    entityGuid={entity.guid}
  />
  <ManageTags
    entityType='VlogVideo'
    entityGuid={entity.guid}
  />
  <ManageHierarchies
    title='Manage categories'
    entityType='VlogVideo'
    entityGuid={entity.guid}
  />
  <UploadVideoAction
    title='Upload Video'
    uploadUrl={`/vlogVideo/setVideo?id=${entity.id}`}
  />
</>

const Videos = () => {
  return <List
    title='Vlog Videos'
    entityType='VlogVideo'
    breadcrumbItems={[
      {
        title: 'Vlog'
      }
    ]}
    filters={filters}
    create={CreateForm}
    headers={headers}
    row={row}
    edit={<EditForm />}
    entityActions={entityActions}
    hasDelete
    separateRowForActions
  />
}

export default Videos
