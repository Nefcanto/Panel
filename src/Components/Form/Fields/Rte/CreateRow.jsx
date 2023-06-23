const createRow = (cellText) => {
    const newRow = Array.from(cellText, (value) => createTableCell(value))
    return {
        children: newRow,
        type: 'table-row',
    }
}

export default createRow
