import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'

const Wrapper = styled.nav`
  font-size: 24px;
  text-align: center;
  font-weight: 900;
  & a {
    text-decoration: none;
    color: black;
    opacity: .8;

    &:hover {
      opacity: 1;
    }
  }
`

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Link href="/">X Days Since</Link>
    </Wrapper>
  )
}

export default Header
