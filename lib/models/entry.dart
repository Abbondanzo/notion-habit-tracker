import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:meta/meta.dart';

import './habit.dart';
import './uuid.dart';

part 'entry.g.dart';

@immutable
@JsonSerializable()
class Entry extends Equatable {
  final String id;
  final DateTime updated;
  @JsonKey(
    toJson: Habit.habitsToJson,
    fromJson: Habit.habitsFromJson,
  )
  final List<Habit> habits;

  Entry({String id = '', DateTime? updated, List<Habit>? habits})
      : id = id.isEmpty ? Uuid().generateV4() : id,
        updated = updated ?? DateTime.now(),
        habits = habits ?? [];

  @override
  List<Object?> get props => [id, updated, habits];

  static Entry fromJson(Map<String, dynamic> json) => _$EntryFromJson(json);

  Map<String, dynamic> toJson() => _$EntryToJson(this);
}
