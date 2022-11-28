import { render } from '@redwoodjs/testing/web'

import HeadSideBar from './HeadSideBar'

describe('HeadSideBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeadSideBar />)
    }).not.toThrow()
  })
})
