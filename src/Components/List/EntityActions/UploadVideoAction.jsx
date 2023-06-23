import VideoFileIcon from '@mui/icons-material/VideoFile'
import EntityAction from './EntityAction'
import {
    DialogForm,
    Video,
} from 'Form'

const DialogUploadVideo = ({
    uploadUrl,
    ...rest
}) => {
    return <DialogForm
        title='Upload video'
        submitTo={uploadUrl}
        inputs={<Video />}
        {...rest}
    />
}

const UploadVideoAction = ({ title, ...rest }) => {

    return <>
        <EntityAction
            title={title ?? 'Upload Video'}
            dialog={DialogUploadVideo}
            icon={VideoFileIcon}
            {...rest}
        />
    </>
}

export default UploadVideoAction
