import {ActionsTypes} from "config/settings";
import createReducer from "./lib/createReducer";

export const loginImages = createReducer([{imageIndex: 0}], {
  [ActionsTypes.SET_LOGIN_IMAGES](state, action) {
    if (action.loginImages.length > 0) {
      return action.loginImages;
    }
    return state;
  },
});
export const mainMenuImages = createReducer(
  [
    {
      imageIndex: 0,
      local: true,
    },
    {
      imageIndex: 1,
      local: true,
    },
    {imageIndex: 2, local: true},
  ],
  {
    [ActionsTypes.SET_MAIN_MENU_IMAGES](state, action) {
      if (action.mainMenuImages) {
        return [...state, ...action.mainMenuImages];
      }
      return state;
    },
    [ActionsTypes.REMOVE_MAIN_MENU_IMAGES](state, action) {
      if (action.mainMenuImageIndexesToRemove) {
        return state.filter(
          (image) =>
            !action.mainMenuImageIndexesToRemove.includes(image.imageIndex)
        );
      }
      return state;
    },
  }
);
export const promotions = createReducer([], {
  [ActionsTypes.SET_PROMOTIONS](state, action) {
    if (!action.promotions) {
      return [];
    }
    if (action.promotions.length > 0) {
      const promotionsAlreadyAdded = [];
      const newStateWithReplacedItems = state.map(
        (promotion) =>
          action.promotions.find((newPromotionData) => {
            const findCondition = newPromotionData.id === promotion.id;
            if (findCondition) {
              promotionsAlreadyAdded.push(newPromotionData.id);
            }
            return findCondition;
          }) || promotion
      );

      const newPromotions = action.promotions.filter(
        (promotion) => !promotionsAlreadyAdded.includes(promotion.id)
      );

      return [...newPromotions, ...newStateWithReplacedItems];
    }
    return state;
  },

  [ActionsTypes.REMOVE_PROMOTION_ITEM](state, action) {
    if (action.promotionsIdsToDelete.length > 0) {
      const updatedState = state.filter((promotion) => {
        return !action.promotionsIdsToDelete.find(
          (promotionIdToDelete) => promotionIdToDelete === promotion.id
        );
      });
      return updatedState;
    }
    return state;
  },
});
export const classesImages = createReducer([], {
  [ActionsTypes.SET_CLASSES_IMAGES](state, action) {
    return action.classesImages;
  },
});
export const timetableImages = createReducer([], {
  [ActionsTypes.SET_TIMETABLE_IMAGES](state, action) {
    return action.timetableImages;
  },
});
export const synchedDataParameters = createReducer(
  {},
  {
    [ActionsTypes.SET_SYNCHED_DATA_PARAMETERS](state, action) {
      // TODO prepare the parameters action, structure:activeData, noActiveData, entity. imagesIndex object
      return action.synchedDataParameters;
    },
  }
);
const loginSynchedDataParametersInitialState = {
  isLoginRequest: true,
  mainMenuImages: {imagesIndex: [0, 1, 2]},
};
export const loginSynchedDataParameters = createReducer(
  loginSynchedDataParametersInitialState,
  {
    [ActionsTypes.SET_LOGIN_SYNCHED_DATA_PARAMETERS](state, action) {
      const params = action.loginSynchedDataParameters;
      if (!params) {
        return loginSynchedDataParametersInitialState;
      }
      let entityNewData = {...params.data};
      if (entityNewData && entityNewData.updatedIndexes) {
        let entityIndexes = [...state[params.entity].imagesIndex];
        entityNewData.updatedIndexes.indexesToAdd.forEach((index) => {
          entityIndexes.push(index);
        });
        entityNewData.updatedIndexes.indexesToRemove.forEach(
          (indexToRemove) => {
            entityIndexes = entityIndexes.filter(
              (index) => index !== indexToRemove
            );
          }
        );
        entityNewData = entityIndexes;
        return {
          ...state,
          [params.entity]: {
            ...state[params.entity],
            imagesIndex: entityNewData,
          },
        };
      }
      return {
        ...state,
        [params.entity]: entityNewData,
      };
    },
  }
);
