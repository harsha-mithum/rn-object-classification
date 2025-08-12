import * as FileSystem from 'expo-file-system';
import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import { classifyImage } from '../imageClassifier';

// Mock expo-file-system
jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn(() => Promise.resolve('mockBase64Image')),
  EncodingType: {
    Base64: 'base64',
  },
}));

// Mock jpeg-js
jest.mock('jpeg-js', () => ({
  decode: jest.fn(() => ({
    width: 100,
    height: 100,
    data: new Uint8Array(100 * 100 * 4), // Mock pixel data
  })),
}));

// Mock @tensorflow/tfjs
jest.mock('@tensorflow/tfjs', () => ({
  __esModule: true, // This is important for mocking default exports
  ...jest.requireActual('@tensorflow/tfjs'), // Keep actual implementations for non-mocked parts
  tensor3d: jest.fn(() => ({
    slice: jest.fn(() => ({})), // Mock the slice method
  })),
  util: {
    encodeString: jest.fn(() => ({ buffer: new ArrayBuffer(10) })), // Mock encodeString
  },
}));

describe('classifyImage', () => {
  const mockModel = {
    classify: jest.fn(() => Promise.resolve([{ className: 'cat', probability: 0.9 }])),
  };

  const mockImage = {
    uri: 'file://mock/image.jpg',
    width: 100,
    height: 100,
    fileName: 'image.jpg',
    fileSize: 1000,
    mimeType: 'image/jpeg',
    assetId: '123',
    base64: 'mockBase64Image',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should classify an image and return predictions', async () => {
    const predictions = await classifyImage(mockModel as any, mockImage as any);

    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(
      mockImage.uri,
      { encoding: FileSystem.EncodingType.Base64 }
    );
    expect(jpeg.decode).toHaveBeenCalled();
    expect(tf.tensor3d).toHaveBeenCalled();
    expect(mockModel.classify).toHaveBeenCalled();
    expect(predictions).toEqual([{ className: 'cat', probability: 0.9 }]);
  });

  it('should handle errors during file system read', async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockRejectedValueOnce(new Error('File read error'));

    await expect(classifyImage(mockModel as any, mockImage as any)).rejects.toThrow('File read error');
  });

  it('should handle errors during image decoding', async () => {
    (jpeg.decode as jest.Mock).mockImplementationOnce(() => {
      throw new Error('JPEG decode error');
    });

    await expect(classifyImage(mockModel as any, mockImage as any)).rejects.toThrow('JPEG decode error');
  });

  it('should handle errors during model classification', async () => {
    (mockModel.classify as jest.Mock).mockRejectedValueOnce(new Error('Model classification error'));

    await expect(classifyImage(mockModel as any, mockImage as any)).rejects.toThrow('Model classification error');
  });
});
