import { render } from '@redwoodjs/testing/web'

import ConstructModulePage from './ConstructModulePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ConstructModulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConstructModulePage />)
    }).not.toThrow()
  })
})
