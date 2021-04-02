export const parseBoolean = (
    value: string, def: boolean = false): boolean => [
  'true',
  '1'].includes(value) ? true : (['false', '0'].includes(value) ? false : def)

export const parseValue = (
    value: string, def: string = ''): string => /^\${.+}$/.test(value) ||
value === '' ? def : value

export const parseNumber = (
    value: string, def: number = 0): number => /^\${.+}$/.test(value) ?
    def :
    parseFloat(value)

export const parseJson = (
    value: string,
    def: Record<string, unknown> | [] = {}): Record<string, unknown> | [] => {
      try {
        return /^\${.+}$/.test(value) ?
            def :
            JSON.parse(value) as Record<string, unknown> | []
      } catch (e) {
        return def
      }
}
