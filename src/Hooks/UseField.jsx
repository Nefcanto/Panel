import {
    useContext,
    useEffect,
    useState,
} from 'react'
import { FormContext } from 'Contexts'

const useField = ({
    hint,
    initialValue,
    placeholder,
    property,
    required,
    type,
    validate,
    valueExtractor,
    valueProvider,
}) => {

    if (!property) {
        throw 'property is not defined'
    }

    const [id, setId] = useState()
    const [internalInitialValue, setInternalInitialValue] = useState(initialValue)
    const [displayValue, setDisplayValue] = useState(initialValue || (type === 'Check' ? false : ""))
    const [chosenValue, setChosenValue] = useState(initialValue || (type === 'Check' ? false : ""))
    const [chosenEntity, setChosenEntity] = useState(null)
    const [helpText, setHelpText] = useState(hint)
    const initialHint = hint
    const {
        addFieldToFormContext,
        currentEntity,
        isDirty: isFormDirty,
        isSubmittedOnce,
        progress,
        setField,
        setIsDirty: setIsFormDirty,
    } = useContext(FormContext)
    const [validationState, setValidationState] = useState(null)
    const label = placeholder || property
    const [camelizedColumn, setCamelizedColumn] = useState(property)
    const [isDirty, setIsDirty] = useState(false)

    useEffect(() => {
        setId(`${type}_${property}`)
        if (isNaN(property)) {
            setCamelizedColumn(app.camelize(property))
        } else {
            setCamelizedColumn(property)
        }
    }, [type, property])

    useEffect(() => {
        addFieldToFormContext({
            id,
            isDirty: false,
            isValid: false,
            type,
        })
    }, [id])

    const setValidationMessage = (message) => {
        if (isFormDirty) {
            if (isSubmittedOnce) {
                setHelpText(message)
            }
            else {
                if (isDirty) {
                    setHelpText(message)
                }
            }
        }
        else {
            setHelpText()
        }
    }

    const validateAll = () => {
        if (required && app.isNothing(displayValue) && app.isNothing(chosenValue)) {
            setValidationState('invalid required ' + Date.now())
            setValidationMessage(typeof required === 'boolean' ? `${app.t(placeholder || property)} ${app.t('is not provided')}` : required)
        }
        else {
            if (validate && typeof validate === 'function') {
                var result = validate({ displayValue, chosenValue, chosenEntity })
                if (!result || result === true) {
                    setValidationState('valid ' + Date.now())
                    setValidationMessage(initialHint)
                }
                else {
                    setValidationState(`invalid ${result?.error} ${Date.now()}`)
                    setValidationMessage(result?.message)
                }
            }
            else {
                setValidationState('valid ' + Date.now())
                setValidationMessage(initialHint)
            }
        }
    }

    useEffect(() => {
        validateAll()
    }, [displayValue, isDirty])

    useEffect(() => {
        if (currentEntity) {
            setDisplayValue(currentEntity[camelizedColumn])
            setChosenValue(currentEntity[camelizedColumn])
        }
    }, [camelizedColumn, currentEntity])

    useEffect(() => {
        if (!internalInitialValue) {
            setInternalInitialValue(initialValue || chosenValue)
        }
    }, [initialValue, chosenValue, internalInitialValue])

    const isValid = () => {
        if (!validationState) {
            return false
        }
        if (validationState.indexOf('invalid') > -1) {
            return false
        }
        return true
    }

    useEffect(() => {
        setField({
            currentValue: chosenValue,
            id,
            initialValue: internalInitialValue,
            isDirty,
            isValid: isValid() ? true : false,
        })
    }, [validationState, isDirty, chosenValue])

    useEffect(() => {
        if (isDirty) {
            setIsFormDirty(true)
        }
    }, [isDirty])

    return {
        chosenValue,
        displayValue: displayValue || '',
        helpText,
        id,
        initialValue: internalInitialValue,
        isDirty,
        isValid,
        label,
        progress,
        setChosenEntity,
        setChosenValue,
        setDisplayValue,
        setField,
        setIsDirty,
        type,
        validateAll,
    }
}

export default useField
