import employees from './employees'
import penjab from './penjab'
import wilayah from './wilayah'
import permissions from './permissions'
import regPeriksa from './reg-periksa'
import users from './users'

const api = {
    employees: Object.assign(employees, employees),
    penjab: Object.assign(penjab, penjab),
    wilayah: Object.assign(wilayah, wilayah),
    permissions: Object.assign(permissions, permissions),
    regPeriksa: Object.assign(regPeriksa, regPeriksa),
    users: Object.assign(users, users),
}

export default api