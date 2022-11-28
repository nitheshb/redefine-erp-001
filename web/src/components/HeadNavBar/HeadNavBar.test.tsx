import { render } from '@redwoodjs/testing/web'

import HeadNavBar from './HeadNavBar'

describe('HeadNavBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeadNavBar />)
    }).not.toThrow()
  })
})
