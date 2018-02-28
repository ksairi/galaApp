import * as NotificationsActions from './notifications'
import * as RoutinesActions from './routines'
import * as TimetableActions from './timetable'

export const ActionsCreators = Object.assign({},
  NotificationsActions,
  RoutinesActions,
  TimetableActions
)