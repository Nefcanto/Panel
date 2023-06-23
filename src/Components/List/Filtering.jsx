import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import app from 'App'
import { ListContext } from 'Contexts'
import { filterOperator } from 'App'
import Text from './Filters/Text'

const Filtering = ({ filters }) => {

    const {
        hasFilters,
        isBrowse,
        resetFilters,
        reload,
        usedFilters,
    } = useContext(ListContext)

    // if (!filters || filters.props.children.length === 0) {
    //     return <div></div>
    // }

    const reset = () => {
        resetFilters()
    }

    const handleKeyPress = (event) => {
        if (event.charCode !== 13) {
            return
        }
        reload()
    }

    let filtersArray = filters?.props.children.map ? filters?.props.children : [filters?.props.children]

    return <div
        id='filtering'
        className="bg-white px-3 py-3 md:rounded-lg relative dark:bg-zinc-700 "
        onKeyPress={(event) => handleKeyPress(event)}
    >
        <div className={
            "grid "
            + (isBrowse && " gap-6 ")
            + (!isBrowse && " gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")
        }
        >
            {
                (app.isDev() || app.isSuperAdmin()) &&
                <Text
                    property='Id'
                    operator={filterOperator.equals}
                />
            }
            {
                filtersArray.map((filter, index) => filter ? React.cloneElement(filter, {
                    key: index,
                }) : <span key={index}></span>)
            }
            <div className={
                ""
                +
                (
                    isBrowse
                        ?
                        "mt-4"
                        :
                        " md:col-start-2 lg:col-start-3 xl:col-start-4 place-self-end"
                )
            }
            >
                <div className="flex justify-end gap-2 items-bottom ">
                    {
                        hasFilters &&
                        <Button
                            className="grow-0"
                            size="small"
                            variant="outlined"
                            onClick={reset}>
                            {app.t('Reset')}
                        </Button>
                    }
                    {/* <Button
                        size="small"
                        className={"bg-green-200 hover:bg-green-400"}
                        variant="outlined"
                        onClick={reload}>
                        {app.t('Apply')}
                    </Button> */}
                </div>
            </div>
        </div>

    </div>
}

export default Filtering
