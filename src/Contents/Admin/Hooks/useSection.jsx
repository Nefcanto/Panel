import { useState, useEffect } from 'react'
import { get } from 'App'
import { useMessage } from 'Hooks'

const useSection = ({ setProgress }) => {

    const { sectionId } = app.parseQuery()
    const [section, setSection] = useState({})
    const [configs, setConfigs] = useState({})
    const { error } = useMessage()

    useEffect(() => {
        setProgress(true)
        get(`/section/get/${sectionId}`)
            .then(data => {
                setProgress(false)
                setSection(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }, [])

    useEffect(() => {
        if (section && section.relatedItems) {
            setConfigs(section.relatedItems.configs)
        }
    }, [section])

    return {
        configs,
        section,
    }
}

export default useSection