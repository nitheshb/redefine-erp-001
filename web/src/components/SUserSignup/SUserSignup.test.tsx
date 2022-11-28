import { render } from '@redwoodjs/testing/web'

import SUserSignup from './SUserSignup'

describe('SUserSignup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SUserSignup />)
    }).not.toThrow()
  })
})
