import 'package:bloc/bloc.dart';
import 'package:notion_habit_tracker/models/models.dart';
import 'package:notion_habit_tracker/repositories/repositories.dart';

part 'current_calendar_state.dart';

class CurrentCalendarCubit extends Cubit<CurrentCalendarState> {
  final CalendarRepository _calendarRepository;

  CurrentCalendarCubit(this._calendarRepository)
      : super(CurrentCalendarLoading()) {
    _init();
  }

  void _init() async {
    try {
      final currentCalendar = await _calendarRepository.getCurrentCalendar();
      if (currentCalendar != null) {
        emit(CurrentCalendar(currentCalendar));
      } else {
        emit(CurrentCalendarEmpty());
      }
    } catch (_) {
      emit(CurrentCalendarFailed());
    }
  }

  void setCalendar(Calendar calendar) {
    _calendarRepository.saveCurrentCalendar(calendar.id);
    emit(CurrentCalendar(calendar));
  }
}
