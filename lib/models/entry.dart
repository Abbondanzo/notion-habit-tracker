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
  final DateTime day;
  final DateTime updated;
  @JsonKey(
    toJson: _habitsToJson,
    fromJson: _habitsFromJson,
  )
  final List<Habit> habits;

  Entry(this.day, {String id = '', DateTime? updated, List<Habit>? habits})
      : id = id.isEmpty ? Uuid().generateV4() : id,
        updated = updated ?? DateTime.now(),
        habits = habits ?? [];

  @override
  List<Object?> get props => [id, day, updated, habits];

  static Entry fromJson(Map<String, dynamic> json) => _$EntryFromJson(json);

  Map<String, dynamic> toJson() => _$EntryToJson(this);

  static List<Map<String, dynamic>> _habitsToJson(List<Habit> value) {
    return value.map((habit) => habit.toJson()).toList();
  }

  static List<Habit> _habitsFromJson(List<Map<String, dynamic>> value) {
    return value.map((json) => Habit.fromJson(json)).toList();
  }
}
