import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
    createTheme,
    ThemeProvider,
} from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import Panel from './Panel/Panel'
import app from 'App'
import { get } from 'App'
import './index.css'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateField } from '@mui/x-date-pickers/DateField'
import { TimeField } from '@mui/x-date-pickers/TimeField'

const faTheme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: [
            'IRANSansX'
        ]
    }
})

const arTheme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: [
            'Noto Kufi Arabic'
        ]
    }
})

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
})

const renderReact = () => {
    const container = document.getElementById('root')
    const root = createRoot(container)
    if (app.isRtl()) {
        let adapter = AdapterDateFns
        if (app.getLocale().key === 'fa') {
            adapter = AdapterDateFnsJalali
        }
        else if (app.getLocale().key === 'ar') {
            adapter = AdapterDateFns
        }
        let theme = faTheme
        if (app.getLocale().key === 'ar') {
            theme = arTheme
        }
        root.render(
            <StrictMode>
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={adapter}>
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                {/* <DatePicker />
                                <DateField label="Date" defaultValue={new Date('2022-04-17')} />
                                <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} /> */}
                                <Panel />
                            </ThemeProvider>
                        </CacheProvider>
                    </LocalizationProvider>
                </BrowserRouter>
            </StrictMode>
        )
    }
    else {
        root.render(
            <StrictMode>
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {/* <DateTimePicker />
                        <DatePicker />
                        <DateField label="Date" defaultValue={new Date('2022-04-17')} />
                        <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} /> */}
                        <Panel />
                    </LocalizationProvider>
                </BrowserRouter>
            </StrictMode>
        )
    }
}

const render = () => {
    app.configPusher()
    get('/locale/data')
        .then(data => {
            app.setTranslations(data.translations)
            app.setLocale(data.locale)
            document.dir = data.locale.isRtl ? "rtl" : "ltr"
            renderReact()
        }, error => {
            console.error(error)
            renderReact()
            alert(error)
        })
}

window.app = app
window.enums = {}

if (import.meta.env.VITE_SECURITY === 'off') {
    render()
}
else {
    app.checkLogin(
        () => {
            render()
        }
    )
}
