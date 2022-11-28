import { render } from '@redwoodjs/testing/web'

import LLeadsTableView from './LLeadsTableView'

describe('LLeadsTableView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LLeadsTableView />)
    }).not.toThrow()
  })
})
