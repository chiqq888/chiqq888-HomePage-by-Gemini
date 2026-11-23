import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { normalizePathname, RouterContext } from '../../lib/routerContext'

type RouteState = {
  pathname: string
  hash: string
  navigationId: number
}

function readLocation(): Omit<RouteState, 'navigationId'> {
  return {
    pathname: normalizePathname(window.location.pathname),
    hash: window.location.hash,
  }
}

function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteState>(() => ({
    ...readLocation(),
    navigationId: 0,
  }))

  useEffect(() => {
    const handlePopState = () => {
      const next = readLocation()
      setRoute((prev) => ({
        ...next,
        navigationId: prev.navigationId + 1,
      }))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to: string) => {
    const nextUrl = new URL(to, window.location.origin)
    if (nextUrl.origin !== window.location.origin) {
      window.location.assign(nextUrl.href)
      return
    }

    const nextRelative = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    const currentRelative = `${window.location.pathname}${window.location.search}${window.location.hash}`

    if (nextRelative !== currentRelative) {
      window.history.pushState(null, '', nextRelative)
    }

    setRoute((prev) => ({
      pathname: normalizePathname(nextUrl.pathname),
      hash: nextUrl.hash,
      navigationId: prev.navigationId + 1,
    }))
  }, [])

  const value = useMemo(
    () => ({
      pathname: route.pathname,
      hash: route.hash,
      navigationId: route.navigationId,
      navigate,
    }),
    [route.pathname, route.hash, route.navigationId, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export default RouterProvider
