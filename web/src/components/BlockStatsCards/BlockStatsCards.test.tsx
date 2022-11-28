import { render } from '@redwoodjs/testing/web'

import BlockStatsCards from './BlockStatsCards'

describe('BlockStatsCards', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlockStatsCards />)
    }).not.toThrow()
  })
})
