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
}) => {

    const [id, setId] = useState()
    const [internalInitialValue, setInternalInitialValue] = useState(initialValue)
    const [displayValue, setDisplayValue] = useState(initialValue || (type === 'Check' ? false : ""))
    const [chosenValue, setChosenValue] = useState(initialValue || (type === 'Check' ? false : ""))
    const [chosenEntity, setChosenEntity] = useState(null)
    const [helpText, setHelpText] = useState(hint)
    const label = placeholder || property
    const [camelizedColumn, setCamelizedColumn] = useState(property)
    const [isDirty, setIsDirty] = useState(false)
    const [validationState, setValidationState] = useState(null)
    const initialHint = hint
    const {
        addFieldToFormContext,
        isDirty: isFormDirty,
        currentEntity,
        isSubmittedOnce,
        progress,
        setField,
        setIsDirty: setIsFormDirty      
    } = useContext(FormContext)

    const setValidationMessage = (message) => {
        if (isSubmittedOnce) {
            setHelpText(message)
        }
        else {
            if (isDirty) {
                setHelpText(message)
            }
        }
    }

    const validateAll = () => {
        if (required && app.isNothing(displayValue) && app.isNothing(chosenValue)) {
            setValidationState('invalid required ' + Date.now())
            setValidationMessage(typeof required === 'boolean' ? `${app.t(placeholder || property)} ${app.t('is not provided')}` : required)
        } else {
            setValidationState('valid ' + Date.now())
            setValidationMessage(initialHint)
        }
    }

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
        addFieldToFormContext({
            id,
            type
        })

    }, [id])

    useEffect(() => {
        if(currentEntity){
            setDisplayValue(currentEntity[camelizedColumn])
            setChosenValue(currentEntity[camelizedColumn])
            setInternalInitialValue(currentEntity[camelizedColumn])
        }
    }, [camelizedColumn, currentEntity])

    useEffect(() => {
        if (isDirty) {
            setIsFormDirty(true)
        }
    }, [isDirty])

    useEffect(() => {

        setId(`${type}_${property}`)

        if (isNaN(property)) {
            setCamelizedColumn(app.camelize(property))
        } else {
            setCamelizedColumn(property)
        }

    }, [type, property])

    useEffect(() => {
        validateAll()
    }, [displayValue, isDirty])

    useEffect(() => {
        setField({
            currentValue: chosenValue,
            id,
            initialValue: internalInitialValue,
            isDirty,
            isValid: isValid() ? true : false,
        })
    }, [validationState, isDirty, chosenValue])

    return {
        camelizedColumn,
        chosenEntity,
        chosenValue,
        displayValue,
        helpText,
        id,
        initialValue:internalInitialValue,
        isDirty,
        isValid,
        label,
        progress,
        setCamelizedColumn,
        setChosenEntity,
        setChosenValue,
        setDisplayValue,
        setHelpText,
        setId,
        setInitialValue:setInternalInitialValue,
        setIsDirty,
        type,
        validateAll,
    }
}

export default useField
