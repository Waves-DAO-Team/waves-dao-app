import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'linkHttp'
})
export class LinkHttpPipe implements PipeTransform {
  transform (href: string | null): string {
    if (!href) {
      return ''
    }

    if(typeof href  !== 'string') {
      return href
    }
    return href.startsWith('http://') || href.startsWith('https://') ? href : 'http://' + href
  }
}
