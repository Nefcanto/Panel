import { useSlate } from 'slate-react'
import { upload } from 'App'
import { useMessage } from 'Hooks'
import HolismIcon from '../../../HolismIcon'
import insertImage from './InsertImage'
import UploadButton from './UploadButton'

const ImageButton = ({ format, icon, title }) => {
    const editor = useSlate()
    const { success, error } = useMessage()

    const handleButtonClick = (e) => {
        e.preventDefault()

        var form = new FormData()
        form.append('file', e.target.files[0])

        upload("/fileManager/upload", form)
            .then(data => {
                const embedFile = {
                    url: data,
                    alt: "",
                    title: ""
                }

                success('Image uploaded successfully')
                // insertEmbed(editor, embedFile, format)
                insertImage(editor, embedFile, format)
            }, e => {
                // insertEmbed(editor, embedFile, format)
                error(e)
            })
    }
    return (
        <UploadButton
            onChange={handleButtonClick}
            format={format}
            type="image"
            editor={editor}
            title={title}
        >
            <HolismIcon icon={icon} />
        </UploadButton>
    )
}

export default ImageButton
