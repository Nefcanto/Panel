import app from 'App'

const useFilterablesCounter = (filters) => {
    const filterablesCount = (filters ? (filters.props.children.map ? filters.props.children.length : 1) : 0) + ((app.isDev() || app.isSuperAdmin()) ? 1 : 0)
    return filterablesCount
}

export default useFilterablesCounter
