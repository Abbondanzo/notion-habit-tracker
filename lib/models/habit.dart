import 'package:json_annotation/json_annotation.dart';

part 'habit.g.dart';

enum HabitType { number, checkbox }

abstract class Habit {
  late HabitType type;

  Map<String, dynamic> toJson();

  static Habit fromJson(Map<String, dynamic> json) {
    final type = $enumDecode(_$HabitTypeEnumMap, json["type"]);
    switch (type) {
      case HabitType.checkbox:
        return CheckboxHabit.fromJson(json);
      case HabitType.number:
        return NumberHabit.fromJson(json);
    }
  }
}

@JsonSerializable(createToJson: true)
class CheckboxHabit extends Habit {
  final bool checked;

  CheckboxHabit(this.checked) {
    type = HabitType.checkbox;
  }

  /// Deserializes the given JSON into a [CheckboxHabit].
  static CheckboxHabit fromJson(Map<String, dynamic> json) =>
      _$CheckboxHabitFromJson(json);

  /// Converts this [CheckboxHabit] into a JSON map.
  @override
  Map<String, dynamic> toJson() => _$CheckboxHabitToJson(this);
}

@JsonSerializable(createToJson: true)
class NumberHabit extends Habit {
  final int number;

  NumberHabit(this.number) {
    type = HabitType.number;
  }

  @override
  List<Object?> get props => [number];

  /// Deserializes the given JSON into a [NumberHabit].
  static NumberHabit fromJson(Map<String, dynamic> json) =>
      _$NumberHabitFromJson(json);

  /// Converts this [NumberHabit] into a JSON map.
  @override
  Map<String, dynamic> toJson() => _$NumberHabitToJson(this);
}
