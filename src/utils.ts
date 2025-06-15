export function generateState() {
  const randomValues = new Uint8Array(16);
  crypto.getRandomValues(randomValues);
  return Buffer.from(randomValues).toString("base64");
}

class StateMismatchException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StateMismatchException";
  }
}

export function verifyState(urlState: string, sessionState: string): boolean {
  if (urlState !== sessionState) {
    throw new StateMismatchException("State mismatch");
  }
  return true;
}

export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`${value} is not a string`);
  }
}

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`);
  }
}
