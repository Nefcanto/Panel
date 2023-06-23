import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import {
    Select,
    useMessage,
} from 'Form'

const GeoFields = () => {

    const { error } = useMessage()

    const [countries, setCountries] = useState([])
    const [countryProgress, setCountryProgress] = useState(false)
    const [selectedCountryGuid, setSelectedCountryGuid] = useState(null)

    const [selectedAdministrativeDivisionGuid, setSelectedAdministrativeDivision] = useState(null)
    const [administrativeDivisions, setAdministrativeDivisions] = useState([])
    const [administrativeDivisionProgress, setAdministrativeDivisionProgress] = useState(false)
    const [administrativeDivisionPlaceholder, setAdministrativeDivisionPlaceholder] = useState("AdministrativeDivisions")
    const [administrativeDivisionDisabled, setAdministrativeDivisionDisabled] = useState(true)

    const [cities, setCities] = useState([])
    const [cityProgress, setCityProgress] = useState(false)
    const [cityDisabled, setCityDisabled] = useState(true)

    useEffect(() => {
        setCountryProgress(true)
        get('/country/all')
            .then(data => {
                setCountryProgress(false)
                setAdministrativeDivisionDisabled(false)
                setCountries(data)
            }, e => {
                setCountryProgress(false)
                error(e)
            })
    }, [])

    useEffect(() => {

        if (selectedCountryGuid) {
            setAdministrativeDivisionProgress(true)
            const countryChoose = countries?.find(i => i.guid == selectedCountryGuid)
            setAdministrativeDivisionPlaceholder(countryChoose.administrativeDivisionTypeKey)
            get(`/administrativeDivision/all?countryId=${countryChoose?.id}`)
                .then(data => {
                    setAdministrativeDivisions(data)
                    setAdministrativeDivisionProgress(false)

                }, e => {
                    setAdministrativeDivisionProgress(false)
                    error(e)
                }
                )
        }
    }, [selectedCountryGuid])

    useEffect(() => {
        if (selectedAdministrativeDivisionGuid) {
            setCityProgress(true)
            get(`/city/all?administrativeDivisionId=${administrativeDivisions?.find(i => i.guid == selectedAdministrativeDivisionGuid)?.id}`)
                .then(data => {
                    setCities(data)
                    setCityProgress(false)
                    setCityDisabled(false)
                }, e => {
                    setCityProgress(false)
                    error(e)
                })
        }
    }, [selectedAdministrativeDivisionGuid])
  
    return <>

        <Select
            property='CountryGuid'
            placeholder='Country'
            options={countries}
            display={i => i.name}
            choose={i => i.guid}
            onChanged={value => setSelectedCountryGuid(value)}
            loading={countryProgress}
        />

        <Select
            property='AdministrativeDivisionsGuid'
            placeholder={administrativeDivisionPlaceholder}
            options={administrativeDivisions}
            display={i => i.name}
            choose={i => i.guid}
            onChanged={value => setSelectedAdministrativeDivision(value)}
            progress={administrativeDivisionDisabled}
            loading={administrativeDivisionProgress}
        />

        <Select
            property='CityGuid'
            placeholder='City'
            options={cities}
            display={i => i.name}
            choose={i => i.guid}    
            progress={cityDisabled}
            loading={cityProgress}
        />
    </>

}

export default GeoFields
