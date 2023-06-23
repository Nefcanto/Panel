import { forwardRef } from 'react'

const UploadButton = forwardRef((
    {
        active,
        children,
        className,
        onChange,
        reversed,
        title,
        ...props
    }, ref) => {
    return <div
        className="relative inline"
        title={title}
    >
        <>
            <input
                onChange={onChange}
                ref={ref}
                type="file"
                id="imageUpload"
                className="hidden"
            />
            <label
                htmlFor='imageUpload'
                className={"cursor-pointer ms-5 " + (reversed ? (active ? "text-white" : "text-gray-400") : (active ? "text-zinc-900" : "text-gray-300"))}
            >
                {children}
            </label>
        </>
    </div>
})

export default UploadButton
