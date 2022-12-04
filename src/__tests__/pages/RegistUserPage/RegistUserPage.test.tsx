import '@testing-library/jest-dom'
import '@testing-library/user-event'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { act, fireEvent, render, screen, waitFor } from '../../test-utils'

// もし delay 等かける場合、デフォルト 5s なので長めにテスト時間を取る必要がある
// jest.setTimeout(10000)

const response = jest.fn()
const server = setupServer(
  rest.post('/api/v1/users/regist', response),
  rest.post('/api/v1/loginWithCookie', (req, res, ctx) => {
    return res(ctx.status(404))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('初期表示', async () => {
  /*
   * When
   */
  const { container } = render('/users/regist')

  /*
   * Then
   */

  // Submit ボタンが表示されるまで待機する
  await waitFor(() => expect(screen.queryByText(/Submit/)).toBeInTheDocument())

  // Id 入力欄が空であること
  const idElement = container.querySelector('#id')
  expect(idElement).toBeInTheDocument()
  expect(idElement!.textContent).toBe('')

  // Name 入力欄が空であること
  const nameElement = container.querySelector('#name')
  expect(nameElement).toBeInTheDocument()
  expect(nameElement!.textContent).toBe('')

  // Password 入力欄が空であること
  const passwordElement = container.querySelector('#name')
  expect(passwordElement).toBeInTheDocument()
  expect(passwordElement!.textContent).toBe('')

  // Submit ボタンが押下可能であること
  expect(screen.getByText(/Submit/)).toBeEnabled()
})
