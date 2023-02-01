import 'package:flutter/material.dart';
import 'package:notion_habit_tracker/data/keys.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen() : super(key: AppKeys.dashboardScreen);

  @override
  State<StatefulWidget> createState() {
    return _DashboardScreenState();
  }
}

class _DashboardScreenState extends State<DashboardScreen> {
  final _formKey = GlobalKey<FormState>();
  final _inputController = TextEditingController();

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("title")),
        body: Form(
          key: _formKey,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                TextFormField(
                  key: ArchSampleKeys.taskField,
                  controller: _titleEditingController,
                  decoration: InputDecoration(
                    hintText: localizations.newTodoHint,
                  ),
                  style: textTheme.headline,
                  autofocus: true,
                  validator: (val) {
                    return val.trim().isEmpty
                        ? localizations.emptyTodoError
                        : null;
                  },
                ),
              ],
            ),
          ),
        ));
  }
}
