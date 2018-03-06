import * as NotificationsActions from './notifications'
import * as RoutinesActions from './routines'
import * as TimetableActions from './timetable'
import * as MemberActions from './member'

export const ActionsCreators = Object.assign({},
  NotificationsActions,
  RoutinesActions,
  TimetableActions,
  MemberActions
)