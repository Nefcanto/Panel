import VisibilityIcon from '@mui/icons-material/Visibility'
import PreviewIcon from '@mui/icons-material/Preview'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import {
    EntityAction,
    post,
} from 'List'
import {
    ManageHierarchies,
    ManageTags,
} from 'Taxonomy'
import RejectCourse from './Reject'

const entityActions = entity => {

    const approve = ({
        error,
        setEntity,
        setProgress,
        success,
    }) => {

        setProgress(true)
        post(`/course/approve/${entity.id}`)
            .then(data => {
                setProgress(false)
                success('Course is approved')
                setEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <>
        <EntityAction
            title="View"
            icon={VisibilityIcon}
            goTo={`/viewCourse?id=${entity.id}`}
        />
        <ManageTags
            entityType='Course'
            entityGuid={entity.guid}
        />
        <ManageHierarchies
            title='Manage categories'
            entityType='Course'
            entityGuid={entity.guid}
        />
        {
            (entity.stateKey != 'Approved') &&
            <EntityAction
                title="Approve"
                icon={CheckIcon}
                color="text-green-400"
                click={approve}
            />

        }
        {
            entity.stateKey != 'Rejected' &&
            <EntityAction
                title="Reject"
                icon={CloseIcon}
                color="text-red-400"
                dialog={RejectCourse(entity)}
            />
        }
    </>
}

export default entityActions
