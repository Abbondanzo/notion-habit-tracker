import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:notion_habit_tracker/cubits/cubits.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: const Text("Habits do be tracked"),
          automaticallyImplyLeading: false),
      body: Center(child:
          BlocBuilder<CurrentCalendarCubit, CurrentCalendarState>(
              builder: (context, state) {
        if (state is CurrentCalendarEmpty) {
          return const Text("No calendar found");
        } else if (state is CurrentCalendarLoading) {
          return const Text("Loading...");
        } else if (state is CurrentCalendarFailed) {
          return const Text("Failed to load current calendar");
        } else {
          return const Text("Woop, a calendar");
        }
      })),
    );
  }
}
