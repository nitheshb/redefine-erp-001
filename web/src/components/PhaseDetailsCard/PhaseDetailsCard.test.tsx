import { render } from '@redwoodjs/testing/web'

import PhaseDetailsCard from './PhaseDetailsCard'

describe('PhaseDetailsCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PhaseDetailsCard />)
    }).not.toThrow()
  })
})
