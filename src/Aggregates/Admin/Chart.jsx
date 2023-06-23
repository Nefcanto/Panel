import { getDay } from 'date-fns-jalali'
import {
    useEffect,
    useState,
} from 'react'
import app from 'App'
import { get } from 'App'
import { useDateTime } from 'Hooks'
import { DatePart } from 'Dashboard'
import {
    BlurredProgress,
    LineChart,
} from 'Dashboard'
import { Chip } from 'List'

const Chart = ({
    entityType,
    metric,
}) => {

    const intervals = ['Daily', 'Weekly', 'Monthly']
    const [interval, setInterval] = useState(intervals[0])
    const [data, setData] = useState({})
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [progress, setProgress] = useState(false)
    const {
        getMonthName,
        getShortMonthName,
    } = useDateTime()

    const getProperty = () => {
        switch (interval.toLowerCase()) {
            case 'daily':
                return 'utcDate'
            case 'weekly':
                return 'weekNumber'
            case 'monthly':
                return 'month'
            default:
                return 'utcDate'
        }
    }

    const getTransformationForX = () => {
        switch (interval.toLowerCase()) {
            case 'daily':
                return x => new Date(x).getDate()
            case 'weekly':
                return x => x
            case 'monthly':
                return x => getShortMonthName(x)
            default:
                return x => new Date(x).getDate()
        }
    }

    const getAngleForX = () => {
        switch (interval.toLowerCase()) {
            case 'daily':
                return 0
            case 'weekly':
                return 0
            case 'monthly':
                return -45
            default:
                return 0
        }
    }

    const getHover = () => {
        switch (interval.toLowerCase()) {
            case 'daily':
                return ({ count, utcDate }) => <>
                    <DatePart date={utcDate} />
                    <h1>{count} {app.t(metric)}</h1>
                </>
            case 'weekly':
                return ({ count, weekNumber }) => <>
                    <div>{app.t('Week')} {weekNumber}</div>
                    <h1>{count} {app.t(metric)}</h1>
                </>
            case 'monthly':
                return ({ count, month }) => <>
                    <div>{getMonthName(month)}</div>
                    <h1>{count} {app.t(metric)}</h1>
                </>
            default:
                return null
        }
    }

    const load = (interval) => {
        setProgress(true)
        let url = `/${interval}Count/list?entityType=${entityType}&metric=${metric}`
        url += (from ? `&from=${from}` : '')
        url += (to ? `&to=${to}` : '')
        get(url)
            .then(data => {
                setProgress(false)
                setData(data.data.reverse())
            }, e => {
                setProgress(false)
                console.error(e)
            })
    }

    useEffect(() => {
        load(interval)
    }, [interval])

    return <>
        <div className="flex gap-2 ">
            {
                intervals.map(i => <Chip
                    key={i}
                    text={app.t(i)}
                    className={
                        "bg-white border text-slate-800 transition-all select-none " +
                        (i === interval ? " bg-red-800 text-gray-50 " : " cursor-pointer hover:shadow-md hover:bg-red-800 hover:text-white ")
                    }
                    onClick={() => setInterval(i)}
                />)
            }
        </div>
        <div className="relative">
            <LineChart
                data={data}
                value='count'
                x={getProperty()}
                xAngle={getAngleForX()}
                transformX={getTransformationForX()}
                hover={getHover()}
            />
            {
                progress &&
                <BlurredProgress opacity='opacity-50' />
            }
        </div>
    </>
}

export default Chart
