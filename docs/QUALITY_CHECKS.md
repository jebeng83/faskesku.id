# Quality Checks Documentation

## Overview

Proyek ini menggunakan ESLint dan TypeScript untuk memastikan kualitas kode. Setiap perubahan kode harus melewati quality checks sebelum di-commit atau di-build.

## Quality Check Tools

### 1. ESLint
- **Purpose**: Mencari dan memperbaiki masalah kode JavaScript/TypeScript
- **Config**: `eslint.config.js`
- **Files**: Semua file di `resources/js/**/*.{js,jsx,ts,tsx}`

### 2. TypeScript Type Check
- **Purpose**: Memastikan tidak ada error tipe TypeScript
- **Config**: `tsconfig.json`
- **Files**: File TypeScript yang didefinisikan di `tsconfig.json`

## Scripts Available

### Quality Check Commands

```bash
# Menjalankan lint dan typecheck sekaligus
npm run quality:check

# Auto-fix lint issues dan typecheck
npm run quality:fix

# Menjalankan quality check menggunakan script bash
npm run quality:check:script

# Hanya lint
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Watch mode untuk lint (development)
npm run lint:watch

# Hanya typecheck
npm run typecheck

# Watch mode untuk typecheck (development)
npm run typecheck:watch
```

### Development dengan Quality Checks

```bash
# Development dengan auto quality checks (watch mode)
npm run dev:quality
```

## Automatic Quality Checks

### Pre-Build Hook
Setiap kali menjalankan `npm run build`, quality checks akan otomatis dijalankan terlebih dahulu melalui `prebuild` hook.

```bash
npm run build  # Otomatis menjalankan quality:check sebelum build
```

### Pre-Commit Hook (Optional)
Jika Git hooks diaktifkan, quality checks akan otomatis dijalankan sebelum commit.

Untuk mengaktifkan:
```bash
chmod +x .git/hooks/pre-commit
```

## Manual Quality Check Script

Script bash tersedia di `scripts/quality-check.sh` untuk menjalankan quality checks dengan output yang lebih informatif.

```bash
bash scripts/quality-check.sh
# atau
npm run quality:check:script
```

## Best Practices

1. **Selalu jalankan quality check sebelum commit**
   ```bash
   npm run quality:check
   ```

2. **Gunakan auto-fix untuk memperbaiki masalah yang bisa diperbaiki otomatis**
   ```bash
   npm run quality:fix
   ```

3. **Gunakan watch mode saat development**
   ```bash
   npm run dev:quality
   ```

4. **Fix semua warnings dan errors sebelum commit**
   - ESLint warnings harus diperbaiki
   - TypeScript errors harus diperbaiki
   - TypeScript warnings sebaiknya juga diperbaiki

## Troubleshooting

### ESLint Error: "Cannot find module"
Pastikan semua dependencies terinstall:
```bash
npm install
```

### TypeScript Error: "Cannot find type definitions"
Pastikan TypeScript terinstall dan konfigurasi `tsconfig.json` benar.

### Pre-commit hook tidak berjalan
Pastikan hook file executable:
```bash
chmod +x .git/hooks/pre-commit
```

### Skip quality checks (tidak direkomendasikan)
Jika benar-benar perlu skip (misalnya untuk commit emergency), gunakan:
```bash
git commit --no-verify
```

**⚠️ Warning**: Menggunakan `--no-verify` melewati semua hooks termasuk quality checks. Hanya gunakan dalam situasi darurat.

## Configuration Files

- **ESLint**: `eslint.config.js`
- **TypeScript**: `tsconfig.json`
- **Quality Check Script**: `scripts/quality-check.sh`
- **Pre-commit Hook**: `.git/hooks/pre-commit`

## Ignored Files

File berikut diabaikan oleh ESLint:
- `node_modules/**`
- `public/**`
- `vendor/**`
- `storage/**`
- `resources/js/actions/**` (auto-generated)
- `resources/js/routes/farmasi/**`
- `**/*.d.ts` (type definition files)
