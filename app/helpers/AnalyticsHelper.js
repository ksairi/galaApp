import {Analytics, Event, PageHit} from "expo-analytics";
import Constants from "expo-constants";

export default class AnalyticsHelper {
  static isProd = () => {
    const {slug} = Constants.manifest;
    return !__DEV__ && slug === "galaApp";
  };

  static analytics = new Analytics("UA-16373281-15", {
    debug: AnalyticsHelper.isProd(),
  });

  static setPageHit = (screenName) => {
    if (AnalyticsHelper.isProd()) {
      AnalyticsHelper.analytics
        .hit(new PageHit(screenName))
        .then(() => {})
        .catch(() => {});
    }
  };

  static setEvent = (actionLabel) => {
    if (AnalyticsHelper.isProd()) {
      AnalyticsHelper.analytics
        .event(new Event("General", "Acciones", actionLabel))
        .then(() => {})
        .catch(() => {});
    }
  };
}
