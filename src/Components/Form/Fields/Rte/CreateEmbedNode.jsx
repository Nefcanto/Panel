const createEmbedNode = (type, {
    url,
    alt = "image"
}) => ({
    alt,
    children: [{ text: "" }],
    type,
    url,
})
export default createEmbedNode
