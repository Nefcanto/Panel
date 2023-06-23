import {
    useEffect,
    useState,
} from 'react'
import useFormat from './UseFormat'

const useContextMenu = (editor, format, setSelection) => {
    const isFormat = useFormat(editor, format)
    const [showMenu, setShowMenu] = useState(false)
    const [menuLocation, setMenuLocation] = useState({
        left: '0px',
        top: '0px',
    })

    const handleClick = () => {
        setShowMenu(false)
    }
    const handleContextMenu = (e) => {
        if (!isFormat) return
        setSelection(editor.selection)
        e.preventDefault()
        setShowMenu(true)
        const xPos = e.pageX + "px"
        const yPos = e.pageY + "px"
        setMenuLocation({
            left: xPos,
            top: yPos,
        })
    }
    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('contextmenu', handleContextMenu)

        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('contextmenu', handleContextMenu)
        }
    }, [isFormat])

    return [showMenu, menuLocation]
}

export default useContextMenu
