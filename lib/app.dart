import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:notion_habit_tracker/blocs/calendar/calendar.dart';
import 'package:notion_habit_tracker/cubits/cubits.dart';
import 'package:notion_habit_tracker/repositories/repositories.dart';
import 'package:notion_habit_tracker/screens/home_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProviderApp extends StatefulWidget {
  const ProviderApp({super.key});

  @override
  State<StatefulWidget> createState() {
    return _ProviderAppState();
  }
}

class _ProviderAppState extends State<ProviderApp> {
  SharedPreferences? plugin;

  Future<void> loadFromFuture() async {
    final plugin = await SharedPreferences.getInstance();
    setState(() {
      this.plugin = plugin;
    });
  }

  @override
  void initState() {
    super.initState();
    loadFromFuture();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Habit Tracker',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: plugin == null
            ? const Center(child: CircularProgressIndicator())
            : ProvidedApp(plugin!));
  }
}

class ProvidedApp extends StatelessWidget {
  final SharedPreferences plugin;

  const ProvidedApp(this.plugin, {super.key});

  @override
  Widget build(BuildContext context) {
    final calendarRepository = LocalCalendarRepository(plugin: plugin);
    final entryRepository = LocalEntryRepository(plugin: plugin);

    return MultiRepositoryProvider(
        providers: [
          RepositoryProvider.value(value: calendarRepository),
          RepositoryProvider.value(value: entryRepository)
        ],
        child: MultiBlocProvider(
          providers: [
            BlocProvider<CalendarBloc>(
              create: (context) =>
                  CalendarBloc(calendarRepository, entryRepository),
            ),
            BlocProvider.value(value: CurrentCalendarCubit(calendarRepository))
          ],
          child: HomeScreen(),
        ));
  }
}
