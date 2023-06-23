import { useContext } from 'react'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import app from 'App'
import {
    EntityContext,
    ListContext,
} from 'Contexts'
import Pagination from './Pagination'
import EntityActions from './EntityActions/EntityActions'
import NoEntitiesFound from '../NoEntitiesFound'

const Cards = () => {

    const {
        card,
        classProvider,
        create,
        data,
        deselectEntities,
        deselectEntity,
        edit,
        entityActions,
        entityType,
        hasDelete,
        hasEdit,
        hasEntitySelection,
        isBrowse,
        multicolumn,
        reload,
        selectedEntities,
        selectEntities,
        selectEntity,
        setEntity,
        setEntityActionProgress,
        showTopPagiation,
        upsert,
    } = useContext(ListContext)

    return <>
        {
            data?.length === 0
                ?
                <NoEntitiesFound
                    className="grid place-items-center"
                />
                :
                <>
                    <Collapse
                        in={showTopPagiation}
                        className="w-full"
                        unmountOnExit
                    >
                        <div className="px-6 w-full">
                            <Pagination />
                        </div>
                        <br />
                    </Collapse>
                    {

                        hasEntitySelection ?
                            <div className="w-full flex justify-start px-6">
                                <Tooltip
                                    title={app.t("Select all")}
                                    placement="top"
                                >
                                    <Checkbox
                                        color="primary"
                                        onChange={(event) => {
                                            event.target.checked
                                                ?
                                                selectEntities(data)
                                                :
                                                deselectEntities(data)
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            :
                            null
                    }
                    <div
                        className={"w-full "
                            + (multicolumn ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-6" : "")
                        }
                    >
                        {
                            data?.map((entity, index) =>
                                <EntityContext.Provider
                                    value={{
                                        entity: entity
                                    }}
                                    key={entity.id}
                                >
                                    <div
                                        className=
                                        {
                                            'entity w-full overflow-hidden relative ' +
                                            (multicolumn ? ' group ' : "py-4 px-6 ") +
                                            (!multicolumn && index !== 0 ? 'border-t ' : '') +
                                            (classProvider ? classProvider(entity) : '')
                                        }
                                    >
                                        {
                                            hasEntitySelection
                                                ?
                                                <div className="flex flex-row">
                                                    <div className="flex items-center justify-center w-10 ">
                                                        <Checkbox
                                                            checked={selectedEntities.indexOf(entity.id) > -1}
                                                            color="primary"
                                                            onChange={(event) => {
                                                                event.target.checked
                                                                    ?
                                                                    selectEntity(entity.id)
                                                                    :
                                                                    deselectEntity(entity.id)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        {
                                                            card(entity)
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                card(entity)
                                        }
                                        {
                                            (entityActions || hasDelete || hasEdit || edit || app.isDev())
                                                ?
                                                <div
                                                    className={(multicolumn ? (" bg-white border absolute bottom-0 end-0 z-50 " + (entity.actionProgress ? " flex " : " hidden group-hover:flex ")) : "")}
                                                >
                                                    <EntityActions
                                                        entityActions={entityActions}
                                                    />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </EntityContext.Provider>
                            )
                        }
                    </div>
                    {
                        !isBrowse &&
                        <div className="px-6 w-full">
                            <Pagination />
                        </div>
                    }
                </>
        }
    </>
}

export default Cards
