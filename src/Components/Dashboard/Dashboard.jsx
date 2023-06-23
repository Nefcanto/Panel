import { useTop } from 'Hooks'

const Dashboard = ({
    breadcrumbItems,
    children,
    subtitle,
    title,
}) => {

    const samples = [
        'https://colorlib.com/wp-content/uploads/sites/2/free-dashboard-templates-1.jpg',
        'https://images.klipfolio.com/website/public/22b133bc-124d-44f4-85f8-9170b08d3ce9/dashboard-examples-hero.png',
        'https://static.vecteezy.com/system/resources/previews/008/295/031/original/custom-relationship-management-dashboard-ui-design-template-suitable-designing-application-for-android-and-ios-clean-style-app-mobile-free-vector.jpg',
        'https://www.datapine.com/images/it-dashboards-datapine.png',

    ]

    useTop({
        breadcrumbItems,
        subtitle,
        title,
    })

    return <div
        className="dashboard py-6 grid gap-6 "
    >
        {children}
    </div>
}

export default Dashboard
