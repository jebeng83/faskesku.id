<?php

namespace Database\Seeders;

use App\Models\PremiumModule;
use Illuminate\Database\Seeder;

class PremiumModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            [
                'module_key' => 'ADVANCED_REPORTING_MODULE',
                'name' => 'Advanced Reporting Module',
                'description' => 'Advanced reporting and analytics features with custom dashboards, export capabilities, and real-time data visualization.',
                'price' => 2500000.00,
                'version' => '1.0.0',
                'features' => [
                    'Custom Dashboard Builder',
                    'Advanced Analytics',
                    'Export to PDF/Excel',
                    'Real-time Charts',
                    'Scheduled Reports',
                    'Email Notifications',
                    'Data Visualization',
                    'Custom Metrics',
                ],
                'permissions' => [
                    'view_advanced_reports',
                    'create_custom_dashboards',
                    'export_data',
                    'schedule_reports',
                ],
            ],
            [
                'module_key' => 'MULTI_BRANCH_MANAGEMENT',
                'name' => 'Multi Branch Management',
                'description' => 'Manage multiple hospital branches with centralized administration, branch-specific settings, and cross-branch reporting.',
                'price' => 5000000.00,
                'version' => '1.0.0',
                'features' => [
                    'Multi Branch Setup',
                    'Centralized Administration',
                    'Branch-specific Settings',
                    'Cross-branch Reporting',
                    'User Role Management',
                    'Data Synchronization',
                    'Branch Analytics',
                    'Centralized Billing',
                ],
                'permissions' => [
                    'manage_branches',
                    'view_cross_branch_data',
                    'configure_branch_settings',
                    'sync_branch_data',
                ],
            ],
            [
                'module_key' => 'INVENTORY_MANAGEMENT_SYSTEM',
                'name' => 'Inventory Management System',
                'description' => 'Complete inventory management system with stock tracking, automated reordering, supplier management, and cost analysis.',
                'price' => 3500000.00,
                'version' => '1.0.0',
                'features' => [
                    'Stock Tracking',
                    'Automated Reordering',
                    'Supplier Management',
                    'Cost Analysis',
                    'Barcode Scanning',
                    'Inventory Reports',
                    'Low Stock Alerts',
                    'Purchase Orders',
                ],
                'permissions' => [
                    'manage_inventory',
                    'view_stock_levels',
                    'create_purchase_orders',
                    'manage_suppliers',
                ],
            ],
            [
                'module_key' => 'TELEMEDICINE_PLATFORM',
                'name' => 'Telemedicine Platform',
                'description' => 'Complete telemedicine solution with video consultations, appointment scheduling, prescription management, and patient portal.',
                'price' => 7500000.00,
                'version' => '1.0.0',
                'features' => [
                    'Video Consultations',
                    'Online Appointment Booking',
                    'Digital Prescriptions',
                    'Patient Portal',
                    'Payment Integration',
                    'Medical Records Sharing',
                    'Prescription Tracking',
                    'Consultation Recording',
                ],
                'permissions' => [
                    'conduct_video_consultations',
                    'manage_online_appointments',
                    'issue_digital_prescriptions',
                    'access_patient_portal',
                ],
            ],
            [
                'module_key' => 'FINANCIAL_MANAGEMENT_SUITE',
                'name' => 'Financial Management Suite',
                'description' => 'Comprehensive financial management with billing, invoicing, payment tracking, financial reporting, and insurance integration.',
                'price' => 4000000.00,
                'version' => '1.0.0',
                'features' => [
                    'Automated Billing',
                    'Invoice Generation',
                    'Payment Tracking',
                    'Insurance Integration',
                    'Financial Reports',
                    'Tax Management',
                    'Revenue Analytics',
                    'Payment Gateway Integration',
                ],
                'permissions' => [
                    'manage_billing',
                    'generate_invoices',
                    'track_payments',
                    'view_financial_reports',
                ],
            ],
            [
                'module_key' => 'AI_DIAGNOSTIC_ASSISTANT',
                'name' => 'AI Diagnostic Assistant',
                'description' => 'AI-powered diagnostic assistance with symptom analysis, treatment recommendations, drug interaction checking, and medical image analysis.',
                'price' => 10000000.00,
                'version' => '1.0.0',
                'features' => [
                    'Symptom Analysis',
                    'Treatment Recommendations',
                    'Drug Interaction Checking',
                    'Medical Image Analysis',
                    'Diagnostic Suggestions',
                    'Clinical Decision Support',
                    'Patient Risk Assessment',
                    'Medical Literature Search',
                ],
                'permissions' => [
                    'use_ai_diagnostics',
                    'analyze_medical_images',
                    'access_clinical_support',
                    'view_ai_recommendations',
                ],
            ],
        ];

        foreach ($modules as $moduleData) {
            PremiumModule::create($moduleData);
        }
    }
}
