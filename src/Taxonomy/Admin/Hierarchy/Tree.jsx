import {
    Image,
    Text,
    TitleSubtitle,
    Tree,
    ValueWithTitle,
} from 'List'
import Form from './Form'
import { EntitySeo } from 'Seo'

const filters = <>
    <Text
        property="Title"
        placeholder="Title"
    />
</>

const entityActions = entity => <>
    <EntitySeo
        entityType='Hierarchy'
        entityGuid={entity.guid}
    />
</>

const HierarchyTree = ({
    title,
    entityType,
    ...rest
}) => {

    return <Tree
        title={title || 'Hierarchies'}
        entityType={entityType || 'Hierarchy'}
        filters={filters}
        show={entity => {
            return <>
                <div className="flex items-center gap-4">
                    <Image
                        url={entity.relatedItems.imageUrl}
                        uploadUrl={`/${entityType || 'hierarchy'}/setImage?id=${entity.id}`}
                        deletionUrl={`/${entityType || 'hierarchy'}/deleteImage?id=${entity.id}`}
                    />
                    <div>
                        <a target='_blank' href={`${app.env('SITE_URL')}/hierarchy/${entity.slug}`}>
                            <TitleSubtitle
                                title={<ValueWithTitle
                                    value={entity.title.cut(30)}
                                    title={entity.description}
                                />}
                                subtitle={entity.slug}
                            />
                        </a>
                    </div>
                </div>
            </>
        }}
        entityActions={entityActions}
        upsert={Form}
        hasEdit
        hasDelete
        {...rest}
    />
}

export default HierarchyTree
