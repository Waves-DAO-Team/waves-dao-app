import { Pipe, PipeTransform } from '@angular/core'

const getRoutes = (value: string | string[], args: string[]) => {
  const params = args.slice()
  return (
    (typeof value === 'string') ? value.split('/') as string[] : value as string[]
  )
    .map((path) => path.indexOf(':') === 0 ? params.shift() || path : path)
}

@Pipe({
  name: 'route'
})
export class RoutePipe implements PipeTransform {
  transform (value: string | string[], ...args: string[]) {
    return '/' + getRoutes(value, args).join('/')
  }
}

@Pipe({
  name: 'routes'
})
export class RoutesPipe implements PipeTransform {
  transform (value: string | string[], ...args: string[]) {
    return getRoutes(value, args)
  }
}

@Pipe({
  name: 'relativeRoute'
})
export class RelativeRoutePipe implements PipeTransform {
  transform (value: string | string[], ...args: string[]) {
    return getRoutes(value, args).join('/')
  }
}
