import AutoModeIcon from '@mui/icons-material/AutoMode'
import { Transforms } from 'slate'
import { useSlate } from 'slate-react'
import SampleJson from './SampleJson'
import Button from './Button'
import HolismIcon from '../../../HolismIcon'

const GenerateData = (props) => {

    const { title } = props
    const editor = useSlate()

    const insertData = () => {
        Transforms.insertNodes(editor, SampleJson())
    }
    return (<Button
        onClick={insertData}
        title={title}
    // className="mx-2"
    >
        <HolismIcon icon={AutoModeIcon} />
    </Button>)
}

export default GenerateData
