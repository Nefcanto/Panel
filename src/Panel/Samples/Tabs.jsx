import {
    Tabs,
    Tab,
} from 'Tab'

const TabsSample = () => {
    return <Tabs
        tabs={[
            <>
                <Tab
                    title='First tab'
                    panel={<div>Hi</div>}
                />
                <Tab
                    title='Second tab'
                    panel={<div>Bye</div>}
                />
                <Tab
                    title='Third tab'
                    panel={<div>Third</div>}
                />
            </>
        ]}
    />
}

export default TabsSample
