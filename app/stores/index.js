import NotificationsStore from './NotificationsStore'
import RoutinesStore from './RoutinesStore'
import TimetableStore from './TimetableStore'

export default {
  notificationsStore: new RoutinesStore(),
  routinesStore: new RoutinesStore(),
  timetableStore: new TimetableStore()
};