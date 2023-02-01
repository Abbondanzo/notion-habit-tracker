import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';

import './habit_template.dart';

part 'calendar.g.dart';

@immutable
@JsonSerializable()
class Calendar extends Equatable {
  final String id;
  final List<HabitTemplate> formats;

  const Calendar(this.id, this.formats);

  @override
  List<Object?> get props => [id, formats];

  /// Deserializes the given JSON into a [Calendar].
  static Calendar fromJson(Map<String, dynamic> json) =>
      _$CalendarFromJson(json);

  /// Converts this [Calendar] into a JSON map.
  Map<String, dynamic> toJson() => _$CalendarToJson(this);
}
