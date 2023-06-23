import {
    useContext,
    useEffect,
    useState,
} from 'react'
import RSelect from 'react-select'
import { FormContext } from 'Contexts'
import { useField } from 'NewForm'
import Field from './Field'

const Select = ({
    choose,
    display,
    hasEmpty,
    loadInitialValue,
    multi,
    onChanged,
    options,
    ...rest
}) => {

    const field = useField({
        type: "Select",
        ...rest
    })

    const {
        chosenValue,
        initialValue,
        setInitialValue,
        setChosenValue,
        displayValue,
        isDirty,
        label,
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

    const {
        currentEntity,
        formMode,
        mode,
    } = useContext(FormContext)

    useEffect(() => {
        if (mode == formMode.edition && loadInitialValue instanceof Function && currentEntity) {
            loadInitialValue({
                entity: currentEntity,
                setChosenValue,
                setDisplayValue,
                setInitialValue,
            })
        }
    }, [currentEntity])

    return <>
        <Field
            {...field}
            {...rest}
        >
            {
                multi ?
                    <RSelect
                        isMulti
                        onBlur={() => {
                            if (!isDirty) {
                                setIsDirty(true)
                            }
                        }}
                        onChange={(e) => {
                            console.log(e)
                            var chosenValues = e.map(i => i.value)
                            var displayValues = e.map(i => i.label)
                            setChosenValue(chosenValues)
                            setDisplayValue(displayValues)
                        }}
                        options={formattedOptions}
                        value={chosenValueObject}
                        defaultValue={initialValue}
                        styles={{
                            menu: provided => ({ ...provided, zIndex: 9999 })
                        }}
                    /> :
                    <RSelect
                        onBlur={() => {
                            if (!isDirty) {
                                setIsDirty(true)
                            }
                        }}
                        onChange={(e) => {
                            console.log(e)
                            var chosenValues = e.value
                            var displayValues = e.value

                            setChosenValue(chosenValues)
                            setDisplayValue(displayValues)
                        }}
                        options={formattedOptions}
                        value={chosenValueObject}
                        defaultValue={initialValue}
                        styles={{
                            menu: provided => ({ ...provided, zIndex: 9999 })
                        }}
                    />
            }
        </Field>
    </>
}

export default Select
