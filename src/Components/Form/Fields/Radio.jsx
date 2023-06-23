import MuiRadio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'

const Radio = ({
    choose,
    display,
    options,
    value,
    row,
    ...rest
}) => {

    const field = useField({
        type: 'Radio',
        value,
        ...rest
    })

    const {
        chosenValue,
        displayValue,
        id,
        isDirty,
        isValid,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field

    const extraProps = {}
    if (row) {
        extraProps.row = true
    }

    return <Field
        {...rest}
        {...field}
        className="mt-8 mb-8"
    >
        <FormLabel>{app.t(label)}</FormLabel>
        <RadioGroup
            {...extraProps}
            defaultValue={value}
            name={id}
        >
            {
                options.map(i => <FormControlLabel
                    className="select-none"
                    key={choose(i)}
                    value={choose(i)}
                    control={<MuiRadio
                    />}
                    label={app.t(display(i))}
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
                    defaultChecked={value === choose(i)}
                />)
            }
        </RadioGroup>
    </Field>
}

export default Radio
