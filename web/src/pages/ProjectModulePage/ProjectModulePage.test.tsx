import { render } from '@redwoodjs/testing/web'

import ProjectModulePage from './ProjectModulePage'

describe('ProjectModulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectModulePage />)
    }).not.toThrow()
  })
})
