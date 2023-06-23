import LinkOffIcon from '@mui/icons-material/LinkOff'
import {
    useEffect,
    useState,
} from 'react'
import { Transforms } from 'slate'
import {
    ReactEditor,
    useFocused,
    useSelected,
    useSlateStatic,
} from 'slate-react'
import removeLink from './RemoveLink'
import HolismIcon from '../../../HolismIcon'

const Link = ({
    attributes,
    children,
    element,
}) => {
    const [href, setHref] = useState(element.href)
    const [showInNewTab, setShowInNewTab] = useState(element.target === "_blank")
    const [isDownload, setIsdownload] = useState(element.isDownload)
    const editor = useSlateStatic()
    const selected = useSelected()
    const focused = useFocused()
    const path = ReactEditor.findPath(editor, element)
    const handleInputChange = ({ target }) => {
        if (target.type === 'checkbox') {
            setShowInNewTab(prev => !prev)
        }
        else {
            setHref(target.value)
            if (path) {
                Transforms.setNodes(editor, { href: target.value }, { at: path })
            }
        }
    }
    const handleIsDownloadLink = () => {
        setIsdownload(prev => !prev)
    }

    useEffect(() => {
        if (path) {
            Transforms.setNodes(editor, { target: showInNewTab ? "_blank" : "self", isDownload: isDownload }, { at: path })
        }
    }, [isDownload, showInNewTab])

    return (
        <span className='link inline relative' >
            <a
                href={element.href}
                {...attributes}
                {...element.attr}
                target={element.target}
            >
                {children}</a>
            {selected && focused && <>{<span
                className='link-popup absolute start-0 top-10 px-2 text-sm text-gray-800 flex flex-col bg-slate-200 px-1 py-2 gap-2 rounded-md w-fit z-20'
                contentEditable={false}
            >
                <span className='flex gap-x-2'>
                    <input
                        className="p-1 outline-none rounded"
                        type="text"
                        value={href}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        onClick={() => removeLink(editor)}>
                        <HolismIcon icon={LinkOffIcon} />
                    </button>
                </span>
                <span className='flex flex-col justify-between'>

                    <label
                        className="mx-1 flex gap-1"
                        htmlFor="newTab"
                    >
                        <input
                            type="checkbox"
                            id="newTab"
                            checked={showInNewTab}
                            onChange={handleInputChange}
                        />
                        <span>{app.t("Open in new tab")}</span>
                    </label>
                    <label
                        className="mx-1 flex gap-1"
                        htmlFor="download"
                    >
                        <input
                            type="checkbox"
                            id="download"
                            checked={isDownload}
                            onChange={handleIsDownloadLink} />
                        <span>{app.t("Downloadable")}</span>
                    </label>
                </span>
            </span>}
            </>
            }
        </span>
    )
}

export default Link
