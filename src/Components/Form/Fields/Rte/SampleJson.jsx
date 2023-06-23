import app from 'App'
import enRichText from './SampleJsonEn'
import faRichText from './SampleJsonFa'

const SampleJson = () => {
    const locale = app.getLocale().key
    if (locale === 'en') {
        return enRichText
    }
    if (locale === 'fa') {
        return faRichText
    }
}

export default SampleJson
