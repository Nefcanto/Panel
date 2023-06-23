import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft'
import DeleteIcon from '@mui/icons-material/Delete'

import React, {
    useRef,
    useState,
} from 'react'
import {
    Path,
    Transforms,
} from 'slate'
import {
    ReactEditor,
    useEditor,
    useFocused,
    useSelected,
} from 'slate-react'

const ImageElement = ({
    attributes,
    children,
    element,
}) => {
    const selected = useSelected()
    const focused = useFocused()
    const editor = useEditor()
    const titleRef = useRef()
    const [alt, setAlt] = useState(element.alt)
    const [title, setTitle] = useState(element.title)

    const path = ReactEditor.findPath(editor, element)
    const handleAltChange = (event) => {
        setAlt(event.target.value)
        if (path) {
            Transforms.setNodes(editor, { alt: event.target.value }, { at: path })
        }
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
        if (path) {
            Transforms.setNodes(editor, { title: event.target.value }, { at: path })
        }
    }
    const AddNewLineHandler = () => {
        const newP = { type: 'paragraph', children: [{ text: '' }] }
        Transforms.insertNodes(editor, newP, { at: Path.next(path), select: true })
    }

    const RemoveImageHandler = () => {
        const { selection } = editor
        Transforms.removeNodes(editor, { at: selection })
    }

    const onPressTabButton = (e) => {
        if (e.key === 'Tab') {
            alert("press")
            titleRef.current.focus()
        }
    }

    return (
        <div
            {...attributes}
            className="relative h-fit ">
            <div
                className={`relative max-w-[250px] mx-auto`}
                contentEditable={false}
            >
                <img
                    src={element.url}
                    alt={element.alt}
                    className={`w-full max-w-[250px] h-auto ${selected && focused && "border-2 border-green-500"}`}
                />
                {selected && focused && <DeleteIcon
                    className="absolute z-20 -top-2 start-[100px] w-10 aspect-[1/1] text-red-800 bg-slate-200 cursor-pointer"
                    onClick={RemoveImageHandler}
                />}
                {selected && focused && <input
                    className="absolute top-5 start-2 w-52 text-[18px] p-1 z-20 outline-none"
                    type="text"
                    placeholder="image alt"
                    value={alt}
                    onChange={handleAltChange}
                    onKeyPress={onPressTabButton}
                />}
                {selected && focused && <input
                    className="absolute top-16 start-2 w-52 text-[18px] p-1 z-20 outline-none"
                    type="text"
                    ref={titleRef}
                    placeholder="image title"
                    value={title}
                    onChange={handleTitleChange}
                />}
                {selected && focused && <SubdirectoryArrowLeftIcon
                    className="absolute z-20 -bottom-2 start-[100px] w-10 aspect-[1/1] text-slate-800 bg-red-200 cursor-pointer"
                    onClick={AddNewLineHandler}
                />}
            </div>
            <div
                contentEditable={false}
                className="absolute block w-full h-full top-0 start-0 z-10">
                {children}
            </div>

        </div>
    )
}

export default ImageElement
