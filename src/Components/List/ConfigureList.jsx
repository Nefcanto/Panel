import {
    useContext,
    useEffect,
    useState,
} from 'react'
import Tooltip from '@mui/material/Tooltip'
import SettingsIcon from '@mui/icons-material/Settings'
import {
    DialogContext,
    ListContext,
} from 'Contexts'
import Dialog from '../Dialog/Dialog'
import OkCancel from '../Dialog/OkCancel'

const ConfigureList = () => {

    const [open, setOpen] = useState(false)

    const {
        filters,
        hasFilters,
        isFilteringOpen,
        setIsFilteringOpen,
        listActionIconStyle
    } = useContext(ListContext)

    const dialog = <DialogContext.Provider
        value={{
            open,
            setOpen,
        }}
    >
        <Dialog
            title='Configure list'
            content={<div>hi</div>}
        />
    </DialogContext.Provider>

    return <span
        id='configureList'
        className={'relative ' + listActionIconStyle}
        onClick={() => setOpen(true)}
    >
        {dialog}
        <Tooltip
            title={app.t('Configure this list')}
            className="relative z-10"
        >
            <SettingsIcon />
        </Tooltip>
    </span>
}

export default ConfigureList
