

/**
 * Debounces a function by delaying its execution.
 * @param func The function to be debounced.
 * @param delay The delay in milliseconds before the function is executed.
 * @returns A debounced version of the function.
 */
export const debounce = (func: Function, delay: number) => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}
