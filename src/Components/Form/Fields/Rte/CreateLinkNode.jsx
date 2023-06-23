const createLinkNode = (href, showInNewTab, isDownload, text) => {

    return ({
        children: [{ text }],
        href,
        isDownload: isDownload,
        target: showInNewTab ? '_blank' : '_self',
        type: 'link',
    })
}

export default createLinkNode
