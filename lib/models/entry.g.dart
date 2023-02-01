// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'entry.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Entry _$EntryFromJson(Map<String, dynamic> json) => Entry(
      DateTime.parse(json['day'] as String),
      id: json['id'] as String? ?? '',
      updated: json['updated'] == null
          ? null
          : DateTime.parse(json['updated'] as String),
      habits:
          Entry._habitsFromJson(json['habits'] as List<Map<String, dynamic>>),
    );

Map<String, dynamic> _$EntryToJson(Entry instance) => <String, dynamic>{
      'id': instance.id,
      'day': instance.day.toIso8601String(),
      'updated': instance.updated.toIso8601String(),
      'habits': Entry._habitsToJson(instance.habits),
    };
