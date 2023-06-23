const YouTube = ({
    code,
    height,
    width,
}) => <div>
        <iframe
            width={width || "853"}
            height={height || "480"}
            src={`https://www.youtube.com/embed/${code}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube"
        />
    </div>

export default YouTube
