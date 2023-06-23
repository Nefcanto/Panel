import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import FilterListIcon from '@mui/icons-material/FilterList'
import app from 'App'
import { ListContext } from 'Contexts'

const ShowHideFiltering = () => {

    const {
        filters,
        hasFilters,
        isFilteringOpen,
        setIsFilteringOpen,
        listActionIconStyle
    } = useContext(ListContext)

    return (filters && (filters.props?.children?.length > 0 || filters.props?.children?.props)) || app.isDev() || app.isSuperAdmin()
        ?
        <span
            id='showHideFiltering'
            className={'relative ' + listActionIconStyle}
            onClick={() => setIsFilteringOpen(!isFilteringOpen)}
        >
            {
                hasFilters &&
                <span className="absolute w-2/3 h-2/3 m-auto top-0 right-0 bottom-0 left-0 bg-green-400 animate-ping rounded-full"></span>
            }
            <Tooltip
                title={app.t(isFilteringOpen ? 'Hide filters' : 'Show filters')}
                className="relative z-10"
            >
                <FilterListIcon />
            </Tooltip>
        </span>
        :
        null
}

export default ShowHideFiltering
