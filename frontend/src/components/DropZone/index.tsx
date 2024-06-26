import React, { useCallback, useContext } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { FileIcon } from '../../assets/icons/FileIcon';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import { useFileContext } from '@/contexts/FileContext';
import { useTranslation } from 'react-i18next';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useFileContext } from '@/contexts/FileContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface InputProps {
dropzone: DropzoneState;
}

interface HasFileProps {
file: File;
removeFile: (file: File) => void;
}

export const FileInput = () => {
const { files, setFiles } = useFileContext();
const onDrop = useCallback((droppedFiles: File[]) => {
    setFiles((prevFiles: File[]) => [...prevFiles, ...droppedFiles]);
    console.log(droppedFiles); // Log the dropped files for reference
}, [setFiles]);

const dropzone = useDropzone({
    onDrop,
    accept: {
    'application/pdf': ['.pdf'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/bmp': ['.bmp'],
    'image/webp': ['.webp'],
    'text/csv': ['.csv']
    },
    disabled: files.length >= 1, // Disable drop zone when 5 files are uploaded
});

return <Input dropzone={dropzone} files={files} />;
};

const Input = ({ dropzone, files }: InputProps & { files: File[] }) => {
    const {setFiles } = useFileContext();
    const { t } = useTranslation("global")
    const { getRootProps, getInputProps, isDragActive } = dropzone;

    return (
        <div
        {...getRootProps()}
        className={`custom-dropzone ${isDragActive ? 'is-drag-active' : ''}`}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            height: '50%',
            borderRadius: '4px',
            border: isDragActive ? '2px dashed #00eaff' : '2px dashed #ccc', // Define a borda tracejada
            backgroundColor: isDragActive ? '#f0f0f0' : '#f0f0f0', // Muda a cor de fundo para azul quando ativo
            cursor: 'pointer',
            opacity: files.length >= 1 ? 0.85 : 1, // Reduz a opacidade quando há arquivos carregados
        }}
        >
        <input {...getInputProps()} className="hidden" />
        <CloudUploadIcon sx={{ fontSize: 75, color: 'gray' }} />
        {isDragActive ? (
            <p className="font-bold text-lg text-white" style={{fontWeight: 'bold', color: '#000000'}}>Drop here</p>
        ) : (
            <>
            <p className="mb-2 text-lg text-gray">
                <span style={{fontWeight: 'bold', color: '#000000'}}>Select a CSV file to upload or drag here</span>
            </p>
            </>
        )}
        {files.map((file, index) => (
            <HasFile key={index} file={file} removeFile={(fileToRemove) => setFiles(prevFiles => prevFiles.filter(f => f !== fileToRemove))} />
        ))}
        </div>
    );
};
const HasFile = ({ file }: HasFileProps) => {
    const { setFiles } = useFileContext();

    const removeFile = useCallback(
        (fileToRemove: File) => {
        setFiles((prevFiles: File[]) => prevFiles.filter((f) => f !== fileToRemove)); 
        },
        [setFiles]
    );

    return (
        <div
        className="custom-hasfile"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            border: '2px dashed #ccc',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            color: 'black'
        }}
    >
        <div className="file-details">
        <FileIcon className="icons" />
        <span className="file-name" style={{ marginLeft: '10px' }}>
            {file.name}
            </span>
            <button type="button" onClick={() => removeFile(file)} className="close-button" style={{ marginLeft: '10px' }}>
            <CloseIcon className="icons" />
        </button>
        </div>
        </div>
    );
};
