import {
    Check,
    DialogForm,
    Select,
    Text,
} from 'Form'

const items = [
    {
        id: 1,
        value: 301
    },
    {
        id: 2,
        value: 302
    },
    {
        id: 3,
        value: 303
    },
    {
        id: 4,
        value: 307
    },
    {
        id: 5,
        value: 308
    }
]

const inputs = <>
    <Text
        property='OldUrl'
        placeholder='Old URL'
        required
    />
    <Text
        property='NewUrl'
        placeholder='New URL'
        required
    />
    <Select
        property='Code'
        options={items}
        display={i => i.value}
        choose={i => i.value}
    />
    <Check
        property='IsRegex'
        placehodler='Is Regex'
    />
</>

const RedirectForm = <DialogForm
    entityType='Redirect'
    inputs={inputs}
/>

export default RedirectForm
