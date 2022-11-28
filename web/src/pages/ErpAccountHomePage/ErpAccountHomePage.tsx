import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ErpAccountHomePage = () => {
  return (
    <>
      <MetaTags title="ErpAccountHome" description="ErpAccountHome page" />

      <h1>ErpAccountHomePage</h1>
      <p>
        Find me in <code>./web/src/pages/ErpAccountHomePage/ErpAccountHomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>erpAccountHome</code>, link to me with `
        <Link to={routes.erpAccountHome()}>ErpAccountHome</Link>`
      </p>
    </>
  )
}

export default ErpAccountHomePage
