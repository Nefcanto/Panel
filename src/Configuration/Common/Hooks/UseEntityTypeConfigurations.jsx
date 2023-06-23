import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import { useMessage } from 'Hooks'

const useEntityTypeConfigurations = () => {

    const [entityTypeConfigs, setEntityTypeConfigs] = useState([])
    const { error } = useMessage()

    const loadConfigs = async () => {
        await get('/entityTypeConfig/all')
            .then(data => {
                setEntityTypeConfigs(data)
            }, e => {
                error(e)
            })
    }

    useEffect(() => {
        loadConfigs()
    }, [])

    const getEntityTypeConfigValue = async (entityType, key) => {
        await loadConfigs()
        const config = entityTypeConfigs.find(i => i.entityType.toLowerCase() === entityType.toLowerCase() && i.configItemKey.toLowerCase() === key.toLowerCase())
        return config?.relatedItems?.typedValue
    }

    return {
        getEntityTypeConfigValue
    }
}

export default useEntityTypeConfigurations
