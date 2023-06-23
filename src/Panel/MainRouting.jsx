import {
    useEffect,
    useState,
} from 'react'
import {
    Route,
    Routes,
    useSearchParams,
} from 'react-router-dom'
import app, { get } from 'App'
import NotFound from './NotFound'
import Test from './Test'
import routes from '../Routes'
import Unify from '../Components/Unify'
import * as Modules from '../Modules'
import BigFileUpload from './Simulation/BigFileUpload'
import TabsSample from './Samples/Tabs'
import Form from './Samples/Form'

let initialRoutes = routes
if (app.isDevOrSuperAdmin()) {
    initialRoutes = [...initialRoutes, {
        path: '/bigFileUpload',
        component: BigFileUpload
    }, {
        path: '/tabs',
        component: TabsSample
    }, {
        path: '/form',
        component: Form
    }]
}

const MainRouting = ({
    progress,
    setProgress,
}) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [allRoutes, setAllRoutes] = useState(initialRoutes)
    const [parentEntity, setParentEntity] = useState()
    const {
        grandparentEntityType,
        grandparentIdKey,
        parentEntityType,
        parentIdKey,
    } = app.parseQuery()
    const [grandparentEntity, setGrandparentEntity] = useState()

    useEffect(() => {
        const addRoutes = (module, moduleRoutes) => {
            let newRoutes = []
            for (let i = 0; i < moduleRoutes.length; i++) {
                const moduleRoute = moduleRoutes[i]
                if (moduleRoute.superAdmin && !app.isSuperAdmin()) {
                    continue
                }
                if (!allRoutes.find(route => route.path === moduleRoute.path)) {
                    newRoutes.push(moduleRoute)
                }
            }

            setAllRoutes(previousRoutes => {
                const combinedRoutes = [...new Set([...previousRoutes, ...newRoutes])]
                    .sort((a, b) => a.path.localeCompare(b.path))
                return combinedRoutes
            })
        }
        for (const module in Modules) {
            const moduleRoutes = Modules[module][`${module}Routes`]
            if (moduleRoutes && Array.isArray(moduleRoutes)) {
                addRoutes(module, moduleRoutes)
                addRoutes(module, moduleRoutes)
            }
        }
    }, [])

    const loadGrandparentEntity = () => {
        if (grandparentEntityType) {
            setProgress(true)
            const parsedQuery = app.parseQuery()
            let grandparentId = undefined
            if (parsedQuery.grandparentId) {
                grandparentId = parsedQuery.grandparentId
            }
            if (grandparentIdKey) {
                grandparentId = parsedQuery[grandparentIdKey]
            }
            if (!grandparentId) {
                grandparentId = parsedQuery.id
            }
            setTimeout(() => {
                get(`/${app.camelize(grandparentEntityType)}/get/${grandparentId}`)
                    .then(data => {
                        setGrandparentEntity(data)
                        loadParentEntity()
                    }, e => {
                        setProgress(false)
                        error(e)
                    })
            }, 0)
        }
        else {
            setGrandparentEntity(null)
            loadParentEntity()
        }
    }

    const loadParentEntity = () => {
        if (parentEntityType) {
            setProgress(true)
            const parsedQuery = app.parseQuery()
            let parentId = undefined
            if (parsedQuery.parentId) {
                parentId = parsedQuery.parentId
            }
            if (parentIdKey) {
                parentId = parsedQuery[parentIdKey]
            }
            if (!parentId) {
                parentId = parsedQuery.id
            }
            setTimeout(() => {
                get(`/${app.camelize(parentEntityType)}/get/${parentId}`)
                    .then(data => {
                        setProgress(false)
                        setParentEntity(data)
                    }, e => {
                        setProgress(false)
                        error(e)
                    })
            }, 0)
        }
        else {
            setParentEntity(null)
        }
    }

    useEffect(() => {
        loadGrandparentEntity()
    }, [parentEntityType, parentIdKey, grandparentEntityType, grandparentIdKey])

    useEffect(() => {
        // console.log(allRoutes)
        window.routes = allRoutes
    }, [allRoutes])

    return (
        <Routes>
            <Route
                path='/test'
                element={<Test />}
            />
            {
                allRoutes.filter(entity => {
                    if (entity.superAdmin === true) {
                        return app.isSuperAdmin()
                    }
                    else {
                        return true
                    }
                }).map(route => {
                    return <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Unify
                                component={route.component}
                                isSuperAdmin={app.isSuperAdmin()}
                                parentEntity={parentEntity}
                                grandparentEntity={grandparentEntity}
                                progress={progress}
                                query={searchParams.toString()}
                                setProgress={setProgress}
                            />
                        }
                    />
                })
            }
            <Route
                path='*'
                element={<NotFound />}
            />
        </Routes>
    )
}

export default MainRouting
