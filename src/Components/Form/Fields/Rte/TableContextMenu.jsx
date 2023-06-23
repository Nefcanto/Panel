import { useState } from 'react'
import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import insertColumnLeft from './InsertColumnLeft'
import insertColumnRight from './InsertColumnRight'
import insertRowAbove from './InsertRowAbove'
import insertRowBelow from './InsertRowBelow'
import { TableUtils } from './TableUtils'
import trashCan from './TrashCan'
import useContextMenu from './UseContextMenu'
import HolismIcon from '../../../HolismIcon'

const TableContextMenu = (props) => {
    const { editor } = props
    const [selection, setSelection] = useState()
    const [showMenu, { top, left }] = useContextMenu(editor, 'table', setSelection)
    const table = new TableUtils(editor)

    const menu = [
        {
            icon: insertColumnRight,
            text: 'Insert Columns to the Right',
            action: {
                type: 'insertColumn',
                position: 'after'
            }
        },
        {
            icon: insertColumnLeft,
            text: 'Insert Columns to the Left',
            action: {
                type: 'insertColumn',
                position: 'at'
            }
        },
        {
            icon: insertRowAbove,
            text: 'Insert Row Above',
            action: {
                type: 'insertRow',
                positon: 'at'
            }
        },
        {
            icon: insertRowBelow,
            text: 'Insert Row Below',
            action: {
                type: 'insertRow',
                position: 'after'
            }
        },
        {
            icon: trashCan,
            text: 'Remove Table',
            action: {
                type: 'remove'
            }
        }
    ]

    const handleInsert = ({ type, position }) => {
        Transforms.select(editor, selection)
        switch (type) {
            case 'insertRow':
                table.insertRow(position)
                break
            case 'insertColumn':
                table.insertColumn(position)
                break
            case 'remove':
                table.removeTable()
                break
            default:
                return

        }
        ReactEditor.focus(editor)
    }

    return (
        showMenu &&
        <div
            className='contextMenu w-fit h-fit fixed z-20 bg-white border border-slate-200 ronded-md p-[0.5%] flex gap-4 flex-col cursor-pointer'
            style={{ top, left }}>
            {
                menu.map(({ icon, text, action }, index) =>
                    <div
                        className='menuOption flex gap-4'
                        key={index}
                        onClick={() => handleInsert(action)}>
                        <HolismIcon icon={icon} />
                        <span>{text}</span>
                    </div>
                )
            }
        </div>
    )
}

export default TableContextMenu
