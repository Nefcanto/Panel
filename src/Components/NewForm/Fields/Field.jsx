import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import app from 'App'
import { Progress } from 'Panel'

const Field = ({
    children,
    className,
    helpText,
    id,
    isDirty,
    isValid,
    label,
    loading,
    progress,
    required,
    type,
}) => {

    const getProgressSize = () => {
        const locale = app.getLocale().key
        if (locale === 'fa') {
            return 48
        }
        else if (locale === 'en') {
            return 50
        }
    }

    return <>
        <div className={`field mt-4 ${className}`}>
            <FormControl
                error={isDirty && !isValid()}
                fullWidth
                required={required ? true : false}
            >
                {
                    type !== 'Select'
                    && type !== 'Upload'
                    && type !== 'Radio'
                    && type !== 'View'
                    && type !== 'DateOnly'
                    && type !== 'DateTime'
                    && type !== 'Time'
                    && <InputLabel
                        htmlFor={id}
                    >
                        {app.t(label)}
                    </InputLabel>
                }
                {
                    loading
                        ?
                        <Progress size={getProgressSize()} />
                        :
                        children
                }
                <FormHelperText
                    disabled={progress}
                >
                    {app.t(helpText) || " "}
                </FormHelperText>
            </FormControl>
        </div>
    </>
}

export default Field
