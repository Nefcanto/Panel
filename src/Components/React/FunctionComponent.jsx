const FunctionComponent = ({ children, ...rest }) => {
    return <div>
        <h1>I am a function component</h1>
        <p>I can also have children and props</p>
        {children}
        {
            Object.getOwnPropertyNames(rest).map(entity => <div key={entity}>{entity} - {rest[entity].toString()}</div>)
        }
    </div>
}

export default FunctionComponent
