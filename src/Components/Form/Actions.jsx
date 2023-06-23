import { useContext } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import app from 'App'
import { FormContext } from 'Contexts'

const Actions = ({
    actions,
    className,
    handleSubmit,
    hasCancel,
    okText,
    onCanceled,
}) => {

    const getProgressSize = () => {
        const locale = app.getLocale().key
        switch (locale) {
            case 'fa':
                return 28
            case 'en':
                return 30
            default:
                return 30
        }
    }

    const {
        contentProgress,
        externalProgress,
        isDirty,
        isValid,
        progress,
    } = useContext(FormContext)

    return <div id='actions' className={'mt-4 ' + className}>
        {
            actions ||
            <div className="me-4 mb-4" >
                {
                    progress
                        ?
                        <CircularProgress size={getProgressSize()} />
                        :
                        <>
                            {
                                hasCancel &&
                                <Button
                                    tabIndex={-1}
                                    className="text-gray-900 border-gray-400 "
                                    variant="outlined"
                                    onClick={() => {
                                        if (onCanceled instanceof Function) {
                                            onCanceled()
                                        }
                                    }}
                                >
                                    {app.t('Cancel')}
                                </Button>
                            }
                            <Button
                                variant="outlined"
                                className={(hasCancel && ' ms-2 ') + ((isValid && !externalProgress && !contentProgress) ? " bg-green-200 text-gray-900 border-gray-400 " : "")}
                                onClick={(e) => handleSubmit(e)}
                                disabled={!isValid || externalProgress || contentProgress}
                            >
                                {app.t(okText || 'Save')}
                            </Button>
                        </>
                }
            </div>
        }
    </div>
}

export default Actions
