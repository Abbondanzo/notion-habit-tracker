part of 'current_calendar_cubit.dart';

abstract class CurrentCalendarState {
  const CurrentCalendarState();
}

class CurrentCalendarEmpty extends CurrentCalendarState {}

class CurrentCalendarLoading extends CurrentCalendarState {}

class CurrentCalendarFailed extends CurrentCalendarState {}

class CurrentCalendar extends CurrentCalendarState {
  final Calendar calendar;

  const CurrentCalendar(this.calendar);
}
