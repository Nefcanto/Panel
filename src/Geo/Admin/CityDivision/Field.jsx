import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import {
    Select,
    useMessage,
} from 'Form'

const CityDivisionField = () => {

    const { error } = useMessage()

    const [cityDivisions, setCityDivisions] = useState([])
    const [cityDivisionProgress, setCiteyDivisionProgress] = useState(false)

    useEffect(() => {
        setCiteyDivisionProgress(true)
        get('/cityDivision/all')
            .then(data => {
                setCityDivisions(data)
                setCiteyDivisionProgress(false)
            }, e => {
                setCiteyDivisionProgress(false)
                error(e)
            })
    }, [])

    return <>
        <Select
            property='CityDivisionGuid'
            placeholder='CityDivision'
            options={cityDivisions}
            display={i => i.name}
            choose={i => i.guid}
            loading={cityDivisionProgress}
        />
    </>
}

export default CityDivisionField
