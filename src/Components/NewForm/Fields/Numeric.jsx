import Text from './Text'

const Numeric = ({
    decimalPlaces,
    integers,
    max,
    min,
    realNumbers,
    ...rest
}) => {
    const naturalNumbers = !integers && !realNumbers

    const checkNaturalNumbers = value => {
        if (value > 0 && Number.isInteger(value * 1)) {
            return true
        }
        return false
    }

    const checkIntegers = value => {
        if (Number.isInteger(value * 1)) {
            return true
        }
        return false
    }

    const checkRealNumbers = value => {
        // if (decimalPlaces) {
        //     const numericValue = Number.parseFloat(value)
        //     const integerPart = Math.trunc(numericValue)
        //     const decimalPart = Number((value - integerPart).toFixed(decimalPlaces))
        //     if (value !== decimalPart.)
        // }
        return true
    }

    const check = value => {
        if (value === "") {
            return true
        }
        if ((integers || realNumbers) && value.trim() === '-') {
            return true
        }
        if (isNaN(Number.parseFloat(value))) {
            return false
        }
        if (naturalNumbers) {
            return checkNaturalNumbers(value)
        }
        if (integers) {
            return checkIntegers(value)
        }
        if (realNumbers) {
            return checkRealNumbers(value)
        }
        return false
    }

    return <Text
        onChangeAugmenter={check}
        {...rest}
    />
}

export default Numeric
