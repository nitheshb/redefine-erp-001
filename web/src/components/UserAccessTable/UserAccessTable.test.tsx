import { render } from '@redwoodjs/testing/web'

import UserAccessTable from './UserAccessTable'

describe('UserAccessTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserAccessTable />)
    }).not.toThrow()
  })
})
