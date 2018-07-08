import createReducer from "./lib/createReducer";
import { ActionsTypes } from "/config/settings";

export const loginImages = createReducer([{ imageIndex: 0 }], {
	[ActionsTypes.SET_LOGIN_IMAGES](state, action) {
		if (action.loginImages.length > 0) {
			return action.loginImages;
		}
		return state;
	}
});
export const mainMenuImages = createReducer(
	[
		{
			imageIndex: 0,
			local: true
		},
		{
			imageIndex: 1,
			local: true
		},
		{ imageIndex: 2, local: true }
	],
	{
		[ActionsTypes.SET_MAIN_MENU_IMAGES](state, action) {
			return action.mainMenuImages;
		}
	}
);
export const promotions = createReducer([], {
	[ActionsTypes.SET_PROMOTIONS](state, action) {
		if (action.promotions.length > 0) {
			const promotionsAlreadyAdded = [];
			const newStateWithReplacedItems = state.map(
				promotion =>
					action.promotions.find(newPromotionData => {
						const findCondition = newPromotionData.id == promotion.id;
						if (findCondition) {
							promotionsAlreadyAdded.push(newPromotionData.id);
						}
						return findCondition;
					}) || promotion
			);

			var newPromotions = action.promotions.filter(promotion => {
				return !promotionsAlreadyAdded.includes(promotion.id);
			});

			return [...newPromotions, ...newStateWithReplacedItems];
		}
		return state;
	},

	[ActionsTypes.REMOVE_PROMOTION_ITEM](state, action) {
		if (action.promotionsToDelete.length > 0) {
			const updatedState = state.filter(promotion => {
				return !action.promotionsToDelete.find(
					promotionToDelete => promotionToDelete.id == promotion.id
				);
			});
			return updatedState;
		}
		return state;
	}
});
export const routinesImages = createReducer([{ imageIndex: 0 }], {
	[ActionsTypes.SET_ROUTINES_IMAGES](state, action) {
		if (action.routinesImages.length > 0) {
			return action.routinesImages;
		}
		return state;
	}
});
export const classesImages = createReducer([], {
	[ActionsTypes.SET_CLASSES_IMAGES](state, action) {
		return action.classesImages;
	}
});
export const timetableImages = createReducer([], {
	[ActionsTypes.SET_TIMETABLE_IMAGES](state, action) {
		return action.timetableImages;
	}
});
export const synchedDataParameters = createReducer(
	{},
	{
		[ActionsTypes.SET_SYNCHED_DATA_PARAMETERS](state, action) {
			//TODO prepare the parameters action, structure:activeData, noActiveData, entity. imagesIndex object
			return action.synchedDataParameters;
		}
	}
);
export const loginSynchedDataParameters = createReducer(
	{ isLoginRequest: true },
	{
		[ActionsTypes.SET_LOGIN_SYNCHED_DATA_PARAMETERS](state, action) {
			const params = action.loginSynchedDataParameters;
			const currentParameters =
				state[params.entity] && state[params.entity].dataIds
					? state[params.entity].dataIds
					: [];
			var entityActiveDataNewState = currentParameters.filter(
				currentDataId => !params.noActiveDataIds.find(id => id == currentDataId)
			);
			entityActiveDataNewState = [
				...entityActiveDataNewState,
				...params.activeDataIds
			];
			const entityNewData = { ...params.data };
			entityNewData.dataIds = [...new Set(entityActiveDataNewState)]; //remove duplicates
			return {
				...state,
				[params.entity]: entityNewData
			};
		}
	}
);
