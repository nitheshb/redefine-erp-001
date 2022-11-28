import { render } from '@redwoodjs/testing/web'

import CallExecutiveBoard from './CallExecutiveBoard'

describe('CallExecutiveBoard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CallExecutiveBoard />)
    }).not.toThrow()
  })
})
