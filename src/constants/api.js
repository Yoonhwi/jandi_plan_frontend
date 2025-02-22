export const PageEndPoints = {
  HOME: "/",
  TEST: "/test",
  AUTH: "/auth/*",
  LOGIN: "/auth/login",
  JOIN: "/auth/join",

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

  MYPAGE: "/mypage",

  DESTINATION_DETAIL: "/destination/:id",
  DESTINATION_LIST: "/destination/list",
};

export const APIEndPoints = {
  LOGIN: "/users/login",
  REFRESH: "/users/token/refresh",
  USER: "/users",
  NOTICEALL: "/notice/lists",
  BANNER: "/banner/lists",

  BOARD:"/community/posts",
  COMMUNITY_COMMENTS: "/community/comments/:id",
  COMMENTS_REPLIES: "/community/replies/:id",
  USER_RESISTER: "/users/register",
  USER_VERIFY: "/users/verify",
};
