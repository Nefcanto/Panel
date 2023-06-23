import {
    Editor,
    Path,
    Range,
    Transforms,
} from 'slate'
import createLinkNode from "./CreateLinkNode"

const insertLink = (editor, {
    isDownload,
    showInNewTab,
    url,
}) => {
    if (!url) return

    const { selection } = editor
    const link = createLinkNode(url, showInNewTab, isDownload, 'Link')
    if (!!selection) {
        const [parent, parentPath] = Editor.parent(editor, selection.focus.path)
        if (parent.type === 'link') {
            removeLink(editor)
        }

        if (editor.isVoid(parent)) {
            Transforms.insertNodes(editor,
                { type: 'paragraph', children: [link] },
                {
                    at: Path.next(parentPath),
                    select: true
                }

            )
        }
        else if (Range.isCollapsed(selection)) {
            Transforms.insertNodes(editor, link, { select: true })
        }
        else {
            Transforms.wrapNodes(editor, link,
                { split: true }
            )
        }
    }
    else {
        Transforms.insertNodes(editor, { type: 'paragraph', children: [link] })
    }
}

export default insertLink
