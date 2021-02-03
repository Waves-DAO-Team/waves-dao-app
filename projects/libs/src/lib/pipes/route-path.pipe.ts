import { Pipe, PipeTransform } from '@angular/core'
import { relativeRoute, route } from './routes.lib'

@Pipe({
  name: 'route'
})
export class RoutePipe implements PipeTransform {
  transform (value: string | string[], ...args: string[]): string {
    return route(value, args)
  }
}

@Pipe({
  name: 'routes'
})
export class RoutesPipe implements PipeTransform {
  transform (value: string | string[], ...args: string[]): string {
    return route(value, args)
  }
}

@Pipe({
  name: 'relativeRoute'
})
export class RelativeRoutePipe implements PipeTransform {
  transform (value: string | string[], ...args: string[]): string {
    return relativeRoute(value, args)
  }
}
