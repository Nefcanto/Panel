import {
    useEffect,
    useState,
} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
    HeaderAction,
    HolismIcon,
} from 'Panel'
import { get } from 'App'

const MiniCart = () => {

    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        get('/order/getTotalCartQuantity').then(data => setQuantity(data.totalQuantity))
    }, [])

    useEffect(() => {
        on('cartUpdated', cart => {
            let totalQuantity = 0
            for (let i = 0; i < cart.orderLines.length; i++) {
                totalQuantity += cart.orderLines[i].quantity
            }
            setQuantity(totalQuantity)
        })
    })

    return <HeaderAction
        title='Cart'
        url='/cart'
        show={<span className="relative">
            <HolismIcon icon={ShoppingCartIcon} />
            {quantity > 0 && <span className="absolute flex items-center justify-center w-4 bg-red-600 text-white -top-3 -start-2 rounded-full text-xs">{quantity}</span>}
        </span>}
    />
}

export default MiniCart
