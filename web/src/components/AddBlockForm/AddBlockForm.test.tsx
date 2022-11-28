import { render } from '@redwoodjs/testing/web'

import AddBlockForm from './AddBlockForm'

describe('AddBlockForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddBlockForm />)
    }).not.toThrow()
  })
})
