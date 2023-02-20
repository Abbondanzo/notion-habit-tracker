import 'package:flutter/material.dart';

class _Constants {
  static const double borderRadius = 5.0;

  static const Color gray = Color.fromRGBO(229, 229, 237, 1);
}

final theme = ThemeData(
    primarySwatch: Colors.blue,
    inputDecorationTheme: const InputDecorationTheme(
        border: OutlineInputBorder(
          borderSide: BorderSide(
              color: _Constants.gray, width: _Constants.borderRadius),
        ),
        filled: true,
        fillColor: Colors.white,
        floatingLabelBehavior: FloatingLabelBehavior.always,
        helperStyle: TextStyle(fontSize: 12)),
    buttonTheme: const ButtonThemeData(
      minWidth: 200,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
        style: ButtonStyle(
            minimumSize: MaterialStateProperty.all(const Size.fromHeight(50)),
            shape: MaterialStateProperty.all<OutlinedBorder>(
                RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(_Constants.borderRadius))))));
