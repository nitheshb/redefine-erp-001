import { render } from '@redwoodjs/testing/web'

import UnitsStatsCard from './UnitsStatsCard'

describe('UnitsStatsCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UnitsStatsCard />)
    }).not.toThrow()
  })
})
