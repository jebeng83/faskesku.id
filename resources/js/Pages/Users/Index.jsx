import React, { useState, useEffect, useMemo } from "react";
import { Head } from "@inertiajs/react";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";
import axios from "axios";
import Switch from "@/Components/Switch";

export default function Index() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showCopyModal, setShowCopyModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // create, edit
    const [selectedUser, setSelectedUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [employees, setEmployees] = useState([]);
    const groupedPermissions = useMemo(() => {
        const groups = {};
        (permissions || []).forEach((perm) => {
            const raw = String(perm?.name || "");
            const key = raw.includes(".") ? raw.split(".")[0] : "umum";
            if (!groups[key]) groups[key] = [];
            groups[key].push(perm);
        });
        return groups;
    }, [permissions]);
    
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        nik: "",
        roles: [],
        permissions: [],
    });
    const roleSelected = formData.roles.length > 0;
    const selectedRoleObjects = useMemo(() => {
        return (roles || []).filter((r) => formData.roles.includes(r.name));
    }, [roles, formData.roles]);
    const inheritedPermissions = useMemo(() => {
        const set = new Set();
        selectedRoleObjects.forEach((r) => {
            (r.permissions || []).forEach((p) => {
                if (p?.name) set.add(p.name);
            });
        });
        return Array.from(set);
    }, [selectedRoleObjects]);
    const [copySourceUserId, setCopySourceUserId] = useState("");
    const [passwordData, setPasswordData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [pagination, setPagination] = useState({});

    // Fetch data
    const fetchUsers = async (page = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page,
                ...(search && { search }),
                ...(roleFilter && { role: roleFilter }),
            });

            const response = await axios.get(`/api/users?${params}`);
            setUsers(response.data.data.data);
            setPagination({
                current_page: response.data.data.current_page,
                last_page: response.data.data.last_page,
                per_page: response.data.data.per_page,
                total: response.data.data.total,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get("/api/users/roles");
            setRoles(response.data.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await axios.get("/api/users/permissions");
            setPermissions(response.data.data);
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("/api/users/employees");
            setEmployees(response.data.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchPermissions();
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (!Array.isArray(inheritedPermissions)) return;
        if (roleSelected) {
            setFormData((prev) => ({
                ...prev,
                permissions: inheritedPermissions,
            }));
        }
    }, [inheritedPermissions, roleSelected]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search, roleFilter]);

    // Modal handlers
    const openCreateModal = () => {
        setModalMode("create");
        setSelectedUser(null);
        setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            nik: "",
            roles: [],
            permissions: [],
        });
        setErrors({});
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setModalMode("edit");
        setSelectedUser(user);
        setFormData({
            name: typeof user?.name === "string" ? user.name : "",
            username: typeof user?.username === "string" ? user.username : "",
            email: typeof user?.email === "string" ? user.email : "",
            password: "",
            password_confirmation: "",
            nik: typeof user?.nik === "string" ? user.nik : "",
            roles: Array.isArray(user?.roles)
                ? user.roles.map((role) => role?.name).filter(Boolean)
                : [],
            permissions: Array.isArray(user?.permissions)
                ? user.permissions.map((permission) => permission?.name).filter(Boolean)
                : [],
        });
        setErrors({});
        setShowModal(true);
    };

    const openPasswordModal = (user) => {
        setSelectedUser(user);
        setPasswordData({
            current_password: "",
            password: "",
            password_confirmation: "",
        });
        setErrors({});
        setShowPasswordModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowPasswordModal(false);
        setShowHelpModal(false);
        setShowCopyModal(false);
        setSelectedUser(null);
        setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            nik: "",
            roles: [],
            permissions: [],
        });
        setPasswordData({
            current_password: "",
            password: "",
            password_confirmation: "",
        });
        setErrors({});
    };

    // Form handlers
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            if (name === "roles") {
                setFormData((prev) => ({
                    ...prev,
                    roles: checked ? [value] : prev.roles.filter((item) => item !== value),
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [name]: checked
                        ? [...prev[name], value]
                        : prev[name].filter((item) => item !== value),
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        setErrors((prev) => ({
            ...prev,
            [name]: null,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validasi sederhana untuk password konfirmasi
        if (
            formData.password &&
            formData.password !== formData.password_confirmation
        ) {
            setErrors((prev) => ({
                ...prev,
                password_confirmation: ["Konfirmasi password tidak sama"],
            }));
            return;
        }

        const normalizeNik = (v) => {
            const s = String(v || "").trim();
            if (!s || s === "-" || s === "—") return null;
            return s;
        };

        const normalizeEmail = (v) => {
            const s = String(v || "").trim();
            if (!s) return null;
            return s;
        };

        const baseHeaders = {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        };

        try {
            try {
                await axios.get("/sanctum/csrf-cookie", {
                    withCredentials: true,
                    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                });
                await new Promise((r) => setTimeout(r, 250));
            } catch (_) {}

            if (modalMode === "create") {
                const payload = { ...formData, nik: normalizeNik(formData.nik), email: normalizeEmail(formData.email) };
                await axios.post("/api/users", payload, { withCredentials: true, headers: baseHeaders });
            } else {
                const payload = { ...formData, nik: normalizeNik(formData.nik), email: normalizeEmail(formData.email) };
                if (!payload.password) delete payload.password;
                if (!payload.password_confirmation) delete payload.password_confirmation;
                await axios.put(`/api/users/${selectedUser.id}`, payload, { withCredentials: true, headers: baseHeaders });
            }
            closeModal();
            fetchUsers();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validasi sederhana untuk password konfirmasi
        if (passwordData.password !== passwordData.password_confirmation) {
            setErrors((prev) => ({
                ...prev,
                password_confirmation: ["Konfirmasi password tidak sama"],
            }));
            return;
        }

        try {
            await axios.put(
                `/api/users/${selectedUser.id}/password`,
                passwordData
            );
            closeModal();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handleDelete = async (user) => {
        if (confirm(`Apakah Anda yakin ingin menghapus user ${user.name}?`)) {
            try {
                // Spoof DELETE via POST
                const fd = new FormData();
                fd.append("_method", "DELETE");
                await axios.post(`/api/users/${user.id}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                fetchUsers();
            } catch (error) {
                alert(
                    "Gagal menghapus user: " +
                        (error.response?.data?.message || "Error")
                );
            }
        }
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    return (
        <SidebarPengaturan title="Setting User" wide>
            <Head title="Manajemen User" />

            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Manajemen User
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Kelola data pengguna dan permission
                                </p>
                            </div>
                            <button
                                onClick={openCreateModal}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap transform hover:scale-105"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Tambah User</span>
                            </button>
                            <button
                                onClick={() => setShowHelpModal(true)}
                                className="ml-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm whitespace-nowrap"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 13.5a.75.75 0 100 1.5.75.75 0 000-1.5zm.75-8.25a.75.75 0 00-1.5 0v.818c0 .47.22.912.593 1.187l.593.445a1.5 1.5 0 01.594 1.2v.1a.75.75 0 01-1.5 0v-.1a.001.001 0 00-.001-.001l-.001-.001a.75.75 0 00-.149-.449l-.593-.445A2.997 2.997 0 019.75 8.068V7.5a2.25 2.25 0 114.5 0v.25a.75.75 0 11-1.5 0V7.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Bantuan</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan nama, email, atau NIK..."
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="w-48">
                                <select
                                    value={roleFilter}
                                    onChange={(e) =>
                                        setRoleFilter(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Semua Role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        NIK
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Roles
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Permissions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Tanggal Dibuat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-4 text-center"
                                        >
                                            <div className="flex justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Tidak ada data user
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {user.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {user.email || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {user.nik || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.roles.map((role) => (
                                                        <span
                                                            key={role.id}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                        >
                                                            {role.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.permissions
                                                        .slice(0, 3)
                                                        .map((permission) => (
                                                            <span
                                                                key={
                                                                    permission.id
                                                                }
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                            >
                                                                {
                                                                    permission.name
                                                                }
                                                            </span>
                                                        ))}
                                                    {user.permissions.length >
                                                        3 && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                                                            +
                                                            {user.permissions
                                                                .length -
                                                                3}{" "}
                                                            lainnya
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(user)
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openPasswordModal(
                                                                user
                                                            )
                                                        }
                                                        className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(
                                                                user
                                                            );
                                                            setCopySourceUserId(
                                                                ""
                                                            );
                                                            setShowCopyModal(
                                                                true
                                                            );
                                                        }}
                                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M8 16h8m-8-4h8M8 8h8M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(user)
                                                        }
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan{" "}
                                    {(pagination.current_page - 1) *
                                        pagination.per_page +
                                        1}{" "}
                                    sampai{" "}
                                    {Math.min(
                                        pagination.current_page *
                                            pagination.per_page,
                                        pagination.total
                                    )}{" "}
                                    dari {pagination.total} data
                                </div>
                                <div className="flex gap-2">
                                    {Array.from(
                                        { length: pagination.last_page },
                                        (_, i) => i + 1
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                handlePageChange(page)
                                            }
                                            className={`px-3 py-2 text-sm rounded-lg ${
                                                page === pagination.current_page
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl mx-4 h-screen overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {modalMode === "create"
                                            ? "Tambah User"
                                            : "Edit User"}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Nama */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Nama *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFormChange}
                                                required
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                    errors.name
                                                        ? "border-red-500"
                                                        : "border-gray-300 dark:border-gray-600"
                                                }`}
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                    {errors.name[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Username */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Username *
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleFormChange}
                                                required
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                    errors.username
                                                        ? "border-red-500"
                                                        : "border-gray-300 dark:border-gray-600"
                                                }`}
                                            />
                                            {errors.username && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                    {errors.username[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                    errors.email
                                                        ? "border-red-500"
                                                        : "border-gray-300 dark:border-gray-600"
                                                }`}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                    {errors.email[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Password{" "}
                                                {modalMode === "create"
                                                    ? "*"
                                                    : "(kosongkan jika tidak diubah)"}
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleFormChange}
                                                required={
                                                    modalMode === "create"
                                                }
                                                minLength={6}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                    errors.password
                                                        ? "border-red-500"
                                                        : "border-gray-300 dark:border-gray-600"
                                                }`}
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                    {errors.password[0]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password Confirmation */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Konfirmasi Password{" "}
                                                {modalMode === "create"
                                                    ? "*"
                                                    : "(kosongkan jika tidak diubah)"}
                                            </label>
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                value={
                                                    formData.password_confirmation
                                                }
                                                onChange={handleFormChange}
                                                required={
                                                    modalMode === "create"
                                                }
                                                minLength={6}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                    errors.password_confirmation
                                                        ? "border-red-500"
                                                        : "border-gray-300 dark:border-gray-600"
                                                }`}
                                            />
                                            {errors.password_confirmation && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                    {
                                                        errors
                                                            .password_confirmation[0]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* NIK */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                NIK
                                            </label>
                                            <select
                                                name="nik"
                                                value={formData.nik}
                                                onChange={handleFormChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">
                                                    Pilih Karyawan
                                                </option>
                                                {employees.map((employee) => (
                                                    <option
                                                        key={employee.nik}
                                                        value={employee.nik}
                                                    >
                                                        {employee.nama} -{" "}
                                                        {employee.jbtn}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.nik && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                    {errors.nik[0]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Roles */}
                                    <div>
                                        <label id="roles-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Peran (Roles)
                                        </label>
                                        <div role="group" aria-labelledby="roles-label" className="flex items-center gap-2 whitespace-nowrap overflow-x-auto">
                                            {roles.map((role) => (
                                                <label
                                                    key={role.id}
                                                    className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name="roles"
                                                        value={role.name}
                                                        checked={formData.roles.includes(
                                                            role.name
                                                        )}
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        {role.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.roles && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {errors.roles[0]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Permissions */}
                                    <div>
                                        <label id="permissions-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {roleSelected
                                                ? `Izin (Permissions) — mengikuti Role: ${formData.roles.join(', ')}`
                                                : "Izin (Permissions)"}
                                        </label>
                                        <div role="group" aria-labelledby="permissions-label" className="space-y-2 h-[70vh] overflow-y-auto">
                                            {Object.entries(groupedPermissions)
                                                .sort((a, b) => a[0].localeCompare(b[0]))
                                                .map(([group, items]) => (
                                                    <div key={group}>
                                                        <div className="text-xs font-bold uppercase tracking-wide text-red-600 dark:text-red-400 mb-1 py-1">
                                                            {group.charAt(0).toUpperCase() + group.slice(1)}
                                                        </div>
                                                        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-2 w-full">
                                                            {items.map((permission) => (
                                                                <div key={permission.id} className="flex items-center justify-between gap-1 flex-shrink-0">
                                                                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                                                        {permission.name}
                                                                    </span>
                                                                    <Switch
                                                                        checked={roleSelected ? inheritedPermissions.includes(permission.name) : formData.permissions.includes(permission.name)}
                                                                        onChange={(checked) => {
                                                                            if (roleSelected) return;
                                                                            setFormData((prev) => {
                                                                                const exists = prev.permissions.includes(permission.name);
                                                                                const next = checked
                                                                                    ? (exists ? prev.permissions : [...prev.permissions, permission.name])
                                                                                    : prev.permissions.filter((p) => p !== permission.name);
                                                                                return { ...prev, permissions: next };
                                                                            });
                                                                            setErrors((prev) => ({ ...prev, permissions: null }));
                                                                        }}
                                                                        size="xs"
                                                                        disabled={roleSelected}
                                                                        onLabel="On"
                                                                        offLabel="Off"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        {errors.permissions && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {errors.permissions[0]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 mt-4">
                                        <div className="flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                            >
                                                {modalMode === "create"
                                                    ? "Simpan"
                                                    : "Update"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Password Modal */}
                {showPasswordModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Ubah Password - {selectedUser?.name}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <form
                                    onSubmit={handlePasswordSubmit}
                                    className="space-y-4"
                                >
                                    {/* Current Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Password Saat Ini *
                                        </label>
                                        <input
                                            type="password"
                                            name="current_password"
                                            value={
                                                passwordData.current_password
                                            }
                                            onChange={handlePasswordChange}
                                            required
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.current_password
                                                    ? "border-red-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            }`}
                                        />
                                        {errors.current_password && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {errors.current_password[0]}
                                            </p>
                                        )}
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Password Baru *
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={passwordData.password}
                                            onChange={handlePasswordChange}
                                            required
                                                minLength={6}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.password
                                                    ? "border-red-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            }`}
                                        />
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {errors.password[0]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Konfirmasi Password Baru *
                                        </label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            value={
                                                passwordData.password_confirmation
                                            }
                                            onChange={handlePasswordChange}
                                            required
                                                minLength={6}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                                                errors.password_confirmation
                                                    ? "border-red-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            }`}
                                        />
                                        {errors.password_confirmation && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {
                                                    errors
                                                        .password_confirmation[0]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                                        >
                                            Ubah Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Modal */}
                {showHelpModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Panduan Manajemen User
                                    </h3>
                                    <button
                                        onClick={() => setShowHelpModal(false)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Ringkasan dari docs/user.md:
                                </p>
                                <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                                    <li>
                                        Pembuatan user baru: isi Nama, Username,
                                        Password. Assign Roles/Permissions
                                        sesuai kebutuhan.
                                    </li>
                                    <li>
                                        Hak akses berbasis Roles dan
                                        Permissions. Gunakan fitur copy untuk
                                        menyalin akses dari user lain.
                                    </li>
                                    <li>
                                        Keamanan: password di-hash (server),
                                        hindari menyalin password saat copy hak
                                        akses.
                                    </li>
                                    <li>
                                        Legacy Desktop: hak akses per modul
                                        (boolean) dikelola di
                                        DlgUser/DlgUpdateUser. Migrasi
                                        disarankan menuju RBAC.
                                    </li>
                                </ul>
                                <div className="mt-3">
                                    <a
                                        href="/docs/user"
                                        target="_blank"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Buka dokumentasi lengkap
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Copy Permissions Modal */}
                {showCopyModal && selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Salin Hak Akses ke: {selectedUser.name}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Pilih Sumber User
                                        </label>
                                        <select
                                            value={copySourceUserId}
                                            onChange={(e) =>
                                                setCopySourceUserId(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">
                                                -- pilih --
                                            </option>
                                            {users
                                                .filter(
                                                    (u) =>
                                                        u.id !== selectedUser.id
                                                )
                                                .map((u) => (
                                                    <option
                                                        key={u.id}
                                                        value={u.id}
                                                    >
                                                        {u.name} ({u.username})
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!copySourceUserId) return;
                                                const source = users.find(
                                                    (u) =>
                                                        String(u.id) ===
                                                        String(copySourceUserId)
                                                );
                                                if (!source) return;
                                                try {
                                                const normalizeNik = (v) => {
                                                    const s = String(v || "").trim();
                                                    if (!s || s === "-" || s === "—") return null;
                                                    return s;
                                                };

                                                const payload = {
                                                        name: selectedUser.name,
                                                        username:
                                                            selectedUser.username,
                                                        email: selectedUser.email,
                                                    nik: normalizeNik(selectedUser.nik),
                                                        roles: source.roles.map(
                                                            (r) => r.name
                                                        ),
                                                        permissions:
                                                            source.permissions.map(
                                                                (p) => p.name
                                                            ),
                                                    };
                                                    try {
                                                        await axios.get('/sanctum/csrf-cookie', {
                                                            withCredentials: true,
                                                            headers: {
                                                                'Accept': 'application/json',
                                                                'X-Requested-With': 'XMLHttpRequest',
                                                            },
                                                        });
                                                        await new Promise((r) => setTimeout(r, 250));
                                                    } catch (_) {}

                                                    await axios.put(
                                                        `/api/users/${selectedUser.id}`,
                                                        payload,
                                                        {
                                                            withCredentials: true,
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'Accept': 'application/json',
                                                                'X-Requested-With': 'XMLHttpRequest',
                                                            },
                                                        }
                                                    );
                                                    closeModal();
                                                    fetchUsers();
                                                } catch (error) {
                                                    const status = error?.response?.status;
                                                    const msg = status === 419
                                                        ? 'Session/CSRF expired. Silakan refresh halaman lalu coba lagi.'
                                                        : (error?.response?.data?.message || 'Error');
                                                    alert("Gagal menyalin hak akses: " + msg);
                                                }
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                        >
                                            Salin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SidebarPengaturan>
    );
}
