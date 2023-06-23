import { useContext } from 'react'
import { FormContext } from 'Contexts'
import Check from './Check'

const IsVital = () => {

    const {
        formMode,
        mode,
    } = useContext(FormContext)

    return <Check
        property='IsVital'
        placeholder='Is Vital?'
        hint={mode === formMode.edition ? 'Please change with caution' : ''}
        superAdmin
    />
}

export default IsVital
