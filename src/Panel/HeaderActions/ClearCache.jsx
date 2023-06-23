import PublishIcon from '@mui/icons-material/Publish'
import { post } from 'App'
import HeaderAction from './HeaderAction'

const ClearCache = () => {

    return <HeaderAction
        title="Publish"
        icon={PublishIcon}
        action={({ setProgress, success, error }) => {
            setProgress(true)
            post('/cache/clear')
                .then(data => {
                    success('Published')
                    setProgress(false)
                }, e => {
                    error(e)
                    setProgress(false)
                })
        }}
    />
}

export default ClearCache 
