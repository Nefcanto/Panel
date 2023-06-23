const Url = {
    parseQuery: () => {
        var params = new URLSearchParams(window.location.search)
        var result = {}
        params.forEach((value, key) => result[key] = value)
        return result
    },
    parseQueryAsArray: () => {
        var params = new URLSearchParams(window.location.search)
        var result = []
        params.forEach((value, key) => result.push({
            key,
            value
        }))
        return result
    },
    hasQuery: (key) => {
        if (!key) {
            return false
        }
        key = key.toLowerCase()
        var params = new URLSearchParams(window.location.search)
        let has = false
        params.forEach((value, queryKey) => {
            if (queryKey.toLowerCase() === key) {
                has = true
                return
            }
        })
        return has
    },
    getUrlParameter: (key) => {
        if (!key) {
            return
        }
        key = key.toLowerCase()
        var params = new URLSearchParams(window.location.search)
        let result = undefined
        params.forEach((value, queryKey) => {
            if (queryKey.toLowerCase() === key) {
                result = value
                return
            }
        })
        return result
    },
    setQueryString: (key, value) => {
        const url = new URL(window.location)
        url.searchParams.set(key, value)
        url.searchParams.sort()
        window.history.pushState(null, '', url.toString())
    },
    removeQuery: (key) => {
        const url = new URL(window.location)
        url.searchParams.delete(key)
        url.searchParams.sort()
        window.history.pushState(null, '', url.toString())
    }
}

export default Url
