import DatePart from './DatePart'
import TimePart from './TimePart'
import ValueWithTitle from './ValueWithTitle'

const DateTimeTitleAgo = ({ date, ago }) => {
    return <ValueWithTitle
        value={<>
            <DatePart date={date} />
            <br />
            <TimePart
                date={date}
                className="text-xs"
            />
        </>}
        title={ago + ' ago'}
    />
}

export default DateTimeTitleAgo 
