import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import {
    EntityAction,
    post,
} from 'List'

const AddToCart = ({
    entityGuid,
    entityType,
}) => {

    const addToCart = ({
        error,
        setEntity,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post(`/order/addToCart?entityType=${entityType}&entityGuid=${entityGuid}`)
            .then(data => {
                success('Added to cart')
                setProgress(false)
                trigger('cartUpdated', data)
            }, e => {
                error(e)
                setProgress(false)
            })
    }

    return <EntityAction
        title='Add to cart'
        icon={AddShoppingCartIcon}
        click={addToCart}
    />

}

export default AddToCart
