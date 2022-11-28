import { render } from '@redwoodjs/testing/web'

import AddPhase from './AddPhase'

describe('AddPhase', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddPhase />)
    }).not.toThrow()
  })
})
