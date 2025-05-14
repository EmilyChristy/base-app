export const paths = {
  home: {
    getHref: () => "/",
  },

  //   auth: {
  //     register: {
  //       getHref: (redirectTo?: string | null | undefined) =>
  //         `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
  //     },
  //     login: {
  //       getHref: (redirectTo?: string | null | undefined) =>
  //         `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
  //     },
  //   },

  app: {
    root: {
      getHref: () => "/",
    },
    dashboard: {
      getHref: () => "/dashboard",
    },
    list: {
      getHref: () => "/list",
    },
    grid: {
      getHref: () => "/grid",
    },
    discussions: {
      getHref: () => "/app/discussions",
    },
    discussion: {
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    users: {
      getHref: () => "/app/users",
    },
    profile: {
      getHref: () => "/app/profile",
    },
  },
  public: {
    discussion: {
      getHref: (id: string) => `/public/discussions/${id}`,
    },
  },
} as const;
