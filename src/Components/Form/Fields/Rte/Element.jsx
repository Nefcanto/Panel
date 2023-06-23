import ComponentElement from './ComponentElement'
import ImageElement from './ImageElement'
import Link from './Link'

// const CustomBlockQuote = ({ children, ...rest }) => {
//     return <div {...rest} className="bg-red-400 py-3 px-8 mx-auto font-italic text-3xl font-bold">{children}</div>
// }

const Gallery = (props) => {
    return (
        <div id={props.slug}>{props.name}</div>
    )
}
const components = {
    Gallery
}

const Element = (props) => {

    const {
        attributes,
        children,
        element,
    } = props

    const ComponentCreator = (element) => {

        const Component = components[element.componentName]
        const attributes = {}
        element.attributes.forEach(({ name, value }) => {
            attributes[name] = value
        })
        return <Component {...attributes} />
    }

    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        // return <CustomBlockQuote {...attributes}>{children}</CustomBlockQuote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'heading-three':
            return <h3 {...attributes}>{children}</h3>
        case 'heading-four':
            return <h4 {...attributes}>{children}</h4>
        case 'list-entity':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'image':
            return <ImageElement
                attributes={attributes}
                element={element}>
                {children}
            </ImageElement>
        case 'link':
            return <Link
                className="text-blue-400"
                {...props}
            >{children}</Link>

        case 'table':
            return (
                <table className="border">
                    <tbody {...attributes}>{children}</tbody>
                </table>
            )
        case 'table-row':
            return <tr  {...attributes}>{children}</tr>
        case 'table-cell':
            return <td className="border px-1" {...attributes}>{children}</td>
        case 'component':
            return <ComponentElement
                {...attributes}
                element={element}
            >{children}
                {ComponentCreator(element)}
            </ComponentElement>
        default:
            return <p {...attributes}>{children}</p>
    }
}

export default Element
