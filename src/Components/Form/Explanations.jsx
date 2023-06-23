import app from 'App'

const Explanations = ({ explanations }) => {
    return <div>
        {
            app.t(explanations)
        }
        {
            explanations
                ?
                <div className="mb-12"></div>
                :
                null
        }
    </div>
}

export default Explanations
