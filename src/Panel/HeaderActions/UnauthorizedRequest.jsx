import GppMaybeIcon from '@mui/icons-material/GppMaybe'
import { get } from 'App'
import HeaderAction from './HeaderAction'

const UnauthorizedRequest = () => {

    return <HeaderAction
        title="Simulate unauthorized request"
        icon={GppMaybeIcon}
        action={({ setProgress, success, error }) => {
            setProgress(true)
            get('/debug/simulateUnauthorizedAccess')
                .then(data => {
                    setProgress(false)
                }, e => {
                    error(e)
                    setProgress(false)
                })
        }}
    />
}

export default UnauthorizedRequest 
