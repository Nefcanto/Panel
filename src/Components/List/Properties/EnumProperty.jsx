import { useState, useEffect, useContext } from 'react'
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import { post } from 'App'
import { get } from 'App'
import { useMessage } from 'Hooks'
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import DialogForm from '../../Form/DialogForm'
import Chip from "./Chip"
import HolismIcon from '../../HolismIcon'
import Progress from '../../Progress'

const EnumProperty = ({
    actionUrl,
    currentKey,
    currentStyle,
    enumeration,
    styleProvider,
    title,
}) => {
    const [progress, setProgress] = useState(false)
    const [enumItems, setEnumItems] = useState([])
    const [selectedEnum, setSelectedEnum] = useState({ key: currentKey })
    const { error } = useMessage()
    const { setEntity } = useContext(ListContext)
    const [open, setOpen] = useState(false)

    const current =
        <Chip
            className={currentStyle + " select-none " + (actionUrl && " cursor-pointer hover:shadow-md hover:scale-105 transition-all")}
            text={currentKey}
        />

    const inputs = <>
        {
            progress
                ?
                <Progress />
                :
                <>
                    {
                        enumItems.map(entity => <div
                            key={entity.id}
                            onClick={() => setSelectedEnum(entity)}
                            className="mb-2"
                        >
                            <Chip
                                className={styleProvider(entity.key) + " select-none transition-all cursor-pointer " + (entity.id === selectedEnum.id && " shadow-lg scale-110 ")}
                                text={entity.key}
                            />
                            {
                                entity.key !== currentKey && entity.id === selectedEnum.id &&
                                <HolismIcon className="mx-6" icon={CheckIcon} />
                            }
                        </div>)
                    }
                    <Collapse
                        in={selectedEnum.key !== currentKey}
                    >
                        <div
                            className="border-t mt-6 pt-6 flex justify-center"
                        >
                            {current}
                            <span className="mx-4
                        ">{'=>'}</span>
                            <Chip
                                className={styleProvider(selectedEnum.key) + " select-none transition-all "}
                                text={selectedEnum.key}
                            />
                        </div>
                    </Collapse>
                </>
        }
    </>

    const save = () => {
        if (selectedEnum.key === currentKey) {
            setOpen(false)
            return;
        }
        setProgress(true)
        post(actionUrl + `?newEnumId=${selectedEnum.id}`)
            .then(data => {
                setProgress(false)
                setOpen(false)
                setEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    useEffect(() => {
        if (!open) {
            return;
        }
        setProgress(true)
        get(`/${enumeration}/all`)
            .then(data => {
                setEnumItems(data)
                setProgress(false)
            }, e => {
                error(e)
                setProgress(false)
            })
    }, [open])

    return <div>
        <DialogContext.Provider
            value={{
                open,
                setOpen
            }}
        >
            <DialogForm
                entityType='Enumeration'
                title='Set new value'
                inputs={inputs}
                okAction={save}
            />
        </DialogContext.Provider>
        <span
            title={title}
            onClick={() => actionUrl && setOpen(true)}
        >
            {current}
        </span>
    </div>
}

export default EnumProperty
