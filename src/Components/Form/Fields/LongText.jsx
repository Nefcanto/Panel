import OutlinedInput from '@mui/material/OutlinedInput'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'

const LongText = (props) => {

    const field = useField({
        type: 'LongText',
        ...props
    })
    const {
        displayValue,
        isDirty,
        label,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field

    return <Field
        {...props}
        {...field}
    >
        <OutlinedInput
            label={app.t(label)}
            value={displayValue}
            onBlur={() => {
                if (!isDirty) {
                    setIsDirty(true)
                }
            }}
            onChange={(e) => {
                if (!isDirty) {
                    setIsDirty(true)
                }
                setDisplayValue(e.target.value)
                setChosenValue(e.target.value)
            }}
            multiline
            rows={4}
        />
    </Field>
}

export default LongText 
