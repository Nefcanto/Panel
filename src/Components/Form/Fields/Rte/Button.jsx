import { forwardRef } from 'react'

const Button = forwardRef((
    {
        active,
        className,
        reversed,
        ...props
    }, ref) => (
    <span
        {...props}
        ref={ref}
        className={"cursor-pointer ms-5 " + (reversed ? (active ? "text-white" : "text-gray-400") : (active ? "text-zinc-900" : "text-gray-300")) + " " + className}
    />
))

export default Button
