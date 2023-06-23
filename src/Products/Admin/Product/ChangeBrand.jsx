import { DialogForm } from 'Form'
import BrandField from '../Brand/Field'

const inputs = <>
    <BrandField />
</>

const ChangeBrand = () => {
    return <DialogForm
        title='Change brand'
        inputs={inputs}
    />
}

export default ChangeBrand
