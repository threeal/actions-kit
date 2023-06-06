/**
 * Repeatedly executes a given function with a specified delay until it resolves or the timeout is reached.
 *
 * @template T The type of the promise result.
 * @param fn The function to be executed.
 * @param ms The delay in milliseconds between function executions.
 * @returns A promise that resolves with the result of the function.
 */
export async function repeat<T>(fn: () => Promise<T>, ms: number): Promise<T> {
  try {
    const timer = new Promise<T>((_, reject) => setTimeout(reject, ms));
    const result = await Promise.race([fn(), timer]);
    return result;
  } catch (error) {
    return repeat(fn, ms);
  }
}
