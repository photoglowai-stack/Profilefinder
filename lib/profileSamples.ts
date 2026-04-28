export type DatingGender = "man" | "woman";

export const datingSamplePhotos: Record<DatingGender, string[]> = {
  man: [
    "/assets/profiles/user-samples/dating-man-sample-01.jpg",
    "/assets/profiles/user-samples/dating-man-sample-02.jpg",
    "/assets/profiles/user-samples/dating-man-sample-03.jpg",
    "/assets/profiles/user-samples/dating-man-sample-04.jpg",
    "/assets/profiles/user-samples/dating-man-sample-05.jpg",
    "/assets/profiles/dating-man-06.webp",
  ],
  woman: [
    "/assets/profiles/user-samples/dating-woman-sample-01.jpg",
    "/assets/profiles/user-samples/dating-woman-sample-02.jpg",
    "/assets/profiles/user-samples/dating-woman-sample-03.jpg",
    "/assets/profiles/dating-woman-04.webp",
    "/assets/profiles/dating-woman-05.webp",
    "/assets/profiles/dating-woman-06.webp",
  ],
};

export const trustedUserPhotos = [
  "/assets/profiles/user-samples/dating-woman-sample-02.jpg",
  "/assets/profiles/user-samples/dating-man-sample-02.jpg",
  "/assets/profiles/user-samples/dating-woman-sample-03.jpg",
  "/assets/profiles/user-samples/dating-man-sample-04.jpg",
];

export const followingPreviewPhotos = [
  "/assets/profiles/user-samples/dating-man-sample-03.jpg",
  "/assets/profiles/user-samples/dating-woman-sample-01.jpg",
  "/assets/profiles/user-samples/dating-man-sample-05.jpg",
];

export const faceTraceSamplePhotos = [
  "/assets/profiles/facetrace-match-01.webp",
  "/assets/profiles/user-samples/dating-woman-sample-03.jpg",
  "/assets/profiles/facetrace-match-03.webp",
  "/assets/profiles/user-samples/dating-man-sample-04.jpg",
  "/assets/profiles/facetrace-match-05.webp",
  "/assets/profiles/user-samples/dating-woman-sample-01.jpg",
];

export function normalizeDatingGender(value: string | null): DatingGender {
  return value === "man" ? "man" : "woman";
}
