import { forwardRef } from 'react'

const Menu = forwardRef((
    {
        className,
        ...props
    }, ref) => (
    <div
        {...props}
        ref={ref}
        className={className}
    />
))

export default Menu
