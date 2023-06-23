import { useState, useEffect, useContext } from 'react';
import { FormContext } from 'Contexts'

const Hidden = ({
    property,
    value
}) => {

    const [id, setId] = useState();
    const { addFieldToFormContext } = useContext(FormContext);

    useEffect(() => {
        setId(`hidden_${property}`);
    }, [property]);

    useEffect(() => {
        addFieldToFormContext({
            id,
            isDirty: true,
            isValid: true,
            value: undefined,
        });
        // app.on(app.formSubmitted, () => { });
    }, [value, id]);

    return <input
        id={id}
        type="hidden"
        value={value}
    />
};

export default Hidden 
