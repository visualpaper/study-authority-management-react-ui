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
  rest.put('/api/v1/setting', response),
  rest.post('/api/v1/loginWithCookie', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '00000001',
        name: 'AAAAA',
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('初期表示', async () => {
  /*
   * When
   */
  render('/setting')

  /*
   * Then
   */

  // Submit ボタンが表示されるまで待機する
  await waitFor(() => expect(screen.queryByText(/Submit/)).toBeInTheDocument())

  // Id 入力欄が自ユーザId となっていること
  const idElement = await screen.findByPlaceholderText('User Id')
  expect(idElement).toBeInTheDocument()
  expect(idElement).toBeDisabled()
  await waitFor(() => expect(idElement).toHaveValue('00000001'))

  // Name 入力欄が空であること
  const nameElement = await screen.findByPlaceholderText('User Name')
  expect(nameElement).toBeInTheDocument()
  expect(nameElement!.textContent).toBe('')

  // Submit ボタンが押下可能であること
  expect(screen.getByText(/Submit/)).toBeEnabled()
})

// test('入力欄が空で Submit ボタンを押下する', async () => {
//   /*
//    * When
//    */
//   render('/setting')

//   /*
//    * Then
//    */

//   // Submit ボタンが表示されるまで待機する
//   await waitFor(() => expect(screen.queryByText(/Submit/)).toBeInTheDocument())

//   // Submit ボタンが押下可能であること
//   expect(screen.getByText(/Submit/)).toBeEnabled()

//   // Submit ボタンを押下する
//   await act(() => {
//     fireEvent.click(screen.getByText(/Submit/))
//   })

//   // Submit ボタンが非活性になること
//   await waitFor(() => expect(screen.getByText(/Submit/)).toBeDisabled())

//   // Name 入力欄エラーが表示されること
//   expect(screen.queryByText(/Name is Required/)).toBeInTheDocument()
// })

// test('Submit ボタンを押下し正常に処理できないこと', async () => {
//   /*
//    * Given
//    */
//   response.mockImplementation((req, res, ctx) => {
//     return res(ctx.status(500))
//   })

//   /*
//    * When
//    */
//   render('/setting')

//   /*
//    * Then
//    */

//   // Submit ボタンが表示されるまで待機する
//   await waitFor(() => expect(screen.queryByText(/Submit/)).toBeInTheDocument())

//   // Id 欄に入力する
//   const nameInput = await screen.findByPlaceholderText('User Name')
//   await act(() => {
//     userEvent.type(nameInput, 'Sample Name')
//   })
//   await waitFor(() => expect(nameInput).toHaveValue('Sample Name'))

//   // Submit ボタンを押下する
//   await act(() => {
//     fireEvent.click(screen.getByText(/Submit/))
//   })

//   // Dashboard に遷移できないこと
//   await waitFor(() =>
//     expect(
//       screen.queryByText(/Authrity Management Dashboard/)
//     ).not.toBeInTheDocument()
//   )
// })

// test('Submit ボタンを押下し正常に処理できること', async () => {
//   /*
//    * Given
//    */
//   response.mockImplementation((req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         id: '00000001',
//         name: 'Sample Nmae',
//       })
//     )
//   })

//   /*
//    * When
//    */
//   render('/setting')

//   /*
//    * Then
//    */

//   // Submit ボタンが表示されるまで待機する
//   await waitFor(() => expect(screen.queryByText(/Submit/)).toBeInTheDocument())

//   // Id 欄に入力する
//   const nameInput = await screen.findByPlaceholderText('User Name')
//   await act(() => {
//     userEvent.type(nameInput, 'Sample Name')
//   })
//   await waitFor(() => expect(nameInput).toHaveValue('Sample Name'))

//   // Submit ボタンを押下する
//   await act(() => {
//     fireEvent.click(screen.getByText(/Submit/))
//   })

//   // Dashboard に遷移すること
//   await waitFor(() =>
//     expect(
//       screen.queryByText(/Authrity Management Dashboard/)
//     ).toBeInTheDocument()
//   )

//   // Register が表示されていないこと
//   expect(screen.queryByText('Register')).not.toBeInTheDocument()

//   // Login が表示されていないこと
//   expect(screen.queryByText('Login')).not.toBeInTheDocument()

//   // name が表示されていること
//   expect(screen.queryByText(/Sample Nmae さん/)).toBeInTheDocument()

//   // Setting が表示されていること
//   expect(screen.queryByText('Setting')).toBeInTheDocument()
// })
