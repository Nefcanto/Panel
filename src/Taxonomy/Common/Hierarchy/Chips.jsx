const HierarchyChips = ({ entity }) => {
    return <div className="flex gap-2">
        {
            entity.relatedItems?.hierarchies?.map(hierarchy => <span
                key={hierarchy.id}
                className="px-2 py-0.5 border rounded"
            >
                {hierarchy.title}
            </span>
            )
        }
    </div>
}

export default HierarchyChips
