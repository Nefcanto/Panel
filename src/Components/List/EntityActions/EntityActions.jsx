import React, {
    useContext,
    useState,
} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import app from 'App'
import {
    EntityContext,
    ListContext
} from 'Contexts'
import Unify from '../../Unify'
import DeleteAction from './DeleteAction'
import EditAction from './EditAction'
import ViewRecordAction from './ViewRecordAction'
import ReloadEntityAction from './ReloadEntityAction'

const EntityActions = ({
    className,
    entityActions,
}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const {
        create,
        edit,
        hasDelete,
        hasEdit,
        menuForActions,
        reload,
        setEntity,
        upsert,
    } = useContext(ListContext)

    const {
        entity
    } = useContext(EntityContext)

    const open = Boolean(anchorEl)
    let clonedEntityActions = []

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    if (entityActions) {
        let entityActionsArray = null
        if (typeof entityActions === 'function') {
            var entityActionsList = entityActions(entity)
            if (entityActionsList === undefined) {
                throw "No entity actions is returned. Use fragments, or do not forget the 'return' keyword."
            }
            entityActionsArray = entityActionsList.props.children
            if (entityActionsArray && entityActionsArray.props && entityActionsArray.props.children) {
                entityActionsArray = entityActionsArray.props.children
            }
        }
        else {
            entityActionsArray = entityActions.props.children
        }

        if (entityActionsArray) {
            clonedEntityActions = React
                .Children
                .toArray(entityActionsArray)
                .filter(entityAction => {
                    if (entityAction.props && entityAction.props.superAdmin) {
                        return app.isSuperAdmin()
                    }
                    if (entityAction.props && entityAction.props.devOnly) {
                        return app.isDev()
                    }
                    return true
                })
                .map((entityAction, index) => <Unify
                    key={index}
                    component={entityAction}
                    {...entityAction.props}
                    entity={entity}
                    setEntity={setEntity}
                    reload={reload}
                    closeMenu={handleClose}
                />)
        }
    }

    const deleteRecord = hasDelete && <DeleteAction />

    /*
        upsert={EntityForm}
        hasEdit
        edit={entity => `/entity/edit/${entity.id}`}
        edit={EditEntity}

        either upsert, or edit URL, or edit component, or create + hasEdit
    */
    const editRecord = ((hasEdit && create) || edit || upsert) && <EditAction />

    const viewRecord = app.isDevOrSuperAdmin() && <ViewRecordAction />

    const reloadEntity = app.isDev() && <ReloadEntityAction />

    return menuForActions
        ?
        <>
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: app.isRtl() ? 'left' : 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: app.isRtl() ? 'left' : 'right',
                }}
            >

                {
                    clonedEntityActions.map((entityAction, index) => <span key={index}>
                        {entityAction}
                    </span>)
                }
                {deleteRecord}
                {editRecord}
                {viewRecord}
                {reloadEntity}
            </Menu>
        </>
        :
        <span className={className}>
            {
                entity.progress
                    ?
                    <span className="flex flex-wrap items-center justify-end px-2">
                        <Fade in={entity.progress}>
                            <CircularProgress size={24} className="mt-2" />
                        </Fade>
                    </span>
                    :
                    <span className="flex flex-wrap items-center justify-end">
                        {/* <Fade in={!entity.progress}> */}
                        <>
                            {
                                clonedEntityActions.map((entityAction, index) => entityAction)
                            }
                            {deleteRecord}
                            {editRecord}
                            {viewRecord}
                            {reloadEntity}
                        </>
                        {/* </Fade> */}
                    </span>
            }
        </span>
}

export default EntityActions
