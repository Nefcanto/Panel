import { useSlate } from 'slate-react'
import Button from './Button'
import HolismIcon from '../../../HolismIcon'
import isBlockActive from './IsBlockActive'
import toggleBlock from './ToggleBlock'

const BlockButton = ({ format, icon, title }) => {
    const editor = useSlate()
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
            title={title}
        >
            <HolismIcon icon={icon} />
        </Button>
    )
}

export default BlockButton
