import 'package:notion_habit_tracker/models/models.dart';

abstract class EntryRepository {
  Stream<List<Entry>> getEntries(String calendarId);
}
