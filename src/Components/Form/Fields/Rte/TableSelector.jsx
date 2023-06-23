import GridOnIcon from '@mui/icons-material/GridOn'
import React, {
    useEffect,
    useRef,
    useState,
} from 'react'
import { Transforms } from 'slate'
import { TableUtils } from './TableUtils'
import usePopup from './UsePopup'
import HolismIcon from '../../../HolismIcon'

const TableSelector = ({ editor }) => {
    const tableOptionsRef = useRef()
    const [selection, setSelection] = useState()
    const [showOptions, setShowOptions] = usePopup(tableOptionsRef)
    const [tableData, setTableData] = useState({
        column: 0,
        row: 0,
    })
    const [tableInput, setTableInput] = useState(Array.from({ length: 6 }, () => Array.from({ length: 6 }, (v, i) => ({
        bg: 'lightGray',
        column: i,
    }))))

    useEffect(() => {
        const newTable = Array.from({ length: 6 }, (obj, row) => Array.from({ length: 6 }, (v, col) => ({
            bg: row + 1 <= tableData.row && col + 1 <= tableData.column ? 'orange' : 'lightgray',
            column: col,
        })))
        setTableInput(newTable)
    }, [tableData])
    useEffect(() => {
        if (!showOptions) {
            setTableData({
                column: 0,
                row: 0,
            })
        }
    }, [showOptions])
    const table = new TableUtils(editor)

    const handleButtonClick = () => {
        setSelection(editor.selection)
        setShowOptions(prev => !prev)
    }
    const handleInsert = () => {
        selection && Transforms.select(editor, selection)
        setTableData({ row: -1, column: -1 })
        table.insertTable(tableData.row, tableData.column)
        setShowOptions(false)
    }
    return (
        <div
            ref={tableOptionsRef}
            className='popup-wrapper inline relative'>
            <button
                type="button"
                style={{ border: showOptions ? '1px solid lightgray' : 'none' }}
                className="ms-5"
                title='table'
                onClick={handleButtonClick}>
                <HolismIcon
                    icon={GridOnIcon}
                    className={`${showOptions ? 'text-slate-800' : 'text-slate-200'}`}
                />
            </button>
            {
                // absolute top-6 start-0 w-[150px] when add this to classname of popup secelt table is slowly 
                showOptions &&
                <div className='popup ' >
                    {
                        <span><i>{`Insert a ${tableData.row >= 1 ? `${tableData.row} x ${tableData.column}` : ''} table`}</i></span>
                    }
                    <div className='table-input grid grid-rows-[auto_auto_auto_auto_auto_auto] grid-cols-[auto_auto_auto_auto_auto_auto] w-28'>
                        {
                            tableInput.map((grp, row) =>
                                grp.map(({ column, bg }, col) =>
                                    <div
                                        key={row + col}
                                        onClick={() => handleInsert()}
                                        onMouseOver={() => setTableData({ row: row + 1, column: column + 1 })}
                                        className='table-unit w-4 h-4'
                                        style={{ border: `1px solid ${bg}` }}></div>
                                )
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default TableSelector
