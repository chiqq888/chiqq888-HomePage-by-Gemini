import type { ComponentPropsWithoutRef, MouseEvent } from 'react'
import { useRouter } from '../../lib/routerContext'

type LinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  to: string
}

function Link({ to, onClick, target, download, ...props }: LinkProps) {
  const { navigate } = useRouter()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      Boolean(download) ||
      (target && target !== '_self')
    ) {
      return
    }

    const url = new URL(to, window.location.origin)
    if (url.origin !== window.location.origin) return

    event.preventDefault()
    navigate(to)
  }

  return <a href={to} target={target} download={download} onClick={handleClick} {...props} />
}

export default Link
