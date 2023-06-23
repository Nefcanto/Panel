import { useContext } from 'react'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import app from 'App'
import { FormContext } from 'Contexts'
import Text from './Text'

const Key = () => {

    const keyFormat = /^[a-zA-Z]*$/

    const {
        currentEntity,
        formMode,
        mode,
    } = useContext(FormContext)

    return <Text
        property='Key'
        placeholder='Key'
        regex={keyFormat}
        regexError="Key format is not correct. Only English alphabet is permissible."
        required="Key is not provided"
        hint={mode === formMode.edition ? 'Please change with caution' : ''}
        startIcon={WarningAmberIcon}
        superAdmin
        dir='ltr'
        validate={value => {
            if (value != app.camelize(value)) {
                return {
                    error: 'Invalid key',
                    message: 'Make the key camelCased'
                }
            }
        }}
    />
}

export default Key
