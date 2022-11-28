import { render } from '@redwoodjs/testing/web'

import Floordetails from './Floordetails'

describe('Floordetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Floordetails />)
    }).not.toThrow()
  })
})
