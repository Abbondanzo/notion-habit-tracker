import 'package:bloc/bloc.dart';
import 'package:notion_habit_tracker/blocs/calendar/calendar.dart';
import 'package:notion_habit_tracker/repositories/repositories.dart';
import 'package:rxdart/rxdart.dart';

class CalendarBloc extends Bloc<CalendarEvent, CalendarState> {
  final CalendarRepository _calendarRepository;
  final EntryRepository _entryRepository;

  CalendarBloc(this._calendarRepository, this._entryRepository)
      : super(CalendarLoading()) {
    on<LoadCalendar>(_onLoadCalendar);
  }

  Future<void> _onLoadCalendar(
      LoadCalendar event, Emitter<CalendarState> emit) async {
    final calendarStream = _calendarRepository.getCalendar(event.calendarId);
    final entryStream = _entryRepository.getEntries(event.calendarId);
    final stream =
        CombineLatestStream.combine2(calendarStream, entryStream, (a, b) {
      if (a == null) {
        return NoCalendarFound();
      }
      return CalendarLoaded(a, b);
    });
    await emit.forEach(
      stream,
      onData: (data) => data,
      onError: (_, __) => CalendarLoadFailed(),
    );
  }
}
