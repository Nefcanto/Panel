import {
    useContext,
    useState,
} from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import WarningIcon from '@mui/icons-material/Warning'
import CircularProgress from '@mui/material/CircularProgress'
import app, { post } from 'App'
import {
    DialogContext,
    EntityContext,
    ListContext,
} from 'Contexts'
import { useMessage } from 'Hooks'
import EntityAction from './EntityAction'
import HolismIcon from '../../HolismIcon'
import Dialog from '../../../Components/Dialog/Dialog'
import OkCancel from '../../../Components/Dialog/OkCancel'

const DeleteAction = () => {

    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(false)

    const {
        entityType,
        reload,
    } = useContext(ListContext)
    const { entity } = useContext(EntityContext)
    const {
        error,
        success,
    } = useMessage()

    const deleteItem = () => {
        setOpen(false)
        const url = `${app.camelize(entityType)}/delete/${entity.id}`
        setProgress(true)
        post(url).then(data => {
            success(app.t("Deleted successfully"))
            setProgress(false)
            reload()
        }, e => {
            error(e)
            setProgress(false)
        })
    }

    const confirmationDialog = <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <Dialog
            tiny
            title={app.t('Confirmation')}
            content={<div className="flex justify-center items-center flex-col sm:flex-row">
                <HolismIcon
                    icon={WarningIcon}
                    className="text-red-400 text-5xl me-4"
                />
                <span>
                    {app.t('Are you sure you want to delete this entity?')}
                </span>
                {/* todo: Show some information form the selected entity, to enhance UX */}
            </div>}
            actions={<OkCancel
                okText='Yes'
                cancelText='No'
                cancelClick={() => setOpen(false)}
                okClick={deleteItem}
            />}
        />
    </DialogContext.Provider>

    return <>
        {
            entity.isVital && !app.isSuperAdmin()
                ?
                null
                :
                <>
                    {confirmationDialog}
                    {
                        progress
                            ?
                            <CircularProgress size={24} className="m-2" />
                            :
                            <EntityAction
                                icon={<DeleteIcon style={{ color: '#EF4444' }} />}
                                title={app.t("Delete")}
                                click={(e) => {
                                    setOpen(true)
                                }}
                            />
                    }
                </>
        }
    </>
}

export default DeleteAction
