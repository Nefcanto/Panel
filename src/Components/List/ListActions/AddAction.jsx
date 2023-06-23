import {
    useContext,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import Unify from '../../Unify'
import HolismIcon from '../../HolismIcon'

const AddAction = () => {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const {
        create,
        upsert,
        upsertionIcon,
        upsertionText,
    } = useContext(ListContext)

    const icon = upsertionIcon
        ?
        <HolismIcon icon={upsertionIcon} />
        :
        <AddIcon />

    return <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <div>
            {
                create && typeof create !== 'string' &&
                <Unify
                    component={create}
                />
            }
            {
                upsert && typeof upsert !== 'string' &&
                <Unify
                    component={upsert}
                />
            }
            {
                create || upsert
                    ?
                    <Button
                        className="bg-green-200 text-gray-900 border-gray-400 hover:bg-green-400 mt-2 lg:mt-0 me-2"
                        variant="outlined"
                        startIcon={icon}
                        onClick={() => {
                            if (typeof create === 'string') {
                                navigate(create)
                            }
                            else {
                                setOpen(true)
                            }
                        }}
                    >
                        {
                            (upsertionText)
                                ?
                                app.t(upsertionText)
                                :
                                app.t("Create")
                        }
                    </Button>
                    :
                    null
            }
        </div>
    </DialogContext.Provider>
}

export default AddAction
