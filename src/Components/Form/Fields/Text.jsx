import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'
import HolismIcon from '../../HolismIcon'

const Text = ({
    onChangeAugmenter,
    placeholder,
    regex,
    regexError,
    startIcon,
    validate,
    ...rest
}) => {

    const textValidate = ({ displayValue }) => {
        if (validate && typeof validate === 'function') {
            return validate(displayValue)
        }
        if (regex && regex.test && app.isSomething(displayValue)) {
            if (displayValue.match(regex)) {
                return true
            }
            else {
                return {
                    error: 'regex',
                    message: regexError
                }
            }
        }
    }

    const field = useField({
        placeholder,
        type: 'Text',
        validate: textValidate,
        ...rest
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
        {...rest}
        {...field}
    >
        <OutlinedInput
            label={app.t(label)}
            value={displayValue}
            {...rest}
            required={rest.required ? true : false}
            startAdornment={
                startIcon &&
                <InputAdornment
                    disablePointerEvents={progress}
                    disableTypography={progress}
                    position="start"
                >
                    <HolismIcon
                        progress={progress}
                        icon={startIcon}
                    />
                </InputAdornment>
            }
            onBlur={() => {
                if (!isDirty) {
                    setIsDirty(true)
                }
            }}
            onChange={(e) => {
                if (!isDirty) {
                    setIsDirty(true)
                }
                let canBeChanged = true
                if (onChangeAugmenter instanceof Function) {
                    canBeChanged = onChangeAugmenter(e.target.value)
                }
                if (canBeChanged) {
                    setDisplayValue(e.target.value)
                    setChosenValue(e.target.value)
                }
            }}
        />
    </Field>
}

export default Text 
