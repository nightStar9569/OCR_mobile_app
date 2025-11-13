import 'package:firebase_auth/firebase_auth.dart' as firebase;

import '../../core/logging/logger.dart';
import '../../domain/models/user.dart';

class AuthService {
  AuthService();

  final firebase.FirebaseAuth _auth = firebase.FirebaseAuth.instance;

  Future<User?> currentUser() async {
    final firebaseUser = _auth.currentUser;
    if (firebaseUser == null) return null;

    return User(
      id: firebaseUser.uid,
      fullName: firebaseUser.displayName ?? '',
      email: firebaseUser.email ?? '',
      role: UserRole.reader,
      status: UserStatus.active,
      lastLogin: firebaseUser.metadata.lastSignInTime,
      createdAt: firebaseUser.metadata.creationTime ?? DateTime.now(),
      updatedAt: DateTime.now(),
      idToken: await firebaseUser.getIdToken(),
    );
  }

  Future<User> signInWithEmail(String email, String password) async {
    final credential = await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
    final firebaseUser = credential.user!;

    Logger.info('User signed in', tag: 'AuthService');

    return User(
      id: firebaseUser.uid,
      fullName: firebaseUser.displayName ?? '',
      email: firebaseUser.email ?? '',
      role: UserRole.reader,
      status: UserStatus.active,
      lastLogin: DateTime.now(),
      createdAt: firebaseUser.metadata.creationTime ?? DateTime.now(),
      updatedAt: DateTime.now(),
      idToken: await firebaseUser.getIdToken(),
    );
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }
}

