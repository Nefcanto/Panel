import Blob from './Blob'

const Video = ({
    property,
    ...rest
}) => {

    return <Blob
        type='video'
        property={property || 'Video'}
        render={({ preview }) => <video
            src={preview?.url}
            className="w-full h-full"
            controls
        >
            Your browser does not support HTML video.
        </video>
        }
        {...rest}
    />
}

export default Video 
