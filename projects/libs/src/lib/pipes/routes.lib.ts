export const getRoutes = (value: string | string[], args: string[]) => {
  const params = args.slice()
  return (
    (typeof value === 'string') ? value.split('/') as string[] : value as string[]
  )
    .map((path) => path.indexOf(':') === 0 ? params.shift() || path : path)
}

export function route (value: string | string[], args: string[]) {
  return '/' + getRoutes(value, args).join('/')
}

export function relativeRoute (value: string | string[], args: string[]) {
  return getRoutes(value, args).join('/')
}
