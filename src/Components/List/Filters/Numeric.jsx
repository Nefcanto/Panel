import Text from './Text'

const Numeric = ({
    decimals,
    integers,
    naturalNumbers,
    wholeNumbers,
    ...rest
}) => {

    let pattern = '[0-9]*'
    if (naturalNumbers) {
        pattern = '[1-9][0-9]*'
    }
    let regex = /^[0-9]*$/

    return <Text
        regex={regex}
        type='numeric'
        {...rest}
        inputProps={{
            inputMode: 'numeric',
            pattern
        }}
    />
}

export default Numeric
