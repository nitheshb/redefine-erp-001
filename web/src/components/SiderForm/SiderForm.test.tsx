import { render } from '@redwoodjs/testing/web'

import SiderForm from './SiderForm'

describe('SiderForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SiderForm />)
    }).not.toThrow()
  })
})
