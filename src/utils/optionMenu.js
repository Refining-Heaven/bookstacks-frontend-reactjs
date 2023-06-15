import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLanguage, faPalette, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FormattedMessage } from "react-intl";

const OPTIONS_MENU = [
  {
    icon: <FontAwesomeIcon icon={faLanguage} />,
    title: <FormattedMessage id="option-menu-item.language" />,
    children: {
      data: [
        {
          type: 'LANGUAGE',
          value: 'en',
          title: <FormattedMessage id="option-menu-item.sub-menu-item.language.english" />,
        },
        {
          type: 'LANGUAGE',
          value: 'vi',
          title: <FormattedMessage id="option-menu-item.sub-menu-item.language.vietnamese" />,
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faPalette} />,
    title: <FormattedMessage id="option-menu-item.theme" />,
    children: {
      data: [
        {
          type: 'THEME',
          value: 'light',
          title: <FormattedMessage id="option-menu-item.sub-menu-item.theme.light" />,
        },
        {
          type: 'THEME',
          value: 'dark',
          title: <FormattedMessage id="option-menu-item.sub-menu-item.theme.dark" />,
        },
      ],
    },
  },
]

const USER_OPTIONS_MENU = [
  {
    type: "ACCOUNT",
    icon: <FontAwesomeIcon icon={faUser} />,
    title: <FormattedMessage id="option-menu-item.account" />,
  },
  ...OPTIONS_MENU,
  {
    type: "LOGOUT",
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    title: <FormattedMessage id="option-menu-item.log-out" />,
  },
]

export {
  OPTIONS_MENU,
  USER_OPTIONS_MENU
}