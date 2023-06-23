import {
    useEffect,
    useState,
} from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { get } from 'App'
import { useMessage } from 'Hooks'
import {
    Number,
    NumericWidget,
} from 'Dashboard'

const PostCount = (props) => {

    const [progress, setProgress] = useState(false)
    const [count, setCount] = useState()
    const { error } = useMessage()
    console.log('post count', props)

    useEffect(() => {
        setProgress(true)
        get(`/perLocaleCount/getCount?entityType=blogPost`)
            .then(data => {
                setProgress(false)
                setCount(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }, [])

    return <NumericWidget
        title='Posts count'
        icon={MenuBookIcon}
        {...props}
    >
        <Number>{count}</Number>
    </NumericWidget>
}

export default PostCount
