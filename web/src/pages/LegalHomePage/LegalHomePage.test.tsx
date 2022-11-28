import { render } from '@redwoodjs/testing/web'

import LegalHomePage from './LegalHomePage'

describe('LegalHomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LegalHomePage />)
    }).not.toThrow()
  })
})
