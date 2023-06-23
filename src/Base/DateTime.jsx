const DateTime = {
    getLocalizedYear: (localeKey) => {
        if (localeKey === 'fa') {
            return new Date().toLocaleDateString("fa", { year: "numeric" })
        }
        if (localeKey === 'ar') {
            return new Date().toLocaleDateString("ar-SA-u-ca-islamic", { year: "numeric" })
        }
        return new Date().getFullYear()
    }
}

export default DateTime
