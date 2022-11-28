import { render } from '@redwoodjs/testing/web'

import DummyBodyLayout from './DummyBodyLayout'

describe('DummyBodyLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DummyBodyLayout />)
    }).not.toThrow()
  })
})
