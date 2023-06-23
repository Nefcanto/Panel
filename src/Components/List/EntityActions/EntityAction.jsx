import {
    useContext,
    useEffect,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import {
    DialogContext,
    ListContext,
} from 'Contexts'
import { useMessage } from 'Hooks'
import {
    app,
    HolismIcon,
    Unify,
} from 'List'

const EntityAction = ({
    click,
    closeMenu,
    color,
    dialog,
    entity,
    goTo,
    hoverOnly,
    icon,
    reload,
    superAdmin,
    title,
    ...rest
}) => {

    const navigate = useNavigate()
    const { success, error } = useMessage()
    const {
        entityType,
        menuForActions,
        reloadEntity,
        setEntity,
        setEntityActionProgress,
    } = useContext(ListContext)
    const [open, setOpen] = useState(false)

    const iconStyles = "text-gray-500 group-hover:text-blue-500 dark:text-zinc-500 dark:group-hover:text-blue-500"

    const handleClick = (e) => {

        app.selectedItem = entity
        if (goTo) {
            app.selectedItem = entity
            let url = goTo
            if (typeof goTo === 'function') {
                url = goTo(entity)
            }
            if (url.startsWith('http')) {
                window.open(url, '_blank', 'Video')
            }
            else {
                navigate(url)
            }
        }
        else if (click && typeof click === 'function') {
            click({
                e,
                entity,
                error,
                reload,
                setEntity,
                setProgress,
                success,
            })
        }
        else if (dialog) {
            setOpen(true)
        }
        else {
            console.warn(`No action is assigned to entity action. Title is '${title}'`)
        }
        e.stopPropagation()
        e.preventDefault()
        e.nativeEvent.stopPropagation()
        e.nativeEvent.preventDefault()
    }

    const [progress, setProgress] = useState(false)

    useEffect(() => {
        if (setEntityActionProgress) {
            setEntityActionProgress(progress)
        }
    }, [progress])

    if (superAdmin && !app.isSuperAdmin()) {
        return <span className="hidden"></span>
    }

    return <DialogContext.Provider
        value={{
            entity,
            open,
            setOpen,
        }}
    >
        {
            menuForActions ?
                <>
                    <MenuItem
                        onClick={(e) => {
                            handleClick(e)
                            if (closeMenu && typeof closeMenu === 'function') {
                                // closeMenu()
                            }
                        }}
                        className="group"
                    >
                        <ListItemIcon>
                            <HolismIcon
                                icon={icon}
                                className={color || iconStyles}
                            />
                        </ListItemIcon>
                        <ListItemText>{app.t(title || "")}</ListItemText>
                    </MenuItem>
                    {
                        dialog && DialogInstanceCloned
                    }
                </>
                :
                <span className="entityAction flex items-center justify-center">
                    {
                        (progress || progress === true)
                            ?
                            <CircularProgress size={24} className="m-2" />
                            :
                            <Tooltip title={app.t(title || "")}>
                                <IconButton onClick={handleClick} className="group">
                                    {
                                        <HolismIcon
                                            icon={icon}
                                            className={color || iconStyles}
                                        />
                                    }
                                </IconButton>
                            </Tooltip>
                    }
                    {
                        dialog &&
                        <Unify
                            component={dialog}
                            entity={entity}
                            entityType={entityType}
                            reloadEntity={reloadEntity}
                            setEntity={setEntity}
                            {...rest}
                        />
                    }
                </span >
        }
    </DialogContext.Provider>
}

export default EntityAction 
