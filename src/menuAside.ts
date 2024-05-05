import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
  mdiLogin,
  mdiAccountPlusOutline,
  mdiFolderAccountOutline,
  mdiBookshelf 
} from "@mdi/js";

export default [

  {
    to: "/book-list",
    label: "BookList",
    icon: mdiBookshelf,
  },
  {
    label: "User",
    icon: mdiFolderAccountOutline,
    menu: [
      {
        to: "/sign-in",
        label: "SignIn",
        icon: mdiLock,
      },
      {
        to: "/sign-up",
        label: "SignUp",
        icon: mdiAccountPlusOutline,
      },
    ],
  },
  // {
  //   to: "/tables",
  //   label: "Tables",
  //   icon: mdiTable,
  // },
  // {
  //   to: "/forms",
  //   label: "Forms",
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   to: "/ui",
  //   label: "UI",
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   to: "/responsive",
  //   label: "Responsive",
  //   icon: mdiResponsive,
  // },
  // {
  //   to: "/",
  //   label: "Styles",
  //   icon: mdiPalette,
  // },
  {
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
  },

  // {
  //   to: "/error",
  //   label: "Error",
  //   icon: mdiAlertCircle,
  // },
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Achievement",
  },
  {
    href: "https://github.com/Daniel-Ruan",
    label: "GitHub",
    icon: mdiGithub,
    target: "_blank",
  },
  // {
  //   href: "https://github.com/justboil/admin-one-react-tailwind",
  //   label: "React version",
  //   icon: mdiReact,
  //   target: "_blank",
  // },
];
