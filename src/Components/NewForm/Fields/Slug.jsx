import app from 'App'
import LinkIcon from '@mui/icons-material/Link'
import Text from './Text'

const Slug = (props) => {

    const getLocaleSpecificSlugFormat = () => {
        const locale = app.getLocale().key
        switch (locale) {
            case 'fa':
                return /^[a-zA-Z0-9۱۲۳۴۵۶۷۸۹۰٤٥٦۰ضصثقفغعهخحجچشسیبلاتنمکگظطزرذدئوپآژي-]+$/
            default:
                return /^[a-z0-9-]*$/
        }
    }

    return <Text
        property="Slug"
        placeholder="Slug"
        required="Slug is not provided"
        startIcon={LinkIcon}
        regex={getLocaleSpecificSlugFormat()}
        hint="valid-slug-sample"
        regexError='Slug is not valid. Only dash and lowercase English characters, and numbers are accepted.'
        {...props}
    />
}

export default Slug
