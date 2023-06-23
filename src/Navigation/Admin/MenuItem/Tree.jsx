import { Tree } from 'List'
import MenuItemForm from './Form'

const MenuItems = () => {

    const getUrl = entity => {
        if (entity.isDirectory) {
            return entity.title
        }
        let url = entity.url
        if (url.startsWith('/')) {
            url = `${app.env('SITE_URL')}/page${entity.url}`
        }
        return <a
            target='_blank'
            className="link"
            href={url}
        >
            {entity.title}
        </a>
    }

    return <Tree
        title='Menu'
        entityType='MenuItem'
        show={entity => getUrl(entity)}
        upsert={MenuItemForm}
        hasEdit
        hasDelete
    />
}

export default MenuItems
