import 'package:equatable/equatable.dart';

abstract class CalendarEvent extends Equatable {
  const CalendarEvent();

  @override
  List<Object?> get props => [];
}

class LoadCalendar extends CalendarEvent {
  final String calendarId;

  const LoadCalendar(this.calendarId);

  @override
  List<Object?> get props => [calendarId];
}
