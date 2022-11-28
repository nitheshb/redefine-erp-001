import { render } from '@redwoodjs/testing/web'

import UsersAdminPage from './UsersAdminPage'

describe('UsersAdminPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersAdminPage />)
    }).not.toThrow()
  })
})
