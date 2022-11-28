import { render } from '@redwoodjs/testing/web'

import LLeadsTableBody from './LLeadsTableBody'

describe('LLeadsTableBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LLeadsTableBody />)
    }).not.toThrow()
  })
})
