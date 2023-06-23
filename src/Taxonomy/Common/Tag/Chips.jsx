const TagChips = ({ entity }) => {
    return <div className="flex gap-2">
        {
            entity.relatedItems?.tags?.map(tag => <span
                key={tag.id}
                className="px-2 py-0.5 border rounded"
            >
                {tag.title}
            </span>
            )
        }
    </div>
}

export default TagChips
