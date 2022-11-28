import { render } from '@redwoodjs/testing/web'

import Blockdetails from './Blockdetails'

describe('Blockdetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Blockdetails />)
    }).not.toThrow()
  })
})
