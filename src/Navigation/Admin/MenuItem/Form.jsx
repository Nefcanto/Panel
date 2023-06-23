import {
    DialogForm,
    Link,
    Title,
} from 'Form'

const inputs = <>
    <Title />
    <Link
        property='Url'
        placeholder='URL'
    />
</>

const MenuItemForm = () => {

    return <DialogForm
        entityType='MenuItem'
        inputs={inputs}
    />
}

export default MenuItemForm
