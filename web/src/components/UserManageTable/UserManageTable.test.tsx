import { render } from '@redwoodjs/testing/web'

import UserManageTable from './UserManageTable'

describe('UserManageTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserManageTable />)
    }).not.toThrow()
  })
})
