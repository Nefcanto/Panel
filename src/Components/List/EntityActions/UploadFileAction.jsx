import { useDropzone } from 'react-dropzone'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CancelIcon from '@mui/icons-material/Cancel'
import {
    useCallback,
    useRef,
    useState,
} from 'react'
import HolismIcon from '../../HolismIcon'
import {
    DialogContext,
    FormContext,
} from 'Contexts'
import { useMessage } from 'Hooks'
import { Dialog } from 'List'
import { OkCancel } from 'Panel'
import app, {
    upload,
} from 'App'

const UploadFileAction = (props) => {

    const { entityGuid, uploadUrl } = props
    const { success, error } = useMessage()
    const dndInputRef = useRef(null)

    const [openUpload, setOpenUpload] = useState(false)
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState(false)
    const toggleLink = () => {

        setOpenUpload(prev => !prev)
    }
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const removeFile = (e) => {
        e.stopPropagation()
        setFiles([])
    }

    const CancelHandler = () => {
        setFiles([])
        setOpenUpload(false)
    }

    const handleButtonClick = (e) => {
        e.preventDefault()

        var form = new FormData()
        form.append('file', files[0])
        setProgress(true)
        upload(`${uploadUrl ? uploadUrl : "/fileManager/uploadFile"}`, form)
            .then(data => {

                success('Image uploaded successfully')
                setProgress(false)
            }, e => {

                error(e)
                setProgress(false)
            })

    }
    return (<>
        <div
            ref={dndInputRef}
            className={`popup-wrapper inline relative w-fit`}  >
            <button
                className='text-slate-900'
                format={'uploadFile'}
                onClick={toggleLink}
            >
                <HolismIcon icon={AttachFileIcon} />
            </button>
        </div>
        <DialogContext.Provider
            value={{
                open: openUpload,
                setOpen: setOpenUpload
            }}
        >
            <Dialog
                title='Upload file'
                content={<div
                    className={"w-full p-4 aspect-[2/1]"}>
                    <div
                        className={(files?.length === 0 ? "relative bg-slate-100 flex justify-center items-center py-20 cursor-pointer group hover:bg-slate-200 border-dashed border-2 border-slate-400 hover:border-slate-600 dark:bg-zinc-700 " : "py-20")}
                        {...getRootProps()}
                    >
                        <Fade in={files?.length > 0}>
                            <div className="relative flex items-center justify-around">
                                {files[0]?.name}
                                <IconButton
                                    className="absolute -top-4 -end-4 z-30"
                                    onClick={removeFile}
                                >
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        </Fade>
                        <Fade in={!files?.length > 0}>
                            <div>
                                {
                                    isDragActive && <div className="absolute inset-0 bg-green-500 animate-pulse"></div>
                                }
                                <input
                                    {...getInputProps({ multipe: "false" })}
                                    className='hidden'
                                />
                                <p className="relative text-sm tracking-wide font-bold text-slate-600 group-hover:drop-shadow group-hover:drop-shadow">
                                    {
                                        isDragActive ?
                                            <span>{app.t(`Drop the file here ...`)}</span> :
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: app.t(`Drag &amp; drop a file here, or click to select a file`)
                                                }}
                                            />
                                    }
                                </p>
                            </div>
                        </Fade>
                    </div>
                </div>
                }
                actions={
                    <OkCancel
                        progress={progress}
                        okClick={handleButtonClick}
                        cancelClick={CancelHandler}
                    />
                }
            />
        </DialogContext.Provider >
    </>
    )
}

export default UploadFileAction
