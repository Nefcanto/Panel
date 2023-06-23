import {
    Image,
    Text,
} from 'List'

const filters = <>
    <Text
        property='Name'
    />
</>

const sorts = [
    {
        caption: "A-Z",
        property: "Name",
        direction: "asc"
    }
]

const headers = <>
    <th start>Default image</th>
    <th>Name</th>
</>

const row = entity => <>
    <td start>
        <Image
            url={entity.relatedItems.logoUrl}
        />
    </td>
    <td>{entity.name}</td>
</>

export { filters }
export { headers }
export { row }
export { sorts }
