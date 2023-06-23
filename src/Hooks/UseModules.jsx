import {
    useEffect,
    useState,
} from 'react'

const useModules = () => {

    const [entityRenderers, setEntityRenderes] = useState([])

    const registerRenderer = (exportedName, renderer) => {

        setEntityRenderes(previousRenderers => {
            const entityType = exportedName.replace('Renderer', '')
            if (previousRenderers.find(i => i.entityType === entityType)) {
                return previousRenderers
            }
            return [...previousRenderers, {
                entityType,
                renderer: renderer
            }]
        })
    }

    const extractEntityRenderers = () => {
        import('Modules')
            .then(Modules => {
                for (const moduleName in Modules) {
                    const moduleExports = Modules[moduleName]
                    for (const exportedName in moduleExports) {
                        if (exportedName.endsWith('Renderer')) {
                            const renderer = moduleExports[exportedName]
                            registerRenderer(exportedName, renderer)
                            registerRenderer(exportedName, renderer)
                        }
                    }
                }
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        extractEntityRenderers()
    }, [])

    useEffect(() => {
        console.log(entityRenderers)
    }, [entityRenderers])

    const getRenderer = entityType => {
        const renderer = entityRenderers.find(i => i.entityType == entityType)
        return renderer?.renderer || (() => {
            return <div>No renderer for {entityType}</div>
        })
    }

    return {
        getRenderer
    }
}

export default useModules
