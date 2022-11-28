import { render } from '@redwoodjs/testing/web'

import GenTypography from './GenTypography'

describe('GenTypography', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GenTypography />)
    }).not.toThrow()
  })
})
