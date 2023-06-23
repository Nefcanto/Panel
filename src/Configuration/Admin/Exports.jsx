import SettingsIcon from '@mui/icons-material/Settings'
import ConfigItemField from './ConfigItem/Field'
import ConfigItems from './ConfigItem/List'
import EntityConfigItems from './EntityConfigItem/List'
import EntityConfigs from './EntityConfigs/List'
import EntityConfigsAction from './EntityConfigs/EntityAction'
import EntityTypeConfigs from './EntityTypeConfig/List'
import LocaleConfigs from './LocaleConfig/List'
import ManageEntityConfigs from './EntityConfigs/Manage'
import Settings from './Settings'
import SystemConfigs from './SystemConfig/List'

const ConfigurationRoutes = [
    {
        path: '/configItems',
        component: ConfigItems,
        superAdmin: true
    },
    {
        path: '/systemConfigs',
        component: SystemConfigs
    },
    {
        path: '/localeConfigs',
        component: LocaleConfigs
    },
    {
        path: '/entityTypeConfigs',
        component: EntityTypeConfigs
    },
    {
        path: '/entityConfigItems',
        component: EntityConfigItems
    },
    {
        path: '/entityConfigs',
        component: EntityConfigs
    },
    {
        path: '/entityConfig',
        component: ManageEntityConfigs
    },
    {
        path: '/settings',
        component: Settings
    },
]

const ConfigurationMenu = [
    {
        title: 'Configurations',
        icon: SettingsIcon,
        children: [
            {
                title: 'Config Items',
                path: '/configItems',
                superAdmin: true
            },
            {
                title: 'System',
                path: '/systemConfigs'
            },
            {
                title: 'Locale',
                path: '/localeConfigs'
            },
            {
                title: 'Entity types',
                path: '/entityTypeConfigs'
            },
            {
                title: 'Entity template',
                path: '/entityConfigItems'
            },
            {
                title: 'Entities',
                path: '/entityConfigs'
            },
            {
                title: 'Users',
                path: '/userConfigs'
            }
        ]
    }
]

export { ConfigItemField }
export { ConfigItems }
export { ConfigurationMenu }
export { ConfigurationRoutes }
export { EntityConfigItems }
export { EntityConfigs }
export { EntityConfigsAction }
export { EntityTypeConfigs }
export { ManageEntityConfigs }
export { Settings }
export { SystemConfigs }
