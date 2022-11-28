import { render } from '@redwoodjs/testing/web'

import ErpAccountHomePage from './ErpAccountHomePage'

describe('ErpAccountHomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ErpAccountHomePage />)
    }).not.toThrow()
  })
})
