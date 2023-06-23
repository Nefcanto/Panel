import {
    Image,
    Title,
    TitleSort,
} from 'List'
import { EntityTypeFilter } from 'Entities'

const filters = <>
    <EntityTypeFilter />
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
