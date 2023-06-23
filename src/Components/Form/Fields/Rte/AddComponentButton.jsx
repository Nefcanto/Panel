import DoneIcon from '@mui/icons-material/Done'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import {
    useRef,
    useState,
} from 'react'
import { Transforms } from 'slate'
import { useEditor } from 'slate-react'
import isBlockActive from './IsBlockActive'
import usePopup from './UsePopup'
import Button from './Button'
import HolismIcon from '../../../HolismIcon'
import app from 'App'

const AddComponentButton = (props) => {
    const { title } = props
    const editor = useEditor()
    const linkInputRef = useRef(null)
    const [showInput, setShowInput] = usePopup(linkInputRef)
    const [componentName, setComponentName] = useState("")
    const [attributes, setAttributes] = useState([])
    const [selection, setSelection] = useState()

    const insertComponentHandler = () => {

        const Filteredattributes = attributes.filter(({ name, value }) => name && value)
        const pattern = /^[A-Z][A-Za-z]*$/
        const componentNode = {
            type: 'component',
            componentName,
            attributes: Filteredattributes,
            children: [{ text: '' }],
        }
        if (!componentName) {
            alert(app.t("Please insert component name"))
        }
        if (componentName && !pattern.test(componentName)) {
            alert(app.t("Component must be PascalCase"))
        }
        if (componentName && pattern.test(componentName)) {

            Transforms.insertNodes(editor, componentNode)
            setShowInput(prev => !prev)
            setAttributes([])
            setComponentName("")
        }
    }
    const toggleLink = () => {
        setSelection(editor.selection)
        setShowInput(prev => !prev)
    }
    const handleComponentName = ({ target }) => {
        setComponentName(target.value)
    }
    const addNewAttributeHandler = () => {

        setAttributes(prev => ([...prev, { id: new Date().toISOString(), name: "", value: "" }]))
    }

    const deleteAttributeHandler = (id) => {
        setAttributes(prev => prev.filter(item => item.id !== id))
    }

    const AttributeNameChangeHandler = (e, id) => {
        const cpAttributes = structuredClone(attributes)
        const selectedAttribute = cpAttributes.find(item => item.id === id)
        selectedAttribute.name = e.target.value
        setAttributes(cpAttributes)
    }

    const AttributeValueChangeHandler = (e, id) => {
        const cpAttributes = structuredClone(attributes)
        const selectedAttribute = cpAttributes.find(item => item.id === id)
        selectedAttribute.value = e.target.value
        setAttributes(cpAttributes)
    }

    return (
        <div
            ref={linkInputRef}
            className={`popup-wrapper inline relative w-fit`}
            title={title}
        >
            <Button
                className={showInput ? 'text-slate-900' : 'text-slate-200'}
                active={isBlockActive(editor, 'component')}
                format={'component'}
                onClick={toggleLink}
            >
                <HolismIcon icon={DeveloperModeIcon} />
            </Button>
            {
                showInput &&
                <div className='popup absolute z-20 bg-gray-200 top-12 start-0 translate-x-[-50%] w-[400px] p-1 border text-sm rounded-sm py-4'>
                    <div
                        className="flex gap-2 mx-1 my-2 justify-center"
                    >
                        <input
                            type="text"
                            className="border px-0.5 w-[200px]"
                            placeholder='ComponentName'
                            value={componentName}
                            onChange={handleComponentName} />
                        <div
                            className="cursor-pointer"
                            onClick={insertComponentHandler}
                        >
                            <HolismIcon
                                icon={DoneIcon}
                                className="fill-green-500 hover:bg-green-100 transition-all rounded-sm hover:scale-110"
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-1 flex-col items-center gap-y-2">
                        <div className="flex items-center gap-x-2 justify-center mt-2">
                            <p className="">{app.t("Attributes")}</p>
                            <button
                                type="button"
                                onClick={addNewAttributeHandler}>
                                <HolismIcon
                                    icon={AddCircleOutlineOutlinedIcon}
                                    className="fill-green-800 text-md"
                                />
                            </button>
                        </div>
                        {attributes.map(({ id, name, value }) =>
                            <div
                                key={id}
                                className="w-full flex justify-between items-center gap-3 border border-b">
                                <div className="w-1/2 flex items-center">
                                    <span className="text-xs">{app.t("Name")}:</span>
                                    <input
                                        type="text"
                                        className="border border-transparent outline-none focus:border-green-400 px-1 w-full rounded-sm"
                                        value={name}
                                        onChange={(e) => AttributeNameChangeHandler(e, id)}
                                    />
                                </div>
                                <div className="w-1/2 flex items-center">

                                    <span className="text-xs">{app.t("Value")}: </span>
                                    <input
                                        type="text"
                                        className="border border-transparent outline-none focus:border-green-400 px-1 w-full rounded-sm"
                                        value={value}
                                        onChange={(e) => AttributeValueChangeHandler(e, id)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => deleteAttributeHandler(id)}
                                    tabIndex="-1"
                                >
                                    <HolismIcon
                                        icon={RemoveCircleOutlineOutlinedIcon}
                                        className="text-sm fill-red-600"
                                    />
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default AddComponentButton
