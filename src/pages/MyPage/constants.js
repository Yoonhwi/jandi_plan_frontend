import { z } from "zod";

export const changePasswordScheme = z
  .object({
    currentPassword: z
      .string()
      .min(6, {
        message: "6자 이상 입력하세요.",
      })
      .nonempty(),
    newPassword: z
      .string()
      .min(6, {
        message: "6자 이상 입력하세요.",
      })
      .nonempty(),
    newPasswordConfirm: z
      .string()
      .min(6, {
        message: "6자 이상 입력하세요.",
      })
      .nonempty(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "새로운 비밀번호가 일치하지 않습니다.",
    path: ["newPasswordConfirm"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "현재 비밀번호와 새 비밀번호가 같습니다.",
    path: ["newPassword"],
  });

export const destinationItems = [
  {
    name: "오사카",
    imgSrc: "/osaka.jpg",
  },
  {
    name: "도쿄",
    imgSrc: "/tokyo.jpg",
  },
  {
    name: "후쿠오카",
    imgSrc: "/fukuoka.jpg",
  },
  {
    name: "후쿠오카",
    imgSrc: "/fukuoka.jpg",
  },
];

export const dummy = [
  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "/user2.jpg",
      nickname: "민근",
    },

    plan: {
      id: 1,
      title: "오사카 가즈아",
      profile_url: "/fukuoka.jpg",
      like: 10,
      comment: 2,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "오사카",
    },
  },

  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "/user1.png",
      nickname: "민근",
    },
    plan: {
      id: 2,
      title: "도쿄 놀러갑니다",
      profile_url: "/osaka.jpg",
      like: 999,
      comment: 0,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "도쿄",
    },
  },
  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "/user1.png",
      nickname: "민근",
    },
    plan: {
      id: 3,
      title: "도쿄 놀러갑니다",
      profile_url: "/osaka.jpg",
      like: 999,
      comment: 0,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "도쿄",
    },
  },
  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "/user2.jpg",
      nickname: "민근",
    },

    plan: {
      id: 4,
      title: "오사카 가즈아",
      profile_url: "/fukuoka.jpg",
      like: 10,
      comment: 2,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "오사카",
    },
  },

  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "/user1.png",
      nickname: "민근",
    },
    plan: {
      id: 5,
      title: "도쿄 놀러갑니다",
      profile_url: "/osaka.jpg",
      like: 999,
      comment: 0,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "도쿄",
    },
  },
  {
    user: {
      id: 1,
      userId: "ush0105",
      profile_url: "/user1.png",
      nickname: "민근",
    },
    plan: {
      id: 6,
      title: "도쿄 놀러갑니다",
      profile_url: "/osaka.jpg",
      like: 999,
      comment: 0,
      isLike: false,
      create_at: "2021. 10. 10",
      destination: "도쿄",
    },
  },
];

export const userInfo = {
  id: 1,
  name: "전민근",
  email: "email@example.com",
  userId: "ush0105",
  joinDate: "2021.04.04",
  profile_url: "/user2.jpg",
  nickname: "민근",
};
