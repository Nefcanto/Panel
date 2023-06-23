const html = (props) => {
    const handle = () => {
        alert('clicked')
    }
    return <div>
        <h1>I am HTML returned by a function component without body</h1>
        <button onClick={handle}>Click me</button>
        {
            Object.getOwnPropertyNames(props).map((entity, index) => <div key={index}>{entity} - {props[entity].toString()}</div>)
        }
    </div>
}

export default html
