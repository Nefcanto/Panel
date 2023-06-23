import { Text } from 'Form'

const Title = ({ optional }) => {
    const props = {}
    if (!optional) {
        props.required = 'Please provide the title'
    }
    return <Text
        property='Title'
        placeholder='Title'
        {...props}
    />
}

export default Title
