import {
    useContext,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import app from 'App'
import {
    DialogContext,
    EntityContext,
    ListContext,
} from 'Contexts'
import Unify from '../../Unify'
import EntityAction from './EntityAction'

const EditAction = () => {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const {
        create,
        edit,
        entityType,
        hasEdit,
        upsert,
    } = useContext(ListContext)
    const { entity } = useContext(EntityContext)

    const hasHooks = (component) => {
        if (!component) {
            return false
        }
        if (component.toString instanceof Function) {
            return /\buse[A-Z]/.test(component.toString())
        }
        return false
    }

    const manageEdition = (component) => {
        if (typeof component === 'string') {
            navigate(component)
        }
        else {
            if (component instanceof Function) {
                if (hasHooks(component)) {
                    setOpen(true)
                }
                else {
                    var result = component(entity)
                    if (typeof result === 'object') {
                        setOpen(true)
                    }
                    else if (typeof result === 'string') {
                        navigate(result)
                    }
                    else {
                        app.error('For edition, either provide a component, or a URL')
                    }
                }
            }
            else {
                setOpen(true)
            }
        }
    }

    const editAction = <EntityAction
        icon={<EditIcon style={{ color: '#10B981' }} />}
        title={app.t("Edit")}
        click={() => {
            if (edit) {
                if (edit instanceof Function) {
                    if (hasHooks(edit)) {
                        manageEdition(edit)
                    }
                    else {
                        manageEdition(edit({ entity }))
                    }
                }
                else {
                    manageEdition(edit)
                }
            }
            else if (upsert) {
                manageEdition(upsert)
            }
            else if (hasEdit) {
                if (create) {
                    manageEdition(create)
                }
                else {
                    app.error('You specified hasEdit but has not provided a creation component.')
                }
            }
        }}
    />

    const showEditAction = edit instanceof Function ? edit({ entity }) : true

    return <DialogContext.Provider
        value={{
            open,
            setOpen,
            entity,
        }}
    >
        {
            !edit && create && typeof create !== 'string' &&
            <Unify
                component={create}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {
            upsert && typeof upsert !== 'string' &&
            <Unify
                component={upsert}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {
            edit && typeof edit !== 'string' && typeof edit !== 'function' &&
            <Unify
                component={edit instanceof Function ? edit({ entity }) : edit}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {showEditAction && editAction}
    </DialogContext.Provider>
}

export default EditAction
