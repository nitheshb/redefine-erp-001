import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const FullViewProjectPage = () => {
  return (
    <>
      <MetaTags title="FullViewProject" description="FullViewProject page" />

      <h1>FullViewProjectPage</h1>
      <p>
        Find me in <code>./web/src/pages/FullViewProjectPage/FullViewProjectPage.tsx</code>
      </p>
      <p>
        My default route is named <code>fullViewProject</code>, link to me with `
        <Link to={routes.fullViewProject()}>FullViewProject</Link>`
      </p>
    </>
  )
}

export default FullViewProjectPage
