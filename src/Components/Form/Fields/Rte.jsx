import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { createEditor } from 'slate'
import {
    Editable,
    Slate,
    withReact,
} from 'slate-react'
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'
import app from 'App'
import { FormContext } from 'Contexts'
import { useField } from 'Hooks'
import HotKeys from './Rte/HotKeys'
// import toggleMark from './Rte/ToggleMark'
import withLinks from './Rte/WithLinks'
import ComplexToolbar from './Rte/ComplexToolbar'
import SlateElement from './Rte/Element'
import Leaf from './Rte/Leaf'

const Rte = ({
    placeholder,
    property,
    simple,
    ...rest
}) => {
    const [currentValue, setCurrentValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ])
    const renderElement = useCallback(props => <SlateElement {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(withLinks(createEditor()))), [])
    editor.children = currentValue
    const { currentEntity } = useContext(FormContext)

    const field = useField({
        placeholder,
        property,
        type: 'Rte',
        ...rest
    })
    const { setChosenValue } = field

    useEffect(() => {
        if (currentEntity) {
            const value = currentEntity[app.camelize(property)]
            const json = JSON.parse(value)
            if (Array.isArray(json) && json.length > 0) {
                setCurrentValue(JSON.parse(value))
            }
        }
    }, [property, currentEntity])

    useEffect(() => {
        const json = JSON.stringify(currentValue)
        app.rteJson = json
        setChosenValue(app.rteJson)
    }, [currentValue])

    return <div className="mb-12 pb-12 border-b-2">
        <Slate
            editor={editor}
            initialValue={currentValue}
            onChange={val => setCurrentValue(val)}
        >
            {
                simple
                    ?
                    <h1>Simple toolbar</h1>
                    :
                    <ComplexToolbar editor={editor} />
            }
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder={app.t(placeholder || "Write your content here ...")}
                spellCheck
                className="prose md:prose-lg lg:prose-xl xl:prose-2xl max-w-none dark:text-gray-200 outline-none"
                autoFocus
                // onKeyDown={event => {
                //     for (const hotkey in HotKeys) {
                //         console.log("ishotkey", isHotkey(hotkey, event))
                //         if (isHotkey(hotkey, event)) {
                //             event.preventDefault()
                //             const mark = HotKeys[hotkey]
                //             toggleMark(editor, mark)
                //         }
                //     }
                // }}
            />
        </Slate>
    </div>
}

export default Rte 
