import { render } from '@redwoodjs/testing/web'

import ProjectsMHomeBody from './ProjectsMHomeBody'

describe('ProjectsMHomeBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectsMHomeBody />)
    }).not.toThrow()
  })
})
