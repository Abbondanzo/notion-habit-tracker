import 'package:equatable/equatable.dart';
import 'package:notion_habit_tracker/models/models.dart';

abstract class CalendarState extends Equatable {
  const CalendarState();

  @override
  List<Object?> get props => [];
}

class CalendarLoading extends CalendarState {}

class CalendarLoaded extends CalendarState {
  final Calendar calendar;
  final List<Entry> entries;

  const CalendarLoaded(this.calendar, this.entries);

  @override
  List<Object?> get props => [calendar, entries];
}

class CalendarLoadFailed extends CalendarState {}

class NoCalendarFound extends CalendarState {}
