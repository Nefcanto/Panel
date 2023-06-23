import {
    Editor,
    Element as SlateElement,
    Path,
    Range,
    Transforms,
} from 'slate'

export class TableUtils {
    constructor(editor) {
        this.editor = editor
    }
    insertTable = (rows, columns) => {

        const [tableNode] = Editor.nodes(this.editor, {
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table',
            mode: 'highest',
        })

        if (tableNode) return
        if (!rows || !columns) {
            return
        }
        //Creating a 2-d array of blank string as default text for the table
        const cellText = Array.from({ length: rows }, () => Array.from({ length: columns }, () => ""))
        const newTable = createTableNode(cellText, rows, columns)

        Transforms.insertNodes(this.editor, newTable, {
            mode: 'highest'
        })
        Transforms.insertNodes(this.editor, { type: 'paragraph', children: [{ text: "" }] }, { mode: 'highest' })
    }

    removeTable = () => {
        Transforms.removeNodes(this.editor, {
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table',
            // mode:'highest'
        })
    }

    insertRow = (action) => {
        const { selection } = this.editor

        if (!!selection && Range.isCollapsed(selection)) {
            const [tableNode] = Editor.nodes(this.editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table-row',
            })
            if (tableNode) {
                const [[table, tablePath]] = Editor.nodes(this.editor, {
                    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table',
                })
                const [, currentRow] = tableNode
                const path = action === 'after' ? Path.next(currentRow) : currentRow
                Transforms.insertNodes(this.editor, createRow(Array(table.columns).fill('')), {
                    at: path,
                })
                Transforms.setNodes(this.editor, { rows: table.rows + 1 },
                    {
                        at: tablePath
                    })
            }
        }
    }

    insertColumn = (action) => {
        const { selection } = this.editor
        if (!!selection && Range.isCollapsed(selection)) {
            const [tableNode] = Editor.nodes(this.editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table-cell',
            })
            if (tableNode) {
                const [[table, tablePath]] = Editor.nodes(this.editor, {
                    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table',
                })
                const [, currentCell] = tableNode
                const startPath = action === 'after' ? Path.next(currentCell) : currentCell

                // The last two indices of the path represents the row and column. We need to add one cell to each row starting from the first row
                startPath[startPath.length - 2] = 0
                for (let row = 0; row < table.rows; row++) {
                    Transforms.insertNodes(this.editor, createTableCell(''), {
                        at: startPath
                    })
                    startPath[startPath.length - 2]++
                }

                Transforms.setNodes(this.editor, { columns: table.columns + 1 },
                    {
                        at: tablePath
                    })
            }
        }
    }
}
