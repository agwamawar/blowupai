
interface VideoFileInfoProps {
  file: File;
  metadata: {
    duration: number;
    resolution: string;
    frameRate?: number;
    fileSize: number;
  };
}

export function VideoFileInfo({ file, metadata }: VideoFileInfoProps) {
  return (
    <div className="mt-2 text-sm text-gray-600">
      <p><span className="font-medium">Format:</span> {file.type}</p>
      <p><span className="font-medium">Duration:</span> {metadata.duration.toFixed(1)}s</p>
      <p><span className="font-medium">Resolution:</span> {metadata.resolution}</p>
      <p><span className="font-medium">Size:</span> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
    </div>
  );
}
