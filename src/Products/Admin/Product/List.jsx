import LoyaltyIcon from '@mui/icons-material/Loyalty'
import {
    Boolean,
    BooleanProperty,
    EntityAction,
    List,
    Title,
    TitleSort,
} from 'List'
import { ManageHierarchies } from 'Taxonomy'
import { ManageImages } from 'Media'
import ProductForm from './Form'
import ChangeBrand from './ChangeBrand'
import BrandFilter from '../Brand/Filter'
import ContentEntityAction from '../../Common/ContentEntityAction'
import ImageTd from '../../Common/ImageTd'
import ProductTitle from '../../Common/Title'

const filters = <>
    <Title />
    <BrandFilter />
    <Boolean property='Featured' />
    <Boolean property='Intangible' />
</>

const sorts = [
    ...TitleSort
]

const headers = (augmenter) => <>
    <th></th>
    <th start>Title</th>
    <th>Intangible</th>
    <th>Featured</th>
    {augmenter && augmenter}
</>

const row = (augmenter) => entity => <>
    {ImageTd(entity)}
    <td>
        {ProductTitle(entity)}
    </td>
    <td>
        <BooleanProperty
            value={entity.intangible}
            actionUrl={`/product/toggleBoolean?id=${entity.id}&property=Intangible`}
        />
    </td>
    <td>
        <BooleanProperty
            value={entity.featured}
            actionUrl={`/product/toggleBoolean?id=${entity.id}&property=Featured`}
        />
    </td>
    {augmenter && augmenter(entity)}
</>

const entityActions = (augmenter) => entity => {
    return <>
        <ManageImages
            entityType={entity.relatedItems.entityType}
            entityGuid={entity.guid}
        />
        <ManageHierarchies
            title='Manage categories'
            entityType='Product'
            entityGuid={entity.guid}
        />
        {ContentEntityAction(entity)}
        <EntityAction
            title='Change brand'
            icon={LoyaltyIcon}
            dialog={ChangeBrand}
        />
        {augmenter && augmenter(entity)}
    </>
}

const Products = ({
    entityActionsAugmenter,
    entityType,
    headersAugmenter,
    rowAugmenter,
    title,
    ...rest
}) => {
    return <List
        title={title || 'Products'}
        entityType={entityType || 'Product'}
        filters={filters}
        sorts={sorts}
        headers={headers(headersAugmenter)}
        row={row(rowAugmenter)}
        entityActions={entityActions(entityActionsAugmenter)}
        upsert={ProductForm}
        hasDelete
        hasEdit
        separateRowForActions
        {...rest}
    />
}

export default Products
