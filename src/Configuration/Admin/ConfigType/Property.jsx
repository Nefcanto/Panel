import useConfig from "../Hooks/useConfig"

const ConfigProperty = (props) => {

    const { getProperty } = useConfig()
    const property = getProperty(props)

    return property

}

export default ConfigProperty