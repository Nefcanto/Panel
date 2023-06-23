import {
    Title,
    TitleSort,
} from 'List'

const filters = <>
    <Title />
</>

const sorts = [
    ...TitleSort
]

const headers = <>
    <th>Title</th>
</>

const row = entity => <>
    <td>{entity.title}</td>
</>

export { filters }
export { headers }
export { row }
export { sorts }
