import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import app from 'App'
import { useField } from 'NewForm'
import Field from './Field'

const Text = ({
    onChangeAugmenter,
    placeholder,
    ...rest
}) => {
    const field = useField({
        placeholder,
        type: 'Text',
        ...rest
    })

    const {
        displayValue,
        isDirty,
        label,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field
    return <>
        <Field
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
    </>
}

export default Text
