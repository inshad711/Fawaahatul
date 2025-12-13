import ContactFormNew from '@/components/Forms/ContactFormNew'
import FaqContact from '@/components/Forms/FaqContact'
import React from 'react'

const ContactPage = () => {
    return (
        <div>
            <div> <ContactFormNew /> </div>
            <div><FaqContact /> </div>
        </div>
    )
}

export default ContactPage