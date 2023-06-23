import {
    useEffect,
    useState,
} from 'react'
import Collapse from '@mui/material/Collapse'
import { useSearchParams } from 'react-router-dom'
import app from 'App'
import {
    useFilterablesCounter,
    useList,
    useLocalStorageState,
    useTop,
} from 'Hooks'
import Filtering from './Filtering'
import Sorting from './Sorting'
import Entities from './Entities'
import ListActions from './ListActions/ListActions'
import { ListContext } from 'Contexts'
import ShowHideTopPagination from './ShowHideTopPagination'
import ShowHideFiltering from './ShowHideFiltering'
import Reload from './Reload'
import ShowHideEntityActions from './ShowHideEntityActions'
import Text from './Filters/Text'
import ConfigureList from './ConfigureList'

const List = ({
    breadcrumbItems,
    card,
    classProvider,
    create,
    dialogs,
    edit,
    emptyCta,
    entityActions,
    entityType,
    expanded,
    filters,
    hasDelete,
    hasEdit,
    headers,
    isTree,
    listActions,
    menuForActions,
    multicolumn,
    numbered,
    restoreScrollPosition,
    row,
    separateRowForActions,
    show,
    sorts,
    subtitle,
    title,
    upsert,
    upsertionIcon,
    upsertionText,
}) => {

    // todo: useMemo and count the number of `property` in this filters. Then set that as filterablesCount. And in useList wait for filterables to become that number and then load. If there are not filterables, then load.

    const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer"
    const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.camelize(entityType)}_isFilteringOpen`)
    const [hiddenEntityActions, setHiddenEntityActions] = useLocalStorageState(false, `${app.camelize(entityType)}_isEntityActionsHidden`)
    const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.camelize(entityType)}_isTopPaginationShown`)

    const [hasEntitySelection, setHasEntitySelection] = useState(false)
    let [searchParams] = useSearchParams()
    const [dialogProps, setDialogProps] = useState({})

    const filterablesCount = useFilterablesCounter(filters)

    const {
        data,
        deselectEntities,
        deselectEntity,
        hasData,
        hasFilters,
        hasGuid,
        hasKey,
        hasOrder,
        hasSlug,
        loading,
        metadata,
        reload,
        reloadEntity,
        resetFilters,
        selectedEntities,
        selectEntities,
        selectEntity,
        setEntity,
        setEntityActionProgress,
        setEntityProgress,
        setFilter,
        setFilterable,
        setPageNumber,
        setPageSize,
        setScrollPosition,
        setSorts,
        usedFilters,
    } = useList({
        entityType,
        filterablesCount,
        isTree,
        restoreScrollPosition,
    })

    useEffect(() => {
        // console.log(selectedEntities)
    }, [selectedEntities])

    useTop({
        breadcrumbItems,
        subtitle,
        title,
    })

    return <ListContext.Provider value={{
        card,
        classProvider,
        create,
        data,
        deselectEntities,
        deselectEntity,
        dialogProps,
        edit,
        entityActions,
        entityType,
        expanded: expanded || true,
        filters,
        hasData,
        hasDelete,
        hasEdit,
        hasEntitySelection,
        hasFilters,
        hasGuid,
        hasKey,
        hasOrder,
        hasSlug,
        headers,
        hiddenEntityActions,
        isFilteringOpen,
        isTree,
        listActionIconStyle,
        listActions,
        loading,
        menuForActions,
        metadata,
        multicolumn,
        numbered,
        reload,
        reloadEntity,
        resetFilters,
        row,
        selectedEntities,
        selectEntities,
        selectEntity,
        separateRowForActions,
        setDialogProps,
        setEntity,
        setEntityActionProgress,
        setEntityProgress,
        setFilter,
        setFilterable,
        setHasEntitySelection,
        setHiddenEntityActions,
        setIsFilteringOpen,
        setPageNumber,
        setPageSize,
        setSorts,
        setTopPaginationVisibility,
        show,
        showTopPagiation,
        upsert,
        upsertionIcon,
        upsertionText,
        usedFilters,
    }}>

        <div
            id='list'
            className={
                ' lg:flex items-center justify-between px-6 py-2 lg:h-14 '
            }
            onScroll={() => {
                setScrollPosition(window.scrollY)
                console.log(window.scrollY)
            }}
        >
            <ListActions />
            <div
                className={
                    " flex items-center justify-end gap-2 lg:my-0 "
                }
            >
                <ShowHideTopPagination />
                <Sorting sorts={sorts} />
                <ShowHideFiltering />
                <Reload />
                {/* <ConfigureList /> */}
                {(!isTree && !multicolumn) && <ShowHideEntityActions />}
            </div>
        </div>

        <Collapse in={isFilteringOpen}>
            <div className='mb-2'>
                <Filtering filters={filters} />
            </div>
        </Collapse>

        <Entities />

    </ListContext.Provider>
}

export default List

/*
List anatomy

  List
    ListActions
      ListAction
      ListAction
      ...
    Filtering
      Filter1
      Filter2
      ...
    Sorting
      Sort1
      Sort2
      ...
    Pagination
      GoToPage
      PageLinks
      PageSize
  Entities (tabular, card, tree)
    Entity1
      EntityActions
        EntityAction1
        EntityAction2
        ...
    Entity2
    ..
*/
