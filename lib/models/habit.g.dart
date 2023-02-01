// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'habit.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CheckboxHabit _$CheckboxHabitFromJson(Map<String, dynamic> json) =>
    CheckboxHabit(
      json['checked'] as bool,
    )..type = $enumDecode(_$HabitTypeEnumMap, json['type']);

Map<String, dynamic> _$CheckboxHabitToJson(CheckboxHabit instance) =>
    <String, dynamic>{
      'type': _$HabitTypeEnumMap[instance.type]!,
      'checked': instance.checked,
    };

const _$HabitTypeEnumMap = {
  HabitType.number: 'number',
  HabitType.checkbox: 'checkbox',
};

NumberHabit _$NumberHabitFromJson(Map<String, dynamic> json) => NumberHabit(
      json['number'] as int,
    )..type = $enumDecode(_$HabitTypeEnumMap, json['type']);

Map<String, dynamic> _$NumberHabitToJson(NumberHabit instance) =>
    <String, dynamic>{
      'type': _$HabitTypeEnumMap[instance.type]!,
      'number': instance.number,
    };
