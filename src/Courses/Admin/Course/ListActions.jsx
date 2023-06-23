import CategoryIcon from '@mui/icons-material/Category'
import Face2Icon from '@mui/icons-material/Face2'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import {
    ListAction,
    post,
} from 'List'

const listActions = () => {

    const updateInstructorUserGuidsCsv = ({
        error,
        reloadList,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post('/course/updateInstructorUserGuidsCsv').then(data => {
            setProgress(false)
            success('Applied')
        }, e => {
            setProgress(false)
            error(e)
        })
    }

    return <>
        <ListAction
            title='Categories'
            icon={CategoryIcon}
            url='/courseCategories?entityType=course'
            notApplicableToEntities
        />
        <ListAction
            title='Tags'
            icon={LocalOfferIcon}
            url='/courseTags?entityType=course'
            notApplicableToEntities
        />

        <ListAction
            title='Update instructor user GUIDs CSV'
            icon={Face2Icon}
            click={updateInstructorUserGuidsCsv}
            notApplicableToEntities
            superAdmin
        />
    </>
}

export default listActions
