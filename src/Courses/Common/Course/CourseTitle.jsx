import {
    TitleSubtitle,
    ValueWithTitle,
} from 'List'

const CourseTitle = entity => <a target='_blank' href={`${app.env('SITE_URL')}/course/${entity.slug}`}>
    <TitleSubtitle
        title={<ValueWithTitle
            value={entity.title?.cut(30)}
            title={entity.summary}
        />}
        subtitle={entity.slug}
    />
</a>

export default CourseTitle
