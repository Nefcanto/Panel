import { Transforms } from 'slate'
import createEmbedNode from './CreateEmbedNode'

const insertEmbed = (editor, embedData, format) => {
    const { url } = embedData
    if (!url) return
    const embed = createEmbedNode(format, embedData)
    Transforms.insertNodes(editor, embed, { select: true })
}

export default insertEmbed
