import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';

import './habit.dart';

part 'habit_template.g.dart';

@immutable
@JsonSerializable()
class HabitTemplate extends Equatable {
  final String name;
  final HabitType type;

  const HabitTemplate(this.name, this.type);

  Habit createHabit() {
    switch (type) {
      case HabitType.number:
        return NumberHabit(0);
      case HabitType.checkbox:
        return CheckboxHabit(false);
    }
  }

  @override
  List<Object?> get props => [name, type];

  /// Deserializes the given JSON into a [HabitTemplate].
  static HabitTemplate fromJson(Map<String, dynamic> json) =>
      _$HabitTemplateFromJson(json);

  /// Converts this [HabitTemplate] into a JSON map.
  Map<String, dynamic> toJson() => _$HabitTemplateToJson(this);
}
