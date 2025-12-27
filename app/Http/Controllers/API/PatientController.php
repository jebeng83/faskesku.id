<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;

class PatientController extends Controller
{
    /**
     * Get the next medical record number (No. RM)
     */
    public function nextNoRM()
    {
        try {
            $nextNoRM = Patient::peekNextNoRM();
            return response()->json([
                'success' => true,
                'data' => $nextNoRM,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Describe tabel pasien: columns & foreign keys
     */
    public function describe()
    {
        try {
            $columns = DB::select('SHOW FULL COLUMNS FROM pasien');
            $database = config('database.connections.mysql.database');
            $fks = DB::table('information_schema.key_column_usage')
                ->select(
                    'COLUMN_NAME',
                    'REFERENCED_TABLE_NAME',
                    'REFERENCED_COLUMN_NAME',
                    'CONSTRAINT_NAME'
                )
                ->where('TABLE_SCHEMA', $database)
                ->where('TABLE_NAME', 'pasien')
                ->whereNotNull('REFERENCED_TABLE_NAME')
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'columns' => $columns,
                    'foreign_keys' => $fks,
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
