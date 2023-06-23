import {
    Children,
    cloneElement,
    useContext,
    useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import app from 'App'
import {
    ListContext,
    PanelContext,
} from 'Contexts'
import AddAction from './AddAction'
import PopulateAction from './PopulateAction'

const ListActions = () => {
    let navigate = useNavigate()

    const {
        entityType,
        listActions,
        selectedEntities,
        setHasEntitySelection,
    } = useContext(ListContext)

    const { fakeDataGenerators } = useContext(PanelContext)

    let clonedListActions = null
    let actionItems = null

    if (typeof listActions === 'function') {
        var actionsReturn = listActions(selectedEntities)
        if (actionsReturn.props.children) {
            actionItems = actionsReturn.props.children
        }
        else {
            actionItems = actionsReturn
        }
    }
    else {
        if (listActions) {
            if (listActions.props.children) {
                actionItems = listActions.props.children
            }
            else {
                actionItems = listActions
            }
        }
    }

    if (actionItems) {
        clonedListActions =
            Children
                .toArray(actionItems)
                .filter(listAction => {
                    if (listAction.props && listAction.props.superAdmin) {
                        return app.isSuperAdmin()
                    }
                    if (listAction.props && listAction.props.devOnly) {
                        return app.isDev()
                    }
                    return true
                })
                .map(listAction => cloneElement(listAction, {

                }))
    }

    useEffect(() => {
        setHasEntitySelection(clonedListActions?.filter(i => i.props && !i.props.notApplicableToEntities).length > 0)
    }, [])

    return <div
        id='listActions'
        className=
        {
            'flex flex-wrap items-center mb-2 lg:mb-0 '
        }
    >
        <AddAction />
        {app.isDev() && fakeDataGenerators.includes(entityType) && <PopulateAction />}
        {
            clonedListActions?.map((action, index) => {
                if (action.props.minCardinality) {
                    if (selectedEntities.length >= action.props.minCardinality) {
                        return <span key={index}>
                            {
                                action
                            }
                        </span>
                    }
                    return <span key={index}>
                        {
                            action
                        }
                    </span>
                }
                else {
                    return <span key={index}>
                        {
                            action
                        }
                    </span>
                }
            })
        }
    </div>
}

export default ListActions
