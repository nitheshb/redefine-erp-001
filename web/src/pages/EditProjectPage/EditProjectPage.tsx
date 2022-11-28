import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const EditProjectPage = () => {
  return (
    <>
      <MetaTags title="EditProject" description="EditProject page" />

      <h1>EditProjectPage</h1>
      <p>
        Find me in <code>./web/src/pages/EditProjectPage/EditProjectPage.tsx</code>
      </p>
      <p>
        My default route is named <code>editProject</code>, link to me with `
        <Link to={routes.editProject()}>EditProject</Link>`
      </p>
    </>
  )
}

export default EditProjectPage
