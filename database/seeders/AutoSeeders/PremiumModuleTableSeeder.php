<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PremiumModuleTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('premium_modules')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('premium_modules')->insert(array (
          0 => 
          array (
            'id' => 1,
            'module_key' => 'ADVANCED_REPORTING_MODULE',
            'name' => 'Advanced Reporting Module',
            'description' => 'Advanced reporting and analytics features with custom dashboards, export capabilities, and real-time data visualization.',
            'price' => '2500000.00',
            'version' => '1.0.0',
            'is_active' => 0,
            'license_key' => NULL,
            'activation_hash' => NULL,
            'purchased_at' => NULL,
            'activated_at' => NULL,
            'expires_at' => NULL,
            'features' => '["Custom Dashboard Builder","Advanced Analytics","Export to PDF\\/Excel","Real-time Charts","Scheduled Reports","Email Notifications","Data Visualization","Custom Metrics"]',
            'permissions' => '["view_advanced_reports","create_custom_dashboards","export_data","schedule_reports"]',
            'checksum' => NULL,
            'encrypted_data' => NULL,
            'created_at' => '2025-09-19 08:46:33',
            'updated_at' => '2025-09-19 08:46:33',
          ),
          1 => 
          array (
            'id' => 2,
            'module_key' => 'MULTI_BRANCH_MANAGEMENT',
            'name' => 'Multi Branch Management',
            'description' => 'Manage multiple hospital branches with centralized administration, branch-specific settings, and cross-branch reporting.',
            'price' => '5000000.00',
            'version' => '1.0.0',
            'is_active' => 0,
            'license_key' => NULL,
            'activation_hash' => NULL,
            'purchased_at' => NULL,
            'activated_at' => NULL,
            'expires_at' => NULL,
            'features' => '["Multi Branch Setup","Centralized Administration","Branch-specific Settings","Cross-branch Reporting","User Role Management","Data Synchronization","Branch Analytics","Centralized Billing"]',
            'permissions' => '["manage_branches","view_cross_branch_data","configure_branch_settings","sync_branch_data"]',
            'checksum' => NULL,
            'encrypted_data' => NULL,
            'created_at' => '2025-09-19 08:46:33',
            'updated_at' => '2025-09-19 08:46:33',
          ),
          2 => 
          array (
            'id' => 3,
            'module_key' => 'INVENTORY_MANAGEMENT_SYSTEM',
            'name' => 'Inventory Management System',
            'description' => 'Complete inventory management system with stock tracking, automated reordering, supplier management, and cost analysis.',
            'price' => '3500000.00',
            'version' => '1.0.0',
            'is_active' => 0,
            'license_key' => NULL,
            'activation_hash' => NULL,
            'purchased_at' => NULL,
            'activated_at' => NULL,
            'expires_at' => NULL,
            'features' => '["Stock Tracking","Automated Reordering","Supplier Management","Cost Analysis","Barcode Scanning","Inventory Reports","Low Stock Alerts","Purchase Orders"]',
            'permissions' => '["manage_inventory","view_stock_levels","create_purchase_orders","manage_suppliers"]',
            'checksum' => NULL,
            'encrypted_data' => NULL,
            'created_at' => '2025-09-19 08:46:33',
            'updated_at' => '2025-09-19 08:46:33',
          ),
          3 => 
          array (
            'id' => 4,
            'module_key' => 'TELEMEDICINE_PLATFORM',
            'name' => 'Telemedicine Platform',
            'description' => 'Complete telemedicine solution with video consultations, appointment scheduling, prescription management, and patient portal.',
            'price' => '7500000.00',
            'version' => '1.0.0',
            'is_active' => 0,
            'license_key' => NULL,
            'activation_hash' => NULL,
            'purchased_at' => NULL,
            'activated_at' => NULL,
            'expires_at' => NULL,
            'features' => '["Video Consultations","Online Appointment Booking","Digital Prescriptions","Patient Portal","Payment Integration","Medical Records Sharing","Prescription Tracking","Consultation Recording"]',
            'permissions' => '["conduct_video_consultations","manage_online_appointments","issue_digital_prescriptions","access_patient_portal"]',
            'checksum' => NULL,
            'encrypted_data' => NULL,
            'created_at' => '2025-09-19 08:46:33',
            'updated_at' => '2025-09-19 08:46:33',
          ),
          4 => 
          array (
            'id' => 5,
            'module_key' => 'FINANCIAL_MANAGEMENT_SUITE',
            'name' => 'Financial Management Suite',
            'description' => 'Comprehensive financial management with billing, invoicing, payment tracking, financial reporting, and insurance integration.',
            'price' => '4000000.00',
            'version' => '1.0.0',
            'is_active' => 0,
            'license_key' => NULL,
            'activation_hash' => NULL,
            'purchased_at' => NULL,
            'activated_at' => NULL,
            'expires_at' => NULL,
            'features' => '["Automated Billing","Invoice Generation","Payment Tracking","Insurance Integration","Financial Reports","Tax Management","Revenue Analytics","Payment Gateway Integration"]',
            'permissions' => '["manage_billing","generate_invoices","track_payments","view_financial_reports"]',
            'checksum' => NULL,
            'encrypted_data' => NULL,
            'created_at' => '2025-09-19 08:46:33',
            'updated_at' => '2025-09-19 08:46:33',
          ),
          5 => 
          array (
            'id' => 6,
            'module_key' => 'AI_DIAGNOSTIC_ASSISTANT',
            'name' => 'AI Diagnostic Assistant',
            'description' => 'AI-powered diagnostic assistance with symptom analysis, treatment recommendations, drug interaction checking, and medical image analysis.',
            'price' => '10000000.00',
            'version' => '1.0.0',
            'is_active' => 0,
            'license_key' => NULL,
            'activation_hash' => NULL,
            'purchased_at' => NULL,
            'activated_at' => NULL,
            'expires_at' => NULL,
            'features' => '["Symptom Analysis","Treatment Recommendations","Drug Interaction Checking","Medical Image Analysis","Diagnostic Suggestions","Clinical Decision Support","Patient Risk Assessment","Medical Literature Search"]',
            'permissions' => '["use_ai_diagnostics","analyze_medical_images","access_clinical_support","view_ai_recommendations"]',
            'checksum' => NULL,
            'encrypted_data' => NULL,
            'created_at' => '2025-09-19 08:46:33',
            'updated_at' => '2025-09-19 08:46:33',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}