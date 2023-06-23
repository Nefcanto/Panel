import { useState } from 'react'
import AbcIcon from '@mui/icons-material/Abc'
import CircleIcon from '@mui/icons-material/Circle'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import NumbersIcon from '@mui/icons-material/Numbers'
import PercentIcon from '@mui/icons-material/Percent'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import app from 'App'
import {
    BooleanProperty,
    Color,
    NumberProperty,
} from 'List'

const useConfig = () => {
    const getIcon = (type) => {
        if (!enums) {
            return null
        }
        switch (type) {
            case enums?.configType?.text:
                return AbcIcon
            case enums?.configType?.naturalNumber:
            case enums?.configType?.integer:
            case enums?.configType?.realNumber:
                return NumbersIcon
            case enums?.configType?.boolean:
            case enums?.configType?.nullableBoolean:
                return ToggleOffIcon
            case enums?.configType?.color:
                return ColorLensIcon
            case enums?.configType?.singleChoice:
                return CircleIcon
            case enums?.configType?.multipleChoice:
                return WorkspacesIcon
            case enums?.configType?.percent:
                return PercentIcon
            default:
                return null
        }
    }

    const getProperty = ({
        entity,
        entityType,
        type,
    }) => {

        if (!enums) {
            return null
        }
        const getUrl = (value) => `/${app.camelize(entityType)}/setValue?id=${entity.id}&value=${value}`

        const [open, setOpen] = useState(false)
        switch (type) {
            case enums?.configType?.text:
                return entity.currentValue
            case enums?.configType?.naturalNumber:
            case enums?.configType?.integer:
            case enums?.configType?.realNumber:
                return <NumberProperty
                    value={entity.currentValue}
                    actionUrl={getUrl}
                />
            case enums?.configType?.boolean:
            case enums?.configType?.nullableBoolean:
                return <BooleanProperty
                    value={entity.currentValue === true.toString() ? true : false}
                    actionUrl={getUrl}
                />
            case enums?.configType?.color:
                return <Color
                    property='currentValue'
                    value={entity.currentValue || "000"}
                    action={getUrl}
                />
            case enums?.configType?.singleChoice:
                return null
            case enums?.configType?.multipleChoice:
                return null
            case enums?.configType?.percent:
                return null
            default:
                return null
        }
    }

    return {
        getIcon,
        getProperty
    }
}

export default useConfig
