import { ClearCache } from 'Panel'
import { ChooseLocale } from 'Globalization'

const HeaderActions = () => {
    return <>
        <ChooseLocale />
        <ClearCache />
    </>
}

export default HeaderActions
