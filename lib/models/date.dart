import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

@immutable
class Date extends Equatable {
  final int year;
  final int month;
  final int day;

  const Date(this.year, this.month, this.day);

  @override
  List<Object?> get props => [year, month, day];

  static Date fromDateTime(DateTime dateTime) {
    return Date(dateTime.year, dateTime.month, dateTime.day);
  }

  DateTime toDateTime() {
    return DateTime(year, month, day);
  }

  String toLocaleString() {
    return "$year-$month-$day";
  }
}

class DateJsonConverter extends JsonConverter<Date, String> {
  const DateJsonConverter();

  @override
  Date fromJson(String json) {
    final strings = json.split("");
    assert(strings.length == 3);
    final numbers = strings.map((e) => int.parse(e)).toList();
    return Date(numbers[0], numbers[1], numbers[2]);
  }

  @override
  String toJson(Date object) {
    return "${object.year}-${object.month}-${object.day}";
  }
}
