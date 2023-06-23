import {
    TitleSubtitle,
    ValueWithTitle,
} from 'List'

const Title = entity => <a target='_blank' href={`${app.env('SITE_URL')}/product/${entity.slug}`}>
    <TitleSubtitle
        title={<ValueWithTitle
            value={entity.title.cut(30)}
            title={entity.summary}
        />}
        subtitle={entity.slug}
    />
</a>

export default Title
