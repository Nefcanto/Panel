import {
    HolismIcon,
    ValueWithTitle,
} from 'List'
import useConfig from "../Hooks/useConfig"

const ConfigTypeIcon = ({ type }) => {

    const { getIcon } = useConfig()
    const icon = getIcon(type)

    return icon
        ?
        <ValueWithTitle
            value={<HolismIcon icon={icon} />}
            title={type}
        />
        :
        type

}

export default ConfigTypeIcon