import HierarchyChips from '../Common/Hierarchy/Chips'
import HierarchyFilter from '../Common/Hierarchy/Filter'
import HierarchyTree from './Hierarchy/Tree'
import ManageHierarchies from '../Common/Hierarchy/Manage'
import ManageTags from '../Common/Tag/Manage'
import TagChips from '../Common/Tag/Chips'
import TagField from '../Common/Tag/Field'
import TagFilter from '../Common/Tag/Filter'
import Tags from './Tag/List'
import TagsField from '../Common/Tag/TagsField'

const TaxonomyRoutes = [
    {
        path: "/hierarchies",
        component: HierarchyTree
    },
    {
        path: "/tags",
        component: Tags
    }
]

export { HierarchyChips }
export { HierarchyFilter }
export { HierarchyTree }
export { ManageHierarchies }
export { ManageTags }
export { TagChips }
export { TagField }
export { TagFilter }
export { Tags }
export { TagsField }
export { TaxonomyRoutes }
