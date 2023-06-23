import Blob from './Blob'

const File = ({
    property,
    ...rest
}) => {

    return <Blob
        type='file'
        className="flex-col"
        property={property || 'File'}
        render={({ preview }) => <div>{preview.name}</div>}
        {...rest}
    />
}

export default File 
