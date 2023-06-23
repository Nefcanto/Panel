import {
    DialogForm,
    LongText,
    post,
} from 'Form'

const inputs = <>
    <LongText
        property="Reason"
        required
    />
</>

const RejectCourse = entity => ({
    reloadEntity,
    ...rest
}) => {

    const action = ({
        data,
        error,
        setProgress,
        success,
    }) => {
        setProgress(true)
        post(`/course/reject/${entity?.id}`, data)
            .then(data => {
                setProgress(false)
                success('Course is rejected')
                reloadEntity(entity)
            }, e => {
                setProgress(false)
                error(e)
            })
    }
    return <DialogForm
        {...rest}
        title='Please specify the reason'
        entityType='Course'
        inputs={inputs}
        okAction={action}
    />
}

export default RejectCourse
