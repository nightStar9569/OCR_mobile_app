import 'package:flutter/material.dart';

import '../core/di/service_locator.dart';
import '../domain/models/user.dart';
import '../services/auth/auth_service.dart';
import 'features/home/home_page.dart';
import 'features/sign_in/sign_in_page.dart';

class MeterReadingApp extends StatefulWidget {
  const MeterReadingApp({super.key});

  @override
  State<MeterReadingApp> createState() => _MeterReadingAppState();
}

class _MeterReadingAppState extends State<MeterReadingApp> {
  late Future<User?> _userFuture;

  @override
  void initState() {
    super.initState();
    _userFuture = ServiceLocator.resolve<AuthService>().currentUser();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OCR Meter Reader',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: FutureBuilder<User?>(
        future: _userFuture,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const SignInPage();
          }
          final user = snapshot.data;
          if (user == null) {
            return const SignInPage();
          }
          return HomePage(user: user);
        },
      ),
    );
  }
}

