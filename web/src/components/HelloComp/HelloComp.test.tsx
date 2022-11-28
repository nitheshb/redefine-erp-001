import { render } from '@redwoodjs/testing/web'

import HelloComp from './HelloComp'

describe('HelloComp', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HelloComp />)
    }).not.toThrow()
  })
})
