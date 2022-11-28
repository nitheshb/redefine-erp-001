import { render } from '@redwoodjs/testing/web'

import AddPhaseForm from './AddPhaseForm'

describe('AddPhaseForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddPhaseForm />)
    }).not.toThrow()
  })
})
