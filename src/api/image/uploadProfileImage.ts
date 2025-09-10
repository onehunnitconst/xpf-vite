import { requestPostWithAuthorization } from "../axios";

export function uploadProfileImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  return requestPostWithAuthorization("/images/profiles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function uploadHeaderImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  return requestPostWithAuthorization("/images/profiles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function uploadItemImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  return requestPostWithAuthorization("/images/items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
