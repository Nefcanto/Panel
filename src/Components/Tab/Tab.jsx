import MuiTab from '@mui/material/Tab'

const Tab = ({
    icon,
    panel,
    title,
}) => {
    const Icon = icon;
    return <MuiTab
        label={title}
        icon={icon ? <Icon /> : null}
    />
}

export default Tab
