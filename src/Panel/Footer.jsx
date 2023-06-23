import { useContext } from 'react'
import Collapse from '@mui/material/Collapse'
import app from 'App'
import { PanelContext } from 'Contexts'
import DevMode from './DevMode'

const Footer = () => {

    const { maximized } = useContext(PanelContext)

    return <Collapse in={!maximized}>
        <div
            id='footer'
            className="h-10 flex items-center justify-center text-sm font-semibold text-gray-700 mt-4 gap-4"
        >
            <span>{app.t("Copyright")} @ {app.getLocalizedYear(app.getLocale().localeKey)}</span>
            <DevMode />
        </div>
    </Collapse>
}

export default Footer
