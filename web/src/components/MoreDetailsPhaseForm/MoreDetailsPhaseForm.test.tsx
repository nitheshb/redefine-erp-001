import { render } from '@redwoodjs/testing/web'

import MoreDetailsPhaseForm from './MoreDetailsPhaseForm'

describe('MoreDetailsPhaseForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MoreDetailsPhaseForm />)
    }).not.toThrow()
  })
})
