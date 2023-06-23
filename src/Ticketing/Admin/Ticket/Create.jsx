import {
    Browse,
    DialogForm,
    Enum,
    LongText,
    Title,
} from 'Form'
import { UserBrowser } from 'Accounts'

const fields =
    <>
        <Browse
            property='UserGuid'
            placeholder='User'
            required='Please select a user'
            list={UserBrowser}
            show={user => user.displayName}
            choose={user => user.guid}
        />
        {/* <UserBrowser
            required
        /> */}
        <Title />
        <Enum
            property='priorityId'
            entityType='TicketPriority'
            placeholder='Priority'
            required='Please choose the priority for this ticket. Choose less importance if it is less urgent'
        />
        <LongText
            property='body'
            placeholder='Please describe the problem'
            required='We need to know the problem to be able to help'
        />
    </>

const CreateTicket = (props) => {
    return <DialogForm
        entityType='ticket'
        inputs={fields}
    />
}

export default CreateTicket
