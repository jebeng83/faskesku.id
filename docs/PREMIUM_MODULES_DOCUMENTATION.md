# Premium Modules System Documentation

## Overview

Sistem Premium Modules adalah sistem add-on yang memungkinkan aplikasi untuk menjual modul tambahan dengan fitur-fitur premium. Sistem ini dirancang dengan keamanan tinggi dan sulit untuk dicrack oleh user.

## Features

### 🔐 Security Features

- **Multi-layer Encryption**: License key dienkripsi dengan 5 lapisan enkripsi
- **Server Fingerprinting**: Validasi berdasarkan karakteristik server
- **App Signature Validation**: Validasi berdasarkan signature aplikasi
- **Checksum Validation**: Validasi integritas file
- **Time-based Validation**: License key memiliki masa berlaku
- **XOR Encryption**: Enkripsi tambahan dengan XOR cipher
- **Hash Validation**: Validasi dengan multiple hash algorithms

### 🛡️ Anti-Crack Measures

- **Dynamic Encryption Key**: Key enkripsi berubah berdasarkan server info
- **Multiple Validation Layers**: 5+ layer validasi untuk license key
- **Server-specific Validation**: License hanya valid di server tertentu
- **Time-based Expiration**: License key memiliki masa berlaku
- **Checksum Integrity**: Validasi integritas file dan data
- **Logging System**: Log semua aktivitas untuk monitoring
- **Middleware Protection**: Proteksi otomatis di level route

## Architecture

### Database Schema

```sql
CREATE TABLE premium_modules (
    id BIGINT PRIMARY KEY,
    module_key VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    version VARCHAR(20),
    is_active BOOLEAN DEFAULT FALSE,
    license_key TEXT,
    activation_hash TEXT,
    purchased_at TIMESTAMP,
    activated_at TIMESTAMP,
    expires_at TIMESTAMP,
    features JSON,
    permissions JSON,
    checksum VARCHAR(64),
    encrypted_data TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Core Components

1. **PremiumModule Model**: Model Eloquent untuk mengelola data modul
2. **PremiumModuleService**: Service class untuk business logic
3. **PremiumModuleMiddleware**: Middleware untuk proteksi route
4. **PremiumModuleHelper**: Helper class untuk kemudahan penggunaan
5. **PremiumModuleController**: Controller untuk admin management

## Installation

### 1. Run Migration

```bash
php artisan migrate
```

### 2. Register Service Provider

Tambahkan ke `config/app.php`:

```php
'providers' => [
    // ...
    App\Providers\PremiumModuleServiceProvider::class,
],
```

### 3. Register Middleware

Tambahkan ke `bootstrap/app.php`:

```php
$middleware->alias([
    'premium' => \App\Http\Middleware\PremiumModuleMiddleware::class,
]);
```

### 4. Seed Sample Data

```bash
php artisan db:seed --class=PremiumModuleSeeder
```

## Usage

### 1. Route Protection

```php
// Protect entire route group
Route::middleware(['auth', 'premium:ADVANCED_REPORTING_MODULE'])->group(function () {
    Route::get('/advanced-reports', [ReportController::class, 'advanced']);
    Route::get('/custom-dashboards', [DashboardController::class, 'custom']);
});

// Protect individual route
Route::get('/inventory', [InventoryController::class, 'index'])
    ->middleware('premium:INVENTORY_MANAGEMENT_SYSTEM');
```

### 2. Controller Usage

```php
use App\Helpers\PremiumModuleHelper;

class ReportController extends Controller
{
    public function advancedReports()
    {
        // Check if module is active
        if (!PremiumModuleHelper::isModuleActive('ADVANCED_REPORTING_MODULE')) {
            return response()->json([
                'success' => false,
                'message' => PremiumModuleHelper::getErrorMessage('ADVANCED_REPORTING_MODULE')
            ], 403);
        }

        // Check specific feature
        if (!PremiumModuleHelper::hasFeature('ADVANCED_REPORTING_MODULE', 'Custom Dashboard Builder')) {
            return response()->json([
                'success' => false,
                'message' => 'Custom Dashboard Builder feature required'
            ], 403);
        }

        // Proceed with premium feature
        return view('reports.advanced');
    }
}
```

### 3. Blade Template Usage

```blade
{{-- Check if module is active --}}
@premium('ADVANCED_REPORTING_MODULE')
    <div class="premium-feature">
        <h3>Advanced Reports</h3>
        <p>This is a premium feature!</p>
    </div>
@else
    <div class="upgrade-prompt">
        <h3>Upgrade Required</h3>
        <p>@premiumerror('ADVANCED_REPORTING_MODULE')</p>
        <a href="@premiumpurchase('ADVANCED_REPORTING_MODULE')" class="btn btn-primary">
            Purchase Now - @premiumprice(@premiummodule('ADVANCED_REPORTING_MODULE')->price)
        </a>
    </div>
@endpremium

{{-- Check specific feature --}}
@premiumfeature('ADVANCED_REPORTING_MODULE', 'Custom Dashboard Builder')
    <div class="dashboard-builder">
        <h3>Custom Dashboard Builder</h3>
        <!-- Dashboard builder interface -->
    </div>
@endpremiumfeature

{{-- Check permission --}}
@premiumpermission('ADVANCED_REPORTING_MODULE', 'export_data')
    <button class="btn btn-success">Export Data</button>
@endpremiumpermission
```

### 4. API Usage

```php
// Check module status
$isActive = PremiumModuleHelper::isModuleActive('ADVANCED_REPORTING_MODULE');

// Get module info
$module = PremiumModuleHelper::getModuleInfo('ADVANCED_REPORTING_MODULE');

// Get module features
$features = PremiumModuleHelper::getModuleFeatures('ADVANCED_REPORTING_MODULE');

// Check specific feature
$hasFeature = PremiumModuleHelper::hasFeature('ADVANCED_REPORTING_MODULE', 'Custom Dashboard Builder');

// Get module permissions
$permissions = PremiumModuleHelper::getModulePermissions('ADVANCED_REPORTING_MODULE');

// Check permission
$hasPermission = PremiumModuleHelper::hasPermission('ADVANCED_REPORTING_MODULE', 'export_data');
```

## Admin Management

### 1. Create Module

```php
$module = PremiumModule::create([
    'module_key' => 'CUSTOM_MODULE',
    'name' => 'Custom Module',
    'description' => 'Custom premium module',
    'price' => 1000000.00,
    'features' => ['Feature 1', 'Feature 2'],
    'permissions' => ['permission1', 'permission2']
]);
```

### 2. Generate License Key

```php
$licenseKey = $premiumService->generateSecureLicenseKey($module->id);
```

### 3. Activate Module

```php
$result = $premiumService->activateModule('CUSTOM_MODULE', $licenseKey);
```

### 4. Check Module Status

```php
$isActive = $premiumService->isModuleActive('CUSTOM_MODULE');
```

## Security Features

### 1. License Key Encryption

License key dienkripsi dengan 5 lapisan:

1. JSON encoding
2. Base64 encoding
3. XOR encryption dengan dynamic key
4. Laravel encryption
5. Checksum validation

### 2. Server Fingerprinting

```php
$serverInfo = [
    'server_name' => $_SERVER['SERVER_NAME'],
    'document_root' => $_SERVER['DOCUMENT_ROOT'],
    'server_software' => $_SERVER['SERVER_SOFTWARE'],
    'php_version' => PHP_VERSION,
];
$fingerprint = hash('sha256', json_encode($serverInfo));
```

### 3. App Signature Validation

```php
$appSignature = hash('sha256', json_encode([
    'app_name' => config('app.name'),
    'app_key' => config('app.key'),
    'app_env' => config('app.env'),
    'timestamp' => time(),
]));
```

### 4. Time-based Validation

- License key memiliki masa berlaku (default: 1 tahun)
- Timestamp validation untuk mencegah replay attacks
- Expiration date checking

### 5. Checksum Integrity

```php
$checksum = hash('sha256', $moduleKey . $version . config('app.key'));
```

## Available Modules

### 1. Advanced Reporting Module

- **Price**: Rp 2,500,000
- **Features**: Custom Dashboard Builder, Advanced Analytics, Export to PDF/Excel
- **Permissions**: view_advanced_reports, create_custom_dashboards, export_data

### 2. Multi Branch Management

- **Price**: Rp 5,000,000
- **Features**: Multi Branch Setup, Centralized Administration, Cross-branch Reporting
- **Permissions**: manage_branches, view_cross_branch_data, configure_branch_settings

### 3. Inventory Management System

- **Price**: Rp 3,500,000
- **Features**: Stock Tracking, Automated Reordering, Supplier Management
- **Permissions**: manage_inventory, view_stock_levels, create_purchase_orders

### 4. Telemedicine Platform

- **Price**: Rp 7,500,000
- **Features**: Video Consultations, Online Appointment Booking, Digital Prescriptions
- **Permissions**: conduct_video_consultations, manage_online_appointments, issue_digital_prescriptions

### 5. Financial Management Suite

- **Price**: Rp 4,000,000
- **Features**: Automated Billing, Invoice Generation, Payment Tracking
- **Permissions**: manage_billing, generate_invoices, track_payments

### 6. AI Diagnostic Assistant

- **Price**: Rp 10,000,000
- **Features**: Symptom Analysis, Treatment Recommendations, Medical Image Analysis
- **Permissions**: use_ai_diagnostics, analyze_medical_images, access_clinical_support

## API Endpoints

### Admin Endpoints

- `GET /premium-modules` - List all modules
- `POST /premium-modules` - Create new module
- `GET /premium-modules/{id}` - Show module details
- `PUT /premium-modules/{id}` - Update module
- `DELETE /premium-modules/{id}` - Delete module
- `POST /premium-modules/{id}/generate-license` - Generate license key
- `POST /premium-modules/activate` - Activate module
- `POST /premium-modules/{id}/deactivate` - Deactivate module
- `GET /premium-modules/{id}/status` - Check module status
- `POST /premium-modules/validate-license` - Validate license key

### Public Endpoints

- `GET /premium-modules/available` - List available modules
- `GET /premium-modules/active` - List active modules

## Error Handling

### Common Error Codes

- `PREMIUM_MODULE_REQUIRED` - Module not active
- `INVALID_LICENSE_KEY` - License key invalid
- `MODULE_EXPIRED` - Module expired
- `FEATURE_NOT_AVAILABLE` - Specific feature not available
- `PERMISSION_DENIED` - User doesn't have required permission

### Error Response Format

```json
{
	"success": false,
	"message": "Premium module required. Please purchase and activate the module to access this feature.",
	"error_code": "PREMIUM_MODULE_REQUIRED",
	"module_key": "ADVANCED_REPORTING_MODULE",
	"purchase_url": "/premium-modules/advanced-reporting-module"
}
```

## Monitoring & Logging

### Log Types

1. **Module Activation**: Log when modules are activated
2. **Access Attempts**: Log unauthorized access attempts
3. **License Validation**: Log license validation attempts
4. **Error Events**: Log all error events

### Log Data

```php
$logData = [
    'module_key' => $moduleKey,
    'success' => $success,
    'ip' => request()->ip(),
    'user_agent' => request()->userAgent(),
    'user_id' => auth()->id(),
    'url' => request()->fullUrl(),
    'timestamp' => now(),
];
```

## Best Practices

### 1. Security

- Always validate license keys on server side
- Use HTTPS for all premium module communications
- Regularly rotate encryption keys
- Monitor access logs for suspicious activity
- Implement rate limiting for activation attempts

### 2. Performance

- Cache module status checks
- Use database indexes for frequent queries
- Implement lazy loading for module features
- Optimize license validation process

### 3. User Experience

- Provide clear upgrade prompts
- Show module benefits and features
- Implement smooth activation process
- Provide helpful error messages

## Troubleshooting

### Common Issues

1. **Module not activating**

   - Check license key format
   - Verify server fingerprint
   - Check expiration date
   - Validate app signature

2. **License key invalid**

   - Regenerate license key
   - Check encryption key
   - Verify module key matches
   - Check timestamp validity

3. **Module expired**

   - Check expiration date
   - Renew license if applicable
   - Update module version

4. **Permission denied**
   - Check user permissions
   - Verify module features
   - Check role assignments

## Support

For technical support or questions about the Premium Modules System, please contact the development team or refer to the API documentation.

---

**Note**: This system is designed to be highly secure and difficult to crack. However, no system is 100% secure. Regular security audits and updates are recommended.
