import { render, screen, fireEvent } from '@testing-library/react'
import { RefreshHeader } from '../../components/RefreshHeader'

const onRefresh = jest.fn()

test('isPageLoading が true で最終更新日時が存在しない場合', () => {
  const { container } = render(
    <RefreshHeader onRefresh={onRefresh} syncDate={null} isPageLoding={true} />
  )

  // Loading が表示されていること。
  expect(container.getElementsByClassName('spinner-border').length).toBe(1)

  // 最終更新日時が表示されていないこと
  expect(screen.queryByText(/Last synced on/)).not.toBeInTheDocument()
})

test('isPageLoading が true で最終更新日時が存在する場合', () => {
  const { container } = render(
    <RefreshHeader
      onRefresh={onRefresh}
      syncDate={new Date()}
      isPageLoding={true}
    />
  )

  // Loading が表示されていること。
  expect(container.getElementsByClassName('spinner-border').length).toBe(1)

  // 最終更新日時が表示されていること
  expect(screen.getByText(/Last synced on/)).toBeInTheDocument()
})

test('isPageLoading が false の場合', () => {
  const { container } = render(
    <RefreshHeader
      onRefresh={onRefresh}
      syncDate={new Date()}
      isPageLoding={false}
    />
  )

  // Loading が表示されていないこと。
  expect(container.getElementsByClassName('spinner-border').length).toBe(0)

  // 最終更新日時が表示されていること
  expect(screen.getByText(/Last synced on/)).toBeInTheDocument()

  // onRefresh ボタンを押下する
  fireEvent.click(screen.getByRole('button'))

  // onRefresh が呼び出されること
  expect(onRefresh).toHaveBeenCalled()
})
