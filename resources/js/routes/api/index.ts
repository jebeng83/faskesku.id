import employees from './employees'
import penjab from './penjab'
import wilayah from './wilayah'
import permissions from './permissions'
import regPeriksa from './reg-periksa'
import users from './users'
import menus from './menus'
import obat from './obat'
import resep from './resep'
const api = {
    employees: Object.assign(employees, employees),
penjab: Object.assign(penjab, penjab),
wilayah: Object.assign(wilayah, wilayah),
permissions: Object.assign(permissions, permissions),
regPeriksa: Object.assign(regPeriksa, regPeriksa),
users: Object.assign(users, users),
menus: Object.assign(menus, menus),
obat: Object.assign(obat, obat),
resep: Object.assign(resep, resep),
}

export default api