import React from 'react'
import { commerce } from '../lib/commerce'
import Layout from '../components/layout'
import Header from '../components/header'
import Features from '../components/features'
import Videos from '../components/videos'
import Products from '../components/products'

const pageData = {
  title: '',
  desc: 'Početna strana',
  canonical: 'https://toner-srbija.rs'
}

export default function Home( { mrchnt, prods, categories } ) {

  return (
    <Layout pageData = { pageData } >
      <Header />
      <Features />
      <Videos />
      <Products products = { prods } categories = { categories } />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {

  const merchant = await commerce.merchants.about()
  const { data: products } = await commerce.products.list({limit: 200})
  const { data: categories } = await commerce.categories.list()

  let mrchnt = JSON.parse(JSON.stringify(merchant))
  let prods = JSON.parse(JSON.stringify(products))

  return {
    props: {
      mrchnt,
      prods,
      categories
    }
  }
}