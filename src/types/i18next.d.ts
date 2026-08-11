import "i18next";
import authEn from "../i18n/locales/en/auth.json";
import commonEn from "../i18n/locales/en/common.json";
import profileEn from "../i18n/locales/en/profile.json";
import add_postEn from "../i18n/locales/en/add_post.json";
import add_todoEn from "../i18n/locales/en/add_todo.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      auth: typeof authEn;
      common: typeof commonEn;
      profile: typeof profileEn;
      add_post: typeof add_postEn;
      add_todo: typeof add_todoEn;
    };
  }
}
