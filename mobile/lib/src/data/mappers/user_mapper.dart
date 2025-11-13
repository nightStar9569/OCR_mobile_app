import 'package:intl/intl.dart';

import '../../domain/models/user.dart';

class UserMapper {
  static final _formatter = DateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  static Map<String, Object?> toJson(User user) {
    return {
      'user_id': user.id,
      'full_name': user.fullName,
      'email': user.email,
      'role': user.role.name,
      'status': user.status.name,
      'last_login': user.lastLogin == null ? null : _formatter.format(user.lastLogin!.toUtc()),
      'created_at': _formatter.format(user.createdAt.toUtc()),
      'updated_at': _formatter.format(user.updatedAt.toUtc()),
      'id_token': user.idToken,
    };
  }

  static User fromJson(Map<String, Object?> json) {
    DateTime? _parseDate(String? value) {
      if (value == null) return null;
      return DateTime.parse(value).toLocal();
    }

    return User(
      id: json['user_id']! as String,
      fullName: json['full_name'] as String? ?? '',
      email: json['email'] as String? ?? '',
      role: UserRole.values.firstWhere(
        (role) => role.name == json['role'],
        orElse: () => UserRole.reader,
      ),
      status: UserStatus.values.firstWhere(
        (status) => status.name == json['status'],
        orElse: () => UserStatus.active,
      ),
      lastLogin: _parseDate(json['last_login'] as String?),
      createdAt: _parseDate(json['created_at'] as String?) ?? DateTime.now(),
      updatedAt: _parseDate(json['updated_at'] as String?) ?? DateTime.now(),
      idToken: json['id_token'] as String?,
    );
  }
}

