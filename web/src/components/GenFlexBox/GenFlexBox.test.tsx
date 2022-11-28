import { render } from '@redwoodjs/testing/web'

import GenFlexBox from './GenFlexBox'

describe('GenFlexBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GenFlexBox />)
    }).not.toThrow()
  })
})
