import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';

import './date.dart';
import './habit.dart';

part 'calendar.g.dart';

@immutable
@JsonSerializable()
class Calendar extends Equatable {
  final String id;
  @DateJsonConverter()
  final Date startAt;
  final int numDays;
  @JsonKey(
    toJson: Habit.habitsToJson,
    fromJson: Habit.habitsFromJson,
  )
  final List<Habit> formats;
  final List<String> entries;

  const Calendar(
      this.id, this.startAt, this.numDays, this.formats, this.entries);

  @override
  List<Object?> get props => [id, formats];

  /// Deserializes the given JSON into a [Calendar].
  static Calendar fromJson(Map<String, dynamic> json) =>
      _$CalendarFromJson(json);

  /// Converts this [Calendar] into a JSON map.
  Map<String, dynamic> toJson() => _$CalendarToJson(this);
}
