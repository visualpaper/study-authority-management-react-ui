import { Fragment } from 'react'

export const PageLoader = ({
  children,
  isPageLoading,
}: {
  children: any
  isPageLoading: boolean
}) => (
  <Fragment>
    {isPageLoading && (
      <div className="spinner-border text-primary mx-auto" role="status">
        <span className="sr-only" />
      </div>
    )}
    <div style={isPageLoading ? { display: 'none' } : {}}>{children}</div>
  </Fragment>
)
