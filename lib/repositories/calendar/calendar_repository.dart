import 'package:notion_habit_tracker/models/models.dart';

abstract class CalendarRepository {
  Stream<List<Calendar>> getCalendars();

  Stream<Calendar?> getCalendar(String calendarId);

  Future<void> saveCalendar(Calendar calendar);
}
