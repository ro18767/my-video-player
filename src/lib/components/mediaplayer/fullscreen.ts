export function is_fullscreen(root_element: HTMLElement) {
	return !!document.fullscreenElement;
}

export function is_element_fullscreen(root_element: HTMLElement) {
	return document.fullscreenElement === root_element;
}
export function toggle_fullscreen(root_element: HTMLElement) {
	if (is_element_fullscreen(root_element)) {
		exit_fullscreen();
	} else {
		request_fullscreen(root_element);
	}
}
export function request_fullscreen(root_element: HTMLElement) {
	if (!is_element_fullscreen(root_element)) {
		root_element.requestFullscreen();
	}
}
export function exit_fullscreen(root_element?: HTMLElement) {
	if(root_element == null) {
		document.exitFullscreen();
		return;
	}
	if(is_element_fullscreen(root_element)) {
		document.exitFullscreen();
	}
	
}
