import { render } from '@redwoodjs/testing/web'

import ProjectEditPage from './ProjectEditPage'

describe('ProjectEditPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectEditPage />)
    }).not.toThrow()
  })
})
