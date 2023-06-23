import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { filterOperator } from 'App'
import { useFilter } from 'Hooks'
import Filter from './Filter'

const Boolean = ({
    falseLabel,
    label,
    nullable,
    property,
    trueLabel,
}) => {

    const {
        id,
        entity,
        setEntity,
    } = useFilter({
        choose: i => i,
        operator: filterOperator.equals,
        property,
        show: i => i,
        type: 'boolean',
    })

    return <Filter
        id={id}
    >
        <FormGroup className="">
            {
                nullable
                    ?
                    <>
                        <FormControl>
                            <FormLabel id={property}>{label || property}</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby={property}
                                defaultValue="female"
                                name={property}
                                onChange={(e) => {
                                    if (e.target.value === 'true') {
                                        setEntity(true)
                                    }
                                    else if (e.target.value === 'false') {
                                        setEntity('false')
                                    }
                                    else {
                                        setEntity(null)
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value="all"
                                    checked={entity === null}
                                    control={<Radio size="small" />}
                                    label="All"
                                />
                                <FormControlLabel
                                    value="true"
                                    checked={entity !== null && entity === true}
                                    control={<Radio size="small" />}
                                    label={trueLabel}
                                />
                                <FormControlLabel
                                    value="false"
                                    checked={entity !== null && entity === 'false'}
                                    control={<Radio size="small" />}
                                    label={falseLabel}
                                />
                            </RadioGroup>
                        </FormControl>
                    </>
                    :
                    <FormControlLabel
                        control={<Checkbox

                        />}
                        label={app.t(label || property)}
                        checked={entity || false}
                        onChange={(e) => setEntity(e.target.checked)}
                    />
            }
        </FormGroup>
    </Filter>
}

export default Boolean
