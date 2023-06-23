import { BooleanProperty } from 'List'

const OfflineOnlineProprty = ({ entity }) => {

    return <>
        <td>
            <BooleanProperty
                value={entity.hasOfflineAccess}
                trueLabel='Online'
                falseLabel='Offline'
                actionUrl={`/course/toggleBoolean?id=${entity.id}&property=hasOfflineAccess`}
                className='w-[90px] mx-auto'
            />
        </td>
    </>
}

export default OfflineOnlineProprty
