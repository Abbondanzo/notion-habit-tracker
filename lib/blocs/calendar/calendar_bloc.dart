import 'package:bloc/bloc.dart';
import 'package:notion_habit_tracker/blocs/calendar/calendar.dart';
import 'package:notion_habit_tracker/models/models.dart';
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
    final stream = calendarStream.flatMap((calendar) {
      if (calendar == null) {
        return Stream.value(NoCalendarFound());
      }
      return _entryRepository.getEntries(calendar.entries).map((entries) {
        final List<Entry> nonNullEntries = entries.asMap().entries.map((e) {
          if (e.value != null) return e.value!;
          final key = calendar.entries[e.key];
          return Entry(id: key, habits: calendar.formats);
        }).toList();
        return CalendarLoaded(calendar, nonNullEntries);
      });
    });
    await emit.forEach(
      stream,
      onData: (data) => data,
      onError: (_, __) => CalendarLoadFailed(),
    );
  }
}
