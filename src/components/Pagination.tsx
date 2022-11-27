import { Fragment } from 'react'
import { Pagination as BootStrapPagination } from 'react-bootstrap'

export const Pagination: React.FC<{
  pageSize: number
  listCount: number
  currentPage: number
  setPage: (item: number) => void
}> = ({ pageSize, listCount, currentPage, setPage }) => {
  const length = listCount / pageSize + (listCount % pageSize === 0 ? 0 : 1)
  const items = Array.from({ length: length }, (_, i) => i + 1)

  if (listCount == 0) {
    return <Fragment />
  }
  return (
    <BootStrapPagination id="user-row-pagination">
      {items.map((item) => (
        <BootStrapPagination.Item
          data-testid={`page-${item}`}
          key={item}
          active={item === currentPage}
          onClick={() => setPage(item)}
        >
          {item}
        </BootStrapPagination.Item>
      ))}
    </BootStrapPagination>
  )
}
