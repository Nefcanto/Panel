import app from './App'
const nonTranslatedTexts = []

const Globalization = {
    translations: [],
    setTranslations: (translations) => {
        Globalization.translations = translations
    },
    getTranslations: () => {
        return Globalization.translations
    },
    t: (text) => {
        if (!text) {
            return text
        }
        if (Globalization.translations.hasOwnProperty(text)) {
            return Globalization.translations[text]
        }
        var camelizedText = app.camelize(text)
        if (Globalization.translations.hasOwnProperty(camelizedText)) {
            return Globalization.translations[camelizedText]
        }
        if (!nonTranslatedTexts.includes(text)) {
            nonTranslatedTexts.push(text)
        }
        return text
    },
    getNonTranslatedTexts: () => {
        return nonTranslatedTexts
    },
    locale: {},
    setLocale: (locale) => {
        Globalization.locale = locale
    },
    getLocale: () => {
        return Globalization.locale
    },
    isRtl: () => {
        return Globalization.locale.isRtl
    },
    browserLocale: {
        date: Intl.DateTimeFormat().resolvedOptions(),
        number: Intl.NumberFormat().resolvedOptions()
    },
    now: () => {
        return {
            local: new Date().toLocaleString(),
            utc: new Date().toUTCString()
        }
    }
}

export default Globalization
