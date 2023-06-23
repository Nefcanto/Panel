import {
    forwardRef,
    useRef,
    useState,
} from 'react'
import DoneIcon from '@mui/icons-material/Done'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Transforms } from 'slate'
import {
    ReactEditor,
    useFocused,
    useSelected,
    useSlateStatic,
} from 'slate-react'
import usePopup from './UsePopup'
import HolismIcon from '../../../HolismIcon'
import app from 'App'

const ComponentElement = forwardRef((
    {
        children,
        element
    }, ref) => {
    const componentElementRef = useRef(null)
    const [showInput, setShowInput] = usePopup(componentElementRef)
    const [componentName, setComponentName] = useState(element.componentName)
    const [attributes, setAttributes] = useState(element.attributes)
    const editor = useSlateStatic()
    const selected = useSelected()
    const focused = useFocused()
    const path = ReactEditor.findPath(editor, element)

    const isChangedAttribute = JSON.stringify(attributes) !== JSON.stringify(element.attributes) || element.componentName !== componentName

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

        if (path && componentName && pattern.test(componentName)) {
            Transforms.setNodes(editor, { ...componentNode }, { at: path })
        }
        setShowInput(prev => !prev)
    }

    const RemoveComponentHandler = () => {
        const { selection } = editor
        Transforms.removeNodes(editor, { at: selection })
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
            contentEditable={false}
            ref={componentElementRef}
            className="relative h-fit w-[70px] mx-auto flex items-center justify-center" >
            <IntegrationInstructionsOutlinedIcon />
            <div
                onClick={() => setShowInput(prev => !prev)}
                className="absolute w-full h-full">
                {children}
            </div>
            {
                selected
                &&
                showInput
                &&
                <div
                    className='absolute z-50 bg-gray-200 top-12 start-0 translate-x-[-50%] w-[400px] p-1 border text-sm rounded-sm py-4'>
                    <div
                        className="flex gap-2 mx-1 my-2 justify-center"
                    >
                        <div
                            className="cursor-pointer"
                            onClick={RemoveComponentHandler}>
                            <HolismIcon
                                icon={HighlightOffIcon}
                                className="fill-red-500 hover:bg-red-100 transition-all rounded-sm hover:scale-110" />
                        </div>
                        <input
                            type="text"
                            className="border px-0.5 w-[200px]"
                            placeholder='ComponentName'
                            value={componentName}
                            onChange={handleComponentName}
                        />
                        <div
                            className="cursor-pointer relative"
                            onClick={insertComponentHandler}>
                            <HolismIcon
                                icon={DoneIcon}
                                className={`${isChangedAttribute ? "fill-green-500 hover:bg-green-100 hover:scale-110 " : "fill-gray-100"}   transition-all rounded-sm `}
                            />
                            {isChangedAttribute && <div className={`w-2 h-2 absolute inset-0 bg-green-500 rounded-full ${isChangedAttribute ? "animate-ping" : ""}`} />}
                        </div>
                    </div>
                    <div className="flex gap-x-1 flex-col items-center gap-y-2">
                        <div className="flex items-center gap-x-2 justify-center mt-2">
                            <p className="">{app.t("Attributes")}:</p>
                            <button
                                type="button"
                                onClick={addNewAttributeHandler}>
                                <HolismIcon
                                    icon={AddCircleOutlineOutlinedIcon}
                                    className="fill-green-800 text-md"
                                />
                            </button>
                        </div>
                        {attributes.map(({ id, name, value }) => <div
                            key={id}
                            className="w-full flex justify-between items-center gap-3 border border-b">
                            <div className="w-1/2 flex items-center">
                                <span className="text-xs">name: </span>
                                <input
                                    type="text"
                                    className="border border-transparent outline-none focus:border-green-400 px-1 w-full rounded-sm"
                                    value={name}
                                    onChange={(e) => AttributeNameChangeHandler(e, id)}
                                />
                            </div>
                            <div className="w-1/2 flex items-center">
                                <span className="text-xs">{app.t("Name")}: </span>
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
})

export default ComponentElement
