export function toggle_picture_in_picture(element: HTMLVideoElement) {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
	} else if (document.pictureInPictureEnabled) {
		element.requestPictureInPicture();
	}
}