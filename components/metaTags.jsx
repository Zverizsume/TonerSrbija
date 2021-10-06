import React from 'react'
import Head from 'next/head'

export default function MetaTags ({ pageData }) {

    const appTitle = 'Toner Srbija'
    const appAuthor = 'Bole'
    const appUrl = 'https://toner-srbija.rs'
    const appImage = 'https://toner-srbija.rs/logo.png'

    const pageTitle = pageData.title
    const pageDesc = pageData.desc
    const appCanonical = pageData.canonical

    return (
        <Head>

            <title>{ pageTitle + appTitle }</title>

            <link rel="icon" href="/favicon.ico" />
            <link rel="canonical" href={ appCanonical } />

            {/* og meta tags */}

            <meta name="title" property="og:title" content={pageTitle}></meta>
            <meta name="image" property="og:image" content={appImage}></meta>
            <meta name="description" property="og:description" content={pageDesc}></meta>
            <meta name="author" content={appAuthor}></meta>

            <meta property="og:type" content={'website'}></meta>
            <meta name="og:title" content={pageTitle} />
            <meta name="og:image" content={appImage} />
            <meta name="og:url" content={appUrl} />
            <meta name="og:description" content={pageDesc} />

            {/* twitter meta tags */}

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content={appAuthor} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDesc} />
            <meta name="twitter:image" content={appImage} />

        </Head>
    )
}