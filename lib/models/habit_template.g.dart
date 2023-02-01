// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'habit_template.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HabitTemplate _$HabitTemplateFromJson(Map<String, dynamic> json) =>
    HabitTemplate(
      json['name'] as String,
      $enumDecode(_$HabitTypeEnumMap, json['type']),
    );

Map<String, dynamic> _$HabitTemplateToJson(HabitTemplate instance) =>
    <String, dynamic>{
      'name': instance.name,
      'type': _$HabitTypeEnumMap[instance.type]!,
    };

const _$HabitTypeEnumMap = {
  HabitType.number: 'number',
  HabitType.checkbox: 'checkbox',
};
