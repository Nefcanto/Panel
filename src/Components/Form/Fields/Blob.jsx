import {
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDropzone } from 'react-dropzone'
import Fade from '@mui/material/Fade'
import app, { download } from 'App'
import { FormContext } from 'Contexts'
import { useField } from 'Hooks'
import fieldStyles from './FieldStyle'
import Field from './Field'
import Progress from '../../Progress'

const Blob = ({
    className,
    compress,
    doNotCompress,
    doNotResize,
    inForm,
    initialUrls,
    multiple,
    render,
    resize,
    type,
    ...rest
}) => {

    const field = useField({
        type: 'Upload',
        ...rest
    })
    const {
        progress,
        validateAll,
    } = field
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [hasBlobs, setHasBlobs] = useState(false)
    var { setHasFile } = useContext(FormContext) || { setHasFile: () => { } }
    const [fieldProgress, setFieldProgress] = useState()

    useEffect(() => {
        setHasFile(true)
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        app.selectedFiles = files
        setPreviews(files.map(file => {
            return {
                name: file.name,
                url: URL.createObjectURL(file)
            }
        }))
        return () => previews.map(preview => URL.revokeObjectURL(preview.url))
    }, [files])

    useEffect(() => {
        setHasBlobs(previews.length > 0)
        validateAll()
    }, [previews])

    const removeBlob = (e, preview, ...rest) => {
        setFiles(files.filter(i => i.name != preview.name))
        e.stopPropagation()
        e.preventDefault()
    }

    const loadBlobs = async (url) => {
        for (var i = 0; i < initialUrls.length; i++) {
            const index = i
            download(`/blobProxy/get?url=${initialUrls[i]}`)
                .then(file => {
                    setFiles([...files, file])
                    if (index === initialUrls.length - 1) {
                        setFieldProgress(false)
                    }
                }, e => {
                    console.log(e)
                })
        }
    }

    useEffect(() => {
        if (initialUrls?.length > 0) {
            setFieldProgress(true)
            loadBlobs()
        }
    }, [])

    const validate = () => {
        if (hasBlobs) {
            return true
        }
        return {
            error: 'required'
        }
    }

    return <Field
        validate={validate}
        {...rest}
        {...field}
        className="relative w-full"
    >
        <div
            className={fieldStyles + (previews.length === 0 ? " relative bg-slate-100 flex justify-center items-center py-20 cursor-pointer group hover:bg-slate-200 border-dashed border-2 border-slate-400 hover:border-slate-600 dark:bg-zinc-700 " : "")}
            {...getRootProps()}
        >
            <Fade in={hasBlobs}>
                <div className={`relative flex items-center gap-6 justify-around ${hasBlobs ? "" : "hidden"} ${className || ""}`}>
                    {
                        previews.map((preview, index) => {
                            return <div
                                key={index}
                                className="w-full h-full relative"
                            >
                                <div onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}>
                                    {render instanceof Function && render({ preview })}
                                </div>
                                <IconButton
                                    className="absolute -top-4 -end-4 z-30"
                                    onClick={(e) => removeBlob(e, preview)}
                                >
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        })
                    }
                </div>
            </Fade>
            <Fade in={!hasBlobs}>
                <div className="w-4/5 mx-auto text-center">
                    {
                        isDragActive && <div className="absolute inset-0 bg-green-500 animate-pulse"></div>
                    }
                    <input
                        {...getInputProps({ multipe: "false" })}
                        className='hidden'
                    />
                    <p className="relative text-sm tracking-wide font-bold text-slate-600 group-hover:drop-shadow group-hover:drop-shadow ">
                        {
                            isDragActive ?
                                <span>{app.t(`Drop the ${type} here ...`)}</span> :
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: app.t(`Drag &amp; drop a ${type} here, or click to select a ${type}`)
                                    }}
                                />
                        }
                    </p>
                </div>
            </Fade>
        </div>
        {
            (progress || fieldProgress) && !inForm &&
            <div className="absolute top-0 start-0 bottom-0 end-0 bg-gray-800 opacity-30 ">
                <Progress />
            </div>
        }
    </Field>
}

export default Blob 
