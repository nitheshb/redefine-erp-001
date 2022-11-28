import { render } from '@redwoodjs/testing/web'

import CrmHomePage from './CrmHomePage'

describe('CrmHomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CrmHomePage />)
    }).not.toThrow()
  })
})
