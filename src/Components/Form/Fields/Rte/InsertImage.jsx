import { Transforms } from 'slate'

export const insertImage = (editor, embedData, format) => {
    const text = { text: "" }
    const { url, alt, title } = embedData
    const image = { type: format, url, alt, title, children: [text] }
    if (!url) return
    Transforms.insertNodes(editor, image)
}

export default insertImage
