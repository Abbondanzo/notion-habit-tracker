enum DatabasePropertyType { checkbox, date, title, number }

class DatabaseProperty {
  final String id;
  final DatabasePropertyType type;
  final String name;
  final String emoji;

  DatabaseProperty(this.id, this.type, this.name, this.emoji);
}

class Database {
  final String id;
  final List<DatabaseProperty> properties;

  Database(this.id, this.properties);
}
