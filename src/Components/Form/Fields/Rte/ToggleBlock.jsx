import {
    Editor,
    Element as SlateElement,
    Transforms,
} from 'slate'
import isBlockActive from './IsBlockActive'
import listTypes from './ListTypes'

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = listTypes.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            listTypes.includes(n.type),
        split: true,
    })
    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-entity' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

export default toggleBlock
