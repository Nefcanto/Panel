import { forwardRef } from 'react'

const EditorValue = forwardRef((
    {
        className,
        value,
        ...props
    }, ref) => {
    const textLines = value.document.nodes
        .map(node => node.text)
        .toArray()
        .join('\n')
    return (
        <div
            ref={ref}
            {...props}
            className="mt-[30px] -mb-[20px]">
            <div>
                Slate's value as text
            </div>
            <div>
                {textLines}
            </div>
        </div>
    )
})

export default EditorValue
