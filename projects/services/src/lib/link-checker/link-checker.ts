import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs'
import {ILinkCheckerService} from '@services/link-checker/link-checker.interface'
import {debounceTime, filter, map, takeUntil} from 'rxjs/operators'

export class LinkChecker {

  // https://api.github.com/repos/vlzhr/grants-program/issues/15
  // https://github.com/vlzhr/grants-program/issues/15

  /**
   * Исходный адрес для issues
   *
   * @private
   */
  private readonly issuesUrl: string = 'https://github.com/vlzhr/grants-program/issues'

  /**
   * Стрим для отписок
   *
   * @private
   */
  private readonly destroyed$ = new Subject()

  /**
   * Результат обработки стримов
   *
   * @public
   * @return{ILinkCheckerService.IResult}
   */
  public readonly result$: BehaviorSubject<ILinkCheckerService.IResult> =
    new BehaviorSubject<ILinkCheckerService.IResult>({title: null, body: null, size: null})

  /**
   * Результат обработки body и title
   *
   * @private
   * @return{title: string, body: string}
   */
  private readonly urlResult$: BehaviorSubject<ILinkCheckerService.IResponse>
    = new BehaviorSubject<ILinkCheckerService.IResponse>({body: '', title: ''})

  /**
   * Результат обработки body
   *
   * @private
   * @return{body: string}
   */
  private readonly body$: Observable<string> = this.urlResult$
    .pipe(takeUntil(this.destroyed$), map( (e: ILinkCheckerService.IResponse) => e.body))

  /**
   * Результат обработки title
   *
   * @private
   * @return{title: string}
   */
  private readonly title$: Observable<string> = this.urlResult$
    .pipe(takeUntil(this.destroyed$), map( (e: ILinkCheckerService.IResponse) => e.title))

  /**
   * Высчитывает размер контента
   *
   * @private
   * @return{number}
   */
  private readonly size$ = combineLatest([this.body$, this.title$])
    .pipe(
      takeUntil(this.destroyed$),
      debounceTime(400),
      filter( ([body, title]) => body.length > 0 && title.length > 0),
      map(([body, title]) => (body + title).length)
    )

  /**
   * Высчитывает результирующий объект
   *
   * @private
   * @return{ILinkCheckerService.IResult}
   */
  private readonly calculate = combineLatest([this.title$, this.body$, this.size$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([title, body, size]) => ({title, body, size}))
    )
    .subscribe( (e: ILinkCheckerService.IResult) => this.result$.next(e))

  /**
   * Создает экземпляр LinkChecker.
   *
   * @constructor
   * @this {LinkChecker}
   * @param http - http клиент.
   * @param url - url адрес.
   */
  constructor (private readonly http: HttpClient, url: string) {
    this.init(url)
  }

  /**
   * Убирает подписки
   *
   * @public
   * @return{void}
   */
  public onDestroy (): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  /**
   * Запускает LinkChecker
   *
   * @private
   * @param{string} url - адрес md
   * @return{void}
   */
  private init (url: string): void {
    if (this.isValidUrlFormat(url)) {
      url = this.changeToApi(url)
      this.getRequest(url).subscribe( (e: ILinkCheckerService.IResponse) => {
        this.urlResult$.next(e )
      })
    }
  }

  /**
   * Делает запрос
   *
   * @public
   * @param{string} url - адрес для запроса
   * @return{Observable<ILinkCheckerService.IResponse>} Observable ILinkCheckerService.IResponse
   */
  private getRequest (url: string): Observable<ILinkCheckerService.IResponse>{
    return this.http.get(url) as Observable<ILinkCheckerService.IResponse>
  }

  /**
   * Проверяет url на совпадение с исходным адресом и длину
   *
   * @private
   * @param{string} url - адрес для запроса
   * @return{boolean} boolean - статус валидации url
   */
  private isValidUrlFormat (url: string): boolean {
    return url.includes(this.issuesUrl) && url.length > this.issuesUrl.length
  }

  /**
   * Изменяет url на url к api
   *
   * @private
   * @param{string} url - адрес для запроса
   * @return{string} url - адрес к api
   */
  private changeToApi (url: string): string {
    return url.replace('https://github.com', 'https://api.github.com/repos')
  }

}
