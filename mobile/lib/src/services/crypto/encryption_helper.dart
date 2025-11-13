class EncryptionHelper {
  static const _passphrase = 'TODO_SECURE_KEY';

  static List<int> get passwordBytes => _passphrase.codeUnits;
}

