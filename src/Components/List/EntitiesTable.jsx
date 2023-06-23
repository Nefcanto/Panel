import React, { useContext } from 'react'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import app from 'App'
import { ListContext } from 'Contexts'
import { TableContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import Pagination from './Pagination'
import EntityActions from './EntityActions/EntityActions'
import NoEntitiesFound from '../NoEntitiesFound'

const Table = () => {

    const {
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
        hasGuid,
        hasEntitySelection,
        hasKey,
        hasOrder,
        hasSlug,
        headers,
        hiddenEntityActions,
        isBrowse,
        menuForActions,
        numbered,
        reload,
        row: externalRow,
        selectEntities,
        selectEntity,
        selectedEntities,
        separateRowForActions,
        setEntity,
        showTopPagiation,
        upsert,
    } = useContext(ListContext)

    let headerElements = []

    const internalRow = () => <><td></td></>

    const row = externalRow || internalRow

    const doesDestructure = (func) => {
        return /\({.+}\)/gm.test(func.toString().replaceAll("\n", "").split("=>")[0])
    }

    if (headers) {

        headerElements = React.Children
            .toArray(headers.props.children)
            .filter(header => {
                if (header.props && header.props.superAdmin) {
                    return app.isSuperAdmin()
                }
                return true
            })
            .map(header => {
                if (header.props.children?.props) {
                    return header.props.children
                }
                return header
            })
            .map(header => {
                const { start, superAdmin, ...rest } = header.props
                return <header.type
                    className={"text-gray-900 dark:text-gray-300 py-3 font-light text-xs "
                        + (header?.props?.start && " text-start ")
                        + (header?.props?.className || "")}
                    key={header.key}
                    ref={header.ref}
                    {...rest}
                >
                    {
                        React.Children.toArray(header.props.children).map(child => {
                            return typeof child === "string" ? app.t(child) : child
                        })
                    }
                </header.type>
            })
    }

    const head =

        <thead>
            <tr className={
                'text-xs uppercase font-light border-b h-10'
                + (app.getLocale().supportsLetterSpacing && " tracking-wider ")
            }>
                {
                    hasOrder && <th className="w-6"></th>
                }
                {
                    hasEntitySelection ?
                        <th className="text-start">
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
                        </th>
                        :
                        null
                }
                {
                    numbered && <th className="w-10">#</th>
                }
                {
                    headerElements.length > 0
                        ?
                        headerElements
                        :
                        <th></th>
                }
                {
                    (entityActions || hasDelete)
                        ?
                        !hiddenEntityActions && <th></th>
                        :
                        null
                }
            </tr>
        </thead>

    const rowStyle = (entity, index, hasBottomBorder) => 'py-3 ' +
        ((hasBottomBorder && index !== data?.length - 1) ? 'border-b ' : ' ') +
        (classProvider ? classProvider(entity) : '')

    const drag = entity => hasOrder &&
        <td className="text-start w-6">
            {/* <DragIndicatorIcon className="cursor-move" /> */}
        </td>

    const itemSelection = entity => hasEntitySelection
        ?
        <td className="text-start">
            <Checkbox
                checked={selectedEntities?.indexOf(entity.id) > -1}
                color="primary"
                onChange={(event) => {
                    event.target.checked
                        ?
                        selectEntity(entity.id)
                        :
                        deselectEntity(entity.id)
                }}
            />
        </td>
        :
        null

    const rowNumber = index => numbered &&
        <td className="w-10">
            {index + 1}
        </td>

    const clonedCells = entity => React.Children
        .toArray(doesDestructure(row) ? row({
            entity,
            isSuperAdmin: app.isSuperAdmin()
        }).props.children : row(entity).props.children)
        .filter(entity => {
            if (entity.props && entity.props.superAdmin) {
                return app.isSuperAdmin()
            }
            return true
        })
        .map(td => {
            if (td.type === 'td') {
                return td
            }
            if (td.type instanceof Function) {
                return td
            }
            return td.props.children
        })
        .map(td => {
            const { start, superAdmin, ...rest } = td.props
            return <td.type
                key={td.key}
                ref={td.ref}
                className={'text-gray-900 dark:text-gray-300 py-3 text-sm font-light tracking-wide '
                    + (td?.props?.start && " text-start ")
                    + td.props.className}
                hasmoreroom={menuForActions}
                {...rest}
            >
                {td.props.children}
            </td.type>
        })

    const actions = entity => (entityActions || hasDelete || hasEdit || edit || app.isDev())
        ?
        !hiddenEntityActions && <td {...(separateRowForActions && { colSpan: "100" })}>
            <EntityActions
                entityActions={entityActions}
            />
        </td>
        :
        null

    const body = <tbody>
        {
            row && typeof row === 'function'
                ?
                data?.length === 0
                    ?
                    <tr>
                        <td colSpan='100'><NoEntitiesFound /></td>
                    </tr>
                    :
                    data?.map((entity, index) => !menuForActions && separateRowForActions
                        ?
                        <React.Fragment key={entity.id}>
                            <EntityContext.Provider
                                value={{
                                    entity: entity
                                }}
                            >
                                <tr
                                    className={rowStyle(entity, index, hiddenEntityActions) + ' relative '}
                                >
                                    {drag(entity)}
                                    {itemSelection(entity)}
                                    {rowNumber(index)}
                                    {clonedCells(entity)}
                                </tr>
                                {
                                    !hiddenEntityActions &&
                                    <tr
                                        className={rowStyle(entity, index, true) + ' h-12'}
                                    >
                                        {actions(entity)}
                                    </tr>
                                }
                            </EntityContext.Provider>
                        </React.Fragment>
                        :
                        <EntityContext.Provider
                            key={entity.id}
                            value={{
                                entity: entity
                            }}
                        >
                            <tr
                                className={rowStyle(entity, index, true)}
                            >
                                {drag(entity)}
                                {itemSelection(entity)}
                                {rowNumber(index)}
                                {clonedCells(entity)}
                                {actions(entity)}
                            </tr>
                        </EntityContext.Provider>
                    )
                :
                null
        }
    </tbody>

    return <>
        {
            data?.length === 0
                ?
                null
                :
                <Collapse
                    in={showTopPagiation}
                    className="w-full"
                >
                    <div className="w-full px-6">
                        <Pagination />
                    </div>
                </Collapse>
        }
        <div className={"relative w-full overflow-x-auto " + (!isBrowse && " px-6 ")}>
            <TableContext.Provider
                value={{
                    hasMoreRoom: !menuForActions && separateRowForActions && !hiddenEntityActions
                }}>
                <table
                    className="w-full text-center "
                    style={{ minWidth: '600px' }}
                >
                    {head}
                    {body}
                </table>
            </TableContext.Provider >
        </div>
        {
            data?.length === 0
                ?
                null
                :
                !isBrowse
                &&
                <div className="pt-8 w-full px-6">
                    <Pagination />
                </div>
        }
    </>
}

export default Table
