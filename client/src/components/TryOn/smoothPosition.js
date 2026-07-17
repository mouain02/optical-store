export function smoothValue(
    current,
    previous,
    factor = 0.2
) {

    return previous + (current - previous) * factor;

}