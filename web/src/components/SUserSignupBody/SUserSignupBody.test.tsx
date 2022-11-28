import { render } from '@redwoodjs/testing/web'

import SUserSignupBody from './SUserSignupBody'

describe('SUserSignupBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SUserSignupBody />)
    }).not.toThrow()
  })
})
