import { render } from '@redwoodjs/testing/web'

import FlatCard from './FlatCard'

describe('FlatCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FlatCard />)
    }).not.toThrow()
  })
})
