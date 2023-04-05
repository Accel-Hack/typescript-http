export class ClientUtils {
  public static is2xx(status: number): boolean {
    return this.isX(status, 2)
  }

  public static is3xx(status: number): boolean {
    return this.isX(status, 3)
  }

  public static is4xx(status: number): boolean {
    return this.isX(status, 4)
  }

  public static is5xx(status: number): boolean {
    return this.isX(status, 5)
  }

  private static isX(status: number, expected: number): boolean {
    return Math.floor(status / 100) == expected
  }
}
