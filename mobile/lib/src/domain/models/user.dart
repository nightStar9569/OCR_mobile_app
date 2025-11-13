import 'package:equatable/equatable.dart';

class User extends Equatable {
  const User({
    required this.id,
    required this.fullName,
    required this.email,
    required this.role,
    required this.status,
    this.lastLogin,
    required this.createdAt,
    required this.updatedAt,
    this.idToken,
  });

  final String id;
  final String fullName;
  final String email;
  final UserRole role;
  final UserStatus status;
  final DateTime? lastLogin;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? idToken;

  User copyWith({
    String? id,
    String? fullName,
    String? email,
    UserRole? role,
    UserStatus? status,
    DateTime? lastLogin,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? idToken,
  }) {
    return User(
      id: id ?? this.id,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      role: role ?? this.role,
      status: status ?? this.status,
      lastLogin: lastLogin ?? this.lastLogin,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      idToken: idToken ?? this.idToken,
    );
  }

  @override
  List<Object?> get props =>
      [id, fullName, email, role, status, lastLogin, createdAt, updatedAt];
}

enum UserRole { reader, supervisor, admin }

enum UserStatus { active, inactive, suspended }

