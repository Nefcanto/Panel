import { app } from 'Panel'
import HolismIcon from '../HolismIcon'

const Widget = ({
    allSiblingsCount,
    bottomBorder,
    children,
    color,
    icon,
    menuItems,
    span,
    title,
}) => {

    console.log(title, bottomBorder)

    return <div
        className={
            `widget bg-white p-6 dark:bg-zinc-700 md:rounded-lg relative overflow-hidden`
        }
    >
        {
            (title || icon)
                ?
                <div
                    className={
                        "widgetTopBar flex items-start justify-between mb-4 "
                    }
                >
                    {
                        title
                            ?
                            <div
                                className={
                                    "uppercase text-sm text-gray-800 font-light truncate cursor-default dark:text-gray-400 "
                                    + " mb-3 "
                                    + (app.getLocale().supportsLetterSpacing && " tracking-wider ")
                                }
                                title={app.t(title)}
                            >
                                {app.t(title)}
                            </div>
                            :
                            null
                    }
                    {
                        icon
                            ?
                            <div
                                className=
                                {
                                    "w-10 h-10 rounded-full flex justify-center items-center text-white "
                                    + (color || " bg-green-400 ")
                                }
                            >
                                <HolismIcon icon={icon} />
                            </div>
                            :
                            null
                    }
                </div>
                :
                null
        }
        {children}
        {
            bottomBorder &&
            <div className={`h-1.5 ${color} absolute bottom-0 start-0 end-0 `} />
        }
    </div>
}

export default Widget
