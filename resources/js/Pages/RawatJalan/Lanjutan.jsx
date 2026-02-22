import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { Head, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { ChevronDown, FileText, Upload, File } from 'lucide-react';
import LayoutUtama from "@/Pages/LayoutUtama";
import LanjutanRalanSidebar from "@/Components/LanjutanRalanSidebar";
import RiwayatPerawatan from "./components/RiwayatPerawatan";
import CpptSoap from "./components/CpptSoap";
import Modal from "@/Components/Modal";
import Resep from "./components/Resep";
import Diagnosa from "./components/Diagnosa";
import PermintaanLab from "./components/PermintaanLab";
import PermintaanRadiologi from "./components/PermintaanRadiologi";
import TarifTindakan from "./components/TarifTindakan";
import OdontogramForm from "../Odontogram/odontogram";


export default function Lanjutan({ rawatJalan, params, lastVisitDays, lastVisitDate }) {

    const [activeTab, setActiveTab] = useState("cppt");
    const [openAcc, setOpenAcc] = useState({
        pemeriksaan: true,
        kunjungan: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [autoSaveStatus, setAutoSaveStatus] = useState("");

    const [diagnosaAppendItems, setDiagnosaAppendItems] = useState(null);
    const [resepAppendItems, setResepAppendItems] = useState(null);
    const [selectedDokterForResep, setSelectedDokterForResep] = useState(() => {
        const kd = rawatJalan?.kd_dokter || rawatJalan?.dokter?.kd_dokter || "";
        return kd ? String(kd) : "";
    });
    const [selectedDokterNamaForResep, setSelectedDokterNamaForResep] = useState(() => {
        const nama = rawatJalan?.dokter?.nm_dokter || "";
        return nama ? String(nama) : "";
    });
    const [selectedNoRawat, setSelectedNoRawat] = useState(params?.no_rawat || rawatJalan?.no_rawat || "");
    const [soapModalOpen, setSoapModalOpen] = useState(false);
    const [soapModalLoading, setSoapModalLoading] = useState(false);
    const [soapModalError, setSoapModalError] = useState("");
    const [soapModalItems, setSoapModalItems] = useState([]);
    const [pegawaiNameMap, setPegawaiNameMap] = useState({});
    const [soapViewMode, setSoapViewMode] = useState('table');
    const [soapShowAll, setSoapShowAll] = useState(false);
    const [soapPage, setSoapPage] = useState(1);
    const [berkasModalOpen, setBerkasModalOpen] = useState(false);
    const [skriningVisual, setSkriningVisual] = useState(null);
    const [loadingSkriningVisual, setLoadingSkriningVisual] = useState(false);
    const [poliCalling, setPoliCalling] = useState(false);
    const [poliRepeatCalling, setPoliRepeatCalling] = useState(false);
    const [berkasCategories, setBerkasCategories] = useState([]);
    const [berkasItems, setBerkasItems] = useState([]);
    const [berkasLoading, setBerkasLoading] = useState(false);
    const [berkasError, setBerkasError] = useState("");
    const [berkasUploading, setBerkasUploading] = useState(false);
    const [berkasProcessing, setBerkasProcessing] = useState(false);
    const [selectedBerkasKode, setSelectedBerkasKode] = useState("");
    const [selectedBerkasFile, setSelectedBerkasFile] = useState(null);
    const [berkasInputKey, setBerkasInputKey] = useState(0);
    const [berkasFilterOpen, setBerkasFilterOpen] = useState(false);
    const [berkasFilterSearch, setBerkasFilterSearch] = useState("");
    const [berkasFilterSelected, setBerkasFilterSelected] = useState([]);
    const [berkasSortOrder, setBerkasSortOrder] = useState("desc");
    const [berkasPage, setBerkasPage] = useState(1);
    const [cameraModalOpen, setCameraModalOpen] = useState(false);
    const [cameraError, setCameraError] = useState("");
    const [cameraLoading, setCameraLoading] = useState(false);
    const cameraVideoRef = useRef(null);
    const cameraStreamRef = useRef(null);
    const cameraFileInputRef = useRef(null);
    const [altCameraModalOpen, setAltCameraModalOpen] = useState(false);
    const [altCameraError, setAltCameraError] = useState("");
    const [altCameraStatus, setAltCameraStatus] = useState("");
    const [altCameraLoading, setAltCameraLoading] = useState(false);
    const [altFacingMode, setAltFacingMode] = useState("environment");
    const [altResolution, setAltResolution] = useState("1280x720");
    const [altTorchSupported, setAltTorchSupported] = useState(false);
    const [altTorchEnabled, setAltTorchEnabled] = useState(false);
    const [altPreviewUrl, setAltPreviewUrl] = useState("");
    const [altPreviewError, setAltPreviewError] = useState("");
    const [altCapturedFile, setAltCapturedFile] = useState(null);
    const [altQualityMessage, setAltQualityMessage] = useState("");
    const [altQualityOk, setAltQualityOk] = useState(true);
    const altVideoRef = useRef(null);
    const altStreamRef = useRef(null);
    const altTrackRef = useRef(null);
    const altImageCaptureRef = useRef(null);
    const altStartTokenRef = useRef(0);
    const altPreviewUrlRef = useRef("");

    const currentNoRawat = selectedNoRawat || params?.no_rawat || rawatJalan?.no_rawat || "";

    const toggle = (section) => {
        setOpenAcc((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const width = window.innerWidth || 0;
        const shouldOpenKunjungan = width >= 768;
        setOpenAcc((prev) => ({
            ...prev,
            kunjungan: shouldOpenKunjungan,
        }));
    }, []);

    useEffect(() => {
        altPreviewUrlRef.current = altPreviewUrl || "";
    }, [altPreviewUrl]);

    // Sync doctor from rawatJalan on mount/update if not set
    // This ensures that if the page is refreshed and rawatJalan is populated,
    // the doctor state is correctly initialized even if useState logic missed it (e.g. if props updated late)
    useEffect(() => {
        if (rawatJalan) {
            const kd = rawatJalan?.kd_dokter || rawatJalan?.dokter?.kd_dokter || "";
            const nama = rawatJalan?.dokter?.nm_dokter || "";

            if (kd && !selectedDokterForResep) {
                setSelectedDokterForResep(String(kd));
            }
            if (nama && !selectedDokterNamaForResep) {
                setSelectedDokterNamaForResep(String(nama));
            }
        }
    }, [rawatJalan]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getBerkasFilename = (path) => {
        if (!path) return "Berkas";
        const clean = String(path).split("?")[0];
        const parts = clean.split("/");
        return parts[parts.length - 1] || "Berkas";
    };

    const getBerkasUploadDate = (item) => {
        const source = getBerkasFilename(item?.lokasi_file || item?.file_url || "");
        const match = source.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
        if (!match) return null;
        const [, year, month, day, hour, minute, second] = match;
        const parsed = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
        );
        if (Number.isNaN(parsed.getTime())) return null;
        return parsed;
    };

    const formatBerkasUploadDate = (date) => {
        if (!date || Number.isNaN(date.getTime())) return "Tidak tersedia";
        const pad = (value) => String(value).padStart(2, "0");
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const MAX_BERKAS_BYTES = 5 * 1024 * 1024;
    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

    const compressImageFile = useCallback(async (file) => {
        if (!ALLOWED_IMAGE_TYPES.includes(file?.type || "")) {
            throw new Error("Format berkas harus JPG, PNG, atau WEBP.");
        }
        if (file.size <= MAX_BERKAS_BYTES) {
            return file;
        }

        const imageBitmap = typeof window !== "undefined" && typeof window.createImageBitmap === "function"
            ? await window.createImageBitmap(file)
            : await new Promise((resolve, reject) => {
                const img = new Image();
                const url = URL.createObjectURL(file);
                img.onload = () => {
                    URL.revokeObjectURL(url);
                    resolve(img);
                };
                img.onerror = () => {
                    URL.revokeObjectURL(url);
                    reject(new Error("Gagal memuat gambar."));
                };
                img.src = url;
            });

        const sourceWidth = imageBitmap.width || imageBitmap.naturalWidth || 0;
        const sourceHeight = imageBitmap.height || imageBitmap.naturalHeight || 0;
        if (!sourceWidth || !sourceHeight) {
            if (typeof imageBitmap.close === "function") {
                imageBitmap.close();
            }
            throw new Error("Ukuran gambar tidak valid.");
        }

        let targetWidth = sourceWidth;
        let targetHeight = sourceHeight;
        const maxDimension = 2000;
        const scaleBy = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
        if (scaleBy < 1) {
            targetWidth = Math.round(sourceWidth * scaleBy);
            targetHeight = Math.round(sourceHeight * scaleBy);
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            if (typeof imageBitmap.close === "function") {
                imageBitmap.close();
            }
            throw new Error("Canvas tidak tersedia.");
        }

        const outputType = file.type === "image/png" ? "image/jpeg" : file.type;
        let quality = 0.9;
        let blob = null;
        let attempts = 0;

        while (attempts < 8) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.clearRect(0, 0, targetWidth, targetHeight);
            ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

            blob = await new Promise((resolve) =>
                canvas.toBlob(resolve, outputType, quality)
            );

            if (blob && blob.size <= MAX_BERKAS_BYTES) {
                break;
            }

            if (quality > 0.6) {
                quality = Math.max(0.6, quality - 0.1);
            } else {
                targetWidth = Math.max(600, Math.floor(targetWidth * 0.85));
                targetHeight = Math.max(600, Math.floor(targetHeight * 0.85));
            }

            attempts += 1;
        }

        if (typeof imageBitmap.close === "function") {
            imageBitmap.close();
        }

        if (!blob) {
            throw new Error("Gagal mengompres gambar.");
        }
        if (blob.size > MAX_BERKAS_BYTES) {
            throw new Error("Ukuran berkas masih lebih dari 5MB.");
        }

        let nextName = file.name || "berkas";
        if (outputType === "image/jpeg" && !nextName.toLowerCase().endsWith(".jpg") && !nextName.toLowerCase().endsWith(".jpeg")) {
            nextName = nextName.replace(/\.[^/.]+$/, "");
            nextName = `${nextName || "berkas"}.jpg`;
        } else if (outputType === "image/webp" && !nextName.toLowerCase().endsWith(".webp")) {
            nextName = nextName.replace(/\.[^/.]+$/, "");
            nextName = `${nextName || "berkas"}.webp`;
        } else if (outputType === "image/png" && !nextName.toLowerCase().endsWith(".png")) {
            nextName = nextName.replace(/\.[^/.]+$/, "");
            nextName = `${nextName || "berkas"}.png`;
        }

        if (typeof window !== "undefined" && typeof window.File === "function") {
            return new window.File([blob], nextName, { type: outputType, lastModified: Date.now() });
        }

        return {
            blob,
            name: nextName,
            size: blob.size,
            type: outputType,
        };
    }, []);

    const stopCameraStream = useCallback(() => {
        const stream = cameraStreamRef.current;
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        cameraStreamRef.current = null;
        if (cameraVideoRef.current) {
            cameraVideoRef.current.srcObject = null;
        }
    }, []);

    const stopAltCameraStream = useCallback(() => {
        const stream = altStreamRef.current;
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        altStreamRef.current = null;
        altTrackRef.current = null;
        altImageCaptureRef.current = null;
        if (altVideoRef.current) {
            altVideoRef.current.srcObject = null;
        }
    }, []);

    const resetAltCapture = useCallback(() => {
        const currentUrl = altPreviewUrlRef.current;
        if (currentUrl) {
            URL.revokeObjectURL(currentUrl);
        }
        altPreviewUrlRef.current = "";
        setAltPreviewUrl("");
        setAltPreviewError("");
        setAltCapturedFile(null);
        setAltQualityMessage("");
        setAltQualityOk(true);
    }, []);

    const waitForVideoElement = useCallback(() => {
        return new Promise((resolve, reject) => {
            const startedAt = Date.now();
            const checkReady = () => {
                if (cameraVideoRef.current) {
                    resolve(cameraVideoRef.current);
                    return;
                }
                if (Date.now() - startedAt > 3000) {
                    reject(new Error("Kamera tidak tersedia."));
                    return;
                }
                requestAnimationFrame(checkReady);
            };
            checkReady();
        });
    }, []);

    const waitForAltVideoElement = useCallback(() => {
        return new Promise((resolve, reject) => {
            const startedAt = Date.now();
            const checkReady = () => {
                if (altVideoRef.current) {
                    resolve(altVideoRef.current);
                    return;
                }
                if (Date.now() - startedAt > 3000) {
                    reject(new Error("Kamera tidak tersedia."));
                    return;
                }
                requestAnimationFrame(checkReady);
            };
            checkReady();
        });
    }, []);

    const waitForVideoReady = useCallback((video) => {
        return new Promise((resolve, reject) => {
            const startedAt = Date.now();
            let rafId = null;
            const cleanup = () => {
                if (rafId) cancelAnimationFrame(rafId);
                if (video) {
                    video.removeEventListener("loadeddata", checkReady);
                    video.removeEventListener("loadedmetadata", checkReady);
                }
            };
            const checkReady = () => {
                if (!video) {
                    cleanup();
                    reject(new Error("Kamera tidak tersedia di perangkat ini."));
                    return;
                }
                if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                    cleanup();
                    resolve();
                    return;
                }
                if (Date.now() - startedAt > 8000) {
                    cleanup();
                    reject(new Error("Kamera tidak mengirimkan video."));
                    return;
                }
                rafId = requestAnimationFrame(checkReady);
            };
            if (video) {
                video.addEventListener("loadeddata", checkReady);
                video.addEventListener("loadedmetadata", checkReady);
            }
            checkReady();
        });
    }, []);

    const waitForAltVideoReady = useCallback((video) => {
        return new Promise((resolve, reject) => {
            const startedAt = Date.now();
            let rafId = null;
            const cleanup = () => {
                if (rafId) cancelAnimationFrame(rafId);
                if (video) {
                    video.removeEventListener("loadeddata", checkReady);
                    video.removeEventListener("loadedmetadata", checkReady);
                }
            };
            const checkReady = () => {
                if (!video) {
                    cleanup();
                    reject(new Error("Kamera tidak tersedia di perangkat ini."));
                    return;
                }
                if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                    cleanup();
                    resolve();
                    return;
                }
                if (Date.now() - startedAt > 8000) {
                    cleanup();
                    reject(new Error("Kamera tidak mengirimkan video."));
                    return;
                }
                rafId = requestAnimationFrame(checkReady);
            };
            if (video) {
                video.addEventListener("loadeddata", checkReady);
                video.addEventListener("loadedmetadata", checkReady);
            }
            checkReady();
        });
    }, []);

    const startCamera = useCallback(async () => {
        setCameraLoading(true);
        setCameraError("");
        stopCameraStream();
        try {
            const hasMedia = typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia;
            if (!hasMedia) {
                throw new Error("Kamera tidak tersedia di perangkat ini.");
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: "environment" } },
                audio: false,
            });
            cameraStreamRef.current = stream;
            const videoEl = await waitForVideoElement();
            videoEl.srcObject = stream;
            videoEl.muted = true;
            videoEl.playsInline = true;
            videoEl.autoplay = true;
            await videoEl.play();
            await waitForVideoReady(videoEl);
        } catch (err) {
            stopCameraStream();
            setCameraError(err?.message || "Tidak dapat mengakses kamera.");
        } finally {
            setCameraLoading(false);
        }
    }, [stopCameraStream, waitForVideoElement, waitForVideoReady]);

    const startAltCamera = useCallback(async () => {
        const startToken = altStartTokenRef.current + 1;
        altStartTokenRef.current = startToken;
        setAltCameraLoading(true);
        setAltCameraError("");
        setAltCameraStatus("Menyiapkan kamera...");
        stopAltCameraStream();
        resetAltCapture();
        try {
            const hasMedia = typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia;
            if (!hasMedia) {
                throw new Error("Kamera tidak tersedia di perangkat ini.");
            }
            if (typeof window !== "undefined" && window.isSecureContext === false) {
                throw new Error("Kamera hanya dapat digunakan melalui koneksi aman (HTTPS).");
            }
            const [width, height] = String(altResolution).split("x").map((val) => Number(val) || 0);
            const constraints = {
                video: {
                    facingMode: { ideal: altFacingMode },
                    width: width ? { ideal: width } : undefined,
                    height: height ? { ideal: height } : undefined,
                },
                audio: false,
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (altStartTokenRef.current !== startToken) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }
            altStreamRef.current = stream;
            const track = stream.getVideoTracks?.()[0] || null;
            altTrackRef.current = track;
            if (track && typeof window !== "undefined" && typeof window.ImageCapture === "function") {
                try {
                    altImageCaptureRef.current = new window.ImageCapture(track);
                } catch (_) {
                    altImageCaptureRef.current = null;
                }
            } else {
                altImageCaptureRef.current = null;
            }
            let torchSupported = false;
            if (track?.getCapabilities) {
                const caps = track.getCapabilities();
                torchSupported = Boolean(caps?.torch);
            }
            setAltTorchSupported(torchSupported);
            if (!torchSupported) {
                setAltTorchEnabled(false);
            }
            const videoEl = await waitForAltVideoElement();
            if (altStartTokenRef.current !== startToken) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }
            videoEl.srcObject = stream;
            videoEl.muted = true;
            videoEl.playsInline = true;
            videoEl.autoplay = true;
            const playPromise = videoEl.play();
            if (playPromise && typeof playPromise.then === "function") {
                await playPromise.catch((err) => {
                    if (altStartTokenRef.current !== startToken) {
                        return;
                    }
                    throw err;
                });
            }
            await waitForAltVideoReady(videoEl);
            if (altStartTokenRef.current !== startToken) {
                return;
            }
            setAltCameraStatus("Kamera siap digunakan.");
        } catch (err) {
            if (altStartTokenRef.current !== startToken) {
                return;
            }
            stopAltCameraStream();
            setAltCameraStatus("");
            setAltCameraError(err?.message || "Tidak dapat mengakses kamera.");
        } finally {
            if (altStartTokenRef.current === startToken) {
                setAltCameraLoading(false);
            }
        }
    }, [
        altFacingMode,
        altResolution,
        resetAltCapture,
        stopAltCameraStream,
        waitForAltVideoElement,
        waitForAltVideoReady,
    ]);

    const applyAltTorch = useCallback(async (nextEnabled) => {
        const track = altTrackRef.current;
        if (!track || typeof track.applyConstraints !== "function") {
            setAltCameraError("Flash tidak didukung pada perangkat ini.");
            setAltTorchSupported(false);
            setAltTorchEnabled(false);
            return;
        }
        const caps = typeof track.getCapabilities === "function" ? track.getCapabilities() : null;
        if (!caps?.torch) {
            setAltCameraError("Flash tidak tersedia pada kamera ini.");
            setAltTorchSupported(false);
            setAltTorchEnabled(false);
            return;
        }
        try {
            await track.applyConstraints({ advanced: [{ torch: nextEnabled }] });
            setAltTorchEnabled(nextEnabled);
            setAltCameraError("");
        } catch (_) {
            setAltCameraError("Gagal mengaktifkan flash.");
        }
    }, []);

    const evaluateAltQuality = useCallback(async (blob) => {
        const minWidth = 640;
        const minHeight = 480;
        const loadImage = async () => {
            if (typeof window !== "undefined" && typeof window.createImageBitmap === "function") {
                return window.createImageBitmap(blob);
            }
            return await new Promise((resolve, reject) => {
                const img = new Image();
                const url = URL.createObjectURL(blob);
                img.onload = () => {
                    URL.revokeObjectURL(url);
                    resolve(img);
                };
                img.onerror = () => {
                    URL.revokeObjectURL(url);
                    reject(new Error("Gagal memuat gambar."));
                };
                img.src = url;
            });
        };
        const image = await loadImage();
        const width = image.width || image.naturalWidth || 0;
        const height = image.height || image.naturalHeight || 0;
        if (!width || !height) {
            if (typeof image.close === "function") {
                image.close();
            }
            return { ok: false, message: "Ukuran gambar tidak valid." };
        }
        if (width < minWidth || height < minHeight) {
            if (typeof image.close === "function") {
                image.close();
            }
            return { ok: false, message: `Resolusi terlalu rendah (${width}x${height}).` };
        }
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            if (typeof image.close === "function") {
                image.close();
            }
            return { ok: true, message: "Kualitas foto siap digunakan." };
        }
        const sampleWidth = 160;
        const ratio = height / width;
        const sampleHeight = Math.max(120, Math.round(sampleWidth * ratio));
        canvas.width = sampleWidth;
        canvas.height = sampleHeight;
        ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);
        const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
        const count = data.length / 4;
        let sum = 0;
        let sumSq = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            sum += lum;
            sumSq += lum * lum;
        }
        const mean = sum / count;
        const variance = sumSq / count - mean * mean;
        if (mean < 45) {
            if (typeof image.close === "function") {
                image.close();
            }
            return { ok: false, message: "Foto terlalu gelap, gunakan pencahayaan lebih terang." };
        }
        if (mean > 220) {
            if (typeof image.close === "function") {
                image.close();
            }
            return { ok: false, message: "Foto terlalu terang, kurangi cahaya." };
        }
        if (variance < 120) {
            if (typeof image.close === "function") {
                image.close();
            }
            return { ok: false, message: "Foto terlihat kurang tajam, coba ambil ulang." };
        }
        if (typeof image.close === "function") {
            image.close();
        }
        return { ok: true, message: `Kualitas foto baik (${width}x${height}).` };
    }, []);

    useEffect(() => {
        if (!cameraModalOpen) {
            stopCameraStream();
            setCameraError("");
            return;
        }
        startCamera();
    }, [cameraModalOpen, startCamera, stopCameraStream]);

    useEffect(() => {
        return () => {
            stopCameraStream();
        };
    }, [stopCameraStream]);

    useEffect(() => {
        if (!altCameraModalOpen) {
            altStartTokenRef.current += 1;
            stopAltCameraStream();
            resetAltCapture();
            setAltCameraError("");
            setAltCameraStatus("");
            setAltTorchEnabled(false);
            setAltTorchSupported(false);
            return;
        }
        startAltCamera();
    }, [
        altCameraModalOpen,
        altFacingMode,
        altResolution,
        resetAltCapture,
        startAltCamera,
        stopAltCameraStream,
    ]);

    useEffect(() => {
        return () => {
            altStartTokenRef.current += 1;
            stopAltCameraStream();
            resetAltCapture();
        };
    }, [resetAltCapture, stopAltCameraStream]);

    const getBerkasUploadErrorMessage = (err) => {
        const response = err?.response;
        const status = response?.status;
        const data = response?.data;
        const fieldMessage = data?.errors?.file?.[0] || data?.errors?.kode?.[0] || data?.errors?.no_rawat?.[0];
        if (fieldMessage) return fieldMessage;
        if (status === 403) return "Anda tidak memiliki izin untuk mengunggah berkas.";
        if (status === 413) return "Ukuran berkas terlalu besar untuk server.";
        if (status === 419) return "Sesi telah berakhir. Muat ulang halaman dan coba lagi.";
        if (status === 422) return data?.message || "Data berkas tidak valid.";
        if (err?.message === "Network Error") return "Koneksi bermasalah. Periksa jaringan dan coba lagi.";
        return data?.message || err?.message || "Gagal mengunggah berkas";
    };

    const handleOpenBerkas = useCallback((url) => {
        setBerkasError("");
        if (!url) {
            setBerkasError("Tautan berkas tidak tersedia");
            return;
        }
        if (typeof window === "undefined") {
            return;
        }
        let safeUrl = url;
        try {
            safeUrl = new URL(url, window.location.origin).toString();
        } catch (_) {
            setBerkasError("Tautan berkas tidak valid");
            return;
        }
        try {
            const opened = window.open(safeUrl, "_blank", "noopener,noreferrer");
            if (!opened) {
                setBerkasError("Popup diblokir browser. Izinkan pop-up untuk membuka berkas.");
            }
        } catch (_) {
            setBerkasError("Gagal membuka berkas");
        }
    }, []);

    const loadBerkasDigital = useCallback(async (noRawat) => {
        if (!noRawat) return;
        setBerkasLoading(true);
        setBerkasError("");
        try {
            const [kategoriRes, berkasRes] = await Promise.all([
                axios.get(route("rawat-jalan.berkas-digital.kategori")),
                axios.get(route("rawat-jalan.berkas-digital.list", { no_rawat: noRawat })),
            ]);
            setBerkasCategories(kategoriRes?.data?.data || []);
            setBerkasItems(berkasRes?.data?.data || []);
        } catch (_err) {
            setBerkasError("Gagal memuat berkas digital");
            setBerkasCategories([]);
            setBerkasItems([]);
        } finally {
            setBerkasLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab !== "berkasDigital") return;
        if (!currentNoRawat) return;
        loadBerkasDigital(currentNoRawat);
    }, [activeTab, currentNoRawat, loadBerkasDigital]);

    const handleBerkasFileChangeAsync = useCallback((file) => {
        if (!file) {
            setSelectedBerkasFile(null);
            return Promise.resolve(null);
        }
        setBerkasProcessing(true);
        setBerkasError("");
        return compressImageFile(file)
            .then((compressed) => {
                setSelectedBerkasFile(compressed);
                return compressed;
            })
            .catch((err) => {
                setSelectedBerkasFile(null);
                setBerkasInputKey(Date.now());
                setBerkasError(err?.message || "Gagal memproses berkas.");
                return null;
            })
            .finally(() => {
                setBerkasProcessing(false);
            });
    }, [compressImageFile]);

    const handleBerkasFileChange = (file) => {
        handleBerkasFileChangeAsync(file);
    };

    const handleCameraFilePick = (file) => {
        if (!file) return;
        handleBerkasFileChange(file);
        setCameraModalOpen(false);
        setBerkasInputKey(Date.now());
    };

    const handleCapturePhoto = async () => {
        setCameraError("");
        const video = cameraVideoRef.current;
        if (!video) {
            setCameraError("Kamera tidak tersedia di perangkat ini.");
            return;
        }
        if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
            try {
                await waitForVideoReady(video);
            } catch (err) {
                setCameraError(err?.message || "Kamera tidak mengirimkan video.");
                return;
            }
        }
        const canvas = document.createElement("canvas");
        const width = video.videoWidth || 1280;
        const height = video.videoHeight || 720;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            setCameraError("Canvas tidak tersedia.");
            return;
        }
        ctx.drawImage(video, 0, 0, width, height);
        const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, "image/jpeg", 0.92);
        });
        if (!blob) {
            setCameraError("Gagal mengambil foto.");
            return;
        }
        const fileCtor = typeof window !== "undefined" ? window.File : null;
        if (typeof fileCtor !== "function") {
            setCameraError("Perangkat tidak mendukung penyimpanan foto.");
            return;
        }
        const photoFile = new fileCtor([blob], `kamera_${Date.now()}.jpg`, { type: "image/jpeg" });
        handleBerkasFileChange(photoFile);
        setCameraModalOpen(false);
        setBerkasInputKey(Date.now());
    };

    const createAltJpegFromVideo = useCallback(async (video) => {
        const canvas = document.createElement("canvas");
        const width = video.videoWidth || 1280;
        const height = video.videoHeight || 720;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Canvas tidak tersedia.");
        }
        ctx.drawImage(video, 0, 0, width, height);
        const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, "image/jpeg", 0.92);
        });
        if (!blob || !blob.size) {
            throw new Error("Gagal mengambil foto.");
        }
        return blob;
    }, []);

    const buildAltPreviewUrl = useCallback(async (blob) => {
        const url = URL.createObjectURL(blob);
        const loaded = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => reject(new Error("Preview foto gagal dimuat."));
            img.src = url;
        }).catch((err) => {
            URL.revokeObjectURL(url);
            throw err;
        });
        if (!loaded) {
            URL.revokeObjectURL(url);
            throw new Error("Preview foto gagal dimuat.");
        }
        return url;
    }, []);

    const handleAltCapturePhoto = useCallback(async () => {
        setAltCameraError("");
        setAltCameraStatus("Mengambil foto...");
        setAltCameraLoading(true);
        setAltQualityMessage("");
        setAltQualityOk(true);
        setAltPreviewError("");
        if (altPreviewUrlRef.current) {
            URL.revokeObjectURL(altPreviewUrlRef.current);
        }
        altPreviewUrlRef.current = "";
        setAltPreviewUrl("");
        setAltCapturedFile(null);
        try {
            const video = altVideoRef.current;
            if (!video) {
                throw new Error("Kamera tidak tersedia di perangkat ini.");
            }
            if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
                await waitForAltVideoReady(video);
            }
            let blob = null;
            if (altImageCaptureRef.current?.takePhoto) {
                try {
                    blob = await altImageCaptureRef.current.takePhoto();
                } catch (_) {
                    blob = null;
                }
            }
            if (!blob || !blob.size || !ALLOWED_IMAGE_TYPES.includes(blob.type || "")) {
                blob = await createAltJpegFromVideo(video);
            }
            const fileCtor = typeof window !== "undefined" ? window.File : null;
            if (typeof fileCtor !== "function") {
                throw new Error("Perangkat tidak mendukung penyimpanan foto.");
            }
            const photoFile = new fileCtor([blob], `kamera_alt_${Date.now()}.jpg`, { type: blob.type || "image/jpeg" });
            const quality = await evaluateAltQuality(blob);
            setAltQualityMessage(quality.message || "");
            setAltQualityOk(Boolean(quality.ok));
            const previewUrl = await buildAltPreviewUrl(blob);
            altPreviewUrlRef.current = previewUrl;
            setAltPreviewUrl(previewUrl);
            setAltCapturedFile(photoFile);
            setAltCameraStatus(quality.ok ? "Foto siap digunakan." : "Kualitas foto kurang baik.");
        } catch (err) {
            const message = err?.message || "Gagal mengambil foto.";
            setAltCameraError(message);
            setAltPreviewError(message);
            setAltCameraStatus("");
        } finally {
            setAltCameraLoading(false);
        }
    }, [buildAltPreviewUrl, createAltJpegFromVideo, evaluateAltQuality, waitForAltVideoReady]);

    async function handleBerkasUpload(overrideFile = null) {
        const isEvent = overrideFile && typeof overrideFile === "object" && "preventDefault" in overrideFile;
        const file = isEvent ? selectedBerkasFile : (overrideFile || selectedBerkasFile);
        const kode = selectedBerkasKode;
        if (!currentNoRawat) {
            setBerkasError("No. rawat belum tersedia");
            return false;
        }
        if (!kode) {
            setBerkasError("Pilih kategori terlebih dahulu");
            return false;
        }
        if (!file) {
            setBerkasError("Pilih berkas terlebih dahulu");
            return false;
        }
        const fileBlob = file?.blob || file;
        const fileName = file?.name || "berkas";
        const fileSize = typeof file?.size === "number" ? file.size : fileBlob?.size;
        const isBlobLike = fileBlob && typeof fileBlob.size === "number";
        if (!isBlobLike) {
            setBerkasError("Berkas tidak valid.");
            return false;
        }
        if (fileSize > MAX_BERKAS_BYTES) {
            setBerkasError("Ukuran berkas harus maksimal 5MB.");
            return false;
        }
        setBerkasUploading(true);
        setBerkasError("");
        try {
            const formData = new FormData();
            formData.append("no_rawat", currentNoRawat);
            formData.append("kode", kode);
            formData.append("file", fileBlob, fileName || "berkas");
            await axios.post(route("rawat-jalan.berkas-digital.store"), formData, {
                headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
            });
            setSelectedBerkasFile(null);
            setBerkasInputKey(Date.now());
            await loadBerkasDigital(currentNoRawat);
            return true;
        } catch (_err) {
            setBerkasError(getBerkasUploadErrorMessage(_err));
            return false;
        } finally {
            setBerkasUploading(false);
        }
    }

    const handleAltUsePhoto = useCallback(async () => {
        if (!altCapturedFile) return;
        setAltCameraStatus("Mengompres foto...");
        const compressed = await handleBerkasFileChangeAsync(altCapturedFile);
        if (!compressed) {
            setAltCameraStatus("");
            return;
        }
        setAltCameraStatus("Mengunggah foto...");
        const uploaded = await handleBerkasUpload(compressed);
        if (!uploaded) {
            setAltCameraStatus("");
            return;
        }
        setAltCameraModalOpen(false);
        setBerkasInputKey(Date.now());
    }, [altCapturedFile, handleBerkasFileChangeAsync, handleBerkasUpload]);

    const handleAltRetake = useCallback(() => {
        resetAltCapture();
        setAltCameraError("");
        setAltCameraStatus("Siap mengambil foto.");
    }, [resetAltCapture]);


    const handleBerkasDelete = async (item) => {
        if (!item) return;
        if (!window.confirm("Hapus berkas ini?")) return;
        setBerkasUploading(true);
        setBerkasError("");
        try {
            await axios.delete(route("rawat-jalan.berkas-digital.delete"), {
                data: {
                    no_rawat: item?.no_rawat || currentNoRawat,
                    kode: item?.kode,
                    lokasi_file: item?.lokasi_file,
                },
            });
            await loadBerkasDigital(currentNoRawat);
        } catch (_err) {
            setBerkasError("Gagal menghapus berkas");
        } finally {
            setBerkasUploading(false);
        }
    };

    const berkasCategoryCounts = useMemo(() => {
        const counts = {};
        berkasItems.forEach((item) => {
            const kode = String(item?.kode || "");
            if (!kode) return;
            counts[kode] = (counts[kode] || 0) + 1;
        });
        return counts;
    }, [berkasItems]);

    const filteredBerkasCategories = useMemo(() => {
        const term = berkasFilterSearch.trim().toLowerCase();
        return berkasCategories.filter((kategori) => {
            const kode = String(kategori?.kode || "");
            const nama = kategori?.nama_berkas || kategori?.nama || kategori?.kategori || "Kategori";
            if (!term) return true;
            return `${kode} ${nama}`.toLowerCase().includes(term);
        });
    }, [berkasCategories, berkasFilterSearch]);

    const filteredBerkasItems = useMemo(() => {
        const selectedSet = new Set(berkasFilterSelected);
        const withMeta = berkasItems.map((item, index) => {
            const date = getBerkasUploadDate(item);
            const time = date ? date.getTime() : 0;
            return { item, index, time };
        });
        const filtered = withMeta.filter(({ item }) => {
            if (selectedSet.size === 0) return true;
            return selectedSet.has(String(item?.kode || ""));
        });
        filtered.sort((a, b) => {
            if (a.time === b.time) return a.index - b.index;
            return berkasSortOrder === "asc" ? a.time - b.time : b.time - a.time;
        });
        return filtered.map(({ item }) => item);
    }, [berkasItems, berkasFilterSelected, berkasSortOrder]);

    const berkasPageSize = 6;
    const berkasTotalPages = Math.max(1, Math.ceil(filteredBerkasItems.length / berkasPageSize));
    const berkasPagedItems = useMemo(() => {
        const start = (berkasPage - 1) * berkasPageSize;
        return filteredBerkasItems.slice(start, start + berkasPageSize);
    }, [filteredBerkasItems, berkasPage, berkasPageSize]);

    useEffect(() => {
        if (berkasPage > berkasTotalPages) {
            setBerkasPage(berkasTotalPages);
        }
    }, [berkasPage, berkasTotalPages]);


    const getSkriningBadgeClasses = (v) => {
        const k = String(v || '').toLowerCase();
        if (k === 'merah') return 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
        if (k === 'oranye') return 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
        if (k === 'kuning') return 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
        if (k === 'hijau') return 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
        return 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800';
    };

    useEffect(() => {
        const noRM = params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis || rawatJalan?.no_rkm_medis;
        const tanggal = rawatJalan?.tgl_registrasi || lastVisitDate || null;
        if (!noRM) {
            setSkriningVisual(null);
            return;
        }
        let aborted = false;
        setLoadingSkriningVisual(true);
        const fetchLatest = async () => {
            try {
                const res = await fetch(route('skrining-visual.index', { no_rkm_medis: noRM }), { headers: { 'Accept': 'application/json' } });
                if (!res.ok) throw new Error(String(res.status));
                const json = await res.json();
                const arr = Array.isArray(json?.data) ? json.data : [];
                const first = arr[0] || null;
                if (!aborted && first) {
                    setSkriningVisual(first);
                    return;
                }

                // Jika index kosong, berarti memang tidak ada data skrining sama sekali untuk pasien ini.
                // Tidak perlu memanggil show secara spesifik.
                if (!aborted && Array.isArray(json?.data)) {
                    setSkriningVisual(null);
                    return;
                }

                if (!aborted && tanggal) {
                    const tanggalOnly = (() => {
                        try {
                            if (typeof tanggal === 'string') {
                                if (/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return tanggal;
                                const d = new Date(tanggal);
                                if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
                                return tanggal.slice(0, 10);
                            }
                            const d = new Date(tanggal);
                            return d.toISOString().slice(0, 10);
                        } catch {
                            return String(tanggal).slice(0, 10);
                        }
                    })();
                    const res2 = await fetch(route('skrining-visual.show', { no_rkm_medis: noRM, tanggal: tanggalOnly }), { headers: { 'Accept': 'application/json' } });
                    if (res2.ok) {
                        const json2 = await res2.json();
                        if (!aborted) setSkriningVisual(json2?.data || null);
                        return;
                    }
                }
                if (!aborted) setSkriningVisual(null);
            } catch {
                if (!aborted) setSkriningVisual(null);
            } finally {
                if (!aborted) setLoadingSkriningVisual(false);
            }
        };
        fetchLatest();
        return () => { aborted = true; };
    }, [params?.no_rkm_medis, rawatJalan?.patient?.no_rkm_medis, rawatJalan?.no_rkm_medis, rawatJalan?.tgl_registrasi, lastVisitDate]);

    const menuTabs = [
        {
            key: "cppt",
            title: "CPPT / SOAP",
            subtitle: "Catatan Perkembangan Pasien",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
            color: "blue",
        },
        {
            key: "tarifTindakan",
            title: "Tarif Tindakan",
            subtitle: "Input Tarif Tindakan Medis",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "orange",
        },
        {
            key: "resep",
            title: "Resep",
            subtitle: "Resep Obat & Farmasi",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            ),
            color: "green",
        },
        {
            key: "diagnosa",
            title: "Diagnosa",
            subtitle: "Diagnosis & Kode ICD",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
            color: "red",
        },
        {
            key: "odontogram",
            title: "Odontogram",
            subtitle: "Pemeriksaan Gigi",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                </svg>
            ),
            color: "teal",
        },
        {
            key: "lab",
            title: "Permintaan Lab",
            subtitle: "Laboratorium & Pemeriksaan",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            ),
            color: "purple",
        },
        {
            key: "radiologi",
            title: "Permintaan Radiologi",
            subtitle: "Radiologi & Imaging",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                </svg>
            ),
            color: "indigo",
        },
        {
            key: "berkasDigital",
            title: "Berkas Digital",
            subtitle: "Berkas Pasien & Kategori",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
            color: "purple",
        },
    ];



    // Callback to handle pemeriksa change from CpptSoap
    const handlePemeriksaChange = useCallback((dok) => {
        if (!dok) return;
        if (typeof dok === "string") {
            setSelectedDokterForResep(String(dok));
            setSelectedDokterNamaForResep("");
        } else if (typeof dok === "object") {
            if (dok.id) {
                setSelectedDokterForResep(String(dok.id));
            }
            if (dok.nama) {
                setSelectedDokterNamaForResep(String(dok.nama));
            }
        }
    }, []);

    const renderActiveTabContent = () => {
        const commonProps = {
            token:
                typeof window !== "undefined"
                    ? new URLSearchParams(window.location.search).get("t")
                    : "",
            noRkmMedis:
                params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis,
            noRawat: selectedNoRawat || params?.no_rawat || rawatJalan?.no_rawat,
        };

        const isCppt = activeTab === "cppt" || (!["tarifTindakan", "resep", "diagnosa", "lab", "radiologi", "odontogram", "berkasDigital"].includes(activeTab));
        const isResep = activeTab === "resep";

        return (
            <>
                <div className={`${isCppt ? "block" : "hidden"} h-full`}>
                    <CpptSoap
                        {...commonProps}
                        onOpenResep={() => setActiveTab("resep")}
                        onOpenDiagnosa={() => setActiveTab("diagnosa")}
                        onOpenLab={() => setActiveTab("lab")}
                                onOpenBerkasDigital={() => setActiveTab("berkasDigital")}
                        appendToPlanning={resepAppendItems}
                        onPlanningAppended={() => setResepAppendItems(null)}
                        appendToAssessment={diagnosaAppendItems}
                        onAssessmentAppended={() => setDiagnosaAppendItems(null)}
                        onPemeriksaChange={handlePemeriksaChange}
                    />
                </div>

                <div className={`${isResep ? "block" : "hidden"} h-full`}>
                    <Resep
                        {...commonProps}
                        kdPoli={rawatJalan?.kd_poli || params?.kd_poli || ""}
                        initialDokter={selectedDokterForResep}
                        initialDokterNama={selectedDokterNamaForResep}
                        onResepSaved={(items) => {
                            setResepAppendItems(items);
                            setActiveTab("cppt");
                        }}
                    />
                </div>

                {activeTab === "tarifTindakan" && <TarifTindakan
                    {...commonProps}
                    initialDokter={selectedDokterForResep}
                    initialDokterNama={selectedDokterNamaForResep}
                />}
                {activeTab === "diagnosa" && <Diagnosa
                    {...commonProps}
                    kdPj={rawatJalan?.kd_pj || rawatJalan?.penjab?.kd_pj || ""}
                    onDiagnosaSaved={(items) => {
                        setDiagnosaAppendItems(items);
                        setActiveTab("cppt");
                    }}
                />}
                {activeTab === "odontogram" && <OdontogramForm {...commonProps} />}
                {activeTab === "lab" && <PermintaanLab
                    {...commonProps}
                    initialDokter={selectedDokterForResep}
                    initialDokterNama={selectedDokterNamaForResep}
                />}
                {activeTab === "radiologi" && <PermintaanRadiologi {...commonProps} />}
                {activeTab === "berkasDigital" && (
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Berkas Digital</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Kelola berkas pasien berdasarkan kategori</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => loadBerkasDigital(currentNoRawat)}
                                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Muat Ulang
                                </button>
                            </div>
                            {berkasError && (
                                <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                                    {berkasError}
                                </div>
                            )}
                            {berkasLoading ? (
                                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    Memuat berkas digital...
                                </div>
                            ) : !currentNoRawat ? (
                                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    No. rawat belum tersedia.
                                </div>
                            ) : berkasCategories.length === 0 ? (
                                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    Kategori berkas digital belum tersedia.
                                </div>
                            ) : (
                                <div className="mt-4 grid grid-cols-1 xl:grid-cols-[1.1fr_1.1fr] gap-3 sm:gap-4">
                                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 sm:p-4 xl:border-purple-100 xl:dark:border-purple-900/40 xl:bg-purple-50/60 xl:dark:bg-purple-900/10">
                                        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-200 xl:text-purple-700 xl:dark:text-purple-200">
                                            <span className="hidden xl:inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white">1</span>
                                            Pilih Kategori
                                        </div>
                                        <label className="mt-3 block text-xs text-gray-600 dark:text-gray-400">Kategori</label>
                                        <select
                                            value={selectedBerkasKode}
                                            onChange={(e) => setSelectedBerkasKode(e.target.value)}
                                            className="mt-1 w-full text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-3 py-2 focus:border-purple-400 xl:border-purple-200/70 xl:dark:border-purple-900/60"
                                        >
                                            <option value="">Pilih kategori</option>
                                            {berkasCategories.map((kategori) => {
                                                const kode = String(kategori?.kode || "");
                                                const nama = kategori?.nama_berkas || kategori?.nama || kategori?.kategori || "Kategori";
                                                return (
                                                    <option key={kode || nama} value={kode}>
                                                        {kode ? `${kode} - ${nama}` : nama}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 sm:p-4 xl:border-emerald-100 xl:dark:border-emerald-900/40 xl:bg-emerald-50/60 xl:dark:bg-emerald-900/10">
                                        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-200 xl:text-emerald-700 xl:dark:text-emerald-200">
                                            <span className="hidden xl:inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">2</span>
                                            Ambil Berkas
                                        </div>
                                        <label className="mt-3 block text-xs text-gray-600 dark:text-gray-400">Berkas</label>
                                        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
                                            <input
                                                key={berkasInputKey}
                                                type="file"
                                                onChange={(e) => handleBerkasFileChange(e.target.files?.[0] || null)}
                                                accept="image/jpeg,image/png,image/webp"
                                                className="block w-full text-xs text-gray-700 dark:text-gray-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-800 dark:file:text-gray-200 xl:file:bg-emerald-100 xl:file:text-emerald-700 xl:hover:file:bg-emerald-200 xl:dark:file:bg-emerald-900/30 xl:dark:file:text-emerald-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleBerkasUpload()}
                                                disabled={berkasUploading || berkasProcessing}
                                                className={`text-xs px-4 py-2.5 rounded-lg border sm:w-auto ${berkasUploading || berkasProcessing ? "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900" : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 xl:border-blue-200 xl:dark:border-blue-700 xl:text-blue-700 xl:dark:text-blue-200 xl:hover:bg-blue-50 xl:dark:hover:bg-blue-900/30"}`}
                                            >
                                                {berkasUploading ? "Mengunggah..." : berkasProcessing ? "Mengompres..." : "Unggah"}
                                            </button>
                                        </div>
                                        <input
                                            ref={cameraFileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={(e) => handleCameraFilePick(e.target.files?.[0] || null)}
                                        />
                                        {berkasProcessing && (
                                            <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                                                Mengompres berkas...
                                            </div>
                                        )}
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setAltCameraModalOpen(true)}
                                                className="text-[11px] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 xl:border-emerald-200 xl:dark:border-emerald-700 xl:text-emerald-700 xl:dark:text-emerald-200 xl:hover:bg-emerald-50 xl:dark:hover:bg-emerald-900/30"
                                            >
                                                Buka Kamera
                                            </button>
                                        </div>
                                        <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                                            Pastikan kategori sudah dipilih sebelum unggah.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Modal
                            show={cameraModalOpen}
                            onClose={() => setCameraModalOpen(false)}
                            title="Ambil Foto"
                            size="md"
                        >
                            <div className="p-4 space-y-3">
                                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-black/90 overflow-hidden">
                                    <video
                                        ref={cameraVideoRef}
                                        className="w-full h-64 object-cover"
                                        playsInline
                                        muted
                                        autoPlay
                                    />
                                </div>
                                {cameraError && (
                                    <div className="text-xs text-red-600 dark:text-red-400">
                                        {cameraError}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={startCamera}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-200 dark:hover:bg-orange-900/20"
                                    >
                                        Coba Lagi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => cameraFileInputRef.current?.click()}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                                    >
                                        Pilih File
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCapturePhoto}
                                        disabled={cameraLoading}
                                        className={`text-xs px-3 py-1.5 rounded-lg border ${cameraLoading ? "border-blue-200 text-blue-300 dark:border-blue-900 dark:text-blue-400" : "border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-200 dark:hover:bg-blue-900/20"}`}
                                    >
                                        {cameraLoading ? "Menyiapkan..." : "Ambil Foto"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCameraModalOpen(false)}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            show={altCameraModalOpen}
                            onClose={() => setAltCameraModalOpen(false)}
                            title="Buka Kamera"
                            size="lg"
                        >
                            <div className="p-4 space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3">
                                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-black/90 overflow-hidden">
                                        <video
                                            ref={altVideoRef}
                                            className="w-full h-64 object-cover"
                                            playsInline
                                            muted
                                            autoPlay
                                        />
                                    </div>
                                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 flex flex-col justify-center items-center text-center">
                                        {altPreviewUrl ? (
                                            <img
                                                src={altPreviewUrl}
                                                alt="Preview foto"
                                                className="w-full h-64 object-contain rounded-md"
                                                onError={(event) => {
                                                    try {
                                                        URL.revokeObjectURL(event.currentTarget.src);
                                                    } catch (_) {}
                                                    setAltPreviewError("Preview foto gagal ditampilkan.");
                                                    setAltPreviewUrl("");
                                                }}
                                            />
                                        ) : (
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Preview foto akan muncul di sini.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {altPreviewError && (
                                    <div className="text-xs text-red-600 dark:text-red-400">
                                        {altPreviewError}
                                    </div>
                                )}
                                {altCameraStatus && (
                                    <div className="text-xs text-blue-600 dark:text-blue-300">
                                        {altCameraStatus}
                                    </div>
                                )}
                                {altCameraError && (
                                    <div className="text-xs text-red-600 dark:text-red-400">
                                        {altCameraError}
                                    </div>
                                )}
                                {altQualityMessage && (
                                    <div className={`text-xs ${altQualityOk ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                                        {altQualityMessage}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <div>
                                        <label className="text-[11px] text-gray-600 dark:text-gray-400">Orientasi</label>
                                        <select
                                            value={altFacingMode}
                                            onChange={(e) => setAltFacingMode(e.target.value)}
                                            className="mt-1 w-full text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-2 py-1.5"
                                        >
                                            <option value="environment">Kamera Belakang</option>
                                            <option value="user">Kamera Depan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-gray-600 dark:text-gray-400">Resolusi</label>
                                        <select
                                            value={altResolution}
                                            onChange={(e) => setAltResolution(e.target.value)}
                                            className="mt-1 w-full text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-2 py-1.5"
                                        >
                                            <option value="640x480">640x480</option>
                                            <option value="1280x720">1280x720</option>
                                            <option value="1920x1080">1920x1080</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[11px] text-gray-600 dark:text-gray-400">Flash</label>
                                        <button
                                            type="button"
                                            onClick={() => applyAltTorch(!altTorchEnabled)}
                                            disabled={!altTorchSupported || altCameraLoading}
                                            className={`mt-1 text-xs px-3 py-1.5 rounded-md border ${altTorchSupported ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/30" : "border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500"} `}
                                        >
                                            {altTorchSupported ? (altTorchEnabled ? "Flash Aktif" : "Flash Mati") : "Flash Tidak Tersedia"}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={startAltCamera}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-200 dark:hover:bg-orange-900/20"
                                    >
                                        Refresh Kamera
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAltCapturePhoto}
                                        disabled={altCameraLoading}
                                        className={`text-xs px-3 py-1.5 rounded-lg border ${altCameraLoading ? "border-blue-200 text-blue-300 dark:border-blue-900 dark:text-blue-400" : "border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-200 dark:hover:bg-blue-900/20"}`}
                                    >
                                        {altCameraLoading ? "Memproses..." : "Ambil Foto"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAltRetake}
                                        disabled={!altPreviewUrl}
                                        className={`text-xs px-3 py-1.5 rounded-lg border ${altPreviewUrl ? "border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-200 dark:hover:bg-amber-900/20" : "border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500"}`}
                                    >
                                        Ambil Ulang
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAltUsePhoto}
                                        disabled={!altCapturedFile || !altQualityOk}
                                        className={`text-xs px-3 py-1.5 rounded-lg border ${altCapturedFile && altQualityOk ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/30" : "border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500"}`}
                                    >
                                        Gunakan Foto
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => cameraFileInputRef.current?.click()}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Pilih File
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAltCameraModalOpen(false)}
                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </Modal>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h6m-6 4h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Riwayat Berkas Digital</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Daftar berkas yang sudah diunggah</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <select
                                        value={berkasSortOrder}
                                        onChange={(e) => setBerkasSortOrder(e.target.value)}
                                        className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900"
                                    >
                                        <option value="desc">Terbaru</option>
                                        <option value="asc">Terlama</option>
                                    </select>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setBerkasFilterOpen((prev) => !prev)}
                                            className={`text-xs px-3 py-1.5 rounded-lg border ${berkasFilterSelected.length > 0 ? "border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"}`}
                                        >
                                            Filter Kategori {berkasFilterSelected.length > 0 ? `(${berkasFilterSelected.length})` : ""}
                                        </button>
                                        {berkasFilterOpen && (
                                            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-3 z-20">
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">Kategori</div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setBerkasFilterSelected([])}
                                                        className="text-[11px] text-blue-600 dark:text-blue-300 hover:underline"
                                                    >
                                                        Clear All
                                                    </button>
                                                </div>
                                                <input
                                                    value={berkasFilterSearch}
                                                    onChange={(e) => setBerkasFilterSearch(e.target.value)}
                                                    placeholder="Cari kategori..."
                                                    className="mt-2 w-full text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-2 py-1.5"
                                                />
                                                <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
                                                    {filteredBerkasCategories.length === 0 ? (
                                                        <div className="text-[11px] text-gray-500 dark:text-gray-400">Kategori tidak ditemukan.</div>
                                                    ) : (
                                                        filteredBerkasCategories.map((kategori) => {
                                                            const kode = String(kategori?.kode || "");
                                                            const nama = kategori?.nama_berkas || kategori?.nama || kategori?.kategori || "Kategori";
                                                            const checked = berkasFilterSelected.includes(kode);
                                                            return (
                                                                <label key={`${kode}-${nama}`} className={`flex items-center justify-between gap-2 text-xs px-2 py-1.5 rounded-lg cursor-pointer ${checked ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200" : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                                                                    <div className="flex items-center gap-2 min-w-0">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={checked}
                                                                            onChange={() => {
                                                                                setBerkasFilterSelected((prev) => (
                                                                                    prev.includes(kode)
                                                                                        ? prev.filter((value) => value !== kode)
                                                                                        : [...prev, kode]
                                                                                ));
                                                                            }}
                                                                        />
                                                                        <span className="truncate">{kode ? `${kode} - ${nama}` : nama}</span>
                                                                    </div>
                                                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">{berkasCategoryCounts[kode] || 0}</span>
                                                                </label>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {berkasFilterSelected.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {berkasFilterSelected.map((kode) => {
                                        const kategori = berkasCategories.find((item) => String(item?.kode || "") === String(kode));
                                        const nama = kategori?.nama_berkas || kategori?.nama || kategori?.kategori || "Kategori";
                                        return (
                                            <span key={kode} className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-700">
                                                {kode ? `${kode} - ${nama}` : nama}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                            <div className="mt-4">
                                {berkasLoading ? (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Memuat riwayat berkas...
                                    </div>
                                ) : filteredBerkasItems.length === 0 ? (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Belum ada riwayat berkas digital.
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {berkasPagedItems.map((item) => {
                                            const kode = String(item?.kode || "");
                                            const kategori = berkasCategories.find((k) => String(k?.kode || "") === kode);
                                            const namaKategori = kategori?.nama_berkas || kategori?.nama || kategori?.kategori || "Kategori";
                                            const uploadDate = getBerkasUploadDate(item);
                                            const formattedUploadDate = formatBerkasUploadDate(uploadDate);
                                            const filename = getBerkasFilename(item?.lokasi_file || item?.file_url);
                                            const tooltip = `Kategori: ${namaKategori}\nKode: ${kode || "-"}\nTanggal: ${formattedUploadDate}\nFile: ${filename}`;
                                            return (
                                                <div key={`${item?.kode}-${item?.lokasi_file}`} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-semibold dark:bg-blue-900/30 dark:text-blue-300">
                                                            {kode || "-"}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                                {namaKategori}
                                                            </div>
                                                            {item?.file_url || item?.lokasi_file ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleOpenBerkas(item?.file_url || item?.lokasi_file)}
                                                                    className="text-xs text-blue-600 dark:text-blue-300 hover:underline truncate block transition-colors"
                                                                    title={tooltip}
                                                                >
                                                                    {filename}
                                                                </button>
                                                            ) : (
                                                                <span className="text-xs text-gray-400 dark:text-gray-500 truncate block">
                                                                    Berkas tidak tersedia
                                                                </span>
                                                            )}
                                                            <div className="text-[11px] text-gray-500 dark:text-gray-400">
                                                                Diunggah: {formattedUploadDate}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleBerkasDelete(item)}
                                                        className="text-xs text-red-600 dark:text-red-400 hover:underline"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        {berkasTotalPages > 1 && (
                                            <div className="flex items-center justify-between gap-3 pt-2">
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Halaman {berkasPage} dari {berkasTotalPages}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setBerkasPage((prev) => Math.max(1, prev - 1))}
                                                        disabled={berkasPage === 1}
                                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                                                    >
                                                        Sebelumnya
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setBerkasPage((prev) => Math.min(berkasTotalPages, prev + 1))}
                                                        disabled={berkasPage === berkasTotalPages}
                                                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                                                    >
                                                        Berikutnya
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    const handlePanggilPasien = async () => {
        if (poliCalling) return;
        setPoliCalling(true);
        try {
            const no_rawat = selectedNoRawat || params?.no_rawat || rawatJalan?.no_rawat || '';
            const kd_poli = rawatJalan?.kd_poli || rawatJalan?.poliklinik?.kd_poli || params?.kd_poli || '';
            const kd_dokter = rawatJalan?.kd_dokter || rawatJalan?.dokter?.kd_dokter || '';
            const payload = { no_rawat, kd_poli, kd_dokter, status: '1' };
            try {
                await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
                await new Promise(r => setTimeout(r, 150));
            } catch (_) { }
            try {
                await axios.post('/api/antrian-poli/call', payload, {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });
            } catch (_) { }
            try {
                let no_reg_bc = '';
                try {
                    const resAP = await axios.get('/api/antrian-poli', { headers: { 'Accept': 'application/json' }, withCredentials: false });
                    const dataAP = resAP?.data || {};
                    const cardsAP = Array.isArray(dataAP.cards) ? dataAP.cards : [];
                    const cardAP = cardsAP.find((c) => String(c.kd_poli || '') === String(kd_poli || '')) || null;
                    const rowAP = cardAP && Array.isArray(cardAP.upcoming)
                        ? cardAP.upcoming.find((r) => String(r.no_rawat || '') === String(no_rawat || ''))
                        : null;
                    no_reg_bc = String(rowAP?.no_reg || '');
                    if (!no_reg_bc) {
                        const h = dataAP.highlight || null;
                        if (h && String(h.kd_poli || '') === String(kd_poli || '') && String(h.no_rawat || '') === String(no_rawat || '')) {
                            no_reg_bc = String(h.no_reg || '');
                        }
                    }
                } catch (_) { }
                const bc = new BroadcastChannel('antrian-poli-call');
                bc.postMessage({
                    no_rawat,
                    kd_poli,
                    kd_dokter,
                    ts: Date.now(),
                    no_reg: no_reg_bc,
                    nm_pasien: rawatJalan?.patient?.nm_pasien || rawatJalan?.nama_pasien || '',
                    nm_poli: rawatJalan?.poliklinik?.nm_poli || rawatJalan?.nm_poli || kd_poli || '',
                    repeat: false,
                });
                bc.close();
            } catch (_) { }
        } catch (_) {
        } finally {
            setPoliCalling(false);
        }
    };

    const handleUlangPanggilPasien = async () => {
        if (poliRepeatCalling) return;
        setPoliRepeatCalling(true);
        try {
            const no_rawat = selectedNoRawat || params?.no_rawat || rawatJalan?.no_rawat || '';
            const kd_poli = rawatJalan?.kd_poli || rawatJalan?.poliklinik?.kd_poli || params?.kd_poli || '';
            const kd_dokter = rawatJalan?.kd_dokter || rawatJalan?.dokter?.kd_dokter || '';
            const payload = { no_rawat, kd_poli, kd_dokter, status: '1' };
            try {
                await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
                await new Promise(r => setTimeout(r, 150));
            } catch (_) { }
            try {
                const ck = typeof document !== 'undefined' ? document.cookie || '' : '';
                const hasSession = ck.includes('laravel_session=');
                if (hasSession) {
                    await axios.post('/api/antrian-poli/repeat', payload, {
                        withCredentials: true,
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    });
                }
            } catch (_) { }
            try {
                let no_reg_bc = '';
                try {
                    const resAP = await axios.get('/api/antrian-poli', { headers: { 'Accept': 'application/json' }, withCredentials: false });
                    const dataAP = resAP?.data || {};
                    const cardsAP = Array.isArray(dataAP.cards) ? dataAP.cards : [];
                    const cardAP = cardsAP.find((c) => String(c.kd_poli || '') === String(kd_poli || '')) || null;
                    const rowAP = cardAP && Array.isArray(cardAP.upcoming)
                        ? cardAP.upcoming.find((r) => String(r.no_rawat || '') === String(no_rawat || ''))
                        : null;
                    no_reg_bc = String(rowAP?.no_reg || '');
                    if (!no_reg_bc) {
                        const h = dataAP.highlight || null;
                        if (h && String(h.kd_poli || '') === String(kd_poli || '') && String(h.no_rawat || '') === String(no_rawat || '')) {
                            no_reg_bc = String(h.no_reg || '');
                        }
                    }
                } catch (_) { }
                const bc = new BroadcastChannel('antrian-poli-call');
                bc.postMessage({
                    no_rawat,
                    kd_poli,
                    kd_dokter,
                    ts: Date.now(),
                    no_reg: no_reg_bc,
                    nm_pasien: rawatJalan?.patient?.nm_pasien || rawatJalan?.nama_pasien || '',
                    nm_poli: rawatJalan?.poliklinik?.nm_poli || rawatJalan?.nm_poli || kd_poli || '',
                    repeat: true,
                });
                bc.close();
            } catch (_) { }
        } catch (_) {
        } finally {
            setPoliRepeatCalling(false);
        }
    };

    const handleOpenSurat = () => {
        if (!currentNoRawat) return;
        router.visit(route("rawat-jalan.surat-sehat", currentNoRawat));
    };

    const openSoapHistoryModal = async (showAll = false) => {
        setSoapModalOpen(true);
        setSoapModalLoading(true);
        setSoapModalError("");
        try {
            const token =
                typeof window !== "undefined"
                    ? new URLSearchParams(window.location.search).get("t")
                    : "";
            const noRkmMedis =
                params?.no_rkm_medis || rawatJalan?.patient?.no_rkm_medis || "";
            const qs = token
                ? `t=${encodeURIComponent(token)}`
                : `no_rkm_medis=${encodeURIComponent(noRkmMedis)}`;
            const res = await fetch(`/rawat-jalan/riwayat?${qs}`, {
                headers: { Accept: "application/json" },
            });
            const json = await res.json();
            let arr = Array.isArray(json.data) ? json.data : [];
            arr = arr
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.tgl_registrasi || 0) -
                        new Date(a.tgl_registrasi || 0)
                );
            if (!showAll) {
                arr = arr.slice(0, 6);
            }
            setSoapShowAll(showAll);
            const results = await Promise.all(
                arr.map(async (v) => {
                    try {
                        const qsSoap = token
                            ? `t=${encodeURIComponent(token)}`
                            : `no_rawat=${encodeURIComponent(v.no_rawat)}`;
                        const url = `/rawat-jalan/pemeriksaan-ralan?${qsSoap}`;
                        const r = await fetch(url, { headers: { Accept: 'application/json' } });
                        const j = await r.json();
                        const list = Array.isArray(j.data) ? j.data : [];
                        const filtered =
                            list &&
                                list.length &&
                                list.some((row) =>
                                    Object.prototype.hasOwnProperty.call(
                                        row,
                                        "no_rawat"
                                    )
                                )
                                ? list.filter(
                                    (row) =>
                                        String(row.no_rawat) ===
                                        String(v.no_rawat)
                                )
                                : list;
                        const parse = (x) => {
                            const d = x.tgl_perawatan || "";
                            const t =
                                typeof x.jam_rawat === "string"
                                    ? x.jam_rawat
                                    : "";
                            const iso = `${d}T${(t.length === 5 ? `${t}:00` : t) || "00:00:00"
                                }`;
                            const dt = new Date(iso);
                            return isNaN(dt.getTime()) ? new Date() : dt;
                        };
                        const sorted = filtered
                            .slice()
                            .sort((a, b) => parse(b) - parse(a));
                        const latest = sorted[0] || null;
                        const times = filtered
                            .map((row) => {
                                const s =
                                    typeof row.jam_rawat === "string"
                                        ? row.jam_rawat.trim()
                                        : "";
                                return s ? s.substring(0, 5) : "";
                            })
                            .filter(Boolean)
                            .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
                        return {
                            no_rawat: v.no_rawat,
                            tgl_registrasi: v.tgl_registrasi,
                            latest,
                            cpptCount: filtered.length,
                            cpptTimes: times,
                            entries: sorted,
                        };
                    } catch (_) {
                        return null;
                    }
                })
            );
            setSoapModalItems(results.filter(Boolean));
        } catch (e) {
            setSoapModalError(e.message || "Gagal memuat riwayat SOAP");
            setSoapModalItems([]);
        } finally {
            setSoapModalLoading(false);
        }
    };

    useEffect(() => {
        const loadPegawaiNames = async () => {
            try {
                const pending = [];
                const seen = new Set();
                for (const h of soapModalItems) {
                    const allNips = [];
                    if (h?.latest?.nip) allNips.push(h.latest.nip);
                    const entries = Array.isArray(h?.entries) ? h.entries : [];
                    for (const e of entries) {
                        if (e?.nip) allNips.push(e.nip);
                    }
                    for (const nip of allNips) {
                        if (!nip) continue;
                        if (pegawaiNameMap && pegawaiNameMap[nip]) continue;
                        if (seen.has(nip)) continue;
                        seen.add(nip);
                        try {
                            const url = route('pegawai.search', { q: nip });
                            pending.push(fetch(url).then(r => r.json()).then(json => {
                                const arr = Array.isArray(json?.data) ? json.data : [];
                                const match = arr.find(row => String(row.nik) === String(nip)) || null;
                                const nama = match ? (match.nama || match.nm_pegawai || '').trim() : '';
                                if (nama && match) {
                                    setPegawaiNameMap((prev) => ({ ...prev, [nip]: nama }));
                                }
                            }).catch(() => { }));
                        } catch (_) { }
                    }
                }
                if (pending.length) {
                    await Promise.allSettled(pending);
                }
            } catch (_) { }
        };
        loadPegawaiNames();
    }, [soapModalItems]);

    useEffect(() => {
        setSoapPage(1);
    }, [soapModalItems]);

    const openCpptFromHistory = (nr) => {
        setSelectedNoRawat(nr);
        setActiveTab("cppt");
        setSoapModalOpen(false);
        setTimeout(() => {
            const el = document.getElementById("cppt-root");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    const SOAP_PAGE_SIZE = 5;
    const soapTotalRows = soapModalItems.reduce(
        (acc, curr) =>
            acc + (Array.isArray(curr.entries) ? curr.entries.length : 0),
        0
    );
    const soapTotalPages = Math.max(
        1,
        Math.ceil(soapTotalRows / SOAP_PAGE_SIZE || 1)
    );
    const soapCurrentPage =
        soapPage < 1
            ? 1
            : soapPage > soapTotalPages
                ? soapTotalPages
                : soapPage;
    const soapPageStart = (soapCurrentPage - 1) * SOAP_PAGE_SIZE;
    const soapPageEnd = soapPageStart + SOAP_PAGE_SIZE;

    const ErrorMessage = ({ message, onRetry }) => (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        Terjadi Kesalahan
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1 break-words">
                        {message}
                    </p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors flex-shrink-0"
                    >
                        Coba Lagi
                    </button>
                )}
            </div>
        </div>
    );

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoSaveStatus) {
                setTimeout(() => setAutoSaveStatus(""), 3000);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [autoSaveStatus]);

    return (
        <LayoutUtama
            title="Rawat Jalan"
            left={<LanjutanRalanSidebar title="Lanjutan Rawat Jalan" context="ralan" menuConfig={{ activeTab, onTabChange: handleTabChange }} />}
        >
            <Head
                title={`Lanjutan Rawat Jalan${params?.no_rawat ? " - " + params.no_rawat : ""
                    }`}
            />

            <div className="px-3 sm:px-5 lg:px-6 py-6 w-full overflow-x-hidden mx-auto max-w-[1800px]">
                <div className="mb-1">
                    <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 rounded-lg p-2 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-white/20 backdrop-blur rounded-lg">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">
                                        Pelayanan Rawat Jalan
                                    </h1>
                                </div>
                            </div>
                            {autoSaveStatus && (
                                <div className="bg-white/20 backdrop-blur border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-blue-200"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium text-white">
                                        {autoSaveStatus}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation for Menu Pemeriksaan dihilangkan sesuai permintaan */}

                {/* Main Content Area - two columns 50:50 (riwayat : input) */}
                {/* Note: Sidebar (first column) is handled by LanjutanRalanLayout */}
                <div className={`grid grid-cols-1 ${openAcc.pemeriksaan ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6 w-full max-w-full min-w-0 overflow-x-hidden items-stretch`}>
                    {/* Left Column - Riwayat Perawatan (scrollable) */}
                    <div className={`transition-all duration-300 w-full max-w-full min-w-0 lg:overflow-auto self-start ${openAcc.pemeriksaan ? 'lg:col-span-3' : 'hidden lg:hidden'}`}>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300 flex flex-col">
                            <div className={`bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${openAcc.pemeriksaan ? "px-4 py-3" : "px-2 py-3"
                                }`}>
                                <button
                                    onClick={() => toggle("pemeriksaan")}
                                    className={`w-full group hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center justify-between text-left p-2`}
                                    title={openAcc.pemeriksaan ? "Sembunyikan Riwayat" : "Tampilkan Riwayat"}
                                >
                                    <div className={`flex items-center gap-3 transition-all duration-300`}>
                                        <div
                                            className={`w-3 h-3 rounded-full transition-colors flex-shrink-0 ${openAcc.pemeriksaan
                                                ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                                                : "bg-gray-400"
                                                }`}
                                        ></div>
                                        <svg
                                            className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            />
                                        </svg>
                                        {openAcc.pemeriksaan && (
                                            <div className="transition-all duration-300">
                                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    Riwayat Perawatan
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    History pemeriksaan
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {openAcc.pemeriksaan && (
                                        <svg
                                            className="w-5 h-5 text-gray-500 transition-transform duration-200 rotate-180 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    )}
                                    {!openAcc.pemeriksaan && (
                                        <svg
                                            className="w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="block px-2 py-0.5 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-[11px] font-medium text-gray-800 dark:text-gray-200 mb-1">
                                    Identitas Pasien
                                </div>
                                <div className="space-y-0 text-[12px] leading-tight">
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Nama</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white font-semibold">{rawatJalan?.patient?.nm_pasien || rawatJalan?.nama_pasien || '-'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">No RM (rekamedis)</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white font-mono">{rawatJalan?.patient?.no_rkm_medis || rawatJalan?.no_rkm_medis || '-'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Skrining Visual</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        {loadingSkriningVisual || !skriningVisual?.hasil_skrining ? (
                                            <span className="text-gray-900 dark:text-white font-semibold">-</span>
                                        ) : (
                                            <span className={getSkriningBadgeClasses(skriningVisual?.hasil_skrining)}>{skriningVisual?.hasil_skrining}</span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Skor Resiko Jatuh</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white font-semibold">{loadingSkriningVisual ? '-' : (skriningVisual?.skor_resiko_jatuh || '-')}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Umur</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white">{(rawatJalan?.patient?.umur || rawatJalan?.umurdaftar) ? `${rawatJalan?.patient?.umur || rawatJalan?.umurdaftar} ${rawatJalan?.sttsumur || 'Th'}` : '-'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">JK</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white">{rawatJalan?.patient?.jk || '-'}</span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Alamat</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white break-words">
                                            {[
                                                rawatJalan?.patient?.alamat,
                                                rawatJalan?.patient?.kelurahan?.nm_kel || rawatJalan?.patient?.kd_kel,
                                                rawatJalan?.patient?.kecamatan?.nm_kec || rawatJalan?.patient?.kd_kec,
                                                rawatJalan?.patient?.kabupaten?.nm_kab || rawatJalan?.patient?.kd_kab,
                                            ].filter(Boolean).join(', ') || '-'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="text-left text-gray-700 dark:text-gray-300">Cara bayar</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span>
                                            {(() => {
                                                const penjamin =
                                                    rawatJalan?.nm_penjamin ||
                                                    rawatJalan?.penjab?.png_jawab ||
                                                    rawatJalan?.png_jawab ||
                                                    rawatJalan?.cara_bayar;

                                                if (!penjamin) {
                                                    return null;
                                                }

                                                const isBpjs = penjamin
                                                    .toUpperCase()
                                                    .includes('BPJS');

                                                return (
                                                    <div
                                                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${isBpjs
                                                            ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700'
                                                            : 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700'
                                                            }`}
                                                    >
                                                        {penjamin}
                                                    </div>
                                                );
                                            })()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-[7.5rem_0.75rem_1fr] md:grid-cols-[8.5rem_0.9rem_1fr] items-baseline gap-x-0.5">
                                        <span className="block mb-1 text-left text-gray-700 dark:text-gray-300">Kunjung Terakhir</span>
                                        <span className="text-gray-400 text-center">:</span>
                                        <span className="text-gray-900 dark:text-white">
                                            {typeof lastVisitDays === 'number' ? `${lastVisitDays} hari` : '-'}
                                        </span>
                                    </div>
                                    <div className="mt-2 mb-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button
                                                onClick={handlePanggilPasien}
                                                disabled={poliCalling}
                                                className={`text-xs px-3 py-1.5 rounded border ${poliCalling ? 'bg-green-100 text-green-400 border-green-200' : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'}`}
                                                title="Panggil pasien"
                                            >
                                                {poliCalling ? 'Memanggil...' : 'Panggil'}
                                            </button>
                                            <button
                                                onClick={handleUlangPanggilPasien}
                                                disabled={poliRepeatCalling}
                                                className={`text-xs px-3 py-1.5 rounded border ${poliRepeatCalling ? 'bg-amber-100 text-amber-400 border-amber-200' : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'}`}
                                                title="Ulang panggil pasien"
                                            >
                                                {poliRepeatCalling ? 'Mengulang...' : 'Ulang panggil'}
                                            </button>
                                            <button
                                                onClick={handleOpenSurat}
                                                disabled={!currentNoRawat}
                                                className="text-xs px-3 py-1.5 rounded border bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 disabled:opacity-60"
                                                title="Buat surat (pilih Surat Sehat / Surat Sakit)"
                                            >
                                                Surat
                                            </button>
                                            <button
                                                onClick={() => setBerkasModalOpen(true)}
                                                className="text-xs px-3 py-1.5 rounded border bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 flex items-center gap-1"
                                            >
                                                Berkas Lain
                                                <ChevronDown className="w-3 h-3" />
                                            </button>

                                            {/* Berkas Lain Modal */}
                                            <Modal
                                                show={berkasModalOpen}
                                                onClose={() => setBerkasModalOpen(false)}
                                                title="Menu Berkas Lain"
                                                size="sm"
                                            >
                                                <div className="p-4 grid grid-cols-1 gap-3">
                                                    <button
                                                        onClick={() => {
                                                            alert('Fitur Upload Berkas dalam pengembangan');
                                                            setBerkasModalOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                                                    >
                                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                            <Upload className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">Upload Berkas</div>
                                                            <div className="text-xs text-gray-500">Unggah dokumen pendukung</div>
                                                        </div>
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            alert('Fitur Lihat Berkas dalam pengembangan');
                                                            setBerkasModalOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                                                    >
                                                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">Lihat Berkas</div>
                                                            <div className="text-xs text-gray-500">Lihat riwayat berkas pasien</div>
                                                        </div>
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            alert('Fitur Resume Medis dalam pengembangan');
                                                            setBerkasModalOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                                                    >
                                                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                                            <File className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">Resume Medis</div>
                                                            <div className="text-xs text-gray-500">Buat atau lihat resume medis</div>
                                                        </div>
                                                    </button>
                                                </div>
                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
                                                    <button
                                                        type="button"
                                                        onClick={() => setBerkasModalOpen(false)}
                                                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                                    >
                                                        Tutup
                                                    </button>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {openAcc.pemeriksaan && (
                                <div className="p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                                            Riwayat Kunjungan
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenAcc((prev) => ({
                                                    ...prev,
                                                    kunjungan: !prev.kunjungan,
                                                }))
                                            }
                                            className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            title={
                                                openAcc.kunjungan
                                                    ? "Sembunyikan daftar kunjungan"
                                                    : "Tampilkan daftar kunjungan"
                                            }
                                        >
                                            <svg
                                                className={`w-3 h-3 transition-transform duration-200 ${openAcc.kunjungan ? "rotate-180" : ""
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    {openAcc.kunjungan && (
                                        <RiwayatPerawatan
                                            token={
                                                typeof window !== "undefined"
                                                    ? new URLSearchParams(
                                                        window.location.search
                                                    ).get("t")
                                                    : ""
                                            }
                                            noRkmMedis={
                                                params?.no_rkm_medis ||
                                                rawatJalan?.patient?.no_rkm_medis
                                            }
                                            onSelectNoRawat={setSelectedNoRawat}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Input Form Content (50%) */}
                    <div className={`transition-all duration-300 w-full max-w-full overflow-x-hidden min-w-0 ${openAcc.pemeriksaan ? 'lg:col-span-9' : ''} flex flex-col h-full`}>
                        {!openAcc.pemeriksaan && (
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => toggle('pemeriksaan')}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                                    title="Tampilkan Riwayat Perawatan"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    Tampilkan Riwayat
                                </button>
                            </div>
                        )}
                        <div className="space-y-4 w-full max-w-full overflow-x-hidden h-full">
                            {/* Tab Content Header */}
                            {activeTab !== 'cppt' && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                {
                                                    menuTabs.find(
                                                        (tab) =>
                                                            tab.key === activeTab
                                                    )?.icon
                                                }
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {
                                                        menuTabs.find(
                                                            (tab) =>
                                                                tab.key ===
                                                                activeTab
                                                        )?.title
                                                    }
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                                                    {
                                                        menuTabs.find(
                                                            (tab) =>
                                                                tab.key ===
                                                                activeTab
                                                        )?.subtitle
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tab Content */}
                            <div className="w-full max-w-full overflow-x-hidden h-full">
                                {isLoading ? (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-12">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                                Memuat...
                                            </span>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                                        <ErrorMessage
                                            message={error}
                                            onRetry={() => {
                                                setError(null);
                                                setIsLoading(true);
                                                setTimeout(
                                                    () => setIsLoading(false),
                                                    1000
                                                );
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full max-w-full overflow-x-hidden h-full">
                                        {renderActiveTabContent()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {soapModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSoapModalOpen(false)}
                    ></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[90vw] mx-2 sm:mx-4 my-4 sm:my-8 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Riwayat SOAP</h3>
                            <button
                                onClick={() => setSoapModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3 sm:p-4 space-y-2">
                            {soapModalLoading ? (
                                <div className="text-xs text-gray-500">Memuat...</div>
                            ) : soapModalError ? (
                                <div className="text-xs text-red-600 dark:text-red-400">{soapModalError}</div>
                            ) : soapModalItems.length === 0 ? (
                                <div className="text-xs text-gray-500">Tidak ada data</div>
                            ) : (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 md:p-6">
                                    <div className="flex items-center justify-between mb-4 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 rounded">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            Riwayat SOAP
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openSoapHistoryModal(!soapShowAll)}
                                                aria-pressed={soapShowAll}
                                                className={`text-xs px-3 py-1 rounded border transition-colors ${soapShowAll
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
                                                    }`}
                                                title="Tampilkan semua riwayat SOAP"
                                            >
                                                Semua record
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openSoapHistoryModal(false)}
                                                aria-pressed={!soapShowAll}
                                                className={`text-xs px-3 py-1 rounded border transition-colors ${!soapShowAll
                                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                                        : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
                                                    }`}
                                                title="Tampilkan 6 riwayat terakhir"
                                            >
                                                6 Record
                                            </button>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setSoapViewMode('table')}
                                                    className={`px-2 py-1 text-[11px] rounded border ${soapViewMode === 'table' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                                    title="Tampilan Tabel"
                                                >
                                                    Tabel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSoapViewMode('compact')}
                                                    className={`px-2 py-1 text-[11px] rounded border ${soapViewMode === 'compact' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                                    title="Tampilan Kartu"
                                                >
                                                    Kartu
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSoapViewMode('full')}
                                                    className={`px-2 py-1 text-[11px] rounded border ${soapViewMode === 'full' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}`}
                                                    title="Tampilan Lengkap"
                                                >
                                                    Lengkap
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {soapViewMode === 'table' ? (
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full">
                                            <div className="overflow-x-auto lg:overflow-x-hidden w-full max-w-full">
                                                <table className="w-full text-xs table-auto">
                                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                        <tr className="text-left text-gray-600 dark:text-gray-300">
                                                            <th className="px-3 py-2 font-bold w-44 lg:w-auto">Tanggal</th>
                                                            <th className="px-3 py-2 font-bold w-56 lg:w-auto">Keluhan (Subjektif)</th>
                                                            <th className="px-3 py-2 font-bold min-w-[9rem] w-28 lg:w-auto">TTV</th>
                                                            <th className="px-3 py-2 font-bold w-56 lg:w-auto">Pemeriksaan Fisik (Objektif)</th>
                                                            <th className="px-3 py-2 font-bold w-48 lg:w-auto">Penilaian (Assessment)</th>
                                                            <th className="px-3 py-2 font-bold w-48 lg:w-auto">Tindak Lanjut (Planning)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        {(() => {
                                                            let rowIndex = -1;
                                                            return soapModalItems.map((h) => {
                                                                let tanggal = '-';
                                                                try {
                                                                    if (typeof h.no_rawat === 'string') {
                                                                        const m = h.no_rawat.match(/^(\d{4})\/(\d{2})\/(\d{2})\//);
                                                                        if (m) {
                                                                            const y = m[1];
                                                                            const mm = m[2];
                                                                            const dd = m[3];
                                                                            const dt = new Date(`${y}-${mm}-${dd}T00:00:00`);
                                                                            tanggal = dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                        } else if (h.tgl_registrasi) {
                                                                            tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                        }
                                                                    } else if (h.tgl_registrasi) {
                                                                        tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                    }
                                                                } catch (_) { }
                                                                return (
                                                                    <React.Fragment key={`${h.no_rawat}-group`}>
                                                                        {Array.isArray(h.entries) && h.entries.length > 0 &&
                                                                            h.entries
                                                                                .slice()
                                                                                .sort((a, b) => {
                                                                                    const aa = String(a.jam_rawat || '').substring(0, 5);
                                                                                    const bb = String(b.jam_rawat || '').substring(0, 5);
                                                                                    return aa < bb ? 1 : aa > bb ? -1 : 0;
                                                                                })
                                                                                .map((e, i) => {
                                                                                    rowIndex += 1;
                                                                                    if (rowIndex < soapPageStart || rowIndex >= soapPageEnd) {
                                                                                        return null;
                                                                                    }
                                                                                    return (
                                                                                        <tr key={`${h.no_rawat}-e-${i}`} className="bg-white dark:bg-gray-900/40 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                                                            <td className="px-3 py-2 text-gray-900 dark:text-white">
                                                                                                <div className="space-y-0.5">
                                                                                                    <div className="font-mono">
                                                                                                        {tanggal} {(typeof e.jam_rawat === 'string' && e.jam_rawat.trim()) ? e.jam_rawat.trim().substring(0, 5) : '-'}
                                                                                                    </div>
                                                                                                    <div className="text-[11px] font-mono text-gray-900 dark:text-white">{h.no_rawat || '-'}</div>
                                                                                                    <div className="text-[11px] truncate">{(e?.nip && pegawaiNameMap[e.nip]) || '-'}</div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                                                                                <div className="break-words whitespace-normal" title={typeof e.keluhan === 'string' ? e.keluhan.trim() : ''}>
                                                                                                    {(typeof e.keluhan === 'string' && e.keluhan.trim()) ? e.keluhan.trim() : '-'}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700 dark:text-gray-300 min-w-[9rem]">
                                                                                                <div className="space-y-0.5 text-[11px] leading-tight">
                                                                                                    <div className="flex justify-between gap-2">
                                                                                                        <span className="text-gray-500 whitespace-nowrap">Suhu</span>
                                                                                                        <span className="text-right">{e.suhu_tubuh || '-'}°C</span>
                                                                                                    </div>
                                                                                                    <div className="flex justify-between gap-2">
                                                                                                        <span className="text-gray-500 whitespace-nowrap">Tensi</span>
                                                                                                        <span className="text-right">{e.tensi || '-'}</span>
                                                                                                    </div>
                                                                                                    <div className="flex justify-between gap-2">
                                                                                                        <span className="text-gray-500 whitespace-nowrap">Nadi</span>
                                                                                                        <span className="text-right">{e.nadi || '-'}/min</span>
                                                                                                    </div>
                                                                                                    <div className="flex justify-between gap-2">
                                                                                                        <span className="text-gray-500 whitespace-nowrap">SpO2</span>
                                                                                                        <span className="text-right">{e.spo2 || '-'}%</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                                                                                <div className="break-words whitespace-normal" title={typeof e.pemeriksaan === 'string' ? e.pemeriksaan.trim() : ''}>
                                                                                                    {(typeof e.pemeriksaan === 'string' && e.pemeriksaan.trim()) ? e.pemeriksaan.trim() : '-'}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                                                                                <div className="break-words whitespace-normal" title={typeof e.penilaian === 'string' ? e.penilaian.trim() : ''}>
                                                                                                    {(typeof e.penilaian === 'string' && e.penilaian.trim()) ? e.penilaian.trim() : '-'}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                                                                                <div className="break-words whitespace-normal" title={(() => {
                                                                                                    const s = typeof e.rtl === 'string' ? e.rtl.trim() : '';
                                                                                                    const i = typeof e.instruksi === 'string' ? e.instruksi.trim() : '';
                                                                                                    const v = typeof e.evaluasi === 'string' ? e.evaluasi.trim() : '';
                                                                                                    return s || i || v || '';
                                                                                                })()}>
                                                                                                    {(() => {
                                                                                                        const s = typeof e.rtl === 'string' ? e.rtl.trim() : '';
                                                                                                        const i = typeof e.instruksi === 'string' ? e.instruksi.trim() : '';
                                                                                                        const v = typeof e.evaluasi === 'string' ? e.evaluasi.trim() : '';
                                                                                                        return s || i || v || '-';
                                                                                                    })()}
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    );
                                                                                })}
                                                                    </React.Fragment>
                                                                );
                                                            });
                                                        })()}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300">
                                                <span>
                                                    {soapTotalRows === 0
                                                        ? "Tidak ada data"
                                                        : `Menampilkan ${soapPageStart + 1}-${Math.min(soapPageEnd, soapTotalRows)} dari ${soapTotalRows} data`}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSoapPage((p) => Math.max(1, p - 1))}
                                                        disabled={soapCurrentPage <= 1}
                                                        className={`px-2 py-1 rounded border text-[11px] ${soapCurrentPage <= 1
                                                            ? "bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600 cursor-not-allowed"
                                                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                                                            }`}
                                                    >
                                                        Sebelumnya
                                                    </button>
                                                    <span>
                                                        Hal {soapCurrentPage} / {soapTotalPages}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSoapPage((p) => Math.min(soapTotalPages, p + 1))}
                                                        disabled={soapCurrentPage >= soapTotalPages}
                                                        className={`px-2 py-1 rounded border text-[11px] ${soapCurrentPage >= soapTotalPages
                                                            ? "bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600 cursor-not-allowed"
                                                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                                                            }`}
                                                    >
                                                        Berikutnya
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {soapModalItems.map((h) => {
                                                const latest = h.latest || {};
                                                let tanggal = '-';
                                                try {
                                                    if (typeof h.no_rawat === 'string') {
                                                        const m = h.no_rawat.match(/^(\d{4})\/(\d{2})\/(\d{2})\//);
                                                        if (m) {
                                                            const y = m[1];
                                                            const mm = m[2];
                                                            const dd = m[3];
                                                            const dt = new Date(`${y}-${mm}-${dd}T00:00:00`);
                                                            tanggal = dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                        } else if (h.tgl_registrasi) {
                                                            tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                        }
                                                    } else if (h.tgl_registrasi) {
                                                        tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                    }
                                                } catch (_) { }
                                                const countDisplay = (() => {
                                                    if (Array.isArray(h.entries)) {
                                                        const seen = new Set();
                                                        for (const e of h.entries) {
                                                            const t = String(e.jam_rawat || '').substring(0, 5);
                                                            if (!t) continue;
                                                            seen.add(t);
                                                        }
                                                        return seen.size || h.entries.length;
                                                    } else if (Array.isArray(h.cpptTimes)) {
                                                        const uniq = new Set(h.cpptTimes.filter(Boolean));
                                                        return uniq.size;
                                                    }
                                                    return Number(h.cpptCount || 0);
                                                })();
                                                return (
                                                    <div key={`${h.no_rawat}-card`} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                                        <div className="grid grid-cols-1 md:grid-cols-[14rem_12rem_1fr] gap-3 items-start">
                                                            <div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{tanggal}</div>
                                                                    <span className="text-[11px] text-gray-700 dark:text-gray-300">{countDisplay} data</span>
                                                                </div>
                                                                <div className="mt-1 space-y-0.5 text-[11px] leading-tight">
                                                                    <div className="grid grid-cols-[6.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                                                        <span className="text-gray-600 dark:text-gray-300">No. Rawat</span>
                                                                        <span className="text-gray-400 text-center">:</span>
                                                                        <span className="font-mono text-gray-900 dark:text-white">{h.no_rawat || '-'}</span>
                                                                    </div>
                                                                    <div className="grid grid-cols-[6.5rem_0.75rem_1fr] items-baseline gap-x-0.5">
                                                                        <span className="text-gray-600 dark:text-gray-300">CPPT</span>
                                                                        <span className="text-gray-400 text-center">:</span>
                                                                        <span className="text-gray-700 dark:text-gray-300 truncate">{`${(Array.isArray(h.entries) ? h.entries.length : (Array.isArray(h.cpptTimes) ? [...new Set(h.cpptTimes)].length : Number(h.cpptCount || 0)))} data${(h.cpptTimes && h.cpptTimes.length) ? ' — ' + h.cpptTimes.join(' , ') : ''}`}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-1">
                                                                </div>
                                                            </div>
                                                            <div className="text-gray-700 dark:text-gray-300">
                                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                                    <div className="text-gray-500">Suhu</div>
                                                                    <div className="font-medium text-right">{latest.suhu_tubuh || '-'}°C</div>
                                                                    <div className="text-gray-500">Tensi</div>
                                                                    <div className="font-medium text-right">{latest.tensi || '-'}</div>
                                                                    <div className="text-gray-500">Nadi</div>
                                                                    <div className="font-medium text-right">{latest.nadi || '-'}/min</div>
                                                                    <div className="text-gray-500">SpO2</div>
                                                                    <div className="font-medium text-right">{latest.spo2 || '-'}%</div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                    {h.cpptCount ? (latest.kesadaran || 'Compos Mentis') : '-'}
                                                                </span>
                                                                <div className="mt-1 text-gray-700 dark:text-gray-300">
                                                                    {(() => {
                                                                        const keluhanText = typeof latest.keluhan === 'string' ? latest.keluhan.trim() : '';
                                                                        return (
                                                                            <div className="truncate whitespace-nowrap" title={keluhanText}>
                                                                                {keluhanText || '-'}
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {Array.isArray(h.entries) && h.entries.length > 0 && (
                                                            <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                                                                {(() => {
                                                                    const uniq = [];
                                                                    const seen = new Set();
                                                                    for (const e of (Array.isArray(h.entries) ? h.entries : [])) {
                                                                        const t = String(e.jam_rawat || '').substring(0, 5);
                                                                        if (seen.has(t)) continue;
                                                                        seen.add(t);
                                                                        uniq.push(e);
                                                                    }
                                                                    return uniq.slice().sort((a, b) => {
                                                                        const aa = String(a.jam_rawat || '').substring(0, 5);
                                                                        const bb = String(b.jam_rawat || '').substring(0, 5);
                                                                        return aa < bb ? 1 : aa > bb ? -1 : 0;
                                                                    }).map((e, i) => (
                                                                        <div key={`${h.no_rawat}-cv-${i}`} className="grid grid-cols-[14rem_12rem_1fr] gap-2 py-1">
                                                                            <div className="text-gray-900 dark:text-white">
                                                                                <div className="space-y-0.5">
                                                                                    <div className="font-mono">
                                                                                        {`${tanggal} ${(typeof e.jam_rawat === 'string' && e.jam_rawat.trim()) ? e.jam_rawat.trim().substring(0, 5) : '-'}`}
                                                                                    </div>
                                                                                    <div className="text-[11px] font-mono text-gray-900 dark:text-white">{h.no_rawat || '-'}</div>
                                                                                    <div className="text-[11px] truncate">{(e?.nip && pegawaiNameMap[e.nip]) || '-'}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-gray-700 dark:text-gray-300">
                                                                                <div className="grid grid-cols-2 gap-x-1">
                                                                                    <div className="text-gray-500 text-[11px]">Suhu</div>
                                                                                    <div className="text-right text-[11px]">{e.suhu_tubuh || '-'}°C</div>
                                                                                    <div className="text-gray-500 text-[11px]">Tensi</div>
                                                                                    <div className="text-right text-[11px]">{e.tensi || '-'}</div>
                                                                                    <div className="text-gray-500 text-[11px]">Nadi</div>
                                                                                    <div className="text-right text-[11px]">{e.nadi || '-'}/min</div>
                                                                                    <div className="text-gray-500 text-[11px]">SpO2</div>
                                                                                    <div className="text-right text-[11px]">{e.spo2 || '-'}%</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-gray-700 dark:text-gray-300">
                                                                                <div className="break-words whitespace-normal" title={typeof e.keluhan === 'string' ? e.keluhan.trim() : ''}>
                                                                                    {(typeof e.keluhan === 'string' && e.keluhan.trim()) ? e.keluhan.trim() : '-'}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ));
                                                                })()}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {soapViewMode === 'full' && (
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full">
                                            <div className="overflow-x-auto lg:overflow-x-hidden overflow-y-auto max-h-[376px] w-full max-w-full">
                                                <table className="w-full text-xs table-auto">
                                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                        <tr className="text-left text-gray-600 dark:text-gray-300">
                                                            <th className="px-3 py-2 font-bold w-44 lg:w-auto">Tanggal</th>
                                                            <th className="px-3 py-2 font-bold w-56 lg:w-auto">Keluhan (Subjektif)</th>
                                                            <th className="px-3 py-2 font-bold w-28 lg:w-auto">TTV</th>
                                                            <th className="px-3 py-2 font-bold w-64 lg:w-auto">Pemeriksaan</th>
                                                            <th className="px-3 py-2 font-bold w-48 lg:w-auto">Penilaian</th>
                                                            <th className="px-3 py-2 font-bold text-center w-28 lg:w-auto">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        {soapModalItems.map((h) => {
                                                            const latest = h.latest || {};
                                                            let tanggal = '-';
                                                            try {
                                                                if (typeof h.no_rawat === 'string') {
                                                                    const m = h.no_rawat.match(/^(\d{4})\/(\d{2})\/(\d{2})\//);
                                                                    if (m) {
                                                                        const y = m[1];
                                                                        const mm = m[2];
                                                                        const dd = m[3];
                                                                        const dt = new Date(`${y}-${mm}-${dd}T00:00:00`);
                                                                        tanggal = dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                    } else if (h.tgl_registrasi) {
                                                                        tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                    }
                                                                } else if (h.tgl_registrasi) {
                                                                    tanggal = new Date(h.tgl_registrasi).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                                                                }
                                                            } catch (_) { }
                                                            return (
                                                                <tr key={`${h.no_rawat}-full`}>
                                                                    <td className="px-3 py-2 w-44">
                                                                        <div className="flex items-baseline gap-2">
                                                                            <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">{`${tanggal} — ${h.no_rawat || '-'}`}</div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-64">
                                                                        <div className="break-words whitespace-normal" title={typeof latest.keluhan === 'string' ? latest.keluhan.trim() : ''}>
                                                                            {(typeof latest.keluhan === 'string' && latest.keluhan.trim()) ? latest.keluhan.trim() : '-'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-28">
                                                                        <div className="space-y-0.5 text-[11px]">
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Suhu:</span>
                                                                                <span className="font-medium">{latest.suhu_tubuh || '-'}°C</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Tensi:</span>
                                                                                <span className="font-medium">{latest.tensi || '-'}</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Nadi:</span>
                                                                                <span className="font-medium">{latest.nadi || '-'}/min</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">SpO2:</span>
                                                                                <span className="font-medium">{latest.spo2 || '-'}%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-64">
                                                                        <div className="break-words whitespace-normal" title={latest.pemeriksaan || ''}>
                                                                            {latest.pemeriksaan || '-'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-gray-700 dark:text-gray-300 w-48">
                                                                        <div className="break-words whitespace-normal" title={latest.penilaian || ''}>
                                                                            {latest.penilaian || '-'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-2 w-28">
                                                                        <div className="flex items-center justify-center">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => openCpptFromHistory(h.no_rawat)}
                                                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                                                                            >
                                                                                Buka
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={openSoapHistoryModal}
                                className="text-[11px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700"
                            >
                                Muat
                            </button>
                            <button
                                type="button"
                                onClick={() => setSoapModalOpen(false)}
                                className="text-[11px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </LayoutUtama>
    );
}
