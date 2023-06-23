import {
    useEffect,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import app from 'App'
import HolismIcon from '../Components/HolismIcon'

const Item = ({
    background,
    handler,
    icon,
    title,
    url,
}) =>
    <li
        className={background + " transition-colors dark:bg-gray-400 dark:hover:bg-gray-600 mr-1 ml-1 rounded-md cursor-pointer"}
        onClick={handler}
    >
        <a
            href={url}
            className="h-9 w-12 flex items-center justify-center  dark:hover:text-gray-100"
            title={app.t(title)}
            data-toggle="tooltip"
        >
            <HolismIcon
                icon={icon}
                className="w-4 h-4 text-gray-900 dark:text-inherit"
            />
        </a>
    </li>

export default function User({ onClick }) {

    const navigate = useNavigate()

    const [user, setUser] = useState(app.user)
    const [role, setRole] = useState(app.role())

    useEffect(() => {
        // app.on(app.accountUpdated, () => {
        //     setUser(app.user)
        //     setRole(app.role())
        // })
    }, [])

    return (
        <div
            id='userPanel'
            className="flex flex-col justify-center	"
        >
            {/* <img src="image/profile.jpg" className="w-11 h-11 m-auto rounded-full mb-4" alt="User profile" /> */}
            {/* <span id='userProfile' className="w-11 h-11 m-auto rounded-full mb-4">
                {ProfileIcon}
            </span> */}
            <div className="flex flex-col justify-center mt-4">
                <div className={"flex flex-row gap-2 justify-center items-center mb-4 "}>
                    <HolismIcon
                        icon={AccountCircleOutlinedIcon}
                        className="w-12 h-12 text-gray-400"
                    />
                    <div className={"flex flex-col justify-center items-start"}>
                        <div className="text-center font-medium antialiased tracking-wide	text-gray-800 dark:text-gray-300 transition-colors">{user}</div>
                        <p className="text-center text-gray-400 text-sm">{app.t(role)}</p>
                    </div>
                </div>
                <ul className="flex items-center justify-center">
                    <Item
                        icon={PersonIcon}
                        title="Profile"
                        background="bg-green-200 hover:bg-green-400"
                        handler={() => {
                            onClick()
                            navigate('/profile')
                        }}
                    />
                    <Item
                        icon={SettingsIcon}
                        title="Settings"
                        background="bg-blue-200 hover:bg-blue-400"
                        handler={() => {
                            onClick()
                            navigate('/settings')
                        }}
                    />
                    <Item
                        icon={ExitToAppIcon}
                        handler={() => app.logout()}
                        title="Logout"
                        background="bg-red-200 hover:bg-red-400"
                    />
                </ul>
            </div>
        </div>
    )
}
