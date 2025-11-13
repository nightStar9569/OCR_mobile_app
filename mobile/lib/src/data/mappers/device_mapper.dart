import '../../domain/models/device.dart';

class DeviceMapper {
  static Map<String, Object?> toJson(Device device) {
    return {
      'device_id': device.id,
      'assigned_to': device.assignedTo,
      'model': device.model,
      'status': device.status.name,
      'last_sync': device.lastSync?.toIso8601String(),
      'created_at': device.createdAt.toIso8601String(),
      'updated_at': device.updatedAt.toIso8601String(),
    };
  }

  static Device fromJson(Map<String, Object?> json) {
    DateTime? _parseDate(String? value) =>
        value == null ? null : DateTime.parse(value);

    return Device(
      id: json['device_id']! as String,
      assignedTo: json['assigned_to'] as String? ?? '',
      model: json['model'] as String? ?? '',
      status: DeviceStatus.values.firstWhere(
        (status) => status.name == json['status'],
        orElse: () => DeviceStatus.active,
      ),
      lastSync: _parseDate(json['last_sync'] as String?),
      createdAt: _parseDate(json['created_at'] as String?) ?? DateTime.now(),
      updatedAt: _parseDate(json['updated_at'] as String?) ?? DateTime.now(),
    );
  }
}

