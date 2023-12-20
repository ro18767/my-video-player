export function is_element_muted(element: HTMLMediaElement) {
	return element.muted;
}
export function is_element_paused(element: HTMLMediaElement) {
	return element.paused;
}
export function toggle_element_pause(element: HTMLMediaElement) {
	if (is_element_paused(element)) {
		element.play();
	} else {
		element.pause();
	}
}
export function toggle_element_mute(element: HTMLMediaElement) {
	element.muted = !is_element_muted(element);
}
export function set_element_src(element: HTMLMediaElement) {
	if (is_element_paused(element)) {
		element.play();
	} else {
		element.pause();
	}
}
