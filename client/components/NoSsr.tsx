import React from 'react'

interface Props {
  defaultValue: string;
  children: React.ReactNode;
}

const NoSsr = ({ children, defaultValue }: Props) => {
  if (typeof window === 'undefined') {
    return defaultValue || null
  }

  return children
}

export default NoSsr
