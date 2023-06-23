import { useContext } from 'react'
import Collapse from '@mui/material/Collapse'
import { FormContext } from 'Contexts'
import Unify from '../Unify'
import Progress from '../Progress'

const FormElement = ({
    handleSubmit,
    id,
    inputs,
    isInline,
}) => {

    const {
        contentProgress,
        externalProgress,
        progress,
    } = useContext(FormContext)

    return <form
        id={id || 'form'}
        noValidate
        onSubmit={handleSubmit}
    >
        {
            isInline
                ?
                <>
                    <div className="relative w-full h-full">
                        <div id='fields'>
                            <Unify component={inputs} />
                        </div>
                        {
                            (externalProgress || contentProgress || progress)
                            &&
                            <div className="absolute inset-0 grid place-items-center opacity-30 bg-gray-800 ">
                                <Progress />
                            </div>
                        }
                    </div>
                </>
                :
                <>
                    <div id='fields' className={(externalProgress || contentProgress) && 'grid place-items-center'}>
                        <Collapse in={externalProgress || contentProgress}>
                            <div className="py-10">
                                <Progress />
                            </div>
                        </Collapse>
                        <Collapse in={!externalProgress && !contentProgress}>
                            {
                                // todo: Consider adding IsVital and Key and Guid to all forms for super admin
                            }
                            <Unify
                                component={inputs}
                            />
                        </Collapse>
                    </div>
                </>
        }
    </form>
}

export default FormElement 
