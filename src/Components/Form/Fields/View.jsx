import OutlinedInput from '@mui/material/OutlinedInput'
import { useField } from 'Hooks'
import Field from './Field'

const View = (props) => {

    const field = useField({
        type: 'View',
        ...props,
    })

    const {
        chosenValue,
        displayValue,
        isDirty,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field

    return <Field
        {...field}
        {...props}
    >
        <OutlinedInput
            label={app.t(label)}
            value={displayValue}
            readOnly
        />
    </Field>
}

export default View
