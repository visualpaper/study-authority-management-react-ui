import { render, screen } from '@testing-library/react'
import { PageLoader } from '../../components/PageLoader'

describe('PageLoader', () => {
  test('isPageLoading が true の場合', () => {
    const { container } = render(
      <PageLoader isPageLoading={true}>
        <div>children</div>
      </PageLoader>
    )

    // Loading が表示されていること。
    expect(container.getElementsByClassName('spinner-border').length).toBe(1)

    // children が表示されていないこと
    expect(screen.getByText('children').parentElement).toHaveStyle(
      'display: none'
    )
  })

  test('isPageLoading が false の場合', () => {
    const { container } = render(
      <PageLoader isPageLoading={false}>
        <div>children</div>
      </PageLoader>
    )

    // Loading が表示されていないこと。
    expect(container.getElementsByClassName('spinner-border').length).toBe(0)

    // children が表示されていること
    expect(screen.getByText('children').parentElement).not.toHaveStyle(
      'display: none'
    )
  })
})
