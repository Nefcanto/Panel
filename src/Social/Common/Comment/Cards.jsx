import {
    useEffect,
    useState,
} from 'react'
import app, {
    get,
    post,
} from 'App'
import { useMessage } from 'Panel'
import {
    InlineForm,
    LongText,
} from 'Form'
import { UserChip } from 'Accounts'

const CommentCards = ({
    className,
    entityGuid,
    entityType,
}) => {

    const [progress, setProgress] = useState(true)
    const [comments, setComments] = useState([])

    useEffect(() => {
        setProgress(true)
        get(`/comment/all?entityType=${entityType}&entityGuid=${entityGuid}`)
            .then(data => {
                setProgress(false)
                setComments(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }, [entityType, entityGuid])

    const save = ({
        data,
        error,
        resetFields,
        setProgress,
    }) => {
        setProgress(true)
        post(`/comment/save?entityType=${entityType}&entityGuid=${entityGuid}`, data)
            .then(result => {
                setProgress(false)
                setComments(previousComments => [...previousComments, result])
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <div className={className || ""}>
        <div>
            {
                comments.map(comment => <div
                    key={comment.id}
                    className=" border-b py-4"
                >
                    <div className="flex gap-2">
                        <UserChip entity={comment} />
                        <span className="text-xs font-light text-slate-600 mt-1">{comment.relatedItems.timeAgo}</span>
                    </div>
                    <p className="ms-16">{comment.body}</p>
                </div>)
            }
        </div>
        <InlineForm
            entityType='Comment'
            inputs={<>
                <LongText
                    property='Body'
                    required
                />
            </>}
            okAction={save}
        />
    </div>
}

export default CommentCards
