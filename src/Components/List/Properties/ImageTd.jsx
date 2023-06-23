import { useContext } from 'react'
import {
    ListContext,
    TableContext,
} from 'Contexts'
import Image from './Image'

const ImageTd = (props) => {

    const { hasMoreRoom } = useContext(TableContext) || {}
    const { separateRowForActions } = useContext(ListContext)

    return <td className={hasMoreRoom ? (separateRowForActions ? "w-32 relative" : "w-16") : "w-16"}>
        <Image {...props} />
    </td>
}

export default ImageTd
