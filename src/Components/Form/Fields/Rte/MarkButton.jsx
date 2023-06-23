import { Editor } from 'slate'
import { useSlate } from 'slate-react'
import Button from './Button'
import HolismIcon from '../../../HolismIcon'

const MarkButton = ({
    format,
    icon,
    text,
    title,
}) => {

    const editor = useSlate()

    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        if (marks) {
            // console.log(marks, marks[format], format)
            return marks[format] === true
        }
        return false
    }

    const toggleMark = (editor, format) => {
        const isActive = isMarkActive(editor, format)

        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    }

    return <Button
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
            event.preventDefault()
            toggleMark(editor, format)
        }}
        title={title}
    >
        <HolismIcon icon={icon} />
        {text}
    </Button>
}

export default MarkButton
