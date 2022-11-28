import { render } from '@redwoodjs/testing/web'

import MyActivityHome from './MyActivityHome'

describe('MyActivityHome', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyActivityHome />)
    }).not.toThrow()
  })
})
