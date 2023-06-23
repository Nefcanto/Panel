import app from 'App'

const Chip = ({
    className,
    onClick,
    text,
}) => {
    return <span
        className={"py-1 px-3 rounded-full text-xs inline-block " + className}
        onClick={() => {
            onClick instanceof Function && onClick()
        }}
    >
        {app.t(text)}
    </span>
}

export default Chip 
