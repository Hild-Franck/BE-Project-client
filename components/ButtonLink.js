import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const ButtonLink = ({ className, href, hrefAs, children }) => (
  <Link href={href} as={hrefAs} prefetch>
    <a className={className}>{children}</a>
  </Link>
)

ButtonLink.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  hrefAs: PropTypes.string,
  children: PropTypes.node,
}

export default ButtonLink