import {
    useEffect,
    useState,
    version
} from 'react'
import {
    Helmet,
    HelmetProvider,
} from 'react-helmet-async'
import Skeleton from '@mui/material/Skeleton'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { Transition } from '@headlessui/react'
import app,
{
    get,
    post,
} from 'App'
import {
    PanelContext,
    TopContext,
} from 'Contexts'
import { useLocalStorageState } from 'Hooks'
import MainRouting from './MainRouting'
import Sidebar from './Sidebar'
import Header from './Header'
import Top from './Top'
import Footer from './Footer'
import Message from './Message'
import Progress from '../Components/Progress'

// https://dev.to/codeply/helpful-page-layouts-using-tailwind-css-1a3k
// import TrapFocus from '@mui/material/Unstable_TrapFocus'
// import Backdrop from '@mui/material/Backdrop'

// require('react-dom')
// window.React2 = require('react')
// if (window.React1 !== window.React2) {
//     // console.warn('two reacts outside component')
// }

const Panel = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useLocalStorageState(true, 'isSidebarOpen')
    const [isDark, setIsDark] = useLocalStorageState(false, `isDark`)
    const [maximized, setMaximized] = useLocalStorageState(false, `maximized`)

    const [params, setParams] = useState('')
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [breadcrumbItems, setBreadcrumbItems] = useState([])
    const [isFreezed, setIsFreezed] = useState(false)

    const [isMessageShown, setIsMessageShown] = useState()
    const [message, setMessage] = useState()
    const [description, setDescription] = useState()
    const [action, setAction] = useState()
    const [severity, setSeverity] = useState()

    const [progress, setProgress] = useState(false)

    const [branding, setBranding] = useState({
        brand: 'Panel',
        slogan: ''
    })
    const [fakeDataGenerators, setFakeDataGenerators] = useState([])

    const toggleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    // require('react-dom')
    // window.React2 = require('react')
    // if (window.React1 !== window.React2) {
    //     // console.warn('two reacts inside component')
    // }

    const closeMenu = () => {
        if (window.innerWidth < app.breakpoints.lg) {
            setIsSidebarOpen(false)
        }
    }

    useEffect(() => {
        if (maximized) {
            setIsSidebarOpen(false)
        }
        else {
            // setIsSidebarOpen(true)
        }
    }, [maximized])

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark')
        }
        else {
            document.body.classList.remove('dark')
        }
    }, [isDark])

    useEffect(() => {
        get('/localeConfig/branding')
            .then(data => {
                setBranding(data)
            }, e => {
                console.error(e)
            })
    }, [])

    useEffect(() => {
        get('/system/fakeDataGenerators')
            .then(data => {
                setFakeDataGenerators(data)
            }, e => {
                console.error(e)
            })
    }, [])

    useEffect(() => {
        post('/user/sync').then(data => { }, e => { console.log(e) })
    }, [])

    useEffect(() => {
        window.reactVersion = version
    }, [])

    return <HelmetProvider>
        <PanelContext.Provider
            value={{
                action,
                description,
                fakeDataGenerators,
                isDark,
                isMessageShown,
                isSidebarOpen,
                maximized,
                message,
                setAction,
                setDescription,
                setIsDark,
                setIsMessageShown,
                setIsSidebarOpen,
                setMaximized,
                setMessage,
                setProgress,
                setSeverity,
                severity,
            }}>
            <Helmet>
                <title>{branding.brand}{branding.slogan && ' - '}{branding.slogan}</title>
            </Helmet>
            {
                app.getLocale().key === 'fa' &&
                <Helmet>
                    <link
                        type="text/css"
                        rel="stylesheet"
                        href="/Fonts/Persian/IranSansX/Font.css"
                    />
                </Helmet>
            }
            {
                app.getLocale().key === 'ar' &&
                <Helmet>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossorigin
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        type="text/css"
                        rel="stylesheet"
                        href="/Fonts/Arabic/style.css"
                    />
                </Helmet>
            }

            <div
                className={
                    "flex "
                    + (isDark ? ' dark ' : '')
                }
            >
                {
                    <Transition
                        show={isSidebarOpen}
                        enter="transition-all duration-300"
                        enterFrom={`-ms-72 lg:-ms-[20%] 2xl:-ms-[16.6666%]`}
                        enterTo="ms-0"
                        leave="transition-all duration-300"
                        leaveFrom="ms-0"
                        leaveTo={`-ms-72 lg:-ms-[20%] 2xl:-ms-[16.6666%]`}
                        className={
                            "w-72 absolute border-b z-20 bg-white dark:bg-slate-900 top-0 bottom-0 "
                            + " border-e lg:border-e-0  "
                            +
          /*large*/"lg:w-1/5 lg:static lg:border-b-0 "
                            +
          /*xlarge*/ ""
                            +
          /*2x large*/ "2xl:w-1/6"
                        }
                    >
                        <ClickAwayListener onClickAway={closeMenu}>
                            <div
                                id='thisDivShouldNotBeRemovedToFixRefProblemOfSidebar'
                            >
                                <Sidebar onClick={closeMenu} />
                            </div>
                        </ClickAwayListener>
                    </Transition>
                }
                <div
                    className=
                    {
        /*small*/"flex-1 flex flex-col min-h-screen"
                        /*medium*/
                        + " dark:bg-zinc-900 transition-colors"
                    }
                >
                    <Header onMenuIconClicked={toggleMenu} />
                    <div
                        id='content'
                        className="relative md:p-10 md:pt-4 pt-5 flex-1"
                    >
                        {
                            progress &&
                            <Skeleton
                                variant='rectangular'
                                className="skeleton z-20 absolute top-0 end-0 bottom-0 start-0 h-auto bg-gray-200"
                                animation="wave"
                            />
                        }
                        <TopContext.Provider
                            value={{
                                title,
                                setTitle,
                                subtitle,
                                setSubtitle,
                                breadcrumbItems,
                                setBreadcrumbItems,
                                isFreezed,
                                setIsFreezed,
                                // setTop
                            }}
                        >
                            <Top />
                            <MainRouting
                                progress={progress}
                                setProgress={setProgress}
                            />
                        </TopContext.Provider>
                    </div>
                    <Footer />
                    <Message />
                </div>
            </div>
        </PanelContext.Provider>
    </HelmetProvider>
}

export default Panel
