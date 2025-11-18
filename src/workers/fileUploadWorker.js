// Web Worker for handling file uploads in a separate thread
self.onmessage = function (e) {
  const { type, data } = e.data;

  switch (type) {
    case 'UPLOAD_FILE':
      handleFileUpload(data);
      break;
    case 'PROCESS_IMAGE':
      processImage(data);
      break;
    default:
      self.postMessage({ type: 'ERROR', error: 'Unknown message type' });
  }
};

async function handleFileUpload({ file, uploadUrl, fileIndex }) {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    // Upload file
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Send success message back to main thread
    self.postMessage({
      type: 'UPLOAD_SUCCESS',
      data: {
        fileIndex,
        url: result.url,
        publicId: result.public_id,
        fileName: file.name,
        fileSize: file.size
      }
    });

  } catch (error) {
    // Send error message back to main thread
    self.postMessage({
      type: 'UPLOAD_ERROR',
      data: {
        fileIndex,
        error: error.message,
        fileName: file.name
      }
    });
  }
}

async function processImage({ file, options = {} }) {
  try {
    // Create canvas for image processing
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d');

    // Create image from file
    const imageBitmap = await createImageBitmap(file);

    // Set canvas dimensions
    const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options;
    let { width, height } = imageBitmap;

    // Calculate new dimensions maintaining aspect ratio
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = Math.floor(width * ratio);
      height = Math.floor(height * ratio);
    }

    canvas.width = width;
    canvas.height = height;

    // Draw and compress image
    ctx.drawImage(imageBitmap, 0, 0, width, height);

    // Convert to blob
    const blob = await canvas.convertToBlob({
      type: file.type,
      quality: quality
    });

    // Send processed image back
    self.postMessage({
      type: 'IMAGE_PROCESSED',
      data: {
        originalFile: file,
        processedBlob: blob,
        originalSize: file.size,
        processedSize: blob.size,
        compressionRatio: ((file.size - blob.size) / file.size * 100).toFixed(2)
      }
    });

  } catch (error) {
    self.postMessage({
      type: 'PROCESSING_ERROR',
      data: {
        error: error.message,
        fileName: file.name
      }
    });
  }
}
