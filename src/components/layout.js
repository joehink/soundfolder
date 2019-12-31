/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

import Footer from "../components/footer";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
