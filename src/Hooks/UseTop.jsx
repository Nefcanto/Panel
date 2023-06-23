import {
    useContext,
    useEffect,
} from 'react'
import { TopContext } from 'Contexts'
import { useLocation } from 'react-router-dom'

const useTop = ({
    breadcrumbItems,
    dependency,
    freeze,
    subtitle,
    title,
}) => {

    let location = useLocation()

    const {
        setBreadcrumbItems,
        setIsFreezed,
        setSubtitle,
        setTitle,
    } = useContext(TopContext)

    useEffect(() => {
        setIsFreezed(freeze)
        setTitle(title)
        setSubtitle(subtitle)
        setBreadcrumbItems(breadcrumbItems instanceof Function ? breadcrumbItems(dependency) : breadcrumbItems)
        return () => {
            setIsFreezed(false)
        }
    }, [dependency])

    return {
    }
}

export default useTop
