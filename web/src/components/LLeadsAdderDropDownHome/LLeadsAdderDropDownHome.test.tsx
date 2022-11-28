import { render } from '@redwoodjs/testing/web'

import LLeadsAdderDropDownHome from './LLeadsAdderDropDownHome'

describe('LLeadsAdderDropDownHome', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LLeadsAdderDropDownHome />)
    }).not.toThrow()
  })
})
