import { render } from '@redwoodjs/testing/web'

import FinanceHomePagePage from './FinanceHomePagePage'

describe('FinanceHomePagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FinanceHomePagePage />)
    }).not.toThrow()
  })
})
