class PropertyValue {}

class DatePropertyValue extends PropertyValue {
  final DateTime value;

  DatePropertyValue(this.value);
}

class CheckboxPropertyValue extends PropertyValue {
  final bool checked;

  CheckboxPropertyValue(this.checked);
}

class NumberPropertyValue extends PropertyValue {
  final int value;

  NumberPropertyValue(this.value);
}

class Page {
  final String id;
  final String title;
  final DateTime date;
  final DateTime lastModifiedAt;
  final Map<String, PropertyValue> properties;

  Page(this.id, this.title, this.date, this.lastModifiedAt, this.properties);
}
