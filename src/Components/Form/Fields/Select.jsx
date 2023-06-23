import MenuItem from '@mui/material/MenuItem'
import MuiSelect from '@mui/material/Select'
import RSelect from 'react-select'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'

const Select = ({
    choose,
    display,
    hasEmpty,
    multi,
    onChanged,
    options,
    ...rest
}) => {   
    const field = useField({
        type: 'Select',
        ...rest
    })
    const {
        chosenValue,
        displayValue,
        isDirty,
        label,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field

    const formattedOptions = options.map(i => {
        return {
            value: choose(i),
            label: display(i)
        }
    })
    const chosenValueObject = formattedOptions.filter(i => {
        if (multi) {
            return chosenValue?.includes(i.value)
        }
        else {

            return i.value === chosenValue
        }
    })

    return <Field     
        {...field}
        {...rest}
    >
        {
            multi
                ?
                <RSelect
                    isMulti={multi ? true : false}
                    options={formattedOptions}
                    className="w-full h-full block rounded-[8px]"
                    onClick={() => alert('hi')}
                    onChange={(e) => {
                        console.log(e)
                        if (!isDirty) {
                            setIsDirty(true)
                        }
                        var chosenValues = e.map(i => i.value)
                        var displayValues = e.map(i => i.label)
                        setChosenValue(chosenValues)
                        setDisplayValue(displayValues)
                    }}
                    value={chosenValueObject}
                />
                :

                <MuiSelect
                    value={displayValue}
                    label={app.t(label)}
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
                        if (onChanged) {
                            onChanged(e.target.value)
                        }
                    }}
                >
                    {
                        hasEmpty
                            ?
                            <MenuItem value="">
                                <em>{app.t('Please choose')}</em>
                            </MenuItem>
                            :
                            null
                    }
                    {
                        options.map(option => <MenuItem
                            key={option.id}
                            value={choose(option)}
                        >
                            {app.t(display(option))}
                        </MenuItem>)
                    }
                </MuiSelect>
        }
    </Field>
}

export default Select 
