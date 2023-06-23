import InsertLinkIcon from '@mui/icons-material/InsertLink'
import AddLinkIcon from '@mui/icons-material/AddLink'
import {
    useRef,
    useState,
} from 'react'
import { Transforms } from 'slate'
import insertLink from './InsertLink'
import isBlockActive from './IsBlockActive'
import usePopup from './UsePopup'
import Button from './Button'
import HolismIcon from '../../../HolismIcon'
import app from 'App'

const LinkButton = (props) => {
    const { editor, title } = props
    const linkInputRef = useRef(null)
    const [showInput, setShowInput] = usePopup(linkInputRef)
    const [url, setUrl] = useState('')
    const [showInNewTab, setShowInNewTab] = useState(false)
    const [selection, setSelection] = useState()
    const [isDownload, setIsdownload] = useState(false)
    const handleInsertLink = () => {
        console.log("selection", selection)
        Transforms.select(editor, selection)
        insertLink(editor, { url, showInNewTab, isDownload })
        setUrl('')
        setShowInput(prev => !prev)
        setShowInNewTab(false)
    }
    const toggleLink = () => {
        setSelection(editor.selection)
        setShowInput(prev => !prev)
    }
    const handleInputChange = ({ target }) => {
        if (target.type === 'checkbox') {
            setShowInNewTab(prev => !prev)
        }
        else {
            setUrl(target.value)
        }
    }
    const handleIsDownloadLink = () => {
        setIsdownload(prev => !prev)
    }
    return (
        <div
            ref={linkInputRef}
            className={`popup-wrapper inline relative w-fit`}
            title={title}
        >
            <Button
                className={showInput ? 'text-slate-900' : 'text-slate-200'}
                active={isBlockActive(editor, 'link')}
                format={'link'}
                onClick={toggleLink}
            >
                <HolismIcon icon={InsertLinkIcon} />
            </Button>
            {
                showInput &&
                <div className='popup absolute z-10 top-12 start-0 translate-x-[-50%] w-[300px] p-1 border'>
                    <div
                        className="flex gap-2 mx-1 my-2"
                    >
                        <input
                            type="text"
                            className="border px-0.5"
                            placeholder='https://google.com'
                            value={url}
                            onChange={handleInputChange} />
                        <div
                            className="cursor-pointer"
                            onClick={handleInsertLink}>
                            <HolismIcon icon={AddLinkIcon} />
                        </div>
                    </div>
                    <div className="flex gap-x-3">

                        <label
                            htmlFor="openNewTab"
                            className="flex gap-1 items-center">
                            <input
                                type="checkbox"
                                id="openNewTab"
                                checked={showInNewTab}
                                onChange={handleInputChange}
                            />
                            <span>{app.t("Open in new tab")}</span>
                        </label>
                        <label
                            htmlFor="isSownloadAble"
                            className="flex gap-1 items-center"
                        >
                            <input
                                type="checkbox"
                                id="isSownloadAble"
                                checked={isDownload}
                                onChange={handleIsDownloadLink} />
                            <span>{app.t("Downloadable")}</span>
                        </label>
                    </div>

                </div>
            }
        </div>
    )
}

export default LinkButton
