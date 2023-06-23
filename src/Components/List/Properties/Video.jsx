import {
    useContext,
    useEffect,
    useState,
} from 'react'
import UploadIcon from '@mui/icons-material/Upload'
import DeleteIcon from '@mui/icons-material/Delete'
import app, {
    post,
    upload,
} from 'App'
import {
    useForm,
    useMessage,
} from 'Hooks'
import {
    DialogContext,
    FormContext,
    ListContext,
    TableContext,
} from 'Contexts'
import Dialog from '../../Dialog/Dialog'
import Upload from '../../Form/Fields/Upload'
import OkCancel from '../../Dialog/OkCancel'
import FormElement from '../../Form/FormElement'
import HolismIcon from '../../HolismIcon'
import Warning from '../../Message/Warning'

const Image = ({
    alt,
    deletionUrl,
    guid,
    readOnly,
    uploadUrl,
    url,
}) => {

    const [uploadOpen, setUploadOpen] = useState(false)
    const [deletionOpen, setDeletionOpen] = useState(false)
    const [progress, setProgress] = useState(false)
    const { hasMoreRoom } = useContext(TableContext) || {}
    const { success, error } = useMessage()
    const {
        reloadEntity,
        separateRowForActions,
    } = useContext(ListContext)
    const [hasImage, setHasImage] = useState(false)

    const {
        ...formRest
    } = useForm({
        entityType: 'image'
    })

    useEffect(() => {
        const guid = url?.split('/')?.findLast(() => true)?.split('.')[0]
        setHasImage(guid !== '00000000-0000-0000-0000-000000000000')
    }, [url])

    const deleteImage = () => {
        if (!deletionUrl) {
            console.warn('deletion URL is not specified')
            return
        }
        setProgress(true)
        post(deletionUrl, guid)
            .then(data => {
                setProgress(false)
                success('Image deleted successfully')
                setDeletionOpen(false)
                reloadEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    const uploadImage = () => {
        var form = new FormData()
        app.selectedFiles.forEach(file => {
            form.append('file', file)
        })
        setProgress(true)
        upload(uploadUrl, form)
            .then(data => {
                setProgress(false)
                success('Image uploaded successfully')
                setUploadOpen(false)
                reloadEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    const showDeletion = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDeletionOpen(true)
    }

    return <>
        {hasMoreRoom && separateRowForActions && <div className="w-24"></div>}
        <div className={(hasMoreRoom ? (separateRowForActions ? " absolute top-2.5 start-2 w-24 h-24 " : " relative ") : " relative ") + " inline-block"}>
            {
                uploadUrl &&
                <DialogContext.Provider
                    value={{
                        open: uploadOpen,
                        setOpen: setUploadOpen
                    }}
                >
                    <FormContext.Provider
                        value={{
                            setHasFile: () => { },
                            ...formRest
                        }}
                    >
                        <Dialog
                            title='Upload image'
                            content={<>
                                <FormElement
                                    inputs={<>
                                        <Upload />
                                    </>}
                                />
                            </>}
                            actions={
                                <OkCancel
                                    progress={progress}
                                    okClick={() => uploadImage()}
                                    cancelClick={() => setUploadOpen(false)}
                                />
                            }
                        />
                    </FormContext.Provider>
                </DialogContext.Provider>
            }
            {
                hasImage &&
                <DialogContext.Provider
                    value={{
                        open: deletionOpen,
                        setOpen: setDeletionOpen
                    }}
                >
                    <Dialog
                        title='Delete image'
                        content={
                            <Warning
                                title='Note'
                                text='Are you sure you want to delete this image?'
                            />
                        }
                        actions={
                            <OkCancel
                                progress={progress}
                                okClick={() => deleteImage()}
                                cancelClick={() => setDeletionOpen(false)}
                            />
                        }
                    />
                </DialogContext.Provider>
            }
            <span className="group" onClick={() => setUploadOpen(true)}>
                <img src={url} alt={alt || ''} className={(hasMoreRoom ? (separateRowForActions ? " absolute w-24 h-24 " : "w-12 h-12") : "w-8 h-8 ") + " object-cover rounded-full " + (uploadUrl && "cursor-pointer group-hover:shadow-md group-hover:shadow-black transition-all")} />
                {
                    hasImage && !readOnly &&
                    <div
                        className="absolute w-8 h-8 top-0 right-0 bottom-0 left-0 opacity-0 transition-all cursor-pointer m-auto group-hover:opacity-100 group-hover:-left-16 hover:fill-red-400 grid place-items-center"
                        onClick={showDeletion}
                    >
                        <HolismIcon
                            icon={DeleteIcon}
                            className="hover:fill-red-400"
                        />
                    </div>
                }
                {
                    uploadUrl &&
                    <HolismIcon
                        icon={UploadIcon}
                        className={(hasMoreRoom ? (separateRowForActions ? " left-16" : "left-8 ") : "left-6 ") + " w-4 h-4 absolute bottom-0 cursor-pointer text-slate-900 bg-white  rounded-full p-0.5 group-hover:bg-slate-900 group-hover:text-white transition-colors"}
                    />
                }
            </span>
        </div>
    </>
}

export default Image 
