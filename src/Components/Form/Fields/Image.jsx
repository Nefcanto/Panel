import Blob from './Blob'

const Image = ({
    property,
    ...rest
}) => {

    return <Blob
        type='image'
        property={property || 'Image'}
        render={({ preview }) => <img
            className="rounded-lg shadow-md shadow-black object-cover "
            src={preview?.url}
        />
        }
        {...rest}
    />
}

export default Image 
