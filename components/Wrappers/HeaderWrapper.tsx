'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import NewHeader from '../Header/NewHeader'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  headerMenu: any
  logoSettings: any
}

const HeaderWrapper: React.FC<Props> = ({ logoSettings, headerMenu }) => {
  const pathname = usePathname()
  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  )
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = pathname === '/'
  let [variation, setVariation] = useState(isHome ? 1 : 2)

  useEffect(() => {
    setVariation(isHome ? 1 : 2)
  }, [pathname])

  const sortedNavItems = headerMenu
    ?.slice()
    .sort((a: any, b: any) => a.position - b.position)

  // 1 Variation one stands for transparent header
  // 2 Variation two stands for white header

  if (
    pathname.includes('checkout') ||
    pathname.includes('thank-you') ||
    pathname.includes('testing-page-for-developers-only')
  ) {
    return null
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(globalSetting, null, 2)}</pre> */}
      <NewHeader
        headerMenu={sortedNavItems}
        isHome={isHome}
        logoSettings={logoSettings}
        variation={variation}
        isScrolled={isScrolled}
      />
    </div>
  )
}

export default HeaderWrapper
