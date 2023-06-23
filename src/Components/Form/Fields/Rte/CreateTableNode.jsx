const createTableNode = (cellText, rows, columns) => {
    const tableChildren = Array.from(cellText, (value) => createRow(value))
    let tableNode = {
        type: 'table',
        children: tableChildren,
        rows,
        columns
    }
    return tableNode
}

export default createTableNode
