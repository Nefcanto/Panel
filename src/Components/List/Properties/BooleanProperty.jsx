import {
    useContext,
    useState,
} from 'react'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import app, { post } from 'App'
import { useMessage } from 'Hooks'
import { ListContext } from 'Contexts'
import HolismIcon from '../../HolismIcon'

const BooleanProperty = ({
    actionUrl,
    className,
    falseLabel,
    nullable,
    nullForFalse,
    nullLabel,
    reloadListOnSuccess,
    title,
    trueLabel,
    value,
}) => {

    const { success, error } = useMessage()

    const [progress, setProgress] = useState(false)

    const {
        reload,
        setEntity,
    } = useContext(ListContext)

    const label = (trueLabel && falseLabel)
        ?
        <span className="text-xs mx-1">{
            value
                ?
                trueLabel
                :
                nullable && value !== false
                    ?
                    nullLabel
                    :
                    falseLabel
        }</span>
        :
        null

    const onChange = (e) => {
        if (!actionUrl || app.isNothing(actionUrl)) {
            return
        }
        setProgress(true)
        var api = actionUrl
        if (typeof actionUrl === 'function') {
            api = actionUrl(e.target.checked)
        }
        if (nullForFalse) {
            api += "&nullForFalse=true"
        }
        post(api).then(data => {
            setProgress(false)
            success('Applied')
            if (reloadListOnSuccess) {
                reload()
            }
            else {
                setEntity(data)
            }
        }, e => {
            error(e)
            setProgress(false)
        })
    }

    const getProgressSize = () => {
        const locale = app.getLocale().key
        if (locale === 'en') {
            return 17
        }
        else if (locale === 'fa') {
            return 18
        }
        else {
            return 16
        }
    }

    const control = actionUrl
        ?
        <>
            <Switch
                checked={value || false}
                onChange={(e) => onChange(e)}
                size='small'
            />
            {label}
        </>
        :
        <div className={"" + (value === true ? " text-green-600 " : " text-red-600 ")}>
            {
                value === true
                    ?
                    <HolismIcon icon={CheckIcon} />
                    :
                    nullable && value !== false
                        ?
                        null
                        :
                        <HolismIcon icon={ClearIcon} />
            }
            {label}
        </div>
    return <div className={"property boolean flex items-center justify-center " + (className || '')}>
        {
            progress
                ?
                <CircularProgress
                    size={getProgressSize()}
                    className={`my-1 mx-[11.5px]`}
                />
                :
                title
                    ?
                    <Tooltip title={title || ""}>
                        {
                            control
                        }
                    </Tooltip>
                    :
                    control
        }
    </div>
}

export default BooleanProperty 
