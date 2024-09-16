import https from 'https';
import http from 'http';
import path from 'path';

interface FileInfo {
    fileName: string;
    fileSize: number;
}

function getFileInfo(url: string): Promise<FileInfo> {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        protocol
            .get(url, (response) => {
                if (response.statusCode === 200) {
                    const fileSize = parseInt(response.headers['content-length'] || '', 10);
                    let fileName = '';

                    // Try to get filename from Content-Disposition header
                    const contentDisposition = response.headers['content-disposition'];
                    if (contentDisposition) {
                        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                        if (fileNameMatch) {
                            fileName = fileNameMatch[1];
                        }
                    }

                    // If filename not found in header, extract it from URL
                    if (!fileName) {
                        fileName = path.basename(new URL(url).pathname);
                    }

                    if (isNaN(fileSize)) {
                        reject(new Error('Content-Length header is missing or invalid'));
                    } else {
                        resolve({ fileName, fileSize });
                    }
                } else {
                    reject(new Error(`HTTP status code: ${response.statusCode}`));
                }
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

export default getFileInfo;

// Usage example:
// getFileInfo('https://example.com/file.pdf')
//   .then(info => console.log(`File name: ${info.fileName}, Size: ${info.fileSize} bytes`))
//   .catch(error => console.error('Error:', error.message));
