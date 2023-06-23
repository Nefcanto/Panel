import MuiButton from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { HolismIcon } from 'Panel'

const Button = ({
    className,
    click,
    color,
    disabled,
    icon,
    progress,
    small,
    text,
    title,
}) => {
    if (icon && !text) {
        return <IconButton
            color={color || "primary"}
            component="span"
            className={className}
            disabled={disabled}
        >
            <HolismIcon
                icon={icon}
            />
        </IconButton>
    }
    return <MuiButton
        startIcon={<HolismIcon icon={icon} />}
        variant='outlined'
        disabled={disabled}
        onClick={click}
        color={color}
        className={className}
        size={small && "small"}
    >
        {text}
    </MuiButton>
}

export default Button
