export const PageEndPoints = {
  HOME: "/",
  TEST: "/test",
  AUTH: "/auth/*",
  LOGIN: "/auth/login",
  JOIN: "/auth/join",
  FINDPW: "/auth/findPW",

  PLAN_DETAIL: "/plan/:id",
  PLAN_LIST: "/plan/list",
  PLAN_CREATE: "/plan/create",

  PREFERENCE: "/preference/*",
  PREF_CONT: "/preference/continent",
  PREF_DEST: "/preference/destination",

  SEARCH: "/search/*",
  NOTICE: "/notice",

  BOARD: "/board",
  BOARD_DETAIL: "/board/:id",
  BOARD_WRITE: "/board/write",
  BOARD_MODIFY: "/board/modify/:id",

  MYPAGE: "/mypage",

  DESTINATION_DETAIL: "/destination/:id",
  DESTINATION_LIST: "/destination/list",
};

export const APIEndPoints = {
  LOGIN: "/users/login",
  FINDPW: "users/forgot",
  PROFILE: "/users/profile",
  REFRESH: "/users/token/refresh",
  USER: "/users",
  PROFILE_UPLOAD: "images/upload/profile",

  PREFER_DEST: "/trip/cities/prefer",

  RESISTER: "/users/register",
  USER_CHANGE_PASSWORD: "/users/change-password",
  USER_VERIFY: "/users/verify",
  USER_CHECK_EMAIL: "/users/register/checkEmail",
  USER_CHECK_NICKNAME: "/users/register/checkName",

  NOTICEALL: "/notice/lists",
  BANNER: "/banner/lists",

  BOARD: "/community/posts",
  BOARD_DETAIL: "/community/posts/:id",
  BOARD_LIKE: "community/posts/likes/:id",
  COMMUNITY_COMMENTS: "/community/comments/:id",
  COMMENTS_LIKE: "/community/comments/likes/:id",
  COMMENTS_REPLIES: "/community/replies/:id",
  BOARD_REPORTS: "/community/posts/reports/:id",
  COMMENTS_REPORTS: "/community/comments/reports/:id",

  PLACE: "/place",

  TRIP_MY: "/trip/my/allTrips",
  TRIP_LIKED: "/trip/my/likedTrips",
  TRIP_SET_LIKED: "/trip/my/likedTrips/:id",
  TRIP_CREATE: "/trip/my/create",
  TRIP_ALL: "/trip/allTrips",
  TRIP_DETAIL: "/trip/:id",
  TRIP_ITINERARY: "/trip/itinerary/:id",
  TRIP_RESERVATION: "/trip/reservation/:id",

  DESTINATION: "/trip/cities",
  CONTINENT: "/trip/continents",
  COUNTRY: "/trip/countries",

  PLAN_BEST: "/trip/top-likes",
  DESTINATION_BEST: "/trip/rank",

  IMAGE_UPLOAD_COMMUNITY: "/images/upload/community",
  IMAGE_UPLOAD: "/images/profiles/upload",

  TEMP: "/temp",
};
