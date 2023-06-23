import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useTop } from 'Hooks'

const NotFound = () => {

    useTop({
        breadcrumbItems: [],
        subtitle: '',
        title: '',
    })

    return <div className="flex flex-col items-center justify-center">
        <div className="localized-number text-9xl text-red-400 font-bold">404</div>
        <div className={"uppercase mt-10 text-6xl font-bold text-gray-600 text-center " + (app.getLocale().supportsLetterSpacing && " tracking-widest ")}>{app.t('Not Found')}</div>
        <div className="text-sm mt-10 text-gray-600 font-light text-center">{app.t('The page you requested does not exist')}.<br />{app.t('Please use the menu to navigate')}.<br />{app.t('Or go to the home page')}.</div>
        <div className="mt-10">
            <Link
                to={"/"}
            >
                <Button
                    className="bg-green-200 hover:bg-green-400 mt-2 lg:mt-0 mr-2"
                    variant="outlined"
                >
                    {app.t('Home')}
                </Button>
            </Link>
        </div>
    </div>
}

export default NotFound
