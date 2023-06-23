import AddIcon from '@mui/icons-material/Add'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import SchoolIcon from '@mui/icons-material/School'
import {
    AreaSample,
    BarSample,
    ComposedSample,
    Dashboard,
    LineSample,
    NumericWidget,
    PieSample,
    RadarSample,
    ScatteredSample,
    Section,
    Widget,
} from 'Dashboard'

const RunnableDashboard = () => {
    return <Dashboard
        title='Dashboard'
        subtitle='Your educational data'
    >
        <Section>
            <NumericWidget
                title="New learners"
                icon={AddIcon}
                color="bg-indigo-400"
                start={SchoolIcon}
                bull
                bottomBorder
            >
                150
            </NumericWidget>
            <NumericWidget
                title="Last month income"
                icon={AttachMoneyIcon}
                color="bg-blue-400"
                bear
                bottomBorder
            >
                2700
            </NumericWidget>
            <NumericWidget
                title="YoY growth"
                icon={HourglassEmptyIcon}
                color="bg-orange-400"
                bottomBorder
                percentage
            >
                7
            </NumericWidget>
        </Section>
        <Section>
            <Widget
                title="Engagement"
            >
                <ComposedSample height={300} />
            </Widget>
            <Widget
                title='Demography'
            >
                <PieSample height={300} />
            </Widget>
        </Section>
        <Section>
            <NumericWidget
                title="Instructors"
                small
            >
                170
            </NumericWidget>
            <NumericWidget
                title="Courses"
                small
            >
                90
            </NumericWidget>
            <NumericWidget
                title="Learners"
                small
            >
                2300
            </NumericWidget>
            <NumericWidget
                title="Orders"
                small
            >
                740
            </NumericWidget>
        </Section>
    </Dashboard>
}

export default RunnableDashboard
