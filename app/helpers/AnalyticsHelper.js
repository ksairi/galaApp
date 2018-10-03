import { Analytics, Event, PageHit } from "expo-analytics";

export default class AnalyticsHelper {
	static analytics = new Analytics("UA-16373281-15", { debug: __DEV__ });

	static setPageHit = screenName => {
		if (!__DEV__) {
			AnalyticsHelper.analytics
				.hit(new PageHit(screenName))
				.then(() => console.log(`success pageHit ${screenName}`))
				.catch(e => console.log(e.message));
		}
	};

	static setEvent = actionLabel => {
		if (!__DEV__) {
			AnalyticsHelper.analytics
				.event(new Event("General", "Acciones", actionLabel))
				.then(() => console.log(`success event ${actionLabel}`))
				.catch(e => console.log(e.message));
		}
	};
}
