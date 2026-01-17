import { usePage } from "@inertiajs/react";

export default function usePermission() {
  const { auth } = usePage().props || {};
  const names = Array.isArray(auth?.permissions) ? auth.permissions : [];
  const can = (perm) => names.includes(String(perm));
  const canAny = (...perms) => perms.some((p) => can(p));
  const canAll = (...perms) => perms.every((p) => can(p));
  return { permissions: names, can, canAny, canAll };
}

