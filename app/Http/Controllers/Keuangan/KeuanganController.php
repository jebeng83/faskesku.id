<?php

namespace App\Http\Controllers\Keuangan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeuanganController extends Controller
{
    /**
     * Display the main financial module page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('keuangan/Index');
    }

    /**
     * Display the financial dashboard.
     *
     * @return \Inertia\Response
     */
    public function dashboard()
    {
        return Inertia::render('keuangan/Dashboard');
    }
}