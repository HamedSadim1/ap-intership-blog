/**
 * useScrollVisibility - Alias voor useScrollPosition met een hogere default threshold (300px)
 *
 * Gebruikt voor UI elementen zoals de "back to top" knop,
 * die pas zichtbaar moeten worden na flink scrollen.
 *
 * @param threshold - Scroll Y threshold in pixels (default: 300)
 * @returns Boolean indicating if scrolled past threshold
 *
 * @example
 * const isVisible = useScrollVisibility();
 * // isVisible = true when window.scrollY > 300
 */
export { useScrollPosition as useScrollVisibility } from "./useScrollPosition";
