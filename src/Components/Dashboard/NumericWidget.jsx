import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import Widget from './Widget'

const NumericWidget = ({
    bear,
    bull,
    children,
    percentage,
    small,
    unit,
    ...rest
}) => {
    return <Widget {...rest}>
        <div className="flex items-center gap-4">
            {
                bear &&
                <TrendingDownIcon className="text-red-400" />
            }
            {
                bull &&
                <TrendingUpIcon className="text-green-400" />
            }
            <span className={`${small ? " text-2xl text-slate-500 " : " text-4xl text-slate-700 "} font-black  dark:text-slate-400`}>
                {children}
            </span>
            {
                percentage &&
                <span className="text-slate-400 text-2xl">%</span>
            }
        </div>
    </Widget>
}

export default NumericWidget
