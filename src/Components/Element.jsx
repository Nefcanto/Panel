const Element = ({
    attributes,
    children,
    text,
    type,
    ...rest
}) => {

    if (text) {
        return <span {...attributes} {...rest} className={`${Object.getOwnPropertyNames(rest).reduce((a, b) => `${a} ${b}`, '')} `}>{text}</span>
    }

    const childElements = children?.map(child => {
        return <Element {...child} />
    })

    switch (type) {
        case 'block-quote':
            return <blockquote {...attributes}>
                {childElements}
            </blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>
                {childElements}
            </ul>
        case 'heading-one':
            return <h1 {...attributes}>
                {childElements}
            </h1>
        case 'heading-two':
            return <h2 {...attributes}>
                {childElements}
            </h2>
        case 'heading-three':
            return <h3 {...attributes}>
                {childElements}
            </h3>
        case 'heading-four':
            return <h4 {...attributes}>
                {childElements}
            </h4>
        case 'list-item':
            return <li {...attributes}>
                {childElements}
            </li>
        case 'numbered-list':
            return <ol {...attributes}>
                {childElements}
            </ol>
        case 'list-entity':
            return <li {...attributes}>
                {childElements}
            </li>
        case 'paragraph':
            return <p {...attributes}>
                {childElements}
            </p>
        case 'image':
            return <img
                src={rest.url}
                alt={rest.alt}
                title={rest.title}
                {...attributes}
            />
        case 'link':
            return <a
                href={rest.href}
                target={rest.target}
                download={rest.isDownload}
                {...attributes}
            >
                {childElements}
            </a>
        default:
            return <span
                data-nonValidElement
                {...attributes}>{childElements}</span>
    }
}

export default Element
