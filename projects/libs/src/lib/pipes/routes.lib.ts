export const getRoutes = (value: string | string[], args: string[]) => {
  const params = args.slice()
  return (
    (typeof value === 'string') ? value.split('/') : value
  )
    .map((path) => path.indexOf(':') === 0 ? params.shift() || path : path)
}

export const route = (value: string | string[], args: string[]) => '/' + getRoutes(value, args).join('/')

export const relativeRoute = (value: string | string[], args: string[]) => getRoutes(value, args).join('/')
