import {
    Editor,
    Element as SlateElement,
    Transforms,
} from 'slate'

const removeLink = (editor) => {
    Transforms.unwrapNodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link'
    })
}

export default removeLink
