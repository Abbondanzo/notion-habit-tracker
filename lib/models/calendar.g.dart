// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'calendar.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Calendar _$CalendarFromJson(Map<String, dynamic> json) => Calendar(
      json['id'] as String,
      DateTime.parse(json['startAt'] as String),
      json['numDays'] as int,
      Habit.habitsFromJson(json['formats'] as List<Map<String, dynamic>>),
      (json['entries'] as List<dynamic>).map((e) => e as String).toList(),
    );

Map<String, dynamic> _$CalendarToJson(Calendar instance) => <String, dynamic>{
      'id': instance.id,
      'startAt': instance.startAt.toIso8601String(),
      'numDays': instance.numDays,
      'formats': Habit.habitsToJson(instance.formats),
      'entries': instance.entries,
    };
