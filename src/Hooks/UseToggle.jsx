import {
    useCallback,
    useState,
} from 'react'

const useToggle = (initialValue = false) => {

    const [value, setValue] = useState(initialValue)

    const togglerFunction = useCallback(() => setValue(value => !value), [])

    return [value, togglerFunction]
}

export default useToggle
