import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTop } from 'Hooks'

const Page = ({
    back,
    breadcrumbItems,
    children,
    className,
    hasBack,
    subtitle,
    title,
}) => {

    const navigate = useNavigate()

    useTop({
        breadcrumbItems,
        subtitle,
        title,
    })

    return <div>
        {
            (back || hasBack) && <div
                onClick={() => navigate(-1)}
                className={`cursor-pointer mb-6 hover:text-blue-600  ${back || ""}`}
            >
                <ArrowBackIcon className="rtl:hidden" />
                <ArrowForwardIcon className="ltr:hidden" />
            </div>
        }
        <div
            className={'bg-white py-6 md:rounded-lg ' + className}
        >
            {children}
        </div>
    </div>
}

export default Page
