const createTableCell = (text) => {
    return {
        type: 'table-cell',
        children: [{
            type: 'paragraph',
            children: [{ text }]
        }]
    }
}

export default createTableCell
