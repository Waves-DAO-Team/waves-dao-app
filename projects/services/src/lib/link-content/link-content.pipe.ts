/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core'
import { LinkContentService } from '@services/link-content/link-content.service'
import { Observable } from 'rxjs'

@Pipe({ name: 'linkContent' })
export class LinkContentPipe implements PipeTransform {
  constructor (private linkContentService: LinkContentService) {}

  transform (value: string): Observable<string | undefined> {
    return this.linkContentService.getPrepareContent(value)
  }
}
