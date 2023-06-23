const Holism = {
    isSomething: value => {
        return !Holism.isNothing(value)
    },
    isNothing: value => {
        return value === undefined || value === null || (/^\s*$/g.test(value))
    },
    isGuid: (value) => {
        if (!value) {
            return false
        }
        if (value[0] === "{") {
            value = value.substring(1, value.length - 1)
        }
        var guidRegex = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi
        return guidRegex.test(value)
    },
    randomId: () => {
        return Math.random().toString(36).replace(/[^a-z]+/g, '')
    },
    ensure: (items) => {
        for (let i = 0; i < items.length; i++) {
            if (!items[i]) {
                throw `Required parameter is not specified`
            }
        }
    },
    ensureFunction: (items) => {
        Holism.ensure(items)
        for (let i = 0; i < items.length; i++) {
            if (!(items[i] instanceof Function)) {
                throw 'Required parameter is not a function'
            }
        }
    },
    breakpoints: {
        xs: 360,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1536
    },
    goTo: (url) => {
        //navigate(url)
    },
    camelize: (text) => {
        if (!text) {
            return ""
        }
        if (!text.replace) {
            return ""
        }
        text = text.replace(/[^a-zA-Z ]/g, '')
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        }).replace(/\s+/g, '')
    },
    trim: (text, character) => {
        var start = 0,
            end = text.length

        while (start < end && text[start] === character)
            ++start

        while (end > start && text[end - 1] === character)
            --end

        return (start > 0 || end < text.length) ? text.substring(start, end) : text
    },
    digitGroup: (value) => {
        value += ''
        var x = value.split('.')
        var x1 = x[0]
        var x2 = x.length > 1 ? '.' + x[1] : ''
        var rgx = /(\d+)(\d{3})/
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2')
        }
        return x1 + x2
    }
}

export default Holism
