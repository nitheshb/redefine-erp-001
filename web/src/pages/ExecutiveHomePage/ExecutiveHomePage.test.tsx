import { render } from '@redwoodjs/testing/web'

import ExecutiveHomePage from './ExecutiveHomePage'

describe('ExecutiveHomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExecutiveHomePage />)
    }).not.toThrow()
  })
})
