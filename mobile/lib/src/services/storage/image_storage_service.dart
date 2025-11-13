import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ImageStorageService {
  ImageStorageService() : _client = Dio();

  final Dio _client;
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  Future<void> uploadWithPresignedUrl({
    required Uri uploadUrl,
    required File file,
    required String contentType,
  }) async {
    final response = await _client.putUri(
      uploadUrl,
      data: file.openRead(),
      options: Options(headers: {'Content-Type': contentType}),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to upload image');
    }
  }

  Future<void> cachePresignedUrl(String url, Duration ttl) async {
    await _secureStorage.write(
      key: 'presigned_url',
      value: url,
      aOptions: const AndroidOptions(encryptedSharedPreferences: true),
      iOptions: const IOSOptions(accessibility: KeychainAccessibility.first_unlock),
    );
  }
}

