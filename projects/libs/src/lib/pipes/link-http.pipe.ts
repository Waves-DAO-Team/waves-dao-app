import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkHttp'
})
export class LinkHttpPipe implements PipeTransform {
  transform(href: string) {
    return href.startsWith("http://") || href.startsWith("https://") ? href : "http://" + href
  }
}
