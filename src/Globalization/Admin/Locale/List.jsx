import TranslateIcon from '@mui/icons-material/Translate'
import {
    app,
    BooleanProperty,
    get,
    List,
    ListAction,
    post,
} from 'List'

const listActions = (entityIds) => {

    const insertTranslations = ({ setProgress, success, error }) => {
        setProgress(true)
        post('/locale/insertTranslations', entityIds)
            .then(data => {
                get('/locale/data')
                    .then(data => {
                        app.setTranslations(data.translations)
                        app.setLocale(data.locale)
                        setProgress(false)
                        success('Translations are inserted')
                    }, e => {
                        setProgress(false)
                        error(e)
                    })
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <>
        <ListAction
            title="Insert Translations"
            icon={TranslateIcon}
            click={(params) => insertTranslations(params)}
            minCardinality={1}
            superAdmin
            devOnly
        />
    </>
}

const headers = <>
    <th>Key</th>
    <th>Local Key</th>
    <th>Is RTL</th>
    <th>Is Active</th>
    <th>Is Default</th>
</>

const row = ({
    entity,
    isSuperAdmin
}) => {
    const activeProps = {}
    if (isSuperAdmin) {
        activeProps.title = app.t(entity.isActive ? 'Yes, click to deactivate' : 'No, click to activate')
        activeProps.actionUrl = `/locale/toggleIsActive/${entity.id}`
    }
    const defaultProps = {}
    if (isSuperAdmin) {
        defaultProps.title = entity.isDefault ? '' : app.t('No, click to set it as the default')
        defaultProps.actionUrl = `/locale/setAsDefault/${entity.id}`
    }
    return <>
        <td>{entity.key}</td>
        <td>{entity.localKey}</td>
        <td>
            <BooleanProperty
                value={entity.isRtl}
            />
        </td>
        <td>
            <BooleanProperty
                value={entity.isActive}
                {...activeProps}
            />
        </td>
        <td>
            {
                entity.isDefault
                    ?
                    <BooleanProperty
                        value={entity.isDefault}
                    />
                    :
                    <BooleanProperty
                        value={entity.isDefault}
                        {...defaultProps}
                        reloadListOnSuccess
                    />
            }
        </td>
    </>
}

const Locales = ({ isSuperAdmin }) => {
    return <List
        title="Locales"
        entityType='locale'
        listActions={(isSuperAdmin && app.isDev()) && listActions}
        headers={headers}
        row={row}
    />
}

export default Locales
