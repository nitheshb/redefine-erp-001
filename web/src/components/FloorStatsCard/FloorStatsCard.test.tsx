import { render } from '@redwoodjs/testing/web'

import FloorStatsCard from './FloorStatsCard'

describe('FloorStatsCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FloorStatsCard />)
    }).not.toThrow()
  })
})
