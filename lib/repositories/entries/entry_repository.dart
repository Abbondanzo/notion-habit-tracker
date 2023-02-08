import 'package:notion_habit_tracker/models/models.dart';

abstract class EntryRepository {
  Stream<List<Entry?>> getEntries(List<String> ids);

  Future<void> saveEntry(Entry entry);
}
