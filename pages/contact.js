import React from 'react'

import Layout from '../components/layout'
import ContactForm from '../components/contactForm'

const pageData = {
    title: 'Kontakt | ',
    desc: 'Kontakt strana',
    canonical: 'https://toner-srbija.rs/contact'
}

export default function Contact () {
    return (
        <Layout pageData = { pageData } >
            <ContactForm />
        </Layout>
    )
}