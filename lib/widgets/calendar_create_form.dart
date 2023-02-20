import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:notion_habit_tracker/models/models.dart';

class CalendarCreateForm extends StatefulWidget {
  const CalendarCreateForm({super.key});

  @override
  State<StatefulWidget> createState() {
    return _CalendarCreateFormState();
  }
}

class _CalendarCreateFormState extends State<CalendarCreateForm> {
  final _formKey = GlobalKey<FormState>();

  final _startDateInputController = TextEditingController();
  late Date _startDate;
  final _numberDaysInputController = TextEditingController(text: "75");

  @override
  void initState() {
    super.initState();
    final today = DateTime.now();
    _startDate = Date(today.year, today.month, today.day);
    _startDateInputController.text = _startDate.toLocaleString();
  }

  @override
  void dispose() {
    _startDateInputController.dispose();
    _numberDaysInputController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
        width: 400,
        // color: Colors.,
        child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Text("Start Date",
                          style: Theme.of(context).textTheme.labelLarge),
                    ),
                    TextFormField(
                      // style: Inp,
                      controller: _startDateInputController,
                      readOnly: true,
                      onTap: () => _selectDate(context),
                      decoration: const InputDecoration(
                        hintText:
                            "Set a date that your calendar tracker starts at",
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 4, horizontal: 8),
                      child: Text("Day 1 of your habit tracking starts here",
                          style: Theme.of(context).textTheme.caption),
                    )
                  ],
                ),
                const SizedBox(
                  height: 20.0,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Text("Number of days",
                          style: Theme.of(context).textTheme.labelLarge),
                    ),
                    TextFormField(
                      // style: Inp,
                      controller: _numberDaysInputController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        counterText: "",
                        hintText:
                            "Choose how many days your tracker calendar runs before",
                      ),
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      maxLength: 5,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 4, horizontal: 8),
                      child: Text(
                          "After this many days, a report is generated and a new calendar begins",
                          style: Theme.of(context).textTheme.caption),
                    )
                  ],
                ),
                ElevatedButton(
                    onPressed: () => _submit(), child: const Text("Save"))
              ],
            )));
  }

  Future<void> _selectDate(BuildContext context) async {
    final currentDateTime = _startDate.toDateTime();
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: currentDateTime,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != currentDateTime) {
      setState(() {
        _startDate = Date.fromDateTime(picked);
        _startDateInputController.text = _startDate.toLocaleString();
      });
    }
  }

  void _submit() {
    final form = _formKey.currentState;
    if (form != null && form.validate()) {
      form.save();
      print(_startDate);
      print(int.parse(_numberDaysInputController.text));
    }
  }
}
