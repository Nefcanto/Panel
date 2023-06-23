import { useContext } from 'react'
import {
    ListContext,
    TableContext,
} from 'Contexts'
import Video from './Video'

const VideoTd = (props) => {

    const { hasMoreRoom } = useContext(TableContext) || {}
    const { separateRowForActions } = useContext(ListContext)

    return <td className={hasMoreRoom ? (separateRowForActions ? "w-32 relative" : "w-16") : "w-16"}>
        <Video {...props} />
    </td>
}

export default VideoTd
