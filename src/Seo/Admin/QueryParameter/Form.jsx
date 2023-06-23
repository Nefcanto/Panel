import { PageForm } from 'Form'
import { ParameterObjectInputs } from 'Seo'

const inputs = <>
    {ParameterObjectInputs}
</>

const QueryParameterForm = () => {

    return <PageForm
        entityType='QueryParameter'
        inputs={inputs}
        small
    />
}

export default QueryParameterForm
