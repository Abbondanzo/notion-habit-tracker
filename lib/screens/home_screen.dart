import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:notion_habit_tracker/blocs/blocs.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: const Text("Habits do be tracked"),
          automaticallyImplyLeading: false),
      body: Center(child:
          BlocBuilder<CalendarBloc, CalendarState>(builder: (context, state) {
        if (state is NoCalendarFound) {
          return const Text("No calendar found");
        } else {
          return const Text("Woop, a calendar");
        }
      })),
    );
  }
}
