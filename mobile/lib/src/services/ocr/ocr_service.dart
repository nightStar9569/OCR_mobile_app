import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';

class OcrService {
  OcrService() : _textRecognizer = TextRecognizer(script: TextRecognitionScript.latin);

  final TextRecognizer _textRecognizer;

  Future<OcrResult> processImage(InputImage image) async {
    final result = await _textRecognizer.processImage(image);
    final buffer = StringBuffer();

    for (final block in result.blocks) {
      buffer.write(block.text.replaceAll(RegExp(r'[^0-9]'), ''));
    }

    final parsedValue = double.tryParse(buffer.toString());
    return OcrResult(
      value: parsedValue,
      confidence: parsedValue == null ? 0 : 0.85,
    );
  }

  Future<void> dispose() async {
    await _textRecognizer.close();
  }
}

class OcrResult {
  const OcrResult({required this.value, required this.confidence});

  final double? value;
  final double confidence;
}

