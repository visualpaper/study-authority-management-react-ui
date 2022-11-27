import React from 'react'
import { Spinner } from 'react-bootstrap'
import { toDateString } from '../common/date'

export const RefreshHeader: React.FunctionComponent<{
  onRefresh: () => void
  syncDate: Date | null
  isPageLoding: boolean
}> = ({ onRefresh, syncDate, isPageLoding }) => {
  return (
    <div>
      {isPageLoding && (
        <button
          id="refreshHeaderIsPageLoding"
          className="btn btn-primary icon-refresh"
          type="button"
          disabled
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </button>
      )}

      {!isPageLoding && (
        <button
          id="refreshHeaderOnRefresh"
          className="btn btn-primary icon-refresh"
          type="button"
          onClick={onRefresh}
        >
          <span className="glyphicon glyphicon-refresh">Refresh</span>
        </button>
      )}

      {syncDate && <div>Last synced on {toDateString(syncDate)}</div>}
    </div>
  )
}
