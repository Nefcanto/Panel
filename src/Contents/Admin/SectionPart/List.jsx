import {
    useEffect,
    useState,
} from 'react'
import {
    app,
    get,
    List,
    Text
} from 'List'
import SectionPartForm from './Form'

const filters = <>
    <Text
        property='key'
    />
    <Text
        property='Name'
    />
</>

const headers = <>
    <th>Key</th>
    <th>Name</th>
    <th>Type</th>
</>

const row = entity => <>
    <td>{entity.key}</td>
    <td>{entity.name}</td>
    <td>{entity.partTypeKey}</td>
</>

const SectionParts = ({
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
        title='Section parts'
        subtitle='Parts are non-repeating, while items are repeating'
        breadcrumbItems={[
            {
                title: `${section.name}`,
                link: `/sections?name=${section.name}`
            },
            {
                title: 'Parts',
            }
        ]}
        entityType='SectionPart'
        filters={filters}
        headers={headers}
        row={row}
        upsert={SectionPartForm}
        hasDelete={isSuperAdmin}
        hasEdit={isSuperAdmin}
    />
}

export default SectionParts
