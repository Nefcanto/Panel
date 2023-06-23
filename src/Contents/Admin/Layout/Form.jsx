import { DialogForm, Key } from 'Form'

const inputs = <>
    <Key />
</>

const Layout = () => {
    return <DialogForm
        entityType='Layout'
        inputs={inputs}
    />
}

export default Layout
