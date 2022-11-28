import { render } from '@redwoodjs/testing/web'

import FullViewProjectPage from './FullViewProjectPage'

describe('FullViewProjectPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FullViewProjectPage />)
    }).not.toThrow()
  })
})
