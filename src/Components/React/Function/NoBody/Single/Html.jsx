const html = (props) => <div>
    <h1>I am HTML returned by a function component without body</h1>
    {
        Object.getOwnPropertyNames(props).map((entity, index) => <div key={index}>{entity} - {props[entity].toString()}</div>)
    }
</div>

export default html
