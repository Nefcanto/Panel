import { Widget } from 'Dashboard'
import { Chart } from 'Aggregates'

const CommentsCount = ({ entityType }) => {
    return <Widget
        title="Comments"
    >
        <Chart
            entityType={entityType}
            metric='CommentsCount'
        />
    </Widget>
}

export default CommentsCount
