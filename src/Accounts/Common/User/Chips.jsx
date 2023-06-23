const UserChips = ({ entity, usersPropertyName }) => {
    return <div className="flex gap-2">
        {
            entity.relatedItems[usersPropertyName || 'users']?.map(user => <span
                key={user.id}
                className="px-2 py-0.5 rounded"
            >
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    title={user.naturalPersonName}
                    src={user.relatedItems.personImageUrl || user.relatedItems.imageUrl}
                />
            </span>
            )
        }
    </div>
}

export default UserChips
