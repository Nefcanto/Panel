import OutlinedInput from '@mui/material/OutlinedInput'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'

const Time = (props) => {

    const field = useField({
        type: 'Time',
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

    return <Field
        {...props}
        {...field}
    >
        <TimePicker
            label={app.t(label)}
            value={displayValue}
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

export default Time
