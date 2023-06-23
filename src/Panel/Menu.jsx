import { Link } from 'react-router-dom'
import {
    Fragment,
    useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BiotechIcon from '@mui/icons-material/Biotech'
import Collapse from '@mui/material/Collapse'
import menuItems from '../Menu'
import HolismIcon from '../Components/HolismIcon'
import app from 'App'

let items = menuItems
if (app.isDevOrSuperAdmin()) {
    items = [...menuItems, {
        title: 'Test',
        icon: BiotechIcon,
        path: '/test'
    }, {
        title: 'Simulation',
        icon: BiotechIcon,
        children: [
            {
                title: "Big File Upload",
                path: '/bigFileUpload'
            }
        ]
    }, {
        title: 'Samples',
        icon: BiotechIcon,
        children: [
            {
                title: "Tabs",
                path: '/tabs'
            },
            {
                title: "Form",
                path: '/form'
            }
        ]
    }]
}

const liStyle = "py-2 hover:bg-gray-50 dark:hover:bg-blue-900 cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-normal relative select-none " + (app.getLocale().supportsLetterSpacing && " tracking-wide ")
const iconStyle = "text-gray-600 hover:text-gray-900"

const leftBlueLine = (path) => {
    if (path === window.location.pathname) {
        return <span className="w-2 bg-blue-600 h-full absolute top-0 start-0 rounded-se-md rounded-ee-md "></span>
    }
}

const MenuItemWithSubmenu = ({ entity, onClick }) => {
    let location = useLocation()

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(() => {
        var isOpen = entity.children.filter(i => i.path === location.pathname).length > 0
        return isOpen
    })
    const openSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen)
    }
    return (
        <Fragment key={app.t(entity.title)}>
            {/* <li className="navigation-divider">{entity.title}</li> */}
            <div
                className={liStyle + (
                    isSubmenuOpen
                        ?
                        " pb-0"
                        :
                        ""
                )}
                onClick={openSubmenu}
            >
                <span
                    className=
                    {
                        "px-9 flex items-center h-full w-full"
                    }
                >
                    <span className="flex items-center me-3">
                        {
                            <HolismIcon icon={entity.icon} />
                        }
                    </span>
                    <span className="flex-1">{app.t(entity.title)}</span>
                    <span
                        className={
                            "flex "
                        }
                    >
                        <span
                            className={
                                "transition-all "
                                + (isSubmenuOpen ? " transform rotate-180 " : "  ")
                            }
                        >
                            <ExpandMoreIcon
                            />
                        </span>
                    </span>
                </span>
                <Collapse in={isSubmenuOpen}>
                    <div className=" pt-2">
                        {
                            entity.children.filter(entity => {
                                if (entity.superAdmin === true) {
                                    return app.isSuperAdmin()
                                }
                                else {
                                    return true
                                }
                            }).map((child, index) => {
                                return <Link
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onClick()
                                    }}
                                    to={child.path}
                                    key={index}
                                    className={
                                        liStyle
                                        + " flex items-center hover:bg-gray-100"
                                        + (child.path === location.pathname ? " bg-gray-200 text-blue-800 hover:text-blue-800 dark:bg-slate-600 dark:text-slate-200 dark:hover:text-slate-100" : '')
                                    }
                                >
                                    {
                                        leftBlueLine(child.path)
                                    }
                                    <span className={"ms-20"}>{app.t(child.title)}</span>
                                </Link>
                            })
                        }
                    </div>
                </Collapse>
            </div>

        </Fragment>
    )
}

const Menu = ({
    onClick,
    className
}) => {
    let location = useLocation()

    return <div id="menu" className={"dark:bg-slate-900 " + (className || "")}>
        {
            items.filter(entity => {
                if (entity.superAdmin === true) {
                    return app.isSuperAdmin()
                }
                else {
                    return true
                }
            }).map((entity, index) => {
                if (entity.children && entity.children.length > 0) {
                    return <MenuItemWithSubmenu key={index} entity={entity} onClick={onClick} />
                }
                else {
                    if (!entity.children && !entity.path) {
                        throw new Error(`Holism way of defining submenu items is via 'children' property. Please either provide a 'path' property for top-level menu items, or specify their 'children' in ${JSON.stringify(entity)}.`)
                    }
                    if (entity.children && entity.children.length === 0) {
                        throw new Error('Please remove menu items with zero childrens. Empty children array is not valid.')
                    }
                    return (<Fragment key={index}>
                        <Link
                            onClick={onClick}
                            to={entity.path}
                            className={
                                liStyle
                                + " flex items-center relative"
                                + (entity.path === location.pathname ? " bg-gray-200 hover:bg-gray-400 text-blue-800 hover:text-blue-800 dark:bg-slate-700 dark:text-slate-200 dark:hover:text-slate-100" : '')
                            }
                        >
                            <span
                                className={
                                    "px-9 flex items-cener inline-block w-full"
                                }
                            >
                                <span
                                    className={
                                        iconStyle
                                        + " me-3 "
                                    }
                                >
                                    {
                                        <HolismIcon icon={entity.icon} className="dark:text-slate-600" />
                                    }
                                </span>
                                {
                                    leftBlueLine(entity.path)
                                }
                                <span className="flex items-center">{app.t(entity.title)}</span>
                            </span>
                        </Link>
                    </Fragment>)
                }
            })
        }
    </div>
}

export default Menu

/*
todo:
* support groups
* show parent menu vertical bar next to children
* let developers provide color for svg icons if they want
* allow tags for each menu (like 'New', or 'Pro')
* allow numbers (like notifications count, or unprocessed orders count)
*/
