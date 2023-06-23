import {
    useContext,
    useEffect,
    useState,
} from 'react'
import { Link } from 'react-router-dom'
import HouseIcon from '@mui/icons-material/House'
import app from 'App'
import {
    PanelContext,
    TopContext,
} from 'Contexts'

const Top = () => {

    const { maximized, setMaximized } = useContext(PanelContext)
    const {
        params,
        setParams,
        title,
        setTitle,
        subtitle,
        setSubtitle,
        breadcrumbItems,
        setBreadcrumbItems,
        isFreezed,
        setIsFreezed
    } = useContext(TopContext)

    const setTop = ({ freeze, title, subtitle, breadcrumbItems }) => {
        setParams({ freeze, title, subtitle, breadcrumbItems })
        if (!isFreezed) {
            setTitle(title)
            setSubtitle(subtitle)
            if (breadcrumbItems && breadcrumbItems.length) {
                setBreadcrumbItems(breadcrumbItems)
            }
        }
        if (typeof freeze === 'boolean') {
            setIsFreezed(freeze)
        }
    }

    useEffect(() => {
        // setTop(params)
    }, [isFreezed])

    return <>
        {
            (app.isNothing(title) && app.isNothing(subtitle) && breadcrumbItems?.length === 0)
                ?
                <div></div>
                :
                <div
                    className=
                    {
                        "mb-7 "
                        + (subtitle && breadcrumbItems?.length > 0 ? "h-18" : (subtitle || breadcrumbItems ? "h-12" : "h-6"))
                        + (maximized && " hidden ")
                        + (app.isRtl() ? " text-right pr-5 lg:pr-0 md:pr-0 " : " pl-5 lg:pl-0 md:pl-0 ")
                    }
                >
                    <div className={"font-medium mb-2 text-xl text-gray-700 dark:text-zinc-400 h-6 " + (app.getLocale().supportsLetterSpacing && "tracking-wider	")}>{app.t(title && title !== 'undefined' ? title : '')}</div>
                    {
                        subtitle && <div className={"text-xs mb-2 text-gray-500 dark:text-zinc-400 " + (app.getLocale().supportsLetterSpacing && " tracking-wider ")}>
                            {
                                app.t(subtitle)

                            }
                        </div>
                    }                   
                    {
                       
                        breadcrumbItems?.length > 0 && <div className={"flex items-center text-xs text-gray-500 dark:text-zinc-400 " + (app.getLocale().supportsLetterSpacing && " tracking-wider ")}>
                            {
                                <>
                                    <span className='flex items-center'>
                                        <span className="link">
                                            <Link to="/">
                                                <HouseIcon fontSize='small' />
                                            </Link>
                                        </span>
                                        <span
                                            className="mx-2"
                                            style={{
                                                fontSize: '10px'
                                            }}
                                        >/</span>
                                    </span>
                                    {
                                        breadcrumbItems?.filter(i => i && i.title).map((entity, index) => <span
                                            key={index}
                                            className='flex items-center'
                                        >
                                            <span>
                                                {
                                                    entity.link
                                                        ?
                                                        <span className="link">
                                                            <Link to={entity.link}>
                                                                {app.t(entity.title)}
                                                            </Link>
                                                        </span>
                                                        :
                                                        app.t(entity.title)
                                                }
                                            </span>
                                            {
                                                index === breadcrumbItems?.length - 1
                                                    ?
                                                    null
                                                    :
                                                    <span
                                                        className="mx-2"
                                                        style={{
                                                            fontSize: '10px'
                                                        }}
                                                    >/</span>
                                            }
                                        </span>)
                                    }
                                </>
                            }
                        </div>
                    }
                </div>
        }
    </>
}

export default Top
