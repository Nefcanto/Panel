import { forwardRef } from 'react'

const Instruction = forwardRef((
    {
        className,
        ...props
    }, ref) => (
    <div
        {...props}
        ref={ref}
    />
))

export default Instruction
