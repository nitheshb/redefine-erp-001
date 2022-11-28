import { render } from '@redwoodjs/testing/web'

import ProjectStatsCard from './ProjectStatsCard'

describe('ProjectStatsCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectStatsCard />)
    }).not.toThrow()
  })
})
