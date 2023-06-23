import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import OutlinedInput from '@mui/material/OutlinedInput'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'

const DateTime = (props) => {

    const field = useField({
        type: 'DateTime',
        ...props
    })
    const {
        displayValue,
        isDirty,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field


    console.log(displayValue);
    const normalizedValue = (displayValue && displayValue?.toString()?.endsWith('Z')) ? displayValue : (displayValue + 'Z')
    
    return <Field
        {...props}
        {...field}
    >
        <DateTimePicker
            format="MM/dd/yyyy HH:mm"
            value={new Date(displayValue)}
            disabled={progress}
            onBlur={() => {
                if (!isDirty) {
                    setIsDirty(true)
                }
            }}
            onChange={(date) => {
                if (!isDirty) {
                    setIsDirty(true)
                }
                setDisplayValue(date)
                setChosenValue(date)
            }}
            textField={({
                inputRef,
                inputProps,
                InputProps
            }) => <OutlinedInput
                    label={app.t(label)}
                    endAdornment={InputProps?.endAdornment}
                    ref={inputRef}
                    inputProps={inputProps}
                />}
        />
    </Field>
}

export default DateTime
