// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'entry.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Entry _$EntryFromJson(Map<String, dynamic> json) => Entry(
      id: json['id'] as String? ?? '',
      updated: json['updated'] == null
          ? null
          : DateTime.parse(json['updated'] as String),
      habits:
          Habit.habitsFromJson(json['habits'] as List<Map<String, dynamic>>),
    );

Map<String, dynamic> _$EntryToJson(Entry instance) => <String, dynamic>{
      'id': instance.id,
      'updated': instance.updated.toIso8601String(),
      'habits': Habit.habitsToJson(instance.habits),
    };
