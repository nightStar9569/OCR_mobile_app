import 'package:equatable/equatable.dart';

class Device extends Equatable {
  const Device({
    required this.id,
    required this.assignedTo,
    required this.model,
    required this.status,
    this.lastSync,
    required this.createdAt,
    required this.updatedAt,
  });

  final String id;
  final String assignedTo;
  final String model;
  final DeviceStatus status;
  final DateTime? lastSync;
  final DateTime createdAt;
  final DateTime updatedAt;

  Device copyWith({
    String? id,
    String? assignedTo,
    String? model,
    DeviceStatus? status,
    DateTime? lastSync,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Device(
      id: id ?? this.id,
      assignedTo: assignedTo ?? this.assignedTo,
      model: model ?? this.model,
      status: status ?? this.status,
      lastSync: lastSync ?? this.lastSync,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  List<Object?> get props => [id, assignedTo, model, status, lastSync];
}

enum DeviceStatus { active, inactive, lost, retired }

