import { useMemo } from 'react'
import {
    // useHistory,
    useLocation,
    useParams,
} from 'react-router-dom'
import app from 'App'

const useRouter = () => {

    const params = useParams()
    const location = useLocation()
    // const history = useHistory()
    const parsedQuery = app.parseQuery()

    return useMemo(() => {
        return {
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,
            query: {
                ...parsedQuery,
                ...params,
            },
            location,
            // history,
        }
    }, [params, match, location, history])
}

export default useRouter
