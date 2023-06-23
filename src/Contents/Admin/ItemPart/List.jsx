import {
    useEffect,
    useState,
} from 'react'
import app from 'App'
import { get } from 'App'
import {
    List,
    Text
} from 'List'
import ItemPartForm from './Form'

const headers = <>
    <th>Key</th>
    <th>Name</th>
</>

const row = entity => <>
    <td>{entity.key}</td>
    <td>{entity.name}</td>
</>

const ItemParts = ({
    isSuperAdmin,
    setProgress,
}) => {

    const { sectionId } = app.parseQuery()
    const [section, setSection] = useState()

    useEffect(() => {
        setProgress(true)
        get(`/section/get/${sectionId}`)
            .then(data => {
                setProgress(false)
                setSection(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }, [])

    return section && <List
        title='Item parts'
        entityType='ItemPart'
        subtitle='Parts are non-repeating, while items are repeating'
        breadcrumbItems={[
            {
                title: `${section.name}`,
                link: `/sections?name=${section.name}`
            },
            {
                title: 'Items',
                link: `/section/items?sectionId=${section.id}&name=${section.name}`
            },
            {
                title: 'Parts',
            }
        ]}
        headers={headers}
        row={row}
        upsert={ItemPartForm}
        hasDelete={isSuperAdmin}
        hasEdit={isSuperAdmin}
    />
}

export default ItemParts
