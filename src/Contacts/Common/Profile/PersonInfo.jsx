import Image from './Image'
import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import { useMessage } from 'Panel'
import {
    InlineForm,
    Text,
} from 'Form'

const inputs = <>
    <Text
        property='FirstName'
    />
    <Text
        property='LastName'
    />
</>

const PersonInfo = () => {

    const [entity, setEntity] = useState({})
    const [progress, setProgress] = useState(true)
    const { error } = useMessage()

    const loadEntity = () => {
        get("/profile/get")
            .then(data => {
                setEntity(data)
                setProgress(false)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    useEffect(() => {
        loadEntity()
    }, [])
    return !progress && <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">

                </div>
                <div className="relative">
                    <div className="w-48 h-48 bg-violet-400 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        <Image
                            url={entity?.relatedItems?.personImageUrl || entity?.relatedItems?.imageUrl}
                            uploadUrl={`/profile/setImage?id=${entity?.id}`}
                            loadEntity={loadEntity}
                        />
                    </div>
                </div>
                {/* <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                    <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  Connect</button>
                    <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  Message</button>
                </div> */}
            </div>
            <div className="mt-32 text-center">
                {/* <h1 className="text-4xl font-medium text-gray-700">
                    {entity?.fullName}
                </h1> */}
                <InlineForm
                    inputs={inputs}
                    entityType='Profile'
                    entity={entity}
                />
            </div>
        </div>
    </div>
}

export default PersonInfo
