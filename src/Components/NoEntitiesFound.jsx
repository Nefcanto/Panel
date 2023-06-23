import app from 'App'

const NoEntitiesFound = ({
    className,
    ctaText,
    description,
    icon,
    title,
}) => {
    return <div
        className={`py-10 text-2xl font-bold text-gray-600 ${className || ""}`}
    >
        {
            app.t("No items found")
        }
    </div>
}

export default NoEntitiesFound
