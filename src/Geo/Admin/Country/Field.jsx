import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import {
Select,
useMessage,
} from 'Form'

const CountryField = (props) => {

    const [countries, setCountries] = useState([])
    const [countryProgress, setCountryProgress] = useState(true)
    const { error } = useMessage()

    useEffect(() => {
        var url = `/country/all`
        get(url)
            .then(data => {
                setCountries(data)
                setCountryProgress(false)
            }, e => {
                error(e)
                setCountryProgress(false)
            })
    }, [])

    return <Select
        property='CountryGuid'
        placeholder='Country'
        options={countries}
        display={i => i?.name}
        choose={i => i.guid}
        loading={countryProgress}
        {...props}
    />
}

export default CountryField
