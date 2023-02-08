import 'dart:convert';

import 'package:notion_habit_tracker/data/keys.dart';
import 'package:notion_habit_tracker/models/models.dart';

import 'package:rxdart/rxdart.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'entry_repository.dart';

class LocalEntryRepository implements EntryRepository {
  LocalEntryRepository({
    required SharedPreferences plugin,
  }) : _plugin = plugin {
    _init();
  }

  final SharedPreferences _plugin;
  final String _key = AppKeys.entryLocalStorageKey.toString();

  final _streamController = BehaviorSubject<Map<String, Entry>>.seeded({});

  String? _getValue(String key) => _plugin.getString(key);

  Future<void> _setValue(String key, String value) =>
      _plugin.setString(key, value);

  void _init() {
    final entriesJson = _getValue(_key);
    if (entriesJson != null) {
      final entries = Map<String, dynamic>.from(
        json.decode(entriesJson),
      ).map((key, value) =>
          MapEntry(key, Entry.fromJson(Map<String, dynamic>.from(value))));
      _streamController.add(entries);
    } else {
      _streamController.add({});
    }
  }

  @override
  Stream<List<Entry?>> getEntries(List<String> ids) {
    // No data loss, just feed an empty entry. It'll get saved
    return _streamController.map((map) {
      return ids.map((key) => map[key]).toList();
    }).asBroadcastStream();
  }

  @override
  Future<void> saveEntry(Entry entry) {
    final entryMap = Map<String, Entry>.from(_streamController.value);
    entryMap[entry.id] = entry;
    _streamController.add(entryMap);
    return _setValue(_key, json.encode(entryMap));
  }
}
