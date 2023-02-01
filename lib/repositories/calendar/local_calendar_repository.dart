import 'dart:convert';

import 'package:notion_habit_tracker/data/keys.dart';
import 'package:notion_habit_tracker/models/calendar.dart';
import 'package:notion_habit_tracker/repositories/repositories.dart';
import 'package:rxdart/rxdart.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocalCalendarRepository implements CalendarRepository {
  LocalCalendarRepository({
    required SharedPreferences plugin,
  }) : _plugin = plugin {
    _init();
  }

  final SharedPreferences _plugin;
  final String _key = AppKeys.calendarLocalStorageKey.toString();

  final _streamController = BehaviorSubject<Map<String, Calendar>>.seeded({});

  String? _getValue(String key) => _plugin.getString(key);

  Future<void> _setValue(String key, String value) =>
      _plugin.setString(key, value);

  void _init() {
    final calendarsJson = _getValue(_key);
    if (calendarsJson != null) {
      final calendars = Map<String, dynamic>.from(
        json.decode(calendarsJson),
      ).map((key, value) =>
          MapEntry(key, Calendar.fromJson(Map<String, dynamic>.from(value))));
      _streamController.add(calendars);
    } else {
      _streamController.add({});
    }
  }

  @override
  Stream<Calendar?> getCalendar(String calendarId) {
    return _streamController.map((item) {
      return item[calendarId];
    }).asBroadcastStream();
  }

  @override
  Stream<List<Calendar>> getCalendars() {
    return _streamController
        .map((item) => item.values.toList())
        .asBroadcastStream();
  }

  @override
  Future<void> saveCalendar(Calendar calendar) {
    final calendarMap = Map<String, Calendar>.from(_streamController.value);
    calendarMap[calendar.id] = calendar;
    _streamController.add(calendarMap);
    return _setValue(_key, json.encode(calendarMap));
  }
}
