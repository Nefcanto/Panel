import { EnumProperty } from 'List'

const styleProvider = entity => {
    var style = entity.stateKey?.toLowerCase() + " "
    switch (entity.stateKey?.toLowerCase()) {
        case 'new':
            style += 'bg-blue-200'
            break
        case 'approved':
            style += "bg-green-200"
            break
        case 'rejected':
            style += 'bg-red-200'
            break
        case 'edited':
            style += 'bg-yellow-200'
            break
        default:
            style += ''
    }
    return style
}

const StateProperty = entity => <td>
    <EnumProperty
        enumeration='CoursesState'
        property='StateId'
        styleProvider={styleProvider}
        currentKey={entity.stateKey}
        currentStyle={styleProvider(entity)}
        title={entity.relatedItems.reason}
    />
</td>

export default StateProperty
