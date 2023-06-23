import {
    useEffect,
    useState,
} from 'react'
import UploadIcon from '@mui/icons-material/Upload'
import app from 'App'
import { upload } from 'App'
import {
    useForm,
    useMessage,
} from 'Hooks'
import {
    DialogContext,
    FormContext,
} from 'Contexts'
import { Dialog } from 'List'
import {
    FormElement,
    HolismIcon,
    Image,
} from 'Form'
import { OkCancel } from 'Panel'

const ProfileImage = ({
    alt,
    loadEntity,
    uploadUrl,
    url,
}) => {

    const [uploadOpen, setUploadOpen] = useState(false)
    const [progress, setProgress] = useState(false)
    const { hasMoreRoom } = {}
    const { success, error } = useMessage()
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
                loadEntity()

            }, e => {
                setProgress(false)
                error(e)
            })
    }
    return <>
        {hasMoreRoom && true && <div className="w-24"></div>}
        <div className={(hasMoreRoom ? (true ? " absolute top-2.5 start-2 w-24 h-24 " : " relative ") : " relative ") + " inline-block"}>
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
                                        <Image />
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
            <span className="group" onClick={() => setUploadOpen(true)}>
                <img src={url} alt={alt || ''} className={"w-full aspect-square object-cover rounded-full cursor-pointer group-hover:shadow-md group-hover:shadow-black transition-all"} />
                {
                    uploadUrl &&
                    <HolismIcon
                        icon={UploadIcon}
                        className={(hasMoreRoom ? (true ? " left-16" : "left-8 ") : "left-6 ") + " w-4 h-4 absolute bottom-0 cursor-pointer text-slate-900 bg-white  rounded-full p-0.5 group-hover:bg-slate-900 group-hover:text-white transition-colors"}
                    />
                }
            </span>
        </div>
    </>
}

export default ProfileImage 
