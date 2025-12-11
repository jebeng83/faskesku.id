<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Icd9TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('icd9')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '00.01',
            'deskripsi_panjang' => 'Therapeutic ultrasound of vessels of head and neck',
            'deskripsi_pendek' => 'Ther ult head & neck ves',
          ),
          1 => 
          array (
            'kode' => '00.02',
            'deskripsi_panjang' => 'Therapeutic ultrasound of heart',
            'deskripsi_pendek' => 'Ther ultrasound of heart',
          ),
          2 => 
          array (
            'kode' => '00.03',
            'deskripsi_panjang' => 'Therapeutic ultrasound of peripheral vascular vessels',
            'deskripsi_pendek' => 'Ther ult peripheral ves',
          ),
          3 => 
          array (
            'kode' => '00.09',
            'deskripsi_panjang' => 'Other therapeutic ultrasound',
            'deskripsi_pendek' => 'Other therapeutic ultsnd',
          ),
          4 => 
          array (
            'kode' => '00.10',
            'deskripsi_panjang' => 'Implantation of chemotherapeutic agent',
            'deskripsi_pendek' => 'Implant chemothera agent',
          ),
          5 => 
          array (
            'kode' => '00.11',
            'deskripsi_panjang' => 'Infusion of drotrecogin alfa (activated)',
            'deskripsi_pendek' => 'Infus drotrecogin alfa',
          ),
          6 => 
          array (
            'kode' => '00.12',
            'deskripsi_panjang' => 'Administration of inhaled nitric oxide',
            'deskripsi_pendek' => 'Adm inhal nitric oxide',
          ),
          7 => 
          array (
            'kode' => '00.13',
            'deskripsi_panjang' => 'Injection or infusion of nesiritide',
            'deskripsi_pendek' => 'Inject/infus nesiritide',
          ),
          8 => 
          array (
            'kode' => '00.14',
            'deskripsi_panjang' => 'Injection or infusion of oxazolidinone class of antibiotics',
            'deskripsi_pendek' => 'Injection oxazolidinone',
          ),
          9 => 
          array (
            'kode' => '00.15',
            'deskripsi_panjang' => 'High-dose infusion interleukin-2 [IL-2]',
            'deskripsi_pendek' => 'High-dose infusion IL-2',
          ),
          10 => 
          array (
            'kode' => '00.16',
            'deskripsi_panjang' => 'Pressurized treatment of venous bypass graft [conduit] with pharmaceutical substance',
            'deskripsi_pendek' => 'Pressurized treat graft',
          ),
          11 => 
          array (
            'kode' => '00.17',
            'deskripsi_panjang' => 'Infusion of vasopressor agent',
            'deskripsi_pendek' => 'Infusion of vasopressor',
          ),
          12 => 
          array (
            'kode' => '00.18',
            'deskripsi_panjang' => 'Infusion of immunosuppressive antibody therapy',
            'deskripsi_pendek' => 'Infus immunosup antibody',
          ),
          13 => 
          array (
            'kode' => '00.19',
            'deskripsi_panjang' => 'Disruption of blood brain barrier via infusion [BBBD]',
            'deskripsi_pendek' => 'BBBD via infusion',
          ),
          14 => 
          array (
            'kode' => '00.21',
            'deskripsi_panjang' => 'Intravascular imaging of extracranial cerebral vessels',
            'deskripsi_pendek' => 'IVUS extracran cereb ves',
          ),
          15 => 
          array (
            'kode' => '00.22',
            'deskripsi_panjang' => 'Intravascular imaging of intrathoracic vessels',
            'deskripsi_pendek' => 'IVUS intrathoracic ves',
          ),
          16 => 
          array (
            'kode' => '00.23',
            'deskripsi_panjang' => 'Intravascular imaging of peripheral vessels',
            'deskripsi_pendek' => 'IVUS peripheral vessels',
          ),
          17 => 
          array (
            'kode' => '00.24',
            'deskripsi_panjang' => 'Intravascular imaging of coronary vessels',
            'deskripsi_pendek' => 'IVUS coronary vessels',
          ),
          18 => 
          array (
            'kode' => '00.25',
            'deskripsi_panjang' => 'Intravascular imaging of renal vessels',
            'deskripsi_pendek' => 'IVUS renal vessels',
          ),
          19 => 
          array (
            'kode' => '00.28',
            'deskripsi_panjang' => 'Intravascular imaging, other specified vessel(s)',
            'deskripsi_pendek' => 'Intravascul imaging NEC',
          ),
          20 => 
          array (
            'kode' => '00.29',
            'deskripsi_panjang' => 'Intravascular imaging, unspecified vessel(s)',
            'deskripsi_pendek' => 'Intravascul imaging NOS',
          ),
          21 => 
          array (
            'kode' => '00.31',
            'deskripsi_panjang' => 'Computer assisted surgery with CT/CTA',
            'deskripsi_pendek' => 'CAS w CT/CTA',
          ),
          22 => 
          array (
            'kode' => '00.32',
            'deskripsi_panjang' => 'Computer assisted surgery with MR/MRA',
            'deskripsi_pendek' => 'CAS w MR/MRA',
          ),
          23 => 
          array (
            'kode' => '00.33',
            'deskripsi_panjang' => 'Computer assisted surgery with fluoroscopy',
            'deskripsi_pendek' => 'CAS w fluoroscopy',
          ),
          24 => 
          array (
            'kode' => '00.34',
            'deskripsi_panjang' => 'Imageless computer assisted surgery',
            'deskripsi_pendek' => 'Imageless comp asst surg',
          ),
          25 => 
          array (
            'kode' => '00.35',
            'deskripsi_panjang' => 'Computer assisted surgery with multiple datasets',
            'deskripsi_pendek' => 'CAS w multiple datasets',
          ),
          26 => 
          array (
            'kode' => '00.39',
            'deskripsi_panjang' => 'Other computer assisted surgery',
            'deskripsi_pendek' => 'Other CAS',
          ),
          27 => 
          array (
            'kode' => '00.40',
            'deskripsi_panjang' => 'Procedure on single vessel',
            'deskripsi_pendek' => 'Procedure-one vessel',
          ),
          28 => 
          array (
            'kode' => '00.41',
            'deskripsi_panjang' => 'Procedure on two vessels',
            'deskripsi_pendek' => 'Procedure-two vessels',
          ),
          29 => 
          array (
            'kode' => '00.42',
            'deskripsi_panjang' => 'Procedure on three vessels',
            'deskripsi_pendek' => 'Procedure-three vessels',
          ),
          30 => 
          array (
            'kode' => '00.43',
            'deskripsi_panjang' => 'Procedure on four or more vessels',
            'deskripsi_pendek' => 'Procedure-four+ vessels',
          ),
          31 => 
          array (
            'kode' => '00.44',
            'deskripsi_panjang' => 'Procedure on vessel bifurcation',
            'deskripsi_pendek' => 'Proc-vessel bifurcation',
          ),
          32 => 
          array (
            'kode' => '00.45',
            'deskripsi_panjang' => 'Insertion of one vascular stent',
            'deskripsi_pendek' => 'Insert 1 vascular stent',
          ),
          33 => 
          array (
            'kode' => '00.46',
            'deskripsi_panjang' => 'Insertion of two vascular stents',
            'deskripsi_pendek' => 'Insert 2 vascular stents',
          ),
          34 => 
          array (
            'kode' => '00.47',
            'deskripsi_panjang' => 'Insertion of three vascular stents',
            'deskripsi_pendek' => 'Insert 3 vascular stents',
          ),
          35 => 
          array (
            'kode' => '00.48',
            'deskripsi_panjang' => 'Insertion of four or more vascular stents',
            'deskripsi_pendek' => 'Insert 4+ vasculr stents',
          ),
          36 => 
          array (
            'kode' => '00.49',
            'deskripsi_panjang' => 'Supersaturated oxygen therapy',
            'deskripsi_pendek' => 'SuperSat O2 therapy',
          ),
          37 => 
          array (
            'kode' => '00.50',
            'deskripsi_panjang' => 'Implantation of cardiac resynchronization pacemaker without mention of defibrillation, total system [CRT-P]',
            'deskripsi_pendek' => 'Impl CRT pacemaker sys',
          ),
          38 => 
          array (
            'kode' => '00.51',
            'deskripsi_panjang' => 'Implantation of cardiac resynchronization defibrillator, total system [CRT-D]',
            'deskripsi_pendek' => 'Impl CRT defibrillat sys',
          ),
          39 => 
          array (
            'kode' => '00.52',
            'deskripsi_panjang' => 'Implantation or replacement of transvenous lead [electrode] into left ventricular coronary venous system',
            'deskripsi_pendek' => 'Imp/rep lead lf ven sys',
          ),
          40 => 
          array (
            'kode' => '00.53',
            'deskripsi_panjang' => 'Implantation or replacement of cardiac resynchronization pacemaker pulse generator only [CRT-P]',
            'deskripsi_pendek' => 'Imp/rep CRT pacemakr gen',
          ),
          41 => 
          array (
            'kode' => '00.54',
            'deskripsi_panjang' => 'Implantation or replacement of cardiac resynchronization defibrillator pulse generator only [CRT-D]',
            'deskripsi_pendek' => 'Imp/rep CRT defib genat',
          ),
          42 => 
          array (
            'kode' => '00.55',
            'deskripsi_panjang' => 'Insertion of drug-eluting stent(s) of other peripheral vessel(s)',
            'deskripsi_pendek' => 'Ins d-e stent oth periph',
          ),
          43 => 
          array (
            'kode' => '00.56',
            'deskripsi_panjang' => 'Insertion or replacement of implantable pressure sensor with lead for intracardiac or great vessel hemodynamic monitoring',
            'deskripsi_pendek' => 'Ins/rep sens-crd/vsl mtr',
          ),
          44 => 
          array (
            'kode' => '00.57',
            'deskripsi_panjang' => 'Implantation or replacement of subcutaneous device for intracardiac or great vessel hemodynamic monitoring',
            'deskripsi_pendek' => 'Imp/rep subcue card dev',
          ),
          45 => 
          array (
            'kode' => '00.58',
            'deskripsi_panjang' => 'Insertion of intra-aneurysm sac pressure monitoring device (intraoperative)',
            'deskripsi_pendek' => 'Ins intra-ansm pres mntr',
          ),
          46 => 
          array (
            'kode' => '00.59',
            'deskripsi_panjang' => 'Intravascular pressure measurement of coronary arteries',
            'deskripsi_pendek' => 'Intravasc msmnt cor art',
          ),
          47 => 
          array (
            'kode' => '00.60',
            'deskripsi_panjang' => 'Insertion of drug-eluting stent(s) of superficial femoral artery',
            'deskripsi_pendek' => 'Ins d-e stnt sup fem art',
          ),
          48 => 
          array (
            'kode' => '00.61',
            'deskripsi_panjang' => 'Percutaneous angioplasty of extracranial vessel(s)',
            'deskripsi_pendek' => 'Perc angio extracran ves',
          ),
          49 => 
          array (
            'kode' => '00.62',
            'deskripsi_panjang' => 'Percutaneous angioplasty of intracranial vessel(s)',
            'deskripsi_pendek' => 'Perc angio intracran ves',
          ),
          50 => 
          array (
            'kode' => '00.63',
            'deskripsi_panjang' => 'Percutaneous insertion of carotid artery stent(s)',
            'deskripsi_pendek' => 'Perc ins carotid stent',
          ),
          51 => 
          array (
            'kode' => '00.64',
            'deskripsi_panjang' => 'Percutaneous insertion of other extracranial artery stent(s)',
            'deskripsi_pendek' => 'Perc ins extracran stent',
          ),
          52 => 
          array (
            'kode' => '00.65',
            'deskripsi_panjang' => 'Percutaneous insertion of intracranial vascular stent(s)',
            'deskripsi_pendek' => 'Perc ins intracran stent',
          ),
          53 => 
          array (
            'kode' => '00.66',
            'deskripsi_panjang' => 'Percutaneous transluminal coronary angioplasty [PTCA]',
            'deskripsi_pendek' => 'PTCA',
          ),
          54 => 
          array (
            'kode' => '00.67',
            'deskripsi_panjang' => 'Intravascular pressure measurement of intrathoracic arteries',
            'deskripsi_pendek' => 'Intravas msmnt thorc art',
          ),
          55 => 
          array (
            'kode' => '00.68',
            'deskripsi_panjang' => 'Intravascular pressure measurement of peripheral arteries',
            'deskripsi_pendek' => 'Intravas msmt periph art',
          ),
          56 => 
          array (
            'kode' => '00.69',
            'deskripsi_panjang' => 'Intravascular pressure measurement, other specified and unspecified vessels',
            'deskripsi_pendek' => 'Intravs msmt ves NEC/NOS',
          ),
          57 => 
          array (
            'kode' => '00.70',
            'deskripsi_panjang' => 'Revision of hip replacement, both acetabular and femoral components',
            'deskripsi_pendek' => 'Rev hip repl-acetab/fem',
          ),
          58 => 
          array (
            'kode' => '00.71',
            'deskripsi_panjang' => 'Revision of hip replacement, acetabular component',
            'deskripsi_pendek' => 'Rev hip repl-acetab comp',
          ),
          59 => 
          array (
            'kode' => '00.72',
            'deskripsi_panjang' => 'Revision of hip replacement, femoral component',
            'deskripsi_pendek' => 'Rev hip repl-fem comp',
          ),
          60 => 
          array (
            'kode' => '00.73',
            'deskripsi_panjang' => 'Revision of hip replacement, acetabular liner and/or femoral head only',
            'deskripsi_pendek' => 'Rev hip repl-liner/head',
          ),
          61 => 
          array (
            'kode' => '00.74',
            'deskripsi_panjang' => 'Hip bearing surface, metal-on-polyethylene',
            'deskripsi_pendek' => 'Hip surface, metal/poly',
          ),
          62 => 
          array (
            'kode' => '00.75',
            'deskripsi_panjang' => 'Hip bearing surface, metal-on-metal',
            'deskripsi_pendek' => 'Hip surface, metal/metal',
          ),
          63 => 
          array (
            'kode' => '00.76',
            'deskripsi_panjang' => 'Hip bearing surface, ceramic-on-ceramic',
            'deskripsi_pendek' => 'Hip surface, cermc/cermc',
          ),
          64 => 
          array (
            'kode' => '00.77',
            'deskripsi_panjang' => 'Hip bearing surface, ceramic-on-polyethylene',
            'deskripsi_pendek' => 'Hip surface, cermc/poly',
          ),
          65 => 
          array (
            'kode' => '00.80',
            'deskripsi_panjang' => 'Revision of knee replacement, total (all components)',
            'deskripsi_pendek' => 'Rev knee replacemt-total',
          ),
          66 => 
          array (
            'kode' => '00.81',
            'deskripsi_panjang' => 'Revision of knee replacement, tibial component',
            'deskripsi_pendek' => 'Rev knee repl-tibia comp',
          ),
          67 => 
          array (
            'kode' => '00.82',
            'deskripsi_panjang' => 'Revision of knee replacement, femoral component',
            'deskripsi_pendek' => 'Rev knee repl-femur comp',
          ),
          68 => 
          array (
            'kode' => '00.83',
            'deskripsi_panjang' => 'Revision of knee replacement, patellar component',
            'deskripsi_pendek' => 'Rev knee replace-patella',
          ),
          69 => 
          array (
            'kode' => '00.84',
            'deskripsi_panjang' => 'Revision of total knee replacement, tibial insert (liner)',
            'deskripsi_pendek' => 'Rev knee repl-tibia lin',
          ),
          70 => 
          array (
            'kode' => '00.85',
            'deskripsi_panjang' => 'Resurfacing hip, total, acetabulum and femoral head',
            'deskripsi_pendek' => 'Resrf hip,total-acet/fem',
          ),
          71 => 
          array (
            'kode' => '00.86',
            'deskripsi_panjang' => 'Resurfacing hip, partial, femoral head',
            'deskripsi_pendek' => 'Resrf hip,part-fem head',
          ),
          72 => 
          array (
            'kode' => '00.87',
            'deskripsi_panjang' => 'Resurfacing hip, partial, acetabulum',
            'deskripsi_pendek' => 'Resrf hip,part-acetablum',
          ),
          73 => 
          array (
            'kode' => '00.91',
            'deskripsi_panjang' => 'Transplant from live related donor',
            'deskripsi_pendek' => 'Trnsplnt live rel donor',
          ),
          74 => 
          array (
            'kode' => '00.92',
            'deskripsi_panjang' => 'Transplant from live non-related donor',
            'deskripsi_pendek' => 'Trnsplnt live nonrel don',
          ),
          75 => 
          array (
            'kode' => '00.93',
            'deskripsi_panjang' => 'Transplant from cadaver',
            'deskripsi_pendek' => 'Transplant cadaver donor',
          ),
          76 => 
          array (
            'kode' => '00.94',
            'deskripsi_panjang' => 'Intra-operative neurophysiologic monitoring',
            'deskripsi_pendek' => 'Intra-op neurophys montr',
          ),
          77 => 
          array (
            'kode' => '00.95',
            'deskripsi_panjang' => 'Injection or infusion of glucarpidase',
            'deskripsi_pendek' => 'Injct/infus glucarpidase',
          ),
          78 => 
          array (
            'kode' => '00.96',
            'deskripsi_panjang' => 'Infusion of 4-Factor Prothrombin Complex Concentrate',
            'deskripsi_pendek' => 'Infusion 4F-PCC',
          ),
          79 => 
          array (
            'kode' => '01.01',
            'deskripsi_panjang' => 'Cisternal puncture',
            'deskripsi_pendek' => 'Cisternal puncture',
          ),
          80 => 
          array (
            'kode' => '01.02',
            'deskripsi_panjang' => 'Ventriculopuncture through previously implanted catheter',
            'deskripsi_pendek' => 'Ventricl shunt tube punc',
          ),
          81 => 
          array (
            'kode' => '01.09',
            'deskripsi_panjang' => 'Other cranial puncture',
            'deskripsi_pendek' => 'Cranial puncture NEC',
          ),
          82 => 
          array (
            'kode' => '01.10',
            'deskripsi_panjang' => 'Intracranial pressure monitoring',
            'deskripsi_pendek' => 'Intracran pressure montr',
          ),
          83 => 
          array (
            'kode' => '01.11',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of cerebral meninges',
            'deskripsi_pendek' => 'Clos cereb meninges bx',
          ),
          84 => 
          array (
            'kode' => '01.12',
            'deskripsi_panjang' => 'Open biopsy of cerebral meninges',
            'deskripsi_pendek' => 'Open cereb meninges bx',
          ),
          85 => 
          array (
            'kode' => '01.13',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of brain',
            'deskripsi_pendek' => 'Closed brain biopsy',
          ),
          86 => 
          array (
            'kode' => '01.14',
            'deskripsi_panjang' => 'Open biopsy of brain',
            'deskripsi_pendek' => 'Open brain biopsy',
          ),
          87 => 
          array (
            'kode' => '01.15',
            'deskripsi_panjang' => 'Biopsy of skull',
            'deskripsi_pendek' => 'Skull biopsy',
          ),
          88 => 
          array (
            'kode' => '01.16',
            'deskripsi_panjang' => 'Intracranial oxygen monitoring',
            'deskripsi_pendek' => 'Intracranial 02 monitor',
          ),
          89 => 
          array (
            'kode' => '01.17',
            'deskripsi_panjang' => 'Brain temperature monitoring',
            'deskripsi_pendek' => 'Brain temp monitoring',
          ),
          90 => 
          array (
            'kode' => '01.18',
            'deskripsi_panjang' => 'Other diagnostic procedures on brain and cerebral meninges',
            'deskripsi_pendek' => 'Other brain dx procedure',
          ),
          91 => 
          array (
            'kode' => '01.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on skull',
            'deskripsi_pendek' => 'Other skull dx procedure',
          ),
          92 => 
          array (
            'kode' => '01.20',
            'deskripsi_panjang' => 'Cranial implantation or replacement of neurostimulator pulse generator',
            'deskripsi_pendek' => 'Imp/repl brain pulse gen',
          ),
          93 => 
          array (
            'kode' => '01.21',
            'deskripsi_panjang' => 'Incision and drainage of cranial sinus',
            'deskripsi_pendek' => 'Cranial sinus i & d',
          ),
          94 => 
          array (
            'kode' => '01.22',
            'deskripsi_panjang' => 'Removal of intracranial neurostimulator lead(s)',
            'deskripsi_pendek' => 'Removal brain stim lead',
          ),
          95 => 
          array (
            'kode' => '01.23',
            'deskripsi_panjang' => 'Reopening of craniotomy site',
            'deskripsi_pendek' => 'Reopen craniotomy site',
          ),
          96 => 
          array (
            'kode' => '01.24',
            'deskripsi_panjang' => 'Other craniotomy',
            'deskripsi_pendek' => 'Other craniotomy',
          ),
          97 => 
          array (
            'kode' => '01.25',
            'deskripsi_panjang' => 'Other craniectomy',
            'deskripsi_pendek' => 'Other craniectomy',
          ),
          98 => 
          array (
            'kode' => '01.26',
            'deskripsi_panjang' => 'Insertion of catheter(s) into cranial cavity or tissue',
            'deskripsi_pendek' => 'Ins cath cranial cav/tis',
          ),
          99 => 
          array (
            'kode' => '01.27',
            'deskripsi_panjang' => 'Removal of catheter(s) from cranial cavity or tissue',
            'deskripsi_pendek' => 'Rem cath cranial cav/tis',
          ),
          100 => 
          array (
            'kode' => '01.28',
            'deskripsi_panjang' => 'Placement of intracerebral catheter(s) via burr hole(s)',
            'deskripsi_pendek' => 'Intracereb cth-burr hole',
          ),
          101 => 
          array (
            'kode' => '01.29',
            'deskripsi_panjang' => 'Removal of cranial neurostimulator pulse generator',
            'deskripsi_pendek' => 'Rem brain pulse generatr',
          ),
          102 => 
          array (
            'kode' => '01.31',
            'deskripsi_panjang' => 'Incision of cerebral meninges',
            'deskripsi_pendek' => 'Incise cerebral meninges',
          ),
          103 => 
          array (
            'kode' => '01.32',
            'deskripsi_panjang' => 'Lobotomy and tractotomy',
            'deskripsi_pendek' => 'Lobotomy & tractotomy',
          ),
          104 => 
          array (
            'kode' => '01.39',
            'deskripsi_panjang' => 'Other incision of brain',
            'deskripsi_pendek' => 'Other brain incision',
          ),
          105 => 
          array (
            'kode' => '01.41',
            'deskripsi_panjang' => 'Operations on thalamus',
            'deskripsi_pendek' => 'Thalamus operations',
          ),
          106 => 
          array (
            'kode' => '01.42',
            'deskripsi_panjang' => 'Operations on globus pallidus',
            'deskripsi_pendek' => 'Globus pallidus ops',
          ),
          107 => 
          array (
            'kode' => '01.51',
            'deskripsi_panjang' => 'Excision of lesion or tissue of cerebral meninges',
            'deskripsi_pendek' => 'Ex cereb meningeal les',
          ),
          108 => 
          array (
            'kode' => '01.52',
            'deskripsi_panjang' => 'Hemispherectomy',
            'deskripsi_pendek' => 'Hemispherectomy',
          ),
          109 => 
          array (
            'kode' => '01.53',
            'deskripsi_panjang' => 'Lobectomy of brain',
            'deskripsi_pendek' => 'Brain lobectomy',
          ),
          110 => 
          array (
            'kode' => '01.59',
            'deskripsi_panjang' => 'Other excision or destruction of lesion or tissue of brain',
            'deskripsi_pendek' => 'Other brain excision',
          ),
          111 => 
          array (
            'kode' => '01.6',
            'deskripsi_panjang' => 'Excision of lesion of skull',
            'deskripsi_pendek' => 'Excise skull lesion',
          ),
          112 => 
          array (
            'kode' => '02.01',
            'deskripsi_panjang' => 'Opening of cranial suture',
            'deskripsi_pendek' => 'Linear craniectomy',
          ),
          113 => 
          array (
            'kode' => '02.02',
            'deskripsi_panjang' => 'Elevation of skull fracture fragments',
            'deskripsi_pendek' => 'Elevate skull fx fragmnt',
          ),
          114 => 
          array (
            'kode' => '02.03',
            'deskripsi_panjang' => 'Formation of cranial bone flap',
            'deskripsi_pendek' => 'Skull flap formation',
          ),
          115 => 
          array (
            'kode' => '02.04',
            'deskripsi_panjang' => 'Bone graft to skull',
            'deskripsi_pendek' => 'Bone graft to skull',
          ),
          116 => 
          array (
            'kode' => '02.05',
            'deskripsi_panjang' => 'Insertion of skull plate',
            'deskripsi_pendek' => 'Skull plate insertion',
          ),
          117 => 
          array (
            'kode' => '02.06',
            'deskripsi_panjang' => 'Other cranial osteoplasty',
            'deskripsi_pendek' => 'Cranial osteoplasty NEC',
          ),
          118 => 
          array (
            'kode' => '02.07',
            'deskripsi_panjang' => 'Removal of skull plate',
            'deskripsi_pendek' => 'Skull plate removal',
          ),
          119 => 
          array (
            'kode' => '02.11',
            'deskripsi_panjang' => 'Simple suture of dura mater of brain',
            'deskripsi_pendek' => 'Simple suture of dura',
          ),
          120 => 
          array (
            'kode' => '02.12',
            'deskripsi_panjang' => 'Other repair of cerebral meninges',
            'deskripsi_pendek' => 'Brain meninge repair NEC',
          ),
          121 => 
          array (
            'kode' => '02.13',
            'deskripsi_panjang' => 'Ligation of meningeal vessel',
            'deskripsi_pendek' => 'Meninge vessel ligation',
          ),
          122 => 
          array (
            'kode' => '02.14',
            'deskripsi_panjang' => 'Choroid plexectomy',
            'deskripsi_pendek' => 'Choroid plexectomy',
          ),
          123 => 
          array (
            'kode' => '02.21',
            'deskripsi_panjang' => 'Insertion or replacement of external ventricular drain [EVD]',
            'deskripsi_pendek' => 'Insert/replace EVD',
          ),
          124 => 
          array (
            'kode' => '02.22',
            'deskripsi_panjang' => 'Intracranial ventricular shunt or anastomosis',
            'deskripsi_pendek' => 'Intrcran vent shunt/anas',
          ),
          125 => 
          array (
            'kode' => '02.31',
            'deskripsi_panjang' => 'Ventricular shunt to structure in head and neck',
            'deskripsi_pendek' => 'Ventricl shunt-head/neck',
          ),
          126 => 
          array (
            'kode' => '02.32',
            'deskripsi_panjang' => 'Ventricular shunt to circulatory system',
            'deskripsi_pendek' => 'Ventri shunt-circula sys',
          ),
          127 => 
          array (
            'kode' => '02.33',
            'deskripsi_panjang' => 'Ventricular shunt to thoracic cavity',
            'deskripsi_pendek' => 'Ventricl shunt-thorax',
          ),
          128 => 
          array (
            'kode' => '02.34',
            'deskripsi_panjang' => 'Ventricular shunt to abdominal cavity and organs',
            'deskripsi_pendek' => 'Ventricl shunt-abdomen',
          ),
          129 => 
          array (
            'kode' => '02.35',
            'deskripsi_panjang' => 'Ventricular shunt to urinary system',
            'deskripsi_pendek' => 'Ventri shunt-uninary sys',
          ),
          130 => 
          array (
            'kode' => '02.39',
            'deskripsi_panjang' => 'Ventricular shunt to extracranial site NEC',
            'deskripsi_pendek' => 'Vent shunt extracran NEC',
          ),
          131 => 
          array (
            'kode' => '02.41',
            'deskripsi_panjang' => 'Irrigation and exploration of ventricular shunt',
            'deskripsi_pendek' => 'Irrigate/expl vent shunt',
          ),
          132 => 
          array (
            'kode' => '02.42',
            'deskripsi_panjang' => 'Replacement of ventricular shunt',
            'deskripsi_pendek' => 'Replace ventricle shunt',
          ),
          133 => 
          array (
            'kode' => '02.43',
            'deskripsi_panjang' => 'Removal of ventricular shunt',
            'deskripsi_pendek' => 'Remove ventricle shunt',
          ),
          134 => 
          array (
            'kode' => '02.91',
            'deskripsi_panjang' => 'Lysis of cortical adhesions',
            'deskripsi_pendek' => 'Lysis cortical adhesion',
          ),
          135 => 
          array (
            'kode' => '02.92',
            'deskripsi_panjang' => 'Repair of brain',
            'deskripsi_pendek' => 'Brain repair',
          ),
          136 => 
          array (
            'kode' => '02.93',
            'deskripsi_panjang' => 'Implantation or replacement of intracranial neurostimulator lead(s)',
            'deskripsi_pendek' => 'Imp/repl brain stim lead',
          ),
          137 => 
          array (
            'kode' => '02.94',
            'deskripsi_panjang' => 'Insertion or replacement of skull tongs or halo traction device',
            'deskripsi_pendek' => 'Insert/replac skull tong',
          ),
          138 => 
          array (
            'kode' => '02.95',
            'deskripsi_panjang' => 'Removal of skull tongs or halo traction device',
            'deskripsi_pendek' => 'Remove skull tongs',
          ),
          139 => 
          array (
            'kode' => '02.96',
            'deskripsi_panjang' => 'Insertion of sphenoidal electrodes',
            'deskripsi_pendek' => 'Insert sphenoid electrod',
          ),
          140 => 
          array (
            'kode' => '02.99',
            'deskripsi_panjang' => 'Other operations on skull, brain, and cerebral meninges',
            'deskripsi_pendek' => 'Skull & brain op NEC',
          ),
          141 => 
          array (
            'kode' => '03.01',
            'deskripsi_panjang' => 'Removal of foreign body from spinal canal',
            'deskripsi_pendek' => 'Removal FB spinal canal',
          ),
          142 => 
          array (
            'kode' => '03.02',
            'deskripsi_panjang' => 'Reopening of laminectomy site',
            'deskripsi_pendek' => 'Reopen laminectomy site',
          ),
          143 => 
          array (
            'kode' => '03.09',
            'deskripsi_panjang' => 'Other exploration and decompression of spinal canal',
            'deskripsi_pendek' => 'Spinal canal explor NEC',
          ),
          144 => 
          array (
            'kode' => '03.1',
            'deskripsi_panjang' => 'Division of intraspinal nerve root',
            'deskripsi_pendek' => 'Intraspin nerve root div',
          ),
          145 => 
          array (
            'kode' => '03.21',
            'deskripsi_panjang' => 'Percutaneous chordotomy',
            'deskripsi_pendek' => 'Percutaneous chordotomy',
          ),
          146 => 
          array (
            'kode' => '03.29',
            'deskripsi_panjang' => 'Other chordotomy',
            'deskripsi_pendek' => 'Other chordotomy',
          ),
          147 => 
          array (
            'kode' => '03.31',
            'deskripsi_panjang' => 'Spinal tap',
            'deskripsi_pendek' => 'Spinal tap',
          ),
          148 => 
          array (
            'kode' => '03.32',
            'deskripsi_panjang' => 'Biopsy of spinal cord or spinal meninges',
            'deskripsi_pendek' => 'Spinal cord/meninges bx',
          ),
          149 => 
          array (
            'kode' => '03.39',
            'deskripsi_panjang' => 'Other diagnostic procedures on spinal cord and spinal canal structures',
            'deskripsi_pendek' => 'Other spinal dx proc',
          ),
          150 => 
          array (
            'kode' => '03.4',
            'deskripsi_panjang' => 'Excision or destruction of lesion of spinal cord or spinal meninges',
            'deskripsi_pendek' => 'Excis spinal cord lesion',
          ),
          151 => 
          array (
            'kode' => '03.51',
            'deskripsi_panjang' => 'Repair of spinal meningocele',
            'deskripsi_pendek' => 'Spine meningocele repair',
          ),
          152 => 
          array (
            'kode' => '03.52',
            'deskripsi_panjang' => 'Repair of spinal myelomeningocele',
            'deskripsi_pendek' => 'Myelomeningocel repair',
          ),
          153 => 
          array (
            'kode' => '03.53',
            'deskripsi_panjang' => 'Repair of vertebral fracture',
            'deskripsi_pendek' => 'Vertebral fx repair',
          ),
          154 => 
          array (
            'kode' => '03.59',
            'deskripsi_panjang' => 'Other repair and plastic operations on spinal cord structures',
            'deskripsi_pendek' => 'Spinal struct repair NEC',
          ),
          155 => 
          array (
            'kode' => '03.6',
            'deskripsi_panjang' => 'Lysis of adhesions of spinal cord and nerve roots',
            'deskripsi_pendek' => 'Spinal cord adhesiolysis',
          ),
          156 => 
          array (
            'kode' => '03.71',
            'deskripsi_panjang' => 'Spinal subarachnoid-peritoneal shunt',
            'deskripsi_pendek' => 'Subarach-periton shunt',
          ),
          157 => 
          array (
            'kode' => '03.72',
            'deskripsi_panjang' => 'Spinal subarachnoid-ureteral shunt',
            'deskripsi_pendek' => 'Subarach-ureteral shunt',
          ),
          158 => 
          array (
            'kode' => '03.79',
            'deskripsi_panjang' => 'Other shunt of spinal theca',
            'deskripsi_pendek' => 'Oth spinal thecal shunt',
          ),
          159 => 
          array (
            'kode' => '03.8',
            'deskripsi_panjang' => 'Injection of destructive agent into spinal canal',
            'deskripsi_pendek' => 'Destr inject-spine canal',
          ),
          160 => 
          array (
            'kode' => '03.90',
            'deskripsi_panjang' => 'Insertion of catheter into spinal canal for infusion of therapeutic or palliative substances',
            'deskripsi_pendek' => 'Insert spinal canal cath',
          ),
          161 => 
          array (
            'kode' => '03.91',
            'deskripsi_panjang' => 'Injection of anesthetic into spinal canal for analgesia',
            'deskripsi_pendek' => 'Anesth inject-spin canal',
          ),
          162 => 
          array (
            'kode' => '03.92',
            'deskripsi_panjang' => 'Injection of other agent into spinal canal',
            'deskripsi_pendek' => 'Spinal canal inject NEC',
          ),
          163 => 
          array (
            'kode' => '03.93',
            'deskripsi_panjang' => 'Implantation or replacement of spinal neurostimulator lead(s)',
            'deskripsi_pendek' => 'Imp/repl spine stim lead',
          ),
          164 => 
          array (
            'kode' => '03.94',
            'deskripsi_panjang' => 'Removal of spinal neurostimulator lead(s)',
            'deskripsi_pendek' => 'Removal spine stim lead',
          ),
          165 => 
          array (
            'kode' => '03.95',
            'deskripsi_panjang' => 'Spinal blood patch',
            'deskripsi_pendek' => 'Spinal patch',
          ),
          166 => 
          array (
            'kode' => '03.96',
            'deskripsi_panjang' => 'Percutaneous denervation of facet',
            'deskripsi_pendek' => 'Percutan facet denervat',
          ),
          167 => 
          array (
            'kode' => '03.97',
            'deskripsi_panjang' => 'Revision of spinal thecal shunt',
            'deskripsi_pendek' => 'Revise spine theca shunt',
          ),
          168 => 
          array (
            'kode' => '03.98',
            'deskripsi_panjang' => 'Removal of spinal thecal shunt',
            'deskripsi_pendek' => 'Remove spine theca shunt',
          ),
          169 => 
          array (
            'kode' => '03.99',
            'deskripsi_panjang' => 'Other operations on spinal cord and spinal canal structures',
            'deskripsi_pendek' => 'Spine canal struc op NEC',
          ),
          170 => 
          array (
            'kode' => '04.01',
            'deskripsi_panjang' => 'Excision of acoustic neuroma',
            'deskripsi_pendek' => 'Excision acoustc neuroma',
          ),
          171 => 
          array (
            'kode' => '04.02',
            'deskripsi_panjang' => 'Division of trigeminal nerve',
            'deskripsi_pendek' => 'Trigeminal nerv division',
          ),
          172 => 
          array (
            'kode' => '04.03',
            'deskripsi_panjang' => 'Division or crushing of other cranial and peripheral nerves',
            'deskripsi_pendek' => 'Periph nerve div NEC',
          ),
          173 => 
          array (
            'kode' => '04.04',
            'deskripsi_panjang' => 'Other incision of cranial and peripheral nerves',
            'deskripsi_pendek' => 'Periph nerve incis NEC',
          ),
          174 => 
          array (
            'kode' => '04.05',
            'deskripsi_panjang' => 'Gasserian ganglionectomy',
            'deskripsi_pendek' => 'Gasserian ganglionectomy',
          ),
          175 => 
          array (
            'kode' => '04.06',
            'deskripsi_panjang' => 'Other cranial or peripheral ganglionectomy',
            'deskripsi_pendek' => 'Periph ganglionect NEC',
          ),
          176 => 
          array (
            'kode' => '04.07',
            'deskripsi_panjang' => 'Other excision or avulsion of cranial and peripheral nerves',
            'deskripsi_pendek' => 'Periph nerv excision NEC',
          ),
          177 => 
          array (
            'kode' => '04.11',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of cranial or peripheral nerve or ganglion',
            'deskripsi_pendek' => 'Clos periph nerve biopsy',
          ),
          178 => 
          array (
            'kode' => '04.12',
            'deskripsi_panjang' => 'Open biopsy of cranial or peripheral nerve or ganglion',
            'deskripsi_pendek' => 'Open periph nerve biopsy',
          ),
          179 => 
          array (
            'kode' => '04.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on cranial and peripheral nerves and ganglia',
            'deskripsi_pendek' => 'Periph nerve dx proc NEC',
          ),
          180 => 
          array (
            'kode' => '04.2',
            'deskripsi_panjang' => 'Destruction of cranial and peripheral nerves',
            'deskripsi_pendek' => 'Periph nerve destruction',
          ),
          181 => 
          array (
            'kode' => '04.3',
            'deskripsi_panjang' => 'Suture of cranial and peripheral nerves',
            'deskripsi_pendek' => 'Peripheral nerve suture',
          ),
          182 => 
          array (
            'kode' => '04.41',
            'deskripsi_panjang' => 'Decompression of trigeminal nerve root',
            'deskripsi_pendek' => 'Decompress trigem root',
          ),
          183 => 
          array (
            'kode' => '04.42',
            'deskripsi_panjang' => 'Other cranial nerve decompression',
            'deskripsi_pendek' => 'Cran nerv root decom NEC',
          ),
          184 => 
          array (
            'kode' => '04.43',
            'deskripsi_panjang' => 'Release of carpal tunnel',
            'deskripsi_pendek' => 'Carpal tunnel release',
          ),
          185 => 
          array (
            'kode' => '04.44',
            'deskripsi_panjang' => 'Release of tarsal tunnel',
            'deskripsi_pendek' => 'Tarsal tunnel release',
          ),
          186 => 
          array (
            'kode' => '04.49',
            'deskripsi_panjang' => 'Other peripheral nerve or ganglion decompression or lysis of adhesions',
            'deskripsi_pendek' => 'Per nerve adhesiolys NEC',
          ),
          187 => 
          array (
            'kode' => '04.5',
            'deskripsi_panjang' => 'Cranial or peripheral nerve graft',
            'deskripsi_pendek' => 'Peripheral nerve graft',
          ),
          188 => 
          array (
            'kode' => '04.6',
            'deskripsi_panjang' => 'Transposition of cranial and peripheral nerves',
            'deskripsi_pendek' => 'Periph nerve transposit',
          ),
          189 => 
          array (
            'kode' => '04.71',
            'deskripsi_panjang' => 'Hypoglossal-facial anastomosis',
            'deskripsi_pendek' => 'Hypogloss-facial anastom',
          ),
          190 => 
          array (
            'kode' => '04.72',
            'deskripsi_panjang' => 'Accessory-facial anastomosis',
            'deskripsi_pendek' => 'Accessory-facial anastom',
          ),
          191 => 
          array (
            'kode' => '04.73',
            'deskripsi_panjang' => 'Accessory-hypoglossal anastomosis',
            'deskripsi_pendek' => 'Access-hypogloss anastom',
          ),
          192 => 
          array (
            'kode' => '04.74',
            'deskripsi_panjang' => 'Other anastomosis of cranial or peripheral nerve',
            'deskripsi_pendek' => 'Periph nerv anastom NEC',
          ),
          193 => 
          array (
            'kode' => '04.75',
            'deskripsi_panjang' => 'Revision of previous repair of cranial and peripheral nerves',
            'deskripsi_pendek' => 'Postop revis per nerv op',
          ),
          194 => 
          array (
            'kode' => '04.76',
            'deskripsi_panjang' => 'Repair of old traumatic injury of cranial and peripheral nerves',
            'deskripsi_pendek' => 'Late repair per nerv inj',
          ),
          195 => 
          array (
            'kode' => '04.79',
            'deskripsi_panjang' => 'Other neuroplasty',
            'deskripsi_pendek' => 'Other neuroplasty',
          ),
          196 => 
          array (
            'kode' => '04.80',
            'deskripsi_panjang' => 'Peripheral nerve injection, not otherwise specified',
            'deskripsi_pendek' => 'Periph nerve inject NOS',
          ),
          197 => 
          array (
            'kode' => '04.81',
            'deskripsi_panjang' => 'Injection of anesthetic into peripheral nerve for analgesia',
            'deskripsi_pendek' => 'Anesth injec periph nerv',
          ),
          198 => 
          array (
            'kode' => '04.89',
            'deskripsi_panjang' => 'Injection of other agent, except neurolytic',
            'deskripsi_pendek' => 'Periph nerve inject NEC',
          ),
          199 => 
          array (
            'kode' => '04.91',
            'deskripsi_panjang' => 'Neurectasis',
            'deskripsi_pendek' => 'Neurectasis',
          ),
          200 => 
          array (
            'kode' => '04.92',
            'deskripsi_panjang' => 'Implantation or replacement of peripheral neurostimulator lead(s)',
            'deskripsi_pendek' => 'Imp/repl peri stim lead',
          ),
          201 => 
          array (
            'kode' => '04.93',
            'deskripsi_panjang' => 'Removal of peripheral neurostimulator lead(s)',
            'deskripsi_pendek' => 'Removal peri stim lead',
          ),
          202 => 
          array (
            'kode' => '04.99',
            'deskripsi_panjang' => 'Other operations on cranial and peripheral nerves',
            'deskripsi_pendek' => 'Peripheral nerve ops NEC',
          ),
          203 => 
          array (
            'kode' => '05.0',
            'deskripsi_panjang' => 'Division of sympathetic nerve or ganglion',
            'deskripsi_pendek' => 'Sympath nerve division',
          ),
          204 => 
          array (
            'kode' => '05.11',
            'deskripsi_panjang' => 'Biopsy of sympathetic nerve or ganglion',
            'deskripsi_pendek' => 'Sympathetic nerve biopsy',
          ),
          205 => 
          array (
            'kode' => '05.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on sympathetic nerves or ganglia',
            'deskripsi_pendek' => 'Sympath nrv dx proc NEC',
          ),
          206 => 
          array (
            'kode' => '05.21',
            'deskripsi_panjang' => 'Sphenopalatine ganglionectomy',
            'deskripsi_pendek' => 'Sphenopalatin ganglionec',
          ),
          207 => 
          array (
            'kode' => '05.22',
            'deskripsi_panjang' => 'Cervical sympathectomy',
            'deskripsi_pendek' => 'Cervical sympathectomy',
          ),
          208 => 
          array (
            'kode' => '05.23',
            'deskripsi_panjang' => 'Lumbar sympathectomy',
            'deskripsi_pendek' => 'Lumbar sympathectomy',
          ),
          209 => 
          array (
            'kode' => '05.24',
            'deskripsi_panjang' => 'Presacral sympathectomy',
            'deskripsi_pendek' => 'Presacral sympathectomy',
          ),
          210 => 
          array (
            'kode' => '05.25',
            'deskripsi_panjang' => 'Periarterial sympathectomy',
            'deskripsi_pendek' => 'Periart sympathectomy',
          ),
          211 => 
          array (
            'kode' => '05.29',
            'deskripsi_panjang' => 'Other sympathectomy and ganglionectomy',
            'deskripsi_pendek' => 'Other sympathectomy',
          ),
          212 => 
          array (
            'kode' => '05.31',
            'deskripsi_panjang' => 'Injection of anesthetic into sympathetic nerve for analgesia',
            'deskripsi_pendek' => 'Anesth inject symp nerve',
          ),
          213 => 
          array (
            'kode' => '05.32',
            'deskripsi_panjang' => 'Injection of neurolytic agent into sympathetic nerve',
            'deskripsi_pendek' => 'Neurolyt injec-symp nrv',
          ),
          214 => 
          array (
            'kode' => '05.39',
            'deskripsi_panjang' => 'Other injection into sympathetic nerve or ganglion',
            'deskripsi_pendek' => 'Sympath nerve inject NEC',
          ),
          215 => 
          array (
            'kode' => '05.81',
            'deskripsi_panjang' => 'Repair of sympathetic nerve or ganglion',
            'deskripsi_pendek' => 'Sympathetic nerve repair',
          ),
          216 => 
          array (
            'kode' => '05.89',
            'deskripsi_panjang' => 'Other operations on sympathetic nerves or ganglia',
            'deskripsi_pendek' => 'Sympathetic nerve op NEC',
          ),
          217 => 
          array (
            'kode' => '05.9',
            'deskripsi_panjang' => 'Other operations on nervous system',
            'deskripsi_pendek' => 'Other nervous system ops',
          ),
          218 => 
          array (
            'kode' => '06.01',
            'deskripsi_panjang' => 'Aspiration of thyroid field',
            'deskripsi_pendek' => 'Thyroid field aspiration',
          ),
          219 => 
          array (
            'kode' => '06.02',
            'deskripsi_panjang' => 'Reopening of wound of thyroid field',
            'deskripsi_pendek' => 'Reopen thyroid field wnd',
          ),
          220 => 
          array (
            'kode' => '06.09',
            'deskripsi_panjang' => 'Other incision of thyroid field',
            'deskripsi_pendek' => 'Incis thyroid field NEC',
          ),
          221 => 
          array (
            'kode' => '06.11',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of thyroid gland',
            'deskripsi_pendek' => 'Closed thyroid gland bx',
          ),
          222 => 
          array (
            'kode' => '06.12',
            'deskripsi_panjang' => 'Open biopsy of thyroid gland',
            'deskripsi_pendek' => 'Open thyroid gland bx',
          ),
          223 => 
          array (
            'kode' => '06.13',
            'deskripsi_panjang' => 'Biopsy of parathyroid gland',
            'deskripsi_pendek' => 'Parathyroid biopsy',
          ),
          224 => 
          array (
            'kode' => '06.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on thyroid and parathyroid glands',
            'deskripsi_pendek' => 'Thyr/parathy dx proc NEC',
          ),
          225 => 
          array (
            'kode' => '06.2',
            'deskripsi_panjang' => 'Unilateral thyroid lobectomy',
            'deskripsi_pendek' => 'Unilat thyroid lobectomy',
          ),
          226 => 
          array (
            'kode' => '06.31',
            'deskripsi_panjang' => 'Excision of lesion of thyroid',
            'deskripsi_pendek' => 'Excision thyroid lesion',
          ),
          227 => 
          array (
            'kode' => '06.39',
            'deskripsi_panjang' => 'Other partial thyroidectomy',
            'deskripsi_pendek' => 'Part thyroidectomy NEC',
          ),
          228 => 
          array (
            'kode' => '06.4',
            'deskripsi_panjang' => 'Complete thyroidectomy',
            'deskripsi_pendek' => 'Complete thyroidectomy',
          ),
          229 => 
          array (
            'kode' => '06.50',
            'deskripsi_panjang' => 'Substernal thyroidectomy, not otherwise specified',
            'deskripsi_pendek' => 'Substern thyroidect NOS',
          ),
          230 => 
          array (
            'kode' => '06.51',
            'deskripsi_panjang' => 'Partial substernal thyroidectomy',
            'deskripsi_pendek' => 'Part substern thyroidect',
          ),
          231 => 
          array (
            'kode' => '06.52',
            'deskripsi_panjang' => 'Complete substernal thyroidectomy',
            'deskripsi_pendek' => 'Tot substern thyroidect',
          ),
          232 => 
          array (
            'kode' => '06.6',
            'deskripsi_panjang' => 'Excision of lingual thyroid',
            'deskripsi_pendek' => 'Lingual thyroid excision',
          ),
          233 => 
          array (
            'kode' => '06.7',
            'deskripsi_panjang' => 'Excision of thyroglossal duct or tract',
            'deskripsi_pendek' => 'Thyrogloss duct excision',
          ),
          234 => 
          array (
            'kode' => '06.81',
            'deskripsi_panjang' => 'Complete parathyroidectomy',
            'deskripsi_pendek' => 'Total parathyroidectomy',
          ),
          235 => 
          array (
            'kode' => '06.89',
            'deskripsi_panjang' => 'Other parathyroidectomy',
            'deskripsi_pendek' => 'Other parathyroidectomy',
          ),
          236 => 
          array (
            'kode' => '06.91',
            'deskripsi_panjang' => 'Division of thyroid isthmus',
            'deskripsi_pendek' => 'Thyroid isthmus division',
          ),
          237 => 
          array (
            'kode' => '06.92',
            'deskripsi_panjang' => 'Ligation of thyroid vessels',
            'deskripsi_pendek' => 'Thyroid vessel ligation',
          ),
          238 => 
          array (
            'kode' => '06.93',
            'deskripsi_panjang' => 'Suture of thyroid gland',
            'deskripsi_pendek' => 'Thyroid suture',
          ),
          239 => 
          array (
            'kode' => '06.94',
            'deskripsi_panjang' => 'Thyroid tissue reimplantation',
            'deskripsi_pendek' => 'Thyroid reimplantation',
          ),
          240 => 
          array (
            'kode' => '06.95',
            'deskripsi_panjang' => 'Parathyroid tissue reimplantation',
            'deskripsi_pendek' => 'Parathyroid reimplant',
          ),
          241 => 
          array (
            'kode' => '06.98',
            'deskripsi_panjang' => 'Other operations on thyroid glands',
            'deskripsi_pendek' => 'Other thyroid operations',
          ),
          242 => 
          array (
            'kode' => '06.99',
            'deskripsi_panjang' => 'Other operations on parathyroid glands',
            'deskripsi_pendek' => 'Other parathyroid ops',
          ),
          243 => 
          array (
            'kode' => '07.00',
            'deskripsi_panjang' => 'Exploration of adrenal field, not otherwise specified',
            'deskripsi_pendek' => 'Adrenal exploration NOS',
          ),
          244 => 
          array (
            'kode' => '07.01',
            'deskripsi_panjang' => 'Unilateral exploration of adrenal field',
            'deskripsi_pendek' => 'Unilat adrenal explorat',
          ),
          245 => 
          array (
            'kode' => '07.02',
            'deskripsi_panjang' => 'Bilateral exploration of adrenal field',
            'deskripsi_pendek' => 'Bilat adrenal explorat',
          ),
          246 => 
          array (
            'kode' => '07.11',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of adrenal gland',
            'deskripsi_pendek' => 'Closed adrenal gland bx',
          ),
          247 => 
          array (
            'kode' => '07.12',
            'deskripsi_panjang' => 'Open biopsy of adrenal gland',
            'deskripsi_pendek' => 'Open adrenal gland bx',
          ),
          248 => 
          array (
            'kode' => '07.13',
            'deskripsi_panjang' => 'Biopsy of pituitary gland, transfrontal approach',
            'deskripsi_pendek' => 'Transfront pituitary bx',
          ),
          249 => 
          array (
            'kode' => '07.14',
            'deskripsi_panjang' => 'Biopsy of pituitary gland, transsphenoidal approach',
            'deskripsi_pendek' => 'Transphen pituitary bx',
          ),
          250 => 
          array (
            'kode' => '07.15',
            'deskripsi_panjang' => 'Biopsy of pituitary gland, unspecified approach',
            'deskripsi_pendek' => 'Pituitary biopsy NOS',
          ),
          251 => 
          array (
            'kode' => '07.16',
            'deskripsi_panjang' => 'Biopsy of thymus',
            'deskripsi_pendek' => 'Thymus biopsy',
          ),
          252 => 
          array (
            'kode' => '07.17',
            'deskripsi_panjang' => 'Biopsy of pineal gland',
            'deskripsi_pendek' => 'Pineal biopsy',
          ),
          253 => 
          array (
            'kode' => '07.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on adrenal glands, pituitary gland, pineal gland, and thymus',
            'deskripsi_pendek' => 'Endocrine dx proc NEC',
          ),
          254 => 
          array (
            'kode' => '07.21',
            'deskripsi_panjang' => 'Excision of lesion of adrenal gland',
            'deskripsi_pendek' => 'Adrenal lesion excision',
          ),
          255 => 
          array (
            'kode' => '07.22',
            'deskripsi_panjang' => 'Unilateral adrenalectomy',
            'deskripsi_pendek' => 'Unilateral adrenalectomy',
          ),
          256 => 
          array (
            'kode' => '07.29',
            'deskripsi_panjang' => 'Other partial adrenalectomy',
            'deskripsi_pendek' => 'Part adrenalectomy NEC',
          ),
          257 => 
          array (
            'kode' => '07.3',
            'deskripsi_panjang' => 'Bilateral adrenalectomy',
            'deskripsi_pendek' => 'Bilateral adrenalectomy',
          ),
          258 => 
          array (
            'kode' => '07.41',
            'deskripsi_panjang' => 'Incision of adrenal gland',
            'deskripsi_pendek' => 'Adrenal incision',
          ),
          259 => 
          array (
            'kode' => '07.42',
            'deskripsi_panjang' => 'Division of nerves to adrenal glands',
            'deskripsi_pendek' => 'Adrenal nerve division',
          ),
          260 => 
          array (
            'kode' => '07.43',
            'deskripsi_panjang' => 'Ligation of adrenal vessels',
            'deskripsi_pendek' => 'Adrenal vessel ligation',
          ),
          261 => 
          array (
            'kode' => '07.44',
            'deskripsi_panjang' => 'Repair of adrenal gland',
            'deskripsi_pendek' => 'Adrenal repair',
          ),
          262 => 
          array (
            'kode' => '07.45',
            'deskripsi_panjang' => 'Reimplantation of adrenal tissue',
            'deskripsi_pendek' => 'Adrenal reimplantation',
          ),
          263 => 
          array (
            'kode' => '07.49',
            'deskripsi_panjang' => 'Other operations on adrenal glands, nerves, and vessels',
            'deskripsi_pendek' => 'Adrenal operation NEC',
          ),
          264 => 
          array (
            'kode' => '07.51',
            'deskripsi_panjang' => 'Exploration of pineal field',
            'deskripsi_pendek' => 'Pineal field exploration',
          ),
          265 => 
          array (
            'kode' => '07.52',
            'deskripsi_panjang' => 'Incision of pineal gland',
            'deskripsi_pendek' => 'Pineal gland incision',
          ),
          266 => 
          array (
            'kode' => '07.53',
            'deskripsi_panjang' => 'Partial excision of pineal gland',
            'deskripsi_pendek' => 'Partial pinealectomy',
          ),
          267 => 
          array (
            'kode' => '07.54',
            'deskripsi_panjang' => 'Total excision of pineal gland',
            'deskripsi_pendek' => 'Total pinealectomy',
          ),
          268 => 
          array (
            'kode' => '07.59',
            'deskripsi_panjang' => 'Other operations on pineal gland',
            'deskripsi_pendek' => 'Pineal operation NEC',
          ),
          269 => 
          array (
            'kode' => '07.61',
            'deskripsi_panjang' => 'Partial excision of pituitary gland, transfrontal approach',
            'deskripsi_pendek' => 'Exc pituit les-transfron',
          ),
          270 => 
          array (
            'kode' => '07.62',
            'deskripsi_panjang' => 'Partial excision of pituitary gland, transsphenoidal approach',
            'deskripsi_pendek' => 'Exc pituit les-transphen',
          ),
          271 => 
          array (
            'kode' => '07.63',
            'deskripsi_panjang' => 'Partial excision of pituitary gland, unspecified approach',
            'deskripsi_pendek' => 'Part excis pituitary NOS',
          ),
          272 => 
          array (
            'kode' => '07.64',
            'deskripsi_panjang' => 'Total excision of pituitary gland, transfrontal approach',
            'deskripsi_pendek' => 'Tot exc pituit-transfron',
          ),
          273 => 
          array (
            'kode' => '07.65',
            'deskripsi_panjang' => 'Total excision of pituitary gland, transsphenoidal approach',
            'deskripsi_pendek' => 'Tot exc pituit-transphen',
          ),
          274 => 
          array (
            'kode' => '07.68',
            'deskripsi_panjang' => 'Total excision of pituitary gland, other specified approach',
            'deskripsi_pendek' => 'Total exc pituitary NEC',
          ),
          275 => 
          array (
            'kode' => '07.69',
            'deskripsi_panjang' => 'Total excision of pituitary gland, unspecified approach',
            'deskripsi_pendek' => 'Total exc pituitary NOS',
          ),
          276 => 
          array (
            'kode' => '07.71',
            'deskripsi_panjang' => 'Exploration of pituitary fossa',
            'deskripsi_pendek' => 'Pituitary fossa explorat',
          ),
          277 => 
          array (
            'kode' => '07.72',
            'deskripsi_panjang' => 'Incision of pituitary gland',
            'deskripsi_pendek' => 'Pituitary gland incision',
          ),
          278 => 
          array (
            'kode' => '07.79',
            'deskripsi_panjang' => 'Other operations on hypophysis',
            'deskripsi_pendek' => 'Pituitary operation NEC',
          ),
          279 => 
          array (
            'kode' => '07.80',
            'deskripsi_panjang' => 'Thymectomy, not otherwise specified',
            'deskripsi_pendek' => 'Thymectomy NOS',
          ),
          280 => 
          array (
            'kode' => '07.81',
            'deskripsi_panjang' => 'Other partial excision of thymus',
            'deskripsi_pendek' => 'Oth part excision thymus',
          ),
          281 => 
          array (
            'kode' => '07.82',
            'deskripsi_panjang' => 'Other total excision of thymus',
            'deskripsi_pendek' => 'Oth totl excision thymus',
          ),
          282 => 
          array (
            'kode' => '07.83',
            'deskripsi_panjang' => 'Thoracoscopic partial excision of thymus',
            'deskripsi_pendek' => 'Thorac part exisn thymus',
          ),
          283 => 
          array (
            'kode' => '07.84',
            'deskripsi_panjang' => 'Thoracoscopic total excision of thymus',
            'deskripsi_pendek' => 'Thorac total exc thymus',
          ),
          284 => 
          array (
            'kode' => '07.91',
            'deskripsi_panjang' => 'Exploration of thymus field',
            'deskripsi_pendek' => 'Thymus field exploration',
          ),
          285 => 
          array (
            'kode' => '07.92',
            'deskripsi_panjang' => 'Other incision of thymus',
            'deskripsi_pendek' => 'Other incision of thymus',
          ),
          286 => 
          array (
            'kode' => '07.93',
            'deskripsi_panjang' => 'Repair of thymus',
            'deskripsi_pendek' => 'Repair of thymus',
          ),
          287 => 
          array (
            'kode' => '07.94',
            'deskripsi_panjang' => 'Transplantation of thymus',
            'deskripsi_pendek' => 'Thymus transplantation',
          ),
          288 => 
          array (
            'kode' => '07.95',
            'deskripsi_panjang' => 'Thoracoscopic incision of thymus',
            'deskripsi_pendek' => 'Thorac incision thymus',
          ),
          289 => 
          array (
            'kode' => '07.98',
            'deskripsi_panjang' => 'Other and unspecified thoracoscopic operations on thymus',
            'deskripsi_pendek' => 'Oth thorac op thymus NOS',
          ),
          290 => 
          array (
            'kode' => '07.99',
            'deskripsi_panjang' => 'Other and unspecified operations on thymus',
            'deskripsi_pendek' => 'Other thymus ops NOS',
          ),
          291 => 
          array (
            'kode' => '08.01',
            'deskripsi_panjang' => 'Incision of lid margin',
            'deskripsi_pendek' => 'Incision of lid margin',
          ),
          292 => 
          array (
            'kode' => '08.02',
            'deskripsi_panjang' => 'Severing of blepharorrhaphy',
            'deskripsi_pendek' => 'Blepharorrhaphy severing',
          ),
          293 => 
          array (
            'kode' => '08.09',
            'deskripsi_panjang' => 'Other incision of eyelid',
            'deskripsi_pendek' => 'Other eyelid incision',
          ),
          294 => 
          array (
            'kode' => '08.11',
            'deskripsi_panjang' => 'Biopsy of eyelid',
            'deskripsi_pendek' => 'Eyelid biopsy',
          ),
          295 => 
          array (
            'kode' => '08.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on eyelid',
            'deskripsi_pendek' => 'Eyelid dx procedure NEC',
          ),
          296 => 
          array (
            'kode' => '08.20',
            'deskripsi_panjang' => 'Removal of lesion of eyelid, not otherwise specified',
            'deskripsi_pendek' => 'Remove eyelid lesion NOS',
          ),
          297 => 
          array (
            'kode' => '08.21',
            'deskripsi_panjang' => 'Excision of chalazion',
            'deskripsi_pendek' => 'Chalazion excision',
          ),
          298 => 
          array (
            'kode' => '08.22',
            'deskripsi_panjang' => 'Excision of other minor lesion of eyelid',
            'deskripsi_pendek' => 'Excise minor les lid NEC',
          ),
          299 => 
          array (
            'kode' => '08.23',
            'deskripsi_panjang' => 'Excision of major lesion of eyelid, partial-thickness',
            'deskripsi_pendek' => 'Exc maj les lid prt-thic',
          ),
          300 => 
          array (
            'kode' => '08.24',
            'deskripsi_panjang' => 'Excision of major lesion of eyelid, full-thickness',
            'deskripsi_pendek' => 'Exc maj les lid ful-thic',
          ),
          301 => 
          array (
            'kode' => '08.25',
            'deskripsi_panjang' => 'Destruction of lesion of eyelid',
            'deskripsi_pendek' => 'Destruction lid lesion',
          ),
          302 => 
          array (
            'kode' => '08.31',
            'deskripsi_panjang' => 'Repair of blepharoptosis by frontalis muscle technique with suture',
            'deskripsi_pendek' => 'Ptosis rep-front mus sut',
          ),
          303 => 
          array (
            'kode' => '08.32',
            'deskripsi_panjang' => 'Repair of blepharoptosis by frontalis muscle technique with fascial sling',
            'deskripsi_pendek' => 'Ptosis rep-fron mus slng',
          ),
          304 => 
          array (
            'kode' => '08.33',
            'deskripsi_panjang' => 'Repair of blepharoptosis by resection or advancement of levator muscle or aponeurosis',
            'deskripsi_pendek' => 'Ptosis rep-levat mus adv',
          ),
          305 => 
          array (
            'kode' => '08.34',
            'deskripsi_panjang' => 'Repair of blepharoptosis by other levator muscle techniques',
            'deskripsi_pendek' => 'Ptosis rep-levat mus NEC',
          ),
          306 => 
          array (
            'kode' => '08.35',
            'deskripsi_panjang' => 'Repair of blepharoptosis by tarsal technique',
            'deskripsi_pendek' => 'Ptos rep-tarsal techniq',
          ),
          307 => 
          array (
            'kode' => '08.36',
            'deskripsi_panjang' => 'Repair of blepharoptosis by other techniques',
            'deskripsi_pendek' => 'Blepharoptos repair NEC',
          ),
          308 => 
          array (
            'kode' => '08.37',
            'deskripsi_panjang' => 'Reduction of overcorrection of ptosis',
            'deskripsi_pendek' => 'Reduc overcorrect ptosis',
          ),
          309 => 
          array (
            'kode' => '08.38',
            'deskripsi_panjang' => 'Correction of lid retraction',
            'deskripsi_pendek' => 'Correct lid retraction',
          ),
          310 => 
          array (
            'kode' => '08.41',
            'deskripsi_panjang' => 'Repair of entropion or ectropion by thermocauterization',
            'deskripsi_pendek' => 'Thermocaut/entropion rep',
          ),
          311 => 
          array (
            'kode' => '08.42',
            'deskripsi_panjang' => 'Repair of entropion or ectropion by suture technique',
            'deskripsi_pendek' => 'Suture entropion repair',
          ),
          312 => 
          array (
            'kode' => '08.43',
            'deskripsi_panjang' => 'Repair of entropion or ectropion with wedge resection',
            'deskripsi_pendek' => 'Wedg resec entropion rep',
          ),
          313 => 
          array (
            'kode' => '08.44',
            'deskripsi_panjang' => 'Repair of entropion or ectropion with lid reconstruction',
            'deskripsi_pendek' => 'Lid recons entropion rep',
          ),
          314 => 
          array (
            'kode' => '08.49',
            'deskripsi_panjang' => 'Other repair of entropion or ectropion',
            'deskripsi_pendek' => 'Entropion/ectrop rep NEC',
          ),
          315 => 
          array (
            'kode' => '08.51',
            'deskripsi_panjang' => 'Canthotomy',
            'deskripsi_pendek' => 'Canthotomy',
          ),
          316 => 
          array (
            'kode' => '08.52',
            'deskripsi_panjang' => 'Blepharorrhaphy',
            'deskripsi_pendek' => 'Blepharorrhaphy',
          ),
          317 => 
          array (
            'kode' => '08.59',
            'deskripsi_panjang' => 'Other adjustment of lid position',
            'deskripsi_pendek' => 'Adjust lid position NEC',
          ),
          318 => 
          array (
            'kode' => '08.61',
            'deskripsi_panjang' => 'Reconstruction of eyelid with skin flap or graft',
            'deskripsi_pendek' => 'Lid reconst w skin graft',
          ),
          319 => 
          array (
            'kode' => '08.62',
            'deskripsi_panjang' => 'Reconstruction of eyelid with mucous membrane flap or graft',
            'deskripsi_pendek' => 'Lid reconst w muc graft',
          ),
          320 => 
          array (
            'kode' => '08.63',
            'deskripsi_panjang' => 'Reconstruction of eyelid with hair follicle graft',
            'deskripsi_pendek' => 'Lid reconst w hair graft',
          ),
          321 => 
          array (
            'kode' => '08.64',
            'deskripsi_panjang' => 'Reconstruction of eyelid with tarsoconjunctival flap',
            'deskripsi_pendek' => 'Lid recon-tarsoconj flap',
          ),
          322 => 
          array (
            'kode' => '08.69',
            'deskripsi_panjang' => 'Other reconstruction of eyelid with flaps or grafts',
            'deskripsi_pendek' => 'Lid reconstr w graft NEC',
          ),
          323 => 
          array (
            'kode' => '08.70',
            'deskripsi_panjang' => 'Reconstruction of eyelid, not otherwise specified',
            'deskripsi_pendek' => 'Lid reconstruction NOS',
          ),
          324 => 
          array (
            'kode' => '08.71',
            'deskripsi_panjang' => 'Reconstruction of eyelid involving lid margin, partial-thickness',
            'deskripsi_pendek' => 'Lid marg recon-part thic',
          ),
          325 => 
          array (
            'kode' => '08.72',
            'deskripsi_panjang' => 'Other reconstruction of eyelid, partial-thickness',
            'deskripsi_pendek' => 'Lid recons-part thic NEC',
          ),
          326 => 
          array (
            'kode' => '08.73',
            'deskripsi_panjang' => 'Reconstruction of eyelid involving lid margin, full-thickness',
            'deskripsi_pendek' => 'Lid marg recons ful thic',
          ),
          327 => 
          array (
            'kode' => '08.74',
            'deskripsi_panjang' => 'Other reconstruction of eyelid, full-thickness',
            'deskripsi_pendek' => 'Lid reconst-ful thic NEC',
          ),
          328 => 
          array (
            'kode' => '08.81',
            'deskripsi_panjang' => 'Linear repair of laceration of eyelid or eyebrow',
            'deskripsi_pendek' => 'Linear rep lid lacer',
          ),
          329 => 
          array (
            'kode' => '08.82',
            'deskripsi_panjang' => 'Repair of laceration involving lid margin, partial-thickness',
            'deskripsi_pendek' => 'Lid marg lac rx-part th',
          ),
          330 => 
          array (
            'kode' => '08.83',
            'deskripsi_panjang' => 'Other repair of laceration of eyelid, partial-thickness',
            'deskripsi_pendek' => 'Lid lacer rx-prt th NEC',
          ),
          331 => 
          array (
            'kode' => '08.84',
            'deskripsi_panjang' => 'Repair of laceration involving lid margin, full-thickness',
            'deskripsi_pendek' => 'Lid marg lac rx-ful thic',
          ),
          332 => 
          array (
            'kode' => '08.85',
            'deskripsi_panjang' => 'Other repair of laceration of eyelid, full-thickness',
            'deskripsi_pendek' => 'Lid lac rx-ful thic NEC',
          ),
          333 => 
          array (
            'kode' => '08.86',
            'deskripsi_panjang' => 'Lower eyelid rhytidectomy',
            'deskripsi_pendek' => 'Lower lid rhytidectomy',
          ),
          334 => 
          array (
            'kode' => '08.87',
            'deskripsi_panjang' => 'Upper eyelid rhytidectomy',
            'deskripsi_pendek' => 'Upper lid rhytidectomy',
          ),
          335 => 
          array (
            'kode' => '08.89',
            'deskripsi_panjang' => 'Other eyelid repair',
            'deskripsi_pendek' => 'Eyelid repair NEC',
          ),
          336 => 
          array (
            'kode' => '08.91',
            'deskripsi_panjang' => 'Electrosurgical epilation of eyelid',
            'deskripsi_pendek' => 'Electrosurg lid epilat',
          ),
          337 => 
          array (
            'kode' => '08.92',
            'deskripsi_panjang' => 'Cryosurgical epilation of eyelid',
            'deskripsi_pendek' => 'Cryosurg lid epilation',
          ),
          338 => 
          array (
            'kode' => '08.93',
            'deskripsi_panjang' => 'Other epilation of eyelid',
            'deskripsi_pendek' => 'Eyelid epilation NEC',
          ),
          339 => 
          array (
            'kode' => '08.99',
            'deskripsi_panjang' => 'Other operations on eyelids',
            'deskripsi_pendek' => 'Eyelid operation NEC',
          ),
          340 => 
          array (
            'kode' => '09.0',
            'deskripsi_panjang' => 'Incision of lacrimal gland',
            'deskripsi_pendek' => 'Lacrimal gland incision',
          ),
          341 => 
          array (
            'kode' => '09.11',
            'deskripsi_panjang' => 'Biopsy of lacrimal gland',
            'deskripsi_pendek' => 'Lacrimal gland biopsy',
          ),
          342 => 
          array (
            'kode' => '09.12',
            'deskripsi_panjang' => 'Biopsy of lacrimal sac',
            'deskripsi_pendek' => 'Lacrimal sac biopsy',
          ),
          343 => 
          array (
            'kode' => '09.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on lacrimal system',
            'deskripsi_pendek' => 'Lacrimal sys dx proc NEC',
          ),
          344 => 
          array (
            'kode' => '09.20',
            'deskripsi_panjang' => 'Excision of lacrimal gland, not otherwise specified',
            'deskripsi_pendek' => 'Exc lacrimal gland NOS',
          ),
          345 => 
          array (
            'kode' => '09.21',
            'deskripsi_panjang' => 'Excision of lesion of lacrimal gland',
            'deskripsi_pendek' => 'Excis les lacrimal gland',
          ),
          346 => 
          array (
            'kode' => '09.22',
            'deskripsi_panjang' => 'Other partial dacryoadenectomy',
            'deskripsi_pendek' => 'Part dacryoadenect NEC',
          ),
          347 => 
          array (
            'kode' => '09.23',
            'deskripsi_panjang' => 'Total dacryoadenectomy',
            'deskripsi_pendek' => 'Total dacryoadenectomy',
          ),
          348 => 
          array (
            'kode' => '09.3',
            'deskripsi_panjang' => 'Other operations on lacrimal gland',
            'deskripsi_pendek' => 'Other lacrimal gland ops',
          ),
          349 => 
          array (
            'kode' => '09.41',
            'deskripsi_panjang' => 'Probing of lacrimal punctum',
            'deskripsi_pendek' => 'Lacrimal punctum probe',
          ),
          350 => 
          array (
            'kode' => '09.42',
            'deskripsi_panjang' => 'Probing of lacrimal canaliculi',
            'deskripsi_pendek' => 'Lac canaliculi probe',
          ),
          351 => 
          array (
            'kode' => '09.43',
            'deskripsi_panjang' => 'Probing of nasolacrimal duct',
            'deskripsi_pendek' => 'Nasolacrimal duct probe',
          ),
          352 => 
          array (
            'kode' => '09.44',
            'deskripsi_panjang' => 'Intubation of nasolacrimal duct',
            'deskripsi_pendek' => 'Nasolac duct intubat',
          ),
          353 => 
          array (
            'kode' => '09.49',
            'deskripsi_panjang' => 'Other manipulation of lacrimal passage',
            'deskripsi_pendek' => 'Lac passage manip NEC',
          ),
          354 => 
          array (
            'kode' => '09.51',
            'deskripsi_panjang' => 'Incision of lacrimal punctum',
            'deskripsi_pendek' => 'Lac punctum incision',
          ),
          355 => 
          array (
            'kode' => '09.52',
            'deskripsi_panjang' => 'Incision of lacrimal canaliculi',
            'deskripsi_pendek' => 'Lac canaliculi incision',
          ),
          356 => 
          array (
            'kode' => '09.53',
            'deskripsi_panjang' => 'Incision of lacrimal sac',
            'deskripsi_pendek' => 'Lacrimal sac incision',
          ),
          357 => 
          array (
            'kode' => '09.59',
            'deskripsi_panjang' => 'Other incision of lacrimal passages',
            'deskripsi_pendek' => 'Lacrim passage incis NEC',
          ),
          358 => 
          array (
            'kode' => '09.6',
            'deskripsi_panjang' => 'Excision of lacrimal sac and passage',
            'deskripsi_pendek' => 'Lacrim sac/passage excis',
          ),
          359 => 
          array (
            'kode' => '09.71',
            'deskripsi_panjang' => 'Correction of everted punctum',
            'deskripsi_pendek' => 'Correct everted punctum',
          ),
          360 => 
          array (
            'kode' => '09.72',
            'deskripsi_panjang' => 'Other repair of punctum',
            'deskripsi_pendek' => 'Punctum repair NEC',
          ),
          361 => 
          array (
            'kode' => '09.73',
            'deskripsi_panjang' => 'Repair of canaliculus',
            'deskripsi_pendek' => 'Canaliculus repair',
          ),
          362 => 
          array (
            'kode' => '09.81',
            'deskripsi_panjang' => 'Dacryocystorhinostomy [DCR]',
            'deskripsi_pendek' => 'Dacryocystorhinostomy',
          ),
          363 => 
          array (
            'kode' => '09.82',
            'deskripsi_panjang' => 'Conjunctivocystorhinostomy',
            'deskripsi_pendek' => 'Conjunctivocystorhinost',
          ),
          364 => 
          array (
            'kode' => '09.83',
            'deskripsi_panjang' => 'Conjunctivorhinostomy with insertion of tube or stent',
            'deskripsi_pendek' => 'Conjunctivorhinos w tube',
          ),
          365 => 
          array (
            'kode' => '09.91',
            'deskripsi_panjang' => 'Obliteration of lacrimal punctum',
            'deskripsi_pendek' => 'Lac punctum obliteration',
          ),
          366 => 
          array (
            'kode' => '09.99',
            'deskripsi_panjang' => 'Other operations on lacrimal system',
            'deskripsi_pendek' => 'Lacrimal system op NEC',
          ),
          367 => 
          array (
            'kode' => '10.0',
            'deskripsi_panjang' => 'Removal of embedded foreign body from conjunctiva by incision',
            'deskripsi_pendek' => 'Incise/remov conjunct FB',
          ),
          368 => 
          array (
            'kode' => '10.1',
            'deskripsi_panjang' => 'Other incision of conjunctiva',
            'deskripsi_pendek' => 'Conjunctiva incision NEC',
          ),
          369 => 
          array (
            'kode' => '10.21',
            'deskripsi_panjang' => 'Biopsy of conjunctiva',
            'deskripsi_pendek' => 'Conjunctival biopsy',
          ),
          370 => 
          array (
            'kode' => '10.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on conjunctiva',
            'deskripsi_pendek' => 'Conjunctiva dx proc NEC',
          ),
          371 => 
          array (
            'kode' => '10.31',
            'deskripsi_panjang' => 'Excision of lesion or tissue of conjunctiva',
            'deskripsi_pendek' => 'Excise conjunctiv lesion',
          ),
          372 => 
          array (
            'kode' => '10.32',
            'deskripsi_panjang' => 'Destruction of lesion of conjunctiva',
            'deskripsi_pendek' => 'Destruct conjunc les NEC',
          ),
          373 => 
          array (
            'kode' => '10.33',
            'deskripsi_panjang' => 'Other destructive procedures on conjunctiva',
            'deskripsi_pendek' => 'Oth conjunc destruc proc',
          ),
          374 => 
          array (
            'kode' => '10.41',
            'deskripsi_panjang' => 'Repair of symblepharon with free graft',
            'deskripsi_pendek' => 'Symbleph rep w free grft',
          ),
          375 => 
          array (
            'kode' => '10.42',
            'deskripsi_panjang' => 'Reconstruction of conjunctival cul-de-sac with free graft',
            'deskripsi_pendek' => 'Graft conjunc cul-de-sac',
          ),
          376 => 
          array (
            'kode' => '10.43',
            'deskripsi_panjang' => 'Other reconstruction of conjunctival cul-de-sac',
            'deskripsi_pendek' => 'Conjun cul-de-sac rx NEC',
          ),
          377 => 
          array (
            'kode' => '10.44',
            'deskripsi_panjang' => 'Other free graft to conjunctiva',
            'deskripsi_pendek' => 'Conjunc free graft NEC',
          ),
          378 => 
          array (
            'kode' => '10.49',
            'deskripsi_panjang' => 'Other conjunctivoplasty',
            'deskripsi_pendek' => 'Conjunctivoplasty NEC',
          ),
          379 => 
          array (
            'kode' => '10.5',
            'deskripsi_panjang' => 'Lysis of adhesions of conjunctiva and eyelid',
            'deskripsi_pendek' => 'Conjunc/lid adhesiolysis',
          ),
          380 => 
          array (
            'kode' => '10.6',
            'deskripsi_panjang' => 'Repair of laceration of conjunctiva',
            'deskripsi_pendek' => 'Repair conjunct lacerat',
          ),
          381 => 
          array (
            'kode' => '10.91',
            'deskripsi_panjang' => 'Subconjunctival injection',
            'deskripsi_pendek' => 'Subconjunctival inject',
          ),
          382 => 
          array (
            'kode' => '10.99',
            'deskripsi_panjang' => 'Other operations on conjunctiva',
            'deskripsi_pendek' => 'Conjunctival op NEC',
          ),
          383 => 
          array (
            'kode' => '11.0',
            'deskripsi_panjang' => 'Magnetic removal of embedded foreign body from cornea',
            'deskripsi_pendek' => 'Magnet removal cornea FB',
          ),
          384 => 
          array (
            'kode' => '11.1',
            'deskripsi_panjang' => 'Incision of cornea',
            'deskripsi_pendek' => 'Corneal incision',
          ),
          385 => 
          array (
            'kode' => '11.21',
            'deskripsi_panjang' => 'Scraping of cornea for smear or culture',
            'deskripsi_pendek' => 'Corneal scrape for smear',
          ),
          386 => 
          array (
            'kode' => '11.22',
            'deskripsi_panjang' => 'Biopsy of cornea',
            'deskripsi_pendek' => 'Corneal biopsy',
          ),
          387 => 
          array (
            'kode' => '11.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on cornea',
            'deskripsi_pendek' => 'Corneal dx proc NEC',
          ),
          388 => 
          array (
            'kode' => '11.31',
            'deskripsi_panjang' => 'Transposition of pterygium',
            'deskripsi_pendek' => 'Pterygium transposition',
          ),
          389 => 
          array (
            'kode' => '11.32',
            'deskripsi_panjang' => 'Excision of pterygium with corneal graft',
            'deskripsi_pendek' => 'Pteryg exc w cornea grft',
          ),
          390 => 
          array (
            'kode' => '11.39',
            'deskripsi_panjang' => 'Other excision of pterygium',
            'deskripsi_pendek' => 'Pterygium excision NEC',
          ),
          391 => 
          array (
            'kode' => '11.41',
            'deskripsi_panjang' => 'Mechanical removal of corneal epithelium',
            'deskripsi_pendek' => 'Mech remov cornea epith',
          ),
          392 => 
          array (
            'kode' => '11.42',
            'deskripsi_panjang' => 'Thermocauterization of corneal lesion',
            'deskripsi_pendek' => 'Thermocaut cornea lesion',
          ),
          393 => 
          array (
            'kode' => '11.43',
            'deskripsi_panjang' => 'Cryotherapy of corneal lesion',
            'deskripsi_pendek' => 'Cryotherap cornea lesion',
          ),
          394 => 
          array (
            'kode' => '11.49',
            'deskripsi_panjang' => 'Other removal or destruction of corneal lesion',
            'deskripsi_pendek' => 'Destruct cornea les NEC',
          ),
          395 => 
          array (
            'kode' => '11.51',
            'deskripsi_panjang' => 'Suture of corneal laceration',
            'deskripsi_pendek' => 'Suture cornea laceration',
          ),
          396 => 
          array (
            'kode' => '11.52',
            'deskripsi_panjang' => 'Repair of postoperative wound dehiscence of cornea',
            'deskripsi_pendek' => 'Rep cornea postop dehisc',
          ),
          397 => 
          array (
            'kode' => '11.53',
            'deskripsi_panjang' => 'Repair of corneal laceration or wound with conjunctival flap',
            'deskripsi_pendek' => 'Rx cornea lac w conj flp',
          ),
          398 => 
          array (
            'kode' => '11.59',
            'deskripsi_panjang' => 'Other repair of cornea',
            'deskripsi_pendek' => 'Corneal repair NEC',
          ),
          399 => 
          array (
            'kode' => '11.60',
            'deskripsi_panjang' => 'Corneal transplant, not otherwise specified',
            'deskripsi_pendek' => 'Corneal transplant NOS',
          ),
          400 => 
          array (
            'kode' => '11.61',
            'deskripsi_panjang' => 'Lamellar keratoplasty with autograft',
            'deskripsi_pendek' => 'Lam keratplast w autgrft',
          ),
          401 => 
          array (
            'kode' => '11.62',
            'deskripsi_panjang' => 'Other lamellar keratoplasty',
            'deskripsi_pendek' => 'Lamellar keratoplast NEC',
          ),
          402 => 
          array (
            'kode' => '11.63',
            'deskripsi_panjang' => 'Penetrating keratoplasty with autograft',
            'deskripsi_pendek' => 'Perf keratopl w autogrft',
          ),
          403 => 
          array (
            'kode' => '11.64',
            'deskripsi_panjang' => 'Other penetrating keratoplasty',
            'deskripsi_pendek' => 'Perforat keratoplast NEC',
          ),
          404 => 
          array (
            'kode' => '11.69',
            'deskripsi_panjang' => 'Other corneal transplant',
            'deskripsi_pendek' => 'Corneal transplant NEC',
          ),
          405 => 
          array (
            'kode' => '11.71',
            'deskripsi_panjang' => 'Keratomileusis',
            'deskripsi_pendek' => 'Keratomileusis',
          ),
          406 => 
          array (
            'kode' => '11.72',
            'deskripsi_panjang' => 'Keratophakia',
            'deskripsi_pendek' => 'Keratophakia',
          ),
          407 => 
          array (
            'kode' => '11.73',
            'deskripsi_panjang' => 'Keratoprosthesis',
            'deskripsi_pendek' => 'Keratoprosthesis',
          ),
          408 => 
          array (
            'kode' => '11.74',
            'deskripsi_panjang' => 'Thermokeratoplasty',
            'deskripsi_pendek' => 'Thermokeratoplasty',
          ),
          409 => 
          array (
            'kode' => '11.75',
            'deskripsi_panjang' => 'Radial keratotomy',
            'deskripsi_pendek' => 'Radial keratotomy',
          ),
          410 => 
          array (
            'kode' => '11.76',
            'deskripsi_panjang' => 'Epikeratophakia',
            'deskripsi_pendek' => 'Epikeratophakia',
          ),
          411 => 
          array (
            'kode' => '11.79',
            'deskripsi_panjang' => 'Other reconstructive and refractive surgery on cornea',
            'deskripsi_pendek' => 'Cornea reconstruct NEC',
          ),
          412 => 
          array (
            'kode' => '11.91',
            'deskripsi_panjang' => 'Tattooing of cornea',
            'deskripsi_pendek' => 'Corneal tattooing',
          ),
          413 => 
          array (
            'kode' => '11.92',
            'deskripsi_panjang' => 'Removal of artificial implant from cornea',
            'deskripsi_pendek' => 'Remove corneal implant',
          ),
          414 => 
          array (
            'kode' => '11.99',
            'deskripsi_panjang' => 'Other operations on cornea',
            'deskripsi_pendek' => 'Corneal operation NEC',
          ),
          415 => 
          array (
            'kode' => '12.00',
            'deskripsi_panjang' => 'Removal of intraocular foreign body from anterior segment of eye, not otherwise specified',
            'deskripsi_pendek' => 'Remov ant segmnt FB NOS',
          ),
          416 => 
          array (
            'kode' => '12.01',
            'deskripsi_panjang' => 'Removal of intraocular foreign body from anterior segment of eye with use of magnet',
            'deskripsi_pendek' => 'Magnet remov ant seg FB',
          ),
          417 => 
          array (
            'kode' => '12.02',
            'deskripsi_panjang' => 'Removal of intraocular foreign body from anterior segment of eye without use of magnet',
            'deskripsi_pendek' => 'Nonmag remov ant seg FB',
          ),
          418 => 
          array (
            'kode' => '12.11',
            'deskripsi_panjang' => 'Iridotomy with transfixion',
            'deskripsi_pendek' => 'Iridotomy w transfixion',
          ),
          419 => 
          array (
            'kode' => '12.12',
            'deskripsi_panjang' => 'Other iridotomy',
            'deskripsi_pendek' => 'Iridotomy NEC',
          ),
          420 => 
          array (
            'kode' => '12.13',
            'deskripsi_panjang' => 'Excision of prolapsed iris',
            'deskripsi_pendek' => 'Prolapsed iris excision',
          ),
          421 => 
          array (
            'kode' => '12.14',
            'deskripsi_panjang' => 'Other iridectomy',
            'deskripsi_pendek' => 'Iridectomy NEC',
          ),
          422 => 
          array (
            'kode' => '12.21',
            'deskripsi_panjang' => 'Diagnostic aspiration of anterior chamber of eye',
            'deskripsi_pendek' => 'Dx aspirat-ant chamber',
          ),
          423 => 
          array (
            'kode' => '12.22',
            'deskripsi_panjang' => 'Biopsy of iris',
            'deskripsi_pendek' => 'Iris biopsy',
          ),
          424 => 
          array (
            'kode' => '12.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on iris, ciliary body, sclera, and anterior chamber',
            'deskripsi_pendek' => 'Ant segment dx proc NEC',
          ),
          425 => 
          array (
            'kode' => '12.31',
            'deskripsi_panjang' => 'Lysis of goniosynechiae',
            'deskripsi_pendek' => 'Goniosynechiae lysis',
          ),
          426 => 
          array (
            'kode' => '12.32',
            'deskripsi_panjang' => 'Lysis of other anterior synechiae',
            'deskripsi_pendek' => 'Ant synechia lysis NEC',
          ),
          427 => 
          array (
            'kode' => '12.33',
            'deskripsi_panjang' => 'Lysis of posterior synechiae',
            'deskripsi_pendek' => 'Post synechiae lysis',
          ),
          428 => 
          array (
            'kode' => '12.34',
            'deskripsi_panjang' => 'Lysis of corneovitreal adhesions',
            'deskripsi_pendek' => 'Corneovitreal adhesiolys',
          ),
          429 => 
          array (
            'kode' => '12.35',
            'deskripsi_panjang' => 'Coreoplasty',
            'deskripsi_pendek' => 'Coreoplasty',
          ),
          430 => 
          array (
            'kode' => '12.39',
            'deskripsi_panjang' => 'Other iridoplasty',
            'deskripsi_pendek' => 'Iridoplasty NEC',
          ),
          431 => 
          array (
            'kode' => '12.40',
            'deskripsi_panjang' => 'Removal of lesion of anterior segment of eye, not otherwise specified',
            'deskripsi_pendek' => 'Remov ant segmnt les NOS',
          ),
          432 => 
          array (
            'kode' => '12.41',
            'deskripsi_panjang' => 'Destruction of lesion of iris, nonexcisional',
            'deskripsi_pendek' => 'Nonexc destruc iris les',
          ),
          433 => 
          array (
            'kode' => '12.42',
            'deskripsi_panjang' => 'Excision of lesion of iris',
            'deskripsi_pendek' => 'Excision of iris lesion',
          ),
          434 => 
          array (
            'kode' => '12.43',
            'deskripsi_panjang' => 'Destruction of lesion of ciliary body, nonexcisional',
            'deskripsi_pendek' => 'Nonexc destr cil bod les',
          ),
          435 => 
          array (
            'kode' => '12.44',
            'deskripsi_panjang' => 'Excision of lesion of ciliary body',
            'deskripsi_pendek' => 'Excise ciliary body les',
          ),
          436 => 
          array (
            'kode' => '12.51',
            'deskripsi_panjang' => 'Goniopuncture without goniotomy',
            'deskripsi_pendek' => 'Goniopuncture',
          ),
          437 => 
          array (
            'kode' => '12.52',
            'deskripsi_panjang' => 'Goniotomy without goniopuncture',
            'deskripsi_pendek' => 'Goniotomy',
          ),
          438 => 
          array (
            'kode' => '12.53',
            'deskripsi_panjang' => 'Goniotomy with goniopuncture',
            'deskripsi_pendek' => 'Goniotomy w goniopunctur',
          ),
          439 => 
          array (
            'kode' => '12.54',
            'deskripsi_panjang' => 'Trabeculotomy ab externo',
            'deskripsi_pendek' => 'Trabeculotomy ab externo',
          ),
          440 => 
          array (
            'kode' => '12.55',
            'deskripsi_panjang' => 'Cyclodialysis',
            'deskripsi_pendek' => 'Cyclodialysis',
          ),
          441 => 
          array (
            'kode' => '12.59',
            'deskripsi_panjang' => 'Other facilitation of intraocular circulation',
            'deskripsi_pendek' => 'Facilit intraoc circ NEC',
          ),
          442 => 
          array (
            'kode' => '12.61',
            'deskripsi_panjang' => 'Trephination of sclera with iridectomy',
            'deskripsi_pendek' => 'Trephin sclera w iridect',
          ),
          443 => 
          array (
            'kode' => '12.62',
            'deskripsi_panjang' => 'Thermocauterization of sclera with iridectomy',
            'deskripsi_pendek' => 'Thermcaut scler w iridec',
          ),
          444 => 
          array (
            'kode' => '12.63',
            'deskripsi_panjang' => 'Iridencleisis and iridotasis',
            'deskripsi_pendek' => 'Iridencleisis/iridotasis',
          ),
          445 => 
          array (
            'kode' => '12.64',
            'deskripsi_panjang' => 'Trabeculectomy ab externo',
            'deskripsi_pendek' => 'Trabeculectom ab externo',
          ),
          446 => 
          array (
            'kode' => '12.65',
            'deskripsi_panjang' => 'Other scleral fistulization with iridectomy',
            'deskripsi_pendek' => 'Scler fistuliz w iridect',
          ),
          447 => 
          array (
            'kode' => '12.66',
            'deskripsi_panjang' => 'Postoperative revision of scleral fistulization procedure',
            'deskripsi_pendek' => 'Postop revis scl fistul',
          ),
          448 => 
          array (
            'kode' => '12.67',
            'deskripsi_panjang' => 'Insertion of aqueous drainage device',
            'deskripsi_pendek' => 'Insert aqueous drain dev',
          ),
          449 => 
          array (
            'kode' => '12.69',
            'deskripsi_panjang' => 'Other scleral fistulizing procedure',
            'deskripsi_pendek' => 'Scler fistulizing op NEC',
          ),
          450 => 
          array (
            'kode' => '12.71',
            'deskripsi_panjang' => 'Cyclodiathermy',
            'deskripsi_pendek' => 'Cyclodiathermy',
          ),
          451 => 
          array (
            'kode' => '12.72',
            'deskripsi_panjang' => 'Cyclocryotherapy',
            'deskripsi_pendek' => 'Cyclocryotherapy',
          ),
          452 => 
          array (
            'kode' => '12.73',
            'deskripsi_panjang' => 'Cyclophotocoagulation',
            'deskripsi_pendek' => 'Cyclophotocoagulation',
          ),
          453 => 
          array (
            'kode' => '12.74',
            'deskripsi_panjang' => 'Diminution of ciliary body, not otherwise specified',
            'deskripsi_pendek' => 'Cil body diminution NOS',
          ),
          454 => 
          array (
            'kode' => '12.79',
            'deskripsi_panjang' => 'Other glaucoma procedures',
            'deskripsi_pendek' => 'Glaucoma procedure NEC',
          ),
          455 => 
          array (
            'kode' => '12.81',
            'deskripsi_panjang' => 'Suture of laceration of sclera',
            'deskripsi_pendek' => 'Suture scleral lacer',
          ),
          456 => 
          array (
            'kode' => '12.82',
            'deskripsi_panjang' => 'Repair of scleral fistula',
            'deskripsi_pendek' => 'Scleral fistula repair',
          ),
          457 => 
          array (
            'kode' => '12.83',
            'deskripsi_panjang' => 'Revision of operative wound of anterior segment, not elsewhere classified',
            'deskripsi_pendek' => 'Revis ant seg op wnd NEC',
          ),
          458 => 
          array (
            'kode' => '12.84',
            'deskripsi_panjang' => 'Excision or destruction of lesion of sclera',
            'deskripsi_pendek' => 'Destruct scleral lesion',
          ),
          459 => 
          array (
            'kode' => '12.85',
            'deskripsi_panjang' => 'Repair of scleral staphyloma with graft',
            'deskripsi_pendek' => 'Repair staphylom w graft',
          ),
          460 => 
          array (
            'kode' => '12.86',
            'deskripsi_panjang' => 'Other repair of scleral staphyloma',
            'deskripsi_pendek' => 'Rep scler staphyloma NEC',
          ),
          461 => 
          array (
            'kode' => '12.87',
            'deskripsi_panjang' => 'Scleral reinforcement with graft',
            'deskripsi_pendek' => 'Graft reinforce sclera',
          ),
          462 => 
          array (
            'kode' => '12.88',
            'deskripsi_panjang' => 'Other scleral reinforcement',
            'deskripsi_pendek' => 'Sclera reinforcement NEC',
          ),
          463 => 
          array (
            'kode' => '12.89',
            'deskripsi_panjang' => 'Other operations on sclera',
            'deskripsi_pendek' => 'Scleral operation NEC',
          ),
          464 => 
          array (
            'kode' => '12.91',
            'deskripsi_panjang' => 'Therapeutic evacuation of anterior chamber',
            'deskripsi_pendek' => 'Therapeut evac ant chamb',
          ),
          465 => 
          array (
            'kode' => '12.92',
            'deskripsi_panjang' => 'Injection into anterior chamber',
            'deskripsi_pendek' => 'Anterior chamber inject',
          ),
          466 => 
          array (
            'kode' => '12.93',
            'deskripsi_panjang' => 'Removal or destruction of epithelial downgrowth from anterior chamber',
            'deskripsi_pendek' => 'Remov epithel downgrowth',
          ),
          467 => 
          array (
            'kode' => '12.97',
            'deskripsi_panjang' => 'Other operations on iris',
            'deskripsi_pendek' => 'Iris operation NEC',
          ),
          468 => 
          array (
            'kode' => '12.98',
            'deskripsi_panjang' => 'Other operations on ciliary body',
            'deskripsi_pendek' => 'Ciliary body op NEC',
          ),
          469 => 
          array (
            'kode' => '12.99',
            'deskripsi_panjang' => 'Other operations on anterior chamber',
            'deskripsi_pendek' => 'Anterior chamber op NEC',
          ),
          470 => 
          array (
            'kode' => '13.00',
            'deskripsi_panjang' => 'Removal of foreign body from lens, not otherwise specified',
            'deskripsi_pendek' => 'Remove FB lens NOS',
          ),
          471 => 
          array (
            'kode' => '13.01',
            'deskripsi_panjang' => 'Removal of foreign body from lens with use of magnet',
            'deskripsi_pendek' => 'Magnet remove FB lens',
          ),
          472 => 
          array (
            'kode' => '13.02',
            'deskripsi_panjang' => 'Removal of foreign body from lens without use of magnet',
            'deskripsi_pendek' => 'Nonmagnet remove FB lens',
          ),
          473 => 
          array (
            'kode' => '13.11',
            'deskripsi_panjang' => 'Intracapsular extraction of lens by temporal inferior route',
            'deskripsi_pendek' => 'Temp-inf intrcap lens ex',
          ),
          474 => 
          array (
            'kode' => '13.19',
            'deskripsi_panjang' => 'Other intracapsular extraction of lens',
            'deskripsi_pendek' => 'Intracapsul lens ext NEC',
          ),
          475 => 
          array (
            'kode' => '13.2',
            'deskripsi_panjang' => 'Extracapsular extraction of lens by linear extraction technique',
            'deskripsi_pendek' => 'Linear extracap lens ext',
          ),
          476 => 
          array (
            'kode' => '13.3',
            'deskripsi_panjang' => 'Extracapsular extraction of lens by simple aspiration (and irrigation) technique',
            'deskripsi_pendek' => 'Simpl aspir lens extract',
          ),
          477 => 
          array (
            'kode' => '13.41',
            'deskripsi_panjang' => 'Phacoemulsification and aspiration of cataract',
            'deskripsi_pendek' => 'Catarac phacoemuls/aspir',
          ),
          478 => 
          array (
            'kode' => '13.42',
            'deskripsi_panjang' => 'Mechanical phacofragmentation and aspiration of cataract by posterior route',
            'deskripsi_pendek' => 'Post catarac frag/aspir',
          ),
          479 => 
          array (
            'kode' => '13.43',
            'deskripsi_panjang' => 'Mechanical phacofragmentation and other aspiration of cataract',
            'deskripsi_pendek' => 'Cataract frag/aspir NEC',
          ),
          480 => 
          array (
            'kode' => '13.51',
            'deskripsi_panjang' => 'Extracapsular extraction of lens by temporal inferior route',
            'deskripsi_pendek' => 'Temp-inf xtracap lens ex',
          ),
          481 => 
          array (
            'kode' => '13.59',
            'deskripsi_panjang' => 'Other extracapsular extraction of lens',
            'deskripsi_pendek' => 'Extracap lens extrac NEC',
          ),
          482 => 
          array (
            'kode' => '13.64',
            'deskripsi_panjang' => 'Discission of secondary membrane [after cataract]',
            'deskripsi_pendek' => 'After-catar discission',
          ),
          483 => 
          array (
            'kode' => '13.65',
            'deskripsi_panjang' => 'Excision of secondary membrane [after cataract]',
            'deskripsi_pendek' => 'After-cataract excision',
          ),
          484 => 
          array (
            'kode' => '13.66',
            'deskripsi_panjang' => 'Mechanical fragmentation of secondary membrane [after cataract]',
            'deskripsi_pendek' => 'After catar fragmntation',
          ),
          485 => 
          array (
            'kode' => '13.69',
            'deskripsi_panjang' => 'Other cataract extraction',
            'deskripsi_pendek' => 'Cataract extraction NEC',
          ),
          486 => 
          array (
            'kode' => '13.70',
            'deskripsi_panjang' => 'Insertion of pseudophakos, not otherwise specified',
            'deskripsi_pendek' => 'Insert pseudophakos NOS',
          ),
          487 => 
          array (
            'kode' => '13.71',
            'deskripsi_panjang' => 'Insertion of intraocular lens prosthesis at time of cataract extraction, one-stage',
            'deskripsi_pendek' => 'Insert lens at catar ext',
          ),
          488 => 
          array (
            'kode' => '13.72',
            'deskripsi_panjang' => 'Secondary insertion of intraocular lens prosthesis',
            'deskripsi_pendek' => 'Secondary insert lens',
          ),
          489 => 
          array (
            'kode' => '13.8',
            'deskripsi_panjang' => 'Removal of implanted lens',
            'deskripsi_pendek' => 'Implanted lens removal',
          ),
          490 => 
          array (
            'kode' => '13.90',
            'deskripsi_panjang' => 'Operation on lens, not elsewhere classified',
            'deskripsi_pendek' => 'Operation on lens NEC',
          ),
          491 => 
          array (
            'kode' => '13.91',
            'deskripsi_panjang' => 'Implantation of intraocular telescope prosthesis',
            'deskripsi_pendek' => 'Impl intraoc telesc pros',
          ),
          492 => 
          array (
            'kode' => '14.00',
            'deskripsi_panjang' => 'Removal of foreign body from posterior segment of eye, not otherwise specified',
            'deskripsi_pendek' => 'Remov post segmnt FB NOS',
          ),
          493 => 
          array (
            'kode' => '14.01',
            'deskripsi_panjang' => 'Removal of foreign body from posterior segment of eye with use of magnet',
            'deskripsi_pendek' => 'Magnet remov post seg FB',
          ),
          494 => 
          array (
            'kode' => '14.02',
            'deskripsi_panjang' => 'Removal of foreign body from posterior segment of eye without use of magnet',
            'deskripsi_pendek' => 'Nonmag remov post seg FB',
          ),
          495 => 
          array (
            'kode' => '14.11',
            'deskripsi_panjang' => 'Diagnostic aspiration of vitreous',
            'deskripsi_pendek' => 'Diagnost vitreous aspir',
          ),
          496 => 
          array (
            'kode' => '14.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on retina, choroid, vitreous, and posterior chamber',
            'deskripsi_pendek' => 'Dx proc post seg NEC',
          ),
          497 => 
          array (
            'kode' => '14.21',
            'deskripsi_panjang' => 'Destruction of chorioretinal lesion by diathermy',
            'deskripsi_pendek' => 'Chorioret les diathermy',
          ),
          498 => 
          array (
            'kode' => '14.22',
            'deskripsi_panjang' => 'Destruction of chorioretinal lesion by cryotherapy',
            'deskripsi_pendek' => 'Chorioretin les cryother',
          ),
          499 => 
          array (
            'kode' => '14.23',
            'deskripsi_panjang' => 'Destruction of chorioretinal lesion by xenon arc photocoagulation',
            'deskripsi_pendek' => 'Chorioret les xenon coag',
          ),
        ));
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '14.24',
            'deskripsi_panjang' => 'Destruction of chorioretinal lesion by laser photocoagulation',
            'deskripsi_pendek' => 'Chorioret les laser coag',
          ),
          1 => 
          array (
            'kode' => '14.25',
            'deskripsi_panjang' => 'Destruction of chorioretinal lesion by photocoagulation of unspecified type',
            'deskripsi_pendek' => 'Chorioret les p/coag NOS',
          ),
          2 => 
          array (
            'kode' => '14.26',
            'deskripsi_panjang' => 'Destruction of chorioretinal lesion by radiation therapy',
            'deskripsi_pendek' => 'Chorioret les radiother',
          ),
          3 => 
          array (
            'kode' => '14.27',
            'deskripsi_panjang' => 'Destruction of chorioretinal lesion by implantation of radiation source',
            'deskripsi_pendek' => 'Chorioret les rad implan',
          ),
          4 => 
          array (
            'kode' => '14.29',
            'deskripsi_panjang' => 'Other destruction of chorioretinal lesion',
            'deskripsi_pendek' => 'Chorioret les destr NEC',
          ),
          5 => 
          array (
            'kode' => '14.31',
            'deskripsi_panjang' => 'Repair of retinal tear by diathermy',
            'deskripsi_pendek' => 'Retinal tear diathermy',
          ),
          6 => 
          array (
            'kode' => '14.32',
            'deskripsi_panjang' => 'Repair of retinal tear by cryotherapy',
            'deskripsi_pendek' => 'Retinal tear cryotherapy',
          ),
          7 => 
          array (
            'kode' => '14.33',
            'deskripsi_panjang' => 'Repair of retinal tear by xenon arc photocoagulation',
            'deskripsi_pendek' => 'Retinal tear xenon coag',
          ),
          8 => 
          array (
            'kode' => '14.34',
            'deskripsi_panjang' => 'Repair of retinal tear by laser photocoagulation',
            'deskripsi_pendek' => 'Retinal tear laser coag',
          ),
          9 => 
          array (
            'kode' => '14.35',
            'deskripsi_panjang' => 'Repair of retinal tear by photocoagulation of unspecified type',
            'deskripsi_pendek' => 'Retina tear photocoa NOS',
          ),
          10 => 
          array (
            'kode' => '14.39',
            'deskripsi_panjang' => 'Other repair of retinal tear',
            'deskripsi_pendek' => 'Retinal tear repair NEC',
          ),
          11 => 
          array (
            'kode' => '14.41',
            'deskripsi_panjang' => 'Scleral buckling with implant',
            'deskripsi_pendek' => 'Scleral buckle w implant',
          ),
          12 => 
          array (
            'kode' => '14.49',
            'deskripsi_panjang' => 'Other scleral buckling',
            'deskripsi_pendek' => 'Scleral buckling NEC',
          ),
          13 => 
          array (
            'kode' => '14.51',
            'deskripsi_panjang' => 'Repair of retinal detachment with diathermy',
            'deskripsi_pendek' => 'Detach retina-diathermy',
          ),
          14 => 
          array (
            'kode' => '14.52',
            'deskripsi_panjang' => 'Repair of retinal detachment with cryotherapy',
            'deskripsi_pendek' => 'Detach retina-cryotherap',
          ),
          15 => 
          array (
            'kode' => '14.53',
            'deskripsi_panjang' => 'Repair of retinal detachment with xenon arc photocoagulation',
            'deskripsi_pendek' => 'Detach retina xenon coag',
          ),
          16 => 
          array (
            'kode' => '14.54',
            'deskripsi_panjang' => 'Repair of retinal detachment with laser photocoagulation',
            'deskripsi_pendek' => 'Detach retina laser coag',
          ),
          17 => 
          array (
            'kode' => '14.55',
            'deskripsi_panjang' => 'Repair of retinal detachment with photocoagulation of unspecified type',
            'deskripsi_pendek' => 'Detach ret photocoag NOS',
          ),
          18 => 
          array (
            'kode' => '14.59',
            'deskripsi_panjang' => 'Other repair of retinal detachment',
            'deskripsi_pendek' => 'Repair retina detach NEC',
          ),
          19 => 
          array (
            'kode' => '14.6',
            'deskripsi_panjang' => 'Removal of surgically implanted material from posterior segment of eye',
            'deskripsi_pendek' => 'Remov pros mat post seg',
          ),
          20 => 
          array (
            'kode' => '14.71',
            'deskripsi_panjang' => 'Removal of vitreous, anterior approach',
            'deskripsi_pendek' => 'Anterior remov vitreous',
          ),
          21 => 
          array (
            'kode' => '14.72',
            'deskripsi_panjang' => 'Other removal of vitreous',
            'deskripsi_pendek' => 'Vitreous removal NEC',
          ),
          22 => 
          array (
            'kode' => '14.73',
            'deskripsi_panjang' => 'Mechanical vitrectomy by anterior approach',
            'deskripsi_pendek' => 'Anterior mechan vitrect',
          ),
          23 => 
          array (
            'kode' => '14.74',
            'deskripsi_panjang' => 'Other mechanical vitrectomy',
            'deskripsi_pendek' => 'Mech vitrectomy NEC',
          ),
          24 => 
          array (
            'kode' => '14.75',
            'deskripsi_panjang' => 'Injection of vitreous substitute',
            'deskripsi_pendek' => 'Vitreous substitut injec',
          ),
          25 => 
          array (
            'kode' => '14.79',
            'deskripsi_panjang' => 'Other operations on vitreous',
            'deskripsi_pendek' => 'Vitreous operation NEC',
          ),
          26 => 
          array (
            'kode' => '14.81',
            'deskripsi_panjang' => 'Implantation of epiretinal visual prosthesis',
            'deskripsi_pendek' => 'Imp epiretinal prosth',
          ),
          27 => 
          array (
            'kode' => '14.82',
            'deskripsi_panjang' => 'Removal of epiretinal visual prosthesis',
            'deskripsi_pendek' => 'Rem epiretinal prosth',
          ),
          28 => 
          array (
            'kode' => '14.83',
            'deskripsi_panjang' => 'Revision or replacement of epiretinal visual prosthesis',
            'deskripsi_pendek' => 'Rev/repl epiretinal pros',
          ),
          29 => 
          array (
            'kode' => '14.9',
            'deskripsi_panjang' => 'Other operations on retina, choroid, and posterior chamber',
            'deskripsi_pendek' => 'Other post segment ops',
          ),
          30 => 
          array (
            'kode' => '15.01',
            'deskripsi_panjang' => 'Biopsy of extraocular muscle or tendon',
            'deskripsi_pendek' => 'Extraoc musc-tend biopsy',
          ),
          31 => 
          array (
            'kode' => '15.09',
            'deskripsi_panjang' => 'Other diagnostic procedures on extraocular muscles and tendons',
            'deskripsi_pendek' => 'Extraoc musc dx proc NEC',
          ),
          32 => 
          array (
            'kode' => '15.11',
            'deskripsi_panjang' => 'Recession of one extraocular muscle',
            'deskripsi_pendek' => 'One extraoc mus recess',
          ),
          33 => 
          array (
            'kode' => '15.12',
            'deskripsi_panjang' => 'Advancement of one extraocular muscle',
            'deskripsi_pendek' => '1 extraoc muscl advance',
          ),
          34 => 
          array (
            'kode' => '15.13',
            'deskripsi_panjang' => 'Resection of one extraocular muscle',
            'deskripsi_pendek' => '1 extraoc muscl resect',
          ),
          35 => 
          array (
            'kode' => '15.19',
            'deskripsi_panjang' => 'Other operations on one extraocular muscle involving temporary detachment from globe',
            'deskripsi_pendek' => 'Xtraoc mus op/detach NEC',
          ),
          36 => 
          array (
            'kode' => '15.21',
            'deskripsi_panjang' => 'Lengthening procedure on one extraocular muscle',
            'deskripsi_pendek' => 'Lengthen 1 extraoc musc',
          ),
          37 => 
          array (
            'kode' => '15.22',
            'deskripsi_panjang' => 'Shortening procedure on one extraocular muscle',
            'deskripsi_pendek' => 'Shorten 1 extraoc musc',
          ),
          38 => 
          array (
            'kode' => '15.29',
            'deskripsi_panjang' => 'Other operations on one extraocular muscle',
            'deskripsi_pendek' => 'Op on 1 extraoc musc NEC',
          ),
          39 => 
          array (
            'kode' => '15.3',
            'deskripsi_panjang' => 'Operations on two or more extraocular muscles involving temporary detachment from globe, one or both eyes',
            'deskripsi_pendek' => 'Temp detach >1 xtroc mus',
          ),
          40 => 
          array (
            'kode' => '15.4',
            'deskripsi_panjang' => 'Other operations on two or more extraocular muscles, one or both eyes',
            'deskripsi_pendek' => 'Oth op on >l extraoc mus',
          ),
          41 => 
          array (
            'kode' => '15.5',
            'deskripsi_panjang' => 'Transposition of extraocular muscles',
            'deskripsi_pendek' => 'Extraocul mus transposit',
          ),
          42 => 
          array (
            'kode' => '15.6',
            'deskripsi_panjang' => 'Revision of extraocular muscle surgery',
            'deskripsi_pendek' => 'Revis extraoc musc surg',
          ),
          43 => 
          array (
            'kode' => '15.7',
            'deskripsi_panjang' => 'Repair of injury of extraocular muscle',
            'deskripsi_pendek' => 'Extraoc musc inj repair',
          ),
          44 => 
          array (
            'kode' => '15.9',
            'deskripsi_panjang' => 'Other operations on extraocular muscles and tendons',
            'deskripsi_pendek' => 'Oth extraoc mus-tend op',
          ),
          45 => 
          array (
            'kode' => '16.01',
            'deskripsi_panjang' => 'Orbitotomy with bone flap',
            'deskripsi_pendek' => 'Orbitotomy w bone flap',
          ),
          46 => 
          array (
            'kode' => '16.02',
            'deskripsi_panjang' => 'Orbitotomy with insertion of orbital implant',
            'deskripsi_pendek' => 'Orbitotomy w implant',
          ),
          47 => 
          array (
            'kode' => '16.09',
            'deskripsi_panjang' => 'Other orbitotomy',
            'deskripsi_pendek' => 'Orbitotomy NEC',
          ),
          48 => 
          array (
            'kode' => '16.1',
            'deskripsi_panjang' => 'Removal of penetrating foreign body from eye, not otherwise specified',
            'deskripsi_pendek' => 'Remove penetrat FB eye',
          ),
          49 => 
          array (
            'kode' => '16.21',
            'deskripsi_panjang' => 'Ophthalmoscopy',
            'deskripsi_pendek' => 'Ophthalmoscopy',
          ),
          50 => 
          array (
            'kode' => '16.22',
            'deskripsi_panjang' => 'Diagnostic aspiration of orbit',
            'deskripsi_pendek' => 'Diagnostic asp of orbit',
          ),
          51 => 
          array (
            'kode' => '16.23',
            'deskripsi_panjang' => 'Biopsy of eyeball and orbit',
            'deskripsi_pendek' => 'Eyeball & orbit biopsy',
          ),
          52 => 
          array (
            'kode' => '16.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on orbit and eyeball',
            'deskripsi_pendek' => 'Eyebal/orbit dx proc NEC',
          ),
          53 => 
          array (
            'kode' => '16.31',
            'deskripsi_panjang' => 'Removal of ocular contents with synchronous implant into scleral shell',
            'deskripsi_pendek' => 'Eye evisc w synch implan',
          ),
          54 => 
          array (
            'kode' => '16.39',
            'deskripsi_panjang' => 'Other evisceration of eyeball',
            'deskripsi_pendek' => 'Eyeball evisceration NEC',
          ),
          55 => 
          array (
            'kode' => '16.41',
            'deskripsi_panjang' => 'Enucleation of eyeball with synchronous implant into Tenons capsule with attachment of muscles',
            'deskripsi_pendek' => 'Eye enuc/implan/musc att',
          ),
          56 => 
          array (
            'kode' => '16.42',
            'deskripsi_panjang' => 'Enucleation of eyeball with other synchronous implant',
            'deskripsi_pendek' => 'Eye enuc w implant NEC',
          ),
          57 => 
          array (
            'kode' => '16.49',
            'deskripsi_panjang' => 'Other enucleation of eyeball',
            'deskripsi_pendek' => 'Eyeball enucleation NEC',
          ),
          58 => 
          array (
            'kode' => '16.51',
            'deskripsi_panjang' => 'Exenteration of orbit with removal of adjacent structures',
            'deskripsi_pendek' => 'Radical orbitomaxillect',
          ),
          59 => 
          array (
            'kode' => '16.52',
            'deskripsi_panjang' => 'Exenteration of orbit with therapeutic removal of orbital bone',
            'deskripsi_pendek' => 'Orbit exent w bone remov',
          ),
          60 => 
          array (
            'kode' => '16.59',
            'deskripsi_panjang' => 'Other exenteration of orbit',
            'deskripsi_pendek' => 'Orbital exenteration NEC',
          ),
          61 => 
          array (
            'kode' => '16.61',
            'deskripsi_panjang' => 'Secondary insertion of ocular implant',
            'deskripsi_pendek' => '2ndry ocular imp insert',
          ),
          62 => 
          array (
            'kode' => '16.62',
            'deskripsi_panjang' => 'Revision and reinsertion of ocular implant',
            'deskripsi_pendek' => 'Revis/reinsert ocul imp',
          ),
          63 => 
          array (
            'kode' => '16.63',
            'deskripsi_panjang' => 'Revision of enucleation socket with graft',
            'deskripsi_pendek' => 'Revis enuc socket w grft',
          ),
          64 => 
          array (
            'kode' => '16.64',
            'deskripsi_panjang' => 'Other revision of enucleation socket',
            'deskripsi_pendek' => 'Enuc socket revis NEC',
          ),
          65 => 
          array (
            'kode' => '16.65',
            'deskripsi_panjang' => 'Secondary graft to exenteration cavity',
            'deskripsi_pendek' => '2ndry exent cavity graft',
          ),
          66 => 
          array (
            'kode' => '16.66',
            'deskripsi_panjang' => 'Other revision of exenteration cavity',
            'deskripsi_pendek' => 'Revis exenter cavity NEC',
          ),
          67 => 
          array (
            'kode' => '16.69',
            'deskripsi_panjang' => 'Other secondary procedures after removal of eyeball',
            'deskripsi_pendek' => '2nd op post eye rem NEC',
          ),
          68 => 
          array (
            'kode' => '16.71',
            'deskripsi_panjang' => 'Removal of ocular implant',
            'deskripsi_pendek' => 'Remove ocular implant',
          ),
          69 => 
          array (
            'kode' => '16.72',
            'deskripsi_panjang' => 'Removal of orbital implant',
            'deskripsi_pendek' => 'Remove orbital implant',
          ),
          70 => 
          array (
            'kode' => '16.81',
            'deskripsi_panjang' => 'Repair of wound of orbit',
            'deskripsi_pendek' => 'Repair of orbital wound',
          ),
          71 => 
          array (
            'kode' => '16.82',
            'deskripsi_panjang' => 'Repair of rupture of eyeball',
            'deskripsi_pendek' => 'Repair eyeball rupture',
          ),
          72 => 
          array (
            'kode' => '16.89',
            'deskripsi_panjang' => 'Other repair of injury of eyeball or orbit',
            'deskripsi_pendek' => 'Eye/orbit inj repair NEC',
          ),
          73 => 
          array (
            'kode' => '16.91',
            'deskripsi_panjang' => 'Retrobulbar injection of therapeutic agent',
            'deskripsi_pendek' => 'Retrobulbar injection',
          ),
          74 => 
          array (
            'kode' => '16.92',
            'deskripsi_panjang' => 'Excision of lesion of orbit',
            'deskripsi_pendek' => 'Excision orbital lesion',
          ),
          75 => 
          array (
            'kode' => '16.93',
            'deskripsi_panjang' => 'Excision of lesion of eye, unspecified structure',
            'deskripsi_pendek' => 'Excision eye lesion NOS',
          ),
          76 => 
          array (
            'kode' => '16.98',
            'deskripsi_panjang' => 'Other operations on orbit',
            'deskripsi_pendek' => 'Operation on orbit NEC',
          ),
          77 => 
          array (
            'kode' => '16.99',
            'deskripsi_panjang' => 'Other operations on eyeball',
            'deskripsi_pendek' => 'Operation on eyeball NEC',
          ),
          78 => 
          array (
            'kode' => '17.11',
            'deskripsi_panjang' => 'Laparoscopic repair of direct inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Lap dir ing hern-graft',
          ),
          79 => 
          array (
            'kode' => '17.12',
            'deskripsi_panjang' => 'Laparoscopic repair of indirect inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Lap indir ing hern-graft',
          ),
          80 => 
          array (
            'kode' => '17.13',
            'deskripsi_panjang' => 'Laparoscopic repair of inguinal hernia with graft or prosthesis, not otherwise specified',
            'deskripsi_pendek' => 'Lap ing hern-graft NOS',
          ),
          81 => 
          array (
            'kode' => '17.21',
            'deskripsi_panjang' => 'Laparoscopic bilateral repair of direct inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Lap bil dir ing hrn-grft',
          ),
          82 => 
          array (
            'kode' => '17.22',
            'deskripsi_panjang' => 'Laparoscopic bilateral repair of indirect inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Lap bi indir ing hrn-grf',
          ),
          83 => 
          array (
            'kode' => '17.23',
            'deskripsi_panjang' => 'Laparoscopic bilateral repair of inguinal hernia, one direct and one indirect, with graft or prosthesis',
            'deskripsi_pendek' => 'Lap bi dr/ind ing hrn-gr',
          ),
          84 => 
          array (
            'kode' => '17.24',
            'deskripsi_panjang' => 'Laparoscopic bilateral repair of inguinal hernia with graft or prosthesis, not otherwise specified',
            'deskripsi_pendek' => 'Lap bil ing hern-grf NOS',
          ),
          85 => 
          array (
            'kode' => '17.31',
            'deskripsi_panjang' => 'Laparoscopic multiple segmental resection of large intestine',
            'deskripsi_pendek' => 'Lap mul seg res lg intes',
          ),
          86 => 
          array (
            'kode' => '17.32',
            'deskripsi_panjang' => 'Laparoscopic cecectomy',
            'deskripsi_pendek' => 'Laparoscopic cecectomy',
          ),
          87 => 
          array (
            'kode' => '17.33',
            'deskripsi_panjang' => 'Laparoscopic right hemicolectomy',
            'deskripsi_pendek' => 'Lap right hemicolectomy',
          ),
          88 => 
          array (
            'kode' => '17.34',
            'deskripsi_panjang' => 'Laparoscopic resection of transverse colon',
            'deskripsi_pendek' => 'Lap res transverse colon',
          ),
          89 => 
          array (
            'kode' => '17.35',
            'deskripsi_panjang' => 'Laparoscopic left hemicolectomy',
            'deskripsi_pendek' => 'Lap left hemicolectomy',
          ),
          90 => 
          array (
            'kode' => '17.36',
            'deskripsi_panjang' => 'Laparoscopic sigmoidectomy',
            'deskripsi_pendek' => 'Lap sigmoidectomy',
          ),
          91 => 
          array (
            'kode' => '17.39',
            'deskripsi_panjang' => 'Other laparoscopic partial excision of large intestine',
            'deskripsi_pendek' => 'Lap pt ex lrg intest NEC',
          ),
          92 => 
          array (
            'kode' => '17.41',
            'deskripsi_panjang' => 'Open robotic assisted procedure',
            'deskripsi_pendek' => 'Open robotic assist proc',
          ),
          93 => 
          array (
            'kode' => '17.42',
            'deskripsi_panjang' => 'Laparoscopic robotic assisted procedure',
            'deskripsi_pendek' => 'Lap robotic assist proc',
          ),
          94 => 
          array (
            'kode' => '17.43',
            'deskripsi_panjang' => 'Percutaneous robotic assisted procedure',
            'deskripsi_pendek' => 'Perc robotic assist proc',
          ),
          95 => 
          array (
            'kode' => '17.44',
            'deskripsi_panjang' => 'Endoscopic robotic assisted procedure',
            'deskripsi_pendek' => 'Endo robotic assist proc',
          ),
          96 => 
          array (
            'kode' => '17.45',
            'deskripsi_panjang' => 'Thoracoscopic robotic assisted procedure',
            'deskripsi_pendek' => 'Thoraco robotic ast proc',
          ),
          97 => 
          array (
            'kode' => '17.49',
            'deskripsi_panjang' => 'Other and unspecified robotic assisted procedure',
            'deskripsi_pendek' => 'Robotic ast proc NEC/NOS',
          ),
          98 => 
          array (
            'kode' => '17.51',
            'deskripsi_panjang' => 'Implantation of rechargeable cardiac contractility modulation [CCM], total system',
            'deskripsi_pendek' => 'Implant CCM,total system',
          ),
          99 => 
          array (
            'kode' => '17.52',
            'deskripsi_panjang' => 'Implantation or replacement of cardiac contractility modulation [CCM] rechargeable pulse generator only',
            'deskripsi_pendek' => 'Implant CCM pulse genrtr',
          ),
          100 => 
          array (
            'kode' => '17.53',
            'deskripsi_panjang' => 'Percutaneous atherectomy of extracranial vessel(s)',
            'deskripsi_pendek' => 'Perc ather extracran vsl',
          ),
          101 => 
          array (
            'kode' => '17.54',
            'deskripsi_panjang' => 'Percutaneous atherectomy of intracranial vessel(s)',
            'deskripsi_pendek' => 'Perc ather intracran vsl',
          ),
          102 => 
          array (
            'kode' => '17.55',
            'deskripsi_panjang' => 'Transluminal coronary atherectomy',
            'deskripsi_pendek' => 'Translum cor atherectomy',
          ),
          103 => 
          array (
            'kode' => '17.56',
            'deskripsi_panjang' => 'Atherectomy of other non-coronary vessel(s)',
            'deskripsi_pendek' => 'Ather oth non-cor vessel',
          ),
          104 => 
          array (
            'kode' => '17.61',
            'deskripsi_panjang' => 'Laser interstitial thermal therapy [LITT] of lesion or tissue of brain under guidance',
            'deskripsi_pendek' => 'LITT lesn brain,guidance',
          ),
          105 => 
          array (
            'kode' => '17.62',
            'deskripsi_panjang' => 'Laser interstitial thermal therapy [LITT] of lesion or tissue of head and neck under guidance',
            'deskripsi_pendek' => 'LITT les hd/nck,guidance',
          ),
          106 => 
          array (
            'kode' => '17.63',
            'deskripsi_panjang' => 'Laser interstitial thermal therapy [LITT] of lesion or tissue of liver under guidance',
            'deskripsi_pendek' => 'LITT lesn liver,guidance',
          ),
          107 => 
          array (
            'kode' => '17.69',
            'deskripsi_panjang' => 'Laser interstitial thermal therapy [LITT] of lesion or tissue of other and unspecified site under guidance',
            'deskripsi_pendek' => 'LITT lesn, guide oth/NOS',
          ),
          108 => 
          array (
            'kode' => '17.70',
            'deskripsi_panjang' => 'Intravenous infusion of clofarabine',
            'deskripsi_pendek' => 'IV infusion clofarabine',
          ),
          109 => 
          array (
            'kode' => '17.71',
            'deskripsi_panjang' => 'Non-coronary intra-operative fluorescence vascular angiography [IFVA]',
            'deskripsi_pendek' => 'Non-coronary IFVA',
          ),
          110 => 
          array (
            'kode' => '17.81',
            'deskripsi_panjang' => 'Insertion of antimicrobial envelope',
            'deskripsi_pendek' => 'Insert antimicrobial env',
          ),
          111 => 
          array (
            'kode' => '18.01',
            'deskripsi_panjang' => 'Piercing of ear lobe',
            'deskripsi_pendek' => 'Piercing of ear lobe',
          ),
          112 => 
          array (
            'kode' => '18.02',
            'deskripsi_panjang' => 'Incision of external auditory canal',
            'deskripsi_pendek' => 'Ext auditory canal incis',
          ),
          113 => 
          array (
            'kode' => '18.09',
            'deskripsi_panjang' => 'Other incision of external ear',
            'deskripsi_pendek' => 'External ear incis NEC',
          ),
          114 => 
          array (
            'kode' => '18.11',
            'deskripsi_panjang' => 'Otoscopy',
            'deskripsi_pendek' => 'Otoscopy',
          ),
          115 => 
          array (
            'kode' => '18.12',
            'deskripsi_panjang' => 'Biopsy of external ear',
            'deskripsi_pendek' => 'External ear biopsy',
          ),
          116 => 
          array (
            'kode' => '18.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on external ear',
            'deskripsi_pendek' => 'Ext ear diagnos proc NEC',
          ),
          117 => 
          array (
            'kode' => '18.21',
            'deskripsi_panjang' => 'Excision of preauricular sinus',
            'deskripsi_pendek' => 'Preauricular sinus excis',
          ),
          118 => 
          array (
            'kode' => '18.29',
            'deskripsi_panjang' => 'Excision or destruction of other lesion of external ear',
            'deskripsi_pendek' => 'Destruct ext ear les NEC',
          ),
          119 => 
          array (
            'kode' => '18.31',
            'deskripsi_panjang' => 'Radical excision of lesion of external ear',
            'deskripsi_pendek' => 'Rad excis ext ear les',
          ),
          120 => 
          array (
            'kode' => '18.39',
            'deskripsi_panjang' => 'Other excision of external ear',
            'deskripsi_pendek' => 'Excis external ear NEC',
          ),
          121 => 
          array (
            'kode' => '18.4',
            'deskripsi_panjang' => 'Suture of laceration of external ear',
            'deskripsi_pendek' => 'Suture ext ear lac',
          ),
          122 => 
          array (
            'kode' => '18.5',
            'deskripsi_panjang' => 'Surgical correction of prominent ear',
            'deskripsi_pendek' => 'Correction prominent ear',
          ),
          123 => 
          array (
            'kode' => '18.6',
            'deskripsi_panjang' => 'Reconstruction of external auditory canal',
            'deskripsi_pendek' => 'Ext audit canal reconstr',
          ),
          124 => 
          array (
            'kode' => '18.71',
            'deskripsi_panjang' => 'Construction of auricle of ear',
            'deskripsi_pendek' => 'Construction ear auricle',
          ),
          125 => 
          array (
            'kode' => '18.72',
            'deskripsi_panjang' => 'Reattachment of amputated ear',
            'deskripsi_pendek' => 'Reattach amputated ear',
          ),
          126 => 
          array (
            'kode' => '18.79',
            'deskripsi_panjang' => 'Other plastic repair of external ear',
            'deskripsi_pendek' => 'Plastic rep ext ear NEC',
          ),
          127 => 
          array (
            'kode' => '18.9',
            'deskripsi_panjang' => 'Other operations on external ear',
            'deskripsi_pendek' => 'Other ext ear operations',
          ),
          128 => 
          array (
            'kode' => '19.0',
            'deskripsi_panjang' => 'Stapes mobilization',
            'deskripsi_pendek' => 'Stapes mobilization',
          ),
          129 => 
          array (
            'kode' => '19.11',
            'deskripsi_panjang' => 'Stapedectomy with incus replacement',
            'deskripsi_pendek' => 'Stapedect w replac incus',
          ),
          130 => 
          array (
            'kode' => '19.19',
            'deskripsi_panjang' => 'Other stapedectomy',
            'deskripsi_pendek' => 'Stapedectomy NEC',
          ),
          131 => 
          array (
            'kode' => '19.21',
            'deskripsi_panjang' => 'Revision of stapedectomy with incus replacement',
            'deskripsi_pendek' => 'Rev stapdec w incus repl',
          ),
          132 => 
          array (
            'kode' => '19.29',
            'deskripsi_panjang' => 'Other revision of stapedectomy',
            'deskripsi_pendek' => 'Stapedectomy revis NEC',
          ),
          133 => 
          array (
            'kode' => '19.3',
            'deskripsi_panjang' => 'Other operations on ossicular chain',
            'deskripsi_pendek' => 'Ossicular chain op NEC',
          ),
          134 => 
          array (
            'kode' => '19.4',
            'deskripsi_panjang' => 'Myringoplasty',
            'deskripsi_pendek' => 'Myringoplasty',
          ),
          135 => 
          array (
            'kode' => '19.52',
            'deskripsi_panjang' => 'Type II tympanoplasty',
            'deskripsi_pendek' => 'Type 2 tympanoplasty',
          ),
          136 => 
          array (
            'kode' => '19.53',
            'deskripsi_panjang' => 'Type III tympanoplasty',
            'deskripsi_pendek' => 'Type 3 tympanoplasty',
          ),
          137 => 
          array (
            'kode' => '19.54',
            'deskripsi_panjang' => 'Type IV tympanoplasty',
            'deskripsi_pendek' => 'Type 4 tympanoplasty',
          ),
          138 => 
          array (
            'kode' => '19.55',
            'deskripsi_panjang' => 'Type V tympanoplasty',
            'deskripsi_pendek' => 'Type 5 tympanoplasty',
          ),
          139 => 
          array (
            'kode' => '19.6',
            'deskripsi_panjang' => 'Revision of tympanoplasty',
            'deskripsi_pendek' => 'Tympanoplasty revision',
          ),
          140 => 
          array (
            'kode' => '19.9',
            'deskripsi_panjang' => 'Other repair of middle ear',
            'deskripsi_pendek' => 'Middle ear repair NEC',
          ),
          141 => 
          array (
            'kode' => '20.01',
            'deskripsi_panjang' => 'Myringotomy with insertion of tube',
            'deskripsi_pendek' => 'Myringotomy w intubation',
          ),
          142 => 
          array (
            'kode' => '20.09',
            'deskripsi_panjang' => 'Other myringotomy',
            'deskripsi_pendek' => 'Myringotomy NEC',
          ),
          143 => 
          array (
            'kode' => '20.1',
            'deskripsi_panjang' => 'Removal of tympanostomy tube',
            'deskripsi_pendek' => 'Tympanostomy tube remove',
          ),
          144 => 
          array (
            'kode' => '20.21',
            'deskripsi_panjang' => 'Incision of mastoid',
            'deskripsi_pendek' => 'Mastoid incision',
          ),
          145 => 
          array (
            'kode' => '20.22',
            'deskripsi_panjang' => 'Incision of petrous pyramid air cells',
            'deskripsi_pendek' => 'Petrus pyram air cel inc',
          ),
          146 => 
          array (
            'kode' => '20.23',
            'deskripsi_panjang' => 'Incision of middle ear',
            'deskripsi_pendek' => 'Middle ear incision',
          ),
          147 => 
          array (
            'kode' => '20.31',
            'deskripsi_panjang' => 'Electrocochleography',
            'deskripsi_pendek' => 'Electrocochleography',
          ),
          148 => 
          array (
            'kode' => '20.32',
            'deskripsi_panjang' => 'Biopsy of middle and inner ear',
            'deskripsi_pendek' => 'Mid & inner ear biopsy',
          ),
          149 => 
          array (
            'kode' => '20.39',
            'deskripsi_panjang' => 'Other diagnostic procedures on middle and inner ear',
            'deskripsi_pendek' => 'Mid/in ear dx proc NEC',
          ),
          150 => 
          array (
            'kode' => '20.41',
            'deskripsi_panjang' => 'Simple mastoidectomy',
            'deskripsi_pendek' => 'Simple mastoidectomy',
          ),
          151 => 
          array (
            'kode' => '20.42',
            'deskripsi_panjang' => 'Radical mastoidectomy',
            'deskripsi_pendek' => 'Radical mastoidectomy',
          ),
          152 => 
          array (
            'kode' => '20.49',
            'deskripsi_panjang' => 'Other mastoidectomy',
            'deskripsi_pendek' => 'Mastoidectomy NEC',
          ),
          153 => 
          array (
            'kode' => '20.51',
            'deskripsi_panjang' => 'Excision of lesion of middle ear',
            'deskripsi_pendek' => 'Excise middle ear lesion',
          ),
          154 => 
          array (
            'kode' => '20.59',
            'deskripsi_panjang' => 'Other excision of middle ear',
            'deskripsi_pendek' => 'Middle ear excision NEC',
          ),
          155 => 
          array (
            'kode' => '20.61',
            'deskripsi_panjang' => 'Fenestration of inner ear (initial)',
            'deskripsi_pendek' => 'Inner ear fenestration',
          ),
          156 => 
          array (
            'kode' => '20.62',
            'deskripsi_panjang' => 'Revision of fenestration of inner ear',
            'deskripsi_pendek' => 'Revis inner ear fenestra',
          ),
          157 => 
          array (
            'kode' => '20.71',
            'deskripsi_panjang' => 'Endolymphatic shunt',
            'deskripsi_pendek' => 'Endolymphatic shunt',
          ),
          158 => 
          array (
            'kode' => '20.72',
            'deskripsi_panjang' => 'Injection into inner ear',
            'deskripsi_pendek' => 'Inner ear injection',
          ),
          159 => 
          array (
            'kode' => '20.79',
            'deskripsi_panjang' => 'Other incision, excision, and destruction of inner ear',
            'deskripsi_pendek' => 'Inc/exc/destr in ear NEC',
          ),
          160 => 
          array (
            'kode' => '20.8',
            'deskripsi_panjang' => 'Operations on eustachian tube',
            'deskripsi_pendek' => 'Eustachian tube ops',
          ),
          161 => 
          array (
            'kode' => '20.91',
            'deskripsi_panjang' => 'Tympanosympathectomy',
            'deskripsi_pendek' => 'Tympanosympathectomy',
          ),
          162 => 
          array (
            'kode' => '20.92',
            'deskripsi_panjang' => 'Revision of mastoidectomy',
            'deskripsi_pendek' => 'Mastoidectomy revision',
          ),
          163 => 
          array (
            'kode' => '20.93',
            'deskripsi_panjang' => 'Repair of oval and round windows',
            'deskripsi_pendek' => 'Repair oval/round window',
          ),
          164 => 
          array (
            'kode' => '20.94',
            'deskripsi_panjang' => 'Injection of tympanum',
            'deskripsi_pendek' => 'Tympanic injection',
          ),
          165 => 
          array (
            'kode' => '20.95',
            'deskripsi_panjang' => 'Implantation of electromagnetic hearing device',
            'deskripsi_pendek' => 'Elecmag hear dev implant',
          ),
          166 => 
          array (
            'kode' => '20.96',
            'deskripsi_panjang' => 'Implantation or replacement of cochlear prosthetic device, not otherwise specified',
            'deskripsi_pendek' => 'Implt cochlear prost NOS',
          ),
          167 => 
          array (
            'kode' => '20.97',
            'deskripsi_panjang' => 'Implantation or replacement of cochlear prosthetic device, single channel',
            'deskripsi_pendek' => 'Imp/rep schan coch pros',
          ),
          168 => 
          array (
            'kode' => '20.98',
            'deskripsi_panjang' => 'Implantation or replacement of cochlear prosthetic device, multiple channel',
            'deskripsi_pendek' => 'Imp/rep mchan cochl pros',
          ),
          169 => 
          array (
            'kode' => '20.99',
            'deskripsi_panjang' => 'Other operations on middle and inner ear',
            'deskripsi_pendek' => 'Mid-inner ear ops NEC',
          ),
          170 => 
          array (
            'kode' => '21.00',
            'deskripsi_panjang' => 'Control of epistaxis, not otherwise specified',
            'deskripsi_pendek' => 'Control of epistaxis NOS',
          ),
          171 => 
          array (
            'kode' => '21.01',
            'deskripsi_panjang' => 'Control of epistaxis by anterior nasal packing',
            'deskripsi_pendek' => 'Ant nasal pack for epist',
          ),
          172 => 
          array (
            'kode' => '21.02',
            'deskripsi_panjang' => 'Control of epistaxis by posterior (and anterior) packing',
            'deskripsi_pendek' => 'Post nasal pac for epist',
          ),
          173 => 
          array (
            'kode' => '21.03',
            'deskripsi_panjang' => 'Control of epistaxis by cauterization (and packing)',
            'deskripsi_pendek' => 'Cautery to stop epistax',
          ),
          174 => 
          array (
            'kode' => '21.04',
            'deskripsi_panjang' => 'Control of epistaxis by ligation of ethmoidal arteries',
            'deskripsi_pendek' => 'Ethmoid art ligat-epist',
          ),
          175 => 
          array (
            'kode' => '21.05',
            'deskripsi_panjang' => 'Control of epistaxis by (transantral) ligation of the maxillary artery',
            'deskripsi_pendek' => 'Max art lig for epistax',
          ),
          176 => 
          array (
            'kode' => '21.06',
            'deskripsi_panjang' => 'Control of epistaxis by ligation of the external carotid artery',
            'deskripsi_pendek' => 'Ext carot art lig-epist',
          ),
          177 => 
          array (
            'kode' => '21.07',
            'deskripsi_panjang' => 'Control of epistaxis by excision of nasal mucosa and skin grafting of septum and lateral nasal wall',
            'deskripsi_pendek' => 'Nasal sept grft-epistax',
          ),
          178 => 
          array (
            'kode' => '21.09',
            'deskripsi_panjang' => 'Control of epistaxis by other means',
            'deskripsi_pendek' => 'Epistaxis control NEC',
          ),
          179 => 
          array (
            'kode' => '21.1',
            'deskripsi_panjang' => 'Incision of nose',
            'deskripsi_pendek' => 'Incision of nose',
          ),
          180 => 
          array (
            'kode' => '21.21',
            'deskripsi_panjang' => 'Rhinoscopy',
            'deskripsi_pendek' => 'Rhinoscopy',
          ),
          181 => 
          array (
            'kode' => '21.22',
            'deskripsi_panjang' => 'Biopsy of nose',
            'deskripsi_pendek' => 'Nasal biopsy',
          ),
          182 => 
          array (
            'kode' => '21.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on nose',
            'deskripsi_pendek' => 'Nasal dx proc NEC',
          ),
          183 => 
          array (
            'kode' => '21.30',
            'deskripsi_panjang' => 'Excision or destruction of lesion of nose, not otherwise specified',
            'deskripsi_pendek' => 'Nasal lesion excis NOS',
          ),
          184 => 
          array (
            'kode' => '21.31',
            'deskripsi_panjang' => 'Local excision or destruction of intranasal lesion',
            'deskripsi_pendek' => 'Intranas les destruction',
          ),
          185 => 
          array (
            'kode' => '21.32',
            'deskripsi_panjang' => 'Local excision or destruction of other lesion of nose',
            'deskripsi_pendek' => 'Nasal les destruct NEC',
          ),
          186 => 
          array (
            'kode' => '21.4',
            'deskripsi_panjang' => 'Resection of nose',
            'deskripsi_pendek' => 'Resection of nose',
          ),
          187 => 
          array (
            'kode' => '21.5',
            'deskripsi_panjang' => 'Submucous resection of nasal septum',
            'deskripsi_pendek' => 'Submuc nasal sept resect',
          ),
          188 => 
          array (
            'kode' => '21.61',
            'deskripsi_panjang' => 'Turbinectomy by diathermy or cryosurgery',
            'deskripsi_pendek' => 'Diather/cryo turbinectom',
          ),
          189 => 
          array (
            'kode' => '21.62',
            'deskripsi_panjang' => 'Fracture of the turbinates',
            'deskripsi_pendek' => 'Turbinate fracture',
          ),
          190 => 
          array (
            'kode' => '21.69',
            'deskripsi_panjang' => 'Other turbinectomy',
            'deskripsi_pendek' => 'Turbinectomy NEC',
          ),
          191 => 
          array (
            'kode' => '21.71',
            'deskripsi_panjang' => 'Closed reduction of nasal fracture',
            'deskripsi_pendek' => 'Clos reduction nasal fx',
          ),
          192 => 
          array (
            'kode' => '21.72',
            'deskripsi_panjang' => 'Open reduction of nasal fracture',
            'deskripsi_pendek' => 'Open reduction nasal fx',
          ),
          193 => 
          array (
            'kode' => '21.81',
            'deskripsi_panjang' => 'Suture of laceration of nose',
            'deskripsi_pendek' => 'Nasal laceration suture',
          ),
          194 => 
          array (
            'kode' => '21.82',
            'deskripsi_panjang' => 'Closure of nasal fistula',
            'deskripsi_pendek' => 'Nasal fistula closure',
          ),
          195 => 
          array (
            'kode' => '21.83',
            'deskripsi_panjang' => 'Total nasal reconstruction',
            'deskripsi_pendek' => 'Tot nasal reconstruction',
          ),
          196 => 
          array (
            'kode' => '21.84',
            'deskripsi_panjang' => 'Revision rhinoplasty',
            'deskripsi_pendek' => 'Revision rhinoplasty',
          ),
          197 => 
          array (
            'kode' => '21.85',
            'deskripsi_panjang' => 'Augmentation rhinoplasty',
            'deskripsi_pendek' => 'Augmentation rhinoplasty',
          ),
          198 => 
          array (
            'kode' => '21.86',
            'deskripsi_panjang' => 'Limited rhinoplasty',
            'deskripsi_pendek' => 'Limited rhinoplasty',
          ),
          199 => 
          array (
            'kode' => '21.87',
            'deskripsi_panjang' => 'Other rhinoplasty',
            'deskripsi_pendek' => 'Rhinoplasty NEC',
          ),
          200 => 
          array (
            'kode' => '21.88',
            'deskripsi_panjang' => 'Other septoplasty',
            'deskripsi_pendek' => 'Septoplasty NEC',
          ),
          201 => 
          array (
            'kode' => '21.89',
            'deskripsi_panjang' => 'Other repair and plastic operations on nose',
            'deskripsi_pendek' => 'Nasal repair NEC',
          ),
          202 => 
          array (
            'kode' => '21.91',
            'deskripsi_panjang' => 'Lysis of adhesions of nose',
            'deskripsi_pendek' => 'Lysis of nasal adhesions',
          ),
          203 => 
          array (
            'kode' => '21.99',
            'deskripsi_panjang' => 'Other operations on nose',
            'deskripsi_pendek' => 'Nasal operation NEC',
          ),
          204 => 
          array (
            'kode' => '22.00',
            'deskripsi_panjang' => 'Aspiration and lavage of nasal sinus, not otherwise specified',
            'deskripsi_pendek' => 'Sinus aspirat/lavage NOS',
          ),
          205 => 
          array (
            'kode' => '22.01',
            'deskripsi_panjang' => 'Puncture of nasal sinus for aspiration or lavage',
            'deskripsi_pendek' => 'Sinus punct for lavage',
          ),
          206 => 
          array (
            'kode' => '22.02',
            'deskripsi_panjang' => 'Aspiration or lavage of nasal sinus through natural ostium',
            'deskripsi_pendek' => 'Sinus lavage thru ostium',
          ),
          207 => 
          array (
            'kode' => '22.11',
            'deskripsi_panjang' => 'Closed [endoscopic] [needle] biopsy of nasal sinus',
            'deskripsi_pendek' => 'Closed nasal sinus bx',
          ),
          208 => 
          array (
            'kode' => '22.12',
            'deskripsi_panjang' => 'Open biopsy of nasal sinus',
            'deskripsi_pendek' => 'Open biopsy nasal sinus',
          ),
          209 => 
          array (
            'kode' => '22.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on nasal sinuses',
            'deskripsi_pendek' => 'Nasal sinus dx proc NEC',
          ),
          210 => 
          array (
            'kode' => '22.2',
            'deskripsi_panjang' => 'Intranasal antrotomy',
            'deskripsi_pendek' => 'Intranasal antrotomy',
          ),
          211 => 
          array (
            'kode' => '22.31',
            'deskripsi_panjang' => 'Radical maxillary antrotomy',
            'deskripsi_pendek' => 'Radical maxillary antrot',
          ),
          212 => 
          array (
            'kode' => '22.39',
            'deskripsi_panjang' => 'Other external maxillary antrotomy',
            'deskripsi_pendek' => 'Ext maxillary antrot NEC',
          ),
          213 => 
          array (
            'kode' => '22.41',
            'deskripsi_panjang' => 'Frontal sinusotomy',
            'deskripsi_pendek' => 'Frontal sinusotomy',
          ),
          214 => 
          array (
            'kode' => '22.42',
            'deskripsi_panjang' => 'Frontal sinusectomy',
            'deskripsi_pendek' => 'Frontal sinusectomy',
          ),
          215 => 
          array (
            'kode' => '22.50',
            'deskripsi_panjang' => 'Sinusotomy, not otherwise specified',
            'deskripsi_pendek' => 'Sinusotomy NOS',
          ),
          216 => 
          array (
            'kode' => '22.51',
            'deskripsi_panjang' => 'Ethmoidotomy',
            'deskripsi_pendek' => 'Ethmoidotomy',
          ),
          217 => 
          array (
            'kode' => '22.52',
            'deskripsi_panjang' => 'Sphenoidotomy',
            'deskripsi_pendek' => 'Sphenoidotomy',
          ),
          218 => 
          array (
            'kode' => '22.53',
            'deskripsi_panjang' => 'Incision of multiple nasal sinuses',
            'deskripsi_pendek' => 'Multiple sinus incision',
          ),
          219 => 
          array (
            'kode' => '22.60',
            'deskripsi_panjang' => 'Sinusectomy, not otherwise specified',
            'deskripsi_pendek' => 'Sinusectomy NOS',
          ),
          220 => 
          array (
            'kode' => '22.61',
            'deskripsi_panjang' => 'Excision of lesion of maxillary sinus with Caldwell-Luc approach',
            'deskripsi_pendek' => 'C-luc exc max sinus les',
          ),
          221 => 
          array (
            'kode' => '22.62',
            'deskripsi_panjang' => 'Excision of lesion of maxillary sinus with other approach',
            'deskripsi_pendek' => 'Exc max sinus lesion NEC',
          ),
          222 => 
          array (
            'kode' => '22.63',
            'deskripsi_panjang' => 'Ethmoidectomy',
            'deskripsi_pendek' => 'Ethmoidectomy',
          ),
          223 => 
          array (
            'kode' => '22.64',
            'deskripsi_panjang' => 'Sphenoidectomy',
            'deskripsi_pendek' => 'Sphenoidectomy',
          ),
          224 => 
          array (
            'kode' => '22.71',
            'deskripsi_panjang' => 'Closure of nasal sinus fistula',
            'deskripsi_pendek' => 'Nasal sinus fistula clos',
          ),
          225 => 
          array (
            'kode' => '22.79',
            'deskripsi_panjang' => 'Other repair of nasal sinus',
            'deskripsi_pendek' => 'Nasal sinus repair NEC',
          ),
          226 => 
          array (
            'kode' => '22.9',
            'deskripsi_panjang' => 'Other operations on nasal sinuses',
            'deskripsi_pendek' => 'Other nasal sinus ops',
          ),
          227 => 
          array (
            'kode' => '23.01',
            'deskripsi_panjang' => 'Extraction of deciduous tooth',
            'deskripsi_pendek' => 'Deciduous tooth extract',
          ),
          228 => 
          array (
            'kode' => '23.09',
            'deskripsi_panjang' => 'Extraction of other tooth',
            'deskripsi_pendek' => 'Tooth extraction NEC',
          ),
          229 => 
          array (
            'kode' => '23.11',
            'deskripsi_panjang' => 'Removal of residual root',
            'deskripsi_pendek' => 'Residual root removal',
          ),
          230 => 
          array (
            'kode' => '23.19',
            'deskripsi_panjang' => 'Other surgical extraction of tooth',
            'deskripsi_pendek' => 'Surg tooth extract NEC',
          ),
          231 => 
          array (
            'kode' => '23.2',
            'deskripsi_panjang' => 'Restoration of tooth by filling',
            'deskripsi_pendek' => 'Tooth restor by filling',
          ),
          232 => 
          array (
            'kode' => '23.3',
            'deskripsi_panjang' => 'Restoration of tooth by inlay',
            'deskripsi_pendek' => 'Tooth restorat by inlay',
          ),
          233 => 
          array (
            'kode' => '23.41',
            'deskripsi_panjang' => 'Application of crown',
            'deskripsi_pendek' => 'Crown application',
          ),
          234 => 
          array (
            'kode' => '23.42',
            'deskripsi_panjang' => 'Insertion of fixed bridge',
            'deskripsi_pendek' => 'Fixed bridge insertion',
          ),
          235 => 
          array (
            'kode' => '23.43',
            'deskripsi_panjang' => 'Insertion of removable bridge',
            'deskripsi_pendek' => 'Insert removable bridge',
          ),
          236 => 
          array (
            'kode' => '23.49',
            'deskripsi_panjang' => 'Other dental restoration',
            'deskripsi_pendek' => 'Dental restoration NEC',
          ),
          237 => 
          array (
            'kode' => '23.5',
            'deskripsi_panjang' => 'Implantation of tooth',
            'deskripsi_pendek' => 'Tooth implantation',
          ),
          238 => 
          array (
            'kode' => '23.6',
            'deskripsi_panjang' => 'Prosthetic dental implant',
            'deskripsi_pendek' => 'Prosthet dental implant',
          ),
          239 => 
          array (
            'kode' => '23.70',
            'deskripsi_panjang' => 'Root canal, not otherwise specified',
            'deskripsi_pendek' => 'Root canal NOS',
          ),
          240 => 
          array (
            'kode' => '23.71',
            'deskripsi_panjang' => 'Root canal therapy with irrigation',
            'deskripsi_pendek' => 'Root canal w irrigation',
          ),
          241 => 
          array (
            'kode' => '23.72',
            'deskripsi_panjang' => 'Root canal therapy with apicoectomy',
            'deskripsi_pendek' => 'Root canal w apicoectomy',
          ),
          242 => 
          array (
            'kode' => '23.73',
            'deskripsi_panjang' => 'Apicoectomy',
            'deskripsi_pendek' => 'Apicoectomy',
          ),
          243 => 
          array (
            'kode' => '24.0',
            'deskripsi_panjang' => 'Incision of gum or alveolar bone',
            'deskripsi_pendek' => 'Gum or alveolar incision',
          ),
          244 => 
          array (
            'kode' => '24.11',
            'deskripsi_panjang' => 'Biopsy of gum',
            'deskripsi_pendek' => 'Gum biopsy',
          ),
          245 => 
          array (
            'kode' => '24.12',
            'deskripsi_panjang' => 'Biopsy of alveolus',
            'deskripsi_pendek' => 'Alveolus biopsy',
          ),
          246 => 
          array (
            'kode' => '24.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on teeth, gums, and alveoli',
            'deskripsi_pendek' => 'Tooth & gum dx proc NEC',
          ),
          247 => 
          array (
            'kode' => '24.2',
            'deskripsi_panjang' => 'Gingivoplasty',
            'deskripsi_pendek' => 'Gingivoplasty',
          ),
          248 => 
          array (
            'kode' => '24.31',
            'deskripsi_panjang' => 'Excision of lesion or tissue of gum',
            'deskripsi_pendek' => 'Gum lesion excision',
          ),
          249 => 
          array (
            'kode' => '24.32',
            'deskripsi_panjang' => 'Suture of laceration of gum',
            'deskripsi_pendek' => 'Suture of gum laceration',
          ),
          250 => 
          array (
            'kode' => '24.39',
            'deskripsi_panjang' => 'Other operations on gum',
            'deskripsi_pendek' => 'Gum operation NEC',
          ),
          251 => 
          array (
            'kode' => '24.4',
            'deskripsi_panjang' => 'Excision of dental lesion of jaw',
            'deskripsi_pendek' => 'Exc of dental les of jaw',
          ),
          252 => 
          array (
            'kode' => '24.5',
            'deskripsi_panjang' => 'Alveoloplasty',
            'deskripsi_pendek' => 'Alveoloplasty',
          ),
          253 => 
          array (
            'kode' => '24.6',
            'deskripsi_panjang' => 'Exposure of tooth',
            'deskripsi_pendek' => 'Exposure of tooth',
          ),
          254 => 
          array (
            'kode' => '24.7',
            'deskripsi_panjang' => 'Application of orthodontic appliance',
            'deskripsi_pendek' => 'Orthodon applianc applic',
          ),
          255 => 
          array (
            'kode' => '24.8',
            'deskripsi_panjang' => 'Other orthodontic operation',
            'deskripsi_pendek' => 'Other orthodontic operat',
          ),
          256 => 
          array (
            'kode' => '24.91',
            'deskripsi_panjang' => 'Extension or deepening of buccolabial or lingual sulcus',
            'deskripsi_pendek' => 'Exten buccolabial/sulcus',
          ),
          257 => 
          array (
            'kode' => '24.99',
            'deskripsi_panjang' => 'Other dental operations',
            'deskripsi_pendek' => 'Dental operation NEC',
          ),
          258 => 
          array (
            'kode' => '25.01',
            'deskripsi_panjang' => 'Closed [needle] biopsy of tongue',
            'deskripsi_pendek' => 'Closed biopsy of tongue',
          ),
          259 => 
          array (
            'kode' => '25.02',
            'deskripsi_panjang' => 'Open biopsy of tongue',
            'deskripsi_pendek' => 'Open biopsy of tongue',
          ),
          260 => 
          array (
            'kode' => '25.09',
            'deskripsi_panjang' => 'Other diagnostic procedures on tongue',
            'deskripsi_pendek' => 'Tongue dx procedure NEC',
          ),
          261 => 
          array (
            'kode' => '25.1',
            'deskripsi_panjang' => 'Excision or destruction of lesion or tissue of tongue',
            'deskripsi_pendek' => 'Destruction tongue les',
          ),
          262 => 
          array (
            'kode' => '25.2',
            'deskripsi_panjang' => 'Partial glossectomy',
            'deskripsi_pendek' => 'Partial glossectomy',
          ),
          263 => 
          array (
            'kode' => '25.3',
            'deskripsi_panjang' => 'Complete glossectomy',
            'deskripsi_pendek' => 'Complete glossectomy',
          ),
          264 => 
          array (
            'kode' => '25.4',
            'deskripsi_panjang' => 'Radical glossectomy',
            'deskripsi_pendek' => 'Radical glossectomy',
          ),
          265 => 
          array (
            'kode' => '25.51',
            'deskripsi_panjang' => 'Suture of laceration of tongue',
            'deskripsi_pendek' => 'Suture of tongue lacerat',
          ),
          266 => 
          array (
            'kode' => '25.59',
            'deskripsi_panjang' => 'Other repair and plastic operations on tongue',
            'deskripsi_pendek' => 'Repair of tongue NEC',
          ),
          267 => 
          array (
            'kode' => '25.91',
            'deskripsi_panjang' => 'Lingual frenotomy',
            'deskripsi_pendek' => 'Lingual frenotomy',
          ),
          268 => 
          array (
            'kode' => '25.92',
            'deskripsi_panjang' => 'Lingual frenectomy',
            'deskripsi_pendek' => 'Lingual frenectomy',
          ),
          269 => 
          array (
            'kode' => '25.93',
            'deskripsi_panjang' => 'Lysis of adhesions of tongue',
            'deskripsi_pendek' => 'Lysis of tongue adhesion',
          ),
          270 => 
          array (
            'kode' => '25.94',
            'deskripsi_panjang' => 'Other glossotomy',
            'deskripsi_pendek' => 'Other glossotomy',
          ),
          271 => 
          array (
            'kode' => '25.99',
            'deskripsi_panjang' => 'Other operations on tongue',
            'deskripsi_pendek' => 'Tongue operation NEC',
          ),
          272 => 
          array (
            'kode' => '26.0',
            'deskripsi_panjang' => 'Incision of salivary gland or duct',
            'deskripsi_pendek' => 'Incis salivary glnd/duct',
          ),
          273 => 
          array (
            'kode' => '26.11',
            'deskripsi_panjang' => 'Closed [needle] biopsy of salivary gland or duct',
            'deskripsi_pendek' => 'Clos bx saliv gland/duct',
          ),
          274 => 
          array (
            'kode' => '26.12',
            'deskripsi_panjang' => 'Open biopsy of salivary gland or duct',
            'deskripsi_pendek' => 'Open bx saliv gland/duct',
          ),
          275 => 
          array (
            'kode' => '26.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on salivary glands and ducts',
            'deskripsi_pendek' => 'Saliv glnd dx proc NEC',
          ),
          276 => 
          array (
            'kode' => '26.21',
            'deskripsi_panjang' => 'Marsupialization of salivary gland cyst',
            'deskripsi_pendek' => 'Salivary cyst marsupial',
          ),
          277 => 
          array (
            'kode' => '26.29',
            'deskripsi_panjang' => 'Other excision of salivary gland lesion',
            'deskripsi_pendek' => 'Saliv lesion excis NEC',
          ),
          278 => 
          array (
            'kode' => '26.30',
            'deskripsi_panjang' => 'Sialoadenectomy, not otherwise specified',
            'deskripsi_pendek' => 'Sialoadenectomy NOS',
          ),
          279 => 
          array (
            'kode' => '26.31',
            'deskripsi_panjang' => 'Partial sialoadenectomy',
            'deskripsi_pendek' => 'Partial sialoadenectomy',
          ),
          280 => 
          array (
            'kode' => '26.32',
            'deskripsi_panjang' => 'Complete sialoadenectomy',
            'deskripsi_pendek' => 'Complete sialoadenectomy',
          ),
          281 => 
          array (
            'kode' => '26.41',
            'deskripsi_panjang' => 'Suture of laceration of salivary gland',
            'deskripsi_pendek' => 'Suture of saliv glnd lac',
          ),
          282 => 
          array (
            'kode' => '26.42',
            'deskripsi_panjang' => 'Closure of salivary fistula',
            'deskripsi_pendek' => 'Salivary fistula closure',
          ),
          283 => 
          array (
            'kode' => '26.49',
            'deskripsi_panjang' => 'Other repair and plastic operations on salivary gland or duct',
            'deskripsi_pendek' => 'Salivary repair NEC',
          ),
          284 => 
          array (
            'kode' => '26.91',
            'deskripsi_panjang' => 'Probing of salivary duct',
            'deskripsi_pendek' => 'Salivary duct probing',
          ),
          285 => 
          array (
            'kode' => '26.99',
            'deskripsi_panjang' => 'Other operations on salivary gland or duct',
            'deskripsi_pendek' => 'Salivary operation NEC',
          ),
          286 => 
          array (
            'kode' => '27.0',
            'deskripsi_panjang' => 'Drainage of face and floor of mouth',
            'deskripsi_pendek' => 'Drain face & mouth floor',
          ),
          287 => 
          array (
            'kode' => '27.1',
            'deskripsi_panjang' => 'Incision of palate',
            'deskripsi_pendek' => 'Incision of palate',
          ),
          288 => 
          array (
            'kode' => '27.21',
            'deskripsi_panjang' => 'Biopsy of bony palate',
            'deskripsi_pendek' => 'Bony palate biopsy',
          ),
          289 => 
          array (
            'kode' => '27.22',
            'deskripsi_panjang' => 'Biopsy of uvula and soft palate',
            'deskripsi_pendek' => 'Uvula and soft palate bx',
          ),
          290 => 
          array (
            'kode' => '27.23',
            'deskripsi_panjang' => 'Biopsy of lip',
            'deskripsi_pendek' => 'Lip biopsy',
          ),
          291 => 
          array (
            'kode' => '27.24',
            'deskripsi_panjang' => 'Biopsy of mouth, unspecified structure',
            'deskripsi_pendek' => 'Mouth biopsy NOS',
          ),
          292 => 
          array (
            'kode' => '27.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on oral cavity',
            'deskripsi_pendek' => 'Oral cavity dx proc NEC',
          ),
          293 => 
          array (
            'kode' => '27.31',
            'deskripsi_panjang' => 'Local excision or destruction of lesion or tissue of bony palate',
            'deskripsi_pendek' => 'Loc exc bony palate les',
          ),
          294 => 
          array (
            'kode' => '27.32',
            'deskripsi_panjang' => 'Wide excision or destruction of lesion or tissue of bony palate',
            'deskripsi_pendek' => 'Wide exc bony palate les',
          ),
          295 => 
          array (
            'kode' => '27.41',
            'deskripsi_panjang' => 'Labial frenectomy',
            'deskripsi_pendek' => 'Labial frenumectomy',
          ),
          296 => 
          array (
            'kode' => '27.42',
            'deskripsi_panjang' => 'Wide excision of lesion of lip',
            'deskripsi_pendek' => 'Wide excision of lip les',
          ),
          297 => 
          array (
            'kode' => '27.43',
            'deskripsi_panjang' => 'Other excision of lesion or tissue of lip',
            'deskripsi_pendek' => 'Excision of lip les NEC',
          ),
          298 => 
          array (
            'kode' => '27.49',
            'deskripsi_panjang' => 'Other excision of mouth',
            'deskripsi_pendek' => 'Excision of mouth NEC',
          ),
          299 => 
          array (
            'kode' => '27.51',
            'deskripsi_panjang' => 'Suture of laceration of lip',
            'deskripsi_pendek' => 'Suture of lip laceration',
          ),
          300 => 
          array (
            'kode' => '27.52',
            'deskripsi_panjang' => 'Suture of laceration of other part of mouth',
            'deskripsi_pendek' => 'Suture of mouth lac NEC',
          ),
          301 => 
          array (
            'kode' => '27.53',
            'deskripsi_panjang' => 'Closure of fistula of mouth',
            'deskripsi_pendek' => 'Closure of mouth fistula',
          ),
          302 => 
          array (
            'kode' => '27.54',
            'deskripsi_panjang' => 'Repair of cleft lip',
            'deskripsi_pendek' => 'Repair of cleft lip',
          ),
          303 => 
          array (
            'kode' => '27.55',
            'deskripsi_panjang' => 'Full-thickness skin graft to lip and mouth',
            'deskripsi_pendek' => 'Full-thick grft to mouth',
          ),
          304 => 
          array (
            'kode' => '27.56',
            'deskripsi_panjang' => 'Other skin graft to lip and mouth',
            'deskripsi_pendek' => 'Skin graft to mouth NEC',
          ),
          305 => 
          array (
            'kode' => '27.57',
            'deskripsi_panjang' => 'Attachment of pedicle or flap graft to lip and mouth',
            'deskripsi_pendek' => 'Pedicle attach to mouth',
          ),
          306 => 
          array (
            'kode' => '27.59',
            'deskripsi_panjang' => 'Other plastic repair of mouth',
            'deskripsi_pendek' => 'Mouth repair NEC',
          ),
          307 => 
          array (
            'kode' => '27.61',
            'deskripsi_panjang' => 'Suture of laceration of palate',
            'deskripsi_pendek' => 'Suture of palate lacerat',
          ),
          308 => 
          array (
            'kode' => '27.62',
            'deskripsi_panjang' => 'Correction of cleft palate',
            'deskripsi_pendek' => 'Cleft palate correction',
          ),
          309 => 
          array (
            'kode' => '27.63',
            'deskripsi_panjang' => 'Revision of cleft palate repair',
            'deskripsi_pendek' => 'Revis cleft palat repair',
          ),
          310 => 
          array (
            'kode' => '27.64',
            'deskripsi_panjang' => 'Insertion of palatal implant',
            'deskripsi_pendek' => 'Insert palatal implant',
          ),
          311 => 
          array (
            'kode' => '27.69',
            'deskripsi_panjang' => 'Other plastic repair of palate',
            'deskripsi_pendek' => 'Oth plastic repair palat',
          ),
          312 => 
          array (
            'kode' => '27.71',
            'deskripsi_panjang' => 'Incision of uvula',
            'deskripsi_pendek' => 'Incision of uvula',
          ),
          313 => 
          array (
            'kode' => '27.72',
            'deskripsi_panjang' => 'Excision of uvula',
            'deskripsi_pendek' => 'Excision of uvula',
          ),
          314 => 
          array (
            'kode' => '27.73',
            'deskripsi_panjang' => 'Repair of uvula',
            'deskripsi_pendek' => 'Repair of uvula',
          ),
          315 => 
          array (
            'kode' => '27.79',
            'deskripsi_panjang' => 'Other operations on uvula',
            'deskripsi_pendek' => 'Other uvula operations',
          ),
          316 => 
          array (
            'kode' => '27.91',
            'deskripsi_panjang' => 'Labial frenotomy',
            'deskripsi_pendek' => 'Labial frenotomy',
          ),
          317 => 
          array (
            'kode' => '27.92',
            'deskripsi_panjang' => 'Incision of mouth, unspecified structure',
            'deskripsi_pendek' => 'Mouth incision NOS',
          ),
          318 => 
          array (
            'kode' => '27.99',
            'deskripsi_panjang' => 'Other operations on oral cavity',
            'deskripsi_pendek' => 'Oral cavity ops NEC',
          ),
          319 => 
          array (
            'kode' => '28.0',
            'deskripsi_panjang' => 'Incision and drainage of tonsil and peritonsillar structures',
            'deskripsi_pendek' => 'Peritonsillar i & d',
          ),
          320 => 
          array (
            'kode' => '28.11',
            'deskripsi_panjang' => 'Biopsy of tonsils and adenoids',
            'deskripsi_pendek' => 'Tonsil&adenoid biopsy',
          ),
          321 => 
          array (
            'kode' => '28.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on tonsils and adenoids',
            'deskripsi_pendek' => 'Tonsil&adenoid dx op NEC',
          ),
          322 => 
          array (
            'kode' => '28.2',
            'deskripsi_panjang' => 'Tonsillectomy without adenoidectomy',
            'deskripsi_pendek' => 'Tonsillectomy',
          ),
          323 => 
          array (
            'kode' => '28.3',
            'deskripsi_panjang' => 'Tonsillectomy with adenoidectomy',
            'deskripsi_pendek' => 'Tonsillectomy/adenoidec',
          ),
          324 => 
          array (
            'kode' => '28.4',
            'deskripsi_panjang' => 'Excision of tonsil tag',
            'deskripsi_pendek' => 'Excision of tonsil tag',
          ),
          325 => 
          array (
            'kode' => '28.5',
            'deskripsi_panjang' => 'Excision of lingual tonsil',
            'deskripsi_pendek' => 'Excision lingual tonsil',
          ),
          326 => 
          array (
            'kode' => '28.6',
            'deskripsi_panjang' => 'Adenoidectomy without tonsillectomy',
            'deskripsi_pendek' => 'Adenoidectomy',
          ),
          327 => 
          array (
            'kode' => '28.7',
            'deskripsi_panjang' => 'Control of hemorrhage after tonsillectomy and adenoidectomy',
            'deskripsi_pendek' => 'Hemorr contrl post T & A',
          ),
          328 => 
          array (
            'kode' => '28.91',
            'deskripsi_panjang' => 'Removal of foreign body from tonsil and adenoid by incision',
            'deskripsi_pendek' => 'Incis to remov tonsil FB',
          ),
          329 => 
          array (
            'kode' => '28.92',
            'deskripsi_panjang' => 'Excision of lesion of tonsil and adenoid',
            'deskripsi_pendek' => 'Excis tonsil/adenoid les',
          ),
          330 => 
          array (
            'kode' => '28.99',
            'deskripsi_panjang' => 'Other operations on tonsils and adenoids',
            'deskripsi_pendek' => 'Tonsil/adenoid ops NEC',
          ),
          331 => 
          array (
            'kode' => '29.0',
            'deskripsi_panjang' => 'Pharyngotomy',
            'deskripsi_pendek' => 'Pharyngotomy',
          ),
          332 => 
          array (
            'kode' => '29.11',
            'deskripsi_panjang' => 'Pharyngoscopy',
            'deskripsi_pendek' => 'Pharyngoscopy',
          ),
          333 => 
          array (
            'kode' => '29.12',
            'deskripsi_panjang' => 'Pharyngeal biopsy',
            'deskripsi_pendek' => 'Pharyngeal biopsy',
          ),
          334 => 
          array (
            'kode' => '29.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on pharynx',
            'deskripsi_pendek' => 'Pharyngeal dx proc NEC',
          ),
          335 => 
          array (
            'kode' => '29.2',
            'deskripsi_panjang' => 'Excision of branchial cleft cyst or vestige',
            'deskripsi_pendek' => 'Exc branchial cleft cyst',
          ),
          336 => 
          array (
            'kode' => '29.31',
            'deskripsi_panjang' => 'Cricopharyngeal myotomy',
            'deskripsi_pendek' => 'Cricopharyngeal myotomy',
          ),
          337 => 
          array (
            'kode' => '29.32',
            'deskripsi_panjang' => 'Pharyngeal diverticulectomy',
            'deskripsi_pendek' => 'Pharyngeal diverticulec',
          ),
          338 => 
          array (
            'kode' => '29.33',
            'deskripsi_panjang' => 'Pharyngectomy (partial)',
            'deskripsi_pendek' => 'Pharyngectomy',
          ),
          339 => 
          array (
            'kode' => '29.39',
            'deskripsi_panjang' => 'Other excision or destruction of lesion or tissue of pharynx',
            'deskripsi_pendek' => 'Excis/destr les phar NEC',
          ),
          340 => 
          array (
            'kode' => '29.4',
            'deskripsi_panjang' => 'Plastic operation on pharynx',
            'deskripsi_pendek' => 'Plastic op on pharynx',
          ),
          341 => 
          array (
            'kode' => '29.51',
            'deskripsi_panjang' => 'Suture of laceration of pharynx',
            'deskripsi_pendek' => 'Suture of pharyngeal lac',
          ),
          342 => 
          array (
            'kode' => '29.52',
            'deskripsi_panjang' => 'Closure of branchial cleft fistula',
            'deskripsi_pendek' => 'Clos branch cleft fistul',
          ),
          343 => 
          array (
            'kode' => '29.53',
            'deskripsi_panjang' => 'Closure of other fistula of pharynx',
            'deskripsi_pendek' => 'Clos pharynx fistula NEC',
          ),
          344 => 
          array (
            'kode' => '29.54',
            'deskripsi_panjang' => 'Lysis of pharyngeal adhesions',
            'deskripsi_pendek' => 'Lysis pharyngeal adhes',
          ),
          345 => 
          array (
            'kode' => '29.59',
            'deskripsi_panjang' => 'Other repair of pharynx',
            'deskripsi_pendek' => 'Pharyngeal repair NEC',
          ),
          346 => 
          array (
            'kode' => '29.91',
            'deskripsi_panjang' => 'Dilation of pharynx',
            'deskripsi_pendek' => 'Pharyngeal dilation',
          ),
          347 => 
          array (
            'kode' => '29.92',
            'deskripsi_panjang' => 'Division of glossopharyngeal nerve',
            'deskripsi_pendek' => 'Divis glossopharyng nerv',
          ),
          348 => 
          array (
            'kode' => '29.99',
            'deskripsi_panjang' => 'Other operations on pharynx',
            'deskripsi_pendek' => 'Pharyngeal operation NEC',
          ),
          349 => 
          array (
            'kode' => '30.01',
            'deskripsi_panjang' => 'Marsupialization of laryngeal cyst',
            'deskripsi_pendek' => 'Larynx cyst marsupializ',
          ),
          350 => 
          array (
            'kode' => '30.09',
            'deskripsi_panjang' => 'Other excision or destruction of lesion or tissue of larynx',
            'deskripsi_pendek' => 'Destruct larynx les NEC',
          ),
          351 => 
          array (
            'kode' => '30.1',
            'deskripsi_panjang' => 'Hemilaryngectomy',
            'deskripsi_pendek' => 'Hemilaryngectomy',
          ),
          352 => 
          array (
            'kode' => '30.21',
            'deskripsi_panjang' => 'Epiglottidectomy',
            'deskripsi_pendek' => 'Epiglottidectomy',
          ),
          353 => 
          array (
            'kode' => '30.22',
            'deskripsi_panjang' => 'Vocal cordectomy',
            'deskripsi_pendek' => 'Vocal cordectomy',
          ),
          354 => 
          array (
            'kode' => '30.29',
            'deskripsi_panjang' => 'Other partial laryngectomy',
            'deskripsi_pendek' => 'Other part laryngectomy',
          ),
          355 => 
          array (
            'kode' => '30.3',
            'deskripsi_panjang' => 'Complete laryngectomy',
            'deskripsi_pendek' => 'Complete laryngectomy',
          ),
          356 => 
          array (
            'kode' => '30.4',
            'deskripsi_panjang' => 'Radical laryngectomy',
            'deskripsi_pendek' => 'Radical laryngectomy',
          ),
          357 => 
          array (
            'kode' => '31.0',
            'deskripsi_panjang' => 'Injection of larynx',
            'deskripsi_pendek' => 'Injection of larynx',
          ),
          358 => 
          array (
            'kode' => '31.1',
            'deskripsi_panjang' => 'Temporary tracheostomy',
            'deskripsi_pendek' => 'Temporary tracheostomy',
          ),
          359 => 
          array (
            'kode' => '31.21',
            'deskripsi_panjang' => 'Mediastinal tracheostomy',
            'deskripsi_pendek' => 'Mediastinal tracheostomy',
          ),
          360 => 
          array (
            'kode' => '31.29',
            'deskripsi_panjang' => 'Other permanent tracheostomy',
            'deskripsi_pendek' => 'Other perm tracheostomy',
          ),
          361 => 
          array (
            'kode' => '31.3',
            'deskripsi_panjang' => 'Other incision of larynx or trachea',
            'deskripsi_pendek' => 'Incis larynx trachea NEC',
          ),
          362 => 
          array (
            'kode' => '31.41',
            'deskripsi_panjang' => 'Tracheoscopy through artificial stoma',
            'deskripsi_pendek' => 'Tracheoscopy thru stoma',
          ),
          363 => 
          array (
            'kode' => '31.42',
            'deskripsi_panjang' => 'Laryngoscopy and other tracheoscopy',
            'deskripsi_pendek' => 'Larygnoscopy/tracheoscop',
          ),
          364 => 
          array (
            'kode' => '31.43',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of larynx',
            'deskripsi_pendek' => 'Closed biopsy larynx',
          ),
          365 => 
          array (
            'kode' => '31.44',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of trachea',
            'deskripsi_pendek' => 'Closed biopsy trachea',
          ),
          366 => 
          array (
            'kode' => '31.45',
            'deskripsi_panjang' => 'Open biopsy of larynx or trachea',
            'deskripsi_pendek' => 'Opn bx larynx or trachea',
          ),
          367 => 
          array (
            'kode' => '31.48',
            'deskripsi_panjang' => 'Other diagnostic procedures on larynx',
            'deskripsi_pendek' => 'Oth larynx dx procedure',
          ),
          368 => 
          array (
            'kode' => '31.49',
            'deskripsi_panjang' => 'Other diagnostic procedures on trachea',
            'deskripsi_pendek' => 'Oth trachea dx procedure',
          ),
          369 => 
          array (
            'kode' => '31.5',
            'deskripsi_panjang' => 'Local excision or destruction of lesion or tissue of trachea',
            'deskripsi_pendek' => 'Local destruc trach les',
          ),
          370 => 
          array (
            'kode' => '31.61',
            'deskripsi_panjang' => 'Suture of laceration of larynx',
            'deskripsi_pendek' => 'Suture of laryngeal lac',
          ),
          371 => 
          array (
            'kode' => '31.62',
            'deskripsi_panjang' => 'Closure of fistula of larynx',
            'deskripsi_pendek' => 'Laryngeal fistula clos',
          ),
          372 => 
          array (
            'kode' => '31.63',
            'deskripsi_panjang' => 'Revision of laryngostomy',
            'deskripsi_pendek' => 'Laryngostomy revision',
          ),
          373 => 
          array (
            'kode' => '31.64',
            'deskripsi_panjang' => 'Repair of laryngeal fracture',
            'deskripsi_pendek' => 'Laryngeal fx repair',
          ),
          374 => 
          array (
            'kode' => '31.69',
            'deskripsi_panjang' => 'Other repair of larynx',
            'deskripsi_pendek' => 'Other laryngeal repair',
          ),
          375 => 
          array (
            'kode' => '31.71',
            'deskripsi_panjang' => 'Suture of laceration of trachea',
            'deskripsi_pendek' => 'Suture of tracheal lacer',
          ),
          376 => 
          array (
            'kode' => '31.72',
            'deskripsi_panjang' => 'Closure of external fistula of trachea',
            'deskripsi_pendek' => 'Closure of tracheostomy',
          ),
          377 => 
          array (
            'kode' => '31.73',
            'deskripsi_panjang' => 'Closure of other fistula of trachea',
            'deskripsi_pendek' => 'Trachea fistula clos NEC',
          ),
          378 => 
          array (
            'kode' => '31.74',
            'deskripsi_panjang' => 'Revision of tracheostomy',
            'deskripsi_pendek' => 'Revision of tracheostomy',
          ),
          379 => 
          array (
            'kode' => '31.75',
            'deskripsi_panjang' => 'Reconstruction of trachea and construction of artificial larynx',
            'deskripsi_pendek' => 'Tracheal reconstruction',
          ),
          380 => 
          array (
            'kode' => '31.79',
            'deskripsi_panjang' => 'Other repair and plastic operations on trachea',
            'deskripsi_pendek' => 'Other tracheal repair',
          ),
          381 => 
          array (
            'kode' => '31.91',
            'deskripsi_panjang' => 'Division of laryngeal nerve',
            'deskripsi_pendek' => 'Laryngeal nerv division',
          ),
          382 => 
          array (
            'kode' => '31.92',
            'deskripsi_panjang' => 'Lysis of adhesions of trachea or larynx',
            'deskripsi_pendek' => 'Lysis trach/larynx adhes',
          ),
          383 => 
          array (
            'kode' => '31.93',
            'deskripsi_panjang' => 'Replacement of laryngeal or tracheal stent',
            'deskripsi_pendek' => 'Replace trac/laryn stent',
          ),
          384 => 
          array (
            'kode' => '31.94',
            'deskripsi_panjang' => 'Injection of locally-acting therapeutic substance into trachea',
            'deskripsi_pendek' => 'Tracheal injection',
          ),
          385 => 
          array (
            'kode' => '31.95',
            'deskripsi_panjang' => 'Tracheoesophageal fistulization',
            'deskripsi_pendek' => 'Tracheoesoph fistulizat',
          ),
          386 => 
          array (
            'kode' => '31.98',
            'deskripsi_panjang' => 'Other operations on larynx',
            'deskripsi_pendek' => 'Oth laryngeal operation',
          ),
          387 => 
          array (
            'kode' => '31.99',
            'deskripsi_panjang' => 'Other operations on trachea',
            'deskripsi_pendek' => 'Other tracheal operation',
          ),
          388 => 
          array (
            'kode' => '32.01',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion or tissue of bronchus',
            'deskripsi_pendek' => 'Endosc destruc bronc les',
          ),
          389 => 
          array (
            'kode' => '32.09',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion or tissue of bronchus',
            'deskripsi_pendek' => 'Other destruc bronc les',
          ),
          390 => 
          array (
            'kode' => '32.1',
            'deskripsi_panjang' => 'Other excision of bronchus',
            'deskripsi_pendek' => 'Other bronchial excision',
          ),
          391 => 
          array (
            'kode' => '32.20',
            'deskripsi_panjang' => 'Thoracoscopic excision of lesion or tissue of lung',
            'deskripsi_pendek' => 'Thorac exc lung lesion',
          ),
          392 => 
          array (
            'kode' => '32.21',
            'deskripsi_panjang' => 'Plication of emphysematous bleb',
            'deskripsi_pendek' => 'Emphysema bleb plication',
          ),
          393 => 
          array (
            'kode' => '32.22',
            'deskripsi_panjang' => 'Lung volume reduction surgery',
            'deskripsi_pendek' => 'Lung vol reduction surg',
          ),
          394 => 
          array (
            'kode' => '32.23',
            'deskripsi_panjang' => 'Open ablation of lung lesion or tissue',
            'deskripsi_pendek' => 'Open abltn lung les/tiss',
          ),
          395 => 
          array (
            'kode' => '32.24',
            'deskripsi_panjang' => 'Percutaneous ablation of lung lesion or tissue',
            'deskripsi_pendek' => 'Perc abltn lung les/tiss',
          ),
          396 => 
          array (
            'kode' => '32.25',
            'deskripsi_panjang' => 'Thoracoscopic ablation of lung lesion or tissue',
            'deskripsi_pendek' => 'Thor abltn lung les/tiss',
          ),
          397 => 
          array (
            'kode' => '32.26',
            'deskripsi_panjang' => 'Other and unspecified ablation of lung lesion or tissue',
            'deskripsi_pendek' => 'Abltn lung tiss NEC/NOS',
          ),
          398 => 
          array (
            'kode' => '32.27',
            'deskripsi_panjang' => 'Bronchoscopic bronchial thermoplasty, ablation of airway smooth muscle',
            'deskripsi_pendek' => 'Brnc thrmplsty,ablt mscl',
          ),
          399 => 
          array (
            'kode' => '32.28',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion or tissue of lung',
            'deskripsi_pendek' => 'Endosc destruc lung les',
          ),
          400 => 
          array (
            'kode' => '32.29',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion or tissue of lung',
            'deskripsi_pendek' => 'Destroy loc lung les NEC',
          ),
          401 => 
          array (
            'kode' => '32.30',
            'deskripsi_panjang' => 'Thoracoscopic segmental resection of lung',
            'deskripsi_pendek' => 'Thorac seg lung resect',
          ),
          402 => 
          array (
            'kode' => '32.39',
            'deskripsi_panjang' => 'Other and unspecified segmental resection of lung',
            'deskripsi_pendek' => 'Oth seg lung resect NOS',
          ),
          403 => 
          array (
            'kode' => '32.41',
            'deskripsi_panjang' => 'Thoracoscopic lobectomy of lung',
            'deskripsi_pendek' => 'Thorac lobectomy lung',
          ),
          404 => 
          array (
            'kode' => '32.49',
            'deskripsi_panjang' => 'Other lobectomy of lung',
            'deskripsi_pendek' => 'Lobectomy of lung NEC',
          ),
          405 => 
          array (
            'kode' => '32.50',
            'deskripsi_panjang' => 'Thoracoscopic pneumonectomy',
            'deskripsi_pendek' => 'Thoracospc pneumonectomy',
          ),
          406 => 
          array (
            'kode' => '32.59',
            'deskripsi_panjang' => 'Other and unspecified pneumonectomy',
            'deskripsi_pendek' => 'Other pneumonectomy NOS',
          ),
          407 => 
          array (
            'kode' => '32.6',
            'deskripsi_panjang' => 'Radical dissection of thoracic structures',
            'deskripsi_pendek' => 'Rad dissec thorac struct',
          ),
          408 => 
          array (
            'kode' => '32.9',
            'deskripsi_panjang' => 'Other excision of lung',
            'deskripsi_pendek' => 'Other excision of lung',
          ),
          409 => 
          array (
            'kode' => '33.0',
            'deskripsi_panjang' => 'Incision of bronchus',
            'deskripsi_pendek' => 'Incision of bronchus',
          ),
          410 => 
          array (
            'kode' => '33.1',
            'deskripsi_panjang' => 'Incision of lung',
            'deskripsi_pendek' => 'Incision of lung',
          ),
          411 => 
          array (
            'kode' => '33.20',
            'deskripsi_panjang' => 'Thoracoscopic lung biopsy',
            'deskripsi_pendek' => 'Thoracoscopc lung biopsy',
          ),
          412 => 
          array (
            'kode' => '33.21',
            'deskripsi_panjang' => 'Bronchoscopy through artificial stoma',
            'deskripsi_pendek' => 'Bronchoscopy thru stoma',
          ),
          413 => 
          array (
            'kode' => '33.22',
            'deskripsi_panjang' => 'Fiber-optic bronchoscopy',
            'deskripsi_pendek' => 'Fiber-optic bronchoscopy',
          ),
          414 => 
          array (
            'kode' => '33.23',
            'deskripsi_panjang' => 'Other bronchoscopy',
            'deskripsi_pendek' => 'Other bronchoscopy',
          ),
          415 => 
          array (
            'kode' => '33.24',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of bronchus',
            'deskripsi_pendek' => 'Closed bronchial biopsy',
          ),
          416 => 
          array (
            'kode' => '33.25',
            'deskripsi_panjang' => 'Open biopsy of bronchus',
            'deskripsi_pendek' => 'Open bronchial biopsy',
          ),
          417 => 
          array (
            'kode' => '33.26',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of lung',
            'deskripsi_pendek' => 'Closed lung biopsy',
          ),
          418 => 
          array (
            'kode' => '33.27',
            'deskripsi_panjang' => 'Closed endoscopic biopsy of lung',
            'deskripsi_pendek' => 'Clos endoscopic lung bx',
          ),
          419 => 
          array (
            'kode' => '33.28',
            'deskripsi_panjang' => 'Open biopsy of lung',
            'deskripsi_pendek' => 'Open lung biopsy',
          ),
          420 => 
          array (
            'kode' => '33.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on lung or bronchus',
            'deskripsi_pendek' => 'Bronch/lung dx proc NEC',
          ),
          421 => 
          array (
            'kode' => '33.31',
            'deskripsi_panjang' => 'Destruction of phrenic nerve for collapse of lung',
            'deskripsi_pendek' => 'Destr phren-lung collaps',
          ),
          422 => 
          array (
            'kode' => '33.32',
            'deskripsi_panjang' => 'Artificial pneumothorax for collapse of lung',
            'deskripsi_pendek' => 'Pnemothorax-lung collaps',
          ),
          423 => 
          array (
            'kode' => '33.33',
            'deskripsi_panjang' => 'Pneumoperitoneum for collapse of lung',
            'deskripsi_pendek' => 'Pneumoperit-lung collaps',
          ),
          424 => 
          array (
            'kode' => '33.34',
            'deskripsi_panjang' => 'Thoracoplasty',
            'deskripsi_pendek' => 'Thoracoplasty',
          ),
          425 => 
          array (
            'kode' => '33.39',
            'deskripsi_panjang' => 'Other surgical collapse of lung',
            'deskripsi_pendek' => 'Surg collaps of lung NEC',
          ),
          426 => 
          array (
            'kode' => '33.41',
            'deskripsi_panjang' => 'Suture of laceration of bronchus',
            'deskripsi_pendek' => 'Bronchial lacerat suture',
          ),
          427 => 
          array (
            'kode' => '33.42',
            'deskripsi_panjang' => 'Closure of bronchial fistula',
            'deskripsi_pendek' => 'Bronchial fistula clos',
          ),
          428 => 
          array (
            'kode' => '33.43',
            'deskripsi_panjang' => 'Closure of laceration of lung',
            'deskripsi_pendek' => 'Lung laceration closure',
          ),
          429 => 
          array (
            'kode' => '33.48',
            'deskripsi_panjang' => 'Other repair and plastic operations on bronchus',
            'deskripsi_pendek' => 'Bronchial repair NEC',
          ),
          430 => 
          array (
            'kode' => '33.49',
            'deskripsi_panjang' => 'Other repair and plastic operations on lung',
            'deskripsi_pendek' => 'Lung repair NEC',
          ),
          431 => 
          array (
            'kode' => '33.50',
            'deskripsi_panjang' => 'Lung transplantation, not otherwise specified',
            'deskripsi_pendek' => 'Lung transplant NOS',
          ),
          432 => 
          array (
            'kode' => '33.51',
            'deskripsi_panjang' => 'Unilateral lung transplantation',
            'deskripsi_pendek' => 'Unilat lung transplant',
          ),
          433 => 
          array (
            'kode' => '33.52',
            'deskripsi_panjang' => 'Bilateral lung transplantation',
            'deskripsi_pendek' => 'Bilat lung transplant',
          ),
          434 => 
          array (
            'kode' => '33.6',
            'deskripsi_panjang' => 'Combined heart-lung transplantation',
            'deskripsi_pendek' => 'Comb heart/lung transpla',
          ),
          435 => 
          array (
            'kode' => '33.71',
            'deskripsi_panjang' => 'Endoscopic insertion or replacement of bronchial valve(s), single lobe',
            'deskripsi_pendek' => 'Endo ins/re bron val,one',
          ),
          436 => 
          array (
            'kode' => '33.72',
            'deskripsi_panjang' => 'Endoscopic pulmonary airway flow measurement',
            'deskripsi_pendek' => 'Endo pulm arwy flow msmt',
          ),
          437 => 
          array (
            'kode' => '33.73',
            'deskripsi_panjang' => 'Endoscopic insertion or replacement of bronchial valve(s), multiple lobes',
            'deskripsi_pendek' => 'Endo ins/re brnc val,mul',
          ),
          438 => 
          array (
            'kode' => '33.78',
            'deskripsi_panjang' => 'Endoscopic removal of bronchial device(s) or substances',
            'deskripsi_pendek' => 'Endo rem bronch devc/sub',
          ),
          439 => 
          array (
            'kode' => '33.79',
            'deskripsi_panjang' => 'Endoscopic insertion of other bronchial device or substances',
            'deskripsi_pendek' => 'Endo insrt bronc def/sub',
          ),
          440 => 
          array (
            'kode' => '33.91',
            'deskripsi_panjang' => 'Bronchial dilation',
            'deskripsi_pendek' => 'Bronchial dilation',
          ),
          441 => 
          array (
            'kode' => '33.92',
            'deskripsi_panjang' => 'Ligation of bronchus',
            'deskripsi_pendek' => 'Bronchial ligation',
          ),
          442 => 
          array (
            'kode' => '33.93',
            'deskripsi_panjang' => 'Puncture of lung',
            'deskripsi_pendek' => 'Puncture of lung',
          ),
          443 => 
          array (
            'kode' => '33.98',
            'deskripsi_panjang' => 'Other operations on bronchus',
            'deskripsi_pendek' => 'Bronchial operation NEC',
          ),
          444 => 
          array (
            'kode' => '33.99',
            'deskripsi_panjang' => 'Other operations on lung',
            'deskripsi_pendek' => 'Lung operation NEC',
          ),
          445 => 
          array (
            'kode' => '34.01',
            'deskripsi_panjang' => 'Incision of chest wall',
            'deskripsi_pendek' => 'Incision of chest wall',
          ),
          446 => 
          array (
            'kode' => '34.02',
            'deskripsi_panjang' => 'Exploratory thoracotomy',
            'deskripsi_pendek' => 'Exploratory thoracotomy',
          ),
          447 => 
          array (
            'kode' => '34.03',
            'deskripsi_panjang' => 'Reopening of recent thoracotomy site',
            'deskripsi_pendek' => 'Reopen thoracotomy site',
          ),
          448 => 
          array (
            'kode' => '34.04',
            'deskripsi_panjang' => 'Insertion of intercostal catheter for drainage',
            'deskripsi_pendek' => 'Insert intercostal cath',
          ),
          449 => 
          array (
            'kode' => '34.05',
            'deskripsi_panjang' => 'Creation of pleuroperitoneal shunt',
            'deskripsi_pendek' => 'PlEuroperitoneal shunt',
          ),
          450 => 
          array (
            'kode' => '34.06',
            'deskripsi_panjang' => 'Thoracoscopic drainage of pleural cavity',
            'deskripsi_pendek' => 'Thorac drain pleurl cav',
          ),
          451 => 
          array (
            'kode' => '34.09',
            'deskripsi_panjang' => 'Other incision of pleura',
            'deskripsi_pendek' => 'Other pleural incision',
          ),
          452 => 
          array (
            'kode' => '34.1',
            'deskripsi_panjang' => 'Incision of mediastinum',
            'deskripsi_pendek' => 'Incision of mediastinum',
          ),
          453 => 
          array (
            'kode' => '34.20',
            'deskripsi_panjang' => 'Thoracoscopic pleural biopsy',
            'deskripsi_pendek' => 'Thoracoscopic pleural bx',
          ),
          454 => 
          array (
            'kode' => '34.21',
            'deskripsi_panjang' => 'Transpleural thoracoscopy',
            'deskripsi_pendek' => 'Transpleura thoracoscopy',
          ),
          455 => 
          array (
            'kode' => '34.22',
            'deskripsi_panjang' => 'Mediastinoscopy',
            'deskripsi_pendek' => 'Mediastinoscopy',
          ),
          456 => 
          array (
            'kode' => '34.23',
            'deskripsi_panjang' => 'Biopsy of chest wall',
            'deskripsi_pendek' => 'Chest wall biopsy',
          ),
          457 => 
          array (
            'kode' => '34.24',
            'deskripsi_panjang' => 'Other pleural biopsy',
            'deskripsi_pendek' => 'Pleural biopsy NEC',
          ),
          458 => 
          array (
            'kode' => '34.25',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of mediastinum',
            'deskripsi_pendek' => 'Clos mediastinal biopsy',
          ),
          459 => 
          array (
            'kode' => '34.26',
            'deskripsi_panjang' => 'Open mediastinal biopsy',
            'deskripsi_pendek' => 'Open mediastinal biopsy',
          ),
          460 => 
          array (
            'kode' => '34.27',
            'deskripsi_panjang' => 'Biopsy of diaphragm',
            'deskripsi_pendek' => 'Biopsy of diaphragm',
          ),
          461 => 
          array (
            'kode' => '34.28',
            'deskripsi_panjang' => 'Other diagnostic procedures on chest wall, pleura, and diaphragm',
            'deskripsi_pendek' => 'Dx procedure thorax NEC',
          ),
          462 => 
          array (
            'kode' => '34.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on mediastinum',
            'deskripsi_pendek' => 'Dx proc mediastinum NEC',
          ),
          463 => 
          array (
            'kode' => '34.3',
            'deskripsi_panjang' => 'Excision or destruction of lesion or tissue of mediastinum',
            'deskripsi_pendek' => 'Destruct mediastin les',
          ),
          464 => 
          array (
            'kode' => '34.4',
            'deskripsi_panjang' => 'Excision or destruction of lesion of chest wall',
            'deskripsi_pendek' => 'Destruct chest wall les',
          ),
          465 => 
          array (
            'kode' => '34.51',
            'deskripsi_panjang' => 'Decortication of lung',
            'deskripsi_pendek' => 'Decortication of lung',
          ),
          466 => 
          array (
            'kode' => '34.52',
            'deskripsi_panjang' => 'Thoracoscopic decortication of lung',
            'deskripsi_pendek' => 'Thoracoscopc decort lung',
          ),
          467 => 
          array (
            'kode' => '34.59',
            'deskripsi_panjang' => 'Other excision of pleura',
            'deskripsi_pendek' => 'Other pleural excision',
          ),
          468 => 
          array (
            'kode' => '34.6',
            'deskripsi_panjang' => 'Scarification of pleura',
            'deskripsi_pendek' => 'Scarification of pleura',
          ),
          469 => 
          array (
            'kode' => '34.71',
            'deskripsi_panjang' => 'Suture of laceration of chest wall',
            'deskripsi_pendek' => 'Suture chest wall lacer',
          ),
          470 => 
          array (
            'kode' => '34.72',
            'deskripsi_panjang' => 'Closure of thoracostomy',
            'deskripsi_pendek' => 'Thoracostomy closure',
          ),
          471 => 
          array (
            'kode' => '34.73',
            'deskripsi_panjang' => 'Closure of other fistula of thorax',
            'deskripsi_pendek' => 'Clos thoracic fistul NEC',
          ),
          472 => 
          array (
            'kode' => '34.74',
            'deskripsi_panjang' => 'Repair of pectus deformity',
            'deskripsi_pendek' => 'Pectus deformity repair',
          ),
          473 => 
          array (
            'kode' => '34.79',
            'deskripsi_panjang' => 'Other repair of chest wall',
            'deskripsi_pendek' => 'Other chest wall repair',
          ),
          474 => 
          array (
            'kode' => '34.81',
            'deskripsi_panjang' => 'Excision of lesion or tissue of diaphragm',
            'deskripsi_pendek' => 'Excise diaphragm lesion',
          ),
          475 => 
          array (
            'kode' => '34.82',
            'deskripsi_panjang' => 'Suture of laceration of diaphragm',
            'deskripsi_pendek' => 'Suture diaphragm lacerat',
          ),
          476 => 
          array (
            'kode' => '34.83',
            'deskripsi_panjang' => 'Closure of fistula of diaphragm',
            'deskripsi_pendek' => 'Close diaphragm fistula',
          ),
          477 => 
          array (
            'kode' => '34.84',
            'deskripsi_panjang' => 'Other repair of diaphragm',
            'deskripsi_pendek' => 'Other diaphragm repair',
          ),
          478 => 
          array (
            'kode' => '34.85',
            'deskripsi_panjang' => 'Implantation of diaphragmatic pacemaker',
            'deskripsi_pendek' => 'Implant diaphra pacemake',
          ),
          479 => 
          array (
            'kode' => '34.89',
            'deskripsi_panjang' => 'Other operations on diaphragm',
            'deskripsi_pendek' => 'Diaphragm operation NEC',
          ),
          480 => 
          array (
            'kode' => '34.91',
            'deskripsi_panjang' => 'Thoracentesis',
            'deskripsi_pendek' => 'Thoracentesis',
          ),
          481 => 
          array (
            'kode' => '34.92',
            'deskripsi_panjang' => 'Injection into thoracic cavity',
            'deskripsi_pendek' => 'Inject into thorax cavit',
          ),
          482 => 
          array (
            'kode' => '34.93',
            'deskripsi_panjang' => 'Repair of pleura',
            'deskripsi_pendek' => 'Repair of pleura',
          ),
          483 => 
          array (
            'kode' => '34.99',
            'deskripsi_panjang' => 'Other operations on thorax',
            'deskripsi_pendek' => 'Thoracic operation NEC',
          ),
          484 => 
          array (
            'kode' => '35.00',
            'deskripsi_panjang' => 'Closed heart valvotomy, unspecified valve',
            'deskripsi_pendek' => 'Closed valvotomy NOS',
          ),
          485 => 
          array (
            'kode' => '35.01',
            'deskripsi_panjang' => 'Closed heart valvotomy, aortic valve',
            'deskripsi_pendek' => 'Closed aortic valvotomy',
          ),
          486 => 
          array (
            'kode' => '35.02',
            'deskripsi_panjang' => 'Closed heart valvotomy, mitral valve',
            'deskripsi_pendek' => 'Closed mitral valvotomy',
          ),
          487 => 
          array (
            'kode' => '35.03',
            'deskripsi_panjang' => 'Closed heart valvotomy, pulmonary valve',
            'deskripsi_pendek' => 'Closed pulmon valvotomy',
          ),
          488 => 
          array (
            'kode' => '35.04',
            'deskripsi_panjang' => 'Closed heart valvotomy, tricuspid valve',
            'deskripsi_pendek' => 'Closed tricusp valvotomy',
          ),
          489 => 
          array (
            'kode' => '35.05',
            'deskripsi_panjang' => 'Endovascular replacement of aortic valve',
            'deskripsi_pendek' => 'Endovas repl aortc valve',
          ),
          490 => 
          array (
            'kode' => '35.06',
            'deskripsi_panjang' => 'Transapical replacement of aortic valve',
            'deskripsi_pendek' => 'Trnsapcl rep aortc valve',
          ),
          491 => 
          array (
            'kode' => '35.07',
            'deskripsi_panjang' => 'Endovascular replacement of pulmonary valve',
            'deskripsi_pendek' => 'Endovas repl pulm valve',
          ),
          492 => 
          array (
            'kode' => '35.08',
            'deskripsi_panjang' => 'Transapical replacement of pulmonary valve',
            'deskripsi_pendek' => 'Trnsapcl repl pulm valve',
          ),
          493 => 
          array (
            'kode' => '35.09',
            'deskripsi_panjang' => 'Endovascular replacement of unspecified heart valve',
            'deskripsi_pendek' => 'Endovas repl uns hrt vlv',
          ),
          494 => 
          array (
            'kode' => '35.10',
            'deskripsi_panjang' => 'Open heart valvuloplasty without replacement, unspecified valve',
            'deskripsi_pendek' => 'Open valvuloplasty NOS',
          ),
          495 => 
          array (
            'kode' => '35.11',
            'deskripsi_panjang' => 'Open heart valvuloplasty of aortic valve without replacement',
            'deskripsi_pendek' => 'Opn aortic valvuloplasty',
          ),
          496 => 
          array (
            'kode' => '35.12',
            'deskripsi_panjang' => 'Open heart valvuloplasty of mitral valve without replacement',
            'deskripsi_pendek' => 'Opn mitral valvuloplasty',
          ),
          497 => 
          array (
            'kode' => '35.13',
            'deskripsi_panjang' => 'Open heart valvuloplasty of pulmonary valve without replacement',
            'deskripsi_pendek' => 'Opn pulmon valvuloplasty',
          ),
          498 => 
          array (
            'kode' => '35.14',
            'deskripsi_panjang' => 'Open heart valvuloplasty of tricuspid valve without replacement',
            'deskripsi_pendek' => 'Opn tricus valvuloplasty',
          ),
          499 => 
          array (
            'kode' => '35.20',
            'deskripsi_panjang' => 'Open and other replacement of unspecified heart valve',
            'deskripsi_pendek' => 'Opn/oth rep hrt vlv NOS',
          ),
        ));
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '35.21',
            'deskripsi_panjang' => 'Open and other replacement of aortic valve with tissue graft',
            'deskripsi_pendek' => 'Opn/oth rep aort vlv-tis',
          ),
          1 => 
          array (
            'kode' => '35.22',
            'deskripsi_panjang' => 'Open and other replacement of aortic valve',
            'deskripsi_pendek' => 'Opn/oth rep aortic valve',
          ),
          2 => 
          array (
            'kode' => '35.23',
            'deskripsi_panjang' => 'Open and other replacement of mitral valve with tissue graft',
            'deskripsi_pendek' => 'Opn/oth rep mtrl vlv-tis',
          ),
          3 => 
          array (
            'kode' => '35.24',
            'deskripsi_panjang' => 'Open and other replacement of mitral valve',
            'deskripsi_pendek' => 'Opn/oth rep mitral valve',
          ),
          4 => 
          array (
            'kode' => '35.25',
            'deskripsi_panjang' => 'Open and other replacement of pulmonary valve with tissue graft',
            'deskripsi_pendek' => 'Opn/oth rep pulm vlv-tis',
          ),
          5 => 
          array (
            'kode' => '35.26',
            'deskripsi_panjang' => 'Open and other replacement of pulmonary valve',
            'deskripsi_pendek' => 'Opn/oth repl pul valve',
          ),
          6 => 
          array (
            'kode' => '35.27',
            'deskripsi_panjang' => 'Open and other replacement of tricuspid valve with tissue graft',
            'deskripsi_pendek' => 'Opn/oth rep tcspd vlv-ts',
          ),
          7 => 
          array (
            'kode' => '35.28',
            'deskripsi_panjang' => 'Open and other replacement of tricuspid valve',
            'deskripsi_pendek' => 'Opn/oth repl tcspd valve',
          ),
          8 => 
          array (
            'kode' => '35.31',
            'deskripsi_panjang' => 'Operations on papillary muscle',
            'deskripsi_pendek' => 'Papillary muscle ops',
          ),
          9 => 
          array (
            'kode' => '35.32',
            'deskripsi_panjang' => 'Operations on chordae tendineae',
            'deskripsi_pendek' => 'Chordae tendineae ops',
          ),
          10 => 
          array (
            'kode' => '35.33',
            'deskripsi_panjang' => 'Annuloplasty',
            'deskripsi_pendek' => 'Annuloplasty',
          ),
          11 => 
          array (
            'kode' => '35.34',
            'deskripsi_panjang' => 'Infundibulectomy',
            'deskripsi_pendek' => 'Infundibulectomy',
          ),
          12 => 
          array (
            'kode' => '35.35',
            'deskripsi_panjang' => 'Operations on trabeculae carneae cordis',
            'deskripsi_pendek' => 'Trabecul carneae cord op',
          ),
          13 => 
          array (
            'kode' => '35.39',
            'deskripsi_panjang' => 'Operations on other structures adjacent to valves of heart',
            'deskripsi_pendek' => 'Tiss adj to valv ops NEC',
          ),
          14 => 
          array (
            'kode' => '35.41',
            'deskripsi_panjang' => 'Enlargement of existing atrial septal defect',
            'deskripsi_pendek' => 'Enlarge existing sep def',
          ),
          15 => 
          array (
            'kode' => '35.42',
            'deskripsi_panjang' => 'Creation of septal defect in heart',
            'deskripsi_pendek' => 'Create septal defect',
          ),
          16 => 
          array (
            'kode' => '35.50',
            'deskripsi_panjang' => 'Repair of unspecified septal defect of heart with prosthesis',
            'deskripsi_pendek' => 'Prosth rep hrt septa NOS',
          ),
          17 => 
          array (
            'kode' => '35.51',
            'deskripsi_panjang' => 'Repair of atrial septal defect with prosthesis, open technique',
            'deskripsi_pendek' => 'Pros rep atrial def-opn',
          ),
          18 => 
          array (
            'kode' => '35.52',
            'deskripsi_panjang' => 'Repair of atrial septal defect with prosthesis, closed technique',
            'deskripsi_pendek' => 'Pros repair atria def-cl',
          ),
          19 => 
          array (
            'kode' => '35.53',
            'deskripsi_panjang' => 'Repair of ventricular septal defect with prosthesis, open technique',
            'deskripsi_pendek' => 'Pros rep ventric def-opn',
          ),
          20 => 
          array (
            'kode' => '35.54',
            'deskripsi_panjang' => 'Repair of endocardial cushion defect with prosthesis',
            'deskripsi_pendek' => 'Pros rep endocar cushion',
          ),
          21 => 
          array (
            'kode' => '35.55',
            'deskripsi_panjang' => 'Repair of ventricular septal defect with prosthesis, closed technique',
            'deskripsi_pendek' => 'Pros rep ventrc def-clos',
          ),
          22 => 
          array (
            'kode' => '35.60',
            'deskripsi_panjang' => 'Repair of unspecified septal defect of heart with tissue graft',
            'deskripsi_pendek' => 'Grft repair hrt sept NOS',
          ),
          23 => 
          array (
            'kode' => '35.61',
            'deskripsi_panjang' => 'Repair of atrial septal defect with tissue graft',
            'deskripsi_pendek' => 'Graft repair atrial def',
          ),
          24 => 
          array (
            'kode' => '35.62',
            'deskripsi_panjang' => 'Repair of ventricular septal defect with tissue graft',
            'deskripsi_pendek' => 'Graft repair ventric def',
          ),
          25 => 
          array (
            'kode' => '35.63',
            'deskripsi_panjang' => 'Repair of endocardial cushion defect with tissue graft',
            'deskripsi_pendek' => 'Grft rep endocar cushion',
          ),
          26 => 
          array (
            'kode' => '35.70',
            'deskripsi_panjang' => 'Other and unspecified repair of unspecified septal defect of heart',
            'deskripsi_pendek' => 'Heart septa repair NOS',
          ),
          27 => 
          array (
            'kode' => '35.71',
            'deskripsi_panjang' => 'Other and unspecified repair of atrial septal defect',
            'deskripsi_pendek' => 'Atria septa def rep NEC',
          ),
          28 => 
          array (
            'kode' => '35.72',
            'deskripsi_panjang' => 'Other and unspecified repair of ventricular septal defect',
            'deskripsi_pendek' => 'Ventr septa def rep NEC',
          ),
          29 => 
          array (
            'kode' => '35.73',
            'deskripsi_panjang' => 'Other and unspecified repair of endocardial cushion defect',
            'deskripsi_pendek' => 'Endocar cushion rep NEC',
          ),
          30 => 
          array (
            'kode' => '35.81',
            'deskripsi_panjang' => 'Total repair of tetralogy of fallot',
            'deskripsi_pendek' => 'Tot repair tetral fallot',
          ),
          31 => 
          array (
            'kode' => '35.82',
            'deskripsi_panjang' => 'Total repair of total anomalous pulmonary venous connection',
            'deskripsi_pendek' => 'Total repair of tapvc',
          ),
          32 => 
          array (
            'kode' => '35.83',
            'deskripsi_panjang' => 'Total repair of truncus arteriosus',
            'deskripsi_pendek' => 'Tot rep truncus arterios',
          ),
          33 => 
          array (
            'kode' => '35.84',
            'deskripsi_panjang' => 'Total correction of transposition of great vessels, not elsewhere classified',
            'deskripsi_pendek' => 'Tot cor transpos grt ves',
          ),
          34 => 
          array (
            'kode' => '35.91',
            'deskripsi_panjang' => 'Interatrial transposition of venous return',
            'deskripsi_pendek' => 'Interat ven retrn transp',
          ),
          35 => 
          array (
            'kode' => '35.92',
            'deskripsi_panjang' => 'Creation of conduit between right ventricle and pulmonary artery',
            'deskripsi_pendek' => 'Conduit rt vent-pul art',
          ),
          36 => 
          array (
            'kode' => '35.93',
            'deskripsi_panjang' => 'Creation of conduit between left ventricle and aorta',
            'deskripsi_pendek' => 'Conduit left ventr-aorta',
          ),
          37 => 
          array (
            'kode' => '35.94',
            'deskripsi_panjang' => 'Creation of conduit between atrium and pulmonary artery',
            'deskripsi_pendek' => 'Conduit artium-pulm art',
          ),
          38 => 
          array (
            'kode' => '35.95',
            'deskripsi_panjang' => 'Revision of corrective procedure on heart',
            'deskripsi_pendek' => 'Heart repair revision',
          ),
          39 => 
          array (
            'kode' => '35.96',
            'deskripsi_panjang' => 'Percutaneous balloon valvuloplasty',
            'deskripsi_pendek' => 'Perc balloon valvuplasty',
          ),
          40 => 
          array (
            'kode' => '35.97',
            'deskripsi_panjang' => 'Percutaneous mitral valve repair with implant',
            'deskripsi_pendek' => 'Perc mtrl vlv repr w imp',
          ),
          41 => 
          array (
            'kode' => '35.98',
            'deskripsi_panjang' => 'Other operations on septa of heart',
            'deskripsi_pendek' => 'Other heart septa ops',
          ),
          42 => 
          array (
            'kode' => '35.99',
            'deskripsi_panjang' => 'Other operations on valves of heart',
            'deskripsi_pendek' => 'Other heart valve ops',
          ),
          43 => 
          array (
            'kode' => '36.03',
            'deskripsi_panjang' => 'Open chest coronary artery angioplasty',
            'deskripsi_pendek' => 'Open coronry angioplasty',
          ),
          44 => 
          array (
            'kode' => '36.04',
            'deskripsi_panjang' => 'Intracoronary artery thrombolytic infusion',
            'deskripsi_pendek' => 'Intrcoronry thromb infus',
          ),
          45 => 
          array (
            'kode' => '36.06',
            'deskripsi_panjang' => 'Insertion of non-drug-eluting coronary artery stent(s)',
            'deskripsi_pendek' => 'Ins nondrug elut cor st',
          ),
          46 => 
          array (
            'kode' => '36.07',
            'deskripsi_panjang' => 'Insertion of drug-eluting coronary artery stent(s)',
            'deskripsi_pendek' => 'Ins drug-elut coronry st',
          ),
          47 => 
          array (
            'kode' => '36.09',
            'deskripsi_panjang' => 'Other removal of coronary artery obstruction',
            'deskripsi_pendek' => 'Rem of cor art obstr NEC',
          ),
          48 => 
          array (
            'kode' => '36.10',
            'deskripsi_panjang' => 'Aortocoronary bypass for heart revascularization, not otherwise specified',
            'deskripsi_pendek' => 'Aortocoronary bypass NOS',
          ),
          49 => 
          array (
            'kode' => '36.11',
            'deskripsi_panjang' => '(Aorto)coronary bypass of one coronary artery',
            'deskripsi_pendek' => 'Aortocor bypas-1 cor art',
          ),
          50 => 
          array (
            'kode' => '36.12',
            'deskripsi_panjang' => '(Aorto)coronary bypass of two coronary arteries',
            'deskripsi_pendek' => 'Aortocor bypas-2 cor art',
          ),
          51 => 
          array (
            'kode' => '36.13',
            'deskripsi_panjang' => '(Aorto)coronary bypass of three coronary arteries',
            'deskripsi_pendek' => 'Aortocor bypas-3 cor art',
          ),
          52 => 
          array (
            'kode' => '36.14',
            'deskripsi_panjang' => '(Aorto)coronary bypass of four or more coronary arteries',
            'deskripsi_pendek' => 'Aortcor bypas-4+ cor art',
          ),
          53 => 
          array (
            'kode' => '36.15',
            'deskripsi_panjang' => 'Single internal mammary-coronary artery bypass',
            'deskripsi_pendek' => '1 int mam-cor art bypass',
          ),
          54 => 
          array (
            'kode' => '36.16',
            'deskripsi_panjang' => 'Double internal mammary-coronary artery bypass',
            'deskripsi_pendek' => '2 int mam-cor art bypass',
          ),
          55 => 
          array (
            'kode' => '36.17',
            'deskripsi_panjang' => 'Abdominal-coronary artery bypass',
            'deskripsi_pendek' => 'Abd-coron artery bypass',
          ),
          56 => 
          array (
            'kode' => '36.19',
            'deskripsi_panjang' => 'Other bypass anastomosis for heart revascularization',
            'deskripsi_pendek' => 'Hrt revas byps anas NEC',
          ),
          57 => 
          array (
            'kode' => '36.2',
            'deskripsi_panjang' => 'Heart revascularization by arterial implant',
            'deskripsi_pendek' => 'Arterial implant revasc',
          ),
          58 => 
          array (
            'kode' => '36.31',
            'deskripsi_panjang' => 'Open chest transmyocardial revascularization',
            'deskripsi_pendek' => 'Open chest trans revasc',
          ),
          59 => 
          array (
            'kode' => '36.32',
            'deskripsi_panjang' => 'Other transmyocardial revascularization',
            'deskripsi_pendek' => 'Oth transmyo revascular',
          ),
          60 => 
          array (
            'kode' => '36.33',
            'deskripsi_panjang' => 'Endoscopic transmyocardial revascularization',
            'deskripsi_pendek' => 'Endo transmyo revascular',
          ),
          61 => 
          array (
            'kode' => '36.34',
            'deskripsi_panjang' => 'Percutaneous transmyocardial revascularization',
            'deskripsi_pendek' => 'Perc transmyo revascular',
          ),
          62 => 
          array (
            'kode' => '36.39',
            'deskripsi_panjang' => 'Other heart revascularization',
            'deskripsi_pendek' => 'Oth heart revascular',
          ),
          63 => 
          array (
            'kode' => '36.91',
            'deskripsi_panjang' => 'Repair of aneurysm of coronary vessel',
            'deskripsi_pendek' => 'Coron vess aneurysm rep',
          ),
          64 => 
          array (
            'kode' => '36.99',
            'deskripsi_panjang' => 'Other operations on vessels of heart',
            'deskripsi_pendek' => 'Heart vessel op NEC',
          ),
          65 => 
          array (
            'kode' => '37.0',
            'deskripsi_panjang' => 'Pericardiocentesis',
            'deskripsi_pendek' => 'Pericardiocentesis',
          ),
          66 => 
          array (
            'kode' => '37.10',
            'deskripsi_panjang' => 'Incision of heart, not otherwise specified',
            'deskripsi_pendek' => 'Incision of heart NOS',
          ),
          67 => 
          array (
            'kode' => '37.11',
            'deskripsi_panjang' => 'Cardiotomy',
            'deskripsi_pendek' => 'Cardiotomy',
          ),
          68 => 
          array (
            'kode' => '37.12',
            'deskripsi_panjang' => 'Pericardiotomy',
            'deskripsi_pendek' => 'Pericardiotomy',
          ),
          69 => 
          array (
            'kode' => '37.20',
            'deskripsi_panjang' => 'Noninvasive programmed electrical stimulation [NIPS]',
            'deskripsi_pendek' => 'Noninvas elect stimulatn',
          ),
          70 => 
          array (
            'kode' => '37.21',
            'deskripsi_panjang' => 'Right heart cardiac catheterization',
            'deskripsi_pendek' => 'Rt heart cardiac cath',
          ),
          71 => 
          array (
            'kode' => '37.22',
            'deskripsi_panjang' => 'Left heart cardiac catheterization',
            'deskripsi_pendek' => 'Left heart cardiac cath',
          ),
          72 => 
          array (
            'kode' => '37.23',
            'deskripsi_panjang' => 'Combined right and left heart cardiac catheterization',
            'deskripsi_pendek' => 'Rt/left heart card cath',
          ),
          73 => 
          array (
            'kode' => '37.24',
            'deskripsi_panjang' => 'Biopsy of pericardium',
            'deskripsi_pendek' => 'Pericardial biopsy',
          ),
          74 => 
          array (
            'kode' => '37.25',
            'deskripsi_panjang' => 'Biopsy of heart',
            'deskripsi_pendek' => 'Cardiac biopsy',
          ),
          75 => 
          array (
            'kode' => '37.26',
            'deskripsi_panjang' => 'Catheter based invasive electrophysiologic testing',
            'deskripsi_pendek' => 'Cath base invasv ep test',
          ),
          76 => 
          array (
            'kode' => '37.27',
            'deskripsi_panjang' => 'Cardiac mapping',
            'deskripsi_pendek' => 'Cardiac mapping',
          ),
          77 => 
          array (
            'kode' => '37.28',
            'deskripsi_panjang' => 'Intracardiac echocardiography',
            'deskripsi_pendek' => 'Intracardiac echocardio',
          ),
          78 => 
          array (
            'kode' => '37.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on heart and pericardium',
            'deskripsi_pendek' => 'Hrt/pericar dx proc NEC',
          ),
          79 => 
          array (
            'kode' => '37.31',
            'deskripsi_panjang' => 'Pericardiectomy',
            'deskripsi_pendek' => 'Pericardiectomy',
          ),
          80 => 
          array (
            'kode' => '37.32',
            'deskripsi_panjang' => 'Excision of aneurysm of heart',
            'deskripsi_pendek' => 'Heart aneurysm excision',
          ),
          81 => 
          array (
            'kode' => '37.33',
            'deskripsi_panjang' => 'Excision or destruction of other lesion or tissue of heart, open approach',
            'deskripsi_pendek' => 'Exc/dest hrt lesion open',
          ),
          82 => 
          array (
            'kode' => '37.34',
            'deskripsi_panjang' => 'Excision or destruction of other lesion or tissue of heart, endovascular approach',
            'deskripsi_pendek' => 'Exc/des hrt les,endovasc',
          ),
          83 => 
          array (
            'kode' => '37.35',
            'deskripsi_panjang' => 'Partial ventriculectomy',
            'deskripsi_pendek' => 'Partial ventriculectomy',
          ),
          84 => 
          array (
            'kode' => '37.36',
            'deskripsi_panjang' => 'Excision, destruction, or exclusion of left atrial appendage (LAA)',
            'deskripsi_pendek' => 'Exc,destrct,exclus LAA',
          ),
          85 => 
          array (
            'kode' => '37.37',
            'deskripsi_panjang' => 'Excision or destruction of other lesion or tissue of heart, thoracoscopic approach',
            'deskripsi_pendek' => 'Exc/dest hrt les, thrspc',
          ),
          86 => 
          array (
            'kode' => '37.41',
            'deskripsi_panjang' => 'Implantation of prosthetic cardiac support device around the heart',
            'deskripsi_pendek' => 'Impl cardiac support dev',
          ),
          87 => 
          array (
            'kode' => '37.49',
            'deskripsi_panjang' => 'Other repair of heart and pericardium',
            'deskripsi_pendek' => 'Heart/pericard repr NEC',
          ),
          88 => 
          array (
            'kode' => '37.51',
            'deskripsi_panjang' => 'Heart transplantation',
            'deskripsi_pendek' => 'Heart transplantation',
          ),
          89 => 
          array (
            'kode' => '37.52',
            'deskripsi_panjang' => 'Implantation of total internal biventricular heart replacement system',
            'deskripsi_pendek' => 'Imp tot int bi ht rp sys',
          ),
          90 => 
          array (
            'kode' => '37.53',
            'deskripsi_panjang' => 'Replacement or repair of thoracic unit of (total) replacement heart system',
            'deskripsi_pendek' => 'Repl/rep thr unt tot hrt',
          ),
          91 => 
          array (
            'kode' => '37.54',
            'deskripsi_panjang' => 'Replacement or repair of other implantable component of (total) replacement heart system',
            'deskripsi_pendek' => 'Repl/rep oth tot hrt sys',
          ),
          92 => 
          array (
            'kode' => '37.55',
            'deskripsi_panjang' => 'Removal of internal biventricular heart replacement system',
            'deskripsi_pendek' => 'Rem int bivent hrt sys',
          ),
          93 => 
          array (
            'kode' => '37.60',
            'deskripsi_panjang' => 'Implantation or insertion of biventricular external heart assist system',
            'deskripsi_pendek' => 'Imp bivn ext hrt ast sys',
          ),
          94 => 
          array (
            'kode' => '37.61',
            'deskripsi_panjang' => 'Implant of pulsation balloon',
            'deskripsi_pendek' => 'Pulsation balloon implan',
          ),
          95 => 
          array (
            'kode' => '37.62',
            'deskripsi_panjang' => 'Insertion of temporary non-implantable extracorporeal circulatory assist device',
            'deskripsi_pendek' => 'Insrt non-impl circ dev',
          ),
          96 => 
          array (
            'kode' => '37.63',
            'deskripsi_panjang' => 'Repair of heart assist system',
            'deskripsi_pendek' => 'Repair heart assist sys',
          ),
          97 => 
          array (
            'kode' => '37.64',
            'deskripsi_panjang' => 'Removal of external heart assist system(s) or device(s)',
            'deskripsi_pendek' => 'Remve ext hrt assist sys',
          ),
          98 => 
          array (
            'kode' => '37.65',
            'deskripsi_panjang' => 'Implant of single ventricular (extracorporeal) external heart assist system',
            'deskripsi_pendek' => 'Imp vent ext hrt ast sys',
          ),
          99 => 
          array (
            'kode' => '37.66',
            'deskripsi_panjang' => 'Insertion of implantable heart assist system',
            'deskripsi_pendek' => 'Implantable hrt assist',
          ),
          100 => 
          array (
            'kode' => '37.67',
            'deskripsi_panjang' => 'Implantation of cardiomyostimulation system',
            'deskripsi_pendek' => 'Imp cardiomyostimul sys',
          ),
          101 => 
          array (
            'kode' => '37.68',
            'deskripsi_panjang' => 'Insertion of percutaneous external heart assist device',
            'deskripsi_pendek' => 'Percutan hrt assist syst',
          ),
          102 => 
          array (
            'kode' => '37.70',
            'deskripsi_panjang' => 'Initial insertion of lead [electrode], not otherwise specified',
            'deskripsi_pendek' => 'Int insert pacemak lead',
          ),
          103 => 
          array (
            'kode' => '37.71',
            'deskripsi_panjang' => 'Initial insertion of transvenous lead [electrode] into ventricle',
            'deskripsi_pendek' => 'Int insert lead in vent',
          ),
          104 => 
          array (
            'kode' => '37.72',
            'deskripsi_panjang' => 'Initial insertion of transvenous leads [electrodes] into atrium and ventricle',
            'deskripsi_pendek' => 'Int inser lead atri-vent',
          ),
          105 => 
          array (
            'kode' => '37.73',
            'deskripsi_panjang' => 'Initial insertion of transvenous lead [electrode] into atrium',
            'deskripsi_pendek' => 'Int inser lead in atrium',
          ),
          106 => 
          array (
            'kode' => '37.74',
            'deskripsi_panjang' => 'Insertion or replacement of epicardial lead [electrode] into epicardium',
            'deskripsi_pendek' => 'Int or repl lead epicar',
          ),
          107 => 
          array (
            'kode' => '37.75',
            'deskripsi_panjang' => 'Revision of lead [electrode]',
            'deskripsi_pendek' => 'Revision of lead',
          ),
          108 => 
          array (
            'kode' => '37.76',
            'deskripsi_panjang' => 'Replacement of transvenous atrial and/or ventricular lead(s) [electrode]',
            'deskripsi_pendek' => 'Repl tv atri-vent lead',
          ),
          109 => 
          array (
            'kode' => '37.77',
            'deskripsi_panjang' => 'Removal of lead(s) [electrode] without replacement',
            'deskripsi_pendek' => 'Removal of lead w/o repl',
          ),
          110 => 
          array (
            'kode' => '37.78',
            'deskripsi_panjang' => 'Insertion of temporary transvenous pacemaker system',
            'deskripsi_pendek' => 'Inser temp pacemaker sys',
          ),
          111 => 
          array (
            'kode' => '37.79',
            'deskripsi_panjang' => 'Revision or relocation of cardiac device pocket',
            'deskripsi_pendek' => 'Rev/reloc card dev pockt',
          ),
          112 => 
          array (
            'kode' => '37.80',
            'deskripsi_panjang' => 'Insertion of permanent pacemaker, initial or replacement, type of device not specified',
            'deskripsi_pendek' => 'Int or repl perm pacemkr',
          ),
          113 => 
          array (
            'kode' => '37.81',
            'deskripsi_panjang' => 'Initial insertion of single-chamber device, not specified as rate responsive',
            'deskripsi_pendek' => 'Int insert 1-cham, non',
          ),
          114 => 
          array (
            'kode' => '37.82',
            'deskripsi_panjang' => 'Initial insertion of single-chamber device, rate responsive',
            'deskripsi_pendek' => 'Int insert 1-cham, rate',
          ),
          115 => 
          array (
            'kode' => '37.83',
            'deskripsi_panjang' => 'Initial insertion of dual-chamber device',
            'deskripsi_pendek' => 'Int insert dual-cham dev',
          ),
          116 => 
          array (
            'kode' => '37.85',
            'deskripsi_panjang' => 'Replacement of any type pacemaker device with single-chamber device, not specified as rate responsive',
            'deskripsi_pendek' => 'Repl pacem w 1-cham, non',
          ),
          117 => 
          array (
            'kode' => '37.86',
            'deskripsi_panjang' => 'Replacement of any type of pacemaker device with single-chamber device, rate responsive',
            'deskripsi_pendek' => 'Repl pacem 1-cham, rate',
          ),
          118 => 
          array (
            'kode' => '37.87',
            'deskripsi_panjang' => 'Replacement of any type pacemaker device with dual-chamber device',
            'deskripsi_pendek' => 'Repl pacem w dual-cham',
          ),
          119 => 
          array (
            'kode' => '37.89',
            'deskripsi_panjang' => 'Revision or removal of pacemaker device',
            'deskripsi_pendek' => 'Revise or remove pacemak',
          ),
          120 => 
          array (
            'kode' => '37.90',
            'deskripsi_panjang' => 'Insertion of left atrial appendage device',
            'deskripsi_pendek' => 'Ins left atr append dev',
          ),
          121 => 
          array (
            'kode' => '37.91',
            'deskripsi_panjang' => 'Open chest cardiac massage',
            'deskripsi_pendek' => 'Opn chest cardiac massag',
          ),
          122 => 
          array (
            'kode' => '37.92',
            'deskripsi_panjang' => 'Injection of therapeutic substance into heart',
            'deskripsi_pendek' => 'Injection into heart',
          ),
          123 => 
          array (
            'kode' => '37.93',
            'deskripsi_panjang' => 'Injection of therapeutic substance into pericardium',
            'deskripsi_pendek' => 'Injection into pericard',
          ),
          124 => 
          array (
            'kode' => '37.94',
            'deskripsi_panjang' => 'Implantation or replacement of automatic cardioverter/defibrillator, total system [AICD]',
            'deskripsi_pendek' => 'Implt/repl carddefib tot',
          ),
          125 => 
          array (
            'kode' => '37.95',
            'deskripsi_panjang' => 'Implantation of automatic cardioverter/defibrillator lead(s) only',
            'deskripsi_pendek' => 'Implt cardiodefib leads',
          ),
          126 => 
          array (
            'kode' => '37.96',
            'deskripsi_panjang' => 'Implantation of automatic cardioverter/defibrillator pulse generator only',
            'deskripsi_pendek' => 'Implt cardiodefib genatr',
          ),
          127 => 
          array (
            'kode' => '37.97',
            'deskripsi_panjang' => 'Replacement of automatic cardioverter/defibrillator lead(s) only',
            'deskripsi_pendek' => 'Repl cardiodefib leads',
          ),
          128 => 
          array (
            'kode' => '37.98',
            'deskripsi_panjang' => 'Replacement of automatic cardioverter/defibrillator pulse generator only',
            'deskripsi_pendek' => 'Repl cardiodefib genratr',
          ),
          129 => 
          array (
            'kode' => '37.99',
            'deskripsi_panjang' => 'Other operations on heart and pericardium',
            'deskripsi_pendek' => 'Other heart/pericard ops',
          ),
          130 => 
          array (
            'kode' => '38.00',
            'deskripsi_panjang' => 'Incision of vessel, unspecified site',
            'deskripsi_pendek' => 'Incision of vessel NOS',
          ),
          131 => 
          array (
            'kode' => '38.01',
            'deskripsi_panjang' => 'Incision of vessel, intracranial vessels',
            'deskripsi_pendek' => 'Intracran vessel incis',
          ),
          132 => 
          array (
            'kode' => '38.02',
            'deskripsi_panjang' => 'Incision of vessel, other vessels of head and neck',
            'deskripsi_pendek' => 'Head/neck ves incis NEC',
          ),
          133 => 
          array (
            'kode' => '38.03',
            'deskripsi_panjang' => 'Incision of vessel, upper limb vessels',
            'deskripsi_pendek' => 'Upper limb vessel incis',
          ),
          134 => 
          array (
            'kode' => '38.04',
            'deskripsi_panjang' => 'Incision of vessel, aorta',
            'deskripsi_pendek' => 'Incision of aorta',
          ),
          135 => 
          array (
            'kode' => '38.05',
            'deskripsi_panjang' => 'Incision of vessel, other thoracic vessels',
            'deskripsi_pendek' => 'Thoracic vessel inc NEC',
          ),
          136 => 
          array (
            'kode' => '38.06',
            'deskripsi_panjang' => 'Incision of vessel, abdominal arteries',
            'deskripsi_pendek' => 'Abdomen artery incision',
          ),
          137 => 
          array (
            'kode' => '38.07',
            'deskripsi_panjang' => 'Incision of vessel, abdominal veins',
            'deskripsi_pendek' => 'Abdominal vein incision',
          ),
          138 => 
          array (
            'kode' => '38.08',
            'deskripsi_panjang' => 'Incision of vessel, lower limb arteries',
            'deskripsi_pendek' => 'Lower limb artery incis',
          ),
          139 => 
          array (
            'kode' => '38.09',
            'deskripsi_panjang' => 'Incision of vessel, lower limb veins',
            'deskripsi_pendek' => 'Lower limb vein incision',
          ),
          140 => 
          array (
            'kode' => '38.10',
            'deskripsi_panjang' => 'Endarterectomy, unspecified site',
            'deskripsi_pendek' => 'Endarterectomy NOS',
          ),
          141 => 
          array (
            'kode' => '38.11',
            'deskripsi_panjang' => 'Endarterectomy, intracranial vessels',
            'deskripsi_pendek' => 'Intracran endarterectomy',
          ),
          142 => 
          array (
            'kode' => '38.12',
            'deskripsi_panjang' => 'Endarterectomy, other vessels of head and neck',
            'deskripsi_pendek' => 'Head & neck endarter NEC',
          ),
          143 => 
          array (
            'kode' => '38.13',
            'deskripsi_panjang' => 'Endarterectomy, upper limb vessels',
            'deskripsi_pendek' => 'Upper limb endarterectom',
          ),
          144 => 
          array (
            'kode' => '38.14',
            'deskripsi_panjang' => 'Endarterectomy, aorta',
            'deskripsi_pendek' => 'Endarterectomy of aorta',
          ),
          145 => 
          array (
            'kode' => '38.15',
            'deskripsi_panjang' => 'Endarterectomy, other thoracic vessels',
            'deskripsi_pendek' => 'Thoracic endarterectomy',
          ),
          146 => 
          array (
            'kode' => '38.16',
            'deskripsi_panjang' => 'Endarterectomy, abdominal arteries',
            'deskripsi_pendek' => 'Abdominal endarterectomy',
          ),
          147 => 
          array (
            'kode' => '38.18',
            'deskripsi_panjang' => 'Endarterectomy, lower limb arteries',
            'deskripsi_pendek' => 'Lower limb endarterect',
          ),
          148 => 
          array (
            'kode' => '38.21',
            'deskripsi_panjang' => 'Biopsy of blood vessel',
            'deskripsi_pendek' => 'Blood vessel biopsy',
          ),
          149 => 
          array (
            'kode' => '38.22',
            'deskripsi_panjang' => 'Percutaneous angioscopy',
            'deskripsi_pendek' => 'Percutaneous angioscopy',
          ),
          150 => 
          array (
            'kode' => '38.23',
            'deskripsi_panjang' => 'Intravascular spectroscopy',
            'deskripsi_pendek' => 'Intravasclr spectroscopy',
          ),
          151 => 
          array (
            'kode' => '38.24',
            'deskripsi_panjang' => 'Intravascular imaging of coronary vessel(s) by optical coherence tomography [OCT]',
            'deskripsi_pendek' => 'Intravas img cor ves OCT',
          ),
          152 => 
          array (
            'kode' => '38.25',
            'deskripsi_panjang' => 'Intravascular imaging of non-coronary vessel(s) by optical coherence tomography [OCT]',
            'deskripsi_pendek' => 'Intravas img non-cor OCT',
          ),
          153 => 
          array (
            'kode' => '38.26',
            'deskripsi_panjang' => 'Insertion of implantable pressure sensor without lead for intracardiac or great vessel hemodynamic monitoring',
            'deskripsi_pendek' => 'Insrt prsr snsr w/o lead',
          ),
          154 => 
          array (
            'kode' => '38.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on blood vessels',
            'deskripsi_pendek' => 'Blood vessel dx proc NEC',
          ),
          155 => 
          array (
            'kode' => '38.30',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, unspecified site',
            'deskripsi_pendek' => 'Vessel resect/anast NOS',
          ),
          156 => 
          array (
            'kode' => '38.31',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, intracranial vessels',
            'deskripsi_pendek' => 'Intracran ves resec-anas',
          ),
          157 => 
          array (
            'kode' => '38.32',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, other vessels of head and neck',
            'deskripsi_pendek' => 'Head/neck ves resec-anas',
          ),
          158 => 
          array (
            'kode' => '38.33',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, upper limb vessels',
            'deskripsi_pendek' => 'Arm vessel resect/anast',
          ),
          159 => 
          array (
            'kode' => '38.34',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, aorta',
            'deskripsi_pendek' => 'Aorta resection & anast',
          ),
          160 => 
          array (
            'kode' => '38.35',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, other thoracic vessels',
            'deskripsi_pendek' => 'Thor vessel resect/anast',
          ),
          161 => 
          array (
            'kode' => '38.36',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, abdominal arteries',
            'deskripsi_pendek' => 'Abd vessel resect/anast',
          ),
          162 => 
          array (
            'kode' => '38.37',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, abdominal veins',
            'deskripsi_pendek' => 'Abd vein resect & anast',
          ),
          163 => 
          array (
            'kode' => '38.38',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, lower limb arteries',
            'deskripsi_pendek' => 'Leg artery resect/anast',
          ),
          164 => 
          array (
            'kode' => '38.39',
            'deskripsi_panjang' => 'Resection of vessel with anastomosis, lower limb veins',
            'deskripsi_pendek' => 'Leg vein resect/anastom',
          ),
          165 => 
          array (
            'kode' => '38.40',
            'deskripsi_panjang' => 'Resection of vessel with replacement, unspecified site',
            'deskripsi_pendek' => 'Vessel resect/replac NOS',
          ),
          166 => 
          array (
            'kode' => '38.41',
            'deskripsi_panjang' => 'Resection of vessel with replacement, intracranial vessels',
            'deskripsi_pendek' => 'Intracran ves resec-repl',
          ),
          167 => 
          array (
            'kode' => '38.42',
            'deskripsi_panjang' => 'Resection of vessel with replacement, other vessels of head and neck',
            'deskripsi_pendek' => 'Head/neck ves resec-repl',
          ),
          168 => 
          array (
            'kode' => '38.43',
            'deskripsi_panjang' => 'Resection of vessel with replacement, upper limb vessels',
            'deskripsi_pendek' => 'Arm ves resect w replace',
          ),
          169 => 
          array (
            'kode' => '38.44',
            'deskripsi_panjang' => 'Resection of vessel with replacement, aorta, abdominal',
            'deskripsi_pendek' => 'Resect abdm aorta w repl',
          ),
          170 => 
          array (
            'kode' => '38.45',
            'deskripsi_panjang' => 'Resection of vessel with replacement, thoracic vessels',
            'deskripsi_pendek' => 'Resect thorac ves w repl',
          ),
          171 => 
          array (
            'kode' => '38.46',
            'deskripsi_panjang' => 'Resection of vessel with replacement, abdominal arteries',
            'deskripsi_pendek' => 'Abd artery resec w repla',
          ),
          172 => 
          array (
            'kode' => '38.47',
            'deskripsi_panjang' => 'Resection of vessel with replacement, abdominal veins',
            'deskripsi_pendek' => 'Abd vein resect w replac',
          ),
          173 => 
          array (
            'kode' => '38.48',
            'deskripsi_panjang' => 'Resection of vessel with replacement, lower limb arteries',
            'deskripsi_pendek' => 'Leg artery resec w repla',
          ),
          174 => 
          array (
            'kode' => '38.49',
            'deskripsi_panjang' => 'Resection of vessel with replacement, lower limb veins',
            'deskripsi_pendek' => 'Leg vein resect w replac',
          ),
          175 => 
          array (
            'kode' => '38.50',
            'deskripsi_panjang' => 'Ligation and stripping of varicose veins, unspecified site',
            'deskripsi_pendek' => 'Varicose v lig-strip NOS',
          ),
          176 => 
          array (
            'kode' => '38.51',
            'deskripsi_panjang' => 'Ligation and stripping of varicose veins, intracranial vessels',
            'deskripsi_pendek' => 'Intcran var v lig-strip',
          ),
          177 => 
          array (
            'kode' => '38.52',
            'deskripsi_panjang' => 'Ligation and stripping of varicose veins, other vessels of head and neck',
            'deskripsi_pendek' => 'Head/neck var v lig-str',
          ),
          178 => 
          array (
            'kode' => '38.53',
            'deskripsi_panjang' => 'Ligation and stripping of varicose veins, upper limb vessels',
            'deskripsi_pendek' => 'Arm varicose v lig-strip',
          ),
          179 => 
          array (
            'kode' => '38.55',
            'deskripsi_panjang' => 'Ligation and stripping of varicose veins, other thoracic vessels',
            'deskripsi_pendek' => 'Thorac var v lig-strip',
          ),
          180 => 
          array (
            'kode' => '38.57',
            'deskripsi_panjang' => 'Ligation and stripping of varicose veins, abdominal veins',
            'deskripsi_pendek' => 'Abd varicos v liga-strip',
          ),
          181 => 
          array (
            'kode' => '38.59',
            'deskripsi_panjang' => 'Ligation and stripping of varicose veins, lower limb veins',
            'deskripsi_pendek' => 'Leg varicos v liga-strip',
          ),
          182 => 
          array (
            'kode' => '38.60',
            'deskripsi_panjang' => 'Other excision of vessels, unspecified site',
            'deskripsi_pendek' => 'Excision of vessel NOS',
          ),
          183 => 
          array (
            'kode' => '38.61',
            'deskripsi_panjang' => 'Other excision of vessels, intracranial vessels',
            'deskripsi_pendek' => 'Intracran vessel excis',
          ),
          184 => 
          array (
            'kode' => '38.62',
            'deskripsi_panjang' => 'Other excision of vessels, other vessels of head and neck',
            'deskripsi_pendek' => 'Head/neck vessel excis',
          ),
          185 => 
          array (
            'kode' => '38.63',
            'deskripsi_panjang' => 'Other excision of vessels, upper limb vessels',
            'deskripsi_pendek' => 'Arm vessel excision',
          ),
          186 => 
          array (
            'kode' => '38.64',
            'deskripsi_panjang' => 'Other excision of vessels, aorta, abdominal',
            'deskripsi_pendek' => 'Excision of aorta',
          ),
          187 => 
          array (
            'kode' => '38.65',
            'deskripsi_panjang' => 'Other excision of vessels, thoracic vessels',
            'deskripsi_pendek' => 'Thoracic vessel excision',
          ),
          188 => 
          array (
            'kode' => '38.66',
            'deskripsi_panjang' => 'Other excision of vessels, abdominal arteries',
            'deskripsi_pendek' => 'Abdominal artery excis',
          ),
          189 => 
          array (
            'kode' => '38.67',
            'deskripsi_panjang' => 'Other excision of vessels, abdominal veins',
            'deskripsi_pendek' => 'Abdominal vein excision',
          ),
          190 => 
          array (
            'kode' => '38.68',
            'deskripsi_panjang' => 'Other excision of vessels, lower limb arteries',
            'deskripsi_pendek' => 'Leg artery excision',
          ),
          191 => 
          array (
            'kode' => '38.69',
            'deskripsi_panjang' => 'Other excision of vessels, lower limb veins',
            'deskripsi_pendek' => 'Leg vein excision',
          ),
          192 => 
          array (
            'kode' => '38.7',
            'deskripsi_panjang' => 'Interruption of the vena cava',
            'deskripsi_pendek' => 'Interruption vena cava',
          ),
          193 => 
          array (
            'kode' => '38.80',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, unspecified site',
            'deskripsi_pendek' => 'Surg vessel occlus NEC',
          ),
          194 => 
          array (
            'kode' => '38.81',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, intracranial vessels',
            'deskripsi_pendek' => 'Occlus intracran ves NEC',
          ),
          195 => 
          array (
            'kode' => '38.82',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, other vessels of head and neck',
            'deskripsi_pendek' => 'Occlus head/neck ves NEC',
          ),
          196 => 
          array (
            'kode' => '38.83',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, upper limb vessels',
            'deskripsi_pendek' => 'Occlude arm vessel NEC',
          ),
          197 => 
          array (
            'kode' => '38.84',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, aorta, abdominal',
            'deskripsi_pendek' => 'Occlude aorta NEC',
          ),
          198 => 
          array (
            'kode' => '38.85',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, thoracic vessels',
            'deskripsi_pendek' => 'Occlude thoracic ves NEC',
          ),
          199 => 
          array (
            'kode' => '38.86',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, abdominal arteries',
            'deskripsi_pendek' => 'Occlude abd artery NEC',
          ),
          200 => 
          array (
            'kode' => '38.87',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, abdominal veins',
            'deskripsi_pendek' => 'Occlude abd vein NEC',
          ),
          201 => 
          array (
            'kode' => '38.88',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, lower limb arteries',
            'deskripsi_pendek' => 'Occlude leg artery NEC',
          ),
          202 => 
          array (
            'kode' => '38.89',
            'deskripsi_panjang' => 'Other surgical occlusion of vessels, lower limb veins',
            'deskripsi_pendek' => 'Occlude leg vein NEC',
          ),
          203 => 
          array (
            'kode' => '38.91',
            'deskripsi_panjang' => 'Arterial catheterization',
            'deskripsi_pendek' => 'Arterial catheterization',
          ),
          204 => 
          array (
            'kode' => '38.92',
            'deskripsi_panjang' => 'Umbilical vein catheterization',
            'deskripsi_pendek' => 'Umbilical vein cath',
          ),
          205 => 
          array (
            'kode' => '38.93',
            'deskripsi_panjang' => 'Venous catheterization, not elsewhere classified',
            'deskripsi_pendek' => 'Venous cath NEC',
          ),
          206 => 
          array (
            'kode' => '38.94',
            'deskripsi_panjang' => 'Venous cutdown',
            'deskripsi_pendek' => 'Venous cutdown',
          ),
          207 => 
          array (
            'kode' => '38.95',
            'deskripsi_panjang' => 'Venous catheterization for renal dialysis',
            'deskripsi_pendek' => 'Ven cath renal dialysis',
          ),
          208 => 
          array (
            'kode' => '38.97',
            'deskripsi_panjang' => 'Central venous catheter placement with guidance',
            'deskripsi_pendek' => 'CV cath plcmt w guidance',
          ),
          209 => 
          array (
            'kode' => '38.98',
            'deskripsi_panjang' => 'Other puncture of artery',
            'deskripsi_pendek' => 'Arterial puncture NEC',
          ),
          210 => 
          array (
            'kode' => '38.99',
            'deskripsi_panjang' => 'Other puncture of vein',
            'deskripsi_pendek' => 'Venous puncture NEC',
          ),
          211 => 
          array (
            'kode' => '39.0',
            'deskripsi_panjang' => 'Systemic to pulmonary artery shunt',
            'deskripsi_pendek' => 'Systemic-pulm art shunt',
          ),
          212 => 
          array (
            'kode' => '39.1',
            'deskripsi_panjang' => 'Intra-abdominal venous shunt',
            'deskripsi_pendek' => 'Intra-abd venous shunt',
          ),
          213 => 
          array (
            'kode' => '39.21',
            'deskripsi_panjang' => 'Caval-pulmonary artery anastomosis',
            'deskripsi_pendek' => 'Caval-pulmon art anastom',
          ),
          214 => 
          array (
            'kode' => '39.22',
            'deskripsi_panjang' => 'Aorta-subclavian-carotid bypass',
            'deskripsi_pendek' => 'Aorta-subclv-carot bypas',
          ),
          215 => 
          array (
            'kode' => '39.23',
            'deskripsi_panjang' => 'Other intrathoracic vascular shunt or bypass',
            'deskripsi_pendek' => 'Intrathoracic shunt NEC',
          ),
          216 => 
          array (
            'kode' => '39.24',
            'deskripsi_panjang' => 'Aorta-renal bypass',
            'deskripsi_pendek' => 'Aorta-renal bypass',
          ),
          217 => 
          array (
            'kode' => '39.25',
            'deskripsi_panjang' => 'Aorta-iliac-femoral bypass',
            'deskripsi_pendek' => 'Aorta-iliac-femor bypass',
          ),
          218 => 
          array (
            'kode' => '39.26',
            'deskripsi_panjang' => 'Other intra-abdominal vascular shunt or bypass',
            'deskripsi_pendek' => 'Intra-abdomin shunt NEC',
          ),
          219 => 
          array (
            'kode' => '39.27',
            'deskripsi_panjang' => 'Arteriovenostomy for renal dialysis',
            'deskripsi_pendek' => 'Dialysis arteriovenostom',
          ),
          220 => 
          array (
            'kode' => '39.28',
            'deskripsi_panjang' => 'Extracranial-intracranial (EC-IC) vascular bypass',
            'deskripsi_pendek' => 'Extracran-intracr bypass',
          ),
          221 => 
          array (
            'kode' => '39.29',
            'deskripsi_panjang' => 'Other (peripheral) vascular shunt or bypass',
            'deskripsi_pendek' => 'Vasc shunt & bypass NEC',
          ),
          222 => 
          array (
            'kode' => '39.30',
            'deskripsi_panjang' => 'Suture of unspecified blood vessel',
            'deskripsi_pendek' => 'Suture of vessel NOS',
          ),
          223 => 
          array (
            'kode' => '39.31',
            'deskripsi_panjang' => 'Suture of artery',
            'deskripsi_pendek' => 'Suture of artery',
          ),
          224 => 
          array (
            'kode' => '39.32',
            'deskripsi_panjang' => 'Suture of vein',
            'deskripsi_pendek' => 'Suture of vein',
          ),
          225 => 
          array (
            'kode' => '39.41',
            'deskripsi_panjang' => 'Control of hemorrhage following vascular surgery',
            'deskripsi_pendek' => 'Postop vasc op hem contr',
          ),
          226 => 
          array (
            'kode' => '39.42',
            'deskripsi_panjang' => 'Revision of arteriovenous shunt for renal dialysis',
            'deskripsi_pendek' => 'Revis ren dialysis shunt',
          ),
          227 => 
          array (
            'kode' => '39.43',
            'deskripsi_panjang' => 'Removal of arteriovenous shunt for renal dialysis',
            'deskripsi_pendek' => 'Remov ren dialysis shunt',
          ),
          228 => 
          array (
            'kode' => '39.49',
            'deskripsi_panjang' => 'Other revision of vascular procedure',
            'deskripsi_pendek' => 'Vasc proc revision NEC',
          ),
          229 => 
          array (
            'kode' => '39.50',
            'deskripsi_panjang' => 'Angioplasty of other non-coronary vessel(s)',
            'deskripsi_pendek' => 'Angio oth non-coronary',
          ),
          230 => 
          array (
            'kode' => '39.51',
            'deskripsi_panjang' => 'Clipping of aneurysm',
            'deskripsi_pendek' => 'Clipping of aneurysm',
          ),
          231 => 
          array (
            'kode' => '39.52',
            'deskripsi_panjang' => 'Other repair of aneurysm',
            'deskripsi_pendek' => 'Aneurysm repair NEC',
          ),
          232 => 
          array (
            'kode' => '39.53',
            'deskripsi_panjang' => 'Repair of arteriovenous fistula',
            'deskripsi_pendek' => 'Arterioven fistula rep',
          ),
          233 => 
          array (
            'kode' => '39.54',
            'deskripsi_panjang' => 'Re-entry operation (aorta)',
            'deskripsi_pendek' => 'Re-entry operation',
          ),
          234 => 
          array (
            'kode' => '39.55',
            'deskripsi_panjang' => 'Reimplantation of aberrant renal vessel',
            'deskripsi_pendek' => 'Reimplan aberr renal ves',
          ),
          235 => 
          array (
            'kode' => '39.56',
            'deskripsi_panjang' => 'Repair of blood vessel with tissue patch graft',
            'deskripsi_pendek' => 'Repair vess w tis patch',
          ),
          236 => 
          array (
            'kode' => '39.57',
            'deskripsi_panjang' => 'Repair of blood vessel with synthetic patch graft',
            'deskripsi_pendek' => 'Rep vess w synth patch',
          ),
          237 => 
          array (
            'kode' => '39.58',
            'deskripsi_panjang' => 'Repair of blood vessel with unspecified type of patch graft',
            'deskripsi_pendek' => 'Repair vess w patch NOS',
          ),
          238 => 
          array (
            'kode' => '39.59',
            'deskripsi_panjang' => 'Other repair of vessel',
            'deskripsi_pendek' => 'Repair of vessel NEC',
          ),
          239 => 
          array (
            'kode' => '39.61',
            'deskripsi_panjang' => 'Extracorporeal circulation auxiliary to open heart surgery',
            'deskripsi_pendek' => 'Extracorporeal circulat',
          ),
          240 => 
          array (
            'kode' => '39.62',
            'deskripsi_panjang' => 'Hypothermia (systemic) incidental to open heart surgery',
            'deskripsi_pendek' => 'Hypothermia w open heart',
          ),
          241 => 
          array (
            'kode' => '39.63',
            'deskripsi_panjang' => 'Cardioplegia',
            'deskripsi_pendek' => 'Cardioplegia',
          ),
          242 => 
          array (
            'kode' => '39.64',
            'deskripsi_panjang' => 'Intraoperative cardiac pacemaker',
            'deskripsi_pendek' => 'Intraop cardiac pacemak',
          ),
          243 => 
          array (
            'kode' => '39.65',
            'deskripsi_panjang' => 'Extracorporeal membrane oxygenation [ECMO]',
            'deskripsi_pendek' => 'Extracorporeal memb oxy',
          ),
          244 => 
          array (
            'kode' => '39.66',
            'deskripsi_panjang' => 'Percutaneous cardiopulmonary bypass',
            'deskripsi_pendek' => 'Per cardiopulmon bypass',
          ),
          245 => 
          array (
            'kode' => '39.71',
            'deskripsi_panjang' => 'Endovascular implantation of other graft in abdominal aorta',
            'deskripsi_pendek' => 'Endo imp oth grf abd aor',
          ),
          246 => 
          array (
            'kode' => '39.72',
            'deskripsi_panjang' => 'Endovascular (total) embolization or occlusion of head and neck vessels',
            'deskripsi_pendek' => 'Endovasc embol hd/nk ves',
          ),
          247 => 
          array (
            'kode' => '39.73',
            'deskripsi_panjang' => 'Endovascular implantation of graft in thoracic aorta',
            'deskripsi_pendek' => 'Endo imp grft thor aorta',
          ),
          248 => 
          array (
            'kode' => '39.74',
            'deskripsi_panjang' => 'Endovascular removal of obstruction from head and neck vessel(s)',
            'deskripsi_pendek' => 'Endo rem obs hd/neck ves',
          ),
          249 => 
          array (
            'kode' => '39.75',
            'deskripsi_panjang' => 'Endovascular embolization or occlusion of vessel(s) of head or neck using bare coils',
            'deskripsi_pendek' => 'Endo emb hd/nk,bare coil',
          ),
          250 => 
          array (
            'kode' => '39.76',
            'deskripsi_panjang' => 'Endovascular embolization or occlusion of vessel(s) of head or neck using bioactive coils',
            'deskripsi_pendek' => 'Endo em hd/nk,bioac coil',
          ),
          251 => 
          array (
            'kode' => '39.77',
            'deskripsi_panjang' => 'Temporary (partial) therapeutic endovascular occlusion of vessel',
            'deskripsi_pendek' => 'Temp endovsc occls vessl',
          ),
          252 => 
          array (
            'kode' => '39.78',
            'deskripsi_panjang' => 'Endovascular implantation of branching or fenestrated graft(s) in aorta',
            'deskripsi_pendek' => 'Endovas impln grft aorta',
          ),
          253 => 
          array (
            'kode' => '39.79',
            'deskripsi_panjang' => 'Other endovascular procedures on other vessels',
            'deskripsi_pendek' => 'Oth endo proc oth vessel',
          ),
          254 => 
          array (
            'kode' => '39.81',
            'deskripsi_panjang' => 'Implantation or replacement of carotid sinus stimulation device, total system',
            'deskripsi_pendek' => 'Imp crtd sinus stm,totl',
          ),
          255 => 
          array (
            'kode' => '39.82',
            'deskripsi_panjang' => 'Implantation or replacement of carotid sinus stimulation lead(s) only',
            'deskripsi_pendek' => 'Imp/rep crtd sinus lead',
          ),
          256 => 
          array (
            'kode' => '39.83',
            'deskripsi_panjang' => 'Implantation or replacement of carotid sinus stimulation pulse generator only',
            'deskripsi_pendek' => 'Imp/rep crtd sinus gnrtr',
          ),
          257 => 
          array (
            'kode' => '39.84',
            'deskripsi_panjang' => 'Revision of carotid sinus stimulation lead(s) only',
            'deskripsi_pendek' => 'Rev crtd sinus stm leads',
          ),
          258 => 
          array (
            'kode' => '39.85',
            'deskripsi_panjang' => 'Revision of carotid sinus stimulation pulse generator',
            'deskripsi_pendek' => 'Rev crtd sinus pulse gen',
          ),
          259 => 
          array (
            'kode' => '39.86',
            'deskripsi_panjang' => 'Removal of carotid sinus stimulation device, total system',
            'deskripsi_pendek' => 'Rem crtd sinus stm, totl',
          ),
          260 => 
          array (
            'kode' => '39.87',
            'deskripsi_panjang' => 'Removal of carotid sinus stimulation lead(s) only',
            'deskripsi_pendek' => 'Rem crtd sinus stm lead',
          ),
          261 => 
          array (
            'kode' => '39.88',
            'deskripsi_panjang' => 'Removal of carotid sinus stimulation pulse generator only',
            'deskripsi_pendek' => 'Rem crtd sinus pulse gen',
          ),
          262 => 
          array (
            'kode' => '39.89',
            'deskripsi_panjang' => 'Other operations on carotid body, carotid sinus and other vascular bodies',
            'deskripsi_pendek' => 'Oth cartd body/sinus op',
          ),
          263 => 
          array (
            'kode' => '39.90',
            'deskripsi_panjang' => 'Insertion of non-drug-eluting peripheral (non-coronary) vessel stent(s)',
            'deskripsi_pendek' => 'Ins non-d-e non-cor stnt',
          ),
          264 => 
          array (
            'kode' => '39.91',
            'deskripsi_panjang' => 'Freeing of vessel',
            'deskripsi_pendek' => 'Freeing of vessel',
          ),
          265 => 
          array (
            'kode' => '39.92',
            'deskripsi_panjang' => 'Injection of sclerosing agent into vein',
            'deskripsi_pendek' => 'Vein inject-scleros agnt',
          ),
          266 => 
          array (
            'kode' => '39.93',
            'deskripsi_panjang' => 'Insertion of vessel-to-vessel cannula',
            'deskripsi_pendek' => 'Insert ves-to-ves cannul',
          ),
          267 => 
          array (
            'kode' => '39.94',
            'deskripsi_panjang' => 'Replacement of vessel-to-vessel cannula',
            'deskripsi_pendek' => 'Replac ves-to-ves cannul',
          ),
          268 => 
          array (
            'kode' => '39.95',
            'deskripsi_panjang' => 'Hemodialysis',
            'deskripsi_pendek' => 'Hemodialysis',
          ),
          269 => 
          array (
            'kode' => '39.96',
            'deskripsi_panjang' => 'Total body perfusion',
            'deskripsi_pendek' => 'Total body perfusion',
          ),
          270 => 
          array (
            'kode' => '39.97',
            'deskripsi_panjang' => 'Other perfusion',
            'deskripsi_pendek' => 'Other perfusion',
          ),
          271 => 
          array (
            'kode' => '39.98',
            'deskripsi_panjang' => 'Control of hemorrhage, not otherwise specified',
            'deskripsi_pendek' => 'Hemorrhage control NOS',
          ),
          272 => 
          array (
            'kode' => '39.99',
            'deskripsi_panjang' => 'Other operations on vessels',
            'deskripsi_pendek' => 'Vessel operation NEC',
          ),
          273 => 
          array (
            'kode' => '40.0',
            'deskripsi_panjang' => 'Incision of lymphatic structures',
            'deskripsi_pendek' => 'Incis lymphatic structur',
          ),
          274 => 
          array (
            'kode' => '40.11',
            'deskripsi_panjang' => 'Biopsy of lymphatic structure',
            'deskripsi_pendek' => 'Lymphatic struct biopsy',
          ),
          275 => 
          array (
            'kode' => '40.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on lymphatic structures',
            'deskripsi_pendek' => 'Lymphatic diag proc NEC',
          ),
          276 => 
          array (
            'kode' => '40.21',
            'deskripsi_panjang' => 'Excision of deep cervical lymph node',
            'deskripsi_pendek' => 'Excis deep cervical node',
          ),
          277 => 
          array (
            'kode' => '40.22',
            'deskripsi_panjang' => 'Excision of internal mammary lymph node',
            'deskripsi_pendek' => 'Excise int mammary node',
          ),
          278 => 
          array (
            'kode' => '40.23',
            'deskripsi_panjang' => 'Excision of axillary lymph node',
            'deskripsi_pendek' => 'Excise axillary node',
          ),
          279 => 
          array (
            'kode' => '40.24',
            'deskripsi_panjang' => 'Excision of inguinal lymph node',
            'deskripsi_pendek' => 'Excise inguinal node',
          ),
          280 => 
          array (
            'kode' => '40.29',
            'deskripsi_panjang' => 'Simple excision of other lymphatic structure',
            'deskripsi_pendek' => 'Simp exc lymph struc NEC',
          ),
          281 => 
          array (
            'kode' => '40.3',
            'deskripsi_panjang' => 'Regional lymph node excision',
            'deskripsi_pendek' => 'Regional lymph node exc',
          ),
          282 => 
          array (
            'kode' => '40.40',
            'deskripsi_panjang' => 'Radical neck dissection, not otherwise specified',
            'deskripsi_pendek' => 'Rad neck dissection NOS',
          ),
          283 => 
          array (
            'kode' => '40.41',
            'deskripsi_panjang' => 'Radical neck dissection, unilateral',
            'deskripsi_pendek' => 'Unilat rad neck dissect',
          ),
          284 => 
          array (
            'kode' => '40.42',
            'deskripsi_panjang' => 'Radical neck dissection, bilateral',
            'deskripsi_pendek' => 'Bilat rad neck dissect',
          ),
          285 => 
          array (
            'kode' => '40.50',
            'deskripsi_panjang' => 'Radical excision of lymph nodes, not otherwise specified',
            'deskripsi_pendek' => 'Rad node dissection NOS',
          ),
          286 => 
          array (
            'kode' => '40.51',
            'deskripsi_panjang' => 'Radical excision of axillary lymph nodes',
            'deskripsi_pendek' => 'Rad dissec axillary node',
          ),
          287 => 
          array (
            'kode' => '40.52',
            'deskripsi_panjang' => 'Radical excision of periaortic lymph nodes',
            'deskripsi_pendek' => 'Rad dissec periaort node',
          ),
          288 => 
          array (
            'kode' => '40.53',
            'deskripsi_panjang' => 'Radical excision of iliac lymph nodes',
            'deskripsi_pendek' => 'Rad dissect iliac nodes',
          ),
          289 => 
          array (
            'kode' => '40.54',
            'deskripsi_panjang' => 'Radical groin dissection',
            'deskripsi_pendek' => 'Radical groin dissection',
          ),
          290 => 
          array (
            'kode' => '40.59',
            'deskripsi_panjang' => 'Radical excision of other lymph nodes',
            'deskripsi_pendek' => 'Rad node dissection NEC',
          ),
          291 => 
          array (
            'kode' => '40.61',
            'deskripsi_panjang' => 'Cannulation of thoracic duct',
            'deskripsi_pendek' => 'Thorac duct cannulation',
          ),
          292 => 
          array (
            'kode' => '40.62',
            'deskripsi_panjang' => 'Fistulization of thoracic duct',
            'deskripsi_pendek' => 'Thoracic duct fistulizat',
          ),
          293 => 
          array (
            'kode' => '40.63',
            'deskripsi_panjang' => 'Closure of fistula of thoracic duct',
            'deskripsi_pendek' => 'Close thoracic duct fist',
          ),
          294 => 
          array (
            'kode' => '40.64',
            'deskripsi_panjang' => 'Ligation of thoracic duct',
            'deskripsi_pendek' => 'Ligate thoracic duct',
          ),
          295 => 
          array (
            'kode' => '40.69',
            'deskripsi_panjang' => 'Other operations on thoracic duct',
            'deskripsi_pendek' => 'Thoracic duct op NEC',
          ),
          296 => 
          array (
            'kode' => '40.9',
            'deskripsi_panjang' => 'Other operations on lymphatic structures',
            'deskripsi_pendek' => 'Lymph structure op NEC',
          ),
          297 => 
          array (
            'kode' => '41.00',
            'deskripsi_panjang' => 'Bone marrow transplant, not otherwise specified',
            'deskripsi_pendek' => 'Bone marrow trnsplnt NOS',
          ),
          298 => 
          array (
            'kode' => '41.01',
            'deskripsi_panjang' => 'Autologous bone marrow transplant without purging',
            'deskripsi_pendek' => 'Auto bone mt w/o purg',
          ),
          299 => 
          array (
            'kode' => '41.02',
            'deskripsi_panjang' => 'Allogeneic bone marrow transplant with purging',
            'deskripsi_pendek' => 'Alo bone marrow trnsplnt',
          ),
          300 => 
          array (
            'kode' => '41.03',
            'deskripsi_panjang' => 'Allogeneic bone marrow transplant without purging',
            'deskripsi_pendek' => 'Allogrft bone marrow NOS',
          ),
          301 => 
          array (
            'kode' => '41.04',
            'deskripsi_panjang' => 'Autologous hematopoietic stem cell transplant without purging',
            'deskripsi_pendek' => 'Auto hem stem ct w/o pur',
          ),
          302 => 
          array (
            'kode' => '41.05',
            'deskripsi_panjang' => 'Allogeneic hematopoietic stem cell transpant without purging',
            'deskripsi_pendek' => 'Allo hem stem ct w/o pur',
          ),
          303 => 
          array (
            'kode' => '41.06',
            'deskripsi_panjang' => 'Cord blood stem cell transplant',
            'deskripsi_pendek' => 'Cord bld stem cell trans',
          ),
          304 => 
          array (
            'kode' => '41.07',
            'deskripsi_panjang' => 'Autologous hematopoietic stem cell transplant with purging',
            'deskripsi_pendek' => 'Auto hem stem ct w purg',
          ),
          305 => 
          array (
            'kode' => '41.08',
            'deskripsi_panjang' => 'Allogeneic hematopoietic stem cell transplant with purging',
            'deskripsi_pendek' => 'Allo hem stem ct w purg',
          ),
          306 => 
          array (
            'kode' => '41.09',
            'deskripsi_panjang' => 'Autologous bone marrow transplant with purging',
            'deskripsi_pendek' => 'Auto bone mt w purging',
          ),
          307 => 
          array (
            'kode' => '41.1',
            'deskripsi_panjang' => 'Puncture of spleen',
            'deskripsi_pendek' => 'Puncture of spleen',
          ),
          308 => 
          array (
            'kode' => '41.2',
            'deskripsi_panjang' => 'Splenotomy',
            'deskripsi_pendek' => 'Splenotomy',
          ),
          309 => 
          array (
            'kode' => '41.31',
            'deskripsi_panjang' => 'Biopsy of bone marrow',
            'deskripsi_pendek' => 'Bone marrow biopsy',
          ),
          310 => 
          array (
            'kode' => '41.32',
            'deskripsi_panjang' => 'Closed [aspiration] [percutaneous] biopsy of spleen',
            'deskripsi_pendek' => 'Closed spleen biopsy',
          ),
          311 => 
          array (
            'kode' => '41.33',
            'deskripsi_panjang' => 'Open biopsy of spleen',
            'deskripsi_pendek' => 'Open spleen biopsy',
          ),
          312 => 
          array (
            'kode' => '41.38',
            'deskripsi_panjang' => 'Other diagnostic procedures on bone marrow',
            'deskripsi_pendek' => 'Marrow diagnost proc NEC',
          ),
          313 => 
          array (
            'kode' => '41.39',
            'deskripsi_panjang' => 'Other diagnostic procedures on spleen',
            'deskripsi_pendek' => 'Spleen diagnost proc NEC',
          ),
          314 => 
          array (
            'kode' => '41.41',
            'deskripsi_panjang' => 'Marsupialization of splenic cyst',
            'deskripsi_pendek' => 'Splenic cyst marsupial',
          ),
          315 => 
          array (
            'kode' => '41.42',
            'deskripsi_panjang' => 'Excision of lesion or tissue of spleen',
            'deskripsi_pendek' => 'Exc splenic lesion/tiss',
          ),
          316 => 
          array (
            'kode' => '41.43',
            'deskripsi_panjang' => 'Partial splenectomy',
            'deskripsi_pendek' => 'Partial splenectomy',
          ),
          317 => 
          array (
            'kode' => '41.5',
            'deskripsi_panjang' => 'Total splenectomy',
            'deskripsi_pendek' => 'Total splenectomy',
          ),
          318 => 
          array (
            'kode' => '41.91',
            'deskripsi_panjang' => 'Aspiration of bone marrow from donor for transplant',
            'deskripsi_pendek' => 'Donor marrow aspiration',
          ),
          319 => 
          array (
            'kode' => '41.92',
            'deskripsi_panjang' => 'Injection into bone marrow',
            'deskripsi_pendek' => 'Injection into marrow',
          ),
          320 => 
          array (
            'kode' => '41.93',
            'deskripsi_panjang' => 'Excision of accessory spleen',
            'deskripsi_pendek' => 'Exc of accessory spleen',
          ),
          321 => 
          array (
            'kode' => '41.94',
            'deskripsi_panjang' => 'Transplantation of spleen',
            'deskripsi_pendek' => 'Spleen transplantation',
          ),
          322 => 
          array (
            'kode' => '41.95',
            'deskripsi_panjang' => 'Repair and plastic operations on spleen',
            'deskripsi_pendek' => 'Repair of spleen',
          ),
          323 => 
          array (
            'kode' => '41.98',
            'deskripsi_panjang' => 'Other operations on bone marrow',
            'deskripsi_pendek' => 'Bone marrow ops NEC',
          ),
          324 => 
          array (
            'kode' => '41.99',
            'deskripsi_panjang' => 'Other operations on spleen',
            'deskripsi_pendek' => 'Spleen operation NEC',
          ),
          325 => 
          array (
            'kode' => '42.01',
            'deskripsi_panjang' => 'Incision of esophageal web',
            'deskripsi_pendek' => 'Esophageal web incision',
          ),
          326 => 
          array (
            'kode' => '42.09',
            'deskripsi_panjang' => 'Other incision of esophagus',
            'deskripsi_pendek' => 'Esophageal incision NEC',
          ),
          327 => 
          array (
            'kode' => '42.10',
            'deskripsi_panjang' => 'Esophagostomy, not otherwise specified',
            'deskripsi_pendek' => 'Esophagostomy NOS',
          ),
          328 => 
          array (
            'kode' => '42.11',
            'deskripsi_panjang' => 'Cervical esophagostomy',
            'deskripsi_pendek' => 'Cervical esophagostomy',
          ),
          329 => 
          array (
            'kode' => '42.12',
            'deskripsi_panjang' => 'Exteriorization of esophageal pouch',
            'deskripsi_pendek' => 'Esoph pouch exteriorizat',
          ),
          330 => 
          array (
            'kode' => '42.19',
            'deskripsi_panjang' => 'Other external fistulization of esophagus',
            'deskripsi_pendek' => 'Ext fistulizat esoph NEC',
          ),
          331 => 
          array (
            'kode' => '42.21',
            'deskripsi_panjang' => 'Operative esophagoscopy by incision',
            'deskripsi_pendek' => 'Esophagoscopy by incis',
          ),
          332 => 
          array (
            'kode' => '42.22',
            'deskripsi_panjang' => 'Esophagoscopy through artificial stoma',
            'deskripsi_pendek' => 'Esophagoscopy thru stoma',
          ),
          333 => 
          array (
            'kode' => '42.23',
            'deskripsi_panjang' => 'Other esophagoscopy',
            'deskripsi_pendek' => 'Esophagoscopy NEC',
          ),
          334 => 
          array (
            'kode' => '42.24',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of esophagus',
            'deskripsi_pendek' => 'Closed bx of esophagus',
          ),
          335 => 
          array (
            'kode' => '42.25',
            'deskripsi_panjang' => 'Open biopsy of esophagus',
            'deskripsi_pendek' => 'Open biopsy of esophagus',
          ),
          336 => 
          array (
            'kode' => '42.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on esophagus',
            'deskripsi_pendek' => 'Esophageal dx proc NEC',
          ),
          337 => 
          array (
            'kode' => '42.31',
            'deskripsi_panjang' => 'Local excision of esophageal diverticulum',
            'deskripsi_pendek' => 'Loc excis esoph divertic',
          ),
          338 => 
          array (
            'kode' => '42.32',
            'deskripsi_panjang' => 'Local excision of other lesion or tissue of esophagus',
            'deskripsi_pendek' => 'Local excis esophag NEC',
          ),
          339 => 
          array (
            'kode' => '42.33',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion or tissue of esophagus',
            'deskripsi_pendek' => 'Endosc destruc esoph les',
          ),
          340 => 
          array (
            'kode' => '42.39',
            'deskripsi_panjang' => 'Other destruction of lesion or tissue of esophagus',
            'deskripsi_pendek' => 'Destruct esophag les NEC',
          ),
          341 => 
          array (
            'kode' => '42.40',
            'deskripsi_panjang' => 'Esophagectomy, not otherwise specified',
            'deskripsi_pendek' => 'Esophagectomy NOS',
          ),
          342 => 
          array (
            'kode' => '42.41',
            'deskripsi_panjang' => 'Partial esophagectomy',
            'deskripsi_pendek' => 'Partial esophagectomy',
          ),
          343 => 
          array (
            'kode' => '42.42',
            'deskripsi_panjang' => 'Total esophagectomy',
            'deskripsi_pendek' => 'Total esophagectomy',
          ),
          344 => 
          array (
            'kode' => '42.51',
            'deskripsi_panjang' => 'Intrathoracic esophagoesophagostomy',
            'deskripsi_pendek' => 'Thorac esophagoesophagos',
          ),
          345 => 
          array (
            'kode' => '42.52',
            'deskripsi_panjang' => 'Intrathoracic esophagogastrostomy',
            'deskripsi_pendek' => 'Thorac esophagogastrost',
          ),
          346 => 
          array (
            'kode' => '42.53',
            'deskripsi_panjang' => 'Intrathoracic esophageal anastomosis with interposition of small bowel',
            'deskripsi_pendek' => 'Thorac sm bowel interpos',
          ),
          347 => 
          array (
            'kode' => '42.54',
            'deskripsi_panjang' => 'Other intrathoracic esophagoenterostomy',
            'deskripsi_pendek' => 'Thorac esophagoenter NEC',
          ),
          348 => 
          array (
            'kode' => '42.55',
            'deskripsi_panjang' => 'Intrathoracic esophageal anastomosis with interposition of colon',
            'deskripsi_pendek' => 'Thorac lg bowel interpos',
          ),
          349 => 
          array (
            'kode' => '42.56',
            'deskripsi_panjang' => 'Other intrathoracic esophagocolostomy',
            'deskripsi_pendek' => 'Thorac esophagocolos NEC',
          ),
          350 => 
          array (
            'kode' => '42.58',
            'deskripsi_panjang' => 'Intrathoracic esophageal anastomosis with other interposition',
            'deskripsi_pendek' => 'Thorac interposition NEC',
          ),
          351 => 
          array (
            'kode' => '42.59',
            'deskripsi_panjang' => 'Other intrathoracic anastomosis of esophagus',
            'deskripsi_pendek' => 'Thorac esophag anast NEC',
          ),
          352 => 
          array (
            'kode' => '42.61',
            'deskripsi_panjang' => 'Antesternal esophagoesophagostomy',
            'deskripsi_pendek' => 'Stern esophagoesophagost',
          ),
          353 => 
          array (
            'kode' => '42.62',
            'deskripsi_panjang' => 'Antesternal esophagogastrostomy',
            'deskripsi_pendek' => 'Stern esophagogastrostom',
          ),
          354 => 
          array (
            'kode' => '42.63',
            'deskripsi_panjang' => 'Antesternal esophageal anastomosis with interposition of small bowel',
            'deskripsi_pendek' => 'Stern sm bowel interpos',
          ),
          355 => 
          array (
            'kode' => '42.64',
            'deskripsi_panjang' => 'Other antesternal esophagoenterostomy',
            'deskripsi_pendek' => 'Stern esophagoenter NEC',
          ),
          356 => 
          array (
            'kode' => '42.65',
            'deskripsi_panjang' => 'Antesternal esophageal anastomosis with interposition of colon',
            'deskripsi_pendek' => 'Stern lg bowel interpos',
          ),
          357 => 
          array (
            'kode' => '42.66',
            'deskripsi_panjang' => 'Other antesternal esophagocolostomy',
            'deskripsi_pendek' => 'Stern esophagocolos NEC',
          ),
          358 => 
          array (
            'kode' => '42.68',
            'deskripsi_panjang' => 'Other antesternal esophageal anastomosis with interposition',
            'deskripsi_pendek' => 'Stern interposition NEC',
          ),
          359 => 
          array (
            'kode' => '42.69',
            'deskripsi_panjang' => 'Other antesternal anastomosis of esophagus',
            'deskripsi_pendek' => 'Stern esophag anast NEC',
          ),
          360 => 
          array (
            'kode' => '42.7',
            'deskripsi_panjang' => 'Esophagomyotomy',
            'deskripsi_pendek' => 'Esophagomyotomy',
          ),
          361 => 
          array (
            'kode' => '42.81',
            'deskripsi_panjang' => 'Insertion of permanent tube into esophagus',
            'deskripsi_pendek' => 'Insert perm tube esophag',
          ),
          362 => 
          array (
            'kode' => '42.82',
            'deskripsi_panjang' => 'Suture of laceration of esophagus',
            'deskripsi_pendek' => 'Suture esophageal lacer',
          ),
          363 => 
          array (
            'kode' => '42.83',
            'deskripsi_panjang' => 'Closure of esophagostomy',
            'deskripsi_pendek' => 'Esophagostomy closure',
          ),
          364 => 
          array (
            'kode' => '42.84',
            'deskripsi_panjang' => 'Repair of esophageal fistula, not elsewhere classified',
            'deskripsi_pendek' => 'Esoph fistula repair NEC',
          ),
          365 => 
          array (
            'kode' => '42.85',
            'deskripsi_panjang' => 'Repair of esophageal stricture',
            'deskripsi_pendek' => 'Esophag stricture repair',
          ),
          366 => 
          array (
            'kode' => '42.86',
            'deskripsi_panjang' => 'Production of subcutaneous tunnel without esophageal anastomosis',
            'deskripsi_pendek' => 'Prod subq tunnel no anas',
          ),
          367 => 
          array (
            'kode' => '42.87',
            'deskripsi_panjang' => 'Other graft of esophagus',
            'deskripsi_pendek' => 'Esophageal graft NEC',
          ),
          368 => 
          array (
            'kode' => '42.89',
            'deskripsi_panjang' => 'Other repair of esophagus',
            'deskripsi_pendek' => 'Esophageal repair NEC',
          ),
          369 => 
          array (
            'kode' => '42.91',
            'deskripsi_panjang' => 'Ligation of esophageal varices',
            'deskripsi_pendek' => 'Ligation esoph varix',
          ),
          370 => 
          array (
            'kode' => '42.92',
            'deskripsi_panjang' => 'Dilation of esophagus',
            'deskripsi_pendek' => 'Esophageal dilation',
          ),
          371 => 
          array (
            'kode' => '42.99',
            'deskripsi_panjang' => 'Other operations on esophagus',
            'deskripsi_pendek' => 'Esophageal operation NEC',
          ),
          372 => 
          array (
            'kode' => '43.0',
            'deskripsi_panjang' => 'Gastrotomy',
            'deskripsi_pendek' => 'Gastrotomy',
          ),
          373 => 
          array (
            'kode' => '43.11',
            'deskripsi_panjang' => 'Percutaneous [endoscopic] gastrostomy [PEG]',
            'deskripsi_pendek' => 'Percu endosc gastrostomy',
          ),
          374 => 
          array (
            'kode' => '43.19',
            'deskripsi_panjang' => 'Other gastrostomy',
            'deskripsi_pendek' => 'Other gastrostomy',
          ),
          375 => 
          array (
            'kode' => '43.3',
            'deskripsi_panjang' => 'Pyloromyotomy',
            'deskripsi_pendek' => 'Pyloromyotomy',
          ),
          376 => 
          array (
            'kode' => '43.41',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion or tissue of stomach',
            'deskripsi_pendek' => 'Endosc destr stomach les',
          ),
          377 => 
          array (
            'kode' => '43.42',
            'deskripsi_panjang' => 'Local excision of other lesion or tissue of stomach',
            'deskripsi_pendek' => 'Local gastr excision NEC',
          ),
          378 => 
          array (
            'kode' => '43.49',
            'deskripsi_panjang' => 'Other destruction of lesion or tissue of stomach',
            'deskripsi_pendek' => 'Local gastr destruct NEC',
          ),
          379 => 
          array (
            'kode' => '43.5',
            'deskripsi_panjang' => 'Partial gastrectomy with anastomosis to esophagus',
            'deskripsi_pendek' => 'Proximal gastrectomy',
          ),
          380 => 
          array (
            'kode' => '43.6',
            'deskripsi_panjang' => 'Partial gastrectomy with anastomosis to duodenum',
            'deskripsi_pendek' => 'Distal gastrectomy',
          ),
          381 => 
          array (
            'kode' => '43.7',
            'deskripsi_panjang' => 'Partial gastrectomy with anastomosis to jejunum',
            'deskripsi_pendek' => 'Part gastrec w jej anast',
          ),
          382 => 
          array (
            'kode' => '43.81',
            'deskripsi_panjang' => 'Partial gastrectomy with jejunal transposition',
            'deskripsi_pendek' => 'Part gast w jej transpos',
          ),
          383 => 
          array (
            'kode' => '43.82',
            'deskripsi_panjang' => 'Laparoscopic vertical (sleeve) gastrectomy',
            'deskripsi_pendek' => 'Lap vertical gastrectomy',
          ),
          384 => 
          array (
            'kode' => '43.89',
            'deskripsi_panjang' => 'Open and other partial gastrectomy',
            'deskripsi_pendek' => 'Opn/oth part gastrectomy',
          ),
          385 => 
          array (
            'kode' => '43.91',
            'deskripsi_panjang' => 'Total gastrectomy with intestinal interposition',
            'deskripsi_pendek' => 'Tot gast w intes interpo',
          ),
          386 => 
          array (
            'kode' => '43.99',
            'deskripsi_panjang' => 'Other total gastrectomy',
            'deskripsi_pendek' => 'Total gastrectomy NEC',
          ),
          387 => 
          array (
            'kode' => '44.00',
            'deskripsi_panjang' => 'Vagotomy, not otherwise specified',
            'deskripsi_pendek' => 'Vagotomy NOS',
          ),
          388 => 
          array (
            'kode' => '44.01',
            'deskripsi_panjang' => 'Truncal vagotomy',
            'deskripsi_pendek' => 'Truncal vagotomy',
          ),
          389 => 
          array (
            'kode' => '44.02',
            'deskripsi_panjang' => 'Highly selective vagotomy',
            'deskripsi_pendek' => 'Highly select vagotomy',
          ),
          390 => 
          array (
            'kode' => '44.03',
            'deskripsi_panjang' => 'Other selective vagotomy',
            'deskripsi_pendek' => 'Selective vagotomy NEC',
          ),
          391 => 
          array (
            'kode' => '44.11',
            'deskripsi_panjang' => 'Transabdominal gastroscopy',
            'deskripsi_pendek' => 'Transabdomin gastroscopy',
          ),
          392 => 
          array (
            'kode' => '44.12',
            'deskripsi_panjang' => 'Gastroscopy through artificial stoma',
            'deskripsi_pendek' => 'Gastroscopy thru stoma',
          ),
          393 => 
          array (
            'kode' => '44.13',
            'deskripsi_panjang' => 'Other gastroscopy',
            'deskripsi_pendek' => 'Gastroscopy NEC',
          ),
          394 => 
          array (
            'kode' => '44.14',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of stomach',
            'deskripsi_pendek' => 'Closed gastric biopsy',
          ),
          395 => 
          array (
            'kode' => '44.15',
            'deskripsi_panjang' => 'Open biopsy of stomach',
            'deskripsi_pendek' => 'Open gastric biopsy',
          ),
          396 => 
          array (
            'kode' => '44.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on stomach',
            'deskripsi_pendek' => 'Gastric diagnos proc NEC',
          ),
          397 => 
          array (
            'kode' => '44.21',
            'deskripsi_panjang' => 'Dilation of pylorus by incision',
            'deskripsi_pendek' => 'Dilate pylorus, incision',
          ),
          398 => 
          array (
            'kode' => '44.22',
            'deskripsi_panjang' => 'Endoscopic dilation of pylorus',
            'deskripsi_pendek' => 'Endoscop dilate pylorus',
          ),
          399 => 
          array (
            'kode' => '44.29',
            'deskripsi_panjang' => 'Other pyloroplasty',
            'deskripsi_pendek' => 'Other pyloroplasty',
          ),
          400 => 
          array (
            'kode' => '44.31',
            'deskripsi_panjang' => 'High gastric bypass',
            'deskripsi_pendek' => 'High gastric bypass',
          ),
          401 => 
          array (
            'kode' => '44.32',
            'deskripsi_panjang' => 'Percutaneous [endoscopic] gastrojejunostomy',
            'deskripsi_pendek' => 'Percu gastrojejunostomy',
          ),
          402 => 
          array (
            'kode' => '44.38',
            'deskripsi_panjang' => 'Laparoscopic gastroenterostomy',
            'deskripsi_pendek' => 'Lap gastroenterostomy',
          ),
          403 => 
          array (
            'kode' => '44.39',
            'deskripsi_panjang' => 'Other gastroenterostomy without gastrectomy',
            'deskripsi_pendek' => 'Gastroenterostomy NEC',
          ),
          404 => 
          array (
            'kode' => '44.40',
            'deskripsi_panjang' => 'Suture of peptic ulcer, not otherwise specified',
            'deskripsi_pendek' => 'Suture peptic ulcer NOS',
          ),
          405 => 
          array (
            'kode' => '44.41',
            'deskripsi_panjang' => 'Suture of gastric ulcer site',
            'deskripsi_pendek' => 'Sut gastric ulcer site',
          ),
          406 => 
          array (
            'kode' => '44.42',
            'deskripsi_panjang' => 'Suture of duodenal ulcer site',
            'deskripsi_pendek' => 'Suture duoden ulcer site',
          ),
          407 => 
          array (
            'kode' => '44.43',
            'deskripsi_panjang' => 'Endoscopic control of gastric or duodenal bleeding',
            'deskripsi_pendek' => 'Endosc control gast hem',
          ),
          408 => 
          array (
            'kode' => '44.44',
            'deskripsi_panjang' => 'Transcatheter embolization for gastric or duodenal bleeding',
            'deskripsi_pendek' => 'Transcath embo gast hem',
          ),
          409 => 
          array (
            'kode' => '44.49',
            'deskripsi_panjang' => 'Other control of hemorrhage of stomach or duodenum',
            'deskripsi_pendek' => 'Other control gast hem',
          ),
          410 => 
          array (
            'kode' => '44.5',
            'deskripsi_panjang' => 'Revision of gastric anastomosis',
            'deskripsi_pendek' => 'Revision gastric anastom',
          ),
          411 => 
          array (
            'kode' => '44.61',
            'deskripsi_panjang' => 'Suture of laceration of stomach',
            'deskripsi_pendek' => 'Suture gastric lacerat',
          ),
          412 => 
          array (
            'kode' => '44.62',
            'deskripsi_panjang' => 'Closure of gastrostomy',
            'deskripsi_pendek' => 'Gastrostomy closure',
          ),
          413 => 
          array (
            'kode' => '44.63',
            'deskripsi_panjang' => 'Closure of other gastric fistula',
            'deskripsi_pendek' => 'Close gastric fistul NEC',
          ),
          414 => 
          array (
            'kode' => '44.64',
            'deskripsi_panjang' => 'Gastropexy',
            'deskripsi_pendek' => 'Gastropexy',
          ),
          415 => 
          array (
            'kode' => '44.65',
            'deskripsi_panjang' => 'Esophagogastroplasty',
            'deskripsi_pendek' => 'Esophagogastroplasty',
          ),
          416 => 
          array (
            'kode' => '44.66',
            'deskripsi_panjang' => 'Other procedures for creation of esophagogastric sphincteric competence',
            'deskripsi_pendek' => 'Creat esophagastr sphinc',
          ),
          417 => 
          array (
            'kode' => '44.67',
            'deskripsi_panjang' => 'Laparoscopic procedures for creation of esophagogastric sphincteric competence',
            'deskripsi_pendek' => 'Lap creat esoph sphinct',
          ),
          418 => 
          array (
            'kode' => '44.68',
            'deskripsi_panjang' => 'Laparoscopic gastroplasty',
            'deskripsi_pendek' => 'Laparoscop gastroplasty',
          ),
          419 => 
          array (
            'kode' => '44.69',
            'deskripsi_panjang' => 'Other repair of stomach',
            'deskripsi_pendek' => 'Gastric repair NEC',
          ),
          420 => 
          array (
            'kode' => '44.91',
            'deskripsi_panjang' => 'Ligation of gastric varices',
            'deskripsi_pendek' => 'Ligate gastric varices',
          ),
          421 => 
          array (
            'kode' => '44.92',
            'deskripsi_panjang' => 'Intraoperative manipulation of stomach',
            'deskripsi_pendek' => 'Intraop gastric manipul',
          ),
          422 => 
          array (
            'kode' => '44.93',
            'deskripsi_panjang' => 'Insertion of gastric bubble (balloon)',
            'deskripsi_pendek' => 'Insert gastric bubble',
          ),
          423 => 
          array (
            'kode' => '44.94',
            'deskripsi_panjang' => 'Removal of gastric bubble (balloon)',
            'deskripsi_pendek' => 'Remove gastric bubble',
          ),
          424 => 
          array (
            'kode' => '44.95',
            'deskripsi_panjang' => 'Laparoscopic gastric restrictive procedure',
            'deskripsi_pendek' => 'Lap gastric restric proc',
          ),
          425 => 
          array (
            'kode' => '44.96',
            'deskripsi_panjang' => 'Laparoscopic revision of gastric restrictive procedure',
            'deskripsi_pendek' => 'Lap rev gast restri proc',
          ),
          426 => 
          array (
            'kode' => '44.97',
            'deskripsi_panjang' => 'Laparoscopic removal of gastric restrictive device(s)',
            'deskripsi_pendek' => 'Lap rem gast restric dev',
          ),
          427 => 
          array (
            'kode' => '44.98',
            'deskripsi_panjang' => '(Laparoscopic) adjustment of size of adjustable gastric restrictive device',
            'deskripsi_pendek' => 'Adjust gast restrict dev',
          ),
          428 => 
          array (
            'kode' => '44.99',
            'deskripsi_panjang' => 'Other operations on stomach',
            'deskripsi_pendek' => 'Gastric operation NEC',
          ),
          429 => 
          array (
            'kode' => '45.00',
            'deskripsi_panjang' => 'Incision of intestine, not otherwise specified',
            'deskripsi_pendek' => 'Intestinal incision NOS',
          ),
          430 => 
          array (
            'kode' => '45.01',
            'deskripsi_panjang' => 'Incision of duodenum',
            'deskripsi_pendek' => 'Duodenal incision',
          ),
          431 => 
          array (
            'kode' => '45.02',
            'deskripsi_panjang' => 'Other incision of small intestine',
            'deskripsi_pendek' => 'Small bowel incision NEC',
          ),
          432 => 
          array (
            'kode' => '45.03',
            'deskripsi_panjang' => 'Incision of large intestine',
            'deskripsi_pendek' => 'Large bowel incision',
          ),
          433 => 
          array (
            'kode' => '45.11',
            'deskripsi_panjang' => 'Transabdominal endoscopy of small intestine',
            'deskripsi_pendek' => 'Transab sm bowel endosc',
          ),
          434 => 
          array (
            'kode' => '45.12',
            'deskripsi_panjang' => 'Endoscopy of small intestine through artificial stoma',
            'deskripsi_pendek' => 'Endosc sm bowel thru st',
          ),
          435 => 
          array (
            'kode' => '45.13',
            'deskripsi_panjang' => 'Other endoscopy of small intestine',
            'deskripsi_pendek' => 'Sm bowel endoscopy NEC',
          ),
          436 => 
          array (
            'kode' => '45.14',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of small intestine',
            'deskripsi_pendek' => 'Clos small bowel biopsy',
          ),
          437 => 
          array (
            'kode' => '45.15',
            'deskripsi_panjang' => 'Open biopsy of small intestine',
            'deskripsi_pendek' => 'Open small bowel biopsy',
          ),
          438 => 
          array (
            'kode' => '45.16',
            'deskripsi_panjang' => 'Esophagogastroduodenoscopy [EGD] with closed biopsy',
            'deskripsi_pendek' => 'Egd with closed biopsy',
          ),
          439 => 
          array (
            'kode' => '45.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on small intestine',
            'deskripsi_pendek' => 'Sm bowel dx proc NEC',
          ),
          440 => 
          array (
            'kode' => '45.21',
            'deskripsi_panjang' => 'Transabdominal endoscopy of large intestine',
            'deskripsi_pendek' => 'Transab lg bowel endosc',
          ),
          441 => 
          array (
            'kode' => '45.22',
            'deskripsi_panjang' => 'Endoscopy of large intestine through artificial stoma',
            'deskripsi_pendek' => 'Endosc lg bowel thru st',
          ),
          442 => 
          array (
            'kode' => '45.23',
            'deskripsi_panjang' => 'Colonoscopy',
            'deskripsi_pendek' => 'Colonoscopy',
          ),
          443 => 
          array (
            'kode' => '45.24',
            'deskripsi_panjang' => 'Flexible sigmoidoscopy',
            'deskripsi_pendek' => 'Flexible sigmoidoscopy',
          ),
          444 => 
          array (
            'kode' => '45.25',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of large intestine',
            'deskripsi_pendek' => 'Clos large bowel biopsy',
          ),
          445 => 
          array (
            'kode' => '45.26',
            'deskripsi_panjang' => 'Open biopsy of large intestine',
            'deskripsi_pendek' => 'Open large bowel biopsy',
          ),
          446 => 
          array (
            'kode' => '45.27',
            'deskripsi_panjang' => 'Intestinal biopsy, site unspecified',
            'deskripsi_pendek' => 'Intestinal biopsy NOS',
          ),
          447 => 
          array (
            'kode' => '45.28',
            'deskripsi_panjang' => 'Other diagnostic procedures on large intestine',
            'deskripsi_pendek' => 'Lg bowel dx proced NEC',
          ),
          448 => 
          array (
            'kode' => '45.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on intestine, site unspecified',
            'deskripsi_pendek' => 'Bowel diagnost proc NEC',
          ),
          449 => 
          array (
            'kode' => '45.30',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion of duodenum',
            'deskripsi_pendek' => 'Endosc destru duoden les',
          ),
          450 => 
          array (
            'kode' => '45.31',
            'deskripsi_panjang' => 'Other local excision of lesion of duodenum',
            'deskripsi_pendek' => 'Oth excise duodenum les',
          ),
          451 => 
          array (
            'kode' => '45.32',
            'deskripsi_panjang' => 'Other destruction of lesion of duodenum',
            'deskripsi_pendek' => 'Destruct duoden les NEC',
          ),
          452 => 
          array (
            'kode' => '45.33',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of small intestine, except duodenum',
            'deskripsi_pendek' => 'Local excis sm bowel NEC',
          ),
          453 => 
          array (
            'kode' => '45.34',
            'deskripsi_panjang' => 'Other destruction of lesion of small intestine, except duodenum',
            'deskripsi_pendek' => 'Destr sm bowel les NEC',
          ),
          454 => 
          array (
            'kode' => '45.41',
            'deskripsi_panjang' => 'Excision of lesion or tissue of large intestine',
            'deskripsi_pendek' => 'Excise lg intestine les',
          ),
          455 => 
          array (
            'kode' => '45.42',
            'deskripsi_panjang' => 'Endoscopic polypectomy of large intestine',
            'deskripsi_pendek' => 'Endo polpectomy lrge int',
          ),
          456 => 
          array (
            'kode' => '45.43',
            'deskripsi_panjang' => 'Endoscopic destruction of other lesion or tissue of large intestine',
            'deskripsi_pendek' => 'Endosc destru lg int les',
          ),
          457 => 
          array (
            'kode' => '45.49',
            'deskripsi_panjang' => 'Other destruction of lesion of large intestine',
            'deskripsi_pendek' => 'Destruc lg bowel les NEC',
          ),
          458 => 
          array (
            'kode' => '45.50',
            'deskripsi_panjang' => 'Isolation of intestinal segment, not otherwise specified',
            'deskripsi_pendek' => 'Intest seg isolat NOS',
          ),
          459 => 
          array (
            'kode' => '45.51',
            'deskripsi_panjang' => 'Isolation of segment of small intestine',
            'deskripsi_pendek' => 'Sm bowel segment isolat',
          ),
          460 => 
          array (
            'kode' => '45.52',
            'deskripsi_panjang' => 'Isolation of segment of large intestine',
            'deskripsi_pendek' => 'Lg bowel segment isolat',
          ),
          461 => 
          array (
            'kode' => '45.61',
            'deskripsi_panjang' => 'Multiple segmental resection of small intestine',
            'deskripsi_pendek' => 'Mult seg sm bowel excis',
          ),
          462 => 
          array (
            'kode' => '45.62',
            'deskripsi_panjang' => 'Other partial resection of small intestine',
            'deskripsi_pendek' => 'Part sm bowel resect NEC',
          ),
          463 => 
          array (
            'kode' => '45.63',
            'deskripsi_panjang' => 'Total removal of small intestine',
            'deskripsi_pendek' => 'Total removal sm bowel',
          ),
          464 => 
          array (
            'kode' => '45.71',
            'deskripsi_panjang' => 'Open and other multiple segmental resection of large intestine',
            'deskripsi_pendek' => 'Opn mul seg lg intes NEC',
          ),
          465 => 
          array (
            'kode' => '45.72',
            'deskripsi_panjang' => 'Open and other cecectomy',
            'deskripsi_pendek' => 'Open cecectomy NEC',
          ),
          466 => 
          array (
            'kode' => '45.73',
            'deskripsi_panjang' => 'Open and other right hemicolectomy',
            'deskripsi_pendek' => 'Opn rt hemicolectomy NEC',
          ),
          467 => 
          array (
            'kode' => '45.74',
            'deskripsi_panjang' => 'Open and other resection of transverse colon',
            'deskripsi_pendek' => 'Opn transv colon res NEC',
          ),
          468 => 
          array (
            'kode' => '45.75',
            'deskripsi_panjang' => 'Open and other left hemicolectomy',
            'deskripsi_pendek' => 'Opn lft hemicolectmy NEC',
          ),
          469 => 
          array (
            'kode' => '45.76',
            'deskripsi_panjang' => 'Open and other sigmoidectomy',
            'deskripsi_pendek' => 'Open sigmoidectomy NEC',
          ),
          470 => 
          array (
            'kode' => '45.79',
            'deskripsi_panjang' => 'Other and unspecified partial excision of large intestine',
            'deskripsi_pendek' => 'Prt lg intes exc NEC/NOS',
          ),
          471 => 
          array (
            'kode' => '45.81',
            'deskripsi_panjang' => 'Laparoscopic total intra-abdominal colectomy',
            'deskripsi_pendek' => 'Lap tot intr-ab colectmy',
          ),
          472 => 
          array (
            'kode' => '45.82',
            'deskripsi_panjang' => 'Open total intra-abdominal colectomy',
            'deskripsi_pendek' => 'Op tot intr-abd colectmy',
          ),
          473 => 
          array (
            'kode' => '45.83',
            'deskripsi_panjang' => 'Other and unspecified total intra-abdominal colectomy',
            'deskripsi_pendek' => 'Tot abd colectmy NEC/NOS',
          ),
          474 => 
          array (
            'kode' => '45.90',
            'deskripsi_panjang' => 'Intestinal anastomosis, not otherwise specified',
            'deskripsi_pendek' => 'Intestinal anastom NOS',
          ),
          475 => 
          array (
            'kode' => '45.91',
            'deskripsi_panjang' => 'Small-to-small intestinal anastomosis',
            'deskripsi_pendek' => 'Sm-to-sm bowel anastom',
          ),
          476 => 
          array (
            'kode' => '45.92',
            'deskripsi_panjang' => 'Anastomosis of small intestine to rectal stump',
            'deskripsi_pendek' => 'Sm bowel-rect stump anas',
          ),
          477 => 
          array (
            'kode' => '45.93',
            'deskripsi_panjang' => 'Other small-to-large intestinal anastomosis',
            'deskripsi_pendek' => 'Small-to-large bowel NEC',
          ),
          478 => 
          array (
            'kode' => '45.94',
            'deskripsi_panjang' => 'Large-to-large intestinal anastomosis',
            'deskripsi_pendek' => 'Lg-to-lg bowel anastom',
          ),
          479 => 
          array (
            'kode' => '45.95',
            'deskripsi_panjang' => 'Anastomosis to anus',
            'deskripsi_pendek' => 'Anal anastomosis',
          ),
          480 => 
          array (
            'kode' => '46.01',
            'deskripsi_panjang' => 'Exteriorization of small intestine',
            'deskripsi_pendek' => 'Sm bowel exteriorization',
          ),
          481 => 
          array (
            'kode' => '46.02',
            'deskripsi_panjang' => 'Resection of exteriorized segment of small intestine',
            'deskripsi_pendek' => 'Resect ext seg sm bowel',
          ),
          482 => 
          array (
            'kode' => '46.03',
            'deskripsi_panjang' => 'Exteriorization of large intestine',
            'deskripsi_pendek' => 'Lg bowel exteriorization',
          ),
          483 => 
          array (
            'kode' => '46.04',
            'deskripsi_panjang' => 'Resection of exteriorized segment of large intestine',
            'deskripsi_pendek' => 'Resect ext seg lg bowel',
          ),
          484 => 
          array (
            'kode' => '46.10',
            'deskripsi_panjang' => 'Colostomy, not otherwise specified',
            'deskripsi_pendek' => 'Colostomy NOS',
          ),
          485 => 
          array (
            'kode' => '46.11',
            'deskripsi_panjang' => 'Temporary colostomy',
            'deskripsi_pendek' => 'Temporary colostomy',
          ),
          486 => 
          array (
            'kode' => '46.13',
            'deskripsi_panjang' => 'Permanent colostomy',
            'deskripsi_pendek' => 'Permanent colostomy',
          ),
          487 => 
          array (
            'kode' => '46.14',
            'deskripsi_panjang' => 'Delayed opening of colostomy',
            'deskripsi_pendek' => 'Delay opening colostomy',
          ),
          488 => 
          array (
            'kode' => '46.20',
            'deskripsi_panjang' => 'Ileostomy, not otherwise specified',
            'deskripsi_pendek' => 'Ileostomy NOS',
          ),
          489 => 
          array (
            'kode' => '46.21',
            'deskripsi_panjang' => 'Temporary ileostomy',
            'deskripsi_pendek' => 'Temporary ileostomy',
          ),
          490 => 
          array (
            'kode' => '46.22',
            'deskripsi_panjang' => 'Continent ileostomy',
            'deskripsi_pendek' => 'Continent ileostomy',
          ),
          491 => 
          array (
            'kode' => '46.23',
            'deskripsi_panjang' => 'Other permanent ileostomy',
            'deskripsi_pendek' => 'Permanent ileostomy NEC',
          ),
          492 => 
          array (
            'kode' => '46.24',
            'deskripsi_panjang' => 'Delayed opening of ileostomy',
            'deskripsi_pendek' => 'Delay opening ileostomy',
          ),
          493 => 
          array (
            'kode' => '46.31',
            'deskripsi_panjang' => 'Delayed opening of other enterostomy',
            'deskripsi_pendek' => 'Delay opening enterostom',
          ),
          494 => 
          array (
            'kode' => '46.32',
            'deskripsi_panjang' => 'Percutaneous (endoscopic) jejunostomy [PEJ]',
            'deskripsi_pendek' => 'Percu endosc jejunostomy',
          ),
          495 => 
          array (
            'kode' => '46.39',
            'deskripsi_panjang' => 'Other enterostomy',
            'deskripsi_pendek' => 'Enterostomy NEC',
          ),
          496 => 
          array (
            'kode' => '46.40',
            'deskripsi_panjang' => 'Revision of intestinal stoma, not otherwise specified',
            'deskripsi_pendek' => 'Intest stoma revis NOS',
          ),
          497 => 
          array (
            'kode' => '46.41',
            'deskripsi_panjang' => 'Revision of stoma of small intestine',
            'deskripsi_pendek' => 'Sm bowel stoma revision',
          ),
          498 => 
          array (
            'kode' => '46.42',
            'deskripsi_panjang' => 'Repair of pericolostomy hernia',
            'deskripsi_pendek' => 'Pericolost hernia repair',
          ),
          499 => 
          array (
            'kode' => '46.43',
            'deskripsi_panjang' => 'Other revision of stoma of large intestine',
            'deskripsi_pendek' => 'Lg bowel stoma revis NEC',
          ),
        ));
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '46.50',
            'deskripsi_panjang' => 'Closure of intestinal stoma, not otherwise specified',
            'deskripsi_pendek' => 'Intest stoma closure NOS',
          ),
          1 => 
          array (
            'kode' => '46.51',
            'deskripsi_panjang' => 'Closure of stoma of small intestine',
            'deskripsi_pendek' => 'Sm bowel stoma closure',
          ),
          2 => 
          array (
            'kode' => '46.52',
            'deskripsi_panjang' => 'Closure of stoma of large intestine',
            'deskripsi_pendek' => 'Lg bowel stoma closure',
          ),
          3 => 
          array (
            'kode' => '46.60',
            'deskripsi_panjang' => 'Fixation of intestine, not otherwise specified',
            'deskripsi_pendek' => 'Intestinal fixation NOS',
          ),
          4 => 
          array (
            'kode' => '46.61',
            'deskripsi_panjang' => 'Fixation of small intestine to abdominal wall',
            'deskripsi_pendek' => 'Sm bowel-abd wall fixat',
          ),
          5 => 
          array (
            'kode' => '46.62',
            'deskripsi_panjang' => 'Other fixation of small intestine',
            'deskripsi_pendek' => 'Small bowel fixation NEC',
          ),
          6 => 
          array (
            'kode' => '46.63',
            'deskripsi_panjang' => 'Fixation of large intestine to abdominal wall',
            'deskripsi_pendek' => 'Lg bowel-abd wall fixat',
          ),
          7 => 
          array (
            'kode' => '46.64',
            'deskripsi_panjang' => 'Other fixation of large intestine',
            'deskripsi_pendek' => 'Large bowel fixation NEC',
          ),
          8 => 
          array (
            'kode' => '46.71',
            'deskripsi_panjang' => 'Suture of laceration of duodenum',
            'deskripsi_pendek' => 'Duodenal lacerat suture',
          ),
          9 => 
          array (
            'kode' => '46.72',
            'deskripsi_panjang' => 'Closure of fistula of duodenum',
            'deskripsi_pendek' => 'Duodenal fistula closure',
          ),
          10 => 
          array (
            'kode' => '46.73',
            'deskripsi_panjang' => 'Suture of laceration of small intestine, except duodenum',
            'deskripsi_pendek' => 'Small bowel suture NEC',
          ),
          11 => 
          array (
            'kode' => '46.74',
            'deskripsi_panjang' => 'Closure of fistula of small intestine, except duodenum',
            'deskripsi_pendek' => 'Close sm bowel fist NEC',
          ),
          12 => 
          array (
            'kode' => '46.75',
            'deskripsi_panjang' => 'Suture of laceration of large intestine',
            'deskripsi_pendek' => 'Suture lg bowel lacerat',
          ),
          13 => 
          array (
            'kode' => '46.76',
            'deskripsi_panjang' => 'Closure of fistula of large intestine',
            'deskripsi_pendek' => 'Close lg bowel fistula',
          ),
          14 => 
          array (
            'kode' => '46.79',
            'deskripsi_panjang' => 'Other repair of intestine',
            'deskripsi_pendek' => 'Repair of intestine NEC',
          ),
          15 => 
          array (
            'kode' => '46.80',
            'deskripsi_panjang' => 'Intra-abdominal manipulation of intestine, not otherwise specified',
            'deskripsi_pendek' => 'Intra-ab bowel manip NOS',
          ),
          16 => 
          array (
            'kode' => '46.81',
            'deskripsi_panjang' => 'Intra-abdominal manipulation of small intestine',
            'deskripsi_pendek' => 'Intra-abd sm bowel manip',
          ),
          17 => 
          array (
            'kode' => '46.82',
            'deskripsi_panjang' => 'Intra-abdominal manipulation of large intestine',
            'deskripsi_pendek' => 'Intra-abd lg bowel manip',
          ),
          18 => 
          array (
            'kode' => '46.85',
            'deskripsi_panjang' => 'Dilation of intestine',
            'deskripsi_pendek' => 'Dilation of intestine',
          ),
          19 => 
          array (
            'kode' => '46.86',
            'deskripsi_panjang' => 'Endoscopic insertion of colonic stent(s)',
            'deskripsi_pendek' => 'Endo insrt colonic stent',
          ),
          20 => 
          array (
            'kode' => '46.87',
            'deskripsi_panjang' => 'Other insertion of colonic stent(s)',
            'deskripsi_pendek' => 'Insert colonic stent NEC',
          ),
          21 => 
          array (
            'kode' => '46.91',
            'deskripsi_panjang' => 'Myotomy of sigmoid colon',
            'deskripsi_pendek' => 'Myotomy of sigmoid colon',
          ),
          22 => 
          array (
            'kode' => '46.92',
            'deskripsi_panjang' => 'Myotomy of other parts of colon',
            'deskripsi_pendek' => 'Myotomy of colon NEC',
          ),
          23 => 
          array (
            'kode' => '46.93',
            'deskripsi_panjang' => 'Revision of anastomosis of small intestine',
            'deskripsi_pendek' => 'Revise sm bowel anastom',
          ),
          24 => 
          array (
            'kode' => '46.94',
            'deskripsi_panjang' => 'Revision of anastomosis of large intestine',
            'deskripsi_pendek' => 'Revise lg bowel anastom',
          ),
          25 => 
          array (
            'kode' => '46.95',
            'deskripsi_panjang' => 'Local perfusion of small intestine',
            'deskripsi_pendek' => 'Local sm bowel perfusion',
          ),
          26 => 
          array (
            'kode' => '46.96',
            'deskripsi_panjang' => 'Local perfusion of large intestine',
            'deskripsi_pendek' => 'Local lg bowel perfusion',
          ),
          27 => 
          array (
            'kode' => '46.97',
            'deskripsi_panjang' => 'Transplant of intestine',
            'deskripsi_pendek' => 'Transplant of intestine',
          ),
          28 => 
          array (
            'kode' => '46.99',
            'deskripsi_panjang' => 'Other operations on intestines',
            'deskripsi_pendek' => 'Intestinal op NEC',
          ),
          29 => 
          array (
            'kode' => '47.01',
            'deskripsi_panjang' => 'Laparoscopic appendectomy',
            'deskripsi_pendek' => 'Lap appendectomy',
          ),
          30 => 
          array (
            'kode' => '47.09',
            'deskripsi_panjang' => 'Other appendectomy',
            'deskripsi_pendek' => 'Other appendectomy',
          ),
          31 => 
          array (
            'kode' => '47.11',
            'deskripsi_panjang' => 'Laparoscopic incidental appendectomy',
            'deskripsi_pendek' => 'Lap incid appendectomy',
          ),
          32 => 
          array (
            'kode' => '47.19',
            'deskripsi_panjang' => 'Other incidental appendectomy',
            'deskripsi_pendek' => 'Other incid appendectomy',
          ),
          33 => 
          array (
            'kode' => '47.2',
            'deskripsi_panjang' => 'Drainage of appendiceal abscess',
            'deskripsi_pendek' => 'Drain appendiceal absc',
          ),
          34 => 
          array (
            'kode' => '47.91',
            'deskripsi_panjang' => 'Appendicostomy',
            'deskripsi_pendek' => 'Appendicostomy',
          ),
          35 => 
          array (
            'kode' => '47.92',
            'deskripsi_panjang' => 'Closure of appendiceal fistula',
            'deskripsi_pendek' => 'Close appendiceal fistul',
          ),
          36 => 
          array (
            'kode' => '47.99',
            'deskripsi_panjang' => 'Other operations on appendix',
            'deskripsi_pendek' => 'Appendiceal ops NEC',
          ),
          37 => 
          array (
            'kode' => '48.0',
            'deskripsi_panjang' => 'Proctotomy',
            'deskripsi_pendek' => 'Proctotomy',
          ),
          38 => 
          array (
            'kode' => '48.1',
            'deskripsi_panjang' => 'Proctostomy',
            'deskripsi_pendek' => 'Proctostomy',
          ),
          39 => 
          array (
            'kode' => '48.21',
            'deskripsi_panjang' => 'Transabdominal proctosigmoidoscopy',
            'deskripsi_pendek' => 'Transab proctosigmoidosc',
          ),
          40 => 
          array (
            'kode' => '48.22',
            'deskripsi_panjang' => 'Proctosigmoidoscopy through artificial stoma',
            'deskripsi_pendek' => 'Proctosigmoidosc thru st',
          ),
          41 => 
          array (
            'kode' => '48.23',
            'deskripsi_panjang' => 'Rigid proctosigmoidoscopy',
            'deskripsi_pendek' => 'Rigid proctosigmoidoscpy',
          ),
          42 => 
          array (
            'kode' => '48.24',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of rectum',
            'deskripsi_pendek' => 'Closed rectal biopsy',
          ),
          43 => 
          array (
            'kode' => '48.25',
            'deskripsi_panjang' => 'Open biopsy of rectum',
            'deskripsi_pendek' => 'Open rectal biopsy',
          ),
          44 => 
          array (
            'kode' => '48.26',
            'deskripsi_panjang' => 'Biopsy of perirectal tissue',
            'deskripsi_pendek' => 'Perirectal tissue biopsy',
          ),
          45 => 
          array (
            'kode' => '48.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on rectum, rectosigmoid and perirectal tissue',
            'deskripsi_pendek' => 'Rect/perirect dx op NEC',
          ),
          46 => 
          array (
            'kode' => '48.31',
            'deskripsi_panjang' => 'Radical electrocoagulation of rectal lesion or tissue',
            'deskripsi_pendek' => 'Rad electrocoag-rect les',
          ),
          47 => 
          array (
            'kode' => '48.32',
            'deskripsi_panjang' => 'Other electrocoagulation of rectal lesion or tissue',
            'deskripsi_pendek' => 'Electrocoag rect les NEC',
          ),
          48 => 
          array (
            'kode' => '48.33',
            'deskripsi_panjang' => 'Destruction of rectal lesion or tissue by laser',
            'deskripsi_pendek' => 'Laser destruc rectal les',
          ),
          49 => 
          array (
            'kode' => '48.34',
            'deskripsi_panjang' => 'Destruction of rectal lesion or tissue by cryosurgery',
            'deskripsi_pendek' => 'Cryosurg destr rect les',
          ),
          50 => 
          array (
            'kode' => '48.35',
            'deskripsi_panjang' => 'Local excision of rectal lesion or tissue',
            'deskripsi_pendek' => 'Local excis rectal les',
          ),
          51 => 
          array (
            'kode' => '48.36',
            'deskripsi_panjang' => '[Endoscopic] polypectomy of rectum',
            'deskripsi_pendek' => 'Polypectomy of rectum',
          ),
          52 => 
          array (
            'kode' => '48.40',
            'deskripsi_panjang' => 'Pull-through resection of rectum, not otherwise specified',
            'deskripsi_pendek' => 'Pull-thru res rectum NOS',
          ),
          53 => 
          array (
            'kode' => '48.41',
            'deskripsi_panjang' => 'Soave submucosal resection of rectum',
            'deskripsi_pendek' => 'Soave submuc rect resect',
          ),
          54 => 
          array (
            'kode' => '48.42',
            'deskripsi_panjang' => 'Laparoscopic pull-through resection of rectum',
            'deskripsi_pendek' => 'Lap pull-thru res rectum',
          ),
          55 => 
          array (
            'kode' => '48.43',
            'deskripsi_panjang' => 'Open pull-through resection of rectum',
            'deskripsi_pendek' => 'Opn pull-thru res rectum',
          ),
          56 => 
          array (
            'kode' => '48.49',
            'deskripsi_panjang' => 'Other pull-through resection of rectum',
            'deskripsi_pendek' => 'Pull-thru rect resec NEC',
          ),
          57 => 
          array (
            'kode' => '48.50',
            'deskripsi_panjang' => 'Abdominoperineal resection of the rectum, not otherwise specified',
            'deskripsi_pendek' => 'Abdperneal res rectm NOS',
          ),
          58 => 
          array (
            'kode' => '48.51',
            'deskripsi_panjang' => 'Laparoscopic abdominoperineal resection of the rectum',
            'deskripsi_pendek' => 'Lap abdperneal resc rec',
          ),
          59 => 
          array (
            'kode' => '48.52',
            'deskripsi_panjang' => 'Open abdominoperineal resection of the rectum',
            'deskripsi_pendek' => 'Opn abdperneal resc rec',
          ),
          60 => 
          array (
            'kode' => '48.59',
            'deskripsi_panjang' => 'Other abdominoperineal resection of the rectum',
            'deskripsi_pendek' => 'Abdperneal resc rect NEC',
          ),
          61 => 
          array (
            'kode' => '48.61',
            'deskripsi_panjang' => 'Transsacral rectosigmoidectomy',
            'deskripsi_pendek' => 'Transsac rectosigmoidect',
          ),
          62 => 
          array (
            'kode' => '48.62',
            'deskripsi_panjang' => 'Anterior resection of rectum with synchronous colostomy',
            'deskripsi_pendek' => 'Ant rect resect w colost',
          ),
          63 => 
          array (
            'kode' => '48.63',
            'deskripsi_panjang' => 'Other anterior resection of rectum',
            'deskripsi_pendek' => 'Anterior rect resect NEC',
          ),
          64 => 
          array (
            'kode' => '48.64',
            'deskripsi_panjang' => 'Posterior resection of rectum',
            'deskripsi_pendek' => 'Posterior rect resection',
          ),
          65 => 
          array (
            'kode' => '48.65',
            'deskripsi_panjang' => 'Duhamel resection of rectum',
            'deskripsi_pendek' => 'Duhamel rectal resection',
          ),
          66 => 
          array (
            'kode' => '48.69',
            'deskripsi_panjang' => 'Other resection of rectum',
            'deskripsi_pendek' => 'Rectal resection NEC',
          ),
          67 => 
          array (
            'kode' => '48.71',
            'deskripsi_panjang' => 'Suture of laceration of rectum',
            'deskripsi_pendek' => 'Suture of rectal lacer',
          ),
          68 => 
          array (
            'kode' => '48.72',
            'deskripsi_panjang' => 'Closure of proctostomy',
            'deskripsi_pendek' => 'Closure of proctostomy',
          ),
          69 => 
          array (
            'kode' => '48.73',
            'deskripsi_panjang' => 'Closure of other rectal fistula',
            'deskripsi_pendek' => 'Close rectal fist NEC',
          ),
          70 => 
          array (
            'kode' => '48.74',
            'deskripsi_panjang' => 'Rectorectostomy',
            'deskripsi_pendek' => 'Rectorectostomy',
          ),
          71 => 
          array (
            'kode' => '48.75',
            'deskripsi_panjang' => 'Abdominal proctopexy',
            'deskripsi_pendek' => 'Abdominal proctopexy',
          ),
          72 => 
          array (
            'kode' => '48.76',
            'deskripsi_panjang' => 'Other proctopexy',
            'deskripsi_pendek' => 'Proctopexy NEC',
          ),
          73 => 
          array (
            'kode' => '48.79',
            'deskripsi_panjang' => 'Other repair of rectum',
            'deskripsi_pendek' => 'Repair of rectum NEC',
          ),
          74 => 
          array (
            'kode' => '48.81',
            'deskripsi_panjang' => 'Incision of perirectal tissue',
            'deskripsi_pendek' => 'Perirectal incision',
          ),
          75 => 
          array (
            'kode' => '48.82',
            'deskripsi_panjang' => 'Excision of perirectal tissue',
            'deskripsi_pendek' => 'Perirectal excision',
          ),
          76 => 
          array (
            'kode' => '48.91',
            'deskripsi_panjang' => 'Incision of rectal stricture',
            'deskripsi_pendek' => 'Incis rectal stricture',
          ),
          77 => 
          array (
            'kode' => '48.92',
            'deskripsi_panjang' => 'Anorectal myectomy',
            'deskripsi_pendek' => 'Anorectal myomectomy',
          ),
          78 => 
          array (
            'kode' => '48.93',
            'deskripsi_panjang' => 'Repair of perirectal fistula',
            'deskripsi_pendek' => 'Repair perirect fistula',
          ),
          79 => 
          array (
            'kode' => '48.99',
            'deskripsi_panjang' => 'Other operations on rectum and perirectal tissue',
            'deskripsi_pendek' => 'Rectal perirect op NEC',
          ),
          80 => 
          array (
            'kode' => '49.01',
            'deskripsi_panjang' => 'Incision of perianal abscess',
            'deskripsi_pendek' => 'Incis perianal abscess',
          ),
          81 => 
          array (
            'kode' => '49.02',
            'deskripsi_panjang' => 'Other incision of perianal tissue',
            'deskripsi_pendek' => 'Perianal incision NEC',
          ),
          82 => 
          array (
            'kode' => '49.03',
            'deskripsi_panjang' => 'Excision of perianal skin tags',
            'deskripsi_pendek' => 'Excis perianal skin tag',
          ),
          83 => 
          array (
            'kode' => '49.04',
            'deskripsi_panjang' => 'Other excision of perianal tissue',
            'deskripsi_pendek' => 'Perianal excision NEC',
          ),
          84 => 
          array (
            'kode' => '49.11',
            'deskripsi_panjang' => 'Anal fistulotomy',
            'deskripsi_pendek' => 'Anal fistulotomy',
          ),
          85 => 
          array (
            'kode' => '49.12',
            'deskripsi_panjang' => 'Anal fistulectomy',
            'deskripsi_pendek' => 'Anal fistulectomy',
          ),
          86 => 
          array (
            'kode' => '49.21',
            'deskripsi_panjang' => 'Anoscopy',
            'deskripsi_pendek' => 'Anoscopy',
          ),
          87 => 
          array (
            'kode' => '49.22',
            'deskripsi_panjang' => 'Biopsy of perianal tissue',
            'deskripsi_pendek' => 'Perianal biopsy',
          ),
          88 => 
          array (
            'kode' => '49.23',
            'deskripsi_panjang' => 'Biopsy of anus',
            'deskripsi_pendek' => 'Anal biopsy',
          ),
          89 => 
          array (
            'kode' => '49.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on anus and perianal tissue',
            'deskripsi_pendek' => 'Anal/perian dx proc NEC',
          ),
          90 => 
          array (
            'kode' => '49.31',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion or tissue of anus',
            'deskripsi_pendek' => 'Endosc destruc anus les',
          ),
          91 => 
          array (
            'kode' => '49.39',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion or tissue of anus',
            'deskripsi_pendek' => 'Other destruc anus les',
          ),
          92 => 
          array (
            'kode' => '49.41',
            'deskripsi_panjang' => 'Reduction of hemorrhoids',
            'deskripsi_pendek' => 'Hemorrhoid reduction',
          ),
          93 => 
          array (
            'kode' => '49.42',
            'deskripsi_panjang' => 'Injection of hemorrhoids',
            'deskripsi_pendek' => 'Hemorrhoid injection',
          ),
          94 => 
          array (
            'kode' => '49.43',
            'deskripsi_panjang' => 'Cauterization of hemorrhoids',
            'deskripsi_pendek' => 'Hemorrhoid cauterizat',
          ),
          95 => 
          array (
            'kode' => '49.44',
            'deskripsi_panjang' => 'Destruction of hemorrhoids by cryotherapy',
            'deskripsi_pendek' => 'Hemorrhoid cryotherapy',
          ),
          96 => 
          array (
            'kode' => '49.45',
            'deskripsi_panjang' => 'Ligation of hemorrhoids',
            'deskripsi_pendek' => 'Hemorrhoid ligation',
          ),
          97 => 
          array (
            'kode' => '49.46',
            'deskripsi_panjang' => 'Excision of hemorrhoids',
            'deskripsi_pendek' => 'Hemorrhoidectomy',
          ),
          98 => 
          array (
            'kode' => '49.47',
            'deskripsi_panjang' => 'Evacuation of thrombosed hemorrhoids',
            'deskripsi_pendek' => 'Hemorrhoid evacuation',
          ),
          99 => 
          array (
            'kode' => '49.49',
            'deskripsi_panjang' => 'Other procedures on hemorrhoids',
            'deskripsi_pendek' => 'Hemorrhoid procedure NEC',
          ),
          100 => 
          array (
            'kode' => '49.51',
            'deskripsi_panjang' => 'Left lateral anal sphincterotomy',
            'deskripsi_pendek' => 'Left lat sphincterotomy',
          ),
          101 => 
          array (
            'kode' => '49.52',
            'deskripsi_panjang' => 'Posterior anal sphincterotomy',
            'deskripsi_pendek' => 'Post sphincterotomy',
          ),
          102 => 
          array (
            'kode' => '49.59',
            'deskripsi_panjang' => 'Other anal sphincterotomy',
            'deskripsi_pendek' => 'Anal sphincterotomy NEC',
          ),
          103 => 
          array (
            'kode' => '49.6',
            'deskripsi_panjang' => 'Excision of anus',
            'deskripsi_pendek' => 'Excision of anus',
          ),
          104 => 
          array (
            'kode' => '49.71',
            'deskripsi_panjang' => 'Suture of laceration of anus',
            'deskripsi_pendek' => 'Suture anal laceration',
          ),
          105 => 
          array (
            'kode' => '49.72',
            'deskripsi_panjang' => 'Anal cerclage',
            'deskripsi_pendek' => 'Anal cerclage',
          ),
          106 => 
          array (
            'kode' => '49.73',
            'deskripsi_panjang' => 'Closure of anal fistula',
            'deskripsi_pendek' => 'Closure of anal fistula',
          ),
          107 => 
          array (
            'kode' => '49.74',
            'deskripsi_panjang' => 'Gracilis muscle transplant for anal incontinence',
            'deskripsi_pendek' => 'Gracilis musc transplan',
          ),
          108 => 
          array (
            'kode' => '49.75',
            'deskripsi_panjang' => 'Implantation or revision of artificial anal sphincter',
            'deskripsi_pendek' => 'Impl or rev art anal sph',
          ),
          109 => 
          array (
            'kode' => '49.76',
            'deskripsi_panjang' => 'Removal of artificial anal sphincter',
            'deskripsi_pendek' => 'Remov art anal sphincter',
          ),
          110 => 
          array (
            'kode' => '49.79',
            'deskripsi_panjang' => 'Other repair of anal sphincter',
            'deskripsi_pendek' => 'Anal sphinct repair NEC',
          ),
          111 => 
          array (
            'kode' => '49.91',
            'deskripsi_panjang' => 'Incision of anal septum',
            'deskripsi_pendek' => 'Incision of anal septum',
          ),
          112 => 
          array (
            'kode' => '49.92',
            'deskripsi_panjang' => 'Insertion of subcutaneous electrical anal stimulator',
            'deskripsi_pendek' => 'Insert subq anal stimul',
          ),
          113 => 
          array (
            'kode' => '49.93',
            'deskripsi_panjang' => 'Other incision of anus',
            'deskripsi_pendek' => 'Anal incision NEC',
          ),
          114 => 
          array (
            'kode' => '49.94',
            'deskripsi_panjang' => 'Reduction of anal prolapse',
            'deskripsi_pendek' => 'Reduction anal prolapse',
          ),
          115 => 
          array (
            'kode' => '49.95',
            'deskripsi_panjang' => 'Control of (postoperative) hemorrhage of anus',
            'deskripsi_pendek' => 'Control anal hemorrhage',
          ),
          116 => 
          array (
            'kode' => '49.99',
            'deskripsi_panjang' => 'Other operations on anus',
            'deskripsi_pendek' => 'Anal operation NEC',
          ),
          117 => 
          array (
            'kode' => '50.0',
            'deskripsi_panjang' => 'Hepatotomy',
            'deskripsi_pendek' => 'Hepatotomy',
          ),
          118 => 
          array (
            'kode' => '50.11',
            'deskripsi_panjang' => 'Closed (percutaneous) [needle] biopsy of liver',
            'deskripsi_pendek' => 'Closed liver biopsy',
          ),
          119 => 
          array (
            'kode' => '50.12',
            'deskripsi_panjang' => 'Open biopsy of liver',
            'deskripsi_pendek' => 'Open liver biopsy',
          ),
          120 => 
          array (
            'kode' => '50.13',
            'deskripsi_panjang' => 'Transjugular liver biopsy',
            'deskripsi_pendek' => 'Transjugular liver bx',
          ),
          121 => 
          array (
            'kode' => '50.14',
            'deskripsi_panjang' => 'Laparoscopic liver biopsy',
            'deskripsi_pendek' => 'Laparoscopic liver bx',
          ),
          122 => 
          array (
            'kode' => '50.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on liver',
            'deskripsi_pendek' => 'Hepatic dx proc NEC',
          ),
          123 => 
          array (
            'kode' => '50.21',
            'deskripsi_panjang' => 'Marsupialization of lesion of liver',
            'deskripsi_pendek' => 'Marsupializat liver les',
          ),
          124 => 
          array (
            'kode' => '50.22',
            'deskripsi_panjang' => 'Partial hepatectomy',
            'deskripsi_pendek' => 'Partial hepatectomy',
          ),
          125 => 
          array (
            'kode' => '50.23',
            'deskripsi_panjang' => 'Open ablation of liver lesion or tissue',
            'deskripsi_pendek' => 'Opn abltn liver les/tiss',
          ),
          126 => 
          array (
            'kode' => '50.24',
            'deskripsi_panjang' => 'Percutaneous ablation of liver lesion or tissue',
            'deskripsi_pendek' => 'Perc abltn liver les/tis',
          ),
          127 => 
          array (
            'kode' => '50.25',
            'deskripsi_panjang' => 'Laparoscopic ablation of liver lesion or tissue',
            'deskripsi_pendek' => 'Lap abltn liver les/tiss',
          ),
          128 => 
          array (
            'kode' => '50.26',
            'deskripsi_panjang' => 'Other and unspecified ablation of liver lesion or tissue',
            'deskripsi_pendek' => 'Abltn liver les/tiss NEC',
          ),
          129 => 
          array (
            'kode' => '50.29',
            'deskripsi_panjang' => 'Other destruction of lesion of liver',
            'deskripsi_pendek' => 'Destruc hepatic les NEC',
          ),
          130 => 
          array (
            'kode' => '50.3',
            'deskripsi_panjang' => 'Lobectomy of liver',
            'deskripsi_pendek' => 'Hepatic lobectomy',
          ),
          131 => 
          array (
            'kode' => '50.4',
            'deskripsi_panjang' => 'Total hepatectomy',
            'deskripsi_pendek' => 'Total hepatectomy',
          ),
          132 => 
          array (
            'kode' => '50.51',
            'deskripsi_panjang' => 'Auxiliary liver transplant',
            'deskripsi_pendek' => 'Auxiliary liver transpl',
          ),
          133 => 
          array (
            'kode' => '50.59',
            'deskripsi_panjang' => 'Other transplant of liver',
            'deskripsi_pendek' => 'Liver transplant NEC',
          ),
          134 => 
          array (
            'kode' => '50.61',
            'deskripsi_panjang' => 'Closure of laceration of liver',
            'deskripsi_pendek' => 'Closure liver lacerat',
          ),
          135 => 
          array (
            'kode' => '50.69',
            'deskripsi_panjang' => 'Other repair of liver',
            'deskripsi_pendek' => 'Liver repair NEC',
          ),
          136 => 
          array (
            'kode' => '50.91',
            'deskripsi_panjang' => 'Percutaneous aspiration of liver',
            'deskripsi_pendek' => 'Percutan liver aspirat',
          ),
          137 => 
          array (
            'kode' => '50.92',
            'deskripsi_panjang' => 'Extracorporeal hepatic assistance',
            'deskripsi_pendek' => 'Extracorpor hepat Assis',
          ),
          138 => 
          array (
            'kode' => '50.93',
            'deskripsi_panjang' => 'Localized perfusion of liver',
            'deskripsi_pendek' => 'Local perfusion liver',
          ),
          139 => 
          array (
            'kode' => '50.94',
            'deskripsi_panjang' => 'Other injection of therapeutic substance into liver',
            'deskripsi_pendek' => 'Hepatic injection NEC',
          ),
          140 => 
          array (
            'kode' => '50.99',
            'deskripsi_panjang' => 'Other operations on liver',
            'deskripsi_pendek' => 'Liver operation NEC',
          ),
          141 => 
          array (
            'kode' => '51.01',
            'deskripsi_panjang' => 'Percutaneous aspiration of gallbladder',
            'deskripsi_pendek' => 'Percutan aspiration gb',
          ),
          142 => 
          array (
            'kode' => '51.02',
            'deskripsi_panjang' => 'Trocar cholecystostomy',
            'deskripsi_pendek' => 'Trocar cholecystostomy',
          ),
          143 => 
          array (
            'kode' => '51.03',
            'deskripsi_panjang' => 'Other cholecystostomy',
            'deskripsi_pendek' => 'Cholecystostomy NEC',
          ),
          144 => 
          array (
            'kode' => '51.04',
            'deskripsi_panjang' => 'Other cholecystotomy',
            'deskripsi_pendek' => 'Cholecystotomy NEC',
          ),
          145 => 
          array (
            'kode' => '51.10',
            'deskripsi_panjang' => 'Endoscopic retrograde cholangiopancreatography [ERCP]',
            'deskripsi_pendek' => 'Endosc retro cholangiopa',
          ),
          146 => 
          array (
            'kode' => '51.11',
            'deskripsi_panjang' => 'Endoscopic retrograde cholangiography [ERC]',
            'deskripsi_pendek' => 'Endosc retro cholangio',
          ),
          147 => 
          array (
            'kode' => '51.12',
            'deskripsi_panjang' => 'Percutaneous biopsy of gallbladder or bile ducts',
            'deskripsi_pendek' => 'Percu bx gb/bile duct',
          ),
          148 => 
          array (
            'kode' => '51.13',
            'deskripsi_panjang' => 'Open biopsy of gallbladder or bile ducts',
            'deskripsi_pendek' => 'Open biliary tract bx',
          ),
          149 => 
          array (
            'kode' => '51.14',
            'deskripsi_panjang' => 'Other closed [endoscopic] biopsy of biliary duct or sphincter of Oddi',
            'deskripsi_pendek' => 'Clo endosc bx bile duct',
          ),
          150 => 
          array (
            'kode' => '51.15',
            'deskripsi_panjang' => 'Pressure measurement of sphincter of Oddi',
            'deskripsi_pendek' => 'Sphinct of oddi measure',
          ),
          151 => 
          array (
            'kode' => '51.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on biliary tract',
            'deskripsi_pendek' => 'Biliary tr dx proc NEC',
          ),
          152 => 
          array (
            'kode' => '51.21',
            'deskripsi_panjang' => 'Other partial cholecystectomy',
            'deskripsi_pendek' => 'Oth part cholecystectomy',
          ),
          153 => 
          array (
            'kode' => '51.22',
            'deskripsi_panjang' => 'Cholecystectomy',
            'deskripsi_pendek' => 'Cholecystectomy',
          ),
          154 => 
          array (
            'kode' => '51.23',
            'deskripsi_panjang' => 'Laparoscopic cholecystectomy',
            'deskripsi_pendek' => 'Laparoscopic cholecystec',
          ),
          155 => 
          array (
            'kode' => '51.24',
            'deskripsi_panjang' => 'Laparoscopic partial cholecystectomy',
            'deskripsi_pendek' => 'Lap part cholecystectomy',
          ),
          156 => 
          array (
            'kode' => '51.31',
            'deskripsi_panjang' => 'Anastomosis of gallbladder to hepatic ducts',
            'deskripsi_pendek' => 'Gb-to-hepat duct anast',
          ),
          157 => 
          array (
            'kode' => '51.32',
            'deskripsi_panjang' => 'Anastomosis of gallbladder to intestine',
            'deskripsi_pendek' => 'Gb-to-intestine anastom',
          ),
          158 => 
          array (
            'kode' => '51.33',
            'deskripsi_panjang' => 'Anastomosis of gallbladder to pancreas',
            'deskripsi_pendek' => 'Gb-to-pancreas anastom',
          ),
          159 => 
          array (
            'kode' => '51.34',
            'deskripsi_panjang' => 'Anastomosis of gallbladder to stomach',
            'deskripsi_pendek' => 'Gb-to-stomach anastomos',
          ),
          160 => 
          array (
            'kode' => '51.35',
            'deskripsi_panjang' => 'Other gallbladder anastomosis',
            'deskripsi_pendek' => 'Gallbladder anastom NEC',
          ),
          161 => 
          array (
            'kode' => '51.36',
            'deskripsi_panjang' => 'Choledochoenterostomy',
            'deskripsi_pendek' => 'Choledochoenterostomy',
          ),
          162 => 
          array (
            'kode' => '51.37',
            'deskripsi_panjang' => 'Anastomosis of hepatic duct to gastrointestinal tract',
            'deskripsi_pendek' => 'Hepatic duct-gi anastom',
          ),
          163 => 
          array (
            'kode' => '51.39',
            'deskripsi_panjang' => 'Other bile duct anastomosis',
            'deskripsi_pendek' => 'Bile duct anastomos NEC',
          ),
          164 => 
          array (
            'kode' => '51.41',
            'deskripsi_panjang' => 'Common duct exploration for removal of calculus',
            'deskripsi_pendek' => 'Cde for calculus remov',
          ),
          165 => 
          array (
            'kode' => '51.42',
            'deskripsi_panjang' => 'Common duct exploration for relief of other obstruction',
            'deskripsi_pendek' => 'Cde for obstruction NEC',
          ),
          166 => 
          array (
            'kode' => '51.43',
            'deskripsi_panjang' => 'Insertion of choledochohepatic tube for decompression',
            'deskripsi_pendek' => 'Choledochohepat intubat',
          ),
          167 => 
          array (
            'kode' => '51.49',
            'deskripsi_panjang' => 'Incision of other bile ducts for relief of obstruction',
            'deskripsi_pendek' => 'Incis obstr bile duc NEC',
          ),
          168 => 
          array (
            'kode' => '51.51',
            'deskripsi_panjang' => 'Exploration of common duct',
            'deskripsi_pendek' => 'Common duct exploration',
          ),
          169 => 
          array (
            'kode' => '51.59',
            'deskripsi_panjang' => 'Other incision of other bile duct',
            'deskripsi_pendek' => 'Bile duct incision NEC',
          ),
          170 => 
          array (
            'kode' => '51.61',
            'deskripsi_panjang' => 'Excision of cystic duct remnant',
            'deskripsi_pendek' => 'Excis cyst duct remnant',
          ),
          171 => 
          array (
            'kode' => '51.62',
            'deskripsi_panjang' => 'Excision of ampulla of Vater (with reimplantation of common duct)',
            'deskripsi_pendek' => 'Excis ampulla of vater',
          ),
          172 => 
          array (
            'kode' => '51.63',
            'deskripsi_panjang' => 'Other excision of common duct',
            'deskripsi_pendek' => 'Common duct excis NEC',
          ),
          173 => 
          array (
            'kode' => '51.64',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion of biliary ducts or sphincter of Oddi',
            'deskripsi_pendek' => 'Endosc destru bile les',
          ),
          174 => 
          array (
            'kode' => '51.69',
            'deskripsi_panjang' => 'Excision of other bile duct',
            'deskripsi_pendek' => 'Bile duct excision NEC',
          ),
          175 => 
          array (
            'kode' => '51.71',
            'deskripsi_panjang' => 'Simple suture of common bile duct',
            'deskripsi_pendek' => 'Simple sut-common duct',
          ),
          176 => 
          array (
            'kode' => '51.72',
            'deskripsi_panjang' => 'Choledochoplasty',
            'deskripsi_pendek' => 'Choledochoplasty',
          ),
          177 => 
          array (
            'kode' => '51.79',
            'deskripsi_panjang' => 'Repair of other bile ducts',
            'deskripsi_pendek' => 'Bile duct repair NEC',
          ),
          178 => 
          array (
            'kode' => '51.81',
            'deskripsi_panjang' => 'Dilation of sphincter of Oddi',
            'deskripsi_pendek' => 'Sphincter of oddi dilat',
          ),
          179 => 
          array (
            'kode' => '51.82',
            'deskripsi_panjang' => 'Pancreatic sphincterotomy',
            'deskripsi_pendek' => 'Pancreat sphincterotom',
          ),
          180 => 
          array (
            'kode' => '51.83',
            'deskripsi_panjang' => 'Pancreatic sphincteroplasty',
            'deskripsi_pendek' => 'Pancreat sphincteroplas',
          ),
          181 => 
          array (
            'kode' => '51.84',
            'deskripsi_panjang' => 'Endoscopic dilation of ampulla and biliary duct',
            'deskripsi_pendek' => 'Endosc dilation ampulla',
          ),
          182 => 
          array (
            'kode' => '51.85',
            'deskripsi_panjang' => 'Endoscopic sphincterotomy and papillotomy',
            'deskripsi_pendek' => 'Endosc sphincterotomy',
          ),
          183 => 
          array (
            'kode' => '51.86',
            'deskripsi_panjang' => 'Endoscopic insertion of nasobiliary drainage tube',
            'deskripsi_pendek' => 'Endosc inser nasobil tub',
          ),
          184 => 
          array (
            'kode' => '51.87',
            'deskripsi_panjang' => 'Endoscopic insertion of stent (tube) into bile duct',
            'deskripsi_pendek' => 'Endosc inser stent bile',
          ),
          185 => 
          array (
            'kode' => '51.88',
            'deskripsi_panjang' => 'Endoscopic removal of stone(s) from biliary tract',
            'deskripsi_pendek' => 'Endosc remove bile stone',
          ),
          186 => 
          array (
            'kode' => '51.89',
            'deskripsi_panjang' => 'Other operations on sphincter of Oddi',
            'deskripsi_pendek' => 'Sphinct of oddi op NEC',
          ),
          187 => 
          array (
            'kode' => '51.91',
            'deskripsi_panjang' => 'Repair of laceration of gallbladder',
            'deskripsi_pendek' => 'Repair gb laceration',
          ),
          188 => 
          array (
            'kode' => '51.92',
            'deskripsi_panjang' => 'Closure of cholecystostomy',
            'deskripsi_pendek' => 'Closure cholecystostomy',
          ),
          189 => 
          array (
            'kode' => '51.93',
            'deskripsi_panjang' => 'Closure of other biliary fistula',
            'deskripsi_pendek' => 'Clos biliary fistul NEC',
          ),
          190 => 
          array (
            'kode' => '51.94',
            'deskripsi_panjang' => 'Revision of anastomosis of biliary tract',
            'deskripsi_pendek' => 'Revis bile tract anastom',
          ),
          191 => 
          array (
            'kode' => '51.95',
            'deskripsi_panjang' => 'Removal of prosthetic device from bile duct',
            'deskripsi_pendek' => 'Remove bile duct prosth',
          ),
          192 => 
          array (
            'kode' => '51.96',
            'deskripsi_panjang' => 'Percutaneous extraction of common duct stones',
            'deskripsi_pendek' => 'Perc extrac com duc calc',
          ),
          193 => 
          array (
            'kode' => '51.98',
            'deskripsi_panjang' => 'Other percutaneous procedures on biliary tract',
            'deskripsi_pendek' => 'Oth perc proc bil trct',
          ),
          194 => 
          array (
            'kode' => '51.99',
            'deskripsi_panjang' => 'Other operations on biliary tract',
            'deskripsi_pendek' => 'Biliary tract op NEC',
          ),
          195 => 
          array (
            'kode' => '52.01',
            'deskripsi_panjang' => 'Drainage of pancreatic cyst by catheter',
            'deskripsi_pendek' => 'Cath drain-pancreat cyst',
          ),
          196 => 
          array (
            'kode' => '52.09',
            'deskripsi_panjang' => 'Other pancreatotomy',
            'deskripsi_pendek' => 'Pancreatotomy NEC',
          ),
          197 => 
          array (
            'kode' => '52.11',
            'deskripsi_panjang' => 'Closed [aspiration] [needle] [percutaneous] biopsy of pancreas',
            'deskripsi_pendek' => 'Closed pancreatic biopsy',
          ),
          198 => 
          array (
            'kode' => '52.12',
            'deskripsi_panjang' => 'Open biopsy of pancreas',
            'deskripsi_pendek' => 'Open pancreatic biopsy',
          ),
          199 => 
          array (
            'kode' => '52.13',
            'deskripsi_panjang' => 'Endoscopic retrograde pancreatography [ERP]',
            'deskripsi_pendek' => 'Endosc retro pancreatog',
          ),
          200 => 
          array (
            'kode' => '52.14',
            'deskripsi_panjang' => 'Closed [endoscopic] biopsy of pancreatic duct',
            'deskripsi_pendek' => 'Clo endosc bx pancre duc',
          ),
          201 => 
          array (
            'kode' => '52.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on pancreas',
            'deskripsi_pendek' => 'Pancreatic dx proc NEC',
          ),
          202 => 
          array (
            'kode' => '52.21',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion or tissue of pancreatic duct',
            'deskripsi_pendek' => 'Endosc destr pancrea les',
          ),
          203 => 
          array (
            'kode' => '52.22',
            'deskripsi_panjang' => 'Other excision or destruction of lesion or tissue of pancreas or pancreatic duct',
            'deskripsi_pendek' => 'Other destru pancrea les',
          ),
          204 => 
          array (
            'kode' => '52.3',
            'deskripsi_panjang' => 'Marsupialization of pancreatic cyst',
            'deskripsi_pendek' => 'Pancreat cyst marsupiali',
          ),
          205 => 
          array (
            'kode' => '52.4',
            'deskripsi_panjang' => 'Internal drainage of pancreatic cyst',
            'deskripsi_pendek' => 'Int drain pancreat cyst',
          ),
          206 => 
          array (
            'kode' => '52.51',
            'deskripsi_panjang' => 'Proximal pancreatectomy',
            'deskripsi_pendek' => 'Proximal pancreatectomy',
          ),
          207 => 
          array (
            'kode' => '52.52',
            'deskripsi_panjang' => 'Distal pancreatectomy',
            'deskripsi_pendek' => 'Distal pancreatectomy',
          ),
          208 => 
          array (
            'kode' => '52.53',
            'deskripsi_panjang' => 'Radical subtotal pancreatectomy',
            'deskripsi_pendek' => 'Rad subtot pancreatectom',
          ),
          209 => 
          array (
            'kode' => '52.59',
            'deskripsi_panjang' => 'Other partial pancreatectomy',
            'deskripsi_pendek' => 'Partial pancreatect NEC',
          ),
          210 => 
          array (
            'kode' => '52.6',
            'deskripsi_panjang' => 'Total pancreatectomy',
            'deskripsi_pendek' => 'Total pancreatectomy',
          ),
          211 => 
          array (
            'kode' => '52.7',
            'deskripsi_panjang' => 'Radical pancreaticoduodenectomy',
            'deskripsi_pendek' => 'Rad pancreaticoduodenect',
          ),
          212 => 
          array (
            'kode' => '52.80',
            'deskripsi_panjang' => 'Pancreatic transplant, not otherwise specified',
            'deskripsi_pendek' => 'Pancreat transplant NOS',
          ),
          213 => 
          array (
            'kode' => '52.81',
            'deskripsi_panjang' => 'Reimplantation of pancreatic tissue',
            'deskripsi_pendek' => 'Reimplant pancreatic tis',
          ),
          214 => 
          array (
            'kode' => '52.82',
            'deskripsi_panjang' => 'Homotransplant of pancreas',
            'deskripsi_pendek' => 'Pancreatic homotransplan',
          ),
          215 => 
          array (
            'kode' => '52.83',
            'deskripsi_panjang' => 'Heterotransplant of pancreas',
            'deskripsi_pendek' => 'Pancreatic heterotranspl',
          ),
          216 => 
          array (
            'kode' => '52.84',
            'deskripsi_panjang' => 'Autotransplantation of cells of Islets of Langerhans',
            'deskripsi_pendek' => 'Autotrnsplnt islets lang',
          ),
          217 => 
          array (
            'kode' => '52.85',
            'deskripsi_panjang' => 'Allotransplantation of cells of Islets of Langerhans',
            'deskripsi_pendek' => 'Allotrnsplnt islets lang',
          ),
          218 => 
          array (
            'kode' => '52.86',
            'deskripsi_panjang' => 'Transplantation of cells of Islets of Langerhans, not otherwise specified',
            'deskripsi_pendek' => 'Trnsplnt islets lang NOS',
          ),
          219 => 
          array (
            'kode' => '52.92',
            'deskripsi_panjang' => 'Cannulation of pancreatic duct',
            'deskripsi_pendek' => 'Cannulation pancrea duc',
          ),
          220 => 
          array (
            'kode' => '52.93',
            'deskripsi_panjang' => 'Endoscopic insertion of stent (tube) into pancreatic duct',
            'deskripsi_pendek' => 'Endosc inser panc stent',
          ),
          221 => 
          array (
            'kode' => '52.94',
            'deskripsi_panjang' => 'Endoscopic removal of stone(s) from pancreatic duct',
            'deskripsi_pendek' => 'Endosc remove panc stone',
          ),
          222 => 
          array (
            'kode' => '52.95',
            'deskripsi_panjang' => 'Other repair of pancreas',
            'deskripsi_pendek' => 'Pancreatic repair NEC',
          ),
          223 => 
          array (
            'kode' => '52.96',
            'deskripsi_panjang' => 'Anastomosis of pancreas',
            'deskripsi_pendek' => 'Pancreatic anastomosis',
          ),
          224 => 
          array (
            'kode' => '52.97',
            'deskripsi_panjang' => 'Endoscopic insertion of nasopancreatic drainage tube',
            'deskripsi_pendek' => 'Endosc inser nasopan tub',
          ),
          225 => 
          array (
            'kode' => '52.98',
            'deskripsi_panjang' => 'Endoscopic dilation of pancreatic duct',
            'deskripsi_pendek' => 'Endosc dil pancreat duct',
          ),
          226 => 
          array (
            'kode' => '52.99',
            'deskripsi_panjang' => 'Other operations on pancreas',
            'deskripsi_pendek' => 'Pancreatic operation NEC',
          ),
          227 => 
          array (
            'kode' => '53.00',
            'deskripsi_panjang' => 'Unilateral repair of inguinal hernia, not otherwise specified',
            'deskripsi_pendek' => 'Unilat ing hern rep NOS',
          ),
          228 => 
          array (
            'kode' => '53.01',
            'deskripsi_panjang' => 'Other and open repair of direct inguinal hernia',
            'deskripsi_pendek' => 'Opn rep dir ing hern NEC',
          ),
          229 => 
          array (
            'kode' => '53.02',
            'deskripsi_panjang' => 'Other and open repair of indirect inguinal hernia',
            'deskripsi_pendek' => 'Opn rep ind ing hern NEC',
          ),
          230 => 
          array (
            'kode' => '53.03',
            'deskripsi_panjang' => 'Other and open repair of direct inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Opn dir ing hern-gft NEC',
          ),
          231 => 
          array (
            'kode' => '53.04',
            'deskripsi_panjang' => 'Other and open repair of indirect inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Opn ind ing hern-gft NEC',
          ),
          232 => 
          array (
            'kode' => '53.05',
            'deskripsi_panjang' => 'Repair of inguinal hernia with graft or prosthesis, not otherwise specified',
            'deskripsi_pendek' => 'Ing hernia rep-graft NOS',
          ),
          233 => 
          array (
            'kode' => '53.10',
            'deskripsi_panjang' => 'Bilateral repair of inguinal hernia, not otherwise specified',
            'deskripsi_pendek' => 'Bilat ing hernia rep NOS',
          ),
          234 => 
          array (
            'kode' => '53.11',
            'deskripsi_panjang' => 'Other and open bilateral repair of direct inguinal hernia',
            'deskripsi_pendek' => 'Opn bil dir ing hern NEC',
          ),
          235 => 
          array (
            'kode' => '53.12',
            'deskripsi_panjang' => 'Other and open bilateral repair of indirect inguinal hernia',
            'deskripsi_pendek' => 'Opn bil ind ing hern NEC',
          ),
          236 => 
          array (
            'kode' => '53.13',
            'deskripsi_panjang' => 'Other and open bilateral repair of inguinal hernia, one direct and one indirect',
            'deskripsi_pendek' => 'Opn bi dr/in ing hrn NEC',
          ),
          237 => 
          array (
            'kode' => '53.14',
            'deskripsi_panjang' => 'Other and open bilateral repair of direct inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Opn bi dr ing hrn-gr NEC',
          ),
          238 => 
          array (
            'kode' => '53.15',
            'deskripsi_panjang' => 'Other and open bilateral repair of indirect inguinal hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Op bi in ing hrn-grf NEC',
          ),
          239 => 
          array (
            'kode' => '53.16',
            'deskripsi_panjang' => 'Other and open bilateral repair of inguinal hernia, one direct and one indirect, with graft or prosthesis',
            'deskripsi_pendek' => 'Op bi dr/in ig hr-gr NEC',
          ),
          240 => 
          array (
            'kode' => '53.17',
            'deskripsi_panjang' => 'Bilateral inguinal hernia repair with graft or prosthesis, not otherwise specified',
            'deskripsi_pendek' => 'Bil ing hrn rep-grft NOS',
          ),
          241 => 
          array (
            'kode' => '53.21',
            'deskripsi_panjang' => 'Unilateral repair of femoral hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Unil femor hrn rep-grft',
          ),
          242 => 
          array (
            'kode' => '53.29',
            'deskripsi_panjang' => 'Other unilateral femoral herniorrhaphy',
            'deskripsi_pendek' => 'Unil femor hern rep NEC',
          ),
          243 => 
          array (
            'kode' => '53.31',
            'deskripsi_panjang' => 'Bilateral repair of femoral hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Bil fem hern repair-grft',
          ),
          244 => 
          array (
            'kode' => '53.39',
            'deskripsi_panjang' => 'Other bilateral femoral herniorrhaphy',
            'deskripsi_pendek' => 'Bil fem hern repair NEC',
          ),
          245 => 
          array (
            'kode' => '53.41',
            'deskripsi_panjang' => 'Other and open repair of umbilical hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Opn rep umb hrn-grft NEC',
          ),
          246 => 
          array (
            'kode' => '53.42',
            'deskripsi_panjang' => 'Laparoscopic repair of umbilical hernia with graft or prosthesis',
            'deskripsi_pendek' => 'Lap umbil hernia-graft',
          ),
          247 => 
          array (
            'kode' => '53.43',
            'deskripsi_panjang' => 'Other laparoscopic umbilical herniorrhaphy',
            'deskripsi_pendek' => 'Lap umbilical hernia NEC',
          ),
          248 => 
          array (
            'kode' => '53.49',
            'deskripsi_panjang' => 'Other open umbilical herniorrhaphy',
            'deskripsi_pendek' => 'Open rep umbil hern NEC',
          ),
          249 => 
          array (
            'kode' => '53.51',
            'deskripsi_panjang' => 'Incisional hernia repair',
            'deskripsi_pendek' => 'Incisional hernia repair',
          ),
          250 => 
          array (
            'kode' => '53.59',
            'deskripsi_panjang' => 'Repair of other hernia of anterior abdominal wall',
            'deskripsi_pendek' => 'Abd wall hern repair NEC',
          ),
          251 => 
          array (
            'kode' => '53.61',
            'deskripsi_panjang' => 'Other open incisional hernia repair with graft or prosthesis',
            'deskripsi_pendek' => 'Open incis hern-grft NEC',
          ),
          252 => 
          array (
            'kode' => '53.62',
            'deskripsi_panjang' => 'Laparoscopic incisional hernia repair with graft or prosthesis',
            'deskripsi_pendek' => 'Lap incis hern repr-grft',
          ),
          253 => 
          array (
            'kode' => '53.63',
            'deskripsi_panjang' => 'Other laparoscopic repair of other hernia of anterior abdominal wall with graft or prosthesis',
            'deskripsi_pendek' => 'Lap hern ant abd-gft NEC',
          ),
          254 => 
          array (
            'kode' => '53.69',
            'deskripsi_panjang' => 'Other and open repair of other hernia of anterior abdominal wall with graft or prosthesis',
            'deskripsi_pendek' => 'Opn hern ant abd-grf NEC',
          ),
          255 => 
          array (
            'kode' => '53.71',
            'deskripsi_panjang' => 'Laparoscopic repair of diaphragmatic hernia, abdominal approach',
            'deskripsi_pendek' => 'Lap abd rep-diaphr hern',
          ),
          256 => 
          array (
            'kode' => '53.72',
            'deskripsi_panjang' => 'Other and open repair of diaphragmatic hernia, abdominal approach',
            'deskripsi_pendek' => 'Opn abd diaphrm hern NEC',
          ),
          257 => 
          array (
            'kode' => '53.75',
            'deskripsi_panjang' => 'Repair of diaphragmatic hernia, abdominal approach, not otherwise specified',
            'deskripsi_pendek' => 'Abd rep-diaphr hern NOS',
          ),
          258 => 
          array (
            'kode' => '53.80',
            'deskripsi_panjang' => 'Repair of diaphragmatic hernia with thoracic approach, not otherwise specified',
            'deskripsi_pendek' => 'Thor rep-diaph hern NOS',
          ),
          259 => 
          array (
            'kode' => '53.81',
            'deskripsi_panjang' => 'Plication of the diaphragm',
            'deskripsi_pendek' => 'Diaphragmatic plication',
          ),
          260 => 
          array (
            'kode' => '53.82',
            'deskripsi_panjang' => 'Repair of parasternal hernia',
            'deskripsi_pendek' => 'Parastern hernia repair',
          ),
          261 => 
          array (
            'kode' => '53.83',
            'deskripsi_panjang' => 'Laparoscopic repair of diaphragmatic hernia, with thoracic approach',
            'deskripsi_pendek' => 'Lap thorc app-diaph hern',
          ),
          262 => 
          array (
            'kode' => '53.84',
            'deskripsi_panjang' => 'Other and open repair of diaphragmatic hernia, with thoracic approach',
            'deskripsi_pendek' => 'Opn thorc diaph hern NEC',
          ),
          263 => 
          array (
            'kode' => '53.9',
            'deskripsi_panjang' => 'Other hernia repair',
            'deskripsi_pendek' => 'Other hernia repair',
          ),
          264 => 
          array (
            'kode' => '54.0',
            'deskripsi_panjang' => 'Incision of abdominal wall',
            'deskripsi_pendek' => 'Abdominal wall incision',
          ),
          265 => 
          array (
            'kode' => '54.11',
            'deskripsi_panjang' => 'Exploratory laparotomy',
            'deskripsi_pendek' => 'Exploratory laparotomy',
          ),
          266 => 
          array (
            'kode' => '54.12',
            'deskripsi_panjang' => 'Reopening of recent laparotomy site',
            'deskripsi_pendek' => 'Reopen recent lap site',
          ),
          267 => 
          array (
            'kode' => '54.19',
            'deskripsi_panjang' => 'Other laparotomy',
            'deskripsi_pendek' => 'Laparotomy NEC',
          ),
          268 => 
          array (
            'kode' => '54.21',
            'deskripsi_panjang' => 'Laparoscopy',
            'deskripsi_pendek' => 'Laparoscopy',
          ),
          269 => 
          array (
            'kode' => '54.22',
            'deskripsi_panjang' => 'Biopsy of abdominal wall or umbilicus',
            'deskripsi_pendek' => 'Abdominal wall biopsy',
          ),
          270 => 
          array (
            'kode' => '54.23',
            'deskripsi_panjang' => 'Biopsy of peritoneum',
            'deskripsi_pendek' => 'Peritoneal biopsy',
          ),
          271 => 
          array (
            'kode' => '54.24',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of intra-abdominal mass',
            'deskripsi_pendek' => 'Closed intra-abd mass bx',
          ),
          272 => 
          array (
            'kode' => '54.25',
            'deskripsi_panjang' => 'Peritoneal lavage',
            'deskripsi_pendek' => 'Peritoneal lavage',
          ),
          273 => 
          array (
            'kode' => '54.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on abdominal region',
            'deskripsi_pendek' => 'Abd region dx proc NEC',
          ),
          274 => 
          array (
            'kode' => '54.3',
            'deskripsi_panjang' => 'Excision or destruction of lesion or tissue of abdominal wall or umbilicus',
            'deskripsi_pendek' => 'Destruct abd wall lesion',
          ),
          275 => 
          array (
            'kode' => '54.4',
            'deskripsi_panjang' => 'Excision or destruction of peritoneal tissue',
            'deskripsi_pendek' => 'Destruct peritoneal tiss',
          ),
          276 => 
          array (
            'kode' => '54.51',
            'deskripsi_panjang' => 'Laparoscopic lysis of peritoneal adhesions',
            'deskripsi_pendek' => 'Lap periton adhesiolysis',
          ),
          277 => 
          array (
            'kode' => '54.59',
            'deskripsi_panjang' => 'Other lysis of peritoneal adhesions',
            'deskripsi_pendek' => 'Oth periton adhesiolysis',
          ),
          278 => 
          array (
            'kode' => '54.61',
            'deskripsi_panjang' => 'Reclosure of postoperative disruption of abdominal wall',
            'deskripsi_pendek' => 'Reclose post op disrupt',
          ),
          279 => 
          array (
            'kode' => '54.62',
            'deskripsi_panjang' => 'Delayed closure of granulating abdominal wound',
            'deskripsi_pendek' => 'Delayed clos abd wound',
          ),
          280 => 
          array (
            'kode' => '54.63',
            'deskripsi_panjang' => 'Other suture of abdominal wall',
            'deskripsi_pendek' => 'Abd wall suture NEC',
          ),
          281 => 
          array (
            'kode' => '54.64',
            'deskripsi_panjang' => 'Suture of peritoneum',
            'deskripsi_pendek' => 'Peritoneal suture',
          ),
          282 => 
          array (
            'kode' => '54.71',
            'deskripsi_panjang' => 'Repair of gastroschisis',
            'deskripsi_pendek' => 'Repair of gastroschisis',
          ),
          283 => 
          array (
            'kode' => '54.72',
            'deskripsi_panjang' => 'Other repair of abdominal wall',
            'deskripsi_pendek' => 'Abdomen wall repair NEC',
          ),
          284 => 
          array (
            'kode' => '54.73',
            'deskripsi_panjang' => 'Other repair of peritoneum',
            'deskripsi_pendek' => 'Peritoneal repair NEC',
          ),
          285 => 
          array (
            'kode' => '54.74',
            'deskripsi_panjang' => 'Other repair of omentum',
            'deskripsi_pendek' => 'Omental repair NEC',
          ),
          286 => 
          array (
            'kode' => '54.75',
            'deskripsi_panjang' => 'Other repair of mesentery',
            'deskripsi_pendek' => 'Mesenteric repair NEC',
          ),
          287 => 
          array (
            'kode' => '54.91',
            'deskripsi_panjang' => 'Percutaneous abdominal drainage',
            'deskripsi_pendek' => 'Percu abdominal drainage',
          ),
          288 => 
          array (
            'kode' => '54.92',
            'deskripsi_panjang' => 'Removal of foreign body from peritoneal cavity',
            'deskripsi_pendek' => 'Remove FB from periton',
          ),
          289 => 
          array (
            'kode' => '54.93',
            'deskripsi_panjang' => 'Creation of cutaneoperitoneal fistula',
            'deskripsi_pendek' => 'Create cutanperiton fist',
          ),
          290 => 
          array (
            'kode' => '54.94',
            'deskripsi_panjang' => 'Creation of peritoneovascular shunt',
            'deskripsi_pendek' => 'Creat peritoneovas shunt',
          ),
          291 => 
          array (
            'kode' => '54.95',
            'deskripsi_panjang' => 'Incision of peritoneum',
            'deskripsi_pendek' => 'Peritoneal incision',
          ),
          292 => 
          array (
            'kode' => '54.96',
            'deskripsi_panjang' => 'Injection of air into peritoneal cavity',
            'deskripsi_pendek' => 'Injec air-periton cavity',
          ),
          293 => 
          array (
            'kode' => '54.97',
            'deskripsi_panjang' => 'Injection of locally-acting therapeutic substance into peritoneal cavity',
            'deskripsi_pendek' => 'Inj therap subst periton',
          ),
          294 => 
          array (
            'kode' => '54.98',
            'deskripsi_panjang' => 'Peritoneal dialysis',
            'deskripsi_pendek' => 'Peritoneal dialysis',
          ),
          295 => 
          array (
            'kode' => '54.99',
            'deskripsi_panjang' => 'Other operations of abdominal region',
            'deskripsi_pendek' => 'Abdomen region ops NEC',
          ),
          296 => 
          array (
            'kode' => '55.01',
            'deskripsi_panjang' => 'Nephrotomy',
            'deskripsi_pendek' => 'Nephrotomy',
          ),
          297 => 
          array (
            'kode' => '55.02',
            'deskripsi_panjang' => 'Nephrostomy',
            'deskripsi_pendek' => 'Nephrostomy',
          ),
          298 => 
          array (
            'kode' => '55.03',
            'deskripsi_panjang' => 'Percutaneous nephrostomy without fragmentation',
            'deskripsi_pendek' => 'Percu nephrostm w/o frag',
          ),
          299 => 
          array (
            'kode' => '55.04',
            'deskripsi_panjang' => 'Percutaneous nephrostomy with fragmentation',
            'deskripsi_pendek' => 'Percu nephrostmy w frag',
          ),
          300 => 
          array (
            'kode' => '55.11',
            'deskripsi_panjang' => 'Pyelotomy',
            'deskripsi_pendek' => 'Pyelotomy',
          ),
          301 => 
          array (
            'kode' => '55.12',
            'deskripsi_panjang' => 'Pyelostomy',
            'deskripsi_pendek' => 'Pyelostomy',
          ),
          302 => 
          array (
            'kode' => '55.21',
            'deskripsi_panjang' => 'Nephroscopy',
            'deskripsi_pendek' => 'Nephroscopy',
          ),
          303 => 
          array (
            'kode' => '55.22',
            'deskripsi_panjang' => 'Pyeloscopy',
            'deskripsi_pendek' => 'Pyeloscopy',
          ),
          304 => 
          array (
            'kode' => '55.23',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of kidney',
            'deskripsi_pendek' => 'Closed renal biopsy',
          ),
          305 => 
          array (
            'kode' => '55.24',
            'deskripsi_panjang' => 'Open biopsy of kidney',
            'deskripsi_pendek' => 'Open renal biopsy',
          ),
          306 => 
          array (
            'kode' => '55.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on kidney',
            'deskripsi_pendek' => 'Renal diagnost proc NEC',
          ),
          307 => 
          array (
            'kode' => '55.31',
            'deskripsi_panjang' => 'Marsupialization of kidney lesion',
            'deskripsi_pendek' => 'Renal les marsupializat',
          ),
          308 => 
          array (
            'kode' => '55.32',
            'deskripsi_panjang' => 'Open ablation of renal lesion or tissue',
            'deskripsi_pendek' => 'Opn abltn renal les/tiss',
          ),
          309 => 
          array (
            'kode' => '55.33',
            'deskripsi_panjang' => 'Percutaneous ablation of renal lesion or tissue',
            'deskripsi_pendek' => 'Perc abltn renl les/tiss',
          ),
          310 => 
          array (
            'kode' => '55.34',
            'deskripsi_panjang' => 'Laparoscopic ablation of renal lesion or tissue',
            'deskripsi_pendek' => 'Lap abltn renal les/tiss',
          ),
          311 => 
          array (
            'kode' => '55.35',
            'deskripsi_panjang' => 'Other and unspecified ablation of renal lesion or tissue',
            'deskripsi_pendek' => 'Abltn renal les/tiss NEC',
          ),
          312 => 
          array (
            'kode' => '55.39',
            'deskripsi_panjang' => 'Other local destruction or excision of renal lesion or tissue',
            'deskripsi_pendek' => 'Loc destr renal les NEC',
          ),
          313 => 
          array (
            'kode' => '55.4',
            'deskripsi_panjang' => 'Partial nephrectomy',
            'deskripsi_pendek' => 'Partial nephrectomy',
          ),
          314 => 
          array (
            'kode' => '55.51',
            'deskripsi_panjang' => 'Nephroureterectomy',
            'deskripsi_pendek' => 'Nephroureterectomy',
          ),
          315 => 
          array (
            'kode' => '55.52',
            'deskripsi_panjang' => 'Nephrectomy of remaining kidney',
            'deskripsi_pendek' => 'Solitary kidney nephrect',
          ),
          316 => 
          array (
            'kode' => '55.53',
            'deskripsi_panjang' => 'Removal of transplanted or rejected kidney',
            'deskripsi_pendek' => 'Rejected kidney nephrect',
          ),
          317 => 
          array (
            'kode' => '55.54',
            'deskripsi_panjang' => 'Bilateral nephrectomy',
            'deskripsi_pendek' => 'Bilateral nephrectomy',
          ),
          318 => 
          array (
            'kode' => '55.61',
            'deskripsi_panjang' => 'Renal autotransplantation',
            'deskripsi_pendek' => 'Renal autotransplant',
          ),
          319 => 
          array (
            'kode' => '55.69',
            'deskripsi_panjang' => 'Other kidney transplantation',
            'deskripsi_pendek' => 'Kidney transplant NEC',
          ),
          320 => 
          array (
            'kode' => '55.7',
            'deskripsi_panjang' => 'Nephropexy',
            'deskripsi_pendek' => 'Nephropexy',
          ),
          321 => 
          array (
            'kode' => '55.81',
            'deskripsi_panjang' => 'Suture of laceration of kidney',
            'deskripsi_pendek' => 'Suture kidney laceration',
          ),
          322 => 
          array (
            'kode' => '55.82',
            'deskripsi_panjang' => 'Closure of nephrostomy and pyelostomy',
            'deskripsi_pendek' => 'Close nephrost & pyelost',
          ),
          323 => 
          array (
            'kode' => '55.83',
            'deskripsi_panjang' => 'Closure of other fistula of kidney',
            'deskripsi_pendek' => 'Close renal fistula NEC',
          ),
          324 => 
          array (
            'kode' => '55.84',
            'deskripsi_panjang' => 'Reduction of torsion of renal pedicle',
            'deskripsi_pendek' => 'Reduce renal pedicl tors',
          ),
          325 => 
          array (
            'kode' => '55.85',
            'deskripsi_panjang' => 'Symphysiotomy for horseshoe kidney',
            'deskripsi_pendek' => 'Symphysiotomy',
          ),
          326 => 
          array (
            'kode' => '55.86',
            'deskripsi_panjang' => 'Anastomosis of kidney',
            'deskripsi_pendek' => 'Renal anastomosis',
          ),
          327 => 
          array (
            'kode' => '55.87',
            'deskripsi_panjang' => 'Correction of ureteropelvic junction',
            'deskripsi_pendek' => 'Correct ureteropelv junc',
          ),
          328 => 
          array (
            'kode' => '55.89',
            'deskripsi_panjang' => 'Other repair of kidney',
            'deskripsi_pendek' => 'Renal repair NEC',
          ),
          329 => 
          array (
            'kode' => '55.91',
            'deskripsi_panjang' => 'Decapsulation of kidney',
            'deskripsi_pendek' => 'Renal decapsulation',
          ),
          330 => 
          array (
            'kode' => '55.92',
            'deskripsi_panjang' => 'Percutaneous aspiration of kidney (pelvis)',
            'deskripsi_pendek' => 'Percutan renal aspirat',
          ),
          331 => 
          array (
            'kode' => '55.93',
            'deskripsi_panjang' => 'Replacement of nephrostomy tube',
            'deskripsi_pendek' => 'Replace nephrostomy tube',
          ),
          332 => 
          array (
            'kode' => '55.94',
            'deskripsi_panjang' => 'Replacement of pyelostomy tube',
            'deskripsi_pendek' => 'Replace pyelostomy tube',
          ),
          333 => 
          array (
            'kode' => '55.95',
            'deskripsi_panjang' => 'Local perfusion of kidney',
            'deskripsi_pendek' => 'Local renal perfusion',
          ),
          334 => 
          array (
            'kode' => '55.96',
            'deskripsi_panjang' => 'Other injection of therapeutic substance into kidney',
            'deskripsi_pendek' => 'Renal injection NEC',
          ),
          335 => 
          array (
            'kode' => '55.97',
            'deskripsi_panjang' => 'Implantation or replacement of mechanical kidney',
            'deskripsi_pendek' => 'Implant mechanic kidney',
          ),
          336 => 
          array (
            'kode' => '55.98',
            'deskripsi_panjang' => 'Removal of mechanical kidney',
            'deskripsi_pendek' => 'Remov mechanical kidney',
          ),
          337 => 
          array (
            'kode' => '55.99',
            'deskripsi_panjang' => 'Other operations on kidney',
            'deskripsi_pendek' => 'Renal operation NEC',
          ),
          338 => 
          array (
            'kode' => '56.0',
            'deskripsi_panjang' => 'Transurethral removal of obstruction from ureter and renal pelvis',
            'deskripsi_pendek' => 'Tu remov ureter obstruct',
          ),
          339 => 
          array (
            'kode' => '56.1',
            'deskripsi_panjang' => 'Ureteral meatotomy',
            'deskripsi_pendek' => 'Ureteral meatotomy',
          ),
          340 => 
          array (
            'kode' => '56.2',
            'deskripsi_panjang' => 'Ureterotomy',
            'deskripsi_pendek' => 'Ureterotomy',
          ),
          341 => 
          array (
            'kode' => '56.31',
            'deskripsi_panjang' => 'Ureteroscopy',
            'deskripsi_pendek' => 'Ureteroscopy',
          ),
          342 => 
          array (
            'kode' => '56.32',
            'deskripsi_panjang' => 'Closed percutaneous biopsy of ureter',
            'deskripsi_pendek' => 'Closed ureteral biopsy',
          ),
          343 => 
          array (
            'kode' => '56.33',
            'deskripsi_panjang' => 'Closed endoscopic biopsy of ureter',
            'deskripsi_pendek' => 'Clos endosc ureteral bx',
          ),
          344 => 
          array (
            'kode' => '56.34',
            'deskripsi_panjang' => 'Open biopsy of ureter',
            'deskripsi_pendek' => 'Open ureteral biopsy',
          ),
          345 => 
          array (
            'kode' => '56.35',
            'deskripsi_panjang' => 'Endoscopy (cystoscopy) (looposcopy) of ileal conduit',
            'deskripsi_pendek' => 'Endoscopic ileal conduit',
          ),
          346 => 
          array (
            'kode' => '56.39',
            'deskripsi_panjang' => 'Other diagnostic procedures on ureter',
            'deskripsi_pendek' => 'Ureteral dx procedur NEC',
          ),
          347 => 
          array (
            'kode' => '56.40',
            'deskripsi_panjang' => 'Ureterectomy, not otherwise specified',
            'deskripsi_pendek' => 'Ureterectomy NOS',
          ),
          348 => 
          array (
            'kode' => '56.41',
            'deskripsi_panjang' => 'Partial ureterectomy',
            'deskripsi_pendek' => 'Partial ureterectomy',
          ),
          349 => 
          array (
            'kode' => '56.42',
            'deskripsi_panjang' => 'Total ureterectomy',
            'deskripsi_pendek' => 'Total ureterectomy',
          ),
          350 => 
          array (
            'kode' => '56.51',
            'deskripsi_panjang' => 'Formation of cutaneous uretero-ileostomy',
            'deskripsi_pendek' => 'Form cutan ileoureterost',
          ),
          351 => 
          array (
            'kode' => '56.52',
            'deskripsi_panjang' => 'Revision of cutaneous uretero-ileostomy',
            'deskripsi_pendek' => 'Revis cutan ileoureteros',
          ),
          352 => 
          array (
            'kode' => '56.61',
            'deskripsi_panjang' => 'Formation of other cutaneous ureterostomy',
            'deskripsi_pendek' => 'Form cutan ureterostomy',
          ),
          353 => 
          array (
            'kode' => '56.62',
            'deskripsi_panjang' => 'Revision of other cutaneous ureterostomy',
            'deskripsi_pendek' => 'Revis cutan ureteros NEC',
          ),
          354 => 
          array (
            'kode' => '56.71',
            'deskripsi_panjang' => 'Urinary diversion to intestine',
            'deskripsi_pendek' => 'Urin diversion to bowel',
          ),
          355 => 
          array (
            'kode' => '56.72',
            'deskripsi_panjang' => 'Revision of ureterointestinal anastomosis',
            'deskripsi_pendek' => 'Revis ureteroenterostomy',
          ),
          356 => 
          array (
            'kode' => '56.73',
            'deskripsi_panjang' => 'Nephrocystanastomosis, not otherwise specified',
            'deskripsi_pendek' => 'Nephrocystanastomosi NOS',
          ),
          357 => 
          array (
            'kode' => '56.74',
            'deskripsi_panjang' => 'Ureteroneocystostomy',
            'deskripsi_pendek' => 'Ureteroneocystostomy',
          ),
          358 => 
          array (
            'kode' => '56.75',
            'deskripsi_panjang' => 'Transureteroureterostomy',
            'deskripsi_pendek' => 'Transureteroureterostomy',
          ),
          359 => 
          array (
            'kode' => '56.79',
            'deskripsi_panjang' => 'Other anastomosis or bypass of ureter',
            'deskripsi_pendek' => 'Ureteral anastomosis NEC',
          ),
          360 => 
          array (
            'kode' => '56.81',
            'deskripsi_panjang' => 'Lysis of intraluminal adhesions of ureter',
            'deskripsi_pendek' => 'Intralum urete adhesioly',
          ),
          361 => 
          array (
            'kode' => '56.82',
            'deskripsi_panjang' => 'Suture of laceration of ureter',
            'deskripsi_pendek' => 'Suture ureteral lacerat',
          ),
          362 => 
          array (
            'kode' => '56.83',
            'deskripsi_panjang' => 'Closure of ureterostomy',
            'deskripsi_pendek' => 'Ureterostomy closure',
          ),
          363 => 
          array (
            'kode' => '56.84',
            'deskripsi_panjang' => 'Closure of other fistula of ureter',
            'deskripsi_pendek' => 'Close ureter fistula NEC',
          ),
          364 => 
          array (
            'kode' => '56.85',
            'deskripsi_panjang' => 'Ureteropexy',
            'deskripsi_pendek' => 'Ureteropexy',
          ),
          365 => 
          array (
            'kode' => '56.86',
            'deskripsi_panjang' => 'Removal of ligature from ureter',
            'deskripsi_pendek' => 'Remove ureteral ligature',
          ),
          366 => 
          array (
            'kode' => '56.89',
            'deskripsi_panjang' => 'Other repair of ureter',
            'deskripsi_pendek' => 'Repair of ureter NEC',
          ),
          367 => 
          array (
            'kode' => '56.91',
            'deskripsi_panjang' => 'Dilation of ureteral meatus',
            'deskripsi_pendek' => 'Ureteral meatus dilation',
          ),
          368 => 
          array (
            'kode' => '56.92',
            'deskripsi_panjang' => 'Implantation of electronic ureteral stimulator',
            'deskripsi_pendek' => 'Implant ureteral stimul',
          ),
          369 => 
          array (
            'kode' => '56.93',
            'deskripsi_panjang' => 'Replacement of electronic ureteral stimulator',
            'deskripsi_pendek' => 'Replace ureteral stimul',
          ),
          370 => 
          array (
            'kode' => '56.94',
            'deskripsi_panjang' => 'Removal of electronic ureteral stimulator',
            'deskripsi_pendek' => 'Remove ureteral stimulat',
          ),
          371 => 
          array (
            'kode' => '56.95',
            'deskripsi_panjang' => 'Ligation of ureter',
            'deskripsi_pendek' => 'Ligation of ureter',
          ),
          372 => 
          array (
            'kode' => '56.99',
            'deskripsi_panjang' => 'Other operations on ureter',
            'deskripsi_pendek' => 'Ureteral operation NEC',
          ),
          373 => 
          array (
            'kode' => '57.0',
            'deskripsi_panjang' => 'Transurethral clearance of bladder',
            'deskripsi_pendek' => 'Tu bladder clearance',
          ),
          374 => 
          array (
            'kode' => '57.11',
            'deskripsi_panjang' => 'Percutaneous aspiration of bladder',
            'deskripsi_pendek' => 'Percutan bladder aspirat',
          ),
          375 => 
          array (
            'kode' => '57.12',
            'deskripsi_panjang' => 'Lysis of intraluminal adhesions with incision into bladder',
            'deskripsi_pendek' => 'Cystotomy & adhesiolysis',
          ),
          376 => 
          array (
            'kode' => '57.17',
            'deskripsi_panjang' => 'Percutaneous cystostomy',
            'deskripsi_pendek' => 'Percutaneous cystostomy',
          ),
          377 => 
          array (
            'kode' => '57.18',
            'deskripsi_panjang' => 'Other suprapubic cystostomy',
            'deskripsi_pendek' => 'Other suprapu cystostomy',
          ),
          378 => 
          array (
            'kode' => '57.19',
            'deskripsi_panjang' => 'Other cystotomy',
            'deskripsi_pendek' => 'Cystotomy NEC',
          ),
          379 => 
          array (
            'kode' => '57.21',
            'deskripsi_panjang' => 'Vesicostomy',
            'deskripsi_pendek' => 'Vesicostomy',
          ),
          380 => 
          array (
            'kode' => '57.22',
            'deskripsi_panjang' => 'Revision or closure of vesicostomy',
            'deskripsi_pendek' => 'Revise clo vesicostomy',
          ),
          381 => 
          array (
            'kode' => '57.31',
            'deskripsi_panjang' => 'Cystoscopy through artificial stoma',
            'deskripsi_pendek' => 'Cystoscopy thru stoma',
          ),
          382 => 
          array (
            'kode' => '57.32',
            'deskripsi_panjang' => 'Other cystoscopy',
            'deskripsi_pendek' => 'Cystoscopy NEC',
          ),
          383 => 
          array (
            'kode' => '57.33',
            'deskripsi_panjang' => 'Closed [transurethral] biopsy of bladder',
            'deskripsi_pendek' => 'Clos transureth bladd bx',
          ),
          384 => 
          array (
            'kode' => '57.34',
            'deskripsi_panjang' => 'Open biopsy of bladder',
            'deskripsi_pendek' => 'Open bladder biopsy',
          ),
          385 => 
          array (
            'kode' => '57.39',
            'deskripsi_panjang' => 'Other diagnostic procedures on bladder',
            'deskripsi_pendek' => 'Bladder diagnos proc NEC',
          ),
          386 => 
          array (
            'kode' => '57.41',
            'deskripsi_panjang' => 'Transurethral lysis of intraluminal adhesions',
            'deskripsi_pendek' => 'Tu adhesiolysis bladder',
          ),
          387 => 
          array (
            'kode' => '57.49',
            'deskripsi_panjang' => 'Other transurethral excision or destruction of lesion or tissue of bladder',
            'deskripsi_pendek' => 'Tu destruc bladd les NEC',
          ),
          388 => 
          array (
            'kode' => '57.51',
            'deskripsi_panjang' => 'Excision of urachus',
            'deskripsi_pendek' => 'Excision of urachus',
          ),
          389 => 
          array (
            'kode' => '57.59',
            'deskripsi_panjang' => 'Open excision or destruction of other lesion or tissue of bladder',
            'deskripsi_pendek' => 'Bladder les destruct NEC',
          ),
          390 => 
          array (
            'kode' => '57.6',
            'deskripsi_panjang' => 'Partial cystectomy',
            'deskripsi_pendek' => 'Partial cystectomy',
          ),
          391 => 
          array (
            'kode' => '57.71',
            'deskripsi_panjang' => 'Radical cystectomy',
            'deskripsi_pendek' => 'Radical cystectomy',
          ),
          392 => 
          array (
            'kode' => '57.79',
            'deskripsi_panjang' => 'Other total cystectomy',
            'deskripsi_pendek' => 'Total cystectomy NEC',
          ),
          393 => 
          array (
            'kode' => '57.81',
            'deskripsi_panjang' => 'Suture of laceration of bladder',
            'deskripsi_pendek' => 'Suture bladder lacerat',
          ),
          394 => 
          array (
            'kode' => '57.82',
            'deskripsi_panjang' => 'Closure of cystostomy',
            'deskripsi_pendek' => 'Cystostomy closure',
          ),
          395 => 
          array (
            'kode' => '57.83',
            'deskripsi_panjang' => 'Repair of fistula involving bladder and intestine',
            'deskripsi_pendek' => 'Enterovesico fist repair',
          ),
          396 => 
          array (
            'kode' => '57.84',
            'deskripsi_panjang' => 'Repair of other fistula of bladder',
            'deskripsi_pendek' => 'Vesic fistula repair NEC',
          ),
          397 => 
          array (
            'kode' => '57.85',
            'deskripsi_panjang' => 'Cystourethroplasty and plastic repair of bladder neck',
            'deskripsi_pendek' => 'Cystourethroplasty',
          ),
          398 => 
          array (
            'kode' => '57.86',
            'deskripsi_panjang' => 'Repair of bladder exstrophy',
            'deskripsi_pendek' => 'Bladder exstrophy repair',
          ),
          399 => 
          array (
            'kode' => '57.87',
            'deskripsi_panjang' => 'Reconstruction of urinary bladder',
            'deskripsi_pendek' => 'Bladder reconstruction',
          ),
          400 => 
          array (
            'kode' => '57.88',
            'deskripsi_panjang' => 'Other anastomosis of bladder',
            'deskripsi_pendek' => 'Bladder anastomosis NEC',
          ),
          401 => 
          array (
            'kode' => '57.89',
            'deskripsi_panjang' => 'Other repair of bladder',
            'deskripsi_pendek' => 'Bladder repair NEC',
          ),
          402 => 
          array (
            'kode' => '57.91',
            'deskripsi_panjang' => 'Sphincterotomy of bladder',
            'deskripsi_pendek' => 'Bladder sphincterotomy',
          ),
          403 => 
          array (
            'kode' => '57.92',
            'deskripsi_panjang' => 'Dilation of bladder neck',
            'deskripsi_pendek' => 'Bladder neck dilation',
          ),
          404 => 
          array (
            'kode' => '57.93',
            'deskripsi_panjang' => 'Control of (postoperative) hemorrhage of bladder',
            'deskripsi_pendek' => 'Control bladd hemorrhage',
          ),
          405 => 
          array (
            'kode' => '57.94',
            'deskripsi_panjang' => 'Insertion of indwelling urinary catheter',
            'deskripsi_pendek' => 'Insert indwelling cath',
          ),
          406 => 
          array (
            'kode' => '57.95',
            'deskripsi_panjang' => 'Replacement of indwelling urinary catheter',
            'deskripsi_pendek' => 'Replace indwelling cath',
          ),
          407 => 
          array (
            'kode' => '57.96',
            'deskripsi_panjang' => 'Implantation of electronic bladder stimulator',
            'deskripsi_pendek' => 'Implant bladder stimulat',
          ),
          408 => 
          array (
            'kode' => '57.97',
            'deskripsi_panjang' => 'Replacement of electronic bladder stimulator',
            'deskripsi_pendek' => 'Replace bladder stimulat',
          ),
          409 => 
          array (
            'kode' => '57.98',
            'deskripsi_panjang' => 'Removal of electronic bladder stimulator',
            'deskripsi_pendek' => 'Remove bladder stimulat',
          ),
          410 => 
          array (
            'kode' => '57.99',
            'deskripsi_panjang' => 'Other operations on bladder',
            'deskripsi_pendek' => 'Bladder operation NEC',
          ),
          411 => 
          array (
            'kode' => '58.0',
            'deskripsi_panjang' => 'Urethrotomy',
            'deskripsi_pendek' => 'Urethrotomy',
          ),
          412 => 
          array (
            'kode' => '58.1',
            'deskripsi_panjang' => 'Urethral meatotomy',
            'deskripsi_pendek' => 'Urethral meatotomy',
          ),
          413 => 
          array (
            'kode' => '58.21',
            'deskripsi_panjang' => 'Perineal urethroscopy',
            'deskripsi_pendek' => 'Perineal urethroscopy',
          ),
          414 => 
          array (
            'kode' => '58.22',
            'deskripsi_panjang' => 'Other urethroscopy',
            'deskripsi_pendek' => 'Urethroscopy NEC',
          ),
          415 => 
          array (
            'kode' => '58.23',
            'deskripsi_panjang' => 'Biopsy of urethra',
            'deskripsi_pendek' => 'Urethral biopsy',
          ),
          416 => 
          array (
            'kode' => '58.24',
            'deskripsi_panjang' => 'Biopsy of periurethral tissue',
            'deskripsi_pendek' => 'Periurethral biopsy',
          ),
          417 => 
          array (
            'kode' => '58.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on urethra and periurethral tissue',
            'deskripsi_pendek' => 'Urethral dx proc NEC',
          ),
          418 => 
          array (
            'kode' => '58.31',
            'deskripsi_panjang' => 'Endoscopic excision or destruction of lesion or tissue of urethra',
            'deskripsi_pendek' => 'Endosc destr urethra les',
          ),
          419 => 
          array (
            'kode' => '58.39',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion or tissue of urethra',
            'deskripsi_pendek' => 'Other destru urethra les',
          ),
          420 => 
          array (
            'kode' => '58.41',
            'deskripsi_panjang' => 'Suture of laceration of urethra',
            'deskripsi_pendek' => 'Suture urethral lacerat',
          ),
          421 => 
          array (
            'kode' => '58.42',
            'deskripsi_panjang' => 'Closure of urethrostomy',
            'deskripsi_pendek' => 'Urethrostomy closure',
          ),
          422 => 
          array (
            'kode' => '58.43',
            'deskripsi_panjang' => 'Closure of other fistula of urethra',
            'deskripsi_pendek' => 'Close ureth fistula NEC',
          ),
          423 => 
          array (
            'kode' => '58.44',
            'deskripsi_panjang' => 'Reanastomosis of urethra',
            'deskripsi_pendek' => 'Urethral reanastomosis',
          ),
          424 => 
          array (
            'kode' => '58.45',
            'deskripsi_panjang' => 'Repair of hypospadias or epispadias',
            'deskripsi_pendek' => 'Hypo-epispadius repair',
          ),
          425 => 
          array (
            'kode' => '58.46',
            'deskripsi_panjang' => 'Other reconstruction of urethra',
            'deskripsi_pendek' => 'Ureth reconstruction NEC',
          ),
          426 => 
          array (
            'kode' => '58.47',
            'deskripsi_panjang' => 'Urethral meatoplasty',
            'deskripsi_pendek' => 'Urethral meatoplasty',
          ),
          427 => 
          array (
            'kode' => '58.49',
            'deskripsi_panjang' => 'Other repair of urethra',
            'deskripsi_pendek' => 'Urethral repair NEC',
          ),
          428 => 
          array (
            'kode' => '58.5',
            'deskripsi_panjang' => 'Release of urethral stricture',
            'deskripsi_pendek' => 'Ureth stricture release',
          ),
          429 => 
          array (
            'kode' => '58.6',
            'deskripsi_panjang' => 'Dilation of urethra',
            'deskripsi_pendek' => 'Urethral dilation',
          ),
          430 => 
          array (
            'kode' => '58.91',
            'deskripsi_panjang' => 'Incision of periurethral tissue',
            'deskripsi_pendek' => 'Periurethral incision',
          ),
          431 => 
          array (
            'kode' => '58.92',
            'deskripsi_panjang' => 'Excision of periurethral tissue',
            'deskripsi_pendek' => 'Periurethral excision',
          ),
          432 => 
          array (
            'kode' => '58.93',
            'deskripsi_panjang' => 'Implantation of artificial urinary sphincter [AUS]',
            'deskripsi_pendek' => 'Implt artf urin sphinct',
          ),
          433 => 
          array (
            'kode' => '58.99',
            'deskripsi_panjang' => 'Other operations on urethra and periurethral tissue',
            'deskripsi_pendek' => 'Ureth/periureth op NEC',
          ),
          434 => 
          array (
            'kode' => '59.00',
            'deskripsi_panjang' => 'Retroperitoneal dissection, not otherwise specified',
            'deskripsi_pendek' => 'Retroperit dissect NOS',
          ),
          435 => 
          array (
            'kode' => '59.02',
            'deskripsi_panjang' => 'Other lysis of perirenal or periureteral adhesions',
            'deskripsi_pendek' => 'Periren adhesiolys NEC',
          ),
          436 => 
          array (
            'kode' => '59.03',
            'deskripsi_panjang' => 'Laparoscopic lysis of perirenal or periureteral adhesions',
            'deskripsi_pendek' => 'Lap lys periren/uret adh',
          ),
          437 => 
          array (
            'kode' => '59.09',
            'deskripsi_panjang' => 'Other incision of perirenal or periureteral tissue',
            'deskripsi_pendek' => 'Periren/ureter incis NEC',
          ),
          438 => 
          array (
            'kode' => '59.11',
            'deskripsi_panjang' => 'Other lysis of perivesical adhesions',
            'deskripsi_pendek' => 'Oth lys perives adhesio',
          ),
          439 => 
          array (
            'kode' => '59.12',
            'deskripsi_panjang' => 'Laparoscopic lysis of perivesical adhesions',
            'deskripsi_pendek' => 'Lap lys perivesureth adh',
          ),
          440 => 
          array (
            'kode' => '59.19',
            'deskripsi_panjang' => 'Other incision of perivesical tissue',
            'deskripsi_pendek' => 'Perivesical incision NEC',
          ),
          441 => 
          array (
            'kode' => '59.21',
            'deskripsi_panjang' => 'Biopsy of perirenal or perivesical tissue',
            'deskripsi_pendek' => 'Periren/ureteral biopsy',
          ),
          442 => 
          array (
            'kode' => '59.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on perirenal tissue, perivesical tissue, and retroperitoneum',
            'deskripsi_pendek' => 'Periren/uret dx proc NEC',
          ),
          443 => 
          array (
            'kode' => '59.3',
            'deskripsi_panjang' => 'Plication of urethrovesical junction',
            'deskripsi_pendek' => 'Urethroves junct plicat',
          ),
          444 => 
          array (
            'kode' => '59.4',
            'deskripsi_panjang' => 'Suprapubic sling operation',
            'deskripsi_pendek' => 'Suprapubic sling op',
          ),
          445 => 
          array (
            'kode' => '59.5',
            'deskripsi_panjang' => 'Retropubic urethral suspension',
            'deskripsi_pendek' => 'Retropubic ureth suspens',
          ),
          446 => 
          array (
            'kode' => '59.6',
            'deskripsi_panjang' => 'Paraurethral suspension',
            'deskripsi_pendek' => 'Paraurethral suspension',
          ),
          447 => 
          array (
            'kode' => '59.71',
            'deskripsi_panjang' => 'Levator muscle operation for urethrovesical suspension',
            'deskripsi_pendek' => 'Levator musc suspension',
          ),
          448 => 
          array (
            'kode' => '59.72',
            'deskripsi_panjang' => 'Injection of implant into urethra and/or bladder neck',
            'deskripsi_pendek' => 'Inject implant urethra',
          ),
          449 => 
          array (
            'kode' => '59.79',
            'deskripsi_panjang' => 'Other repair of urinary stress incontinence',
            'deskripsi_pendek' => 'Urin incontin repair NEC',
          ),
          450 => 
          array (
            'kode' => '59.8',
            'deskripsi_panjang' => 'Ureteral catheterization',
            'deskripsi_pendek' => 'Ureteral catheterization',
          ),
          451 => 
          array (
            'kode' => '59.91',
            'deskripsi_panjang' => 'Excision of perirenal or perivesical tissue',
            'deskripsi_pendek' => 'Periren/vesicle excision',
          ),
          452 => 
          array (
            'kode' => '59.92',
            'deskripsi_panjang' => 'Other operations on perirenal or perivesical tissue',
            'deskripsi_pendek' => 'Periren/vesicle op NEC',
          ),
          453 => 
          array (
            'kode' => '59.93',
            'deskripsi_panjang' => 'Replacement of ureterostomy tube',
            'deskripsi_pendek' => 'Replace ureterost tube',
          ),
          454 => 
          array (
            'kode' => '59.94',
            'deskripsi_panjang' => 'Replacement of cystostomy tube',
            'deskripsi_pendek' => 'Replace cystostomy tube',
          ),
          455 => 
          array (
            'kode' => '59.95',
            'deskripsi_panjang' => 'Ultrasonic fragmentation of urinary stones',
            'deskripsi_pendek' => 'Ultrason fragment-stone',
          ),
          456 => 
          array (
            'kode' => '59.99',
            'deskripsi_panjang' => 'Other operations on urinary system',
            'deskripsi_pendek' => 'Urinary system op NEC',
          ),
          457 => 
          array (
            'kode' => '60.0',
            'deskripsi_panjang' => 'Incision of prostate',
            'deskripsi_pendek' => 'Incision of prostate',
          ),
          458 => 
          array (
            'kode' => '60.11',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of prostate',
            'deskripsi_pendek' => 'Closed prostatic biopsy',
          ),
          459 => 
          array (
            'kode' => '60.12',
            'deskripsi_panjang' => 'Open biopsy of prostate',
            'deskripsi_pendek' => 'Open prostatic biopsy',
          ),
          460 => 
          array (
            'kode' => '60.13',
            'deskripsi_panjang' => 'Closed [percutaneous] biopsy of seminal vesicles',
            'deskripsi_pendek' => 'Clos seminal vesicles bx',
          ),
          461 => 
          array (
            'kode' => '60.14',
            'deskripsi_panjang' => 'Open biopsy of seminal vesicles',
            'deskripsi_pendek' => 'Open seminal vesicles bx',
          ),
          462 => 
          array (
            'kode' => '60.15',
            'deskripsi_panjang' => 'Biopsy of periprostatic tissue',
            'deskripsi_pendek' => 'Periprostatic biopsy',
          ),
          463 => 
          array (
            'kode' => '60.18',
            'deskripsi_panjang' => 'Other diagnostic procedures on prostate and periprostatic tissue',
            'deskripsi_pendek' => 'Prostatic dx proced NEC',
          ),
          464 => 
          array (
            'kode' => '60.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on seminal vesicles',
            'deskripsi_pendek' => 'Semin ves dx proced NEC',
          ),
          465 => 
          array (
            'kode' => '60.21',
            'deskripsi_panjang' => 'Transurethral (ultrasound) guided laser induced prostatectomy (TULIP)',
            'deskripsi_pendek' => 'Transureth prostatectomy',
          ),
          466 => 
          array (
            'kode' => '60.29',
            'deskripsi_panjang' => 'Other transurethral prostatectomy',
            'deskripsi_pendek' => 'Oth transureth prostatec',
          ),
          467 => 
          array (
            'kode' => '60.3',
            'deskripsi_panjang' => 'Suprapubic prostatectomy',
            'deskripsi_pendek' => 'Suprapubic prostatectomy',
          ),
          468 => 
          array (
            'kode' => '60.4',
            'deskripsi_panjang' => 'Retropubic prostatectomy',
            'deskripsi_pendek' => 'Retropubic prostatectomy',
          ),
          469 => 
          array (
            'kode' => '60.5',
            'deskripsi_panjang' => 'Radical prostatectomy',
            'deskripsi_pendek' => 'Radical prostatectomy',
          ),
          470 => 
          array (
            'kode' => '60.61',
            'deskripsi_panjang' => 'Local excision of lesion of prostate',
            'deskripsi_pendek' => 'Los excis prostatic les',
          ),
          471 => 
          array (
            'kode' => '60.62',
            'deskripsi_panjang' => 'Perineal prostatectomy',
            'deskripsi_pendek' => 'Perineal prostatectomy',
          ),
          472 => 
          array (
            'kode' => '60.69',
            'deskripsi_panjang' => 'Other prostatectomy',
            'deskripsi_pendek' => 'Prostatectomy NEC',
          ),
          473 => 
          array (
            'kode' => '60.71',
            'deskripsi_panjang' => 'Percutaneous aspiration of seminal vesicle',
            'deskripsi_pendek' => 'Percut semin ves aspirat',
          ),
          474 => 
          array (
            'kode' => '60.72',
            'deskripsi_panjang' => 'Incision of seminal vesicle',
            'deskripsi_pendek' => 'Seminal vesicle incision',
          ),
          475 => 
          array (
            'kode' => '60.73',
            'deskripsi_panjang' => 'Excision of seminal vesicle',
            'deskripsi_pendek' => 'Seminal vesicle excision',
          ),
          476 => 
          array (
            'kode' => '60.79',
            'deskripsi_panjang' => 'Other operations on seminal vesicles',
            'deskripsi_pendek' => 'Seminal vesicle op NEC',
          ),
          477 => 
          array (
            'kode' => '60.81',
            'deskripsi_panjang' => 'Incision of periprostatic tissue',
            'deskripsi_pendek' => 'Periprostatic incision',
          ),
          478 => 
          array (
            'kode' => '60.82',
            'deskripsi_panjang' => 'Excision of periprostatic tissue',
            'deskripsi_pendek' => 'Periprostatic excision',
          ),
          479 => 
          array (
            'kode' => '60.91',
            'deskripsi_panjang' => 'Percutaneous aspiration of prostate',
            'deskripsi_pendek' => 'Percut prostatic aspirat',
          ),
          480 => 
          array (
            'kode' => '60.92',
            'deskripsi_panjang' => 'Injection into prostate',
            'deskripsi_pendek' => 'Injection into prostate',
          ),
          481 => 
          array (
            'kode' => '60.93',
            'deskripsi_panjang' => 'Repair of prostate',
            'deskripsi_pendek' => 'Repair of prostate',
          ),
          482 => 
          array (
            'kode' => '60.94',
            'deskripsi_panjang' => 'Control of (postoperative) hemorrhage of prostate',
            'deskripsi_pendek' => 'Control prostate hemorr',
          ),
          483 => 
          array (
            'kode' => '60.95',
            'deskripsi_panjang' => 'Transurethral balloon dilation of the prostatic urethra',
            'deskripsi_pendek' => 'Trans bal dil pros ureth',
          ),
          484 => 
          array (
            'kode' => '60.96',
            'deskripsi_panjang' => 'Transurethral destruction of prostate tissue by microwave thermotherapy',
            'deskripsi_pendek' => 'Tu destr prostate by mt',
          ),
          485 => 
          array (
            'kode' => '60.97',
            'deskripsi_panjang' => 'Other transurethral destruction of prostate tissue by other thermotherapy',
            'deskripsi_pendek' => 'Oth tu destr pros - rt',
          ),
          486 => 
          array (
            'kode' => '60.99',
            'deskripsi_panjang' => 'Other operations on prostate',
            'deskripsi_pendek' => 'Prostatic operation NEC',
          ),
          487 => 
          array (
            'kode' => '61.0',
            'deskripsi_panjang' => 'Incision and drainage of scrotum and tunica vaginalis',
            'deskripsi_pendek' => 'Scrotum & tunica i & d',
          ),
          488 => 
          array (
            'kode' => '61.11',
            'deskripsi_panjang' => 'Biopsy of scrotum or tunica vaginalis',
            'deskripsi_pendek' => 'Scrotum & tunica biopsy',
          ),
          489 => 
          array (
            'kode' => '61.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on scrotum and tunica vaginalis',
            'deskripsi_pendek' => 'Scrot/tunica dx proc NEC',
          ),
          490 => 
          array (
            'kode' => '61.2',
            'deskripsi_panjang' => 'Excision of hydrocele (of tunica vaginalis)',
            'deskripsi_pendek' => 'Excision of hydrocele',
          ),
          491 => 
          array (
            'kode' => '61.3',
            'deskripsi_panjang' => 'Excision or destruction of lesion or tissue of scrotum',
            'deskripsi_pendek' => 'Scrotal les destruction',
          ),
          492 => 
          array (
            'kode' => '61.41',
            'deskripsi_panjang' => 'Suture of laceration of scrotum and tunica vaginalis',
            'deskripsi_pendek' => 'Suture scrotal lacerat',
          ),
          493 => 
          array (
            'kode' => '61.42',
            'deskripsi_panjang' => 'Repair of scrotal fistula',
            'deskripsi_pendek' => 'Scrotal fistula repair',
          ),
          494 => 
          array (
            'kode' => '61.49',
            'deskripsi_panjang' => 'Other repair of scrotum and tunica vaginalis',
            'deskripsi_pendek' => 'Scrotum/tunic repair NEC',
          ),
          495 => 
          array (
            'kode' => '61.91',
            'deskripsi_panjang' => 'Percutaneous aspiration of tunica vaginalis',
            'deskripsi_pendek' => 'Percut tunica aspiration',
          ),
          496 => 
          array (
            'kode' => '61.92',
            'deskripsi_panjang' => 'Excision of lesion of tunica vaginalis other than hydrocele',
            'deskripsi_pendek' => 'Excision tunica les NEC',
          ),
          497 => 
          array (
            'kode' => '61.99',
            'deskripsi_panjang' => 'Other operations on scrotum and tunica vaginalis',
            'deskripsi_pendek' => 'Scrotum & tunica op NEC',
          ),
          498 => 
          array (
            'kode' => '62.0',
            'deskripsi_panjang' => 'Incision of testis',
            'deskripsi_pendek' => 'Incision of testes',
          ),
          499 => 
          array (
            'kode' => '62.11',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of testis',
            'deskripsi_pendek' => 'Closed testicular biopsy',
          ),
        ));
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '62.12',
            'deskripsi_panjang' => 'Open biopsy of testis',
            'deskripsi_pendek' => 'Open testicular biopsy',
          ),
          1 => 
          array (
            'kode' => '62.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on testes',
            'deskripsi_pendek' => 'Testes dx procedure NEC',
          ),
          2 => 
          array (
            'kode' => '62.2',
            'deskripsi_panjang' => 'Excision or destruction of testicular lesion',
            'deskripsi_pendek' => 'Testicular les destruct',
          ),
          3 => 
          array (
            'kode' => '62.3',
            'deskripsi_panjang' => 'Unilateral orchiectomy',
            'deskripsi_pendek' => 'Unilateral orchiectomy',
          ),
          4 => 
          array (
            'kode' => '62.41',
            'deskripsi_panjang' => 'Removal of both testes at same operative episode',
            'deskripsi_pendek' => 'Remove both testes',
          ),
          5 => 
          array (
            'kode' => '62.42',
            'deskripsi_panjang' => 'Removal of remaining testis',
            'deskripsi_pendek' => 'Remove solitary testis',
          ),
          6 => 
          array (
            'kode' => '62.5',
            'deskripsi_panjang' => 'Orchiopexy',
            'deskripsi_pendek' => 'Orchiopexy',
          ),
          7 => 
          array (
            'kode' => '62.61',
            'deskripsi_panjang' => 'Suture of laceration of testis',
            'deskripsi_pendek' => 'Suture testicular lacer',
          ),
          8 => 
          array (
            'kode' => '62.69',
            'deskripsi_panjang' => 'Other repair of testis',
            'deskripsi_pendek' => 'Testicular repair NEC',
          ),
          9 => 
          array (
            'kode' => '62.7',
            'deskripsi_panjang' => 'Insertion of testicular prosthesis',
            'deskripsi_pendek' => 'Insert testicular prosth',
          ),
          10 => 
          array (
            'kode' => '62.91',
            'deskripsi_panjang' => 'Aspiration of testis',
            'deskripsi_pendek' => 'Aspiration of testes',
          ),
          11 => 
          array (
            'kode' => '62.92',
            'deskripsi_panjang' => 'Injection of therapeutic substance into testis',
            'deskripsi_pendek' => 'Injection into testes',
          ),
          12 => 
          array (
            'kode' => '62.99',
            'deskripsi_panjang' => 'Other operations on testes',
            'deskripsi_pendek' => 'Testicular operation NEC',
          ),
          13 => 
          array (
            'kode' => '63.01',
            'deskripsi_panjang' => 'Biopsy of spermatic cord, epididymis, or vas deferens',
            'deskripsi_pendek' => 'Spermatic cord/vas biops',
          ),
          14 => 
          array (
            'kode' => '63.09',
            'deskripsi_panjang' => 'Other diagnostic procedures on spermatic cord, epididymis, and vas deferens',
            'deskripsi_pendek' => 'Spermat cord/vas dx NEC',
          ),
          15 => 
          array (
            'kode' => '63.1',
            'deskripsi_panjang' => 'Excision of varicocele and hydrocele of spermatic cord',
            'deskripsi_pendek' => 'Exc spermatic varicocele',
          ),
          16 => 
          array (
            'kode' => '63.2',
            'deskripsi_panjang' => 'Excision of cyst of epididymis',
            'deskripsi_pendek' => 'Excise epididymis cyst',
          ),
          17 => 
          array (
            'kode' => '63.3',
            'deskripsi_panjang' => 'Excision of other lesion or tissue of spermatic cord and epididymis',
            'deskripsi_pendek' => 'Excise cord/epid les NEC',
          ),
          18 => 
          array (
            'kode' => '63.4',
            'deskripsi_panjang' => 'Epididymectomy',
            'deskripsi_pendek' => 'Epididymectomy',
          ),
          19 => 
          array (
            'kode' => '63.51',
            'deskripsi_panjang' => 'Suture of laceration of spermatic cord and epididymis',
            'deskripsi_pendek' => 'Suture cord & epid lacer',
          ),
          20 => 
          array (
            'kode' => '63.52',
            'deskripsi_panjang' => 'Reduction of torsion of testis or spermatic cord',
            'deskripsi_pendek' => 'Reduction torsion testes',
          ),
          21 => 
          array (
            'kode' => '63.53',
            'deskripsi_panjang' => 'Transplantation of spermatic cord',
            'deskripsi_pendek' => 'Transplant spermat cord',
          ),
          22 => 
          array (
            'kode' => '63.59',
            'deskripsi_panjang' => 'Other repair of spermatic cord and epididymis',
            'deskripsi_pendek' => 'Cord & epidid repair NEC',
          ),
          23 => 
          array (
            'kode' => '63.6',
            'deskripsi_panjang' => 'Vasotomy',
            'deskripsi_pendek' => 'Vasotomy',
          ),
          24 => 
          array (
            'kode' => '63.70',
            'deskripsi_panjang' => 'Male sterilization procedure, not otherwise specified',
            'deskripsi_pendek' => 'Male sterilization NOS',
          ),
          25 => 
          array (
            'kode' => '63.71',
            'deskripsi_panjang' => 'Ligation of vas deferens',
            'deskripsi_pendek' => 'Ligation of vas deferens',
          ),
          26 => 
          array (
            'kode' => '63.72',
            'deskripsi_panjang' => 'Ligation of spermatic cord',
            'deskripsi_pendek' => 'Spermatic cord ligation',
          ),
          27 => 
          array (
            'kode' => '63.73',
            'deskripsi_panjang' => 'Vasectomy',
            'deskripsi_pendek' => 'Vasectomy',
          ),
          28 => 
          array (
            'kode' => '63.81',
            'deskripsi_panjang' => 'Suture of laceration of vas deferens and epididymis',
            'deskripsi_pendek' => 'Suture vas & epidid lac',
          ),
          29 => 
          array (
            'kode' => '63.82',
            'deskripsi_panjang' => 'Reconstruction of surgically divided vas deferens',
            'deskripsi_pendek' => 'Postop vas reconstruct',
          ),
          30 => 
          array (
            'kode' => '63.83',
            'deskripsi_panjang' => 'Epididymovasostomy',
            'deskripsi_pendek' => 'Epididymovasostomy',
          ),
          31 => 
          array (
            'kode' => '63.84',
            'deskripsi_panjang' => 'Removal of ligature from vas deferens',
            'deskripsi_pendek' => 'Removal vas ligature',
          ),
          32 => 
          array (
            'kode' => '63.85',
            'deskripsi_panjang' => 'Removal of valve from vas deferens',
            'deskripsi_pendek' => 'Remov vas deferens valve',
          ),
          33 => 
          array (
            'kode' => '63.89',
            'deskripsi_panjang' => 'Other repair of vas deferens and epididymis',
            'deskripsi_pendek' => 'Vas & epididy repair NEC',
          ),
          34 => 
          array (
            'kode' => '63.91',
            'deskripsi_panjang' => 'Aspiration of spermatocele',
            'deskripsi_pendek' => 'Spermatocele aspiration',
          ),
          35 => 
          array (
            'kode' => '63.92',
            'deskripsi_panjang' => 'Epididymotomy',
            'deskripsi_pendek' => 'Epididymotomy',
          ),
          36 => 
          array (
            'kode' => '63.93',
            'deskripsi_panjang' => 'Incision of spermatic cord',
            'deskripsi_pendek' => 'Spermatic cord incision',
          ),
          37 => 
          array (
            'kode' => '63.94',
            'deskripsi_panjang' => 'Lysis of adhesions of spermatic cord',
            'deskripsi_pendek' => 'Sperm cord adhesiolysis',
          ),
          38 => 
          array (
            'kode' => '63.95',
            'deskripsi_panjang' => 'Insertion of valve in vas deferens',
            'deskripsi_pendek' => 'Insert valve in vas def',
          ),
          39 => 
          array (
            'kode' => '63.99',
            'deskripsi_panjang' => 'Other operations on spermatic card, epididymis, and vas deferens',
            'deskripsi_pendek' => 'Cord/epid/vas ops NEC',
          ),
          40 => 
          array (
            'kode' => '64.0',
            'deskripsi_panjang' => 'Circumcision',
            'deskripsi_pendek' => 'Circumcision',
          ),
          41 => 
          array (
            'kode' => '64.11',
            'deskripsi_panjang' => 'Biopsy of penis',
            'deskripsi_pendek' => 'Penile biopsy',
          ),
          42 => 
          array (
            'kode' => '64.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on penis',
            'deskripsi_pendek' => 'Penile diagnost proc NEC',
          ),
          43 => 
          array (
            'kode' => '64.2',
            'deskripsi_panjang' => 'Local excision or destruction of lesion of penis',
            'deskripsi_pendek' => 'Local excis penile les',
          ),
          44 => 
          array (
            'kode' => '64.3',
            'deskripsi_panjang' => 'Amputation of penis',
            'deskripsi_pendek' => 'Amputation of penis',
          ),
          45 => 
          array (
            'kode' => '64.41',
            'deskripsi_panjang' => 'Suture of laceration of penis',
            'deskripsi_pendek' => 'Suture penile laceration',
          ),
          46 => 
          array (
            'kode' => '64.42',
            'deskripsi_panjang' => 'Release of chordee',
            'deskripsi_pendek' => 'Release of chordee',
          ),
          47 => 
          array (
            'kode' => '64.43',
            'deskripsi_panjang' => 'Construction of penis',
            'deskripsi_pendek' => 'Construction of penis',
          ),
          48 => 
          array (
            'kode' => '64.44',
            'deskripsi_panjang' => 'Reconstruction of penis',
            'deskripsi_pendek' => 'Reconstruction of penis',
          ),
          49 => 
          array (
            'kode' => '64.45',
            'deskripsi_panjang' => 'Replantation of penis',
            'deskripsi_pendek' => 'Replantation of penis',
          ),
          50 => 
          array (
            'kode' => '64.49',
            'deskripsi_panjang' => 'Other repair of penis',
            'deskripsi_pendek' => 'Penile repair NEC',
          ),
          51 => 
          array (
            'kode' => '64.5',
            'deskripsi_panjang' => 'Operations for sex transformation, not elsewhere classified',
            'deskripsi_pendek' => 'Sex transformat op NEC',
          ),
          52 => 
          array (
            'kode' => '64.91',
            'deskripsi_panjang' => 'Dorsal or lateral slit of prepuce',
            'deskripsi_pendek' => 'Dorsal/lat slit prepuce',
          ),
          53 => 
          array (
            'kode' => '64.92',
            'deskripsi_panjang' => 'Incision of penis',
            'deskripsi_pendek' => 'Incision of penis',
          ),
          54 => 
          array (
            'kode' => '64.93',
            'deskripsi_panjang' => 'Division of penile adhesions',
            'deskripsi_pendek' => 'Division of penile adhes',
          ),
          55 => 
          array (
            'kode' => '64.94',
            'deskripsi_panjang' => 'Fitting of external prosthesis of penis',
            'deskripsi_pendek' => 'Fit ext penile prosthes',
          ),
          56 => 
          array (
            'kode' => '64.95',
            'deskripsi_panjang' => 'Insertion or replacement of non-inflatable penile prosthesis',
            'deskripsi_pendek' => 'Ins noninfl penis prosth',
          ),
          57 => 
          array (
            'kode' => '64.96',
            'deskripsi_panjang' => 'Removal of internal prosthesis of penis',
            'deskripsi_pendek' => 'Remove int penile prosth',
          ),
          58 => 
          array (
            'kode' => '64.97',
            'deskripsi_panjang' => 'Insertion or replacement of inflatable penile prosthesis',
            'deskripsi_pendek' => 'Ins inflate penis prosth',
          ),
          59 => 
          array (
            'kode' => '64.98',
            'deskripsi_panjang' => 'Other operations on penis',
            'deskripsi_pendek' => 'Penile operation NEC',
          ),
          60 => 
          array (
            'kode' => '64.99',
            'deskripsi_panjang' => 'Other operations on male genital organs',
            'deskripsi_pendek' => 'Male genital op NEC',
          ),
          61 => 
          array (
            'kode' => '65.01',
            'deskripsi_panjang' => 'Laparoscopic oophorotomy',
            'deskripsi_pendek' => 'Laparoscopic oophorotomy',
          ),
          62 => 
          array (
            'kode' => '65.09',
            'deskripsi_panjang' => 'Other oophorotomy',
            'deskripsi_pendek' => 'Other oophorotomy',
          ),
          63 => 
          array (
            'kode' => '65.11',
            'deskripsi_panjang' => 'Aspiration biopsy of ovary',
            'deskripsi_pendek' => 'Ovarian aspirat biopsy',
          ),
          64 => 
          array (
            'kode' => '65.12',
            'deskripsi_panjang' => 'Other biopsy of ovary',
            'deskripsi_pendek' => 'Ovarian biopsy NEC',
          ),
          65 => 
          array (
            'kode' => '65.13',
            'deskripsi_panjang' => 'Laparoscopic biopsy of ovary',
            'deskripsi_pendek' => 'Lap biopsy of ovary',
          ),
          66 => 
          array (
            'kode' => '65.14',
            'deskripsi_panjang' => 'Other laparoscopic diagnostic procedures on ovaries',
            'deskripsi_pendek' => 'Oth lap dx proc ovaries',
          ),
          67 => 
          array (
            'kode' => '65.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on ovaries',
            'deskripsi_pendek' => 'Ovarian dx procedure NEC',
          ),
          68 => 
          array (
            'kode' => '65.21',
            'deskripsi_panjang' => 'Marsupialization of ovarian cyst',
            'deskripsi_pendek' => 'Ovarian cyst marsupializ',
          ),
          69 => 
          array (
            'kode' => '65.22',
            'deskripsi_panjang' => 'Wedge resection of ovary',
            'deskripsi_pendek' => 'Ovarian wedge resection',
          ),
          70 => 
          array (
            'kode' => '65.23',
            'deskripsi_panjang' => 'Laparoscopic marsupialization of ovarian cyst',
            'deskripsi_pendek' => 'Lap marsup ovarian cyst',
          ),
          71 => 
          array (
            'kode' => '65.24',
            'deskripsi_panjang' => 'Laparoscopic wedge resection of ovary',
            'deskripsi_pendek' => 'Lap wedge resect ovary',
          ),
          72 => 
          array (
            'kode' => '65.25',
            'deskripsi_panjang' => 'Other laparoscopic local excision or destruction of ovary',
            'deskripsi_pendek' => 'Oth lap loc exc dest ova',
          ),
          73 => 
          array (
            'kode' => '65.29',
            'deskripsi_panjang' => 'Other local excision or destruction of ovary',
            'deskripsi_pendek' => 'Local destr ova les NEC',
          ),
          74 => 
          array (
            'kode' => '65.31',
            'deskripsi_panjang' => 'Laparoscopic unilateral oophorectomy',
            'deskripsi_pendek' => 'Lap unilat oophorectomy',
          ),
          75 => 
          array (
            'kode' => '65.39',
            'deskripsi_panjang' => 'Other unilateral oophorectomy',
            'deskripsi_pendek' => 'Oth unilat oophorectomy',
          ),
          76 => 
          array (
            'kode' => '65.41',
            'deskripsi_panjang' => 'Laparoscopic unilateral salpingo-oophorectomy',
            'deskripsi_pendek' => 'Lap uni salpingo-oophor',
          ),
          77 => 
          array (
            'kode' => '65.49',
            'deskripsi_panjang' => 'Other unilateral salpingo-oophorectomy',
            'deskripsi_pendek' => 'Oth uni salpingo-oophor',
          ),
          78 => 
          array (
            'kode' => '65.51',
            'deskripsi_panjang' => 'Other removal of both ovaries at same operative episode',
            'deskripsi_pendek' => 'Oth remove both ovaries',
          ),
          79 => 
          array (
            'kode' => '65.52',
            'deskripsi_panjang' => 'Other removal of remaining ovary',
            'deskripsi_pendek' => 'Oth remove remain ovary',
          ),
          80 => 
          array (
            'kode' => '65.53',
            'deskripsi_panjang' => 'Laparoscopic removal of both ovaries at same operative episode',
            'deskripsi_pendek' => 'Lap remove both ovaries',
          ),
          81 => 
          array (
            'kode' => '65.54',
            'deskripsi_panjang' => 'Laparoscopic removal of remaining ovary',
            'deskripsi_pendek' => 'Lap remove remain ovary',
          ),
          82 => 
          array (
            'kode' => '65.61',
            'deskripsi_panjang' => 'Other removal of both ovaries and tubes at same operative episode',
            'deskripsi_pendek' => 'Oth remove ovaries/tubes',
          ),
          83 => 
          array (
            'kode' => '65.62',
            'deskripsi_panjang' => 'Other removal of remaining ovary and tube',
            'deskripsi_pendek' => 'Oth remove rem ova/tube',
          ),
          84 => 
          array (
            'kode' => '65.63',
            'deskripsi_panjang' => 'Laparoscopic removal of both ovaries and tubes at same operative episode',
            'deskripsi_pendek' => 'Lap remove ovaries/tubes',
          ),
          85 => 
          array (
            'kode' => '65.64',
            'deskripsi_panjang' => 'Laparoscopic removal of remaining ovary and tube',
            'deskripsi_pendek' => 'Lap remove rem ova/tube',
          ),
          86 => 
          array (
            'kode' => '65.71',
            'deskripsi_panjang' => 'Other simple suture of ovary',
            'deskripsi_pendek' => 'Oth simple suture ovary',
          ),
          87 => 
          array (
            'kode' => '65.72',
            'deskripsi_panjang' => 'Other reimplantation of ovary',
            'deskripsi_pendek' => 'Oth reimplant of ovary',
          ),
          88 => 
          array (
            'kode' => '65.73',
            'deskripsi_panjang' => 'Other salpingo-oophoroplasty',
            'deskripsi_pendek' => 'Oth salpingo-oophoroplas',
          ),
          89 => 
          array (
            'kode' => '65.74',
            'deskripsi_panjang' => 'Laparoscopic simple suture of ovary',
            'deskripsi_pendek' => 'Lap simple suture ovary',
          ),
          90 => 
          array (
            'kode' => '65.75',
            'deskripsi_panjang' => 'Laparoscopic reimplantation of ovary',
            'deskripsi_pendek' => 'Lap reimplant of ovary',
          ),
          91 => 
          array (
            'kode' => '65.76',
            'deskripsi_panjang' => 'Laparoscopic salpingo-oophoroplasty',
            'deskripsi_pendek' => 'Lap salpingo-oophoroplas',
          ),
          92 => 
          array (
            'kode' => '65.79',
            'deskripsi_panjang' => 'Other repair of ovary',
            'deskripsi_pendek' => 'Repair of ovary NEC',
          ),
          93 => 
          array (
            'kode' => '65.81',
            'deskripsi_panjang' => 'Laparoscopic lysis of adhesions of ovary and fallopian tube',
            'deskripsi_pendek' => 'Lap adhesiolys ova/tube',
          ),
          94 => 
          array (
            'kode' => '65.89',
            'deskripsi_panjang' => 'Other lysis of adhesions of ovary and fallopian tube',
            'deskripsi_pendek' => 'Adhesiolysis ovary/tube',
          ),
          95 => 
          array (
            'kode' => '65.91',
            'deskripsi_panjang' => 'Aspiration of ovary',
            'deskripsi_pendek' => 'Aspiration of ovary',
          ),
          96 => 
          array (
            'kode' => '65.92',
            'deskripsi_panjang' => 'Transplantation of ovary',
            'deskripsi_pendek' => 'Transplantation of ovary',
          ),
          97 => 
          array (
            'kode' => '65.93',
            'deskripsi_panjang' => 'Manual rupture of ovarian cyst',
            'deskripsi_pendek' => 'Manual rupt ovarian cyst',
          ),
          98 => 
          array (
            'kode' => '65.94',
            'deskripsi_panjang' => 'Ovarian denervation',
            'deskripsi_pendek' => 'Ovarian denervation',
          ),
          99 => 
          array (
            'kode' => '65.95',
            'deskripsi_panjang' => 'Release of torsion of ovary',
            'deskripsi_pendek' => 'Ovarian torsion release',
          ),
          100 => 
          array (
            'kode' => '65.99',
            'deskripsi_panjang' => 'Other operations on ovary',
            'deskripsi_pendek' => 'Ovarian operation NEC',
          ),
          101 => 
          array (
            'kode' => '66.01',
            'deskripsi_panjang' => 'Salpingotomy',
            'deskripsi_pendek' => 'Salpingotomy',
          ),
          102 => 
          array (
            'kode' => '66.02',
            'deskripsi_panjang' => 'Salpingostomy',
            'deskripsi_pendek' => 'Salpingostomy',
          ),
          103 => 
          array (
            'kode' => '66.11',
            'deskripsi_panjang' => 'Biopsy of fallopian tube',
            'deskripsi_pendek' => 'Fallopian tube biopsy',
          ),
          104 => 
          array (
            'kode' => '66.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on fallopian tubes',
            'deskripsi_pendek' => 'Fallop tube dx proc NEC',
          ),
          105 => 
          array (
            'kode' => '66.21',
            'deskripsi_panjang' => 'Bilateral endoscopic ligation and crushing of fallopian tubes',
            'deskripsi_pendek' => 'Bilat endosc crush tube',
          ),
          106 => 
          array (
            'kode' => '66.22',
            'deskripsi_panjang' => 'Bilateral endoscopic ligation and division of fallopian tubes',
            'deskripsi_pendek' => 'Bilat endosc divis tube',
          ),
          107 => 
          array (
            'kode' => '66.29',
            'deskripsi_panjang' => 'Other bilateral endoscopic destruction or occlusion of fallopian tubes',
            'deskripsi_pendek' => 'Bilat endos occ tube NEC',
          ),
          108 => 
          array (
            'kode' => '66.31',
            'deskripsi_panjang' => 'Other bilateral ligation and crushing of fallopian tubes',
            'deskripsi_pendek' => 'Bilat tubal crushing NEC',
          ),
          109 => 
          array (
            'kode' => '66.32',
            'deskripsi_panjang' => 'Other bilateral ligation and division of fallopian tubes',
            'deskripsi_pendek' => 'Bilat tubal division NEC',
          ),
          110 => 
          array (
            'kode' => '66.39',
            'deskripsi_panjang' => 'Other bilateral destruction or occlusion of fallopian tubes',
            'deskripsi_pendek' => 'Bilat tubal destruct NEC',
          ),
          111 => 
          array (
            'kode' => '66.4',
            'deskripsi_panjang' => 'Total unilateral salpingectomy',
            'deskripsi_pendek' => 'Total unilat salpingect',
          ),
          112 => 
          array (
            'kode' => '66.51',
            'deskripsi_panjang' => 'Removal of both fallopian tubes at same operative episode',
            'deskripsi_pendek' => 'Remove both fallop tubes',
          ),
          113 => 
          array (
            'kode' => '66.52',
            'deskripsi_panjang' => 'Removal of remaining fallopian tube',
            'deskripsi_pendek' => 'Remove solitary fal tube',
          ),
          114 => 
          array (
            'kode' => '66.61',
            'deskripsi_panjang' => 'Excision or destruction of lesion of fallopian tube',
            'deskripsi_pendek' => 'Destroy fallop tube les',
          ),
          115 => 
          array (
            'kode' => '66.62',
            'deskripsi_panjang' => 'Salpingectomy with removal of tubal pregnancy',
            'deskripsi_pendek' => 'Remov tube & ectop preg',
          ),
          116 => 
          array (
            'kode' => '66.63',
            'deskripsi_panjang' => 'Bilateral partial salpingectomy, not otherwise specified',
            'deskripsi_pendek' => 'Bilat part salpingec NOS',
          ),
          117 => 
          array (
            'kode' => '66.69',
            'deskripsi_panjang' => 'Other partial salpingectomy',
            'deskripsi_pendek' => 'Partial salpingectom NEC',
          ),
          118 => 
          array (
            'kode' => '66.71',
            'deskripsi_panjang' => 'Simple suture of fallopian tube',
            'deskripsi_pendek' => 'Simpl suture fallop tube',
          ),
          119 => 
          array (
            'kode' => '66.72',
            'deskripsi_panjang' => 'Salpingo-oophorostomy',
            'deskripsi_pendek' => 'Salpingo-oophorostomy',
          ),
          120 => 
          array (
            'kode' => '66.73',
            'deskripsi_panjang' => 'Salpingo-salpingostomy',
            'deskripsi_pendek' => 'Salpingo-salpingostomy',
          ),
          121 => 
          array (
            'kode' => '66.74',
            'deskripsi_panjang' => 'Salpingo-uterostomy',
            'deskripsi_pendek' => 'Salpingo-uterostomy',
          ),
          122 => 
          array (
            'kode' => '66.79',
            'deskripsi_panjang' => 'Other repair of fallopian tube',
            'deskripsi_pendek' => 'Fallop tube repair NEC',
          ),
          123 => 
          array (
            'kode' => '66.8',
            'deskripsi_panjang' => 'Insufflation of fallopian tube',
            'deskripsi_pendek' => 'Fallopian tube insufflat',
          ),
          124 => 
          array (
            'kode' => '66.91',
            'deskripsi_panjang' => 'Aspiration of fallopian tube',
            'deskripsi_pendek' => 'Fallopian tube aspirat',
          ),
          125 => 
          array (
            'kode' => '66.92',
            'deskripsi_panjang' => 'Unilateral destruction or occlusion of fallopian tube',
            'deskripsi_pendek' => 'Unilat fallop tube destr',
          ),
          126 => 
          array (
            'kode' => '66.93',
            'deskripsi_panjang' => 'Implantation or replacement of prosthesis of fallopian tube',
            'deskripsi_pendek' => 'Impl fallop tube prosth',
          ),
          127 => 
          array (
            'kode' => '66.94',
            'deskripsi_panjang' => 'Removal of prosthesis of fallopian tube',
            'deskripsi_pendek' => 'Remov fallop tube prosth',
          ),
          128 => 
          array (
            'kode' => '66.95',
            'deskripsi_panjang' => 'Insufflation of therapeutic agent into fallopian tubes',
            'deskripsi_pendek' => 'Blow therapeut into tube',
          ),
          129 => 
          array (
            'kode' => '66.96',
            'deskripsi_panjang' => 'Dilation of fallopian tube',
            'deskripsi_pendek' => 'Fallopian tube dilation',
          ),
          130 => 
          array (
            'kode' => '66.97',
            'deskripsi_panjang' => 'Burying of fimbriae in uterine wall',
            'deskripsi_pendek' => 'Bury fimbriae in uterus',
          ),
          131 => 
          array (
            'kode' => '66.99',
            'deskripsi_panjang' => 'Other operations on fallopian tubes',
            'deskripsi_pendek' => 'Fallopian tube op NEC',
          ),
          132 => 
          array (
            'kode' => '67.0',
            'deskripsi_panjang' => 'Dilation of cervical canal',
            'deskripsi_pendek' => 'Cervical canal dilation',
          ),
          133 => 
          array (
            'kode' => '67.11',
            'deskripsi_panjang' => 'Endocervical biopsy',
            'deskripsi_pendek' => 'Endocervical biopsy',
          ),
          134 => 
          array (
            'kode' => '67.12',
            'deskripsi_panjang' => 'Other cervical biopsy',
            'deskripsi_pendek' => 'Cervical biopsy NEC',
          ),
          135 => 
          array (
            'kode' => '67.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on cervix',
            'deskripsi_pendek' => 'Cervical dx procedur NEC',
          ),
          136 => 
          array (
            'kode' => '67.2',
            'deskripsi_panjang' => 'Conization of cervix',
            'deskripsi_pendek' => 'Conization of cervix',
          ),
          137 => 
          array (
            'kode' => '67.31',
            'deskripsi_panjang' => 'Marsupialization of cervical cyst',
            'deskripsi_pendek' => 'Cervical cyst marsupial',
          ),
          138 => 
          array (
            'kode' => '67.32',
            'deskripsi_panjang' => 'Destruction of lesion of cervix by cauterization',
            'deskripsi_pendek' => 'Cervical les cauterizat',
          ),
          139 => 
          array (
            'kode' => '67.33',
            'deskripsi_panjang' => 'Destruction of lesion of cervix by cryosurgery',
            'deskripsi_pendek' => 'Cervical les cryotherapy',
          ),
          140 => 
          array (
            'kode' => '67.39',
            'deskripsi_panjang' => 'Other excision or destruction of lesion or tissue of cervix',
            'deskripsi_pendek' => 'Cervical les destruc NEC',
          ),
          141 => 
          array (
            'kode' => '67.4',
            'deskripsi_panjang' => 'Amputation of cervix',
            'deskripsi_pendek' => 'Amputation of cervix',
          ),
          142 => 
          array (
            'kode' => '67.51',
            'deskripsi_panjang' => 'Transabdominal cerclage of cervix',
            'deskripsi_pendek' => 'Transab cerclage cervix',
          ),
          143 => 
          array (
            'kode' => '67.59',
            'deskripsi_panjang' => 'Other repair of internal cervical os',
            'deskripsi_pendek' => 'Oth rep int cervical os',
          ),
          144 => 
          array (
            'kode' => '67.61',
            'deskripsi_panjang' => 'Suture of laceration of cervix',
            'deskripsi_pendek' => 'Suture cervical lacerat',
          ),
          145 => 
          array (
            'kode' => '67.62',
            'deskripsi_panjang' => 'Repair of fistula of cervix',
            'deskripsi_pendek' => 'Cervical fistula repair',
          ),
          146 => 
          array (
            'kode' => '67.69',
            'deskripsi_panjang' => 'Other repair of cervix',
            'deskripsi_pendek' => 'Cervical repair NEC',
          ),
          147 => 
          array (
            'kode' => '68.0',
            'deskripsi_panjang' => 'Hysterotomy',
            'deskripsi_pendek' => 'Hysterotomy',
          ),
          148 => 
          array (
            'kode' => '68.11',
            'deskripsi_panjang' => 'Digital examination of uterus',
            'deskripsi_pendek' => 'Digital exam of uterus',
          ),
          149 => 
          array (
            'kode' => '68.12',
            'deskripsi_panjang' => 'Hysteroscopy',
            'deskripsi_pendek' => 'Hysteroscopy',
          ),
          150 => 
          array (
            'kode' => '68.13',
            'deskripsi_panjang' => 'Open biopsy of uterus',
            'deskripsi_pendek' => 'Open uterine biopsy',
          ),
          151 => 
          array (
            'kode' => '68.14',
            'deskripsi_panjang' => 'Open biopsy of uterine ligaments',
            'deskripsi_pendek' => 'Open uterine ligament bx',
          ),
          152 => 
          array (
            'kode' => '68.15',
            'deskripsi_panjang' => 'Closed biopsy of uterine ligaments',
            'deskripsi_pendek' => 'Clos uterine ligament bx',
          ),
          153 => 
          array (
            'kode' => '68.16',
            'deskripsi_panjang' => 'Closed biopsy of uterus',
            'deskripsi_pendek' => 'Closed uterine biopsy',
          ),
          154 => 
          array (
            'kode' => '68.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on uterus and supporting structures',
            'deskripsi_pendek' => 'Uterus/adnex dx proc NEC',
          ),
          155 => 
          array (
            'kode' => '68.21',
            'deskripsi_panjang' => 'Division of endometrial synechiae',
            'deskripsi_pendek' => 'Endomet synechiae divis',
          ),
          156 => 
          array (
            'kode' => '68.22',
            'deskripsi_panjang' => 'Incision or excision of congenital septum of uterus',
            'deskripsi_pendek' => 'Incision uterine septum',
          ),
          157 => 
          array (
            'kode' => '68.23',
            'deskripsi_panjang' => 'Endometrial ablation',
            'deskripsi_pendek' => 'Endometrial ablation',
          ),
          158 => 
          array (
            'kode' => '68.24',
            'deskripsi_panjang' => 'Uterine artery embolization [UAE] with coils',
            'deskripsi_pendek' => 'Uterine art emb w coils',
          ),
          159 => 
          array (
            'kode' => '68.25',
            'deskripsi_panjang' => 'Uterine artery embolization [UAE] without coils',
            'deskripsi_pendek' => 'Uterine art emb w/o coil',
          ),
          160 => 
          array (
            'kode' => '68.29',
            'deskripsi_panjang' => 'Other excision or destruction of lesion of uterus',
            'deskripsi_pendek' => 'Uterine les destruct NEC',
          ),
          161 => 
          array (
            'kode' => '68.31',
            'deskripsi_panjang' => 'Laparoscopic supracervical hysterectomy [LSH]',
            'deskripsi_pendek' => 'Lap scervic hysterectomy',
          ),
          162 => 
          array (
            'kode' => '68.39',
            'deskripsi_panjang' => 'Other and unspecified subtotal abdominal hysterectomy',
            'deskripsi_pendek' => 'Subtotl abd hyst NEC/NOS',
          ),
          163 => 
          array (
            'kode' => '68.41',
            'deskripsi_panjang' => 'Laparoscopic total abdominal hysterectomy',
            'deskripsi_pendek' => 'Lap total abdominal hyst',
          ),
          164 => 
          array (
            'kode' => '68.49',
            'deskripsi_panjang' => 'Other and unspecified total abdominal hysterectomy',
            'deskripsi_pendek' => 'Total abd hyst NEC/NOS',
          ),
          165 => 
          array (
            'kode' => '68.51',
            'deskripsi_panjang' => 'Laparoscopically assisted vaginal hysterectomy (LAVH)',
            'deskripsi_pendek' => 'Lap ast vag hysterectomy',
          ),
          166 => 
          array (
            'kode' => '68.59',
            'deskripsi_panjang' => 'Other and unspecified vaginal hysterectomy',
            'deskripsi_pendek' => 'Vag hysterectomy NEC/NOS',
          ),
          167 => 
          array (
            'kode' => '68.61',
            'deskripsi_panjang' => 'Laparoscopic radical abdominal hysterectomy',
            'deskripsi_pendek' => 'Lap radical abdomnl hyst',
          ),
          168 => 
          array (
            'kode' => '68.69',
            'deskripsi_panjang' => 'Other and unspecified radical abdominal hysterectomy',
            'deskripsi_pendek' => 'Radical abd hyst NEC/NOS',
          ),
          169 => 
          array (
            'kode' => '68.71',
            'deskripsi_panjang' => 'Laparoscopic radical vaginal hysterectomy [LRVH]',
            'deskripsi_pendek' => 'Lap radical vaginal hyst',
          ),
          170 => 
          array (
            'kode' => '68.79',
            'deskripsi_panjang' => 'Other and unspecified radical vaginal hysterectomy',
            'deskripsi_pendek' => 'Radical vag hyst NEC/NOS',
          ),
          171 => 
          array (
            'kode' => '68.8',
            'deskripsi_panjang' => 'Pelvic evisceration',
            'deskripsi_pendek' => 'Pelvic evisceration',
          ),
          172 => 
          array (
            'kode' => '68.9',
            'deskripsi_panjang' => 'Other and unspecified hysterectomy',
            'deskripsi_pendek' => 'Hysterectomy NEC/NOS',
          ),
          173 => 
          array (
            'kode' => '69.01',
            'deskripsi_panjang' => 'Dilation and curettage for termination of pregnancy',
            'deskripsi_pendek' => 'D & C for preg terminat',
          ),
          174 => 
          array (
            'kode' => '69.02',
            'deskripsi_panjang' => 'Dilation and curettage following delivery or abortion',
            'deskripsi_pendek' => 'D & C post delivery',
          ),
          175 => 
          array (
            'kode' => '69.09',
            'deskripsi_panjang' => 'Other dilation and curettage',
            'deskripsi_pendek' => 'D & C NEC',
          ),
          176 => 
          array (
            'kode' => '69.19',
            'deskripsi_panjang' => 'Other excision or destruction of uterus and supporting structures',
            'deskripsi_pendek' => 'Destruc uter support NEC',
          ),
          177 => 
          array (
            'kode' => '69.21',
            'deskripsi_panjang' => 'Interposition operation',
            'deskripsi_pendek' => 'Interposit op uterin lig',
          ),
          178 => 
          array (
            'kode' => '69.22',
            'deskripsi_panjang' => 'Other uterine suspension',
            'deskripsi_pendek' => 'Uterine suspension NEC',
          ),
          179 => 
          array (
            'kode' => '69.23',
            'deskripsi_panjang' => 'Vaginal repair of chronic inversion of uterus',
            'deskripsi_pendek' => 'Vag repair invers uterus',
          ),
          180 => 
          array (
            'kode' => '69.29',
            'deskripsi_panjang' => 'Other repair of uterus and supporting structures',
            'deskripsi_pendek' => 'Uterus/adnexa repair NEC',
          ),
          181 => 
          array (
            'kode' => '69.3',
            'deskripsi_panjang' => 'Paracervical uterine denervation',
            'deskripsi_pendek' => 'Paracerv uterine denerv',
          ),
          182 => 
          array (
            'kode' => '69.41',
            'deskripsi_panjang' => 'Suture of laceration of uterus',
            'deskripsi_pendek' => 'Suture uterine lacerat',
          ),
          183 => 
          array (
            'kode' => '69.42',
            'deskripsi_panjang' => 'Closure of fistula of uterus',
            'deskripsi_pendek' => 'Closure uterine fistula',
          ),
          184 => 
          array (
            'kode' => '69.49',
            'deskripsi_panjang' => 'Other repair of uterus',
            'deskripsi_pendek' => 'Uterine repair NEC',
          ),
          185 => 
          array (
            'kode' => '69.51',
            'deskripsi_panjang' => 'Aspiration curettage of uterus for termination of pregnancy',
            'deskripsi_pendek' => 'Aspirat curet-preg termi',
          ),
          186 => 
          array (
            'kode' => '69.52',
            'deskripsi_panjang' => 'Aspiration curettage following delivery or abortion',
            'deskripsi_pendek' => 'Aspirat curet-post deliv',
          ),
          187 => 
          array (
            'kode' => '69.59',
            'deskripsi_panjang' => 'Other aspiration curettage of uterus',
            'deskripsi_pendek' => 'Aspir curett uterus NEC',
          ),
          188 => 
          array (
            'kode' => '69.6',
            'deskripsi_panjang' => 'Menstrual extraction or regulation',
            'deskripsi_pendek' => 'Menstrual extraction',
          ),
          189 => 
          array (
            'kode' => '69.7',
            'deskripsi_panjang' => 'Insertion of intrauterine contraceptive device',
            'deskripsi_pendek' => 'Insertion of iud',
          ),
          190 => 
          array (
            'kode' => '69.91',
            'deskripsi_panjang' => 'Insertion of therapeutic device into uterus',
            'deskripsi_pendek' => 'Insert uterine device',
          ),
          191 => 
          array (
            'kode' => '69.92',
            'deskripsi_panjang' => 'Artificial insemination',
            'deskripsi_pendek' => 'Artificial insemination',
          ),
          192 => 
          array (
            'kode' => '69.93',
            'deskripsi_panjang' => 'Insertion of laminaria',
            'deskripsi_pendek' => 'Insertion of laminaria',
          ),
          193 => 
          array (
            'kode' => '69.94',
            'deskripsi_panjang' => 'Manual replacement of inverted uterus',
            'deskripsi_pendek' => 'Man replace invert uter',
          ),
          194 => 
          array (
            'kode' => '69.95',
            'deskripsi_panjang' => 'Incision of cervix',
            'deskripsi_pendek' => 'Incision of cervix',
          ),
          195 => 
          array (
            'kode' => '69.96',
            'deskripsi_panjang' => 'Removal of cerclage material from cervix',
            'deskripsi_pendek' => 'Remove cervical cerclage',
          ),
          196 => 
          array (
            'kode' => '69.97',
            'deskripsi_panjang' => 'Removal of other penetrating foreign body from cervix',
            'deskripsi_pendek' => 'Remove penetrat cerv FB',
          ),
          197 => 
          array (
            'kode' => '69.98',
            'deskripsi_panjang' => 'Other operations on supporting structures of uterus',
            'deskripsi_pendek' => 'Uterine support op NEC',
          ),
          198 => 
          array (
            'kode' => '69.99',
            'deskripsi_panjang' => 'Other operations on cervix and uterus',
            'deskripsi_pendek' => 'Uterine operation NEC',
          ),
          199 => 
          array (
            'kode' => '70.0',
            'deskripsi_panjang' => 'Culdocentesis',
            'deskripsi_pendek' => 'Culdocentesis',
          ),
          200 => 
          array (
            'kode' => '70.11',
            'deskripsi_panjang' => 'Hymenotomy',
            'deskripsi_pendek' => 'Hymenotomy',
          ),
          201 => 
          array (
            'kode' => '70.12',
            'deskripsi_panjang' => 'Culdotomy',
            'deskripsi_pendek' => 'Culdotomy',
          ),
          202 => 
          array (
            'kode' => '70.13',
            'deskripsi_panjang' => 'Lysis of intraluminal adhesions of vagina',
            'deskripsi_pendek' => 'Intralum vag adhesiolys',
          ),
          203 => 
          array (
            'kode' => '70.14',
            'deskripsi_panjang' => 'Other vaginotomy',
            'deskripsi_pendek' => 'Vaginotomy NEC',
          ),
          204 => 
          array (
            'kode' => '70.21',
            'deskripsi_panjang' => 'Vaginoscopy',
            'deskripsi_pendek' => 'Vaginoscopy',
          ),
          205 => 
          array (
            'kode' => '70.22',
            'deskripsi_panjang' => 'Culdoscopy',
            'deskripsi_pendek' => 'Culdoscopy',
          ),
          206 => 
          array (
            'kode' => '70.23',
            'deskripsi_panjang' => 'Biopsy of cul-de-sac',
            'deskripsi_pendek' => 'Cul-de-sac biopsy',
          ),
          207 => 
          array (
            'kode' => '70.24',
            'deskripsi_panjang' => 'Vaginal biopsy',
            'deskripsi_pendek' => 'Vaginal biopsy',
          ),
          208 => 
          array (
            'kode' => '70.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on vagina and cul-de-sac',
            'deskripsi_pendek' => 'Vagin/cul-de-sac dx NEC',
          ),
          209 => 
          array (
            'kode' => '70.31',
            'deskripsi_panjang' => 'Hymenectomy',
            'deskripsi_pendek' => 'Hymenectomy',
          ),
          210 => 
          array (
            'kode' => '70.32',
            'deskripsi_panjang' => 'Excision or destruction of lesion of cul-de-sac',
            'deskripsi_pendek' => 'Excis cul-de-sac lesion',
          ),
          211 => 
          array (
            'kode' => '70.33',
            'deskripsi_panjang' => 'Excision or destruction of lesion of vagina',
            'deskripsi_pendek' => 'Excision vaginal lesion',
          ),
          212 => 
          array (
            'kode' => '70.4',
            'deskripsi_panjang' => 'Obliteration and total excision of vagina',
            'deskripsi_pendek' => 'Vaginal obliteration',
          ),
          213 => 
          array (
            'kode' => '70.50',
            'deskripsi_panjang' => 'Repair of cystocele and rectocele',
            'deskripsi_pendek' => 'Cystocel/rectocel repair',
          ),
          214 => 
          array (
            'kode' => '70.51',
            'deskripsi_panjang' => 'Repair of cystocele',
            'deskripsi_pendek' => 'Cystocele repair',
          ),
          215 => 
          array (
            'kode' => '70.52',
            'deskripsi_panjang' => 'Repair of rectocele',
            'deskripsi_pendek' => 'Rectocele repair',
          ),
          216 => 
          array (
            'kode' => '70.53',
            'deskripsi_panjang' => 'Repair of cystocele and rectocele with graft or prosthesis',
            'deskripsi_pendek' => 'Cysto & recto w grf/pros',
          ),
          217 => 
          array (
            'kode' => '70.54',
            'deskripsi_panjang' => 'Repair of cystocele with graft or prosthesis',
            'deskripsi_pendek' => 'Rep cystocel w grft/pros',
          ),
          218 => 
          array (
            'kode' => '70.55',
            'deskripsi_panjang' => 'Repair of rectocele with graft or prosthesis',
            'deskripsi_pendek' => 'Rep rectocele w grf/pros',
          ),
          219 => 
          array (
            'kode' => '70.61',
            'deskripsi_panjang' => 'Vaginal construction',
            'deskripsi_pendek' => 'Vaginal construction',
          ),
          220 => 
          array (
            'kode' => '70.62',
            'deskripsi_panjang' => 'Vaginal reconstruction',
            'deskripsi_pendek' => 'Vaginal reconstruction',
          ),
          221 => 
          array (
            'kode' => '70.63',
            'deskripsi_panjang' => 'Vaginal construction with graft or prosthesis',
            'deskripsi_pendek' => 'Vaginal const w grf/pros',
          ),
          222 => 
          array (
            'kode' => '70.64',
            'deskripsi_panjang' => 'Vaginal reconstruction with graft or prosthesis',
            'deskripsi_pendek' => 'Vag reconst w grft/pros',
          ),
          223 => 
          array (
            'kode' => '70.71',
            'deskripsi_panjang' => 'Suture of laceration of vagina',
            'deskripsi_pendek' => 'Suture vagina laceration',
          ),
          224 => 
          array (
            'kode' => '70.72',
            'deskripsi_panjang' => 'Repair of colovaginal fistula',
            'deskripsi_pendek' => 'Repair colovagin fistula',
          ),
          225 => 
          array (
            'kode' => '70.73',
            'deskripsi_panjang' => 'Repair of rectovaginal fistula',
            'deskripsi_pendek' => 'Repair rectovag fistula',
          ),
          226 => 
          array (
            'kode' => '70.74',
            'deskripsi_panjang' => 'Repair of other vaginoenteric fistula',
            'deskripsi_pendek' => 'Rep vaginoent fistul NEC',
          ),
          227 => 
          array (
            'kode' => '70.75',
            'deskripsi_panjang' => 'Repair of other fistula of vagina',
            'deskripsi_pendek' => 'Repair vag fistula NEC',
          ),
          228 => 
          array (
            'kode' => '70.76',
            'deskripsi_panjang' => 'Hymenorrhaphy',
            'deskripsi_pendek' => 'Hymenorrhaphy',
          ),
          229 => 
          array (
            'kode' => '70.77',
            'deskripsi_panjang' => 'Vaginal suspension and fixation',
            'deskripsi_pendek' => 'Vaginal suspens & fixat',
          ),
          230 => 
          array (
            'kode' => '70.78',
            'deskripsi_panjang' => 'Vaginal suspension and fixation with graft or prosthesis',
            'deskripsi_pendek' => 'Vag susp/fix w grft/pros',
          ),
          231 => 
          array (
            'kode' => '70.79',
            'deskripsi_panjang' => 'Other repair of vagina',
            'deskripsi_pendek' => 'Vaginal repair NEC',
          ),
          232 => 
          array (
            'kode' => '70.8',
            'deskripsi_panjang' => 'Obliteration of vaginal vault',
            'deskripsi_pendek' => 'Vaginal vault obliterat',
          ),
          233 => 
          array (
            'kode' => '70.91',
            'deskripsi_panjang' => 'Other operations on vagina',
            'deskripsi_pendek' => 'Vaginal operation NEC',
          ),
          234 => 
          array (
            'kode' => '70.92',
            'deskripsi_panjang' => 'Other operations on cul-de-sac',
            'deskripsi_pendek' => 'Cul-de-sac operation NEC',
          ),
          235 => 
          array (
            'kode' => '70.93',
            'deskripsi_panjang' => 'Other operations on cul-de-sac with graft or prosthesis',
            'deskripsi_pendek' => 'Cul-de-sac grf/pros NEC',
          ),
          236 => 
          array (
            'kode' => '70.94',
            'deskripsi_panjang' => 'Insertion of biological graft',
            'deskripsi_pendek' => 'Insert biological graft',
          ),
          237 => 
          array (
            'kode' => '70.95',
            'deskripsi_panjang' => 'Insertion of synthetic graft or prosthesis',
            'deskripsi_pendek' => 'Insert synth graft/prost',
          ),
          238 => 
          array (
            'kode' => '71.01',
            'deskripsi_panjang' => 'Lysis of vulvar adhesions',
            'deskripsi_pendek' => 'Vulvar adhesiolysis',
          ),
          239 => 
          array (
            'kode' => '71.09',
            'deskripsi_panjang' => 'Other incision of vulva and perineum',
            'deskripsi_pendek' => 'Incis vulva/perineum NEC',
          ),
          240 => 
          array (
            'kode' => '71.11',
            'deskripsi_panjang' => 'Biopsy of vulva',
            'deskripsi_pendek' => 'Vulvar biopsy',
          ),
          241 => 
          array (
            'kode' => '71.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on vulva',
            'deskripsi_pendek' => 'Vulvar diagnos proc NEC',
          ),
          242 => 
          array (
            'kode' => '71.21',
            'deskripsi_panjang' => 'Percutaneous aspiration of Bartholins gland (cyst)',
            'deskripsi_pendek' => 'Percutan bartholin aspir',
          ),
          243 => 
          array (
            'kode' => '71.22',
            'deskripsi_panjang' => 'Incision of Bartholins gland (cyst)',
            'deskripsi_pendek' => 'Incise bartholins gland',
          ),
          244 => 
          array (
            'kode' => '71.23',
            'deskripsi_panjang' => 'Marsupialization of Bartholins gland (cyst)',
            'deskripsi_pendek' => 'Bartholin gland marsup',
          ),
          245 => 
          array (
            'kode' => '71.24',
            'deskripsi_panjang' => 'Excision or other destruction of Bartholins gland (cyst)',
            'deskripsi_pendek' => 'Destruc bartholin gland',
          ),
          246 => 
          array (
            'kode' => '71.29',
            'deskripsi_panjang' => 'Other operations on Bartholins gland',
            'deskripsi_pendek' => 'Bartholins gland op NEC',
          ),
          247 => 
          array (
            'kode' => '71.3',
            'deskripsi_panjang' => 'Other local excision or destruction of vulva and perineum',
            'deskripsi_pendek' => 'Local vulvar excis NEC',
          ),
          248 => 
          array (
            'kode' => '71.4',
            'deskripsi_panjang' => 'Operations on clitoris',
            'deskripsi_pendek' => 'Operations on clitoris',
          ),
          249 => 
          array (
            'kode' => '71.5',
            'deskripsi_panjang' => 'Radical vulvectomy',
            'deskripsi_pendek' => 'Radical vulvectomy',
          ),
          250 => 
          array (
            'kode' => '71.61',
            'deskripsi_panjang' => 'Unilateral vulvectomy',
            'deskripsi_pendek' => 'Unilateral vulvectomy',
          ),
          251 => 
          array (
            'kode' => '71.62',
            'deskripsi_panjang' => 'Bilateral vulvectomy',
            'deskripsi_pendek' => 'Bilateral vulvectomy',
          ),
          252 => 
          array (
            'kode' => '71.71',
            'deskripsi_panjang' => 'Suture of laceration of vulva or perineum',
            'deskripsi_pendek' => 'Suture vulvar laceration',
          ),
          253 => 
          array (
            'kode' => '71.72',
            'deskripsi_panjang' => 'Repair of fistula of vulva or perineum',
            'deskripsi_pendek' => 'Repair vulvar fistula',
          ),
          254 => 
          array (
            'kode' => '71.79',
            'deskripsi_panjang' => 'Other repair of vulva and perineum',
            'deskripsi_pendek' => 'Vulvar/perin repair NEC',
          ),
          255 => 
          array (
            'kode' => '71.8',
            'deskripsi_panjang' => 'Other operations on vulva',
            'deskripsi_pendek' => 'Other vulvar operations',
          ),
          256 => 
          array (
            'kode' => '71.9',
            'deskripsi_panjang' => 'Other operations on female genital organs',
            'deskripsi_pendek' => 'Other female genital ops',
          ),
          257 => 
          array (
            'kode' => '72.0',
            'deskripsi_panjang' => 'Low forceps operation',
            'deskripsi_pendek' => 'Low forceps operation',
          ),
          258 => 
          array (
            'kode' => '72.1',
            'deskripsi_panjang' => 'Low forceps operation with episiotomy',
            'deskripsi_pendek' => 'Low forceps w episiotomy',
          ),
          259 => 
          array (
            'kode' => '72.21',
            'deskripsi_panjang' => 'Mid forceps operation with episiotomy',
            'deskripsi_pendek' => 'Mid forceps w episiotomy',
          ),
          260 => 
          array (
            'kode' => '72.29',
            'deskripsi_panjang' => 'Other mid forceps operation',
            'deskripsi_pendek' => 'Mid forceps op NEC',
          ),
          261 => 
          array (
            'kode' => '72.31',
            'deskripsi_panjang' => 'High forceps operation with episiotomy',
            'deskripsi_pendek' => 'High forceps w episiot',
          ),
          262 => 
          array (
            'kode' => '72.39',
            'deskripsi_panjang' => 'Other high forceps operation',
            'deskripsi_pendek' => 'High forceps op NEC',
          ),
          263 => 
          array (
            'kode' => '72.4',
            'deskripsi_panjang' => 'Forceps rotation of fetal head',
            'deskripsi_pendek' => 'Forceps rotat fetal head',
          ),
          264 => 
          array (
            'kode' => '72.51',
            'deskripsi_panjang' => 'Partial breech extraction with forceps to aftercoming head',
            'deskripsi_pendek' => 'Part brch extrac w forcp',
          ),
          265 => 
          array (
            'kode' => '72.52',
            'deskripsi_panjang' => 'Other partial breech extraction',
            'deskripsi_pendek' => 'Part breech extract NEC',
          ),
          266 => 
          array (
            'kode' => '72.53',
            'deskripsi_panjang' => 'Total breech extraction with forceps to aftercoming head',
            'deskripsi_pendek' => 'Tot brch extrac w forcep',
          ),
          267 => 
          array (
            'kode' => '72.54',
            'deskripsi_panjang' => 'Other total breech extraction',
            'deskripsi_pendek' => 'Tot breech extrac NEC',
          ),
          268 => 
          array (
            'kode' => '72.6',
            'deskripsi_panjang' => 'Forceps application to aftercoming head',
            'deskripsi_pendek' => 'Forceps-aftercoming head',
          ),
          269 => 
          array (
            'kode' => '72.71',
            'deskripsi_panjang' => 'Vacuum extraction with episiotomy',
            'deskripsi_pendek' => 'Vacuum ext del w episiot',
          ),
          270 => 
          array (
            'kode' => '72.79',
            'deskripsi_panjang' => 'Other vacuum extraction',
            'deskripsi_pendek' => 'Vacuum extract del NEC',
          ),
          271 => 
          array (
            'kode' => '72.8',
            'deskripsi_panjang' => 'Other specified instrumental delivery',
            'deskripsi_pendek' => 'Instrument delivery NEC',
          ),
          272 => 
          array (
            'kode' => '72.9',
            'deskripsi_panjang' => 'Unspecified instrumental delivery',
            'deskripsi_pendek' => 'Instrument delivery NOS',
          ),
          273 => 
          array (
            'kode' => '73.01',
            'deskripsi_panjang' => 'Induction of labor by artificial rupture of membranes',
            'deskripsi_pendek' => 'Induct labor-rupt memb',
          ),
          274 => 
          array (
            'kode' => '73.09',
            'deskripsi_panjang' => 'Other artificial rupture of membranes',
            'deskripsi_pendek' => 'Artif rupt membranes NEC',
          ),
          275 => 
          array (
            'kode' => '73.1',
            'deskripsi_panjang' => 'Other surgical induction of labor',
            'deskripsi_pendek' => 'Surg induct labor NEC',
          ),
          276 => 
          array (
            'kode' => '73.21',
            'deskripsi_panjang' => 'Internal and combined version without extraction',
            'deskripsi_pendek' => 'Int/comb version no extr',
          ),
          277 => 
          array (
            'kode' => '73.22',
            'deskripsi_panjang' => 'Internal and combined version with extraction',
            'deskripsi_pendek' => 'Int/comb version w extr',
          ),
          278 => 
          array (
            'kode' => '73.3',
            'deskripsi_panjang' => 'Failed forceps',
            'deskripsi_pendek' => 'Failed forceps',
          ),
          279 => 
          array (
            'kode' => '73.4',
            'deskripsi_panjang' => 'Medical induction of labor',
            'deskripsi_pendek' => 'Medical induction labor',
          ),
          280 => 
          array (
            'kode' => '73.51',
            'deskripsi_panjang' => 'Manual rotation of fetal head',
            'deskripsi_pendek' => 'Manual rotat fetal head',
          ),
          281 => 
          array (
            'kode' => '73.59',
            'deskripsi_panjang' => 'Other manually assisted delivery',
            'deskripsi_pendek' => 'Manual assist deliv NEC',
          ),
          282 => 
          array (
            'kode' => '73.6',
            'deskripsi_panjang' => 'Episiotomy',
            'deskripsi_pendek' => 'Episiotomy',
          ),
          283 => 
          array (
            'kode' => '73.8',
            'deskripsi_panjang' => 'Operations on fetus to facilitate delivery',
            'deskripsi_pendek' => 'Fetal ops-facilitate del',
          ),
          284 => 
          array (
            'kode' => '73.91',
            'deskripsi_panjang' => 'External version assisting delivery',
            'deskripsi_pendek' => 'Ext version-assist deliv',
          ),
          285 => 
          array (
            'kode' => '73.92',
            'deskripsi_panjang' => 'Replacement of prolapsed umbilical cord',
            'deskripsi_pendek' => 'Replace prolapsed cord',
          ),
          286 => 
          array (
            'kode' => '73.93',
            'deskripsi_panjang' => 'Incision of cervix to assist delivery',
            'deskripsi_pendek' => 'Incis cx to assist deliv',
          ),
          287 => 
          array (
            'kode' => '73.94',
            'deskripsi_panjang' => 'Pubiotomy to assist delivery',
            'deskripsi_pendek' => 'Pubiotomy to assist del',
          ),
          288 => 
          array (
            'kode' => '73.99',
            'deskripsi_panjang' => 'Other operations assisting delivery',
            'deskripsi_pendek' => 'Ops assisting deliv NEC',
          ),
          289 => 
          array (
            'kode' => '74.0',
            'deskripsi_panjang' => 'Classical cesarean section',
            'deskripsi_pendek' => 'Classical c-section',
          ),
          290 => 
          array (
            'kode' => '74.1',
            'deskripsi_panjang' => 'Low cervical cesarean section',
            'deskripsi_pendek' => 'Low cervical c-section',
          ),
          291 => 
          array (
            'kode' => '74.2',
            'deskripsi_panjang' => 'Extraperitoneal cesarean section',
            'deskripsi_pendek' => 'Extraperitoneal c-sect',
          ),
          292 => 
          array (
            'kode' => '74.3',
            'deskripsi_panjang' => 'Removal of extratubal ectopic pregnancy',
            'deskripsi_pendek' => 'Rem extratub ectop preg',
          ),
          293 => 
          array (
            'kode' => '74.4',
            'deskripsi_panjang' => 'Cesarean section of other specified type',
            'deskripsi_pendek' => 'Cesarean section NEC',
          ),
          294 => 
          array (
            'kode' => '74.91',
            'deskripsi_panjang' => 'Hysterotomy to terminate pregnancy',
            'deskripsi_pendek' => 'Hysterotomy to termin pg',
          ),
          295 => 
          array (
            'kode' => '74.99',
            'deskripsi_panjang' => 'Other cesarean section of unspecified type',
            'deskripsi_pendek' => 'Cesarean section NOS',
          ),
          296 => 
          array (
            'kode' => '75.0',
            'deskripsi_panjang' => 'Intra-amniotic injection for abortion',
            'deskripsi_pendek' => 'Intra-amnion inj for ab',
          ),
          297 => 
          array (
            'kode' => '75.1',
            'deskripsi_panjang' => 'Diagnostic amniocentesis',
            'deskripsi_pendek' => 'Diagnostic amniocentesis',
          ),
          298 => 
          array (
            'kode' => '75.2',
            'deskripsi_panjang' => 'Intrauterine transfusion',
            'deskripsi_pendek' => 'Intrauterine transfusion',
          ),
          299 => 
          array (
            'kode' => '75.31',
            'deskripsi_panjang' => 'Amnioscopy',
            'deskripsi_pendek' => 'Amnioscopy',
          ),
          300 => 
          array (
            'kode' => '75.32',
            'deskripsi_panjang' => 'Fetal EKG (scalp)',
            'deskripsi_pendek' => 'Fetal ekg',
          ),
          301 => 
          array (
            'kode' => '75.33',
            'deskripsi_panjang' => 'Fetal blood sampling and biopsy',
            'deskripsi_pendek' => 'Fetal blood sample/bx',
          ),
          302 => 
          array (
            'kode' => '75.34',
            'deskripsi_panjang' => 'Other fetal monitoring',
            'deskripsi_pendek' => 'Other fetal monitoring',
          ),
          303 => 
          array (
            'kode' => '75.35',
            'deskripsi_panjang' => 'Other diagnostic procedures on fetus and amnion',
            'deskripsi_pendek' => 'Dx proc fetus/amnion NEC',
          ),
          304 => 
          array (
            'kode' => '75.36',
            'deskripsi_panjang' => 'Correction of fetal defect',
            'deskripsi_pendek' => 'Correction fetal defect',
          ),
          305 => 
          array (
            'kode' => '75.37',
            'deskripsi_panjang' => 'Amnioinfusion',
            'deskripsi_pendek' => 'Amnioinfusion',
          ),
          306 => 
          array (
            'kode' => '75.38',
            'deskripsi_panjang' => 'Fetal pulse oximetry',
            'deskripsi_pendek' => 'Fetal pulse oximetry',
          ),
          307 => 
          array (
            'kode' => '75.4',
            'deskripsi_panjang' => 'Manual removal of retained placenta',
            'deskripsi_pendek' => 'Manual removal-placenta',
          ),
          308 => 
          array (
            'kode' => '75.50',
            'deskripsi_panjang' => 'Repair of current obstetric laceration of uterus, not otherwise specified',
            'deskripsi_pendek' => 'Repair ob lac uterus NOS',
          ),
          309 => 
          array (
            'kode' => '75.51',
            'deskripsi_panjang' => 'Repair of current obstetric laceration of cervix',
            'deskripsi_pendek' => 'Repair ob lacerat cervix',
          ),
          310 => 
          array (
            'kode' => '75.52',
            'deskripsi_panjang' => 'Repair of current obstetric laceration of corpus uteri',
            'deskripsi_pendek' => 'Repair ob lac corp uteri',
          ),
          311 => 
          array (
            'kode' => '75.61',
            'deskripsi_panjang' => 'Repair of current obstetric laceration of bladder and urethra',
            'deskripsi_pendek' => 'Repair ob lac blad/ureth',
          ),
          312 => 
          array (
            'kode' => '75.62',
            'deskripsi_panjang' => 'Repair of current obstetric laceration of rectum and sphincter ani',
            'deskripsi_pendek' => 'Repair ob lac rect/anus',
          ),
          313 => 
          array (
            'kode' => '75.69',
            'deskripsi_panjang' => 'Repair of other current obstetric laceration',
            'deskripsi_pendek' => 'Repair ob laceration NEC',
          ),
          314 => 
          array (
            'kode' => '75.7',
            'deskripsi_panjang' => 'Manual exploration of uterine cavity, postpartum',
            'deskripsi_pendek' => 'Manual explor uterus p/p',
          ),
          315 => 
          array (
            'kode' => '75.8',
            'deskripsi_panjang' => 'Obstetric tamponade of uterus or vagina',
            'deskripsi_pendek' => 'Ob tamponade uterus/vag',
          ),
          316 => 
          array (
            'kode' => '75.91',
            'deskripsi_panjang' => 'Evacuation of obstetrical incisional hematoma of perineum',
            'deskripsi_pendek' => 'Evac ob inc hemat perin',
          ),
          317 => 
          array (
            'kode' => '75.92',
            'deskripsi_panjang' => 'Evacuation of other hematoma of vulva or vagina',
            'deskripsi_pendek' => 'Evac ob hemat vulva/vag',
          ),
          318 => 
          array (
            'kode' => '75.93',
            'deskripsi_panjang' => 'Surgical correction of inverted uterus',
            'deskripsi_pendek' => 'Surg corr invert uterus',
          ),
          319 => 
          array (
            'kode' => '75.94',
            'deskripsi_panjang' => 'Immediate postpartum manual replacement of inverted uterus',
            'deskripsi_pendek' => 'Man replac invert uterus',
          ),
          320 => 
          array (
            'kode' => '75.99',
            'deskripsi_panjang' => 'Other obstetric operations',
            'deskripsi_pendek' => 'Obstetric operation NEC',
          ),
          321 => 
          array (
            'kode' => '76.01',
            'deskripsi_panjang' => 'Sequestrectomy of facial bone',
            'deskripsi_pendek' => 'Facial bone sequestrect',
          ),
          322 => 
          array (
            'kode' => '76.09',
            'deskripsi_panjang' => 'Other incision of facial bone',
            'deskripsi_pendek' => 'Facial bone incision NEC',
          ),
          323 => 
          array (
            'kode' => '76.11',
            'deskripsi_panjang' => 'Biopsy of facial bone',
            'deskripsi_pendek' => 'Facial bone biopsy',
          ),
          324 => 
          array (
            'kode' => '76.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on facial bones and joints',
            'deskripsi_pendek' => 'Facial bone dx proc NEC',
          ),
          325 => 
          array (
            'kode' => '76.2',
            'deskripsi_panjang' => 'Local excision or destruction of lesion of facial bone',
            'deskripsi_pendek' => 'Destruct facial bone les',
          ),
          326 => 
          array (
            'kode' => '76.31',
            'deskripsi_panjang' => 'Partial mandibulectomy',
            'deskripsi_pendek' => 'Partial mandibulectomy',
          ),
          327 => 
          array (
            'kode' => '76.39',
            'deskripsi_panjang' => 'Partial ostectomy of other facial bone',
            'deskripsi_pendek' => 'Part facial ostectom NEC',
          ),
          328 => 
          array (
            'kode' => '76.41',
            'deskripsi_panjang' => 'Total mandibulectomy with synchronous reconstruction',
            'deskripsi_pendek' => 'Tot mandibulec w reconst',
          ),
          329 => 
          array (
            'kode' => '76.42',
            'deskripsi_panjang' => 'Other total mandibulectomy',
            'deskripsi_pendek' => 'Total mandibulectomy NEC',
          ),
          330 => 
          array (
            'kode' => '76.43',
            'deskripsi_panjang' => 'Other reconstruction of mandible',
            'deskripsi_pendek' => 'Mandibular reconst NEC',
          ),
          331 => 
          array (
            'kode' => '76.44',
            'deskripsi_panjang' => 'Total ostectomy of other facial bone with synchronous reconstruction',
            'deskripsi_pendek' => 'Tot face ostect w recons',
          ),
          332 => 
          array (
            'kode' => '76.45',
            'deskripsi_panjang' => 'Other total ostectomy of other facial bone',
            'deskripsi_pendek' => 'Tot face bone ostect NEC',
          ),
          333 => 
          array (
            'kode' => '76.46',
            'deskripsi_panjang' => 'Other reconstruction of other facial bone',
            'deskripsi_pendek' => 'Facial bone reconstr NEC',
          ),
          334 => 
          array (
            'kode' => '76.5',
            'deskripsi_panjang' => 'Temporomandibular arthroplasty',
            'deskripsi_pendek' => 'Temporomand arthroplasty',
          ),
          335 => 
          array (
            'kode' => '76.61',
            'deskripsi_panjang' => 'Closed osteoplasty [osteotomy] of mandibular ramus',
            'deskripsi_pendek' => 'Cl osteoplasty mand rami',
          ),
          336 => 
          array (
            'kode' => '76.62',
            'deskripsi_panjang' => 'Open osteoplasty [osteotomy] of mandibular ramus',
            'deskripsi_pendek' => 'Open osteoplas mand rami',
          ),
          337 => 
          array (
            'kode' => '76.63',
            'deskripsi_panjang' => 'Osteoplasty [osteotomy] of body of mandible',
            'deskripsi_pendek' => 'Osteoplasty mandible bdy',
          ),
          338 => 
          array (
            'kode' => '76.64',
            'deskripsi_panjang' => 'Other orthognathic surgery on mandible',
            'deskripsi_pendek' => 'Mand orthognathic op NEC',
          ),
          339 => 
          array (
            'kode' => '76.65',
            'deskripsi_panjang' => 'Segmental osteoplasty [osteotomy] of maxilla',
            'deskripsi_pendek' => 'Seg osteoplasty maxilla',
          ),
          340 => 
          array (
            'kode' => '76.66',
            'deskripsi_panjang' => 'Total osteoplasty [osteotomy] of maxilla',
            'deskripsi_pendek' => 'Tot osteoplasty maxilla',
          ),
          341 => 
          array (
            'kode' => '76.67',
            'deskripsi_panjang' => 'Reduction genioplasty',
            'deskripsi_pendek' => 'Reduction genioplasty',
          ),
          342 => 
          array (
            'kode' => '76.68',
            'deskripsi_panjang' => 'Augmentation genioplasty',
            'deskripsi_pendek' => 'Augmentation genioplasty',
          ),
          343 => 
          array (
            'kode' => '76.69',
            'deskripsi_panjang' => 'Other facial bone repair',
            'deskripsi_pendek' => 'Facial bone repair NEC',
          ),
          344 => 
          array (
            'kode' => '76.70',
            'deskripsi_panjang' => 'Reduction of facial fracture, not otherwise specified',
            'deskripsi_pendek' => 'Reduction facial fx NOS',
          ),
          345 => 
          array (
            'kode' => '76.71',
            'deskripsi_panjang' => 'Closed reduction of malar and zygomatic fracture',
            'deskripsi_pendek' => 'Cl reduct malar/zygo fx',
          ),
          346 => 
          array (
            'kode' => '76.72',
            'deskripsi_panjang' => 'Open reduction of malar and zygomatic fracture',
            'deskripsi_pendek' => 'Opn reduct malar/zygo fx',
          ),
          347 => 
          array (
            'kode' => '76.73',
            'deskripsi_panjang' => 'Closed reduction of maxillary fracture',
            'deskripsi_pendek' => 'Cl reduct maxillary fx',
          ),
          348 => 
          array (
            'kode' => '76.74',
            'deskripsi_panjang' => 'Open reduction of maxillary fracture',
            'deskripsi_pendek' => 'Open reduct maxillary fx',
          ),
          349 => 
          array (
            'kode' => '76.75',
            'deskripsi_panjang' => 'Closed reduction of mandibular fracture',
            'deskripsi_pendek' => 'Cl reduct mandible fx',
          ),
          350 => 
          array (
            'kode' => '76.76',
            'deskripsi_panjang' => 'Open reduction of mandibular fracture',
            'deskripsi_pendek' => 'Open reduct mandible fx',
          ),
          351 => 
          array (
            'kode' => '76.77',
            'deskripsi_panjang' => 'Open reduction of alveolar fracture',
            'deskripsi_pendek' => 'Open reduct alveolar fx',
          ),
          352 => 
          array (
            'kode' => '76.78',
            'deskripsi_panjang' => 'Other closed reduction of facial fracture',
            'deskripsi_pendek' => 'Cl reduct facial fx NEC',
          ),
          353 => 
          array (
            'kode' => '76.79',
            'deskripsi_panjang' => 'Other open reduction of facial fracture',
            'deskripsi_pendek' => 'Open reduct face fx NEC',
          ),
          354 => 
          array (
            'kode' => '76.91',
            'deskripsi_panjang' => 'Bone graft to facial bone',
            'deskripsi_pendek' => 'Bone graft to face bone',
          ),
          355 => 
          array (
            'kode' => '76.92',
            'deskripsi_panjang' => 'Insertion of synthetic implant in facial bone',
            'deskripsi_pendek' => 'Syn implant to face bone',
          ),
          356 => 
          array (
            'kode' => '76.93',
            'deskripsi_panjang' => 'Closed reduction of temporomandibular dislocation',
            'deskripsi_pendek' => 'Clos reduct tm dislocat',
          ),
          357 => 
          array (
            'kode' => '76.94',
            'deskripsi_panjang' => 'Open reduction of temporomandibular dislocation',
            'deskripsi_pendek' => 'Open reduct tm dislocat',
          ),
          358 => 
          array (
            'kode' => '76.95',
            'deskripsi_panjang' => 'Other manipulation of temporomandibular joint',
            'deskripsi_pendek' => 'Tm manipulation NEC',
          ),
          359 => 
          array (
            'kode' => '76.96',
            'deskripsi_panjang' => 'Injection of therapeutic substance into temporomandibular joint',
            'deskripsi_pendek' => 'Injec therap sbst tm jnt',
          ),
          360 => 
          array (
            'kode' => '76.97',
            'deskripsi_panjang' => 'Removal of internal fixation device from facial bone',
            'deskripsi_pendek' => 'Remove int fix face bone',
          ),
          361 => 
          array (
            'kode' => '76.99',
            'deskripsi_panjang' => 'Other operations on facial bones and joints',
            'deskripsi_pendek' => 'Facial bone/jnt op NEC',
          ),
          362 => 
          array (
            'kode' => '77.00',
            'deskripsi_panjang' => 'Sequestrectomy, unspecified site',
            'deskripsi_pendek' => 'Sequestrectomy NOS',
          ),
          363 => 
          array (
            'kode' => '77.01',
            'deskripsi_panjang' => 'Sequestrectomy, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Chest cage sequestrec',
          ),
          364 => 
          array (
            'kode' => '77.02',
            'deskripsi_panjang' => 'Sequestrectomy, humerus',
            'deskripsi_pendek' => 'Humerus sequestrectomy',
          ),
          365 => 
          array (
            'kode' => '77.03',
            'deskripsi_panjang' => 'Sequestrectomy, radius and ulna',
            'deskripsi_pendek' => 'Radius & ulna sequestrec',
          ),
          366 => 
          array (
            'kode' => '77.04',
            'deskripsi_panjang' => 'Sequestrectomy, carpals and metacarpals',
            'deskripsi_pendek' => 'Metacarp/carp sequestrec',
          ),
          367 => 
          array (
            'kode' => '77.05',
            'deskripsi_panjang' => 'Sequestrectomy, femur',
            'deskripsi_pendek' => 'Femoral sequestrectomy',
          ),
          368 => 
          array (
            'kode' => '77.06',
            'deskripsi_panjang' => 'Sequestrectomy, patella',
            'deskripsi_pendek' => 'Patellar sequestrectomy',
          ),
          369 => 
          array (
            'kode' => '77.07',
            'deskripsi_panjang' => 'Sequestrectomy, tibia and fibula',
            'deskripsi_pendek' => 'Tibia/fibula sequestrec',
          ),
          370 => 
          array (
            'kode' => '77.08',
            'deskripsi_panjang' => 'Sequestrectomy, tarsals and metatarsals',
            'deskripsi_pendek' => 'Metatar/tar sequestrec',
          ),
          371 => 
          array (
            'kode' => '77.09',
            'deskripsi_panjang' => 'Sequestrectomy, other bones',
            'deskripsi_pendek' => 'Sequestrectomy NEC',
          ),
          372 => 
          array (
            'kode' => '77.10',
            'deskripsi_panjang' => 'Other incision of bone without division, unspecified site',
            'deskripsi_pendek' => 'Other bone incision NOS',
          ),
          373 => 
          array (
            'kode' => '77.11',
            'deskripsi_panjang' => 'Other incision of bone without division, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Other chest cage incis',
          ),
          374 => 
          array (
            'kode' => '77.12',
            'deskripsi_panjang' => 'Other incision of bone without division, humerus',
            'deskripsi_pendek' => 'Other humerus incision',
          ),
          375 => 
          array (
            'kode' => '77.13',
            'deskripsi_panjang' => 'Other incision of bone without division, radius and ulna',
            'deskripsi_pendek' => 'Other radius/ulna incis',
          ),
          376 => 
          array (
            'kode' => '77.14',
            'deskripsi_panjang' => 'Other incision of bone without division, carpals and metacarpals',
            'deskripsi_pendek' => 'Oth metacarp/carp incis',
          ),
          377 => 
          array (
            'kode' => '77.15',
            'deskripsi_panjang' => 'Other incision of bone without division, femur',
            'deskripsi_pendek' => 'Other femoral incision',
          ),
          378 => 
          array (
            'kode' => '77.16',
            'deskripsi_panjang' => 'Other incision of bone without division, patella',
            'deskripsi_pendek' => 'Other patellar incision',
          ),
          379 => 
          array (
            'kode' => '77.17',
            'deskripsi_panjang' => 'Other incision of bone without division, tibia and fibula',
            'deskripsi_pendek' => 'Other tibia/fibula incis',
          ),
          380 => 
          array (
            'kode' => '77.18',
            'deskripsi_panjang' => 'Other incision of bone without division, tarsals and metatarsals',
            'deskripsi_pendek' => 'Oth metatars/tars incis',
          ),
          381 => 
          array (
            'kode' => '77.19',
            'deskripsi_panjang' => 'Other incision of bone without division, other bones',
            'deskripsi_pendek' => 'Bone incis w/o div NEC',
          ),
          382 => 
          array (
            'kode' => '77.20',
            'deskripsi_panjang' => 'Wedge osteotomy, unspecified site',
            'deskripsi_pendek' => 'Wedge osteotomy NOS',
          ),
          383 => 
          array (
            'kode' => '77.21',
            'deskripsi_panjang' => 'Wedge osteotomy, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Chest cage wedg osteotom',
          ),
          384 => 
          array (
            'kode' => '77.22',
            'deskripsi_panjang' => 'Wedge osteotomy, humerus',
            'deskripsi_pendek' => 'Humerus wedge osteotomy',
          ),
          385 => 
          array (
            'kode' => '77.23',
            'deskripsi_panjang' => 'Wedge osteotomy, radius and ulna',
            'deskripsi_pendek' => 'Radius/ulna wedg osteoto',
          ),
          386 => 
          array (
            'kode' => '77.24',
            'deskripsi_panjang' => 'Wedge osteotomy, carpals and metacarpals',
            'deskripsi_pendek' => 'Metacar/car wedg osteoto',
          ),
          387 => 
          array (
            'kode' => '77.25',
            'deskripsi_panjang' => 'Wedge osteotomy, femur',
            'deskripsi_pendek' => 'Femoral wedge osteotomy',
          ),
          388 => 
          array (
            'kode' => '77.26',
            'deskripsi_panjang' => 'Wedge osteotomy, patella',
            'deskripsi_pendek' => 'Patellar wedge osteotomy',
          ),
          389 => 
          array (
            'kode' => '77.27',
            'deskripsi_panjang' => 'Wedge osteotomy, tibia and fibula',
            'deskripsi_pendek' => 'Tibia/fibul wedg osteot',
          ),
          390 => 
          array (
            'kode' => '77.28',
            'deskripsi_panjang' => 'Wedge osteotomy, tarsals and metatarsals',
            'deskripsi_pendek' => 'Metatar/tar wedg osteot',
          ),
          391 => 
          array (
            'kode' => '77.29',
            'deskripsi_panjang' => 'Wedge osteotomy, other bones',
            'deskripsi_pendek' => 'Wedge osteotomy NEC',
          ),
          392 => 
          array (
            'kode' => '77.30',
            'deskripsi_panjang' => 'Other division of bone, unspecified site',
            'deskripsi_pendek' => 'Other bone division NOS',
          ),
          393 => 
          array (
            'kode' => '77.31',
            'deskripsi_panjang' => 'Other division of bone, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Chest cage bone div NEC',
          ),
          394 => 
          array (
            'kode' => '77.32',
            'deskripsi_panjang' => 'Other division of bone, humerus',
            'deskripsi_pendek' => 'Humerus division NEC',
          ),
          395 => 
          array (
            'kode' => '77.33',
            'deskripsi_panjang' => 'Other division of bone, radius and ulna',
            'deskripsi_pendek' => 'Radius/ulna division NEC',
          ),
          396 => 
          array (
            'kode' => '77.34',
            'deskripsi_panjang' => 'Other division of bone, carpals and metacarpals',
            'deskripsi_pendek' => 'Metacar/car division NEC',
          ),
          397 => 
          array (
            'kode' => '77.35',
            'deskripsi_panjang' => 'Other division of bone, femur',
            'deskripsi_pendek' => 'Femoral division NEC',
          ),
          398 => 
          array (
            'kode' => '77.36',
            'deskripsi_panjang' => 'Other division of bone, patella',
            'deskripsi_pendek' => 'Patellar division NEC',
          ),
          399 => 
          array (
            'kode' => '77.37',
            'deskripsi_panjang' => 'Other division of bone, tibia and fibula',
            'deskripsi_pendek' => 'Tibia/fibula div NEC',
          ),
          400 => 
          array (
            'kode' => '77.38',
            'deskripsi_panjang' => 'Other division of bone, tarsals and metatarsals',
            'deskripsi_pendek' => 'Metatar/tar division NEC',
          ),
          401 => 
          array (
            'kode' => '77.39',
            'deskripsi_panjang' => 'Other division of bone, other bones',
            'deskripsi_pendek' => 'Bone division NEC',
          ),
          402 => 
          array (
            'kode' => '77.40',
            'deskripsi_panjang' => 'Biopsy of bone, unspecified site',
            'deskripsi_pendek' => 'Bone biopsy NOS',
          ),
          403 => 
          array (
            'kode' => '77.41',
            'deskripsi_panjang' => 'Biopsy of bone, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Chest cage bone biopsy',
          ),
          404 => 
          array (
            'kode' => '77.42',
            'deskripsi_panjang' => 'Biopsy of bone, humerus',
            'deskripsi_pendek' => 'Humerus biopsy',
          ),
          405 => 
          array (
            'kode' => '77.43',
            'deskripsi_panjang' => 'Biopsy of bone, radius and ulna',
            'deskripsi_pendek' => 'Radius & ulna biopsy',
          ),
          406 => 
          array (
            'kode' => '77.44',
            'deskripsi_panjang' => 'Biopsy of bone, carpals and metacarpals',
            'deskripsi_pendek' => 'Metacarpal/carpal biopsy',
          ),
          407 => 
          array (
            'kode' => '77.45',
            'deskripsi_panjang' => 'Biopsy of bone, femur',
            'deskripsi_pendek' => 'Femoral biopsy',
          ),
          408 => 
          array (
            'kode' => '77.46',
            'deskripsi_panjang' => 'Biopsy of bone, patella',
            'deskripsi_pendek' => 'Patellar biopsy',
          ),
          409 => 
          array (
            'kode' => '77.47',
            'deskripsi_panjang' => 'Biopsy of bone, tibia and fibula',
            'deskripsi_pendek' => 'Tibia & fibula biopsy',
          ),
          410 => 
          array (
            'kode' => '77.48',
            'deskripsi_panjang' => 'Biopsy of bone, tarsals and metatarsals',
            'deskripsi_pendek' => 'Metatarsal/tarsal biopsy',
          ),
          411 => 
          array (
            'kode' => '77.49',
            'deskripsi_panjang' => 'Biopsy of bone, other bones',
            'deskripsi_pendek' => 'Bone biopsy NEC',
          ),
          412 => 
          array (
            'kode' => '77.51',
            'deskripsi_panjang' => 'Bunionectomy with soft tissue correction and osteotomy of the first metatarsal',
            'deskripsi_pendek' => 'Bunionect/sft/osteotomy',
          ),
          413 => 
          array (
            'kode' => '77.52',
            'deskripsi_panjang' => 'Bunionectomy with soft tissue correction and arthrodesis',
            'deskripsi_pendek' => 'Bunionect/sft/arthrodes',
          ),
          414 => 
          array (
            'kode' => '77.53',
            'deskripsi_panjang' => 'Other bunionectomy with soft tissue correction',
            'deskripsi_pendek' => 'Oth bunionect w sft corr',
          ),
          415 => 
          array (
            'kode' => '77.54',
            'deskripsi_panjang' => 'Excision or correction of bunionette',
            'deskripsi_pendek' => 'Exc correct bunionette',
          ),
          416 => 
          array (
            'kode' => '77.56',
            'deskripsi_panjang' => 'Repair of hammer toe',
            'deskripsi_pendek' => 'Repair of hammer toe',
          ),
          417 => 
          array (
            'kode' => '77.57',
            'deskripsi_panjang' => 'Repair of claw toe',
            'deskripsi_pendek' => 'Repair of claw toe',
          ),
          418 => 
          array (
            'kode' => '77.58',
            'deskripsi_panjang' => 'Other excision, fusion and repair of toes',
            'deskripsi_pendek' => 'Oth exc, fus, repair toe',
          ),
          419 => 
          array (
            'kode' => '77.59',
            'deskripsi_panjang' => 'Other bunionectomy',
            'deskripsi_pendek' => 'Bunionectomy NEC',
          ),
          420 => 
          array (
            'kode' => '77.60',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, unspecified site',
            'deskripsi_pendek' => 'Loc exc bone lesion NOS',
          ),
          421 => 
          array (
            'kode' => '77.61',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Exc chest cage bone les',
          ),
          422 => 
          array (
            'kode' => '77.62',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, humerus',
            'deskripsi_pendek' => 'Loc exc bone les humerus',
          ),
          423 => 
          array (
            'kode' => '77.63',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, radius and ulna',
            'deskripsi_pendek' => 'Loc exc les radius/ulna',
          ),
          424 => 
          array (
            'kode' => '77.64',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, carpals and metacarpals',
            'deskripsi_pendek' => 'Loc exc les metacar/car',
          ),
          425 => 
          array (
            'kode' => '77.65',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, femur',
            'deskripsi_pendek' => 'Loc exc bone les femur',
          ),
          426 => 
          array (
            'kode' => '77.66',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, patella',
            'deskripsi_pendek' => 'Loc exc bone les patella',
          ),
          427 => 
          array (
            'kode' => '77.67',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, tibia and fibula',
            'deskripsi_pendek' => 'Loc exc les tibia/fibula',
          ),
          428 => 
          array (
            'kode' => '77.68',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, tarsals and metatarsals',
            'deskripsi_pendek' => 'Loc exc les metatar/tar',
          ),
          429 => 
          array (
            'kode' => '77.69',
            'deskripsi_panjang' => 'Local excision of lesion or tissue of bone, other bones',
            'deskripsi_pendek' => 'Loc exc bone lesion NEC',
          ),
          430 => 
          array (
            'kode' => '77.70',
            'deskripsi_panjang' => 'Excision of bone for graft, unspecified site',
            'deskripsi_pendek' => 'Excise bone for grft NOS',
          ),
          431 => 
          array (
            'kode' => '77.71',
            'deskripsi_panjang' => 'Excision of bone for graft, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Ex chest cage bone-gft',
          ),
          432 => 
          array (
            'kode' => '77.72',
            'deskripsi_panjang' => 'Excision of bone for graft, humerus',
            'deskripsi_pendek' => 'Excise humerus for graft',
          ),
          433 => 
          array (
            'kode' => '77.73',
            'deskripsi_panjang' => 'Excision of bone for graft, radius and ulna',
            'deskripsi_pendek' => 'Excis radius/ulna-graft',
          ),
          434 => 
          array (
            'kode' => '77.74',
            'deskripsi_panjang' => 'Excision of bone for graft, carpals and metacarpals',
            'deskripsi_pendek' => 'Excis metacar/car-graft',
          ),
          435 => 
          array (
            'kode' => '77.75',
            'deskripsi_panjang' => 'Excision of bone for graft, femur',
            'deskripsi_pendek' => 'Excise femur for graft',
          ),
          436 => 
          array (
            'kode' => '77.76',
            'deskripsi_panjang' => 'Excision of bone for graft, patella',
            'deskripsi_pendek' => 'Excise patella for graft',
          ),
          437 => 
          array (
            'kode' => '77.77',
            'deskripsi_panjang' => 'Excision of bone for graft, tibia and fibula',
            'deskripsi_pendek' => 'Excise tib/fib for graft',
          ),
          438 => 
          array (
            'kode' => '77.78',
            'deskripsi_panjang' => 'Excision of bone for graft, tarsals and metatarsals',
            'deskripsi_pendek' => 'Excis metatar/tar-graft',
          ),
          439 => 
          array (
            'kode' => '77.79',
            'deskripsi_panjang' => 'Excision of bone for graft, other bones',
            'deskripsi_pendek' => 'Excise bone for gft NEC',
          ),
          440 => 
          array (
            'kode' => '77.80',
            'deskripsi_panjang' => 'Other partial ostectomy, unspecified site',
            'deskripsi_pendek' => 'Oth part ostectomy NOS',
          ),
          441 => 
          array (
            'kode' => '77.81',
            'deskripsi_panjang' => 'Other partial ostectomy, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Oth chest cage ostectomy',
          ),
          442 => 
          array (
            'kode' => '77.82',
            'deskripsi_panjang' => 'Other partial ostectomy, humerus',
            'deskripsi_pendek' => 'Partial humerectomy NEC',
          ),
          443 => 
          array (
            'kode' => '77.83',
            'deskripsi_panjang' => 'Other partial ostectomy, radius and ulna',
            'deskripsi_pendek' => 'Part ostect-radius/ulna',
          ),
          444 => 
          array (
            'kode' => '77.84',
            'deskripsi_panjang' => 'Other partial ostectomy, carpals and metacarpals',
            'deskripsi_pendek' => 'Part ostect-metacar/car',
          ),
          445 => 
          array (
            'kode' => '77.85',
            'deskripsi_panjang' => 'Other partial ostectomy, femur',
            'deskripsi_pendek' => 'Part ostectomy-femur',
          ),
          446 => 
          array (
            'kode' => '77.86',
            'deskripsi_panjang' => 'Other partial ostectomy, patella',
            'deskripsi_pendek' => 'Partial patellectomy',
          ),
          447 => 
          array (
            'kode' => '77.87',
            'deskripsi_panjang' => 'Other partial ostectomy, tibia and fibula',
            'deskripsi_pendek' => 'Part ostect-tibia/fibula',
          ),
          448 => 
          array (
            'kode' => '77.88',
            'deskripsi_panjang' => 'Other partial ostectomy, tarsals and metatarsals',
            'deskripsi_pendek' => 'Part ostect-metatar/tar',
          ),
          449 => 
          array (
            'kode' => '77.89',
            'deskripsi_panjang' => 'Other partial ostectomy, other bones',
            'deskripsi_pendek' => 'Partial ostectomy NEC',
          ),
          450 => 
          array (
            'kode' => '77.90',
            'deskripsi_panjang' => 'Total ostectomy, unspecified site',
            'deskripsi_pendek' => 'Total ostectomy NOS',
          ),
          451 => 
          array (
            'kode' => '77.91',
            'deskripsi_panjang' => 'Total ostectomy, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Tot chest cage ostectomy',
          ),
          452 => 
          array (
            'kode' => '77.92',
            'deskripsi_panjang' => 'Total ostectomy, humerus',
            'deskripsi_pendek' => 'Total ostectomy-humerus',
          ),
          453 => 
          array (
            'kode' => '77.93',
            'deskripsi_panjang' => 'Total ostectomy, radius and ulna',
            'deskripsi_pendek' => 'Tot ostect-radius/ulna',
          ),
          454 => 
          array (
            'kode' => '77.94',
            'deskripsi_panjang' => 'Total ostectomy, carpals and metacarpals',
            'deskripsi_pendek' => 'Tot ostect-metacarp/carp',
          ),
          455 => 
          array (
            'kode' => '77.95',
            'deskripsi_panjang' => 'Total ostectomy, femur',
            'deskripsi_pendek' => 'Tot ostectomy-femur',
          ),
          456 => 
          array (
            'kode' => '77.96',
            'deskripsi_panjang' => 'Total ostectomy, patella',
            'deskripsi_pendek' => 'Total patellectomy',
          ),
          457 => 
          array (
            'kode' => '77.97',
            'deskripsi_panjang' => 'Total ostectomy, tibia and fibula',
            'deskripsi_pendek' => 'Tot ostect-tibia/fibula',
          ),
          458 => 
          array (
            'kode' => '77.98',
            'deskripsi_panjang' => 'Total ostectomy, tarsals and metatarsals',
            'deskripsi_pendek' => 'Tot ostect-metatars/tars',
          ),
          459 => 
          array (
            'kode' => '77.99',
            'deskripsi_panjang' => 'Total ostectomy, other bones',
            'deskripsi_pendek' => 'Total ostectomy NEC',
          ),
          460 => 
          array (
            'kode' => '78.00',
            'deskripsi_panjang' => 'Bone graft, unspecified site',
            'deskripsi_pendek' => 'Bone graft NOS',
          ),
          461 => 
          array (
            'kode' => '78.01',
            'deskripsi_panjang' => 'Bone graft, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Bone graft to chest cage',
          ),
          462 => 
          array (
            'kode' => '78.02',
            'deskripsi_panjang' => 'Bone graft, humerus',
            'deskripsi_pendek' => 'Bone graft to humerus',
          ),
          463 => 
          array (
            'kode' => '78.03',
            'deskripsi_panjang' => 'Bone graft, radius and ulna',
            'deskripsi_pendek' => 'Bone graft-radius/ulna',
          ),
          464 => 
          array (
            'kode' => '78.04',
            'deskripsi_panjang' => 'Bone graft, carpals and metacarpals',
            'deskripsi_pendek' => 'Bone grft to metacar/car',
          ),
          465 => 
          array (
            'kode' => '78.05',
            'deskripsi_panjang' => 'Bone graft, femur',
            'deskripsi_pendek' => 'Bone graft to femur',
          ),
          466 => 
          array (
            'kode' => '78.06',
            'deskripsi_panjang' => 'Bone graft, patella',
            'deskripsi_pendek' => 'Bone graft to patella',
          ),
          467 => 
          array (
            'kode' => '78.07',
            'deskripsi_panjang' => 'Bone graft, tibia and fibula',
            'deskripsi_pendek' => 'Bone graft-tibia/fibula',
          ),
          468 => 
          array (
            'kode' => '78.08',
            'deskripsi_panjang' => 'Bone graft, tarsals and metatarsals',
            'deskripsi_pendek' => 'Bone graft-metatar/tar',
          ),
          469 => 
          array (
            'kode' => '78.09',
            'deskripsi_panjang' => 'Bone graft, other bones',
            'deskripsi_pendek' => 'Bone graft NEC',
          ),
          470 => 
          array (
            'kode' => '78.10',
            'deskripsi_panjang' => 'Application of external fixator device, unspecified site',
            'deskripsi_pendek' => 'Applic ext fix dev NOS',
          ),
          471 => 
          array (
            'kode' => '78.11',
            'deskripsi_panjang' => 'Application of external fixator device, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Appl ext fix-chest cage',
          ),
          472 => 
          array (
            'kode' => '78.12',
            'deskripsi_panjang' => 'Application of external fixator device, humerus',
            'deskripsi_pendek' => 'Applic ext fix-humerus',
          ),
          473 => 
          array (
            'kode' => '78.13',
            'deskripsi_panjang' => 'Application of external fixator device, radius and ulna',
            'deskripsi_pendek' => 'Appl ext fix-radius/ulna',
          ),
          474 => 
          array (
            'kode' => '78.14',
            'deskripsi_panjang' => 'Application of external fixator device, carpals and metacarpals',
            'deskripsi_pendek' => 'Appl ext fix-metacar/car',
          ),
          475 => 
          array (
            'kode' => '78.15',
            'deskripsi_panjang' => 'Application of external fixator device, femur',
            'deskripsi_pendek' => 'Applic ext fix dev-femur',
          ),
          476 => 
          array (
            'kode' => '78.16',
            'deskripsi_panjang' => 'Application of external fixator device, patella',
            'deskripsi_pendek' => 'Appl ext fix dev-patella',
          ),
          477 => 
          array (
            'kode' => '78.17',
            'deskripsi_panjang' => 'Application of external fixator device, tibia and fibula',
            'deskripsi_pendek' => 'Appl ext fix-tib/fibula',
          ),
          478 => 
          array (
            'kode' => '78.18',
            'deskripsi_panjang' => 'Application of external fixator device, tarsals and metatarsals',
            'deskripsi_pendek' => 'Appl ext fix-metatar/tar',
          ),
          479 => 
          array (
            'kode' => '78.19',
            'deskripsi_panjang' => 'Application of external fixator device, other bones',
            'deskripsi_pendek' => 'Applic ext fix dev NEC',
          ),
          480 => 
          array (
            'kode' => '78.20',
            'deskripsi_panjang' => 'Limb shortening procedures, unspecified site',
            'deskripsi_pendek' => 'Limb shorten proc NOS',
          ),
          481 => 
          array (
            'kode' => '78.22',
            'deskripsi_panjang' => 'Limb shortening procedures, humerus',
            'deskripsi_pendek' => 'Limb short proc-humerus',
          ),
          482 => 
          array (
            'kode' => '78.23',
            'deskripsi_panjang' => 'Limb shortening procedures, radius and ulna',
            'deskripsi_pendek' => 'Limb shorten-radius/ulna',
          ),
          483 => 
          array (
            'kode' => '78.24',
            'deskripsi_panjang' => 'Limb shortening procedures, carpals and metacarpals',
            'deskripsi_pendek' => 'Limb shorten-metacar/car',
          ),
          484 => 
          array (
            'kode' => '78.25',
            'deskripsi_panjang' => 'Limb shortening procedures, femur',
            'deskripsi_pendek' => 'Limb short proc-femur',
          ),
          485 => 
          array (
            'kode' => '78.27',
            'deskripsi_panjang' => 'Limb shortening procedures, tibia and fibula',
            'deskripsi_pendek' => 'Limb shorten-tib/fibula',
          ),
          486 => 
          array (
            'kode' => '78.28',
            'deskripsi_panjang' => 'Limb shortening procedures, tarsals and metatarsals',
            'deskripsi_pendek' => 'Limb shorten-metatar/tar',
          ),
          487 => 
          array (
            'kode' => '78.29',
            'deskripsi_panjang' => 'Limb shortening procedures, other bones',
            'deskripsi_pendek' => 'Limb shorten proc NEC',
          ),
          488 => 
          array (
            'kode' => '78.30',
            'deskripsi_panjang' => 'Limb lengthening procedures, unspecified site',
            'deskripsi_pendek' => 'Limb lengthen proc NOS',
          ),
          489 => 
          array (
            'kode' => '78.32',
            'deskripsi_panjang' => 'Limb lengthening procedures, humerus',
            'deskripsi_pendek' => 'Limb length proc-humerus',
          ),
          490 => 
          array (
            'kode' => '78.33',
            'deskripsi_panjang' => 'Limb lengthening procedures, radius and ulna',
            'deskripsi_pendek' => 'Limb length-radius/ulna',
          ),
          491 => 
          array (
            'kode' => '78.34',
            'deskripsi_panjang' => 'Limb lengthening procedures, carpals and metacarpals',
            'deskripsi_pendek' => 'Limb length-metacar/car',
          ),
          492 => 
          array (
            'kode' => '78.35',
            'deskripsi_panjang' => 'Limb lengthening procedures, femur',
            'deskripsi_pendek' => 'Limb length proc-femur',
          ),
          493 => 
          array (
            'kode' => '78.37',
            'deskripsi_panjang' => 'Limb lengthening procedures, tibia and fibula',
            'deskripsi_pendek' => 'Limb lengthen-tib/fibula',
          ),
          494 => 
          array (
            'kode' => '78.38',
            'deskripsi_panjang' => 'Limb lengthening procedures, tarsals and metatarsals',
            'deskripsi_pendek' => 'Limb lengthn-metatar/tar',
          ),
          495 => 
          array (
            'kode' => '78.39',
            'deskripsi_panjang' => 'Limb lengthening procedures, other bones',
            'deskripsi_pendek' => 'Limb lengthen proc NEC',
          ),
          496 => 
          array (
            'kode' => '78.40',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, unspecified site',
            'deskripsi_pendek' => 'Oth bone repair/plast op',
          ),
          497 => 
          array (
            'kode' => '78.41',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Oth chest cage rep/plast',
          ),
          498 => 
          array (
            'kode' => '78.42',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, humerus',
            'deskripsi_pendek' => 'Oth humerus repair/plast',
          ),
          499 => 
          array (
            'kode' => '78.43',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, radius and ulna',
            'deskripsi_pendek' => 'Oth rad/uln repair/plast',
          ),
        ));
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '78.44',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, carpals and metacarpals',
            'deskripsi_pendek' => 'Oth metac/carp rep/plast',
          ),
          1 => 
          array (
            'kode' => '78.45',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, femur',
            'deskripsi_pendek' => 'Oth femur repair/plastic',
          ),
          2 => 
          array (
            'kode' => '78.46',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, patella',
            'deskripsi_pendek' => 'Oth patella repair/plast',
          ),
          3 => 
          array (
            'kode' => '78.47',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, tibia and fibula',
            'deskripsi_pendek' => 'Oth tib/fib repair/plast',
          ),
          4 => 
          array (
            'kode' => '78.48',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, tarsals and metatarsals',
            'deskripsi_pendek' => 'Oth meta/tar repa/plast',
          ),
          5 => 
          array (
            'kode' => '78.49',
            'deskripsi_panjang' => 'Other repair or plastic operations on bone, other bones',
            'deskripsi_pendek' => 'Oth bone repa/plast NEC',
          ),
          6 => 
          array (
            'kode' => '78.50',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, unspecified site',
            'deskripsi_pendek' => 'Int fix w/o fx reduc NOS',
          ),
          7 => 
          array (
            'kode' => '78.51',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Int fixation-chest cage',
          ),
          8 => 
          array (
            'kode' => '78.52',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, humerus',
            'deskripsi_pendek' => 'Int fixation-humerus',
          ),
          9 => 
          array (
            'kode' => '78.53',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, radius and ulna',
            'deskripsi_pendek' => 'Int fixation-radius/ulna',
          ),
          10 => 
          array (
            'kode' => '78.54',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, carpals and metacarpals',
            'deskripsi_pendek' => 'Int fixation-metacar/car',
          ),
          11 => 
          array (
            'kode' => '78.55',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, femur',
            'deskripsi_pendek' => 'Internal fixation-femur',
          ),
          12 => 
          array (
            'kode' => '78.56',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, patella',
            'deskripsi_pendek' => 'Internal fix-patella',
          ),
          13 => 
          array (
            'kode' => '78.57',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, tibia and fibula',
            'deskripsi_pendek' => 'Int fixation-tibia/fibul',
          ),
          14 => 
          array (
            'kode' => '78.58',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, tarsals and metatarsals',
            'deskripsi_pendek' => 'Int fixation-metatar/tar',
          ),
          15 => 
          array (
            'kode' => '78.59',
            'deskripsi_panjang' => 'Internal fixation of bone without fracture reduction, other bones',
            'deskripsi_pendek' => 'Int fix-no fx reduct NEC',
          ),
          16 => 
          array (
            'kode' => '78.60',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, unspecified site',
            'deskripsi_pendek' => 'Remove imp device NOS',
          ),
          17 => 
          array (
            'kode' => '78.61',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Remov imp dev-chest cage',
          ),
          18 => 
          array (
            'kode' => '78.62',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, humerus',
            'deskripsi_pendek' => 'Remove impl dev-humerus',
          ),
          19 => 
          array (
            'kode' => '78.63',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, radius and ulna',
            'deskripsi_pendek' => 'Remov imp dev-radius/uln',
          ),
          20 => 
          array (
            'kode' => '78.64',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, carpals and metacarpals',
            'deskripsi_pendek' => 'Remov imp dev-metac/carp',
          ),
          21 => 
          array (
            'kode' => '78.65',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, femur',
            'deskripsi_pendek' => 'Remove imp device-femur',
          ),
          22 => 
          array (
            'kode' => '78.66',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, patella',
            'deskripsi_pendek' => 'Remov imp device-patella',
          ),
          23 => 
          array (
            'kode' => '78.67',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, tibia and fibula',
            'deskripsi_pendek' => 'Remov imp dev-tib/fibula',
          ),
          24 => 
          array (
            'kode' => '78.68',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, tarsals and metatarsals',
            'deskripsi_pendek' => 'Remove imp dev-metat/tar',
          ),
          25 => 
          array (
            'kode' => '78.69',
            'deskripsi_panjang' => 'Removal of implanted devices from bone, other bones',
            'deskripsi_pendek' => 'Remove impl device NEC',
          ),
          26 => 
          array (
            'kode' => '78.70',
            'deskripsi_panjang' => 'Osteoclasis, unspecified site',
            'deskripsi_pendek' => 'Osteoclasis NOS',
          ),
          27 => 
          array (
            'kode' => '78.71',
            'deskripsi_panjang' => 'Osteoclasis, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Osteoclasis-chest cage',
          ),
          28 => 
          array (
            'kode' => '78.72',
            'deskripsi_panjang' => 'Osteoclasis, humerus',
            'deskripsi_pendek' => 'Osteoclasis-humerus',
          ),
          29 => 
          array (
            'kode' => '78.73',
            'deskripsi_panjang' => 'Osteoclasis, radius and ulna',
            'deskripsi_pendek' => 'Osteoclasis-radius/ulna',
          ),
          30 => 
          array (
            'kode' => '78.74',
            'deskripsi_panjang' => 'Osteoclasis, carpals and metacarpals',
            'deskripsi_pendek' => 'Osteoclasis-metacar/car',
          ),
          31 => 
          array (
            'kode' => '78.75',
            'deskripsi_panjang' => 'Osteoclasis, femur',
            'deskripsi_pendek' => 'Osteoclasis-femur',
          ),
          32 => 
          array (
            'kode' => '78.76',
            'deskripsi_panjang' => 'Osteoclasis, patella',
            'deskripsi_pendek' => 'Osteoclasis-patella',
          ),
          33 => 
          array (
            'kode' => '78.77',
            'deskripsi_panjang' => 'Osteoclasis, tibia and fibula',
            'deskripsi_pendek' => 'Osteoclasis-tibia/fibula',
          ),
          34 => 
          array (
            'kode' => '78.78',
            'deskripsi_panjang' => 'Osteoclasis, tarsals and metatarsals',
            'deskripsi_pendek' => 'Osteoclasis-metatar/tar',
          ),
          35 => 
          array (
            'kode' => '78.79',
            'deskripsi_panjang' => 'Osteoclasis, other bones',
            'deskripsi_pendek' => 'Osteoclasis NEC',
          ),
          36 => 
          array (
            'kode' => '78.80',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, unspecified site',
            'deskripsi_pendek' => 'Other bone dx proc NOS',
          ),
          37 => 
          array (
            'kode' => '78.81',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, scapula, clavicle, and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Oth dx proced-chest cage',
          ),
          38 => 
          array (
            'kode' => '78.82',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, humerus',
            'deskripsi_pendek' => 'Oth dx proced-humerus',
          ),
          39 => 
          array (
            'kode' => '78.83',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, radius and ulna',
            'deskripsi_pendek' => 'Oth dx proc-radius/ulna',
          ),
          40 => 
          array (
            'kode' => '78.84',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, carpals and metacarpals',
            'deskripsi_pendek' => 'Oth dx proc-metacar/car',
          ),
          41 => 
          array (
            'kode' => '78.85',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, femur',
            'deskripsi_pendek' => 'Oth dx proced-femur',
          ),
          42 => 
          array (
            'kode' => '78.86',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, patella',
            'deskripsi_pendek' => 'Oth dx proced-patella',
          ),
          43 => 
          array (
            'kode' => '78.87',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, tibia and fibula',
            'deskripsi_pendek' => 'Oth dx proc-tibia/fibula',
          ),
          44 => 
          array (
            'kode' => '78.88',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, tarsals and metatarsals',
            'deskripsi_pendek' => 'Oth dx proc-metatar/tar',
          ),
          45 => 
          array (
            'kode' => '78.89',
            'deskripsi_panjang' => 'Diagnostic procedures on bone, not elsewhere classified, other bones',
            'deskripsi_pendek' => 'Other bone dx proc NEC',
          ),
          46 => 
          array (
            'kode' => '78.90',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, unspecified site',
            'deskripsi_pendek' => 'Insert bone stimul NOS',
          ),
          47 => 
          array (
            'kode' => '78.91',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, scapula, clavicle and thorax [ribs and sternum]',
            'deskripsi_pendek' => 'Insert bone stimul-chest',
          ),
          48 => 
          array (
            'kode' => '78.92',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, humerus',
            'deskripsi_pendek' => 'Insert bone stim-humerus',
          ),
          49 => 
          array (
            'kode' => '78.93',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, radius and ulna',
            'deskripsi_pendek' => 'Inser bone stim-rad/ulna',
          ),
          50 => 
          array (
            'kode' => '78.94',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, carpals and metacarpals',
            'deskripsi_pendek' => 'Inser bone stim-meta/car',
          ),
          51 => 
          array (
            'kode' => '78.95',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, femur',
            'deskripsi_pendek' => 'Insert bone stim-femur',
          ),
          52 => 
          array (
            'kode' => '78.96',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, patella',
            'deskripsi_pendek' => 'Insert bone stim-patella',
          ),
          53 => 
          array (
            'kode' => '78.97',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, tibia and fibula',
            'deskripsi_pendek' => 'Inser bone stim-tib/fib',
          ),
          54 => 
          array (
            'kode' => '78.98',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, tarsals and metatarsals',
            'deskripsi_pendek' => 'Inser bone stim-meta/tar',
          ),
          55 => 
          array (
            'kode' => '78.99',
            'deskripsi_panjang' => 'Insertion of bone growth stimulator, other bones',
            'deskripsi_pendek' => 'Insert bone stimul NEC',
          ),
          56 => 
          array (
            'kode' => '79.00',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, unspecified site',
            'deskripsi_pendek' => 'Closed fx reduction NOS',
          ),
          57 => 
          array (
            'kode' => '79.01',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, humerus',
            'deskripsi_pendek' => 'Closed fx reduct humerus',
          ),
          58 => 
          array (
            'kode' => '79.02',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, radius and ulna',
            'deskripsi_pendek' => 'Cl fx reduc-radius/ulna',
          ),
          59 => 
          array (
            'kode' => '79.03',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, carpals and metacarpals',
            'deskripsi_pendek' => 'Cl fx reduc-metacar/car',
          ),
          60 => 
          array (
            'kode' => '79.04',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, phalanges of hand',
            'deskripsi_pendek' => 'Cl fx reduc-finger',
          ),
          61 => 
          array (
            'kode' => '79.05',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, femur',
            'deskripsi_pendek' => 'Cl fx reduc-femur',
          ),
          62 => 
          array (
            'kode' => '79.06',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, tibia and fibula',
            'deskripsi_pendek' => 'Cl fx reduc-tibia/fibula',
          ),
          63 => 
          array (
            'kode' => '79.07',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, tarsals and metatarsals',
            'deskripsi_pendek' => 'Cl fx reduc-metatar/tar',
          ),
          64 => 
          array (
            'kode' => '79.08',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, phalanges of foot',
            'deskripsi_pendek' => 'Cl fx reduc-toe',
          ),
          65 => 
          array (
            'kode' => '79.09',
            'deskripsi_panjang' => 'Closed reduction of fracture without internal fixation, other specified bone',
            'deskripsi_pendek' => 'Closed fx reduction NEC',
          ),
          66 => 
          array (
            'kode' => '79.10',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, unspecified site',
            'deskripsi_pendek' => 'Cl fx reduc-int fix NOS',
          ),
          67 => 
          array (
            'kode' => '79.11',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, humerus',
            'deskripsi_pendek' => 'Clos red-int fix humerus',
          ),
          68 => 
          array (
            'kode' => '79.12',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, radius and ulna',
            'deskripsi_pendek' => 'Cl red-int fix rad/ulna',
          ),
          69 => 
          array (
            'kode' => '79.13',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, carpals and metacarpals',
            'deskripsi_pendek' => 'Cl red-int fix metac/car',
          ),
          70 => 
          array (
            'kode' => '79.14',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, phalanges of hand',
            'deskripsi_pendek' => 'Close red-int fix finger',
          ),
          71 => 
          array (
            'kode' => '79.15',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, femur',
            'deskripsi_pendek' => 'Closed red-int fix femur',
          ),
          72 => 
          array (
            'kode' => '79.16',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, tibia and fibula',
            'deskripsi_pendek' => 'Cl red-int fix tib/fibu',
          ),
          73 => 
          array (
            'kode' => '79.17',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, tarsals and metatarsals',
            'deskripsi_pendek' => 'Cl red-int fix metat/tar',
          ),
          74 => 
          array (
            'kode' => '79.18',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, phalanges of foot',
            'deskripsi_pendek' => 'Close red-int fix toe fx',
          ),
          75 => 
          array (
            'kode' => '79.19',
            'deskripsi_panjang' => 'Closed reduction of fracture with internal fixation, other specified bone',
            'deskripsi_pendek' => 'Cl fx reduc-int fix NEC',
          ),
          76 => 
          array (
            'kode' => '79.20',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, unspecified site',
            'deskripsi_pendek' => 'Open fx reduction NOS',
          ),
          77 => 
          array (
            'kode' => '79.21',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, humerus',
            'deskripsi_pendek' => 'Open reduc-humerus fx',
          ),
          78 => 
          array (
            'kode' => '79.22',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, radius and ulna',
            'deskripsi_pendek' => 'Open reduc-radius/uln fx',
          ),
          79 => 
          array (
            'kode' => '79.23',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, carpals and metacarpals',
            'deskripsi_pendek' => 'Open reduc-metac/car fx',
          ),
          80 => 
          array (
            'kode' => '79.24',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, phalanges of hand',
            'deskripsi_pendek' => 'Open reduction-finger fx',
          ),
          81 => 
          array (
            'kode' => '79.25',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, femur',
            'deskripsi_pendek' => 'Open reduction-femur fx',
          ),
          82 => 
          array (
            'kode' => '79.26',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, tibia and fibula',
            'deskripsi_pendek' => 'Open reduc-tibia/fib fx',
          ),
          83 => 
          array (
            'kode' => '79.27',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, tarsals and metatarsals',
            'deskripsi_pendek' => 'Open reduc-metat/tars fx',
          ),
          84 => 
          array (
            'kode' => '79.28',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, phalanges of foot',
            'deskripsi_pendek' => 'Open reduction-toe fx',
          ),
          85 => 
          array (
            'kode' => '79.29',
            'deskripsi_panjang' => 'Open reduction of fracture without internal fixation, other specified bone',
            'deskripsi_pendek' => 'Open fx reduction NEC',
          ),
          86 => 
          array (
            'kode' => '79.30',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, unspecified site',
            'deskripsi_pendek' => 'Opn fx red w int fix NOS',
          ),
          87 => 
          array (
            'kode' => '79.31',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, humerus',
            'deskripsi_pendek' => 'Open red-int fix humerus',
          ),
          88 => 
          array (
            'kode' => '79.32',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, radius and ulna',
            'deskripsi_pendek' => 'Op red-int fix rad/ulna',
          ),
          89 => 
          array (
            'kode' => '79.33',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, carpals and metacarpals',
            'deskripsi_pendek' => 'Op red-int fix metac/car',
          ),
          90 => 
          array (
            'kode' => '79.34',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, phalanges of hand',
            'deskripsi_pendek' => 'Open red-int fix finger',
          ),
          91 => 
          array (
            'kode' => '79.35',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, femur',
            'deskripsi_pendek' => 'Open reduc-int fix femur',
          ),
          92 => 
          array (
            'kode' => '79.36',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, tibia and fibula',
            'deskripsi_pendek' => 'Op red-int fix tib/fibul',
          ),
          93 => 
          array (
            'kode' => '79.37',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, tarsals and metatarsals',
            'deskripsi_pendek' => 'Op red-int fix metat/tar',
          ),
          94 => 
          array (
            'kode' => '79.38',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, phalanges of foot',
            'deskripsi_pendek' => 'Open reduct-int fix toe',
          ),
          95 => 
          array (
            'kode' => '79.39',
            'deskripsi_panjang' => 'Open reduction of fracture with internal fixation, other specified bone',
            'deskripsi_pendek' => 'Opn fx red w int fix NEC',
          ),
          96 => 
          array (
            'kode' => '79.40',
            'deskripsi_panjang' => 'Closed reduction of separated epiphysis, unspecified site',
            'deskripsi_pendek' => 'Cls reduc-sep epiphy NOS',
          ),
          97 => 
          array (
            'kode' => '79.41',
            'deskripsi_panjang' => 'Closed reduction of separated epiphysis, humerus',
            'deskripsi_pendek' => 'Close red-humerus epiphy',
          ),
          98 => 
          array (
            'kode' => '79.42',
            'deskripsi_panjang' => 'Closed reduction of separated epiphysis, radius and ulna',
            'deskripsi_pendek' => 'Cls red-radius/ul epiphy',
          ),
          99 => 
          array (
            'kode' => '79.45',
            'deskripsi_panjang' => 'Closed reduction of separated epiphysis, femur',
            'deskripsi_pendek' => 'Close reduc-femur epiphy',
          ),
          100 => 
          array (
            'kode' => '79.46',
            'deskripsi_panjang' => 'Closed reduction of separated epiphysis, tibia and fibula',
            'deskripsi_pendek' => 'Cls red-tibia/fib epiphy',
          ),
          101 => 
          array (
            'kode' => '79.49',
            'deskripsi_panjang' => 'Closed reduction of separated epiphysis, other specified bone',
            'deskripsi_pendek' => 'Cls reduc-sep epiphy NEC',
          ),
          102 => 
          array (
            'kode' => '79.50',
            'deskripsi_panjang' => 'Open reduction of separated epiphysis, unspecified site',
            'deskripsi_pendek' => 'Open red-sep epiphy NOS',
          ),
          103 => 
          array (
            'kode' => '79.51',
            'deskripsi_panjang' => 'Open reduction of separated epiphysis, humerus',
            'deskripsi_pendek' => 'Opn red-sep epiphy-humer',
          ),
          104 => 
          array (
            'kode' => '79.52',
            'deskripsi_panjang' => 'Open reduction of separated epiphysis, radius and ulna',
            'deskripsi_pendek' => 'Op red-radius/uln epiphy',
          ),
          105 => 
          array (
            'kode' => '79.55',
            'deskripsi_panjang' => 'Open reduction of separated epiphysis, femur',
            'deskripsi_pendek' => 'Opn red-sep epiphy-femur',
          ),
          106 => 
          array (
            'kode' => '79.56',
            'deskripsi_panjang' => 'Open reduction of separated epiphysis, tibia and fibula',
            'deskripsi_pendek' => 'Op red-tibia/fib epiphys',
          ),
          107 => 
          array (
            'kode' => '79.59',
            'deskripsi_panjang' => 'Open reduction of separated epiphysis, other specified bone',
            'deskripsi_pendek' => 'Open red-sep epiphy NEC',
          ),
          108 => 
          array (
            'kode' => '79.60',
            'deskripsi_panjang' => 'Debridement of open fracture, unspecified site',
            'deskripsi_pendek' => 'Open fx site debride NOS',
          ),
          109 => 
          array (
            'kode' => '79.61',
            'deskripsi_panjang' => 'Debridement of open fracture site, humerus',
            'deskripsi_pendek' => 'Debrid open fx-humerus',
          ),
          110 => 
          array (
            'kode' => '79.62',
            'deskripsi_panjang' => 'Debridement of open fracture site, radius and ulna',
            'deskripsi_pendek' => 'Debrid opn fx-radius/uln',
          ),
          111 => 
          array (
            'kode' => '79.63',
            'deskripsi_panjang' => 'Debridement of open fracture site, carpals and metacarpals',
            'deskripsi_pendek' => 'Debrid opn fx-metac/car',
          ),
          112 => 
          array (
            'kode' => '79.64',
            'deskripsi_panjang' => 'Debridement of open fracture site, phalanges of hand',
            'deskripsi_pendek' => 'Debrid opn fx-finger',
          ),
          113 => 
          array (
            'kode' => '79.65',
            'deskripsi_panjang' => 'Debridement of open fracture site, femur',
            'deskripsi_pendek' => 'Debrid opn fx-femur',
          ),
          114 => 
          array (
            'kode' => '79.66',
            'deskripsi_panjang' => 'Debridement of open fracture site, tibia and fibula',
            'deskripsi_pendek' => 'Debrid opn fx-tibia/fib',
          ),
          115 => 
          array (
            'kode' => '79.67',
            'deskripsi_panjang' => 'Debridement of open fracture site, tarsals and metatarsals',
            'deskripsi_pendek' => 'Debrid opn fx-metat/tar',
          ),
          116 => 
          array (
            'kode' => '79.68',
            'deskripsi_panjang' => 'Debridement of open fracture site, phalanges of foot',
            'deskripsi_pendek' => 'Debrid opn fx-toe',
          ),
          117 => 
          array (
            'kode' => '79.69',
            'deskripsi_panjang' => 'Debridement of open fracture site, other specified bone',
            'deskripsi_pendek' => 'Open fx site debride NEC',
          ),
          118 => 
          array (
            'kode' => '79.70',
            'deskripsi_panjang' => 'Closed reduction of dislocation of unspecified site',
            'deskripsi_pendek' => 'Cl reduc disloc NOS',
          ),
          119 => 
          array (
            'kode' => '79.71',
            'deskripsi_panjang' => 'Closed reduction of dislocation of shoulder',
            'deskripsi_pendek' => 'Cl reduc disloc-shoulder',
          ),
          120 => 
          array (
            'kode' => '79.72',
            'deskripsi_panjang' => 'Closed reduction of dislocation of elbow',
            'deskripsi_pendek' => 'Cl reduc disloc-elbow',
          ),
          121 => 
          array (
            'kode' => '79.73',
            'deskripsi_panjang' => 'Closed reduction of dislocation of wrist',
            'deskripsi_pendek' => 'Cl reduc disloc-wrist',
          ),
          122 => 
          array (
            'kode' => '79.74',
            'deskripsi_panjang' => 'Closed reduction of dislocation of hand and finger',
            'deskripsi_pendek' => 'Cl reduc disloc-hand/fng',
          ),
          123 => 
          array (
            'kode' => '79.75',
            'deskripsi_panjang' => 'Closed reduction of dislocation of hip',
            'deskripsi_pendek' => 'Cl reduc disloc-hip',
          ),
          124 => 
          array (
            'kode' => '79.76',
            'deskripsi_panjang' => 'Closed reduction of dislocation of knee',
            'deskripsi_pendek' => 'Cl reduc disloc-knee',
          ),
          125 => 
          array (
            'kode' => '79.77',
            'deskripsi_panjang' => 'Closed reduction of dislocation of ankle',
            'deskripsi_pendek' => 'Cl reduc disloc-ankle',
          ),
          126 => 
          array (
            'kode' => '79.78',
            'deskripsi_panjang' => 'Closed reduction of dislocation of foot and toe',
            'deskripsi_pendek' => 'Cl reduc disloc-foot/toe',
          ),
          127 => 
          array (
            'kode' => '79.79',
            'deskripsi_panjang' => 'Closed reduction of dislocation of other specified sites',
            'deskripsi_pendek' => 'Cl reduc dislocation NEC',
          ),
          128 => 
          array (
            'kode' => '79.80',
            'deskripsi_panjang' => 'Open reduction of dislocation of unspecified site',
            'deskripsi_pendek' => 'Open reduc-dislocat NOS',
          ),
          129 => 
          array (
            'kode' => '79.81',
            'deskripsi_panjang' => 'Open reduction of dislocation of shoulder',
            'deskripsi_pendek' => 'Opn reduc disloc-shouldr',
          ),
          130 => 
          array (
            'kode' => '79.82',
            'deskripsi_panjang' => 'Open reduction of dislocation of elbow',
            'deskripsi_pendek' => 'Open reduc-elbow disloc',
          ),
          131 => 
          array (
            'kode' => '79.83',
            'deskripsi_panjang' => 'Open reduction of dislocation of wrist',
            'deskripsi_pendek' => 'Open reduc-wrist disloc',
          ),
          132 => 
          array (
            'kode' => '79.84',
            'deskripsi_panjang' => 'Open reduction of dislocation of hand and finger',
            'deskripsi_pendek' => 'Opn reduc disloc-hand',
          ),
          133 => 
          array (
            'kode' => '79.85',
            'deskripsi_panjang' => 'Open reduction of dislocation of hip',
            'deskripsi_pendek' => 'Open reduc-hip dislocat',
          ),
          134 => 
          array (
            'kode' => '79.86',
            'deskripsi_panjang' => 'Open reduction of dislocation of knee',
            'deskripsi_pendek' => 'Open reduc-knee dislocat',
          ),
          135 => 
          array (
            'kode' => '79.87',
            'deskripsi_panjang' => 'Open reduction of dislocation of ankle',
            'deskripsi_pendek' => 'Open reduc-ankle disloc',
          ),
          136 => 
          array (
            'kode' => '79.88',
            'deskripsi_panjang' => 'Open reduction of dislocation of foot and toe',
            'deskripsi_pendek' => 'Opn reduc disloc-ft/toe',
          ),
          137 => 
          array (
            'kode' => '79.89',
            'deskripsi_panjang' => 'Open reduction of dislocation of other specified sites',
            'deskripsi_pendek' => 'Open reduc-dislocat NEC',
          ),
          138 => 
          array (
            'kode' => '79.90',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, unspecified site',
            'deskripsi_pendek' => 'Unspec op bone inj NOS',
          ),
          139 => 
          array (
            'kode' => '79.91',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, humerus',
            'deskripsi_pendek' => 'Humerus injury op NOS',
          ),
          140 => 
          array (
            'kode' => '79.92',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, radius and ulna',
            'deskripsi_pendek' => 'Radius/ulna inj op NOS',
          ),
          141 => 
          array (
            'kode' => '79.93',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, carpals and metacarpals',
            'deskripsi_pendek' => 'Metacarp/carp inj op NOS',
          ),
          142 => 
          array (
            'kode' => '79.94',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, phalanges of hand',
            'deskripsi_pendek' => 'Finger injury op NOS',
          ),
          143 => 
          array (
            'kode' => '79.95',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, femur',
            'deskripsi_pendek' => 'Femur injury op NOS',
          ),
          144 => 
          array (
            'kode' => '79.96',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, tibia and fibula',
            'deskripsi_pendek' => 'Tibia/fibula inj op NOS',
          ),
          145 => 
          array (
            'kode' => '79.97',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, tarsals and metatarsals',
            'deskripsi_pendek' => 'Metatars/tars inj op NOS',
          ),
          146 => 
          array (
            'kode' => '79.98',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, phalanges of foot',
            'deskripsi_pendek' => 'Toe injury operation NOS',
          ),
          147 => 
          array (
            'kode' => '79.99',
            'deskripsi_panjang' => 'Unspecified operation on bone injury, other specified bone',
            'deskripsi_pendek' => 'Unspec op-bone inj NEC',
          ),
          148 => 
          array (
            'kode' => '80.00',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, unspecified site',
            'deskripsi_pendek' => 'Arth/pros rem wo rep NOS',
          ),
          149 => 
          array (
            'kode' => '80.01',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, shoulder',
            'deskripsi_pendek' => 'Arth/pros rem wo re-shld',
          ),
          150 => 
          array (
            'kode' => '80.02',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, elbow',
            'deskripsi_pendek' => 'Arth/pros rem wo rep-elb',
          ),
          151 => 
          array (
            'kode' => '80.03',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, wrist',
            'deskripsi_pendek' => 'Arth/pros rem wo re-wrst',
          ),
          152 => 
          array (
            'kode' => '80.04',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, hand and finger',
            'deskripsi_pendek' => 'Arth/pros rem wo rep-hnd',
          ),
          153 => 
          array (
            'kode' => '80.05',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, hip',
            'deskripsi_pendek' => 'Arth/pros rem wo rep-hip',
          ),
          154 => 
          array (
            'kode' => '80.06',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, knee',
            'deskripsi_pendek' => 'Arth/pros rem wo re-knee',
          ),
          155 => 
          array (
            'kode' => '80.07',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, ankle',
            'deskripsi_pendek' => 'Arth/pros rem wo rep-ank',
          ),
          156 => 
          array (
            'kode' => '80.08',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, foot and toe',
            'deskripsi_pendek' => 'Arth/pros rem wo re-foot',
          ),
          157 => 
          array (
            'kode' => '80.09',
            'deskripsi_panjang' => 'Arthrotomy for removal of prosthesis without replacement, other specified sites',
            'deskripsi_pendek' => 'Arth/pros rem wo rep NEC',
          ),
          158 => 
          array (
            'kode' => '80.10',
            'deskripsi_panjang' => 'Other arthrotomy, unspecified site',
            'deskripsi_pendek' => 'Other arthrotomy NOS',
          ),
          159 => 
          array (
            'kode' => '80.11',
            'deskripsi_panjang' => 'Other arthrotomy, shoulder',
            'deskripsi_pendek' => 'Oth arthrotomy-shoulder',
          ),
          160 => 
          array (
            'kode' => '80.12',
            'deskripsi_panjang' => 'Other arthrotomy, elbow',
            'deskripsi_pendek' => 'Oth arthrotomy-elbow',
          ),
          161 => 
          array (
            'kode' => '80.13',
            'deskripsi_panjang' => 'Other arthrotomy, wrist',
            'deskripsi_pendek' => 'Oth arthrotomy-wrist',
          ),
          162 => 
          array (
            'kode' => '80.14',
            'deskripsi_panjang' => 'Other arthrotomy, hand and finger',
            'deskripsi_pendek' => 'Oth arthrotomy-hand/fngr',
          ),
          163 => 
          array (
            'kode' => '80.15',
            'deskripsi_panjang' => 'Other arthrotomy, hip',
            'deskripsi_pendek' => 'Oth arthrotomy-hip',
          ),
          164 => 
          array (
            'kode' => '80.16',
            'deskripsi_panjang' => 'Other arthrotomy, knee',
            'deskripsi_pendek' => 'Oth arthrotomy-knee',
          ),
          165 => 
          array (
            'kode' => '80.17',
            'deskripsi_panjang' => 'Other arthrotomy, ankle',
            'deskripsi_pendek' => 'Oth arthrotomy-ankle',
          ),
          166 => 
          array (
            'kode' => '80.18',
            'deskripsi_panjang' => 'Other arthrotomy, foot and toe',
            'deskripsi_pendek' => 'Oth arthrotomy-foot/toe',
          ),
          167 => 
          array (
            'kode' => '80.19',
            'deskripsi_panjang' => 'Other arthrotomy, other specified sites',
            'deskripsi_pendek' => 'Other arthrotomy NEC',
          ),
          168 => 
          array (
            'kode' => '80.20',
            'deskripsi_panjang' => 'Arthroscopy, unspecified site',
            'deskripsi_pendek' => 'Arthroscopy NOS',
          ),
          169 => 
          array (
            'kode' => '80.21',
            'deskripsi_panjang' => 'Arthroscopy, shoulder',
            'deskripsi_pendek' => 'Shoulder arthroscopy',
          ),
          170 => 
          array (
            'kode' => '80.22',
            'deskripsi_panjang' => 'Arthroscopy, elbow',
            'deskripsi_pendek' => 'Elbow arthroscopy',
          ),
          171 => 
          array (
            'kode' => '80.23',
            'deskripsi_panjang' => 'Arthroscopy, wrist',
            'deskripsi_pendek' => 'Wrist arthroscopy',
          ),
          172 => 
          array (
            'kode' => '80.24',
            'deskripsi_panjang' => 'Arthroscopy, hand and finger',
            'deskripsi_pendek' => 'Hand & finger arthroscop',
          ),
          173 => 
          array (
            'kode' => '80.25',
            'deskripsi_panjang' => 'Arthroscopy, hip',
            'deskripsi_pendek' => 'Hip arthroscopy',
          ),
          174 => 
          array (
            'kode' => '80.26',
            'deskripsi_panjang' => 'Arthroscopy, knee',
            'deskripsi_pendek' => 'Knee arthroscopy',
          ),
          175 => 
          array (
            'kode' => '80.27',
            'deskripsi_panjang' => 'Arthroscopy, ankle',
            'deskripsi_pendek' => 'Ankle arthroscopy',
          ),
          176 => 
          array (
            'kode' => '80.28',
            'deskripsi_panjang' => 'Arthroscopy, foot and toe',
            'deskripsi_pendek' => 'Foot & toe arthroscopy',
          ),
          177 => 
          array (
            'kode' => '80.29',
            'deskripsi_panjang' => 'Arthroscopy, other specified sites',
            'deskripsi_pendek' => 'Arthroscopy NEC',
          ),
          178 => 
          array (
            'kode' => '80.30',
            'deskripsi_panjang' => 'Biopsy of joint structure, unspecified site',
            'deskripsi_pendek' => 'Joint biopsy NOS',
          ),
          179 => 
          array (
            'kode' => '80.31',
            'deskripsi_panjang' => 'Biopsy of joint structure, shoulder',
            'deskripsi_pendek' => 'Shoulder joint biopsy',
          ),
          180 => 
          array (
            'kode' => '80.32',
            'deskripsi_panjang' => 'Biopsy of joint structure, elbow',
            'deskripsi_pendek' => 'Elbow joint biopsy',
          ),
          181 => 
          array (
            'kode' => '80.33',
            'deskripsi_panjang' => 'Biopsy of joint structure, wrist',
            'deskripsi_pendek' => 'Wrist joint biopsy',
          ),
          182 => 
          array (
            'kode' => '80.34',
            'deskripsi_panjang' => 'Biopsy of joint structure, hand and finger',
            'deskripsi_pendek' => 'Hand/finger joint biopsy',
          ),
          183 => 
          array (
            'kode' => '80.35',
            'deskripsi_panjang' => 'Biopsy of joint structure, hip',
            'deskripsi_pendek' => 'Hip joint biopsy',
          ),
          184 => 
          array (
            'kode' => '80.36',
            'deskripsi_panjang' => 'Biopsy of joint structure, knee',
            'deskripsi_pendek' => 'Knee joint biopsy',
          ),
          185 => 
          array (
            'kode' => '80.37',
            'deskripsi_panjang' => 'Biopsy of joint structure, ankle',
            'deskripsi_pendek' => 'Ankle joint biopsy',
          ),
          186 => 
          array (
            'kode' => '80.38',
            'deskripsi_panjang' => 'Biopsy of joint structure, foot and toe',
            'deskripsi_pendek' => 'Foot & toe joint biopsy',
          ),
          187 => 
          array (
            'kode' => '80.39',
            'deskripsi_panjang' => 'Biopsy of joint structure, other specified sites',
            'deskripsi_pendek' => 'Joint biopsy NEC',
          ),
          188 => 
          array (
            'kode' => '80.40',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, unspecified site',
            'deskripsi_pendek' => 'Jt structur division NOS',
          ),
          189 => 
          array (
            'kode' => '80.41',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, shoulder',
            'deskripsi_pendek' => 'Shoulder struct division',
          ),
          190 => 
          array (
            'kode' => '80.42',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, elbow',
            'deskripsi_pendek' => 'Elbow structure division',
          ),
          191 => 
          array (
            'kode' => '80.43',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, wrist',
            'deskripsi_pendek' => 'Wrist structure division',
          ),
          192 => 
          array (
            'kode' => '80.44',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, hand and finger',
            'deskripsi_pendek' => 'Hand joint struct divis',
          ),
          193 => 
          array (
            'kode' => '80.45',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, hip',
            'deskripsi_pendek' => 'Hip structure division',
          ),
          194 => 
          array (
            'kode' => '80.46',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, knee',
            'deskripsi_pendek' => 'Knee structure division',
          ),
          195 => 
          array (
            'kode' => '80.47',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, ankle',
            'deskripsi_pendek' => 'Ankle structure division',
          ),
          196 => 
          array (
            'kode' => '80.48',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, foot and toe',
            'deskripsi_pendek' => 'Foot joint struct divis',
          ),
          197 => 
          array (
            'kode' => '80.49',
            'deskripsi_panjang' => 'Division of joint capsule, ligament, or cartilage, other specified sites',
            'deskripsi_pendek' => 'Jt structur division NEC',
          ),
          198 => 
          array (
            'kode' => '80.50',
            'deskripsi_panjang' => 'Excision or destruction of intervertebral disc, unspecified',
            'deskripsi_pendek' => 'Exc/dest intvrt disc NOS',
          ),
          199 => 
          array (
            'kode' => '80.51',
            'deskripsi_panjang' => 'Excision of intervertebral disc',
            'deskripsi_pendek' => 'Excision intervert disc',
          ),
          200 => 
          array (
            'kode' => '80.52',
            'deskripsi_panjang' => 'Intervertebral chemonucleolysis',
            'deskripsi_pendek' => 'Chemonucleolysis iv disc',
          ),
          201 => 
          array (
            'kode' => '80.53',
            'deskripsi_panjang' => 'Repair of the anulus fibrosus with graft or prosthesis',
            'deskripsi_pendek' => 'Rep anulus fibrosus-grft',
          ),
          202 => 
          array (
            'kode' => '80.54',
            'deskripsi_panjang' => 'Other and unspecified repair of the anulus fibrosus',
            'deskripsi_pendek' => 'Rep anuls fibros NEC/NOS',
          ),
          203 => 
          array (
            'kode' => '80.59',
            'deskripsi_panjang' => 'Other destruction of intervertebral disc',
            'deskripsi_pendek' => 'Oth exc/dest intvrt disc',
          ),
          204 => 
          array (
            'kode' => '80.6',
            'deskripsi_panjang' => 'Excision of semilunar cartilage of knee',
            'deskripsi_pendek' => 'Excis knee semilun cartl',
          ),
          205 => 
          array (
            'kode' => '80.70',
            'deskripsi_panjang' => 'Synovectomy, unspecified site',
            'deskripsi_pendek' => 'Synovectomy-site NOS',
          ),
          206 => 
          array (
            'kode' => '80.71',
            'deskripsi_panjang' => 'Synovectomy, shoulder',
            'deskripsi_pendek' => 'Shoulder synovectomy',
          ),
          207 => 
          array (
            'kode' => '80.72',
            'deskripsi_panjang' => 'Synovectomy, elbow',
            'deskripsi_pendek' => 'Elbow synovectomy',
          ),
          208 => 
          array (
            'kode' => '80.73',
            'deskripsi_panjang' => 'Synovectomy, wrist',
            'deskripsi_pendek' => 'Wrist synovectomy',
          ),
          209 => 
          array (
            'kode' => '80.74',
            'deskripsi_panjang' => 'Synovectomy, hand and finger',
            'deskripsi_pendek' => 'Hand synovectomy',
          ),
          210 => 
          array (
            'kode' => '80.75',
            'deskripsi_panjang' => 'Synovectomy, hip',
            'deskripsi_pendek' => 'Hip synovectomy',
          ),
          211 => 
          array (
            'kode' => '80.76',
            'deskripsi_panjang' => 'Synovectomy, knee',
            'deskripsi_pendek' => 'Knee synovectomy',
          ),
          212 => 
          array (
            'kode' => '80.77',
            'deskripsi_panjang' => 'Synovectomy, ankle',
            'deskripsi_pendek' => 'Ankle synovectomy',
          ),
          213 => 
          array (
            'kode' => '80.78',
            'deskripsi_panjang' => 'Synovectomy, foot and toe',
            'deskripsi_pendek' => 'Foot synovectomy',
          ),
          214 => 
          array (
            'kode' => '80.79',
            'deskripsi_panjang' => 'Synovectomy, other specified sites',
            'deskripsi_pendek' => 'Synovectomy-site NEC',
          ),
          215 => 
          array (
            'kode' => '80.80',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, unspecified site',
            'deskripsi_pendek' => 'Destruct joint les NOS',
          ),
          216 => 
          array (
            'kode' => '80.81',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, shoulder',
            'deskripsi_pendek' => 'Destruc-shoulder les NEC',
          ),
          217 => 
          array (
            'kode' => '80.82',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, elbow',
            'deskripsi_pendek' => 'Destruc-elbow lesion NEC',
          ),
          218 => 
          array (
            'kode' => '80.83',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, wrist',
            'deskripsi_pendek' => 'Destruc-wrist lesion NEC',
          ),
          219 => 
          array (
            'kode' => '80.84',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, hand and finger',
            'deskripsi_pendek' => 'Destruc-hand jt les NEC',
          ),
          220 => 
          array (
            'kode' => '80.85',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, hip',
            'deskripsi_pendek' => 'Destruct-hip lesion NEC',
          ),
          221 => 
          array (
            'kode' => '80.86',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, knee',
            'deskripsi_pendek' => 'Destruct-knee lesion NEC',
          ),
          222 => 
          array (
            'kode' => '80.87',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, ankle',
            'deskripsi_pendek' => 'Destruc-ankle lesion NEC',
          ),
          223 => 
          array (
            'kode' => '80.88',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, foot and toe',
            'deskripsi_pendek' => 'Destruc-foot jt les NEC',
          ),
          224 => 
          array (
            'kode' => '80.89',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion of joint, other specified sites',
            'deskripsi_pendek' => 'Destruct joint les NEC',
          ),
          225 => 
          array (
            'kode' => '80.90',
            'deskripsi_panjang' => 'Other excision of joint, unspecified site',
            'deskripsi_pendek' => 'Excision of joint NOS',
          ),
          226 => 
          array (
            'kode' => '80.91',
            'deskripsi_panjang' => 'Other excision of joint, shoulder',
            'deskripsi_pendek' => 'Excision of shoulder NEC',
          ),
          227 => 
          array (
            'kode' => '80.92',
            'deskripsi_panjang' => 'Other excision of joint, elbow',
            'deskripsi_pendek' => 'Excision of elbow NEC',
          ),
          228 => 
          array (
            'kode' => '80.93',
            'deskripsi_panjang' => 'Other excision of joint, wrist',
            'deskripsi_pendek' => 'Excision of wrist NEC',
          ),
          229 => 
          array (
            'kode' => '80.94',
            'deskripsi_panjang' => 'Other excision of joint, hand and finger',
            'deskripsi_pendek' => 'Excision hand joint NEC',
          ),
          230 => 
          array (
            'kode' => '80.95',
            'deskripsi_panjang' => 'Other excision of joint, hip',
            'deskripsi_pendek' => 'Excision of hip NEC',
          ),
          231 => 
          array (
            'kode' => '80.96',
            'deskripsi_panjang' => 'Other excision of joint, knee',
            'deskripsi_pendek' => 'Excision of knee NEC',
          ),
          232 => 
          array (
            'kode' => '80.97',
            'deskripsi_panjang' => 'Other excision of joint, ankle',
            'deskripsi_pendek' => 'Excision of ankle NEC',
          ),
          233 => 
          array (
            'kode' => '80.98',
            'deskripsi_panjang' => 'Other excision of joint, foot and toe',
            'deskripsi_pendek' => 'Excision foot joint NEC',
          ),
          234 => 
          array (
            'kode' => '80.99',
            'deskripsi_panjang' => 'Other excision of joint, other specified sites',
            'deskripsi_pendek' => 'Excision of joint NEC',
          ),
          235 => 
          array (
            'kode' => '81.00',
            'deskripsi_panjang' => 'Spinal fusion, not otherwise specified',
            'deskripsi_pendek' => 'Spinal fusion NOS',
          ),
          236 => 
          array (
            'kode' => '81.01',
            'deskripsi_panjang' => 'Atlas-axis spinal fusion',
            'deskripsi_pendek' => 'Atlas-axis fusion',
          ),
          237 => 
          array (
            'kode' => '81.02',
            'deskripsi_panjang' => 'Other cervical fusion of the anterior column, anterior technique',
            'deskripsi_pendek' => 'Oth cerv fusion ant/ant',
          ),
          238 => 
          array (
            'kode' => '81.03',
            'deskripsi_panjang' => 'Other cervical fusion of the posterior column, posterior technique',
            'deskripsi_pendek' => 'Ot cerv fusion post/post',
          ),
          239 => 
          array (
            'kode' => '81.04',
            'deskripsi_panjang' => 'Dorsal and dorsolumbar fusion of the anterior column, anterior technique',
            'deskripsi_pendek' => 'Drsl/drslumb fus ant/ant',
          ),
          240 => 
          array (
            'kode' => '81.05',
            'deskripsi_panjang' => 'Dorsal and dorsolumbar fusion of the posterior column, posterior technique',
            'deskripsi_pendek' => 'Drsl/dslmb fus post/post',
          ),
          241 => 
          array (
            'kode' => '81.06',
            'deskripsi_panjang' => 'Lumbar and lumbosacral fusion of the anterior column, anterior technique',
            'deskripsi_pendek' => 'Lumb/lmbosac fus ant/ant',
          ),
          242 => 
          array (
            'kode' => '81.07',
            'deskripsi_panjang' => 'Lumbar and lumbosacral fusion of the posterior column, posterior technique',
            'deskripsi_pendek' => 'Lmb/lmbsac fus post/post',
          ),
          243 => 
          array (
            'kode' => '81.08',
            'deskripsi_panjang' => 'Lumbar and lumbosacral fusion of the anterior column, posterior technique',
            'deskripsi_pendek' => 'Lumb/lmbsac fus ant/post',
          ),
          244 => 
          array (
            'kode' => '81.11',
            'deskripsi_panjang' => 'Ankle fusion',
            'deskripsi_pendek' => 'Ankle fusion',
          ),
          245 => 
          array (
            'kode' => '81.12',
            'deskripsi_panjang' => 'Triple arthrodesis',
            'deskripsi_pendek' => 'Triple arthrodesis',
          ),
          246 => 
          array (
            'kode' => '81.13',
            'deskripsi_panjang' => 'Subtalar fusion',
            'deskripsi_pendek' => 'Subtalar fusion',
          ),
          247 => 
          array (
            'kode' => '81.14',
            'deskripsi_panjang' => 'Midtarsal fusion',
            'deskripsi_pendek' => 'Midtarsal fusion',
          ),
          248 => 
          array (
            'kode' => '81.15',
            'deskripsi_panjang' => 'Tarsometatarsal fusion',
            'deskripsi_pendek' => 'Tarsometatarsal fusion',
          ),
          249 => 
          array (
            'kode' => '81.16',
            'deskripsi_panjang' => 'Metatarsophalangeal fusion',
            'deskripsi_pendek' => 'Metatarsophalangeal fus',
          ),
          250 => 
          array (
            'kode' => '81.17',
            'deskripsi_panjang' => 'Other fusion of foot',
            'deskripsi_pendek' => 'Other fusion of foot',
          ),
          251 => 
          array (
            'kode' => '81.18',
            'deskripsi_panjang' => 'Subtalar joint arthroereisis',
            'deskripsi_pendek' => 'Subtalr jt arthroereisis',
          ),
          252 => 
          array (
            'kode' => '81.20',
            'deskripsi_panjang' => 'Arthrodesis of unspecified joint',
            'deskripsi_pendek' => 'Arthrodesis NOS',
          ),
          253 => 
          array (
            'kode' => '81.21',
            'deskripsi_panjang' => 'Arthrodesis of hip',
            'deskripsi_pendek' => 'Arthrodesis of hip',
          ),
          254 => 
          array (
            'kode' => '81.22',
            'deskripsi_panjang' => 'Arthrodesis of knee',
            'deskripsi_pendek' => 'Arthrodesis of knee',
          ),
          255 => 
          array (
            'kode' => '81.23',
            'deskripsi_panjang' => 'Arthrodesis of shoulder',
            'deskripsi_pendek' => 'Arthrodesis of shoulder',
          ),
          256 => 
          array (
            'kode' => '81.24',
            'deskripsi_panjang' => 'Arthrodesis of elbow',
            'deskripsi_pendek' => 'Arthrodesis of elbow',
          ),
          257 => 
          array (
            'kode' => '81.25',
            'deskripsi_panjang' => 'Carporadial fusion',
            'deskripsi_pendek' => 'Carporadial fusion',
          ),
          258 => 
          array (
            'kode' => '81.26',
            'deskripsi_panjang' => 'Metacarpocarpal fusion',
            'deskripsi_pendek' => 'Metacarpocarpal fusion',
          ),
          259 => 
          array (
            'kode' => '81.27',
            'deskripsi_panjang' => 'Metacarpophalangeal fusion',
            'deskripsi_pendek' => 'Metacarpophalangeal fus',
          ),
          260 => 
          array (
            'kode' => '81.28',
            'deskripsi_panjang' => 'Interphalangeal fusion',
            'deskripsi_pendek' => 'Interphalangeal fusion',
          ),
          261 => 
          array (
            'kode' => '81.29',
            'deskripsi_panjang' => 'Arthrodesis of other specified joints',
            'deskripsi_pendek' => 'Arthrodesis NEC',
          ),
          262 => 
          array (
            'kode' => '81.30',
            'deskripsi_panjang' => 'Refusion of spine, not otherwise specified',
            'deskripsi_pendek' => 'Spinal refusion NOS',
          ),
          263 => 
          array (
            'kode' => '81.31',
            'deskripsi_panjang' => 'Refusion of atlas-axis spine',
            'deskripsi_pendek' => 'Refusion of atlas-axis',
          ),
          264 => 
          array (
            'kode' => '81.32',
            'deskripsi_panjang' => 'Refusion of other cervical spine, anterior column, anterior technique',
            'deskripsi_pendek' => 'Refus oth cervcl ant/ant',
          ),
          265 => 
          array (
            'kode' => '81.33',
            'deskripsi_panjang' => 'Refusion of other cervical spine, posterior column, posterior technique',
            'deskripsi_pendek' => 'Refus oth cerv post/post',
          ),
          266 => 
          array (
            'kode' => '81.34',
            'deskripsi_panjang' => 'Refusion of dorsal and dorsolumbar spine, anterior column, anterior technique',
            'deskripsi_pendek' => 'Refus drs/drslmb ant/ant',
          ),
          267 => 
          array (
            'kode' => '81.35',
            'deskripsi_panjang' => 'Refusion of dorsal and dorsolumbar spine, posterior column, posterior technique',
            'deskripsi_pendek' => 'Refus drs/drslmb pst/pst',
          ),
          268 => 
          array (
            'kode' => '81.36',
            'deskripsi_panjang' => 'Refusion of lumbar and lumbosacral spine, anterior column, anterior technique',
            'deskripsi_pendek' => 'Refus lmb/lmbsac ant/ant',
          ),
          269 => 
          array (
            'kode' => '81.37',
            'deskripsi_panjang' => 'Refusion of lumbar and lumbosacral spine, posterior column, posterior technique',
            'deskripsi_pendek' => 'Refus lmb/lmbsac pst/pst',
          ),
          270 => 
          array (
            'kode' => '81.38',
            'deskripsi_panjang' => 'Refusion of lumbar and lumbosacral spine, anterior column, posterior technique',
            'deskripsi_pendek' => 'Refus lmb/lmbsc ant/post',
          ),
          271 => 
          array (
            'kode' => '81.39',
            'deskripsi_panjang' => 'Refusion of spine, not elsewhere classified',
            'deskripsi_pendek' => 'Refusion of spine NEC',
          ),
          272 => 
          array (
            'kode' => '81.40',
            'deskripsi_panjang' => 'Repair of hip, not elsewhere classified',
            'deskripsi_pendek' => 'Repair of hip, NEC',
          ),
          273 => 
          array (
            'kode' => '81.42',
            'deskripsi_panjang' => 'Five-in-one repair of knee',
            'deskripsi_pendek' => 'Five-in-one knee repair',
          ),
          274 => 
          array (
            'kode' => '81.43',
            'deskripsi_panjang' => 'Triad knee repair',
            'deskripsi_pendek' => 'Triad knee repair',
          ),
          275 => 
          array (
            'kode' => '81.44',
            'deskripsi_panjang' => 'Patellar stabilization',
            'deskripsi_pendek' => 'Patellar stabilization',
          ),
          276 => 
          array (
            'kode' => '81.45',
            'deskripsi_panjang' => 'Other repair of the cruciate ligaments',
            'deskripsi_pendek' => 'Cruciate lig repair NEC',
          ),
          277 => 
          array (
            'kode' => '81.46',
            'deskripsi_panjang' => 'Other repair of the collateral ligaments',
            'deskripsi_pendek' => 'Collaterl lig repair NEC',
          ),
          278 => 
          array (
            'kode' => '81.47',
            'deskripsi_panjang' => 'Other repair of knee',
            'deskripsi_pendek' => 'Other repair of knee',
          ),
          279 => 
          array (
            'kode' => '81.49',
            'deskripsi_panjang' => 'Other repair of ankle',
            'deskripsi_pendek' => 'Other repair of ankle',
          ),
          280 => 
          array (
            'kode' => '81.51',
            'deskripsi_panjang' => 'Total hip replacement',
            'deskripsi_pendek' => 'Total hip replacement',
          ),
          281 => 
          array (
            'kode' => '81.52',
            'deskripsi_panjang' => 'Partial hip replacement',
            'deskripsi_pendek' => 'Partial hip replacement',
          ),
          282 => 
          array (
            'kode' => '81.53',
            'deskripsi_panjang' => 'Revision of hip replacement, not otherwise specified',
            'deskripsi_pendek' => 'Revise hip replacemt NOS',
          ),
          283 => 
          array (
            'kode' => '81.54',
            'deskripsi_panjang' => 'Total knee replacement',
            'deskripsi_pendek' => 'Total knee replacement',
          ),
          284 => 
          array (
            'kode' => '81.55',
            'deskripsi_panjang' => 'Revision of knee replacement, not otherwise specified',
            'deskripsi_pendek' => 'Revise knee replace NOS',
          ),
          285 => 
          array (
            'kode' => '81.56',
            'deskripsi_panjang' => 'Total ankle replacement',
            'deskripsi_pendek' => 'Total ankle replacement',
          ),
          286 => 
          array (
            'kode' => '81.57',
            'deskripsi_panjang' => 'Replacement of joint of foot and toe',
            'deskripsi_pendek' => 'Repl joint of foot, toe',
          ),
          287 => 
          array (
            'kode' => '81.59',
            'deskripsi_panjang' => 'Revision of joint replacement of lower extremity, not elsewhere classified',
            'deskripsi_pendek' => 'Rev jt repl low ext NEC',
          ),
          288 => 
          array (
            'kode' => '81.62',
            'deskripsi_panjang' => 'Fusion or refusion of 2-3 vertebrae',
            'deskripsi_pendek' => 'Fus/refus 2-3 vertebrae',
          ),
          289 => 
          array (
            'kode' => '81.63',
            'deskripsi_panjang' => 'Fusion or refusion of 4-8 vertebrae',
            'deskripsi_pendek' => 'Fus/refus 4-8 vertebrae',
          ),
          290 => 
          array (
            'kode' => '81.64',
            'deskripsi_panjang' => 'Fusion or refusion of 9 or more vertebrae',
            'deskripsi_pendek' => 'Fus/refus 9 vertebrae',
          ),
          291 => 
          array (
            'kode' => '81.65',
            'deskripsi_panjang' => 'Percutaneous vertebroplasty',
            'deskripsi_pendek' => 'Percutan vertebroplasty',
          ),
          292 => 
          array (
            'kode' => '81.66',
            'deskripsi_panjang' => 'Percutaneous vertebral augmentation',
            'deskripsi_pendek' => 'Percut vertebral augment',
          ),
          293 => 
          array (
            'kode' => '81.71',
            'deskripsi_panjang' => 'Arthroplasty of metacarpophalangeal and interphalangeal joint with implant',
            'deskripsi_pendek' => 'Arthroplas metacarp wit',
          ),
          294 => 
          array (
            'kode' => '81.72',
            'deskripsi_panjang' => 'Arthroplasty of metacarpophalangeal and interphalangeal joint without implant',
            'deskripsi_pendek' => 'Arthroplasty metacar w/o',
          ),
          295 => 
          array (
            'kode' => '81.73',
            'deskripsi_panjang' => 'Total wrist replacement',
            'deskripsi_pendek' => 'Total wrist replacement',
          ),
          296 => 
          array (
            'kode' => '81.74',
            'deskripsi_panjang' => 'Arthroplasty of carpocarpal or carpometacarpal joint with implant',
            'deskripsi_pendek' => 'Arthroplasty carpal wit',
          ),
          297 => 
          array (
            'kode' => '81.75',
            'deskripsi_panjang' => 'Arthroplasty of carpocarpal or carpometacarpal joint without implant',
            'deskripsi_pendek' => 'Arthroplasty carpal w/o',
          ),
          298 => 
          array (
            'kode' => '81.79',
            'deskripsi_panjang' => 'Other repair of hand, fingers, and wrist',
            'deskripsi_pendek' => 'Oth repair han/fin/wris',
          ),
          299 => 
          array (
            'kode' => '81.80',
            'deskripsi_panjang' => 'Other total shoulder replacement',
            'deskripsi_pendek' => 'Oth totl shouldr replace',
          ),
          300 => 
          array (
            'kode' => '81.81',
            'deskripsi_panjang' => 'Partial shoulder replacement',
            'deskripsi_pendek' => 'Partial shoulder replace',
          ),
          301 => 
          array (
            'kode' => '81.82',
            'deskripsi_panjang' => 'Repair of recurrent dislocation of shoulder',
            'deskripsi_pendek' => 'Rep recur shlder disloc',
          ),
          302 => 
          array (
            'kode' => '81.83',
            'deskripsi_panjang' => 'Other repair of shoulder',
            'deskripsi_pendek' => 'Shoulder arthroplast NEC',
          ),
          303 => 
          array (
            'kode' => '81.84',
            'deskripsi_panjang' => 'Total elbow replacement',
            'deskripsi_pendek' => 'Total elbow replacement',
          ),
          304 => 
          array (
            'kode' => '81.85',
            'deskripsi_panjang' => 'Other repair of elbow',
            'deskripsi_pendek' => 'Elbow arthroplasty NEC',
          ),
          305 => 
          array (
            'kode' => '81.88',
            'deskripsi_panjang' => 'Reverse total shoulder replacement',
            'deskripsi_pendek' => 'Rvrs totl shldr replacmt',
          ),
          306 => 
          array (
            'kode' => '81.91',
            'deskripsi_panjang' => 'Arthrocentesis',
            'deskripsi_pendek' => 'Arthrocentesis',
          ),
          307 => 
          array (
            'kode' => '81.92',
            'deskripsi_panjang' => 'Injection of therapeutic substance into joint or ligament',
            'deskripsi_pendek' => 'Injection into joint',
          ),
          308 => 
          array (
            'kode' => '81.93',
            'deskripsi_panjang' => 'Suture of capsule or ligament of upper extremity',
            'deskripsi_pendek' => 'Sutur capsul/ligamen arm',
          ),
          309 => 
          array (
            'kode' => '81.94',
            'deskripsi_panjang' => 'Suture of capsule or ligament of ankle and foot',
            'deskripsi_pendek' => 'Suture capsul/lig ank/ft',
          ),
          310 => 
          array (
            'kode' => '81.95',
            'deskripsi_panjang' => 'Suture of capsule or ligament of other lower extremity',
            'deskripsi_pendek' => 'Sutur capsul/lig leg NEC',
          ),
          311 => 
          array (
            'kode' => '81.96',
            'deskripsi_panjang' => 'Other repair of joint',
            'deskripsi_pendek' => 'Other repair of joint',
          ),
          312 => 
          array (
            'kode' => '81.97',
            'deskripsi_panjang' => 'Revision of joint replacement of upper extremity',
            'deskripsi_pendek' => 'Rev jt repl upper extrem',
          ),
          313 => 
          array (
            'kode' => '81.98',
            'deskripsi_panjang' => 'Other diagnostic procedures on joint structures',
            'deskripsi_pendek' => 'Other joint dx procedure',
          ),
          314 => 
          array (
            'kode' => '81.99',
            'deskripsi_panjang' => 'Other operations on joint structures',
            'deskripsi_pendek' => 'Joint structure op NEC',
          ),
          315 => 
          array (
            'kode' => '82.01',
            'deskripsi_panjang' => 'Exploration of tendon sheath of hand',
            'deskripsi_pendek' => 'Explor tend sheath-hand',
          ),
          316 => 
          array (
            'kode' => '82.02',
            'deskripsi_panjang' => 'Myotomy of hand',
            'deskripsi_pendek' => 'Myotomy of hand',
          ),
          317 => 
          array (
            'kode' => '82.03',
            'deskripsi_panjang' => 'Bursotomy of hand',
            'deskripsi_pendek' => 'Bursotomy of hand',
          ),
          318 => 
          array (
            'kode' => '82.04',
            'deskripsi_panjang' => 'Incision and drainage of palmar or thenar space',
            'deskripsi_pendek' => 'I & d palmar/thenar spac',
          ),
          319 => 
          array (
            'kode' => '82.09',
            'deskripsi_panjang' => 'Other incision of soft tissue of hand',
            'deskripsi_pendek' => 'Inc soft tissue hand NEC',
          ),
          320 => 
          array (
            'kode' => '82.11',
            'deskripsi_panjang' => 'Tenotomy of hand',
            'deskripsi_pendek' => 'Tenotomy of hand',
          ),
          321 => 
          array (
            'kode' => '82.12',
            'deskripsi_panjang' => 'Fasciotomy of hand',
            'deskripsi_pendek' => 'Fasciotomy of hand',
          ),
          322 => 
          array (
            'kode' => '82.19',
            'deskripsi_panjang' => 'Other division of soft tissue of hand',
            'deskripsi_pendek' => 'Div soft tissue hand NEC',
          ),
          323 => 
          array (
            'kode' => '82.21',
            'deskripsi_panjang' => 'Excision of lesion of tendon sheath of hand',
            'deskripsi_pendek' => 'Exc les tend sheath hand',
          ),
          324 => 
          array (
            'kode' => '82.22',
            'deskripsi_panjang' => 'Excision of lesion of muscle of hand',
            'deskripsi_pendek' => 'Excision hand muscle les',
          ),
          325 => 
          array (
            'kode' => '82.29',
            'deskripsi_panjang' => 'Excision of other lesion of soft tissue of hand',
            'deskripsi_pendek' => 'Exc les sft tiss hnd NEC',
          ),
          326 => 
          array (
            'kode' => '82.31',
            'deskripsi_panjang' => 'Bursectomy of hand',
            'deskripsi_pendek' => 'Bursectomy of hand',
          ),
          327 => 
          array (
            'kode' => '82.32',
            'deskripsi_panjang' => 'Excision of tendon of hand for graft',
            'deskripsi_pendek' => 'Excis hand tend for grft',
          ),
          328 => 
          array (
            'kode' => '82.33',
            'deskripsi_panjang' => 'Other tenonectomy of hand',
            'deskripsi_pendek' => 'Hand tenonectomy NEC',
          ),
          329 => 
          array (
            'kode' => '82.34',
            'deskripsi_panjang' => 'Excision of muscle or fascia of hand for graft',
            'deskripsi_pendek' => 'Exc hnd mus/fas for grft',
          ),
          330 => 
          array (
            'kode' => '82.35',
            'deskripsi_panjang' => 'Other fasciectomy of hand',
            'deskripsi_pendek' => 'Hand fasciectomy NEC',
          ),
          331 => 
          array (
            'kode' => '82.36',
            'deskripsi_panjang' => 'Other myectomy of hand',
            'deskripsi_pendek' => 'Other myectomy of hand',
          ),
          332 => 
          array (
            'kode' => '82.39',
            'deskripsi_panjang' => 'Other excision of soft tissue of hand',
            'deskripsi_pendek' => 'Hand soft tissue exc NEC',
          ),
          333 => 
          array (
            'kode' => '82.41',
            'deskripsi_panjang' => 'Suture of tendon sheath of hand',
            'deskripsi_pendek' => 'Suture tendn sheath hand',
          ),
          334 => 
          array (
            'kode' => '82.42',
            'deskripsi_panjang' => 'Delayed suture of flexor tendon of hand',
            'deskripsi_pendek' => 'Delay sut flex tend hand',
          ),
          335 => 
          array (
            'kode' => '82.43',
            'deskripsi_panjang' => 'Delayed suture of other tendon of hand',
            'deskripsi_pendek' => 'Delay sut hand tend NEC',
          ),
          336 => 
          array (
            'kode' => '82.44',
            'deskripsi_panjang' => 'Other suture of flexor tendon of hand',
            'deskripsi_pendek' => 'Sutur flex tend hand NEC',
          ),
          337 => 
          array (
            'kode' => '82.45',
            'deskripsi_panjang' => 'Other suture of other tendon of hand',
            'deskripsi_pendek' => 'Suture hand tendon NEC',
          ),
          338 => 
          array (
            'kode' => '82.46',
            'deskripsi_panjang' => 'Suture of muscle or fascia of hand',
            'deskripsi_pendek' => 'Suture hand muscle/fasc',
          ),
          339 => 
          array (
            'kode' => '82.51',
            'deskripsi_panjang' => 'Advancement of tendon of hand',
            'deskripsi_pendek' => 'Hand tendon advancement',
          ),
          340 => 
          array (
            'kode' => '82.52',
            'deskripsi_panjang' => 'Recession of tendon of hand',
            'deskripsi_pendek' => 'Hand tendon recession',
          ),
          341 => 
          array (
            'kode' => '82.53',
            'deskripsi_panjang' => 'Reattachment of tendon of hand',
            'deskripsi_pendek' => 'Hand tendon reattachment',
          ),
          342 => 
          array (
            'kode' => '82.54',
            'deskripsi_panjang' => 'Reattachment of muscle of hand',
            'deskripsi_pendek' => 'Hand muscle reattachment',
          ),
          343 => 
          array (
            'kode' => '82.55',
            'deskripsi_panjang' => 'Other change in hand muscle or tendon length',
            'deskripsi_pendek' => 'Chng hnd mus/ten lng NEC',
          ),
          344 => 
          array (
            'kode' => '82.56',
            'deskripsi_panjang' => 'Other hand tendon transfer or transplantation',
            'deskripsi_pendek' => 'Transplant hand tend NEC',
          ),
          345 => 
          array (
            'kode' => '82.57',
            'deskripsi_panjang' => 'Other hand tendon transposition',
            'deskripsi_pendek' => 'Transposit hand tend NEC',
          ),
          346 => 
          array (
            'kode' => '82.58',
            'deskripsi_panjang' => 'Other hand muscle transfer or transplantation',
            'deskripsi_pendek' => 'Transplant hand musc NEC',
          ),
          347 => 
          array (
            'kode' => '82.59',
            'deskripsi_panjang' => 'Other hand muscle transposition',
            'deskripsi_pendek' => 'Transposit hand musc NEC',
          ),
          348 => 
          array (
            'kode' => '82.61',
            'deskripsi_panjang' => 'Pollicization operation carrying over nerves and blood supply',
            'deskripsi_pendek' => 'Pollicization operation',
          ),
          349 => 
          array (
            'kode' => '82.69',
            'deskripsi_panjang' => 'Other reconstruction of thumb',
            'deskripsi_pendek' => 'Thumb reconstruction NEC',
          ),
          350 => 
          array (
            'kode' => '82.71',
            'deskripsi_panjang' => 'Tendon pulley reconstruction of hand',
            'deskripsi_pendek' => 'Hand tend pulley reconst',
          ),
          351 => 
          array (
            'kode' => '82.72',
            'deskripsi_panjang' => 'Plastic operation on hand with graft of muscle or fascia',
            'deskripsi_pendek' => 'Plast op hnd-mus/fas grf',
          ),
          352 => 
          array (
            'kode' => '82.79',
            'deskripsi_panjang' => 'Plastic operation on hand with other graft or implant',
            'deskripsi_pendek' => 'Plast op hand w grft NEC',
          ),
          353 => 
          array (
            'kode' => '82.81',
            'deskripsi_panjang' => 'Transfer of finger, except thumb',
            'deskripsi_pendek' => 'Transfer of finger',
          ),
          354 => 
          array (
            'kode' => '82.82',
            'deskripsi_panjang' => 'Repair of cleft hand',
            'deskripsi_pendek' => 'Repair of cleft hand',
          ),
          355 => 
          array (
            'kode' => '82.83',
            'deskripsi_panjang' => 'Repair of macrodactyly',
            'deskripsi_pendek' => 'Repair of macrodactyly',
          ),
          356 => 
          array (
            'kode' => '82.84',
            'deskripsi_panjang' => 'Repair of mallet finger',
            'deskripsi_pendek' => 'Repair of mallet finger',
          ),
          357 => 
          array (
            'kode' => '82.85',
            'deskripsi_panjang' => 'Other tenodesis of hand',
            'deskripsi_pendek' => 'Other tenodesis of hand',
          ),
          358 => 
          array (
            'kode' => '82.86',
            'deskripsi_panjang' => 'Other tenoplasty of hand',
            'deskripsi_pendek' => 'Other tenoplasty of hand',
          ),
          359 => 
          array (
            'kode' => '82.89',
            'deskripsi_panjang' => 'Other plastic operations on hand',
            'deskripsi_pendek' => 'Hand plastic op NEC',
          ),
          360 => 
          array (
            'kode' => '82.91',
            'deskripsi_panjang' => 'Lysis of adhesions of hand',
            'deskripsi_pendek' => 'Lysis of hand adhesions',
          ),
          361 => 
          array (
            'kode' => '82.92',
            'deskripsi_panjang' => 'Aspiration of bursa of hand',
            'deskripsi_pendek' => 'Aspiration bursa of hand',
          ),
          362 => 
          array (
            'kode' => '82.93',
            'deskripsi_panjang' => 'Aspiration of other soft tissue of hand',
            'deskripsi_pendek' => 'Aspir soft tiss hand NEC',
          ),
          363 => 
          array (
            'kode' => '82.94',
            'deskripsi_panjang' => 'Injection of therapeutic substance into bursa of hand',
            'deskripsi_pendek' => 'Inject bursa of hand',
          ),
          364 => 
          array (
            'kode' => '82.95',
            'deskripsi_panjang' => 'Injection of therapeutic substance into tendon of hand',
            'deskripsi_pendek' => 'Inject tendon of hand',
          ),
          365 => 
          array (
            'kode' => '82.96',
            'deskripsi_panjang' => 'Other injection of locally-acting therapeutic substance into soft tissue of hand',
            'deskripsi_pendek' => 'Hand sft tissu injec NEC',
          ),
          366 => 
          array (
            'kode' => '82.99',
            'deskripsi_panjang' => 'Other operations on muscle, tendon, and fascia of hand',
            'deskripsi_pendek' => 'Hand mus/ten/fas/ops NEC',
          ),
          367 => 
          array (
            'kode' => '83.01',
            'deskripsi_panjang' => 'Exploration of tendon sheath',
            'deskripsi_pendek' => 'Tendon sheath explorat',
          ),
          368 => 
          array (
            'kode' => '83.02',
            'deskripsi_panjang' => 'Myotomy',
            'deskripsi_pendek' => 'Myotomy',
          ),
          369 => 
          array (
            'kode' => '83.03',
            'deskripsi_panjang' => 'Bursotomy',
            'deskripsi_pendek' => 'Bursotomy',
          ),
          370 => 
          array (
            'kode' => '83.09',
            'deskripsi_panjang' => 'Other incision of soft tissue',
            'deskripsi_pendek' => 'Soft tissue incision NEC',
          ),
          371 => 
          array (
            'kode' => '83.11',
            'deskripsi_panjang' => 'Achillotenotomy',
            'deskripsi_pendek' => 'Achillotenotomy',
          ),
          372 => 
          array (
            'kode' => '83.12',
            'deskripsi_panjang' => 'Adductor tenotomy of hip',
            'deskripsi_pendek' => 'Adductor tenotomy of hip',
          ),
          373 => 
          array (
            'kode' => '83.13',
            'deskripsi_panjang' => 'Other tenotomy',
            'deskripsi_pendek' => 'Other tenotomy',
          ),
          374 => 
          array (
            'kode' => '83.14',
            'deskripsi_panjang' => 'Fasciotomy',
            'deskripsi_pendek' => 'Fasciotomy',
          ),
          375 => 
          array (
            'kode' => '83.19',
            'deskripsi_panjang' => 'Other division of soft tissue',
            'deskripsi_pendek' => 'Soft tissue division NEC',
          ),
          376 => 
          array (
            'kode' => '83.21',
            'deskripsi_panjang' => 'Open biopsy of soft tissue',
            'deskripsi_pendek' => 'Open biopsy soft tissue',
          ),
          377 => 
          array (
            'kode' => '83.29',
            'deskripsi_panjang' => 'Other diagnostic procedures on muscle, tendon, fascia, and bursa, including that of hand',
            'deskripsi_pendek' => 'Soft tissue dx proc NEC',
          ),
          378 => 
          array (
            'kode' => '83.31',
            'deskripsi_panjang' => 'Excision of lesion of tendon sheath',
            'deskripsi_pendek' => 'Excis les tendon sheath',
          ),
          379 => 
          array (
            'kode' => '83.32',
            'deskripsi_panjang' => 'Excision of lesion of muscle',
            'deskripsi_pendek' => 'Excis lesion of muscle',
          ),
          380 => 
          array (
            'kode' => '83.39',
            'deskripsi_panjang' => 'Excision of lesion of other soft tissue',
            'deskripsi_pendek' => 'Exc les soft tissue NEC',
          ),
          381 => 
          array (
            'kode' => '83.41',
            'deskripsi_panjang' => 'Excision of tendon for graft',
            'deskripsi_pendek' => 'Tendon excision for grft',
          ),
          382 => 
          array (
            'kode' => '83.42',
            'deskripsi_panjang' => 'Other tenonectomy',
            'deskripsi_pendek' => 'Other tenonectomy',
          ),
          383 => 
          array (
            'kode' => '83.43',
            'deskripsi_panjang' => 'Excision of muscle or fascia for graft',
            'deskripsi_pendek' => 'Musc/fasc excis for grft',
          ),
          384 => 
          array (
            'kode' => '83.44',
            'deskripsi_panjang' => 'Other fasciectomy',
            'deskripsi_pendek' => 'Other fasciectomy',
          ),
          385 => 
          array (
            'kode' => '83.45',
            'deskripsi_panjang' => 'Other myectomy',
            'deskripsi_pendek' => 'Other myectomy',
          ),
          386 => 
          array (
            'kode' => '83.49',
            'deskripsi_panjang' => 'Other excision of soft tissue',
            'deskripsi_pendek' => 'Other soft tissue excis',
          ),
          387 => 
          array (
            'kode' => '83.5',
            'deskripsi_panjang' => 'Bursectomy',
            'deskripsi_pendek' => 'Bursectomy',
          ),
          388 => 
          array (
            'kode' => '83.61',
            'deskripsi_panjang' => 'Suture of tendon sheath',
            'deskripsi_pendek' => 'Tendon sheath suture',
          ),
          389 => 
          array (
            'kode' => '83.62',
            'deskripsi_panjang' => 'Delayed suture of tendon',
            'deskripsi_pendek' => 'Delayed tendon suture',
          ),
          390 => 
          array (
            'kode' => '83.63',
            'deskripsi_panjang' => 'Rotator cuff repair',
            'deskripsi_pendek' => 'Rotator cuff repair',
          ),
          391 => 
          array (
            'kode' => '83.64',
            'deskripsi_panjang' => 'Other suture of tendon',
            'deskripsi_pendek' => 'Other suture of tendon',
          ),
          392 => 
          array (
            'kode' => '83.65',
            'deskripsi_panjang' => 'Other suture of muscle or fascia',
            'deskripsi_pendek' => 'Other muscle/fasc suture',
          ),
          393 => 
          array (
            'kode' => '83.71',
            'deskripsi_panjang' => 'Advancement of tendon',
            'deskripsi_pendek' => 'Tendon advancement',
          ),
          394 => 
          array (
            'kode' => '83.72',
            'deskripsi_panjang' => 'Recession of tendon',
            'deskripsi_pendek' => 'Tendon recession',
          ),
          395 => 
          array (
            'kode' => '83.73',
            'deskripsi_panjang' => 'Reattachment of tendon',
            'deskripsi_pendek' => 'Tendon reattachment',
          ),
          396 => 
          array (
            'kode' => '83.74',
            'deskripsi_panjang' => 'Reattachment of muscle',
            'deskripsi_pendek' => 'Muscle reattachment',
          ),
          397 => 
          array (
            'kode' => '83.75',
            'deskripsi_panjang' => 'Tendon transfer or transplantation',
            'deskripsi_pendek' => 'Tendon trnsfr/transplant',
          ),
          398 => 
          array (
            'kode' => '83.76',
            'deskripsi_panjang' => 'Other tendon transposition',
            'deskripsi_pendek' => 'Other tendon transposit',
          ),
          399 => 
          array (
            'kode' => '83.77',
            'deskripsi_panjang' => 'Muscle transfer or transplantation',
            'deskripsi_pendek' => 'Muscle trnsfr/transplant',
          ),
          400 => 
          array (
            'kode' => '83.79',
            'deskripsi_panjang' => 'Other muscle transposition',
            'deskripsi_pendek' => 'Other muscle transposit',
          ),
          401 => 
          array (
            'kode' => '83.81',
            'deskripsi_panjang' => 'Tendon graft',
            'deskripsi_pendek' => 'Tendon graft',
          ),
          402 => 
          array (
            'kode' => '83.82',
            'deskripsi_panjang' => 'Graft of muscle or fascia',
            'deskripsi_pendek' => 'Muscle or fascia graft',
          ),
          403 => 
          array (
            'kode' => '83.83',
            'deskripsi_panjang' => 'Tendon pulley reconstruction other than hand',
            'deskripsi_pendek' => 'Tendon pulley reconstruc',
          ),
          404 => 
          array (
            'kode' => '83.84',
            'deskripsi_panjang' => 'Release of clubfoot, not elsewhere classified',
            'deskripsi_pendek' => 'Clubfoot release NEC',
          ),
          405 => 
          array (
            'kode' => '83.85',
            'deskripsi_panjang' => 'Other change in muscle or tendon length',
            'deskripsi_pendek' => 'Musc/tend lng change NEC',
          ),
          406 => 
          array (
            'kode' => '83.86',
            'deskripsi_panjang' => 'Quadricepsplasty',
            'deskripsi_pendek' => 'Quadricepsplasty',
          ),
          407 => 
          array (
            'kode' => '83.87',
            'deskripsi_panjang' => 'Other plastic operations on muscle',
            'deskripsi_pendek' => 'Other plastic ops muscle',
          ),
          408 => 
          array (
            'kode' => '83.88',
            'deskripsi_panjang' => 'Other plastic operations on tendon',
            'deskripsi_pendek' => 'Other plastic ops tendon',
          ),
          409 => 
          array (
            'kode' => '83.89',
            'deskripsi_panjang' => 'Other plastic operations on fascia',
            'deskripsi_pendek' => 'Other plastic ops fascia',
          ),
          410 => 
          array (
            'kode' => '83.91',
            'deskripsi_panjang' => 'Lysis of adhesions of muscle, tendon, fascia, and bursa',
            'deskripsi_pendek' => 'Adhesiolysis mus/ten/fas',
          ),
          411 => 
          array (
            'kode' => '83.92',
            'deskripsi_panjang' => 'Insertion or replacement of skeletal muscle stimulator',
            'deskripsi_pendek' => 'Insert skel musc stimula',
          ),
          412 => 
          array (
            'kode' => '83.93',
            'deskripsi_panjang' => 'Removal of skeletal muscle stimulator',
            'deskripsi_pendek' => 'Remov skel musc stimulat',
          ),
          413 => 
          array (
            'kode' => '83.94',
            'deskripsi_panjang' => 'Aspiration of bursa',
            'deskripsi_pendek' => 'Aspiration of bursa',
          ),
          414 => 
          array (
            'kode' => '83.95',
            'deskripsi_panjang' => 'Aspiration of other soft tissue',
            'deskripsi_pendek' => 'Soft tissue aspirat NEC',
          ),
          415 => 
          array (
            'kode' => '83.96',
            'deskripsi_panjang' => 'Injection of therapeutic substance into bursa',
            'deskripsi_pendek' => 'Injection into bursa',
          ),
          416 => 
          array (
            'kode' => '83.97',
            'deskripsi_panjang' => 'Injection of therapeutic substance into tendon',
            'deskripsi_pendek' => 'Injection into tendon',
          ),
          417 => 
          array (
            'kode' => '83.98',
            'deskripsi_panjang' => 'Injection of locally acting therapeutic substance into other soft tissue',
            'deskripsi_pendek' => 'Soft tissue inject NEC',
          ),
          418 => 
          array (
            'kode' => '83.99',
            'deskripsi_panjang' => 'Other operations on muscle, tendon, fascia, and bursa',
            'deskripsi_pendek' => 'Mus/ten/fas/bur op NEC',
          ),
          419 => 
          array (
            'kode' => '84.00',
            'deskripsi_panjang' => 'Upper limb amputation, not otherwise specified',
            'deskripsi_pendek' => 'Upper limb amputat NOS',
          ),
          420 => 
          array (
            'kode' => '84.01',
            'deskripsi_panjang' => 'Amputation and disarticulation of finger',
            'deskripsi_pendek' => 'Finger amputation',
          ),
          421 => 
          array (
            'kode' => '84.02',
            'deskripsi_panjang' => 'Amputation and disarticulation of thumb',
            'deskripsi_pendek' => 'Thumb amputation',
          ),
          422 => 
          array (
            'kode' => '84.03',
            'deskripsi_panjang' => 'Amputation through hand',
            'deskripsi_pendek' => 'Amputation through hand',
          ),
          423 => 
          array (
            'kode' => '84.04',
            'deskripsi_panjang' => 'Disarticulation of wrist',
            'deskripsi_pendek' => 'Disarticulation of wrist',
          ),
          424 => 
          array (
            'kode' => '84.05',
            'deskripsi_panjang' => 'Amputation through forearm',
            'deskripsi_pendek' => 'Amputation thru forearm',
          ),
          425 => 
          array (
            'kode' => '84.06',
            'deskripsi_panjang' => 'Disarticulation of elbow',
            'deskripsi_pendek' => 'Disarticulation of elbow',
          ),
          426 => 
          array (
            'kode' => '84.07',
            'deskripsi_panjang' => 'Amputation through humerus',
            'deskripsi_pendek' => 'Amputation thru humerus',
          ),
          427 => 
          array (
            'kode' => '84.08',
            'deskripsi_panjang' => 'Disarticulation of shoulder',
            'deskripsi_pendek' => 'Shoulder disarticulation',
          ),
          428 => 
          array (
            'kode' => '84.09',
            'deskripsi_panjang' => 'Interthoracoscapular amputation',
            'deskripsi_pendek' => 'Forequarter amputation',
          ),
          429 => 
          array (
            'kode' => '84.10',
            'deskripsi_panjang' => 'Lower limb amputation, not otherwise specified',
            'deskripsi_pendek' => 'Lower limb amputat NOS',
          ),
          430 => 
          array (
            'kode' => '84.11',
            'deskripsi_panjang' => 'Amputation of toe',
            'deskripsi_pendek' => 'Toe amputation',
          ),
          431 => 
          array (
            'kode' => '84.12',
            'deskripsi_panjang' => 'Amputation through foot',
            'deskripsi_pendek' => 'Amputation through foot',
          ),
          432 => 
          array (
            'kode' => '84.13',
            'deskripsi_panjang' => 'Disarticulation of ankle',
            'deskripsi_pendek' => 'Disarticulation of ankle',
          ),
          433 => 
          array (
            'kode' => '84.14',
            'deskripsi_panjang' => 'Amputation of ankle through malleoli of tibia and fibula',
            'deskripsi_pendek' => 'Amputat through malleoli',
          ),
          434 => 
          array (
            'kode' => '84.15',
            'deskripsi_panjang' => 'Other amputation below knee',
            'deskripsi_pendek' => 'Below knee amputat NEC',
          ),
          435 => 
          array (
            'kode' => '84.16',
            'deskripsi_panjang' => 'Disarticulation of knee',
            'deskripsi_pendek' => 'Disarticulation of knee',
          ),
          436 => 
          array (
            'kode' => '84.17',
            'deskripsi_panjang' => 'Amputation above knee',
            'deskripsi_pendek' => 'Above knee amputation',
          ),
          437 => 
          array (
            'kode' => '84.18',
            'deskripsi_panjang' => 'Disarticulation of hip',
            'deskripsi_pendek' => 'Disarticulation of hip',
          ),
          438 => 
          array (
            'kode' => '84.19',
            'deskripsi_panjang' => 'Abdominopelvic amputation',
            'deskripsi_pendek' => 'Hindquarter amputation',
          ),
          439 => 
          array (
            'kode' => '84.21',
            'deskripsi_panjang' => 'Thumb reattachment',
            'deskripsi_pendek' => 'Thumb reattachment',
          ),
          440 => 
          array (
            'kode' => '84.22',
            'deskripsi_panjang' => 'Finger reattachment',
            'deskripsi_pendek' => 'Finger reattachment',
          ),
          441 => 
          array (
            'kode' => '84.23',
            'deskripsi_panjang' => 'Forearm, wrist, or hand reattachment',
            'deskripsi_pendek' => 'Forearm/wrist/hand reatt',
          ),
          442 => 
          array (
            'kode' => '84.24',
            'deskripsi_panjang' => 'Upper arm reattachment',
            'deskripsi_pendek' => 'Upper arm reattachment',
          ),
          443 => 
          array (
            'kode' => '84.25',
            'deskripsi_panjang' => 'Toe reattachment',
            'deskripsi_pendek' => 'Toe reattachment',
          ),
          444 => 
          array (
            'kode' => '84.26',
            'deskripsi_panjang' => 'Foot reattachment',
            'deskripsi_pendek' => 'Foot reattachment',
          ),
          445 => 
          array (
            'kode' => '84.27',
            'deskripsi_panjang' => 'Lower leg or ankle reattachment',
            'deskripsi_pendek' => 'Lower leg/ankle reattach',
          ),
          446 => 
          array (
            'kode' => '84.28',
            'deskripsi_panjang' => 'Thigh reattachment',
            'deskripsi_pendek' => 'Thigh reattachment',
          ),
          447 => 
          array (
            'kode' => '84.29',
            'deskripsi_panjang' => 'Other reattachment of extremity',
            'deskripsi_pendek' => 'Reattachment NEC',
          ),
          448 => 
          array (
            'kode' => '84.3',
            'deskripsi_panjang' => 'Revision of amputation stump',
            'deskripsi_pendek' => 'Amputation stump revis',
          ),
          449 => 
          array (
            'kode' => '84.40',
            'deskripsi_panjang' => 'Implantation or fitting of prosthetic limb device, not otherwise specified',
            'deskripsi_pendek' => 'Implnt/fit pros limb NOS',
          ),
          450 => 
          array (
            'kode' => '84.41',
            'deskripsi_panjang' => 'Fitting of prosthesis of upper arm and shoulder',
            'deskripsi_pendek' => 'Fit up arm/should prosth',
          ),
          451 => 
          array (
            'kode' => '84.42',
            'deskripsi_panjang' => 'Fitting of prosthesis of lower arm and hand',
            'deskripsi_pendek' => 'Fit lo arm/hand prosthes',
          ),
          452 => 
          array (
            'kode' => '84.43',
            'deskripsi_panjang' => 'Fitting of prosthesis of arm, not otherwise specified',
            'deskripsi_pendek' => 'Fit arm prosthesis NOS',
          ),
          453 => 
          array (
            'kode' => '84.44',
            'deskripsi_panjang' => 'Implantation of prosthetic device of arm',
            'deskripsi_pendek' => 'Implant arm prosthesis',
          ),
          454 => 
          array (
            'kode' => '84.45',
            'deskripsi_panjang' => 'Fitting of prosthesis above knee',
            'deskripsi_pendek' => 'Fit above knee prosthes',
          ),
          455 => 
          array (
            'kode' => '84.46',
            'deskripsi_panjang' => 'Fitting of prosthesis below knee',
            'deskripsi_pendek' => 'Fit below knee prosthes',
          ),
          456 => 
          array (
            'kode' => '84.47',
            'deskripsi_panjang' => 'Fitting of prosthesis of leg, not otherwise specified',
            'deskripsi_pendek' => 'Fit leg prosthesis NOS',
          ),
          457 => 
          array (
            'kode' => '84.48',
            'deskripsi_panjang' => 'Implantation of prosthetic device of leg',
            'deskripsi_pendek' => 'Implant leg prosthesis',
          ),
          458 => 
          array (
            'kode' => '84.51',
            'deskripsi_panjang' => 'Insertion of interbody spinal fusion device',
            'deskripsi_pendek' => 'Ins spinal fusion device',
          ),
          459 => 
          array (
            'kode' => '84.52',
            'deskripsi_panjang' => 'Insertion of recombinant bone morphogenetic protein',
            'deskripsi_pendek' => 'Insert recombinant BMP',
          ),
          460 => 
          array (
            'kode' => '84.53',
            'deskripsi_panjang' => 'Implantation of internal limb lengthening device with kinetic distraction',
            'deskripsi_pendek' => 'Imp limb length kinetic',
          ),
          461 => 
          array (
            'kode' => '84.54',
            'deskripsi_panjang' => 'Implantation of other internal limb lengthening device',
            'deskripsi_pendek' => 'Impl other limb length',
          ),
          462 => 
          array (
            'kode' => '84.55',
            'deskripsi_panjang' => 'Insertion of bone void filler',
            'deskripsi_pendek' => 'Ins bone void filler',
          ),
          463 => 
          array (
            'kode' => '84.56',
            'deskripsi_panjang' => 'Insertion or replacement of (cement) spacer',
            'deskripsi_pendek' => 'Ins or rep cement spacer',
          ),
          464 => 
          array (
            'kode' => '84.57',
            'deskripsi_panjang' => 'Removal of (cement) spacer',
            'deskripsi_pendek' => 'Removal of cement spacer',
          ),
          465 => 
          array (
            'kode' => '84.59',
            'deskripsi_panjang' => 'Insertion of other spinal devices',
            'deskripsi_pendek' => 'Insert othr spin device',
          ),
          466 => 
          array (
            'kode' => '84.60',
            'deskripsi_panjang' => 'Insertion of spinal disc prosthesis, not otherwise specified',
            'deskripsi_pendek' => 'Insert disc pros NOS',
          ),
          467 => 
          array (
            'kode' => '84.61',
            'deskripsi_panjang' => 'Insertion of partial spinal disc prosthesis, cervical',
            'deskripsi_pendek' => 'Ins part disc pros cerv',
          ),
          468 => 
          array (
            'kode' => '84.62',
            'deskripsi_panjang' => 'Insertion of total spinal disc prosthesis, cervical',
            'deskripsi_pendek' => 'Ins tot disc prost cerv',
          ),
          469 => 
          array (
            'kode' => '84.63',
            'deskripsi_panjang' => 'Insertion of spinal disc prosthesis, thoracic',
            'deskripsi_pendek' => 'Ins spin disc pros thor',
          ),
          470 => 
          array (
            'kode' => '84.64',
            'deskripsi_panjang' => 'Insertion of partial spinal disc prosthesis, lumbosacral',
            'deskripsi_pendek' => 'Ins part disc pros lumb',
          ),
          471 => 
          array (
            'kode' => '84.65',
            'deskripsi_panjang' => 'Insertion of total spinal disc prosthesis, lumbosacral',
            'deskripsi_pendek' => 'Ins totl disc pros lumb',
          ),
          472 => 
          array (
            'kode' => '84.66',
            'deskripsi_panjang' => 'Revision or replacement of artificial spinal disc prosthesis, cervical',
            'deskripsi_pendek' => 'Revise disc prost cerv',
          ),
          473 => 
          array (
            'kode' => '84.67',
            'deskripsi_panjang' => 'Revision or replacement of artificial spinal disc prosthesis, thoracic',
            'deskripsi_pendek' => 'Revise disc prost thora',
          ),
          474 => 
          array (
            'kode' => '84.68',
            'deskripsi_panjang' => 'Revision or replacement of artificial spinal disc prosthesis, lumbosacral',
            'deskripsi_pendek' => 'Revise disc prosth lumb',
          ),
          475 => 
          array (
            'kode' => '84.69',
            'deskripsi_panjang' => 'Revision or replacement of artificial spinal disc prosthesis, not otherwise specified',
            'deskripsi_pendek' => 'Revise disc prosth NOS',
          ),
          476 => 
          array (
            'kode' => '84.71',
            'deskripsi_panjang' => 'Application of external fixator device, monoplanar system',
            'deskripsi_pendek' => 'App ext fix dev-monoplan',
          ),
          477 => 
          array (
            'kode' => '84.72',
            'deskripsi_panjang' => 'Application of external fixator device, ring system',
            'deskripsi_pendek' => 'App ext fix dev-ring sys',
          ),
          478 => 
          array (
            'kode' => '84.73',
            'deskripsi_panjang' => 'Application of hybrid external fixator device',
            'deskripsi_pendek' => 'App hybrid ext fix dev',
          ),
          479 => 
          array (
            'kode' => '84.80',
            'deskripsi_panjang' => 'Insertion or replacement of interspinous process device(s)',
            'deskripsi_pendek' => 'Ins/repl interspine dev',
          ),
          480 => 
          array (
            'kode' => '84.81',
            'deskripsi_panjang' => 'Revision of interspinous process device(s)',
            'deskripsi_pendek' => 'Rev interspine device',
          ),
          481 => 
          array (
            'kode' => '84.82',
            'deskripsi_panjang' => 'Insertion or replacement of pedicle-based dynamic stabilization device(s)',
            'deskripsi_pendek' => 'Ins/repl pdcl stabil dev',
          ),
          482 => 
          array (
            'kode' => '84.83',
            'deskripsi_panjang' => 'Revision of pedicle-based dynamic stabilization device(s)',
            'deskripsi_pendek' => 'Rev pedcl dyn stabil dev',
          ),
          483 => 
          array (
            'kode' => '84.84',
            'deskripsi_panjang' => 'Insertion or replacement of facet replacement device(s)',
            'deskripsi_pendek' => 'Ins/repl facet replc dev',
          ),
          484 => 
          array (
            'kode' => '84.85',
            'deskripsi_panjang' => 'Revision of facet replacement device(s)',
            'deskripsi_pendek' => 'Rev facet replace device',
          ),
          485 => 
          array (
            'kode' => '84.91',
            'deskripsi_panjang' => 'Amputation, not otherwise specified',
            'deskripsi_pendek' => 'Amputation NOS',
          ),
          486 => 
          array (
            'kode' => '84.92',
            'deskripsi_panjang' => 'Separation of equal conjoined twins',
            'deskripsi_pendek' => 'Separat equal join twin',
          ),
          487 => 
          array (
            'kode' => '84.93',
            'deskripsi_panjang' => 'Separation of unequal conjoined twins',
            'deskripsi_pendek' => 'Separat unequl join twin',
          ),
          488 => 
          array (
            'kode' => '84.94',
            'deskripsi_panjang' => 'Insertion of sternal fixation device with rigid plates',
            'deskripsi_pendek' => 'Ins strn fix w rgd plate',
          ),
          489 => 
          array (
            'kode' => '84.99',
            'deskripsi_panjang' => 'Other operations on musculoskeletal system',
            'deskripsi_pendek' => 'Musculoskeletal op NEC',
          ),
          490 => 
          array (
            'kode' => '85.0',
            'deskripsi_panjang' => 'Mastotomy',
            'deskripsi_pendek' => 'Mastotomy',
          ),
          491 => 
          array (
            'kode' => '85.11',
            'deskripsi_panjang' => 'Closed [percutaneous] [needle] biopsy of breast',
            'deskripsi_pendek' => 'Closed breast biopsy',
          ),
          492 => 
          array (
            'kode' => '85.12',
            'deskripsi_panjang' => 'Open biopsy of breast',
            'deskripsi_pendek' => 'Open breast biopsy',
          ),
          493 => 
          array (
            'kode' => '85.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on breast',
            'deskripsi_pendek' => 'Breast dx procedure NEC',
          ),
          494 => 
          array (
            'kode' => '85.20',
            'deskripsi_panjang' => 'Excision or destruction of breast tissue, not otherwise specified',
            'deskripsi_pendek' => 'Breast tissu destruc NOS',
          ),
          495 => 
          array (
            'kode' => '85.21',
            'deskripsi_panjang' => 'Local excision of lesion of breast',
            'deskripsi_pendek' => 'Local excis breast les',
          ),
          496 => 
          array (
            'kode' => '85.22',
            'deskripsi_panjang' => 'Resection of quadrant of breast',
            'deskripsi_pendek' => 'Quadrant resect breast',
          ),
          497 => 
          array (
            'kode' => '85.23',
            'deskripsi_panjang' => 'Subtotal mastectomy',
            'deskripsi_pendek' => 'Subtotal mastectomy',
          ),
          498 => 
          array (
            'kode' => '85.24',
            'deskripsi_panjang' => 'Excision of ectopic breast tissue',
            'deskripsi_pendek' => 'Exc ectopic breast tissu',
          ),
          499 => 
          array (
            'kode' => '85.25',
            'deskripsi_panjang' => 'Excision of nipple',
            'deskripsi_pendek' => 'Excision of nipple',
          ),
        ));
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '85.31',
            'deskripsi_panjang' => 'Unilateral reduction mammoplasty',
            'deskripsi_pendek' => 'Unilat reduct mammoplast',
          ),
          1 => 
          array (
            'kode' => '85.32',
            'deskripsi_panjang' => 'Bilateral reduction mammoplasty',
            'deskripsi_pendek' => 'Bilat reduct mammoplasty',
          ),
          2 => 
          array (
            'kode' => '85.33',
            'deskripsi_panjang' => 'Unilateral subcutaneous mammectomy with synchronous implant',
            'deskripsi_pendek' => 'Unil subq mammect-implnt',
          ),
          3 => 
          array (
            'kode' => '85.34',
            'deskripsi_panjang' => 'Other unilateral subcutaneous mammectomy',
            'deskripsi_pendek' => 'Unilat subq mammect NEC',
          ),
          4 => 
          array (
            'kode' => '85.35',
            'deskripsi_panjang' => 'Bilateral subcutaneous mammectomy with synchronous implant',
            'deskripsi_pendek' => 'Bil subq mammect-implant',
          ),
          5 => 
          array (
            'kode' => '85.36',
            'deskripsi_panjang' => 'Other bilateral subcutaneous mammectomy',
            'deskripsi_pendek' => 'Bilat subq mammectom NEC',
          ),
          6 => 
          array (
            'kode' => '85.41',
            'deskripsi_panjang' => 'Unilateral simple mastectomy',
            'deskripsi_pendek' => 'Unilat simple mastectomy',
          ),
          7 => 
          array (
            'kode' => '85.42',
            'deskripsi_panjang' => 'Bilateral simple mastectomy',
            'deskripsi_pendek' => 'Bilat simple mastectomy',
          ),
          8 => 
          array (
            'kode' => '85.43',
            'deskripsi_panjang' => 'Unilateral extended simple mastectomy',
            'deskripsi_pendek' => 'Unilat exten simp mastec',
          ),
          9 => 
          array (
            'kode' => '85.44',
            'deskripsi_panjang' => 'Bilateral extended simple mastectomy',
            'deskripsi_pendek' => 'Bilat extend simp mastec',
          ),
          10 => 
          array (
            'kode' => '85.45',
            'deskripsi_panjang' => 'Unilateral radical mastectomy',
            'deskripsi_pendek' => 'Unilat radical mastectom',
          ),
          11 => 
          array (
            'kode' => '85.46',
            'deskripsi_panjang' => 'Bilateral radical mastectomy',
            'deskripsi_pendek' => 'Bilat radical mastectomy',
          ),
          12 => 
          array (
            'kode' => '85.47',
            'deskripsi_panjang' => 'Unilateral extended radical mastectomy',
            'deskripsi_pendek' => 'Unil ext rad mastectomy',
          ),
          13 => 
          array (
            'kode' => '85.48',
            'deskripsi_panjang' => 'Bilateral extended radical mastectomy',
            'deskripsi_pendek' => 'Bil exten rad mastectomy',
          ),
          14 => 
          array (
            'kode' => '85.50',
            'deskripsi_panjang' => 'Augmentation mammoplasty, not otherwise specified',
            'deskripsi_pendek' => 'Augment mammoplasty NOS',
          ),
          15 => 
          array (
            'kode' => '85.51',
            'deskripsi_panjang' => 'Unilateral injection into breast for augmentation',
            'deskripsi_pendek' => 'Unil breast injec-augmen',
          ),
          16 => 
          array (
            'kode' => '85.52',
            'deskripsi_panjang' => 'Bilateral injection into breast for augmentation',
            'deskripsi_pendek' => 'Bil breast injec-augment',
          ),
          17 => 
          array (
            'kode' => '85.53',
            'deskripsi_panjang' => 'Unilateral breast implant',
            'deskripsi_pendek' => 'Unilat breast implant',
          ),
          18 => 
          array (
            'kode' => '85.54',
            'deskripsi_panjang' => 'Bilateral breast implant',
            'deskripsi_pendek' => 'Bilateral breast implant',
          ),
          19 => 
          array (
            'kode' => '85.55',
            'deskripsi_panjang' => 'Fat graft to breast',
            'deskripsi_pendek' => 'Fat graft to breast',
          ),
          20 => 
          array (
            'kode' => '85.6',
            'deskripsi_panjang' => 'Mastopexy',
            'deskripsi_pendek' => 'Mastopexy',
          ),
          21 => 
          array (
            'kode' => '85.70',
            'deskripsi_panjang' => 'Total reconstruction of breast, not otherwise specified',
            'deskripsi_pendek' => 'Totl reconstc breast NOS',
          ),
          22 => 
          array (
            'kode' => '85.71',
            'deskripsi_panjang' => 'Latissimus dorsi myocutaneous flap',
            'deskripsi_pendek' => 'Latiss dorsi myocut flap',
          ),
          23 => 
          array (
            'kode' => '85.72',
            'deskripsi_panjang' => 'Transverse rectus abdominis myocutaneous (TRAM) flap, pedicled',
            'deskripsi_pendek' => 'TRAM flap, pedicled',
          ),
          24 => 
          array (
            'kode' => '85.73',
            'deskripsi_panjang' => 'Transverse rectus abdominis myocutaneous (TRAM) flap, free',
            'deskripsi_pendek' => 'TRAM flap, free',
          ),
          25 => 
          array (
            'kode' => '85.74',
            'deskripsi_panjang' => 'Deep inferior epigastric artery perforator (DIEP) flap, free',
            'deskripsi_pendek' => 'DIEP flap, free',
          ),
          26 => 
          array (
            'kode' => '85.75',
            'deskripsi_panjang' => 'Superficial inferior epigastric artery (SIEA) flap, free',
            'deskripsi_pendek' => 'SIEA flap, free',
          ),
          27 => 
          array (
            'kode' => '85.76',
            'deskripsi_panjang' => 'Gluteal artery perforator (GAP) flap, free',
            'deskripsi_pendek' => 'GAP flap, free',
          ),
          28 => 
          array (
            'kode' => '85.79',
            'deskripsi_panjang' => 'Other total reconstruction of breast',
            'deskripsi_pendek' => 'Totl reconst breast NEC',
          ),
          29 => 
          array (
            'kode' => '85.81',
            'deskripsi_panjang' => 'Suture of laceration of breast',
            'deskripsi_pendek' => 'Suture breast laceration',
          ),
          30 => 
          array (
            'kode' => '85.82',
            'deskripsi_panjang' => 'Split-thickness graft to breast',
            'deskripsi_pendek' => 'Breast split-thick graft',
          ),
          31 => 
          array (
            'kode' => '85.83',
            'deskripsi_panjang' => 'Full-thickness graft to breast',
            'deskripsi_pendek' => 'Breast full-thick graft',
          ),
          32 => 
          array (
            'kode' => '85.84',
            'deskripsi_panjang' => 'Pedicle graft to breast',
            'deskripsi_pendek' => 'Breast pedicle graft',
          ),
          33 => 
          array (
            'kode' => '85.85',
            'deskripsi_panjang' => 'Muscle flap graft to breast',
            'deskripsi_pendek' => 'Breast muscle flap graft',
          ),
          34 => 
          array (
            'kode' => '85.86',
            'deskripsi_panjang' => 'Transposition of nipple',
            'deskripsi_pendek' => 'Transposition of nipple',
          ),
          35 => 
          array (
            'kode' => '85.87',
            'deskripsi_panjang' => 'Other repair or reconstruction of nipple',
            'deskripsi_pendek' => 'Nipple repair NEC',
          ),
          36 => 
          array (
            'kode' => '85.89',
            'deskripsi_panjang' => 'Other mammoplasty',
            'deskripsi_pendek' => 'Mammoplasty NEC',
          ),
          37 => 
          array (
            'kode' => '85.91',
            'deskripsi_panjang' => 'Aspiration of breast',
            'deskripsi_pendek' => 'Aspiration of breast',
          ),
          38 => 
          array (
            'kode' => '85.92',
            'deskripsi_panjang' => 'Injection of therapeutic agent into breast',
            'deskripsi_pendek' => 'Breast injection',
          ),
          39 => 
          array (
            'kode' => '85.93',
            'deskripsi_panjang' => 'Revision of implant of breast',
            'deskripsi_pendek' => 'Breast implant revision',
          ),
          40 => 
          array (
            'kode' => '85.94',
            'deskripsi_panjang' => 'Removal of implant of breast',
            'deskripsi_pendek' => 'Breast implant removal',
          ),
          41 => 
          array (
            'kode' => '85.95',
            'deskripsi_panjang' => 'Insertion of breast tissue expander',
            'deskripsi_pendek' => 'Inser breast tissu expan',
          ),
          42 => 
          array (
            'kode' => '85.96',
            'deskripsi_panjang' => 'Removal of breast tissue expander',
            'deskripsi_pendek' => 'Remov breast tissu expan',
          ),
          43 => 
          array (
            'kode' => '85.99',
            'deskripsi_panjang' => 'Other operations on the breast',
            'deskripsi_pendek' => 'Breast operation NEC',
          ),
          44 => 
          array (
            'kode' => '86.01',
            'deskripsi_panjang' => 'Aspiration of skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Aspiration skin & subq',
          ),
          45 => 
          array (
            'kode' => '86.02',
            'deskripsi_panjang' => 'Injection or tattooing of skin lesion or defect',
            'deskripsi_pendek' => 'Skin defect tattooing',
          ),
          46 => 
          array (
            'kode' => '86.03',
            'deskripsi_panjang' => 'Incision of pilonidal sinus or cyst',
            'deskripsi_pendek' => 'Incision pilonidal sinus',
          ),
          47 => 
          array (
            'kode' => '86.04',
            'deskripsi_panjang' => 'Other incision with drainage of skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Other skin & subq i & d',
          ),
          48 => 
          array (
            'kode' => '86.05',
            'deskripsi_panjang' => 'Incision with removal of foreign body or device from skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Removal fb/dev from skin',
          ),
          49 => 
          array (
            'kode' => '86.06',
            'deskripsi_panjang' => 'Insertion of totally implantable infusion pump',
            'deskripsi_pendek' => 'Insert infusion pump',
          ),
          50 => 
          array (
            'kode' => '86.07',
            'deskripsi_panjang' => 'Insertion of totally implantable vascular access device [VAD]',
            'deskripsi_pendek' => 'Insert vasc access dev',
          ),
          51 => 
          array (
            'kode' => '86.09',
            'deskripsi_panjang' => 'Other incision of skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Skin & subq incision NEC',
          ),
          52 => 
          array (
            'kode' => '86.11',
            'deskripsi_panjang' => 'Closed biopsy of skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Closed bx skin/subq tiss',
          ),
          53 => 
          array (
            'kode' => '86.19',
            'deskripsi_panjang' => 'Other diagnostic procedures on skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Skin & subq dx proc NEC',
          ),
          54 => 
          array (
            'kode' => '86.21',
            'deskripsi_panjang' => 'Excision of pilonidal cyst or sinus',
            'deskripsi_pendek' => 'Excision of pilonid cyst',
          ),
          55 => 
          array (
            'kode' => '86.22',
            'deskripsi_panjang' => 'Excisional debridement of wound, infection, or burn',
            'deskripsi_pendek' => 'Exc wound debridement',
          ),
          56 => 
          array (
            'kode' => '86.23',
            'deskripsi_panjang' => 'Removal of nail, nail bed, or nail fold',
            'deskripsi_pendek' => 'Nail removal',
          ),
          57 => 
          array (
            'kode' => '86.24',
            'deskripsi_panjang' => 'Chemosurgery of skin',
            'deskripsi_pendek' => 'Skin chemosurgery',
          ),
          58 => 
          array (
            'kode' => '86.25',
            'deskripsi_panjang' => 'Dermabrasion',
            'deskripsi_pendek' => 'Dermabrasion',
          ),
          59 => 
          array (
            'kode' => '86.26',
            'deskripsi_panjang' => 'Ligation of dermal appendage',
            'deskripsi_pendek' => 'Ligation dermal appendag',
          ),
          60 => 
          array (
            'kode' => '86.27',
            'deskripsi_panjang' => 'Debridement of nail, nail bed, or nail fold',
            'deskripsi_pendek' => 'Debridement of nail',
          ),
          61 => 
          array (
            'kode' => '86.28',
            'deskripsi_panjang' => 'Nonexcisional debridement of wound, infection or burn',
            'deskripsi_pendek' => 'Nonexcis debridement wnd',
          ),
          62 => 
          array (
            'kode' => '86.3',
            'deskripsi_panjang' => 'Other local excision or destruction of lesion or tissue of skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Other local destruc skin',
          ),
          63 => 
          array (
            'kode' => '86.4',
            'deskripsi_panjang' => 'Radical excision of skin lesion',
            'deskripsi_pendek' => 'Radical excis skin les',
          ),
          64 => 
          array (
            'kode' => '86.51',
            'deskripsi_panjang' => 'Replantation of scalp',
            'deskripsi_pendek' => 'Replantation of scalp',
          ),
          65 => 
          array (
            'kode' => '86.59',
            'deskripsi_panjang' => 'Closure of skin and subcutaneous tissue of other sites',
            'deskripsi_pendek' => 'Skin closure NEC',
          ),
          66 => 
          array (
            'kode' => '86.60',
            'deskripsi_panjang' => 'Free skin graft, not otherwise specified',
            'deskripsi_pendek' => 'Free skin graft NOS',
          ),
          67 => 
          array (
            'kode' => '86.61',
            'deskripsi_panjang' => 'Full-thickness skin graft to hand',
            'deskripsi_pendek' => 'Full-thick hand skin grf',
          ),
          68 => 
          array (
            'kode' => '86.62',
            'deskripsi_panjang' => 'Other skin graft to hand',
            'deskripsi_pendek' => 'Hand skin graft NEC',
          ),
          69 => 
          array (
            'kode' => '86.63',
            'deskripsi_panjang' => 'Full-thickness skin graft to other sites',
            'deskripsi_pendek' => 'Full-thick skin grft NEC',
          ),
          70 => 
          array (
            'kode' => '86.64',
            'deskripsi_panjang' => 'Hair transplant',
            'deskripsi_pendek' => 'Hair transplant',
          ),
          71 => 
          array (
            'kode' => '86.65',
            'deskripsi_panjang' => 'Heterograft to skin',
            'deskripsi_pendek' => 'Heterograft to skin',
          ),
          72 => 
          array (
            'kode' => '86.66',
            'deskripsi_panjang' => 'Homograft to skin',
            'deskripsi_pendek' => 'Homograft to skin',
          ),
          73 => 
          array (
            'kode' => '86.67',
            'deskripsi_panjang' => 'Dermal regenerative graft',
            'deskripsi_pendek' => 'Dermal regener graft',
          ),
          74 => 
          array (
            'kode' => '86.69',
            'deskripsi_panjang' => 'Other skin graft to other sites',
            'deskripsi_pendek' => 'Free skin graft NEC',
          ),
          75 => 
          array (
            'kode' => '86.70',
            'deskripsi_panjang' => 'Pedicle or flap graft, not otherwise specified',
            'deskripsi_pendek' => 'Pedicle graft/flap NOS',
          ),
          76 => 
          array (
            'kode' => '86.71',
            'deskripsi_panjang' => 'Cutting and preparation of pedicle grafts or flaps',
            'deskripsi_pendek' => 'Cut & prep pedicle graft',
          ),
          77 => 
          array (
            'kode' => '86.72',
            'deskripsi_panjang' => 'Advancement of pedicle graft',
            'deskripsi_pendek' => 'Pedicle graft advancemen',
          ),
          78 => 
          array (
            'kode' => '86.73',
            'deskripsi_panjang' => 'Attachment of pedicle or flap graft to hand',
            'deskripsi_pendek' => 'Attach pedicle to hand',
          ),
          79 => 
          array (
            'kode' => '86.74',
            'deskripsi_panjang' => 'Attachment of pedicle or flap graft to other sites',
            'deskripsi_pendek' => 'Attach pedicle graft NEC',
          ),
          80 => 
          array (
            'kode' => '86.75',
            'deskripsi_panjang' => 'Revision of pedicle or flap graft',
            'deskripsi_pendek' => 'Revision of pedicle grft',
          ),
          81 => 
          array (
            'kode' => '86.81',
            'deskripsi_panjang' => 'Repair for facial weakness',
            'deskripsi_pendek' => 'Repair facial weakness',
          ),
          82 => 
          array (
            'kode' => '86.82',
            'deskripsi_panjang' => 'Facial rhytidectomy',
            'deskripsi_pendek' => 'Facial rhytidectomy',
          ),
          83 => 
          array (
            'kode' => '86.83',
            'deskripsi_panjang' => 'Size reduction plastic operation',
            'deskripsi_pendek' => 'Size reduct plastic op',
          ),
          84 => 
          array (
            'kode' => '86.84',
            'deskripsi_panjang' => 'Relaxation of scar or web contracture of skin',
            'deskripsi_pendek' => 'Relaxation of scar',
          ),
          85 => 
          array (
            'kode' => '86.85',
            'deskripsi_panjang' => 'Correction of syndactyly',
            'deskripsi_pendek' => 'Syndactyly correction',
          ),
          86 => 
          array (
            'kode' => '86.86',
            'deskripsi_panjang' => 'Onychoplasty',
            'deskripsi_pendek' => 'Onychoplasty',
          ),
          87 => 
          array (
            'kode' => '86.87',
            'deskripsi_panjang' => 'Fat graft of skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Fat grft skin/subq tiss',
          ),
          88 => 
          array (
            'kode' => '86.89',
            'deskripsi_panjang' => 'Other repair and reconstruction of skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Skin repair & plasty NEC',
          ),
          89 => 
          array (
            'kode' => '86.90',
            'deskripsi_panjang' => 'Extraction of fat for graft or banking',
            'deskripsi_pendek' => 'Ext fat for grft/banking',
          ),
          90 => 
          array (
            'kode' => '86.91',
            'deskripsi_panjang' => 'Excision of skin for graft',
            'deskripsi_pendek' => 'Skin excision for graft',
          ),
          91 => 
          array (
            'kode' => '86.92',
            'deskripsi_panjang' => 'Electrolysis and other epilation of skin',
            'deskripsi_pendek' => 'Epilation of skin',
          ),
          92 => 
          array (
            'kode' => '86.93',
            'deskripsi_panjang' => 'Insertion of tissue expander',
            'deskripsi_pendek' => 'Insert tissue expander',
          ),
          93 => 
          array (
            'kode' => '86.94',
            'deskripsi_panjang' => 'Insertion or replacement of single array neurostimulator pulse generator, not specified as rechargeable',
            'deskripsi_pendek' => 'Ins/repl single pul gen',
          ),
          94 => 
          array (
            'kode' => '86.95',
            'deskripsi_panjang' => 'Insertion or replacement of multiple array neurostimulator pulse generator, not specified as rechargeable',
            'deskripsi_pendek' => 'Ins/re pls gn no rechrg',
          ),
          95 => 
          array (
            'kode' => '86.96',
            'deskripsi_panjang' => 'Insertion or replacement of other neurostimulator pulse generator',
            'deskripsi_pendek' => 'Insert/repl oth neurost',
          ),
          96 => 
          array (
            'kode' => '86.97',
            'deskripsi_panjang' => 'Insertion or replacement of single array rechargeable neurostimulator pulse generator',
            'deskripsi_pendek' => 'Ins/rep 1 pul gen,rechrg',
          ),
          97 => 
          array (
            'kode' => '86.98',
            'deskripsi_panjang' => 'Insertion or replacement of multiple array (two or more) rechargeable neurostimulator pulse generator',
            'deskripsi_pendek' => 'Ins/rep mul pul gn,rechg',
          ),
          98 => 
          array (
            'kode' => '86.99',
            'deskripsi_panjang' => 'Other operations on skin and subcutaneous tissue',
            'deskripsi_pendek' => 'Skin & subq op NEC',
          ),
          99 => 
          array (
            'kode' => '87.01',
            'deskripsi_panjang' => 'Pneumoencephalogram',
            'deskripsi_pendek' => 'Pneumoencephalogram',
          ),
          100 => 
          array (
            'kode' => '87.02',
            'deskripsi_panjang' => 'Other contrast radiogram of brain and skull',
            'deskripsi_pendek' => 'Brain/skull contrst xray',
          ),
          101 => 
          array (
            'kode' => '87.03',
            'deskripsi_panjang' => 'Computerized axial tomography of head',
            'deskripsi_pendek' => 'C.A.T. scan of head',
          ),
          102 => 
          array (
            'kode' => '87.04',
            'deskripsi_panjang' => 'Other tomography of head',
            'deskripsi_pendek' => 'Head tomography NEC',
          ),
          103 => 
          array (
            'kode' => '87.05',
            'deskripsi_panjang' => 'Contrast dacryocystogram',
            'deskripsi_pendek' => 'Contrast dacryocystogram',
          ),
          104 => 
          array (
            'kode' => '87.06',
            'deskripsi_panjang' => 'Contrast radiogram of nasopharynx',
            'deskripsi_pendek' => 'Nasophary contrast x-ray',
          ),
          105 => 
          array (
            'kode' => '87.07',
            'deskripsi_panjang' => 'Contrast laryngogram',
            'deskripsi_pendek' => 'Contrast laryngogram',
          ),
          106 => 
          array (
            'kode' => '87.08',
            'deskripsi_panjang' => 'Cervical lymphangiogram',
            'deskripsi_pendek' => 'Cervical lymphangiogram',
          ),
          107 => 
          array (
            'kode' => '87.09',
            'deskripsi_panjang' => 'Other soft tissue x-ray of face, head, and neck',
            'deskripsi_pendek' => 'Head soft tiss x-ray NEC',
          ),
          108 => 
          array (
            'kode' => '87.11',
            'deskripsi_panjang' => 'Full-mouth x-ray of teeth',
            'deskripsi_pendek' => 'Full-mouth x-ray',
          ),
          109 => 
          array (
            'kode' => '87.12',
            'deskripsi_panjang' => 'Other dental x-ray',
            'deskripsi_pendek' => 'Dental x-ray NEC',
          ),
          110 => 
          array (
            'kode' => '87.13',
            'deskripsi_panjang' => 'Temporomandibular contrast arthrogram',
            'deskripsi_pendek' => 'Tm contrast arthrogram',
          ),
          111 => 
          array (
            'kode' => '87.14',
            'deskripsi_panjang' => 'Contrast radiogram of orbit',
            'deskripsi_pendek' => 'Contrast x-ray of orbit',
          ),
          112 => 
          array (
            'kode' => '87.15',
            'deskripsi_panjang' => 'Contrast radiogram of sinus',
            'deskripsi_pendek' => 'Contrast x-ray of sinus',
          ),
          113 => 
          array (
            'kode' => '87.16',
            'deskripsi_panjang' => 'Other x-ray of facial bones',
            'deskripsi_pendek' => 'Facial bone x-ray NEC',
          ),
          114 => 
          array (
            'kode' => '87.17',
            'deskripsi_panjang' => 'Other x-ray of skull',
            'deskripsi_pendek' => 'Skull x-ray NEC',
          ),
          115 => 
          array (
            'kode' => '87.21',
            'deskripsi_panjang' => 'Contrast myelogram',
            'deskripsi_pendek' => 'Contrast myelogram',
          ),
          116 => 
          array (
            'kode' => '87.22',
            'deskripsi_panjang' => 'Other x-ray of cervical spine',
            'deskripsi_pendek' => 'Cervical spine x-ray NEC',
          ),
          117 => 
          array (
            'kode' => '87.23',
            'deskripsi_panjang' => 'Other x-ray of thoracic spine',
            'deskripsi_pendek' => 'Thoracic spine x-ray NEC',
          ),
          118 => 
          array (
            'kode' => '87.24',
            'deskripsi_panjang' => 'Other x-ray of lumbosacral spine',
            'deskripsi_pendek' => 'Lumbosac spine x-ray NEC',
          ),
          119 => 
          array (
            'kode' => '87.29',
            'deskripsi_panjang' => 'Other x-ray of spine',
            'deskripsi_pendek' => 'Spinal x-ray NEC',
          ),
          120 => 
          array (
            'kode' => '87.31',
            'deskripsi_panjang' => 'Endotracheal bronchogram',
            'deskripsi_pendek' => 'Endotracheal bronchogram',
          ),
          121 => 
          array (
            'kode' => '87.32',
            'deskripsi_panjang' => 'Other contrast bronchogram',
            'deskripsi_pendek' => 'Contrast bronchogram NEC',
          ),
          122 => 
          array (
            'kode' => '87.33',
            'deskripsi_panjang' => 'Mediastinal pneumogram',
            'deskripsi_pendek' => 'Mediastinal pneumogram',
          ),
          123 => 
          array (
            'kode' => '87.34',
            'deskripsi_panjang' => 'Intrathoracic lymphangiogram',
            'deskripsi_pendek' => 'Intrathor lymphangiogram',
          ),
          124 => 
          array (
            'kode' => '87.35',
            'deskripsi_panjang' => 'Contrast radiogram of mammary ducts',
            'deskripsi_pendek' => 'Contr mammary ductogram',
          ),
          125 => 
          array (
            'kode' => '87.36',
            'deskripsi_panjang' => 'Xerography of breast',
            'deskripsi_pendek' => 'Breast xerography',
          ),
          126 => 
          array (
            'kode' => '87.37',
            'deskripsi_panjang' => 'Other mammography',
            'deskripsi_pendek' => 'Mammography NEC',
          ),
          127 => 
          array (
            'kode' => '87.38',
            'deskripsi_panjang' => 'Sinogram of chest wall',
            'deskripsi_pendek' => 'Chest wall sinogram',
          ),
          128 => 
          array (
            'kode' => '87.39',
            'deskripsi_panjang' => 'Other soft tissue x-ray of chest wall',
            'deskripsi_pendek' => 'Thorax sft tiss xray NEC',
          ),
          129 => 
          array (
            'kode' => '87.41',
            'deskripsi_panjang' => 'Computerized axial tomography of thorax',
            'deskripsi_pendek' => 'C.A.T. scan of thorax',
          ),
          130 => 
          array (
            'kode' => '87.42',
            'deskripsi_panjang' => 'Other tomography of thorax',
            'deskripsi_pendek' => 'Thoracic tomography NEC',
          ),
          131 => 
          array (
            'kode' => '87.43',
            'deskripsi_panjang' => 'X-ray of ribs, sternum, and clavicle',
            'deskripsi_pendek' => 'Rib/sternum/clavic x-ray',
          ),
          132 => 
          array (
            'kode' => '87.44',
            'deskripsi_panjang' => 'Routine chest x-ray, so described',
            'deskripsi_pendek' => 'Routine chest x-ray',
          ),
          133 => 
          array (
            'kode' => '87.49',
            'deskripsi_panjang' => 'Other chest x-ray',
            'deskripsi_pendek' => 'Chest x-ray NEC',
          ),
          134 => 
          array (
            'kode' => '87.51',
            'deskripsi_panjang' => 'Percutaneous hepatic cholangiogram',
            'deskripsi_pendek' => 'Perc hepat Cholangiogram',
          ),
          135 => 
          array (
            'kode' => '87.52',
            'deskripsi_panjang' => 'Intravenous cholangiogram',
            'deskripsi_pendek' => 'Intraven cholangiogram',
          ),
          136 => 
          array (
            'kode' => '87.53',
            'deskripsi_panjang' => 'Intraoperative cholangiogram',
            'deskripsi_pendek' => 'Intraoper cholangiogram',
          ),
          137 => 
          array (
            'kode' => '87.54',
            'deskripsi_panjang' => 'Other cholangiogram',
            'deskripsi_pendek' => 'Cholangiogram NEC',
          ),
          138 => 
          array (
            'kode' => '87.59',
            'deskripsi_panjang' => 'Other biliary tract x-ray',
            'deskripsi_pendek' => 'Biliary tract x-ray NEC',
          ),
          139 => 
          array (
            'kode' => '87.61',
            'deskripsi_panjang' => 'Barium swallow',
            'deskripsi_pendek' => 'Barium swallow',
          ),
          140 => 
          array (
            'kode' => '87.62',
            'deskripsi_panjang' => 'Upper GI series',
            'deskripsi_pendek' => 'Upper GI series',
          ),
          141 => 
          array (
            'kode' => '87.63',
            'deskripsi_panjang' => 'Small bowel series',
            'deskripsi_pendek' => 'Small bowel series',
          ),
          142 => 
          array (
            'kode' => '87.64',
            'deskripsi_panjang' => 'Lower GI series',
            'deskripsi_pendek' => 'Lower GI series',
          ),
          143 => 
          array (
            'kode' => '87.65',
            'deskripsi_panjang' => 'Other x-ray of intestine',
            'deskripsi_pendek' => 'Intestinal x-ray NEC',
          ),
          144 => 
          array (
            'kode' => '87.66',
            'deskripsi_panjang' => 'Contrast pancreatogram',
            'deskripsi_pendek' => 'Contrast pancreatogram',
          ),
          145 => 
          array (
            'kode' => '87.69',
            'deskripsi_panjang' => 'Other digestive tract x-ray',
            'deskripsi_pendek' => 'Digestive tract xray NEC',
          ),
          146 => 
          array (
            'kode' => '87.71',
            'deskripsi_panjang' => 'Computerized axial tomography of kidney',
            'deskripsi_pendek' => 'C.A.T. scan of kidney',
          ),
          147 => 
          array (
            'kode' => '87.72',
            'deskripsi_panjang' => 'Other nephrotomogram',
            'deskripsi_pendek' => 'Nephrotomogram NEC',
          ),
          148 => 
          array (
            'kode' => '87.73',
            'deskripsi_panjang' => 'Intravenous pyelogram',
            'deskripsi_pendek' => 'Intravenous pyelogram',
          ),
          149 => 
          array (
            'kode' => '87.74',
            'deskripsi_panjang' => 'Retrograde pyelogram',
            'deskripsi_pendek' => 'Retrograde pyelogram',
          ),
          150 => 
          array (
            'kode' => '87.75',
            'deskripsi_panjang' => 'Percutaneous pyelogram',
            'deskripsi_pendek' => 'Percutaneous pyelogram',
          ),
          151 => 
          array (
            'kode' => '87.76',
            'deskripsi_panjang' => 'Retrograde cystourethrogram',
            'deskripsi_pendek' => 'Retrogr cystourethrogram',
          ),
          152 => 
          array (
            'kode' => '87.77',
            'deskripsi_panjang' => 'Other cystogram',
            'deskripsi_pendek' => 'Cystogram NEC',
          ),
          153 => 
          array (
            'kode' => '87.78',
            'deskripsi_panjang' => 'Ileal conduitogram',
            'deskripsi_pendek' => 'Ileal conduitogram',
          ),
          154 => 
          array (
            'kode' => '87.79',
            'deskripsi_panjang' => 'Other x-ray of the urinary system',
            'deskripsi_pendek' => 'Urinary system x-ray NEC',
          ),
          155 => 
          array (
            'kode' => '87.81',
            'deskripsi_panjang' => 'X-ray of gravid uterus',
            'deskripsi_pendek' => 'X-ray of gravid uterus',
          ),
          156 => 
          array (
            'kode' => '87.82',
            'deskripsi_panjang' => 'Gas contrast hysterosalpingogram',
            'deskripsi_pendek' => 'Gas hysterosalpingogram',
          ),
          157 => 
          array (
            'kode' => '87.83',
            'deskripsi_panjang' => 'Opaque dye contrast hysterosalpingogram',
            'deskripsi_pendek' => 'Dye hysterosalpingogram',
          ),
          158 => 
          array (
            'kode' => '87.84',
            'deskripsi_panjang' => 'Percutaneous hysterogram',
            'deskripsi_pendek' => 'Percutaneous hysterogram',
          ),
          159 => 
          array (
            'kode' => '87.85',
            'deskripsi_panjang' => 'Other x-ray of fallopian tubes and uterus',
            'deskripsi_pendek' => 'Tube & uterus x-ray NEC',
          ),
          160 => 
          array (
            'kode' => '87.89',
            'deskripsi_panjang' => 'Other x-ray of female genital organs',
            'deskripsi_pendek' => 'Female genital x-ray NEC',
          ),
          161 => 
          array (
            'kode' => '87.91',
            'deskripsi_panjang' => 'Contrast seminal vesiculogram',
            'deskripsi_pendek' => 'Contr semin vesiculogram',
          ),
          162 => 
          array (
            'kode' => '87.92',
            'deskripsi_panjang' => 'Other x-ray of prostate and seminal vesicles',
            'deskripsi_pendek' => 'Prostat/sem ves xray NEC',
          ),
          163 => 
          array (
            'kode' => '87.93',
            'deskripsi_panjang' => 'Contrast epididymogram',
            'deskripsi_pendek' => 'Contrast epididymogram',
          ),
          164 => 
          array (
            'kode' => '87.94',
            'deskripsi_panjang' => 'Contrast vasogram',
            'deskripsi_pendek' => 'Contrast vasogram',
          ),
          165 => 
          array (
            'kode' => '87.95',
            'deskripsi_panjang' => 'Other x-ray of epididymis and vas deferens',
            'deskripsi_pendek' => 'Epididymis/vas x-ray NEC',
          ),
          166 => 
          array (
            'kode' => '87.99',
            'deskripsi_panjang' => 'Other x-ray of male genital organs',
            'deskripsi_pendek' => 'Male genital x-ray NEC',
          ),
          167 => 
          array (
            'kode' => '88.01',
            'deskripsi_panjang' => 'Computerized axial tomography of abdomen',
            'deskripsi_pendek' => 'C.A.T. scan of abdomen',
          ),
          168 => 
          array (
            'kode' => '88.02',
            'deskripsi_panjang' => 'Other abdomen tomography',
            'deskripsi_pendek' => 'Abdominal tomography NEC',
          ),
          169 => 
          array (
            'kode' => '88.03',
            'deskripsi_panjang' => 'Sinogram of abdominal wall',
            'deskripsi_pendek' => 'Abdominal wall sinogram',
          ),
          170 => 
          array (
            'kode' => '88.04',
            'deskripsi_panjang' => 'Abdominal lymphangiogram',
            'deskripsi_pendek' => 'Abdominal lymphangiogram',
          ),
          171 => 
          array (
            'kode' => '88.09',
            'deskripsi_panjang' => 'Other soft tissue x-ray of abdominal wall',
            'deskripsi_pendek' => 'Abdominal wall x-ray NEC',
          ),
          172 => 
          array (
            'kode' => '88.11',
            'deskripsi_panjang' => 'Pelvic opaque dye contrast radiography',
            'deskripsi_pendek' => 'Pelvic dye contrast xray',
          ),
          173 => 
          array (
            'kode' => '88.12',
            'deskripsi_panjang' => 'Pelvic gas contrast radiography',
            'deskripsi_pendek' => 'Pelvic gas contrast xray',
          ),
          174 => 
          array (
            'kode' => '88.13',
            'deskripsi_panjang' => 'Other peritoneal pneumogram',
            'deskripsi_pendek' => 'Periton pneumogram NEC',
          ),
          175 => 
          array (
            'kode' => '88.14',
            'deskripsi_panjang' => 'Retroperitoneal fistulogram',
            'deskripsi_pendek' => 'Retroperiton fistulogram',
          ),
          176 => 
          array (
            'kode' => '88.15',
            'deskripsi_panjang' => 'Retroperitoneal pneumogram',
            'deskripsi_pendek' => 'Retroperiton pneumogram',
          ),
          177 => 
          array (
            'kode' => '88.16',
            'deskripsi_panjang' => 'Other retroperitoneal x-ray',
            'deskripsi_pendek' => 'Retroperitoneal xray NEC',
          ),
          178 => 
          array (
            'kode' => '88.19',
            'deskripsi_panjang' => 'Other x-ray of abdomen',
            'deskripsi_pendek' => 'Abdominal x-ray NEC',
          ),
          179 => 
          array (
            'kode' => '88.21',
            'deskripsi_panjang' => 'Skeletal x-ray of shoulder and upper arm',
            'deskripsi_pendek' => 'Skl xray-shoulder/up arm',
          ),
          180 => 
          array (
            'kode' => '88.22',
            'deskripsi_panjang' => 'Skeletal x-ray of elbow and forearm',
            'deskripsi_pendek' => 'Skel xray-elbow/forearm',
          ),
          181 => 
          array (
            'kode' => '88.23',
            'deskripsi_panjang' => 'Skeletal x-ray of wrist and hand',
            'deskripsi_pendek' => 'Skel xray-wrist & hand',
          ),
          182 => 
          array (
            'kode' => '88.24',
            'deskripsi_panjang' => 'Skeletal x-ray of upper limb, not otherwise specified',
            'deskripsi_pendek' => 'Skel xray-upper limb NOS',
          ),
          183 => 
          array (
            'kode' => '88.25',
            'deskripsi_panjang' => 'Pelvimetry',
            'deskripsi_pendek' => 'Pelvimetry',
          ),
          184 => 
          array (
            'kode' => '88.26',
            'deskripsi_panjang' => 'Other skeletal x-ray of pelvis and hip',
            'deskripsi_pendek' => 'Skel xray-pelvis/hip NEC',
          ),
          185 => 
          array (
            'kode' => '88.27',
            'deskripsi_panjang' => 'Skeletal x-ray of thigh, knee, and lower leg',
            'deskripsi_pendek' => 'Skel xray-thigh/knee/leg',
          ),
          186 => 
          array (
            'kode' => '88.28',
            'deskripsi_panjang' => 'Skeletal x-ray of ankle and foot',
            'deskripsi_pendek' => 'Skel xray-ankle & foot',
          ),
          187 => 
          array (
            'kode' => '88.29',
            'deskripsi_panjang' => 'Skeletal x-ray of lower limb, not otherwise specified',
            'deskripsi_pendek' => 'Skel xray-lower limb NOS',
          ),
          188 => 
          array (
            'kode' => '88.31',
            'deskripsi_panjang' => 'Skeletal series',
            'deskripsi_pendek' => 'Skeletal series x-ray',
          ),
          189 => 
          array (
            'kode' => '88.32',
            'deskripsi_panjang' => 'Contrast arthrogram',
            'deskripsi_pendek' => 'Contrast arthrogram',
          ),
          190 => 
          array (
            'kode' => '88.33',
            'deskripsi_panjang' => 'Other skeletal x-ray',
            'deskripsi_pendek' => 'Other skeletal x-ray',
          ),
          191 => 
          array (
            'kode' => '88.34',
            'deskripsi_panjang' => 'Lymphangiogram of upper limb',
            'deskripsi_pendek' => 'Upper limb lymphangiogrm',
          ),
          192 => 
          array (
            'kode' => '88.35',
            'deskripsi_panjang' => 'Other soft tissue x-ray of upper limb',
            'deskripsi_pendek' => 'Up limb sft tis xray NEC',
          ),
          193 => 
          array (
            'kode' => '88.36',
            'deskripsi_panjang' => 'Lymphangiogram of lower limb',
            'deskripsi_pendek' => 'Lower limb lymphangiogrm',
          ),
          194 => 
          array (
            'kode' => '88.37',
            'deskripsi_panjang' => 'Other soft tissue x-ray of lower limb',
            'deskripsi_pendek' => 'Lo limb sft tis xray NEC',
          ),
          195 => 
          array (
            'kode' => '88.38',
            'deskripsi_panjang' => 'Other computerized axial tomography',
            'deskripsi_pendek' => 'Other C.A.T. scan',
          ),
          196 => 
          array (
            'kode' => '88.39',
            'deskripsi_panjang' => 'X-ray, other and unspecified',
            'deskripsi_pendek' => 'X-ray NEC and NOS',
          ),
          197 => 
          array (
            'kode' => '88.40',
            'deskripsi_panjang' => 'Arteriography using contrast material, unspecified site',
            'deskripsi_pendek' => 'Contrast arteriogram NOS',
          ),
          198 => 
          array (
            'kode' => '88.41',
            'deskripsi_panjang' => 'Arteriography of cerebral arteries',
            'deskripsi_pendek' => 'Contr cerebr arteriogram',
          ),
          199 => 
          array (
            'kode' => '88.42',
            'deskripsi_panjang' => 'Aortography',
            'deskripsi_pendek' => 'Contrast aortogram',
          ),
          200 => 
          array (
            'kode' => '88.43',
            'deskripsi_panjang' => 'Arteriography of pulmonary arteries',
            'deskripsi_pendek' => 'Contr pulmon arteriogram',
          ),
          201 => 
          array (
            'kode' => '88.44',
            'deskripsi_panjang' => 'Arteriography of other intrathoracic vessels',
            'deskripsi_pendek' => 'Contr thor arteriogr NEC',
          ),
          202 => 
          array (
            'kode' => '88.45',
            'deskripsi_panjang' => 'Arteriography of renal arteries',
            'deskripsi_pendek' => 'Contrast renal arteriogr',
          ),
          203 => 
          array (
            'kode' => '88.46',
            'deskripsi_panjang' => 'Arteriography of placenta',
            'deskripsi_pendek' => 'Contrast placentogram',
          ),
          204 => 
          array (
            'kode' => '88.47',
            'deskripsi_panjang' => 'Arteriography of other intra-abdominal arteries',
            'deskripsi_pendek' => 'Contr abd arteriogrm NEC',
          ),
          205 => 
          array (
            'kode' => '88.48',
            'deskripsi_panjang' => 'Arteriography of femoral and other lower extremity arteries',
            'deskripsi_pendek' => 'Contrast arteriogram-leg',
          ),
          206 => 
          array (
            'kode' => '88.49',
            'deskripsi_panjang' => 'Arteriography of other specified sites',
            'deskripsi_pendek' => 'Contrast arteriogram NEC',
          ),
          207 => 
          array (
            'kode' => '88.50',
            'deskripsi_panjang' => 'Angiocardiography, not otherwise specified',
            'deskripsi_pendek' => 'Angiocardiography NOS',
          ),
          208 => 
          array (
            'kode' => '88.51',
            'deskripsi_panjang' => 'Angiocardiography of venae cavae',
            'deskripsi_pendek' => 'Vena cav angiocardiogram',
          ),
          209 => 
          array (
            'kode' => '88.52',
            'deskripsi_panjang' => 'Angiocardiography of right heart structures',
            'deskripsi_pendek' => 'Rt heart angiocardiogram',
          ),
          210 => 
          array (
            'kode' => '88.53',
            'deskripsi_panjang' => 'Angiocardiography of left heart structures',
            'deskripsi_pendek' => 'Lt heart angiocardiogram',
          ),
          211 => 
          array (
            'kode' => '88.54',
            'deskripsi_panjang' => 'Combined right and left heart angiocardiography',
            'deskripsi_pendek' => 'Rt & lt heart angiocard',
          ),
          212 => 
          array (
            'kode' => '88.55',
            'deskripsi_panjang' => 'Coronary arteriography using a single catheter',
            'deskripsi_pendek' => 'Coronar arteriogr-1 cath',
          ),
          213 => 
          array (
            'kode' => '88.56',
            'deskripsi_panjang' => 'Coronary arteriography using two catheters',
            'deskripsi_pendek' => 'Coronar arteriogr-2 cath',
          ),
          214 => 
          array (
            'kode' => '88.57',
            'deskripsi_panjang' => 'Other and unspecified coronary arteriography',
            'deskripsi_pendek' => 'Coronary arteriogram NEC',
          ),
          215 => 
          array (
            'kode' => '88.58',
            'deskripsi_panjang' => 'Negative-contrast cardiac roentgenography',
            'deskripsi_pendek' => 'Negatve-contr cardiogram',
          ),
          216 => 
          array (
            'kode' => '88.59',
            'deskripsi_panjang' => 'Intra-operative coronary fluorescence vascular angiography',
            'deskripsi_pendek' => 'Intraop cor flr vas angi',
          ),
          217 => 
          array (
            'kode' => '88.60',
            'deskripsi_panjang' => 'Phlebography using contrast material, unspecified site',
            'deskripsi_pendek' => 'Contrast phlebogram NOS',
          ),
          218 => 
          array (
            'kode' => '88.61',
            'deskripsi_panjang' => 'Phlebography of veins of head and neck using contrast material',
            'deskripsi_pendek' => 'Contr phlebogram-hd/neck',
          ),
          219 => 
          array (
            'kode' => '88.62',
            'deskripsi_panjang' => 'Phlebography of pulmonary veins using contrast material',
            'deskripsi_pendek' => 'Contr phlebogram-pulmon',
          ),
          220 => 
          array (
            'kode' => '88.63',
            'deskripsi_panjang' => 'Phlebography of other intrathoracic veins using contrast material',
            'deskripsi_pendek' => 'Thorac contr phlebog NEC',
          ),
          221 => 
          array (
            'kode' => '88.64',
            'deskripsi_panjang' => 'Phlebography of the portal venous system using contrast material',
            'deskripsi_pendek' => 'Portal contr phlebogram',
          ),
          222 => 
          array (
            'kode' => '88.65',
            'deskripsi_panjang' => 'Phlebography of other Intra-Abdominal veins using contrast material',
            'deskripsi_pendek' => 'Abd contr phlebogram NEC',
          ),
          223 => 
          array (
            'kode' => '88.66',
            'deskripsi_panjang' => 'Phlebography of femoral and other lower extremity veins using contrast material',
            'deskripsi_pendek' => 'Contrast phlebogram-leg',
          ),
          224 => 
          array (
            'kode' => '88.67',
            'deskripsi_panjang' => 'Phlebography of other specified sites using contrast material',
            'deskripsi_pendek' => 'Contrast phlebogram NEC',
          ),
          225 => 
          array (
            'kode' => '88.68',
            'deskripsi_panjang' => 'Impedance phlebography',
            'deskripsi_pendek' => 'Impedance phlebogram',
          ),
          226 => 
          array (
            'kode' => '88.71',
            'deskripsi_panjang' => 'Diagnostic ultrasound of head and neck',
            'deskripsi_pendek' => 'Dx ultrasound-head/neck',
          ),
          227 => 
          array (
            'kode' => '88.72',
            'deskripsi_panjang' => 'Diagnostic ultrasound of heart',
            'deskripsi_pendek' => 'Dx ultrasound-heart',
          ),
          228 => 
          array (
            'kode' => '88.73',
            'deskripsi_panjang' => 'Diagnostic ultrasound of other sites of thorax',
            'deskripsi_pendek' => 'Dx ultrasound-thorax NEC',
          ),
          229 => 
          array (
            'kode' => '88.74',
            'deskripsi_panjang' => 'Diagnostic ultrasound of digestive system',
            'deskripsi_pendek' => 'Dx ultrasound-digestive',
          ),
          230 => 
          array (
            'kode' => '88.75',
            'deskripsi_panjang' => 'Diagnostic ultrasound of urinary system',
            'deskripsi_pendek' => 'Dx ultrasound-urinary',
          ),
          231 => 
          array (
            'kode' => '88.76',
            'deskripsi_panjang' => 'Diagnostic ultrasound of abdomen and retroperitoneum',
            'deskripsi_pendek' => 'Dx ultrasound-abdomen',
          ),
          232 => 
          array (
            'kode' => '88.77',
            'deskripsi_panjang' => 'Diagnostic ultrasound of peripheral vascular system',
            'deskripsi_pendek' => 'Dx ultrasound-vascular',
          ),
          233 => 
          array (
            'kode' => '88.78',
            'deskripsi_panjang' => 'Diagnostic ultrasound of gravid uterus',
            'deskripsi_pendek' => 'Dx ultrasound-grav uter',
          ),
          234 => 
          array (
            'kode' => '88.79',
            'deskripsi_panjang' => 'Other diagnostic ultrasound',
            'deskripsi_pendek' => 'Dx ultrasound NEC',
          ),
          235 => 
          array (
            'kode' => '88.81',
            'deskripsi_panjang' => 'Cerebral thermography',
            'deskripsi_pendek' => 'Cerebral thermography',
          ),
          236 => 
          array (
            'kode' => '88.82',
            'deskripsi_panjang' => 'Ocular thermography',
            'deskripsi_pendek' => 'Ocular thermography',
          ),
          237 => 
          array (
            'kode' => '88.83',
            'deskripsi_panjang' => 'Bone thermography',
            'deskripsi_pendek' => 'Bone thermography',
          ),
          238 => 
          array (
            'kode' => '88.84',
            'deskripsi_panjang' => 'Muscle thermography',
            'deskripsi_pendek' => 'Muscle thermography',
          ),
          239 => 
          array (
            'kode' => '88.85',
            'deskripsi_panjang' => 'Breast thermography',
            'deskripsi_pendek' => 'Breast thermography',
          ),
          240 => 
          array (
            'kode' => '88.86',
            'deskripsi_panjang' => 'Blood vessel thermography',
            'deskripsi_pendek' => 'Blood vessel thermograph',
          ),
          241 => 
          array (
            'kode' => '88.89',
            'deskripsi_panjang' => 'Thermography of other sites',
            'deskripsi_pendek' => 'Thermography NEC',
          ),
          242 => 
          array (
            'kode' => '88.90',
            'deskripsi_panjang' => 'Diagnostic imaging, not elsewhere classified',
            'deskripsi_pendek' => 'Diagnostic imaging NOS',
          ),
          243 => 
          array (
            'kode' => '88.91',
            'deskripsi_panjang' => 'Magnetic resonance imaging of brain and brain stem',
            'deskripsi_pendek' => 'Mri of brain & brainstem',
          ),
          244 => 
          array (
            'kode' => '88.92',
            'deskripsi_panjang' => 'Magnetic resonance imaging of chest and myocardium',
            'deskripsi_pendek' => 'Mri chest & heart',
          ),
          245 => 
          array (
            'kode' => '88.93',
            'deskripsi_panjang' => 'Magnetic resonance imaging of spinal canal',
            'deskripsi_pendek' => 'Mri spinal canal',
          ),
          246 => 
          array (
            'kode' => '88.94',
            'deskripsi_panjang' => 'Magnetic resonance imaging of musculoskeletal',
            'deskripsi_pendek' => 'Mri musculoskeletal',
          ),
          247 => 
          array (
            'kode' => '88.95',
            'deskripsi_panjang' => 'Magnetic resonance imaging of pelvis, prostate, and bladder',
            'deskripsi_pendek' => 'Mri pelvis,prostate,blad',
          ),
          248 => 
          array (
            'kode' => '88.96',
            'deskripsi_panjang' => 'Other intraoperative magnetic resonance imaging',
            'deskripsi_pendek' => 'Oth intraop mag res imag',
          ),
          249 => 
          array (
            'kode' => '88.97',
            'deskripsi_panjang' => 'Magnetic resonance imaging of other and unspecified sites',
            'deskripsi_pendek' => 'Magnetic res image unsp',
          ),
          250 => 
          array (
            'kode' => '88.98',
            'deskripsi_panjang' => 'Bone mineral density studies',
            'deskripsi_pendek' => 'Bone mineral density',
          ),
          251 => 
          array (
            'kode' => '89.01',
            'deskripsi_panjang' => 'Interview and evaluation, described as brief',
            'deskripsi_pendek' => 'Brief interview & evalua',
          ),
          252 => 
          array (
            'kode' => '89.02',
            'deskripsi_panjang' => 'Interview and evaluation, described as limited',
            'deskripsi_pendek' => 'Limited interview/evalua',
          ),
          253 => 
          array (
            'kode' => '89.03',
            'deskripsi_panjang' => 'Interview and evaluation, described as comprehensive',
            'deskripsi_pendek' => 'Comprehen interview/eval',
          ),
          254 => 
          array (
            'kode' => '89.04',
            'deskripsi_panjang' => 'Other interview and evaluation',
            'deskripsi_pendek' => 'Interview & evaluat NEC',
          ),
          255 => 
          array (
            'kode' => '89.05',
            'deskripsi_panjang' => 'Diagnostic interview and evaluation, not otherwise specified',
            'deskripsi_pendek' => 'Interview & evaluat NOS',
          ),
          256 => 
          array (
            'kode' => '89.06',
            'deskripsi_panjang' => 'Consultation, described as limited',
            'deskripsi_pendek' => 'Limited consultation',
          ),
          257 => 
          array (
            'kode' => '89.07',
            'deskripsi_panjang' => 'Consultation, described as comprehensive',
            'deskripsi_pendek' => 'Comprehensive consultat',
          ),
          258 => 
          array (
            'kode' => '89.08',
            'deskripsi_panjang' => 'Other consultation',
            'deskripsi_pendek' => 'Consultation NEC',
          ),
          259 => 
          array (
            'kode' => '89.09',
            'deskripsi_panjang' => 'Consultation, not otherwise specified',
            'deskripsi_pendek' => 'Consultation NOS',
          ),
          260 => 
          array (
            'kode' => '89.10',
            'deskripsi_panjang' => 'Intracarotid amobarbital test',
            'deskripsi_pendek' => 'Intracarot amobarb test',
          ),
          261 => 
          array (
            'kode' => '89.11',
            'deskripsi_panjang' => 'Tonometry',
            'deskripsi_pendek' => 'Tonometry',
          ),
          262 => 
          array (
            'kode' => '89.12',
            'deskripsi_panjang' => 'Nasal function study',
            'deskripsi_pendek' => 'Nasal function study',
          ),
          263 => 
          array (
            'kode' => '89.13',
            'deskripsi_panjang' => 'Neurologic examination',
            'deskripsi_pendek' => 'Neurologic examination',
          ),
          264 => 
          array (
            'kode' => '89.14',
            'deskripsi_panjang' => 'Electroencephalogram',
            'deskripsi_pendek' => 'Electroencephalogram',
          ),
          265 => 
          array (
            'kode' => '89.15',
            'deskripsi_panjang' => 'Other nonoperative neurologic function tests',
            'deskripsi_pendek' => 'Neurologic func test NEC',
          ),
          266 => 
          array (
            'kode' => '89.16',
            'deskripsi_panjang' => 'Transillumination of newborn skull',
            'deskripsi_pendek' => 'Skull transilluminat',
          ),
          267 => 
          array (
            'kode' => '89.17',
            'deskripsi_panjang' => 'Polysomnogram',
            'deskripsi_pendek' => 'Polysomnogram',
          ),
          268 => 
          array (
            'kode' => '89.18',
            'deskripsi_panjang' => 'Other sleep disorder function tests',
            'deskripsi_pendek' => 'Oth sleep dis funct test',
          ),
          269 => 
          array (
            'kode' => '89.19',
            'deskripsi_panjang' => 'Video and radio-telemetered electroencephalographic monitoring',
            'deskripsi_pendek' => 'Video/radio eeg monitor',
          ),
          270 => 
          array (
            'kode' => '89.21',
            'deskripsi_panjang' => 'Urinary manometry',
            'deskripsi_pendek' => 'Urinary manometry',
          ),
          271 => 
          array (
            'kode' => '89.22',
            'deskripsi_panjang' => 'Cystometrogram',
            'deskripsi_pendek' => 'Cystometrogram',
          ),
          272 => 
          array (
            'kode' => '89.23',
            'deskripsi_panjang' => 'Urethral sphincter electromyogram',
            'deskripsi_pendek' => 'Urethral sphincter emg',
          ),
          273 => 
          array (
            'kode' => '89.24',
            'deskripsi_panjang' => 'Uroflowmetry [UFR]',
            'deskripsi_pendek' => 'Uroflowmetry',
          ),
          274 => 
          array (
            'kode' => '89.25',
            'deskripsi_panjang' => 'Urethral pressure profile [UPP]',
            'deskripsi_pendek' => 'Urethral pressure profil',
          ),
          275 => 
          array (
            'kode' => '89.26',
            'deskripsi_panjang' => 'Gynecological examination',
            'deskripsi_pendek' => 'Gynecologic examination',
          ),
          276 => 
          array (
            'kode' => '89.29',
            'deskripsi_panjang' => 'Other nonoperative genitourinary system measurements',
            'deskripsi_pendek' => 'Other gu system exams',
          ),
          277 => 
          array (
            'kode' => '89.31',
            'deskripsi_panjang' => 'Dental examination',
            'deskripsi_pendek' => 'Dental examination',
          ),
          278 => 
          array (
            'kode' => '89.32',
            'deskripsi_panjang' => 'Esophageal manometry',
            'deskripsi_pendek' => 'Esophageal manometry',
          ),
          279 => 
          array (
            'kode' => '89.33',
            'deskripsi_panjang' => 'Digital examination of enterostomy stoma',
            'deskripsi_pendek' => 'Digital enterostomy exam',
          ),
          280 => 
          array (
            'kode' => '89.34',
            'deskripsi_panjang' => 'Digital examination of rectum',
            'deskripsi_pendek' => 'Digital rectal exam',
          ),
          281 => 
          array (
            'kode' => '89.35',
            'deskripsi_panjang' => 'Transillumination of nasal sinuses',
            'deskripsi_pendek' => 'Nasal sinus transillumin',
          ),
          282 => 
          array (
            'kode' => '89.36',
            'deskripsi_panjang' => 'Manual examination of breast',
            'deskripsi_pendek' => 'Manual exam of breast',
          ),
          283 => 
          array (
            'kode' => '89.37',
            'deskripsi_panjang' => 'Vital capacity determination',
            'deskripsi_pendek' => 'Vital capacity determin',
          ),
          284 => 
          array (
            'kode' => '89.38',
            'deskripsi_panjang' => 'Other nonoperative respiratory measurements',
            'deskripsi_pendek' => 'Respiratory measure NEC',
          ),
          285 => 
          array (
            'kode' => '89.39',
            'deskripsi_panjang' => 'Other nonoperative measurements and examinations',
            'deskripsi_pendek' => 'Nonoperative exams NEC',
          ),
          286 => 
          array (
            'kode' => '89.41',
            'deskripsi_panjang' => 'Cardiovascular stress test using treadmill',
            'deskripsi_pendek' => 'Treadmill stress test',
          ),
          287 => 
          array (
            'kode' => '89.42',
            'deskripsi_panjang' => 'Masters two-step stress test',
            'deskripsi_pendek' => 'Masters 2-step test',
          ),
          288 => 
          array (
            'kode' => '89.43',
            'deskripsi_panjang' => 'Cardiovascular stress test using bicycle ergometer',
            'deskripsi_pendek' => 'Bicycle ergometer test',
          ),
          289 => 
          array (
            'kode' => '89.44',
            'deskripsi_panjang' => 'Other cardiovascular stress test',
            'deskripsi_pendek' => 'Cardiac stress test NEC',
          ),
          290 => 
          array (
            'kode' => '89.45',
            'deskripsi_panjang' => 'Artificial pacemaker rate check',
            'deskripsi_pendek' => 'Pacemaker rate check',
          ),
          291 => 
          array (
            'kode' => '89.46',
            'deskripsi_panjang' => 'Artificial pacemaker artifact wave form check',
            'deskripsi_pendek' => 'Pacemaker wave form chck',
          ),
          292 => 
          array (
            'kode' => '89.47',
            'deskripsi_panjang' => 'Artificial pacemaker electrode impedance check',
            'deskripsi_pendek' => 'Pacemaker impedance chck',
          ),
          293 => 
          array (
            'kode' => '89.48',
            'deskripsi_panjang' => 'Artificial pacemaker voltage or amperage threshold check',
            'deskripsi_pendek' => 'Pacemaker volt threshold',
          ),
          294 => 
          array (
            'kode' => '89.49',
            'deskripsi_panjang' => 'Automatic implantable cardioverter/defibrillator (AICD) check',
            'deskripsi_pendek' => 'AICD check',
          ),
          295 => 
          array (
            'kode' => '89.50',
            'deskripsi_panjang' => 'Ambulatory cardiac monitoring',
            'deskripsi_pendek' => 'Ambu cardiac monitoring',
          ),
          296 => 
          array (
            'kode' => '89.51',
            'deskripsi_panjang' => 'Rhythm electrocardiogram',
            'deskripsi_pendek' => 'Rhythm electrocardiogram',
          ),
          297 => 
          array (
            'kode' => '89.52',
            'deskripsi_panjang' => 'Electrocardiogram',
            'deskripsi_pendek' => 'Electrocardiogram',
          ),
          298 => 
          array (
            'kode' => '89.53',
            'deskripsi_panjang' => 'Vectorcardiogram (with ECG)',
            'deskripsi_pendek' => 'Vectorcardiogram',
          ),
          299 => 
          array (
            'kode' => '89.54',
            'deskripsi_panjang' => 'Electrographic monitoring',
            'deskripsi_pendek' => 'Electrocardiograph monit',
          ),
          300 => 
          array (
            'kode' => '89.55',
            'deskripsi_panjang' => 'Phonocardiogram with ECG lead',
            'deskripsi_pendek' => 'Phonocardiogram',
          ),
          301 => 
          array (
            'kode' => '89.56',
            'deskripsi_panjang' => 'Carotid pulse tracing with ECG lead',
            'deskripsi_pendek' => 'Carotid pulse tracing',
          ),
          302 => 
          array (
            'kode' => '89.57',
            'deskripsi_panjang' => 'Apexcardiogram (with ECG lead)',
            'deskripsi_pendek' => 'Apexcardiogram',
          ),
          303 => 
          array (
            'kode' => '89.58',
            'deskripsi_panjang' => 'Plethysmogram',
            'deskripsi_pendek' => 'Plethysmogram',
          ),
          304 => 
          array (
            'kode' => '89.59',
            'deskripsi_panjang' => 'Other nonoperative cardiac and vascular measurements',
            'deskripsi_pendek' => 'Nonop cardiac/vasc exam',
          ),
          305 => 
          array (
            'kode' => '89.60',
            'deskripsi_panjang' => 'Continuous intra-arterial blood gas monitoring',
            'deskripsi_pendek' => 'Cnt intraart bld gas mon',
          ),
          306 => 
          array (
            'kode' => '89.61',
            'deskripsi_panjang' => 'Systemic arterial pressure monitoring',
            'deskripsi_pendek' => 'Arterial pressure monit',
          ),
          307 => 
          array (
            'kode' => '89.62',
            'deskripsi_panjang' => 'Central venous pressure monitoring',
            'deskripsi_pendek' => 'Cvp monitoring',
          ),
          308 => 
          array (
            'kode' => '89.63',
            'deskripsi_panjang' => 'Pulmonary artery pressure monitoring',
            'deskripsi_pendek' => 'Pulmon art press monitor',
          ),
          309 => 
          array (
            'kode' => '89.64',
            'deskripsi_panjang' => 'Pulmonary artery wedge monitoring',
            'deskripsi_pendek' => 'Pulmon art wedge monitor',
          ),
          310 => 
          array (
            'kode' => '89.65',
            'deskripsi_panjang' => 'Measurement of systemic arterial blood gases',
            'deskripsi_pendek' => 'Arterial bld gas measure',
          ),
          311 => 
          array (
            'kode' => '89.66',
            'deskripsi_panjang' => 'Measurement of mixed venous blood gases',
            'deskripsi_pendek' => 'Mix venous bld gas meas',
          ),
          312 => 
          array (
            'kode' => '89.67',
            'deskripsi_panjang' => 'Monitoring of cardiac output by oxygen consumption technique',
            'deskripsi_pendek' => 'Oxygen consumption monit',
          ),
          313 => 
          array (
            'kode' => '89.68',
            'deskripsi_panjang' => 'Monitoring of cardiac output by other technique',
            'deskripsi_pendek' => 'Oth cardiac mon output',
          ),
          314 => 
          array (
            'kode' => '89.69',
            'deskripsi_panjang' => 'Monitoring of coronary blood flow',
            'deskripsi_pendek' => 'Coronary bld flow monit',
          ),
          315 => 
          array (
            'kode' => '89.7',
            'deskripsi_panjang' => 'General physical examination',
            'deskripsi_pendek' => 'General physical exam',
          ),
          316 => 
          array (
            'kode' => '89.8',
            'deskripsi_panjang' => 'Autopsy',
            'deskripsi_pendek' => 'Autopsy',
          ),
          317 => 
          array (
            'kode' => '90.01',
            'deskripsi_panjang' => 'Microscopic examination of specimen from nervous system and of spinal fluid, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-nervous syst',
          ),
          318 => 
          array (
            'kode' => '90.02',
            'deskripsi_panjang' => 'Microscopic examination of specimen from nervous system and of spinal fluid, culture',
            'deskripsi_pendek' => 'Culture-nervous syst',
          ),
          319 => 
          array (
            'kode' => '90.03',
            'deskripsi_panjang' => 'Microscopic examination of specimen from nervous system and of spinal fluid, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-nervous syst',
          ),
          320 => 
          array (
            'kode' => '90.04',
            'deskripsi_panjang' => 'Microscopic examination of specimen from nervous system and of spinal fluid, parasitology',
            'deskripsi_pendek' => 'Parasitology-nerv syst',
          ),
          321 => 
          array (
            'kode' => '90.05',
            'deskripsi_panjang' => 'Microscopic examination of specimen from nervous system and of spinal fluid, toxicology',
            'deskripsi_pendek' => 'Toxicology-nervous syst',
          ),
          322 => 
          array (
            'kode' => '90.06',
            'deskripsi_panjang' => 'Microscopic examination of specimen from nervous system and of spinal fluid, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-nervous sys',
          ),
          323 => 
          array (
            'kode' => '90.09',
            'deskripsi_panjang' => 'Microscopic examination of specimen from nervous system and of spinal fluid, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-nervous NEC',
          ),
          324 => 
          array (
            'kode' => '90.11',
            'deskripsi_panjang' => 'Microscopic examination of specimen from endocrine gland, not elsewhere classified, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-endocrine',
          ),
          325 => 
          array (
            'kode' => '90.12',
            'deskripsi_panjang' => 'Microscopic examination of specimen from endocrine gland, not elsewhere classified, culture',
            'deskripsi_pendek' => 'Culture-endocrine',
          ),
          326 => 
          array (
            'kode' => '90.13',
            'deskripsi_panjang' => 'Microscopic examination of specimen from endocrine gland, not elsewhere classified, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-endocrine',
          ),
          327 => 
          array (
            'kode' => '90.14',
            'deskripsi_panjang' => 'Microscopic examination of specimen from endocrine gland, not elsewhere classified, parasitology',
            'deskripsi_pendek' => 'Parasitology-endocrine',
          ),
          328 => 
          array (
            'kode' => '90.15',
            'deskripsi_panjang' => 'Microscopic examination of specimen from endocrine gland, not elsewhere classified, toxicology',
            'deskripsi_pendek' => 'Toxicology-endocrine',
          ),
          329 => 
          array (
            'kode' => '90.16',
            'deskripsi_panjang' => 'Microscopic examination of specimen from endocrine gland, not elsewhere classified, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell block/pap-endocrine',
          ),
          330 => 
          array (
            'kode' => '90.19',
            'deskripsi_panjang' => 'Microscopic examination of specimen from endocrine gland, not elsewhere classified, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-endocrine NEC',
          ),
          331 => 
          array (
            'kode' => '90.21',
            'deskripsi_panjang' => 'Microscopic examination of specimen from eye, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-eye',
          ),
          332 => 
          array (
            'kode' => '90.22',
            'deskripsi_panjang' => 'Microscopic examination of specimen from eye, culture',
            'deskripsi_pendek' => 'Culture-eye',
          ),
          333 => 
          array (
            'kode' => '90.23',
            'deskripsi_panjang' => 'Microscopic examination of specimen from eye, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-eye',
          ),
          334 => 
          array (
            'kode' => '90.24',
            'deskripsi_panjang' => 'Microscopic examination of specimen from eye, parasitology',
            'deskripsi_pendek' => 'Parasitology-eye',
          ),
          335 => 
          array (
            'kode' => '90.25',
            'deskripsi_panjang' => 'Microscopic examination of specimen from eye, toxicology',
            'deskripsi_pendek' => 'Toxicology-eye',
          ),
          336 => 
          array (
            'kode' => '90.26',
            'deskripsi_panjang' => 'Microscopic examination of specimen from eye, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell block/pap-eye',
          ),
          337 => 
          array (
            'kode' => '90.29',
            'deskripsi_panjang' => 'Microscopic examination of specimen from eye, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-eye NEC',
          ),
          338 => 
          array (
            'kode' => '90.31',
            'deskripsi_panjang' => 'Microscopic examination of specimen from ear, nose, throat, and larynx, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-ent/larynx',
          ),
          339 => 
          array (
            'kode' => '90.32',
            'deskripsi_panjang' => 'Microscopic examination of specimen from ear, nose, throat, and larynx, culture',
            'deskripsi_pendek' => 'Culture-ent/larynx',
          ),
          340 => 
          array (
            'kode' => '90.33',
            'deskripsi_panjang' => 'Microscopic examination of specimen from ear, nose, throat, and larynx, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-ent/larynx',
          ),
          341 => 
          array (
            'kode' => '90.34',
            'deskripsi_panjang' => 'Microscopic examination of specimen from ear, nose, throat, and larynx, parasitology',
            'deskripsi_pendek' => 'Parasitology-ent/larynx',
          ),
          342 => 
          array (
            'kode' => '90.35',
            'deskripsi_panjang' => 'Microscopic examination of specimen from ear, nose, throat, and larynx, toxicology',
            'deskripsi_pendek' => 'Toxicology-ent/larynx',
          ),
          343 => 
          array (
            'kode' => '90.36',
            'deskripsi_panjang' => 'Microscopic examination of specimen from ear, nose, throat, and larynx, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell block/pap-ent/laryn',
          ),
          344 => 
          array (
            'kode' => '90.39',
            'deskripsi_panjang' => 'Microscopic examination of specimen from ear, nose, throat, and larynx, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-ent/laryn NEC',
          ),
          345 => 
          array (
            'kode' => '90.41',
            'deskripsi_panjang' => 'Microscopic examination of specimen from trachea, bronchus, pleura, lung, and other thoracic specimen, and of sputum, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-lower resp',
          ),
          346 => 
          array (
            'kode' => '90.42',
            'deskripsi_panjang' => 'Microscopic examination of specimen from trachea, bronchus, pleura, lung, and other thoracic specimen, and of sputum, culture',
            'deskripsi_pendek' => 'Culture-lower resp',
          ),
          347 => 
          array (
            'kode' => '90.43',
            'deskripsi_panjang' => 'Microscopic examination of specimen from trachea, bronchus, pleura, lung, and other thoracic specimen, and of sputum, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-lower resp',
          ),
          348 => 
          array (
            'kode' => '90.44',
            'deskripsi_panjang' => 'Microscopic examination of specimen from trachea, bronchus, pleura, lung, and other thoracic specimen, and of sputum, parasitology',
            'deskripsi_pendek' => 'Parasitology-lower resp',
          ),
          349 => 
          array (
            'kode' => '90.45',
            'deskripsi_panjang' => 'Microscopic examination of specimen from trachea, bronchus, pleura, lung, and other thoracic specimen, and of sputum, toxicology',
            'deskripsi_pendek' => 'Toxicology-lower resp',
          ),
          350 => 
          array (
            'kode' => '90.46',
            'deskripsi_panjang' => 'Microscopic examination of specimen from trachea, bronchus, pleura, lung, and other thoracic specimen, and of sputum, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell block/pap-lowr resp',
          ),
          351 => 
          array (
            'kode' => '90.49',
            'deskripsi_panjang' => 'Microscopic examination of specimen from trachea, bronchus, pleura, lung, and other thoracic specimen, and of sputum, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-lowr resp NEC',
          ),
          352 => 
          array (
            'kode' => '90.51',
            'deskripsi_panjang' => 'Microscopic examination of blood, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-blood',
          ),
          353 => 
          array (
            'kode' => '90.52',
            'deskripsi_panjang' => 'Microscopic examination of blood, culture',
            'deskripsi_pendek' => 'Culture-blood',
          ),
          354 => 
          array (
            'kode' => '90.53',
            'deskripsi_panjang' => 'Microscopic examination of blood, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-blood',
          ),
          355 => 
          array (
            'kode' => '90.54',
            'deskripsi_panjang' => 'Microscopic examination of blood, parasitology',
            'deskripsi_pendek' => 'Parasitology-blood',
          ),
          356 => 
          array (
            'kode' => '90.55',
            'deskripsi_panjang' => 'Microscopic examination of blood, toxicology',
            'deskripsi_pendek' => 'Toxicology-blood',
          ),
          357 => 
          array (
            'kode' => '90.56',
            'deskripsi_panjang' => 'Microscopic examination of blood, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell block/pap-blood',
          ),
          358 => 
          array (
            'kode' => '90.59',
            'deskripsi_panjang' => 'Microscopic examination of blood, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-blood NEC',
          ),
          359 => 
          array (
            'kode' => '90.61',
            'deskripsi_panjang' => 'Microscopic examination of specimen from spleen and of bone marrow, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-spleen/marrow',
          ),
          360 => 
          array (
            'kode' => '90.62',
            'deskripsi_panjang' => 'Microscopic examination of specimen from spleen and of bone marrow, culture',
            'deskripsi_pendek' => 'Culture-spleen/marrow',
          ),
          361 => 
          array (
            'kode' => '90.63',
            'deskripsi_panjang' => 'Microscopic examination of specimen from spleen and of bone marrow, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-spleen/marrow',
          ),
          362 => 
          array (
            'kode' => '90.64',
            'deskripsi_panjang' => 'Microscopic examination of specimen from spleen and of bone marrow, parasitology',
            'deskripsi_pendek' => 'Parasitol-spleen/marrow',
          ),
          363 => 
          array (
            'kode' => '90.65',
            'deskripsi_panjang' => 'Microscopic examination of specimen from spleen and of bone marrow, toxicology',
            'deskripsi_pendek' => 'Toxicology-spleen/marrow',
          ),
          364 => 
          array (
            'kode' => '90.66',
            'deskripsi_panjang' => 'Microscopic examination of specimen from spleen and of bone marrow, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-spleen/marr',
          ),
          365 => 
          array (
            'kode' => '90.69',
            'deskripsi_panjang' => 'Microscopic examination of specimen from spleen and of bone marrow, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-spln/marr NEC',
          ),
          366 => 
          array (
            'kode' => '90.71',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lymph node and of lymph, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-lymph system',
          ),
          367 => 
          array (
            'kode' => '90.72',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lymph node and of lymph, culture',
            'deskripsi_pendek' => 'Culture-lymph system',
          ),
          368 => 
          array (
            'kode' => '90.73',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lymph node and of lymph, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-lymph system',
          ),
          369 => 
          array (
            'kode' => '90.74',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lymph node and of lymph, parasitology',
            'deskripsi_pendek' => 'Parasitology-lymph sys',
          ),
          370 => 
          array (
            'kode' => '90.75',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lymph node and of lymph, toxicology',
            'deskripsi_pendek' => 'Toxicology-lymph system',
          ),
          371 => 
          array (
            'kode' => '90.76',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lymph node and of lymph, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-lymph sys',
          ),
          372 => 
          array (
            'kode' => '90.79',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lymph node and of lymph, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-lymph sys NEC',
          ),
          373 => 
          array (
            'kode' => '90.81',
            'deskripsi_panjang' => 'Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-upper GI',
          ),
          374 => 
          array (
            'kode' => '90.82',
            'deskripsi_panjang' => 'Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, culture',
            'deskripsi_pendek' => 'Culture-upper GI',
          ),
          375 => 
          array (
            'kode' => '90.83',
            'deskripsi_panjang' => 'Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-upper GI',
          ),
          376 => 
          array (
            'kode' => '90.84',
            'deskripsi_panjang' => 'Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, parasitology',
            'deskripsi_pendek' => 'Parasitology-upper GI',
          ),
          377 => 
          array (
            'kode' => '90.85',
            'deskripsi_panjang' => 'Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, toxicology',
            'deskripsi_pendek' => 'Toxicology-upper GI',
          ),
          378 => 
          array (
            'kode' => '90.86',
            'deskripsi_panjang' => 'Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-upper GI',
          ),
          379 => 
          array (
            'kode' => '90.89',
            'deskripsi_panjang' => 'Microscopic examination of specimen from upper gastrointestinal tract and of vomitus, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-upper GI NEC',
          ),
          380 => 
          array (
            'kode' => '90.91',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-lower GI',
          ),
          381 => 
          array (
            'kode' => '90.92',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, culture',
            'deskripsi_pendek' => 'Culture-lower GI',
          ),
          382 => 
          array (
            'kode' => '90.93',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-lower GI',
          ),
          383 => 
          array (
            'kode' => '90.94',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, parasitology',
            'deskripsi_pendek' => 'Parasitology-lower GI',
          ),
          384 => 
          array (
            'kode' => '90.95',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, toxicology',
            'deskripsi_pendek' => 'Toxicology-lower GI',
          ),
          385 => 
          array (
            'kode' => '90.96',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-lower GI',
          ),
          386 => 
          array (
            'kode' => '90.99',
            'deskripsi_panjang' => 'Microscopic examination of specimen from lower gastrointestinal tract and of stool, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-lower GI NEC',
          ),
          387 => 
          array (
            'kode' => '91.01',
            'deskripsi_panjang' => 'Microscopic examination of specimen from liver, biliary tract, and pancreas, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-bili/pancreas',
          ),
          388 => 
          array (
            'kode' => '91.02',
            'deskripsi_panjang' => 'Microscopic examination of specimen from liver, biliary tract, and pancreas, culture',
            'deskripsi_pendek' => 'Culture-bili/pancreas',
          ),
          389 => 
          array (
            'kode' => '91.03',
            'deskripsi_panjang' => 'Microscopic examination of specimen from liver, biliary tract, and pancreas, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-bili/pancreas',
          ),
          390 => 
          array (
            'kode' => '91.04',
            'deskripsi_panjang' => 'Microscopic examination of specimen from liver, biliary tract, and pancreas, parasitology',
            'deskripsi_pendek' => 'Parasitology-bili/pancr',
          ),
          391 => 
          array (
            'kode' => '91.05',
            'deskripsi_panjang' => 'Microscopic examination of specimen from liver, biliary tract, and pancreas, toxicology',
            'deskripsi_pendek' => 'Toxicology-bili/pancreas',
          ),
          392 => 
          array (
            'kode' => '91.06',
            'deskripsi_panjang' => 'Microscopic examination of specimen from liver, biliary tract, and pancreas, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-bili/pancre',
          ),
          393 => 
          array (
            'kode' => '91.09',
            'deskripsi_panjang' => 'Microscopic examination of specimen from liver, biliary tract, and pancreas, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-bili/panc NEC',
          ),
          394 => 
          array (
            'kode' => '91.11',
            'deskripsi_panjang' => 'Microscopic examination of peritoneal and retroperitoneal specimen, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-peritoneum',
          ),
          395 => 
          array (
            'kode' => '91.12',
            'deskripsi_panjang' => 'Microscopic examination of peritoneal and retroperitoneal specimen, culture',
            'deskripsi_pendek' => 'Culture-peritoneum',
          ),
          396 => 
          array (
            'kode' => '91.13',
            'deskripsi_panjang' => 'Microscopic examination of peritoneal and retroperitoneal specimen, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-peritoneum',
          ),
          397 => 
          array (
            'kode' => '91.14',
            'deskripsi_panjang' => 'Microscopic examination of peritoneal and retroperitoneal specimen, parasitology',
            'deskripsi_pendek' => 'Parasitology-peritoneum',
          ),
          398 => 
          array (
            'kode' => '91.15',
            'deskripsi_panjang' => 'Microscopic examination of peritoneal and retroperitoneal specimen, toxicology',
            'deskripsi_pendek' => 'Toxicology-peritoneum',
          ),
          399 => 
          array (
            'kode' => '91.16',
            'deskripsi_panjang' => 'Microscopic examination of peritoneal and retroperitoneal specimen, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-peritoneum',
          ),
          400 => 
          array (
            'kode' => '91.19',
            'deskripsi_panjang' => 'Microscopic examination of peritoneal and retroperitoneal specimen, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-periton NEC',
          ),
          401 => 
          array (
            'kode' => '91.21',
            'deskripsi_panjang' => 'Microscopic examination of specimen from kidney, ureter, perirenal and periureteral tissue, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-upper urinary',
          ),
          402 => 
          array (
            'kode' => '91.22',
            'deskripsi_panjang' => 'Microscopic examination of specimen from kidney, ureter, perirenal and periureteral tissue, culture',
            'deskripsi_pendek' => 'Culture-upper urinary',
          ),
          403 => 
          array (
            'kode' => '91.23',
            'deskripsi_panjang' => 'Microscopic examination of specimen from kidney, ureter, perirenal and periureteral tissue, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-upper urinary',
          ),
          404 => 
          array (
            'kode' => '91.24',
            'deskripsi_panjang' => 'Microscopic examination of specimen from kidney, ureter, perirenal and periureteral tissue, parasitology',
            'deskripsi_pendek' => 'Parasitology-upper urin',
          ),
          405 => 
          array (
            'kode' => '91.25',
            'deskripsi_panjang' => 'Microscopic examination of specimen from kidney, ureter, perirenal and periureteral tissue, toxicology',
            'deskripsi_pendek' => 'Toxicology-upper urinary',
          ),
          406 => 
          array (
            'kode' => '91.26',
            'deskripsi_panjang' => 'Microscopic examination of specimen from kidney, ureter, perirenal and periureteral tissue, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-upper urin',
          ),
          407 => 
          array (
            'kode' => '91.29',
            'deskripsi_panjang' => 'Microscopic examination of specimen from kidney, ureter, perirenal and periureteral tissue, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-uppr urin NEC',
          ),
          408 => 
          array (
            'kode' => '91.31',
            'deskripsi_panjang' => 'Microscopic examination of specimen from bladder, urethra, prostate, seminal vesicle, perivesical tissue, and of urine and semen, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-lower urinary',
          ),
          409 => 
          array (
            'kode' => '91.32',
            'deskripsi_panjang' => 'Microscopic examination of specimen from bladder, urethra, prostate, seminal vesicle, perivesical tissue, and of urine and semen, culture',
            'deskripsi_pendek' => 'Culture-lower urinary',
          ),
          410 => 
          array (
            'kode' => '91.33',
            'deskripsi_panjang' => 'Microscopic examination of specimen from bladder, urethra, prostate, seminal vesicle, perivesical tissue, and of urine and semen, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-lower urinary',
          ),
          411 => 
          array (
            'kode' => '91.34',
            'deskripsi_panjang' => 'Microscopic examination of specimen from bladder, urethra, prostate, seminal vesicle, perivesical tissue, and of urine and semen, parasitology',
            'deskripsi_pendek' => 'Parasitlolgy-lower urin',
          ),
          412 => 
          array (
            'kode' => '91.35',
            'deskripsi_panjang' => 'Microscopic examination of specimen from bladder, urethra, prostate, seminal vesicle, perivesical tissue, and of urine and semen, toxicology',
            'deskripsi_pendek' => 'Toxicology-lower urinary',
          ),
          413 => 
          array (
            'kode' => '91.36',
            'deskripsi_panjang' => 'Microscopic examination of specimen from bladder, urethra, prostate, seminal vesicle, perivesical tissue, and of urine and semen, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-lower urin',
          ),
          414 => 
          array (
            'kode' => '91.39',
            'deskripsi_panjang' => 'Microscopic examination of specimen from bladder, urethra, prostate, seminal vesicle, perivesical tissue, and of urine and semen, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-low urin NEC',
          ),
          415 => 
          array (
            'kode' => '91.41',
            'deskripsi_panjang' => 'Microscopic examination of specimen from female genital tract, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-female genit',
          ),
          416 => 
          array (
            'kode' => '91.42',
            'deskripsi_panjang' => 'Microscopic examination of specimen from female genital tract, culture',
            'deskripsi_pendek' => 'Culture-female genital',
          ),
          417 => 
          array (
            'kode' => '91.43',
            'deskripsi_panjang' => 'Microscopic examination of specimen from female genital tract, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-female genital',
          ),
          418 => 
          array (
            'kode' => '91.44',
            'deskripsi_panjang' => 'Microscopic examination of specimen from female genital tract, parasitology',
            'deskripsi_pendek' => 'Parasitology-female gen',
          ),
          419 => 
          array (
            'kode' => '91.45',
            'deskripsi_panjang' => 'Microscopic examination of specimen from female genital tract, toxicology',
            'deskripsi_pendek' => 'Toxicology-female genit',
          ),
          420 => 
          array (
            'kode' => '91.46',
            'deskripsi_panjang' => 'Microscopic examination of specimen from female genital tract, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-female gen',
          ),
          421 => 
          array (
            'kode' => '91.49',
            'deskripsi_panjang' => 'Microscopic examination of specimen from female genital tract, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-femal gen NEC',
          ),
          422 => 
          array (
            'kode' => '91.51',
            'deskripsi_panjang' => 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-musculoskel',
          ),
          423 => 
          array (
            'kode' => '91.52',
            'deskripsi_panjang' => 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, culture',
            'deskripsi_pendek' => 'Culture-musculoskeletal',
          ),
          424 => 
          array (
            'kode' => '91.53',
            'deskripsi_panjang' => 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-musculoskeletal',
          ),
          425 => 
          array (
            'kode' => '91.54',
            'deskripsi_panjang' => 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, parasitology',
            'deskripsi_pendek' => 'Parasitology-musculoskel',
          ),
          426 => 
          array (
            'kode' => '91.55',
            'deskripsi_panjang' => 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, toxicology',
            'deskripsi_pendek' => 'Toxicology-musculoskel',
          ),
          427 => 
          array (
            'kode' => '91.56',
            'deskripsi_panjang' => 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-musculoskel',
          ),
          428 => 
          array (
            'kode' => '91.59',
            'deskripsi_panjang' => 'Microscopic examination of specimen from musculoskeletal system and of joint fluid, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-musculosk NEC',
          ),
          429 => 
          array (
            'kode' => '91.61',
            'deskripsi_panjang' => 'Microscopic examination of specimen from skin and other integument, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-integument',
          ),
          430 => 
          array (
            'kode' => '91.62',
            'deskripsi_panjang' => 'Microscopic examination of specimen from skin and other integument, culture',
            'deskripsi_pendek' => 'Culture-integument',
          ),
          431 => 
          array (
            'kode' => '91.63',
            'deskripsi_panjang' => 'Microscopic examination of specimen from skin and other integument, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-integument',
          ),
          432 => 
          array (
            'kode' => '91.64',
            'deskripsi_panjang' => 'Microscopic examination of specimen from skin and other integument, parasitology',
            'deskripsi_pendek' => 'Parasitology-integument',
          ),
          433 => 
          array (
            'kode' => '91.65',
            'deskripsi_panjang' => 'Microscopic examination of specimen from skin and other integument, toxicology',
            'deskripsi_pendek' => 'Toxicology-integument',
          ),
          434 => 
          array (
            'kode' => '91.66',
            'deskripsi_panjang' => 'Microscopic examination of specimen from skin and other integument, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-integument',
          ),
          435 => 
          array (
            'kode' => '91.69',
            'deskripsi_panjang' => 'Microscopic examination of specimen from skin and other integument, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-integumen NEC',
          ),
          436 => 
          array (
            'kode' => '91.71',
            'deskripsi_panjang' => 'Microscopic examination of specimen from operative wound, bacterial smear',
            'deskripsi_pendek' => 'Bact smear-op wound',
          ),
          437 => 
          array (
            'kode' => '91.72',
            'deskripsi_panjang' => 'Microscopic examination of specimen from operative wound, culture',
            'deskripsi_pendek' => 'Culture-op wound',
          ),
          438 => 
          array (
            'kode' => '91.73',
            'deskripsi_panjang' => 'Microscopic examination of specimen from operative wound, culture and sensitivity',
            'deskripsi_pendek' => 'C & s-op wound',
          ),
          439 => 
          array (
            'kode' => '91.74',
            'deskripsi_panjang' => 'Microscopic examination of specimen from operative wound, parasitology',
            'deskripsi_pendek' => 'Parasitology-op wound',
          ),
          440 => 
          array (
            'kode' => '91.75',
            'deskripsi_panjang' => 'Microscopic examination of specimen from operative wound, toxicology',
            'deskripsi_pendek' => 'Toxicology-op wound',
          ),
          441 => 
          array (
            'kode' => '91.76',
            'deskripsi_panjang' => 'Microscopic examination of specimen from operative wound, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap-op wound',
          ),
          442 => 
          array (
            'kode' => '91.79',
            'deskripsi_panjang' => 'Microscopic examination of specimen from operative wound, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam-op wound NEC',
          ),
          443 => 
          array (
            'kode' => '91.81',
            'deskripsi_panjang' => 'Microscopic examination of specimen from other site, bacterial smear',
            'deskripsi_pendek' => 'Bact smear NEC',
          ),
          444 => 
          array (
            'kode' => '91.82',
            'deskripsi_panjang' => 'Microscopic examination of specimen from other site, culture',
            'deskripsi_pendek' => 'Culture NEC',
          ),
          445 => 
          array (
            'kode' => '91.83',
            'deskripsi_panjang' => 'Microscopic examination of specimen from other site, culture and sensitivity',
            'deskripsi_pendek' => 'C & s NEC',
          ),
          446 => 
          array (
            'kode' => '91.84',
            'deskripsi_panjang' => 'Microscopic examination of specimen from other site, parasitology',
            'deskripsi_pendek' => 'Parasitology NEC',
          ),
          447 => 
          array (
            'kode' => '91.85',
            'deskripsi_panjang' => 'Microscopic examination of specimen from other site, toxicology',
            'deskripsi_pendek' => 'Toxicology NEC',
          ),
          448 => 
          array (
            'kode' => '91.86',
            'deskripsi_panjang' => 'Microscopic examination of specimen from other site, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap NEC',
          ),
          449 => 
          array (
            'kode' => '91.89',
            'deskripsi_panjang' => 'Microscopic examination of specimen from other site, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam NEC',
          ),
          450 => 
          array (
            'kode' => '91.91',
            'deskripsi_panjang' => 'Microscopic examination of specimen from unspecified site, bacterial smear',
            'deskripsi_pendek' => 'Bact smear NOS',
          ),
          451 => 
          array (
            'kode' => '91.92',
            'deskripsi_panjang' => 'Microscopic examination of specimen from unspecified site, culture',
            'deskripsi_pendek' => 'Culture NOS',
          ),
          452 => 
          array (
            'kode' => '91.93',
            'deskripsi_panjang' => 'Microscopic examination of specimen from unspecified site, culture and sensitivity',
            'deskripsi_pendek' => 'C & s NOS',
          ),
          453 => 
          array (
            'kode' => '91.94',
            'deskripsi_panjang' => 'Microscopic examination of specimen from unspecified site, parasitology',
            'deskripsi_pendek' => 'Parasitology NOS',
          ),
          454 => 
          array (
            'kode' => '91.95',
            'deskripsi_panjang' => 'Microscopic examination of specimen from unspecified site, toxicology',
            'deskripsi_pendek' => 'Toxicology NOS',
          ),
          455 => 
          array (
            'kode' => '91.96',
            'deskripsi_panjang' => 'Microscopic examination of specimen from unspecified site, cell block and Papanicolaou smear',
            'deskripsi_pendek' => 'Cell blk/pap NOS',
          ),
          456 => 
          array (
            'kode' => '91.99',
            'deskripsi_panjang' => 'Microscopic examination of specimen from unspecified site, other microscopic examination',
            'deskripsi_pendek' => 'Micro exam NOS',
          ),
          457 => 
          array (
            'kode' => '92.01',
            'deskripsi_panjang' => 'Thyroid scan and radioisotope function studies',
            'deskripsi_pendek' => 'Thyroid scan/isotop func',
          ),
          458 => 
          array (
            'kode' => '92.02',
            'deskripsi_panjang' => 'Liver scan and radioisotope function study',
            'deskripsi_pendek' => 'Liver scan/isotope funct',
          ),
          459 => 
          array (
            'kode' => '92.03',
            'deskripsi_panjang' => 'Renal scan and radioisotope function study',
            'deskripsi_pendek' => 'Renal scan/isotope funct',
          ),
          460 => 
          array (
            'kode' => '92.04',
            'deskripsi_panjang' => 'Gastrointestinal scan and radioisotope function study',
            'deskripsi_pendek' => 'GI scan & isotope funct',
          ),
          461 => 
          array (
            'kode' => '92.05',
            'deskripsi_panjang' => 'Cardiovascular and hematopoietic scan and radioisotope function study',
            'deskripsi_pendek' => 'C-vasc scan/isotop funct',
          ),
          462 => 
          array (
            'kode' => '92.09',
            'deskripsi_panjang' => 'Other radioisotope function studies',
            'deskripsi_pendek' => 'Other isotope function',
          ),
          463 => 
          array (
            'kode' => '92.11',
            'deskripsi_panjang' => 'Cerebral scan',
            'deskripsi_pendek' => 'Cerebral scan',
          ),
          464 => 
          array (
            'kode' => '92.12',
            'deskripsi_panjang' => 'Scan of other sites of head',
            'deskripsi_pendek' => 'Head scan NEC',
          ),
          465 => 
          array (
            'kode' => '92.13',
            'deskripsi_panjang' => 'Parathyroid scan',
            'deskripsi_pendek' => 'Parathyroid scan',
          ),
          466 => 
          array (
            'kode' => '92.14',
            'deskripsi_panjang' => 'Bone scan',
            'deskripsi_pendek' => 'Bone scan',
          ),
          467 => 
          array (
            'kode' => '92.15',
            'deskripsi_panjang' => 'Pulmonary scan',
            'deskripsi_pendek' => 'Pulmonary scan',
          ),
          468 => 
          array (
            'kode' => '92.16',
            'deskripsi_panjang' => 'Scan of lymphatic system',
            'deskripsi_pendek' => 'Lymphatic system scan',
          ),
          469 => 
          array (
            'kode' => '92.17',
            'deskripsi_panjang' => 'Placental scan',
            'deskripsi_pendek' => 'Placental scan',
          ),
          470 => 
          array (
            'kode' => '92.18',
            'deskripsi_panjang' => 'Total body scan',
            'deskripsi_pendek' => 'Total body scan',
          ),
          471 => 
          array (
            'kode' => '92.19',
            'deskripsi_panjang' => 'Scan of other sites',
            'deskripsi_pendek' => 'Scan of other sites',
          ),
          472 => 
          array (
            'kode' => '92.20',
            'deskripsi_panjang' => 'Infusion of liquid brachytherapy radioisotope',
            'deskripsi_pendek' => 'Inf liquid brachy isotop',
          ),
          473 => 
          array (
            'kode' => '92.21',
            'deskripsi_panjang' => 'Superficial radiation',
            'deskripsi_pendek' => 'Superficial radiation',
          ),
          474 => 
          array (
            'kode' => '92.22',
            'deskripsi_panjang' => 'Orthovoltage radiation',
            'deskripsi_pendek' => 'Orthovoltage radiation',
          ),
          475 => 
          array (
            'kode' => '92.23',
            'deskripsi_panjang' => 'Radioisotopic teleradiotherapy',
            'deskripsi_pendek' => 'Radioisot teleradiother',
          ),
          476 => 
          array (
            'kode' => '92.24',
            'deskripsi_panjang' => 'Teleradiotherapy using photons',
            'deskripsi_pendek' => 'Teleradio using photons',
          ),
          477 => 
          array (
            'kode' => '92.25',
            'deskripsi_panjang' => 'Teleradiotherapy using electrons',
            'deskripsi_pendek' => 'Electron teleradiotherap',
          ),
          478 => 
          array (
            'kode' => '92.26',
            'deskripsi_panjang' => 'Teleradiotherapy of other particulate radiation',
            'deskripsi_pendek' => 'Particul teleradioth NEC',
          ),
          479 => 
          array (
            'kode' => '92.27',
            'deskripsi_panjang' => 'Implantation or insertion of radioactive elements',
            'deskripsi_pendek' => 'Radioactive elem implant',
          ),
          480 => 
          array (
            'kode' => '92.28',
            'deskripsi_panjang' => 'Injection or instillation of radioisotopes',
            'deskripsi_pendek' => 'Isotope inject/instill',
          ),
          481 => 
          array (
            'kode' => '92.29',
            'deskripsi_panjang' => 'Other radiotherapeutic procedure',
            'deskripsi_pendek' => 'Radiotherapeut proc NEC',
          ),
          482 => 
          array (
            'kode' => '92.30',
            'deskripsi_panjang' => 'Stereotactic radiosurgery, not otherwise specified',
            'deskripsi_pendek' => 'Stereo radiosurgery NOS',
          ),
          483 => 
          array (
            'kode' => '92.31',
            'deskripsi_panjang' => 'Single source photon radiosurgery',
            'deskripsi_pendek' => 'Sing source radiosurgery',
          ),
          484 => 
          array (
            'kode' => '92.32',
            'deskripsi_panjang' => 'Multi-source photon radiosurgery',
            'deskripsi_pendek' => 'Multisource radiosurgery',
          ),
          485 => 
          array (
            'kode' => '92.33',
            'deskripsi_panjang' => 'Particulate radiosurgery',
            'deskripsi_pendek' => 'Particulate radiosurgery',
          ),
          486 => 
          array (
            'kode' => '92.39',
            'deskripsi_panjang' => 'Stereotactic radiosurgery, not elsewhere classified',
            'deskripsi_pendek' => 'Stereo radiosurgery NEC',
          ),
          487 => 
          array (
            'kode' => '92.41',
            'deskripsi_panjang' => 'Intra-operative electron radiation therapy',
            'deskripsi_pendek' => 'Intra-op electron rad rx',
          ),
          488 => 
          array (
            'kode' => '93.01',
            'deskripsi_panjang' => 'Functional evaluation',
            'deskripsi_pendek' => 'Functional pt evaluation',
          ),
          489 => 
          array (
            'kode' => '93.02',
            'deskripsi_panjang' => 'Orthotic evaluation',
            'deskripsi_pendek' => 'Orthotic evaluation',
          ),
          490 => 
          array (
            'kode' => '93.03',
            'deskripsi_panjang' => 'Prosthetic evaluation',
            'deskripsi_pendek' => 'Prosthetic evaluation',
          ),
          491 => 
          array (
            'kode' => '93.04',
            'deskripsi_panjang' => 'Manual testing of muscle function',
            'deskripsi_pendek' => 'Manual muscle funct test',
          ),
          492 => 
          array (
            'kode' => '93.05',
            'deskripsi_panjang' => 'Range of motion testing',
            'deskripsi_pendek' => 'Range of motion testing',
          ),
          493 => 
          array (
            'kode' => '93.06',
            'deskripsi_panjang' => 'Measurement of limb length',
            'deskripsi_pendek' => 'Limb length measurement',
          ),
          494 => 
          array (
            'kode' => '93.07',
            'deskripsi_panjang' => 'Body measurement',
            'deskripsi_pendek' => 'Body measurement',
          ),
          495 => 
          array (
            'kode' => '93.08',
            'deskripsi_panjang' => 'Electromyography',
            'deskripsi_pendek' => 'Electromyography',
          ),
          496 => 
          array (
            'kode' => '93.09',
            'deskripsi_panjang' => 'Other diagnostic physical therapy procedure',
            'deskripsi_pendek' => 'Other dx pt procedure',
          ),
          497 => 
          array (
            'kode' => '93.11',
            'deskripsi_panjang' => 'Assisting exercise',
            'deskripsi_pendek' => 'Assisting exercise',
          ),
          498 => 
          array (
            'kode' => '93.12',
            'deskripsi_panjang' => 'Other active musculoskeletal exercise',
            'deskripsi_pendek' => 'Activ musculosk exer NEC',
          ),
          499 => 
          array (
            'kode' => '93.13',
            'deskripsi_panjang' => 'Resistive exercise',
            'deskripsi_pendek' => 'Resistive exercise',
          ),
        ));
        DB::table('icd9')->insert(array (
          0 => 
          array (
            'kode' => '93.14',
            'deskripsi_panjang' => 'Training in joint movements',
            'deskripsi_pendek' => 'Joint movement training',
          ),
          1 => 
          array (
            'kode' => '93.15',
            'deskripsi_panjang' => 'Mobilization of spine',
            'deskripsi_pendek' => 'Mobilization of spine',
          ),
          2 => 
          array (
            'kode' => '93.16',
            'deskripsi_panjang' => 'Mobilization of other joints',
            'deskripsi_pendek' => 'Other joint mobilization',
          ),
          3 => 
          array (
            'kode' => '93.17',
            'deskripsi_panjang' => 'Other passive musculoskeletal exercise',
            'deskripsi_pendek' => 'Pass musculosk exer NEC',
          ),
          4 => 
          array (
            'kode' => '93.18',
            'deskripsi_panjang' => 'Breathing exercise',
            'deskripsi_pendek' => 'Pt breathing exercise',
          ),
          5 => 
          array (
            'kode' => '93.19',
            'deskripsi_panjang' => 'Exercise, not elsewhere classified',
            'deskripsi_pendek' => 'Pt exercise NEC',
          ),
          6 => 
          array (
            'kode' => '93.21',
            'deskripsi_panjang' => 'Manual and mechanical traction',
            'deskripsi_pendek' => 'Manual & mechan traction',
          ),
          7 => 
          array (
            'kode' => '93.22',
            'deskripsi_panjang' => 'Ambulation and gait training',
            'deskripsi_pendek' => 'Ambulat & gait training',
          ),
          8 => 
          array (
            'kode' => '93.23',
            'deskripsi_panjang' => 'Fitting of orthotic device',
            'deskripsi_pendek' => 'Orthotic device fitting',
          ),
          9 => 
          array (
            'kode' => '93.24',
            'deskripsi_panjang' => 'Training in use of prosthetic or orthotic device',
            'deskripsi_pendek' => 'Prosthet/orthot training',
          ),
          10 => 
          array (
            'kode' => '93.25',
            'deskripsi_panjang' => 'Forced extension of limb',
            'deskripsi_pendek' => 'Forced limb extension',
          ),
          11 => 
          array (
            'kode' => '93.26',
            'deskripsi_panjang' => 'Manual rupture of joint adhesions',
            'deskripsi_pendek' => 'Manual rupt joint adhes',
          ),
          12 => 
          array (
            'kode' => '93.27',
            'deskripsi_panjang' => 'Stretching of muscle or tendon',
            'deskripsi_pendek' => 'Musc or tend stretching',
          ),
          13 => 
          array (
            'kode' => '93.28',
            'deskripsi_panjang' => 'Stretching of fascia',
            'deskripsi_pendek' => 'Stretching of fascia',
          ),
          14 => 
          array (
            'kode' => '93.29',
            'deskripsi_panjang' => 'Other forcible correction of musculoskeletal deformity',
            'deskripsi_pendek' => 'Forcib correct defor NEC',
          ),
          15 => 
          array (
            'kode' => '93.31',
            'deskripsi_panjang' => 'Assisted exercise in pool',
            'deskripsi_pendek' => 'Assisted pool exercise',
          ),
          16 => 
          array (
            'kode' => '93.32',
            'deskripsi_panjang' => 'Whirlpool treatment',
            'deskripsi_pendek' => 'Whirlpool treatment',
          ),
          17 => 
          array (
            'kode' => '93.33',
            'deskripsi_panjang' => 'Other hydrotherapy',
            'deskripsi_pendek' => 'Other hydrotherapy',
          ),
          18 => 
          array (
            'kode' => '93.34',
            'deskripsi_panjang' => 'Diathermy',
            'deskripsi_pendek' => 'Diathermy',
          ),
          19 => 
          array (
            'kode' => '93.35',
            'deskripsi_panjang' => 'Other heat therapy',
            'deskripsi_pendek' => 'Other heat therapy',
          ),
          20 => 
          array (
            'kode' => '93.36',
            'deskripsi_panjang' => 'Cardiac retraining',
            'deskripsi_pendek' => 'Cardiac retraining',
          ),
          21 => 
          array (
            'kode' => '93.37',
            'deskripsi_panjang' => 'Prenatal training',
            'deskripsi_pendek' => 'Prenatal training',
          ),
          22 => 
          array (
            'kode' => '93.38',
            'deskripsi_panjang' => 'Combined physical therapy without mention of the components',
            'deskripsi_pendek' => 'Combined pt NOS',
          ),
          23 => 
          array (
            'kode' => '93.39',
            'deskripsi_panjang' => 'Other physical therapy',
            'deskripsi_pendek' => 'Physical therapy NEC',
          ),
          24 => 
          array (
            'kode' => '93.41',
            'deskripsi_panjang' => 'Spinal traction using skull device',
            'deskripsi_pendek' => 'Spine tract w skull dev',
          ),
          25 => 
          array (
            'kode' => '93.42',
            'deskripsi_panjang' => 'Other spinal traction',
            'deskripsi_pendek' => 'Other spinal traction',
          ),
          26 => 
          array (
            'kode' => '93.43',
            'deskripsi_panjang' => 'Intermittent skeletal traction',
            'deskripsi_pendek' => 'Intermitt skel traction',
          ),
          27 => 
          array (
            'kode' => '93.44',
            'deskripsi_panjang' => 'Other skeletal traction',
            'deskripsi_pendek' => 'Other skeletal traction',
          ),
          28 => 
          array (
            'kode' => '93.45',
            'deskripsi_panjang' => 'Thomas splint traction',
            'deskripsi_pendek' => 'Thomas splint traction',
          ),
          29 => 
          array (
            'kode' => '93.46',
            'deskripsi_panjang' => 'Other skin traction of limbs',
            'deskripsi_pendek' => 'Limb skin traction NEC',
          ),
          30 => 
          array (
            'kode' => '93.51',
            'deskripsi_panjang' => 'Application of plaster jacket',
            'deskripsi_pendek' => 'Plaster jacket applicat',
          ),
          31 => 
          array (
            'kode' => '93.52',
            'deskripsi_panjang' => 'Application of neck support',
            'deskripsi_pendek' => 'Neck support application',
          ),
          32 => 
          array (
            'kode' => '93.53',
            'deskripsi_panjang' => 'Application of other cast',
            'deskripsi_pendek' => 'Other cast application',
          ),
          33 => 
          array (
            'kode' => '93.54',
            'deskripsi_panjang' => 'Application of splint',
            'deskripsi_pendek' => 'Application of splint',
          ),
          34 => 
          array (
            'kode' => '93.55',
            'deskripsi_panjang' => 'Dental wiring',
            'deskripsi_pendek' => 'Dental wiring',
          ),
          35 => 
          array (
            'kode' => '93.56',
            'deskripsi_panjang' => 'Application of pressure dressing',
            'deskripsi_pendek' => 'Pressure dressing applic',
          ),
          36 => 
          array (
            'kode' => '93.57',
            'deskripsi_panjang' => 'Application of other wound dressing',
            'deskripsi_pendek' => 'Dressing of wound NEC',
          ),
          37 => 
          array (
            'kode' => '93.58',
            'deskripsi_panjang' => 'Application of pressure trousers',
            'deskripsi_pendek' => 'Pressure trouser applica',
          ),
          38 => 
          array (
            'kode' => '93.59',
            'deskripsi_panjang' => 'Other immobilization, pressure, and attention to wound',
            'deskripsi_pendek' => 'Immobiliz/wound attn NEC',
          ),
          39 => 
          array (
            'kode' => '93.61',
            'deskripsi_panjang' => 'Osteopathic manipulative treatment for general mobilization',
            'deskripsi_pendek' => 'Omt for genl mobilizat',
          ),
          40 => 
          array (
            'kode' => '93.62',
            'deskripsi_panjang' => 'Osteopathic manipulative treatment using high-velocity, low-amplitude forces',
            'deskripsi_pendek' => 'Omt with hi-vel,lo-ampli',
          ),
          41 => 
          array (
            'kode' => '93.63',
            'deskripsi_panjang' => 'Osteopathic manipulative treatment using low- velocity, high-amplitude forces',
            'deskripsi_pendek' => 'Omt with lo-vel,hi-ampli',
          ),
          42 => 
          array (
            'kode' => '93.64',
            'deskripsi_panjang' => 'Osteopathic manipulative treatment using isotonic, isometric forces',
            'deskripsi_pendek' => 'Omt with isoton,isometri',
          ),
          43 => 
          array (
            'kode' => '93.65',
            'deskripsi_panjang' => 'Osteopathic manipulative treatment using indirect forces',
            'deskripsi_pendek' => 'Omt with indirect forces',
          ),
          44 => 
          array (
            'kode' => '93.66',
            'deskripsi_panjang' => 'Osteopathic manipulative treatment to move tissue fluids',
            'deskripsi_pendek' => 'Omt to move tissue fluid',
          ),
          45 => 
          array (
            'kode' => '93.67',
            'deskripsi_panjang' => 'Other specified osteopathic manipulative treatment',
            'deskripsi_pendek' => 'Osteopath manipulat NEC',
          ),
          46 => 
          array (
            'kode' => '93.71',
            'deskripsi_panjang' => 'Dyslexia training',
            'deskripsi_pendek' => 'Dyslexia training',
          ),
          47 => 
          array (
            'kode' => '93.72',
            'deskripsi_panjang' => 'Dysphasia training',
            'deskripsi_pendek' => 'Dysphasia training',
          ),
          48 => 
          array (
            'kode' => '93.73',
            'deskripsi_panjang' => 'Esophageal speech training',
            'deskripsi_pendek' => 'Esophag speech training',
          ),
          49 => 
          array (
            'kode' => '93.74',
            'deskripsi_panjang' => 'Speech defect training',
            'deskripsi_pendek' => 'Speech defect training',
          ),
          50 => 
          array (
            'kode' => '93.75',
            'deskripsi_panjang' => 'Other speech training and therapy',
            'deskripsi_pendek' => 'Other speech therapy',
          ),
          51 => 
          array (
            'kode' => '93.76',
            'deskripsi_panjang' => 'Training in use of lead dog for the blind',
            'deskripsi_pendek' => 'Training in lead dog use',
          ),
          52 => 
          array (
            'kode' => '93.77',
            'deskripsi_panjang' => 'Training in braille or moon',
            'deskripsi_pendek' => 'Braille or moon training',
          ),
          53 => 
          array (
            'kode' => '93.78',
            'deskripsi_panjang' => 'Other rehabilitation for the blind',
            'deskripsi_pendek' => 'Rehab for the blind NEC',
          ),
          54 => 
          array (
            'kode' => '93.81',
            'deskripsi_panjang' => 'Recreation therapy',
            'deskripsi_pendek' => 'Recreational therapy',
          ),
          55 => 
          array (
            'kode' => '93.82',
            'deskripsi_panjang' => 'Educational therapy',
            'deskripsi_pendek' => 'Educational therapy',
          ),
          56 => 
          array (
            'kode' => '93.83',
            'deskripsi_panjang' => 'Occupational therapy',
            'deskripsi_pendek' => 'Occupational therapy',
          ),
          57 => 
          array (
            'kode' => '93.84',
            'deskripsi_panjang' => 'Music therapy',
            'deskripsi_pendek' => 'Music therapy',
          ),
          58 => 
          array (
            'kode' => '93.85',
            'deskripsi_panjang' => 'Vocational rehabilitation',
            'deskripsi_pendek' => 'Vocational rehabilitat',
          ),
          59 => 
          array (
            'kode' => '93.89',
            'deskripsi_panjang' => 'Rehabilitation, not elsewhere classified',
            'deskripsi_pendek' => 'Rehabilitation NEC',
          ),
          60 => 
          array (
            'kode' => '93.90',
            'deskripsi_panjang' => 'Non-invasive mechanical ventilation',
            'deskripsi_pendek' => 'Non-invasive mech vent',
          ),
          61 => 
          array (
            'kode' => '93.91',
            'deskripsi_panjang' => 'Intermittent positive pressure breathing [IPPB]',
            'deskripsi_pendek' => 'Ippb',
          ),
          62 => 
          array (
            'kode' => '93.93',
            'deskripsi_panjang' => 'Nonmechanical methods of resuscitation',
            'deskripsi_pendek' => 'Nonmechan resuscitation',
          ),
          63 => 
          array (
            'kode' => '93.94',
            'deskripsi_panjang' => 'Respiratory medication administered by nebulizer',
            'deskripsi_pendek' => 'Nebulizer therapy',
          ),
          64 => 
          array (
            'kode' => '93.95',
            'deskripsi_panjang' => 'Hyperbaric oxygenation',
            'deskripsi_pendek' => 'Hyperbaric oxygenation',
          ),
          65 => 
          array (
            'kode' => '93.96',
            'deskripsi_panjang' => 'Other oxygen enrichment',
            'deskripsi_pendek' => 'Oxygen enrichment NEC',
          ),
          66 => 
          array (
            'kode' => '93.97',
            'deskripsi_panjang' => 'Decompression chamber',
            'deskripsi_pendek' => 'Decompression chamber',
          ),
          67 => 
          array (
            'kode' => '93.98',
            'deskripsi_panjang' => 'Other control of atmospheric pressure and composition',
            'deskripsi_pendek' => 'Atmos press/compos contr',
          ),
          68 => 
          array (
            'kode' => '93.99',
            'deskripsi_panjang' => 'Other respiratory procedures',
            'deskripsi_pendek' => 'Other resp procedures',
          ),
          69 => 
          array (
            'kode' => '94.01',
            'deskripsi_panjang' => 'Administration of intelligence test',
            'deskripsi_pendek' => 'Intelligence test admin',
          ),
          70 => 
          array (
            'kode' => '94.02',
            'deskripsi_panjang' => 'Administration of psychologic test',
            'deskripsi_pendek' => 'Psychologic test adminis',
          ),
          71 => 
          array (
            'kode' => '94.03',
            'deskripsi_panjang' => 'Character analysis',
            'deskripsi_pendek' => 'Character analysis',
          ),
          72 => 
          array (
            'kode' => '94.08',
            'deskripsi_panjang' => 'Other psychologic evaluation and testing',
            'deskripsi_pendek' => 'Psychol eval & test NEC',
          ),
          73 => 
          array (
            'kode' => '94.09',
            'deskripsi_panjang' => 'Psychologic mental status determination, not otherwise specified',
            'deskripsi_pendek' => 'Psychol mental stat NOS',
          ),
          74 => 
          array (
            'kode' => '94.11',
            'deskripsi_panjang' => 'Psychiatric mental status determination',
            'deskripsi_pendek' => 'Psychiat mental determin',
          ),
          75 => 
          array (
            'kode' => '94.12',
            'deskripsi_panjang' => 'Routine psychiatric visit, not otherwise specified',
            'deskripsi_pendek' => 'Routine psychiat visit',
          ),
          76 => 
          array (
            'kode' => '94.13',
            'deskripsi_panjang' => 'Psychiatric commitment evaluation',
            'deskripsi_pendek' => 'Psychia commitment eval',
          ),
          77 => 
          array (
            'kode' => '94.19',
            'deskripsi_panjang' => 'Other psychiatric interview and evaluation',
            'deskripsi_pendek' => 'Psychia interv/eval NEC',
          ),
          78 => 
          array (
            'kode' => '94.21',
            'deskripsi_panjang' => 'Narcoanalysis',
            'deskripsi_pendek' => 'Narcoanalysis',
          ),
          79 => 
          array (
            'kode' => '94.22',
            'deskripsi_panjang' => 'Lithium therapy',
            'deskripsi_pendek' => 'Lithium therapy',
          ),
          80 => 
          array (
            'kode' => '94.23',
            'deskripsi_panjang' => 'Neuroleptic therapy',
            'deskripsi_pendek' => 'Neuroleptic therapy',
          ),
          81 => 
          array (
            'kode' => '94.24',
            'deskripsi_panjang' => 'Chemical shock therapy',
            'deskripsi_pendek' => 'Chemical shock therapy',
          ),
          82 => 
          array (
            'kode' => '94.25',
            'deskripsi_panjang' => 'Other psychiatric drug therapy',
            'deskripsi_pendek' => 'Psychiat drug therap NEC',
          ),
          83 => 
          array (
            'kode' => '94.26',
            'deskripsi_panjang' => 'Subconvulsive electroshock therapy',
            'deskripsi_pendek' => 'Subconvulsive est',
          ),
          84 => 
          array (
            'kode' => '94.27',
            'deskripsi_panjang' => 'Other electroshock therapy',
            'deskripsi_pendek' => 'Electroshock therapy NEC',
          ),
          85 => 
          array (
            'kode' => '94.29',
            'deskripsi_panjang' => 'Other psychiatric somatotherapy',
            'deskripsi_pendek' => 'Psychiatr somatother NEC',
          ),
          86 => 
          array (
            'kode' => '94.31',
            'deskripsi_panjang' => 'Psychoanalysis',
            'deskripsi_pendek' => 'Psychoanalysis',
          ),
          87 => 
          array (
            'kode' => '94.32',
            'deskripsi_panjang' => 'Hypnotherapy',
            'deskripsi_pendek' => 'Hypnotherapy',
          ),
          88 => 
          array (
            'kode' => '94.33',
            'deskripsi_panjang' => 'Behavior therapy',
            'deskripsi_pendek' => 'Behavior therapy',
          ),
          89 => 
          array (
            'kode' => '94.34',
            'deskripsi_panjang' => 'Individual therapy for psychosexual dysfunction',
            'deskripsi_pendek' => 'Ind therap psychsex dysf',
          ),
          90 => 
          array (
            'kode' => '94.35',
            'deskripsi_panjang' => 'Crisis intervention',
            'deskripsi_pendek' => 'Crisis intervention',
          ),
          91 => 
          array (
            'kode' => '94.36',
            'deskripsi_panjang' => 'Play psychotherapy',
            'deskripsi_pendek' => 'Play psychotherapy',
          ),
          92 => 
          array (
            'kode' => '94.37',
            'deskripsi_panjang' => 'Exploratory verbal psychotherapy',
            'deskripsi_pendek' => 'Explor verbal psychother',
          ),
          93 => 
          array (
            'kode' => '94.38',
            'deskripsi_panjang' => 'Supportive verbal psychotherapy',
            'deskripsi_pendek' => 'Suppor verbal psychother',
          ),
          94 => 
          array (
            'kode' => '94.39',
            'deskripsi_panjang' => 'Other individual psychotherapy',
            'deskripsi_pendek' => 'Individ psychotherap NEC',
          ),
          95 => 
          array (
            'kode' => '94.41',
            'deskripsi_panjang' => 'Group therapy for psychosexual dysfunction',
            'deskripsi_pendek' => 'Grp therap psychsex dysf',
          ),
          96 => 
          array (
            'kode' => '94.42',
            'deskripsi_panjang' => 'Family therapy',
            'deskripsi_pendek' => 'Family therapy',
          ),
          97 => 
          array (
            'kode' => '94.43',
            'deskripsi_panjang' => 'Psychodrama',
            'deskripsi_pendek' => 'Psychodrama',
          ),
          98 => 
          array (
            'kode' => '94.44',
            'deskripsi_panjang' => 'Other group therapy',
            'deskripsi_pendek' => 'Other group therapy',
          ),
          99 => 
          array (
            'kode' => '94.45',
            'deskripsi_panjang' => 'Drug addiction counseling',
            'deskripsi_pendek' => 'Drug addict counselling',
          ),
          100 => 
          array (
            'kode' => '94.46',
            'deskripsi_panjang' => 'Alcoholism counseling',
            'deskripsi_pendek' => 'Alcoholism counselling',
          ),
          101 => 
          array (
            'kode' => '94.49',
            'deskripsi_panjang' => 'Other counseling',
            'deskripsi_pendek' => 'Other counselling',
          ),
          102 => 
          array (
            'kode' => '94.51',
            'deskripsi_panjang' => 'Referral for psychotherapy',
            'deskripsi_pendek' => 'Referral for psychother',
          ),
          103 => 
          array (
            'kode' => '94.52',
            'deskripsi_panjang' => 'Referral for psychiatric aftercare',
            'deskripsi_pendek' => 'Referral psych aftercare',
          ),
          104 => 
          array (
            'kode' => '94.53',
            'deskripsi_panjang' => 'Referral for alcoholism rehabilitation',
            'deskripsi_pendek' => 'Referral alcohol rehab',
          ),
          105 => 
          array (
            'kode' => '94.54',
            'deskripsi_panjang' => 'Referral for drug addiction rehabilitation',
            'deskripsi_pendek' => 'Referral for drug rehab',
          ),
          106 => 
          array (
            'kode' => '94.55',
            'deskripsi_panjang' => 'Referral for vocational rehabilitation',
            'deskripsi_pendek' => 'Referral vocation rehab',
          ),
          107 => 
          array (
            'kode' => '94.59',
            'deskripsi_panjang' => 'Referral for other psychologic rehabilitation',
            'deskripsi_pendek' => 'Referral psych rehab NEC',
          ),
          108 => 
          array (
            'kode' => '94.61',
            'deskripsi_panjang' => 'Alcohol rehabilitation',
            'deskripsi_pendek' => 'Alcohol rehabilitation',
          ),
          109 => 
          array (
            'kode' => '94.62',
            'deskripsi_panjang' => 'Alcohol detoxification',
            'deskripsi_pendek' => 'Alcohol detoxification',
          ),
          110 => 
          array (
            'kode' => '94.63',
            'deskripsi_panjang' => 'Alcohol rehabilitation and detoxification',
            'deskripsi_pendek' => 'Alcohol rehab/detox',
          ),
          111 => 
          array (
            'kode' => '94.64',
            'deskripsi_panjang' => 'Drug rehabilitation',
            'deskripsi_pendek' => 'Drug rehabilitation',
          ),
          112 => 
          array (
            'kode' => '94.65',
            'deskripsi_panjang' => 'Drug detoxification',
            'deskripsi_pendek' => 'Drug detoxification',
          ),
          113 => 
          array (
            'kode' => '94.66',
            'deskripsi_panjang' => 'Drug rehabilitation and detoxification',
            'deskripsi_pendek' => 'Drug rehab/detox',
          ),
          114 => 
          array (
            'kode' => '94.67',
            'deskripsi_panjang' => 'Combined alcohol and drug rehabilitation',
            'deskripsi_pendek' => 'Comb alcohol/drug rehab',
          ),
          115 => 
          array (
            'kode' => '94.68',
            'deskripsi_panjang' => 'Combined alcohol and drug detoxification',
            'deskripsi_pendek' => 'Comb alcohol/drug detox',
          ),
          116 => 
          array (
            'kode' => '94.69',
            'deskripsi_panjang' => 'Combined alcohol and drug rehabilitation and detoxification',
            'deskripsi_pendek' => 'Comb alco/drug reha/deto',
          ),
          117 => 
          array (
            'kode' => '95.01',
            'deskripsi_panjang' => 'Limited eye examination',
            'deskripsi_pendek' => 'Limited eye examination',
          ),
          118 => 
          array (
            'kode' => '95.02',
            'deskripsi_panjang' => 'Comprehensive eye examination',
            'deskripsi_pendek' => 'Comprehensive eye exam',
          ),
          119 => 
          array (
            'kode' => '95.03',
            'deskripsi_panjang' => 'Extended ophthalmologic work-up',
            'deskripsi_pendek' => 'Extended ophthal work-up',
          ),
          120 => 
          array (
            'kode' => '95.04',
            'deskripsi_panjang' => 'Eye examination under anesthesia',
            'deskripsi_pendek' => 'Anesthetized eye exam',
          ),
          121 => 
          array (
            'kode' => '95.05',
            'deskripsi_panjang' => 'Visual field study',
            'deskripsi_pendek' => 'Visual field study',
          ),
          122 => 
          array (
            'kode' => '95.06',
            'deskripsi_panjang' => 'Color vision study',
            'deskripsi_pendek' => 'Color vision study',
          ),
          123 => 
          array (
            'kode' => '95.07',
            'deskripsi_panjang' => 'Dark adaptation study',
            'deskripsi_pendek' => 'Dark adaptation study',
          ),
          124 => 
          array (
            'kode' => '95.09',
            'deskripsi_panjang' => 'Eye examination, not otherwise specified',
            'deskripsi_pendek' => 'Eye examination NOS',
          ),
          125 => 
          array (
            'kode' => '95.11',
            'deskripsi_panjang' => 'Fundus photography',
            'deskripsi_pendek' => 'Fundus photography',
          ),
          126 => 
          array (
            'kode' => '95.12',
            'deskripsi_panjang' => 'Fluorescein angiography or angioscopy of eye',
            'deskripsi_pendek' => 'Eye fluorescein angiogra',
          ),
          127 => 
          array (
            'kode' => '95.13',
            'deskripsi_panjang' => 'Ultrasound study of eye',
            'deskripsi_pendek' => 'Ultrasound study of eye',
          ),
          128 => 
          array (
            'kode' => '95.14',
            'deskripsi_panjang' => 'X-ray study of eye',
            'deskripsi_pendek' => 'X-ray study of eye',
          ),
          129 => 
          array (
            'kode' => '95.15',
            'deskripsi_panjang' => 'Ocular motility study',
            'deskripsi_pendek' => 'Ocular motility study',
          ),
          130 => 
          array (
            'kode' => '95.16',
            'deskripsi_panjang' => 'P32 and other tracer studies of eye',
            'deskripsi_pendek' => 'P32 & eye tracer NEC',
          ),
          131 => 
          array (
            'kode' => '95.21',
            'deskripsi_panjang' => 'Electroretinogram [ERG]',
            'deskripsi_pendek' => 'Electroretinogram',
          ),
          132 => 
          array (
            'kode' => '95.22',
            'deskripsi_panjang' => 'Electro-oculogram [EOG]',
            'deskripsi_pendek' => 'Electro-oculogram',
          ),
          133 => 
          array (
            'kode' => '95.23',
            'deskripsi_panjang' => 'Visual evoked potential [VEP]',
            'deskripsi_pendek' => 'Visual evoked potential',
          ),
          134 => 
          array (
            'kode' => '95.24',
            'deskripsi_panjang' => 'Electronystagmogram [ENG]',
            'deskripsi_pendek' => 'Electronystagmogram',
          ),
          135 => 
          array (
            'kode' => '95.25',
            'deskripsi_panjang' => 'Electromyogram of eye [EMG]',
            'deskripsi_pendek' => 'Electromyogram of eye',
          ),
          136 => 
          array (
            'kode' => '95.26',
            'deskripsi_panjang' => 'Tonography, provocative tests, and other glaucoma testing',
            'deskripsi_pendek' => 'Glaucoma testing',
          ),
          137 => 
          array (
            'kode' => '95.31',
            'deskripsi_panjang' => 'Fitting and dispensing of spectacles',
            'deskripsi_pendek' => 'Spectacle fit & dispense',
          ),
          138 => 
          array (
            'kode' => '95.32',
            'deskripsi_panjang' => 'Prescription, fitting, and dispensing of contact lens',
            'deskripsi_pendek' => 'Perscr/fit/disp contacts',
          ),
          139 => 
          array (
            'kode' => '95.33',
            'deskripsi_panjang' => 'Dispensing of other low vision aids',
            'deskripsi_pendek' => 'Oth lo vision aid dispen',
          ),
          140 => 
          array (
            'kode' => '95.34',
            'deskripsi_panjang' => 'Ocular prosthetics',
            'deskripsi_pendek' => 'Ocular prosthetics',
          ),
          141 => 
          array (
            'kode' => '95.35',
            'deskripsi_panjang' => 'Orthoptic training',
            'deskripsi_pendek' => 'Orthoptic training',
          ),
          142 => 
          array (
            'kode' => '95.36',
            'deskripsi_panjang' => 'Ophthalmologic counseling and instruction',
            'deskripsi_pendek' => 'Ophth counsel & instruct',
          ),
          143 => 
          array (
            'kode' => '95.41',
            'deskripsi_panjang' => 'Audiometry',
            'deskripsi_pendek' => 'Audiometry',
          ),
          144 => 
          array (
            'kode' => '95.42',
            'deskripsi_panjang' => 'Clinical test of hearing',
            'deskripsi_pendek' => 'Clinical hearing test',
          ),
          145 => 
          array (
            'kode' => '95.43',
            'deskripsi_panjang' => 'Audiological evaluation',
            'deskripsi_pendek' => 'Audiological evaluation',
          ),
          146 => 
          array (
            'kode' => '95.44',
            'deskripsi_panjang' => 'Clinical vestibular function tests',
            'deskripsi_pendek' => 'Clin vestibul funct test',
          ),
          147 => 
          array (
            'kode' => '95.45',
            'deskripsi_panjang' => 'Rotation tests',
            'deskripsi_pendek' => 'Rotation tests',
          ),
          148 => 
          array (
            'kode' => '95.46',
            'deskripsi_panjang' => 'Other auditory and vestibular function tests',
            'deskripsi_pendek' => 'Audit & vestib test NEC',
          ),
          149 => 
          array (
            'kode' => '95.47',
            'deskripsi_panjang' => 'Hearing examination, not otherwise specified',
            'deskripsi_pendek' => 'Hearing examination NOS',
          ),
          150 => 
          array (
            'kode' => '95.48',
            'deskripsi_panjang' => 'Fitting of hearing aid',
            'deskripsi_pendek' => 'Fitting of hearing aid',
          ),
          151 => 
          array (
            'kode' => '95.49',
            'deskripsi_panjang' => 'Other nonoperative procedures related to hearing',
            'deskripsi_pendek' => 'Non-op hearing proc NEC',
          ),
          152 => 
          array (
            'kode' => '96.01',
            'deskripsi_panjang' => 'Insertion of nasopharyngeal airway',
            'deskripsi_pendek' => 'Insert nasopharyn airway',
          ),
          153 => 
          array (
            'kode' => '96.02',
            'deskripsi_panjang' => 'Insertion of oropharyngeal airway',
            'deskripsi_pendek' => 'Insert oropharyn airway',
          ),
          154 => 
          array (
            'kode' => '96.03',
            'deskripsi_panjang' => 'Insertion of esophageal obturator airway',
            'deskripsi_pendek' => 'Insert esoph obtu airway',
          ),
          155 => 
          array (
            'kode' => '96.04',
            'deskripsi_panjang' => 'Insertion of endotracheal tube',
            'deskripsi_pendek' => 'Insert endotracheal tube',
          ),
          156 => 
          array (
            'kode' => '96.05',
            'deskripsi_panjang' => 'Other intubation of respiratory tract',
            'deskripsi_pendek' => 'Resp tract intubat NEC',
          ),
          157 => 
          array (
            'kode' => '96.06',
            'deskripsi_panjang' => 'Insertion of Sengstaken tube',
            'deskripsi_pendek' => 'Insert sengstaken tube',
          ),
          158 => 
          array (
            'kode' => '96.07',
            'deskripsi_panjang' => 'Insertion of other (naso-)gastric tube',
            'deskripsi_pendek' => 'Insert gastric tube NEC',
          ),
          159 => 
          array (
            'kode' => '96.08',
            'deskripsi_panjang' => 'Insertion of (naso-)intestinal tube',
            'deskripsi_pendek' => 'Insert intestinal tube',
          ),
          160 => 
          array (
            'kode' => '96.09',
            'deskripsi_panjang' => 'Insertion of rectal tube',
            'deskripsi_pendek' => 'Insert rectal tube',
          ),
          161 => 
          array (
            'kode' => '96.11',
            'deskripsi_panjang' => 'Packing of external auditory canal',
            'deskripsi_pendek' => 'Pack ext auditory canal',
          ),
          162 => 
          array (
            'kode' => '96.14',
            'deskripsi_panjang' => 'Vaginal packing',
            'deskripsi_pendek' => 'Vaginal packing',
          ),
          163 => 
          array (
            'kode' => '96.15',
            'deskripsi_panjang' => 'Insertion of vaginal mold',
            'deskripsi_pendek' => 'Vaginal mold insertion',
          ),
          164 => 
          array (
            'kode' => '96.16',
            'deskripsi_panjang' => 'Other vaginal dilation',
            'deskripsi_pendek' => 'Other vaginal dilation',
          ),
          165 => 
          array (
            'kode' => '96.17',
            'deskripsi_panjang' => 'Insertion of vaginal diaphragm',
            'deskripsi_pendek' => 'Vag diaphragm insertion',
          ),
          166 => 
          array (
            'kode' => '96.18',
            'deskripsi_panjang' => 'Insertion of other vaginal pessary',
            'deskripsi_pendek' => 'Oth vagin pessary insert',
          ),
          167 => 
          array (
            'kode' => '96.19',
            'deskripsi_panjang' => 'Rectal packing',
            'deskripsi_pendek' => 'Rectal packing',
          ),
          168 => 
          array (
            'kode' => '96.21',
            'deskripsi_panjang' => 'Dilation of frontonasal duct',
            'deskripsi_pendek' => 'Dilat frontonasal duct',
          ),
          169 => 
          array (
            'kode' => '96.22',
            'deskripsi_panjang' => 'Dilation of rectum',
            'deskripsi_pendek' => 'Dilation of rectum',
          ),
          170 => 
          array (
            'kode' => '96.23',
            'deskripsi_panjang' => 'Dilation of anal sphincter',
            'deskripsi_pendek' => 'Dilation anal sphincter',
          ),
          171 => 
          array (
            'kode' => '96.24',
            'deskripsi_panjang' => 'Dilation and manipulation of enterostomy stoma',
            'deskripsi_pendek' => 'Dilat enterostomy stoma',
          ),
          172 => 
          array (
            'kode' => '96.25',
            'deskripsi_panjang' => 'Therapeutic distention of bladder',
            'deskripsi_pendek' => 'Therapeut distent bladd',
          ),
          173 => 
          array (
            'kode' => '96.26',
            'deskripsi_panjang' => 'Manual reduction of rectal prolapse',
            'deskripsi_pendek' => 'Manual reduc rect prolap',
          ),
          174 => 
          array (
            'kode' => '96.27',
            'deskripsi_panjang' => 'Manual reduction of hernia',
            'deskripsi_pendek' => 'Manual reduction hernia',
          ),
          175 => 
          array (
            'kode' => '96.28',
            'deskripsi_panjang' => 'Manual reduction of enterostomy prolapse',
            'deskripsi_pendek' => 'Manl reduct stoma prolap',
          ),
          176 => 
          array (
            'kode' => '96.29',
            'deskripsi_panjang' => 'Reduction of intussusception of alimentary tract',
            'deskripsi_pendek' => 'Reduct intuss ali tract',
          ),
          177 => 
          array (
            'kode' => '96.31',
            'deskripsi_panjang' => 'Gastric cooling',
            'deskripsi_pendek' => 'Gastric cooling',
          ),
          178 => 
          array (
            'kode' => '96.32',
            'deskripsi_panjang' => 'Gastric freezing',
            'deskripsi_pendek' => 'Gastric freezing',
          ),
          179 => 
          array (
            'kode' => '96.33',
            'deskripsi_panjang' => 'Gastric lavage',
            'deskripsi_pendek' => 'Gastric lavage',
          ),
          180 => 
          array (
            'kode' => '96.34',
            'deskripsi_panjang' => 'Other irrigation of (naso-)gastric tube',
            'deskripsi_pendek' => 'Gastric tube irrigat NEC',
          ),
          181 => 
          array (
            'kode' => '96.35',
            'deskripsi_panjang' => 'Gastric gavage',
            'deskripsi_pendek' => 'Gastric gavage',
          ),
          182 => 
          array (
            'kode' => '96.36',
            'deskripsi_panjang' => 'Irrigation of gastrostomy or enterostomy',
            'deskripsi_pendek' => 'GI ostomy irrigation',
          ),
          183 => 
          array (
            'kode' => '96.37',
            'deskripsi_panjang' => 'Proctoclysis',
            'deskripsi_pendek' => 'Proctoclysis',
          ),
          184 => 
          array (
            'kode' => '96.38',
            'deskripsi_panjang' => 'Removal of impacted feces',
            'deskripsi_pendek' => 'Impacted feces removal',
          ),
          185 => 
          array (
            'kode' => '96.39',
            'deskripsi_panjang' => 'Other transanal enema',
            'deskripsi_pendek' => 'Other transanal enema',
          ),
          186 => 
          array (
            'kode' => '96.41',
            'deskripsi_panjang' => 'Irrigation of cholecystostomy and other biliary tube',
            'deskripsi_pendek' => 'Biliary tube irrigation',
          ),
          187 => 
          array (
            'kode' => '96.42',
            'deskripsi_panjang' => 'Irrigation of pancreatic tube',
            'deskripsi_pendek' => 'Pancreatic tube irrigat',
          ),
          188 => 
          array (
            'kode' => '96.43',
            'deskripsi_panjang' => 'Digestive tract instillation, except gastric gavage',
            'deskripsi_pendek' => 'GI tract instillat NEC',
          ),
          189 => 
          array (
            'kode' => '96.44',
            'deskripsi_panjang' => 'Vaginal douche',
            'deskripsi_pendek' => 'Vaginal douche',
          ),
          190 => 
          array (
            'kode' => '96.45',
            'deskripsi_panjang' => 'Irrigation of nephrostomy and pyelostomy',
            'deskripsi_pendek' => 'Nephrost/pyelost irrigat',
          ),
          191 => 
          array (
            'kode' => '96.46',
            'deskripsi_panjang' => 'Irrigation of ureterostomy and ureteral catheter',
            'deskripsi_pendek' => 'Urterost/urete cth irrig',
          ),
          192 => 
          array (
            'kode' => '96.47',
            'deskripsi_panjang' => 'Irrigation of cystostomy',
            'deskripsi_pendek' => 'Cystostomy irrigation',
          ),
          193 => 
          array (
            'kode' => '96.48',
            'deskripsi_panjang' => 'Irrigation of other indwelling urinary catheter',
            'deskripsi_pendek' => 'Indwell cath irrig NEC',
          ),
          194 => 
          array (
            'kode' => '96.49',
            'deskripsi_panjang' => 'Other genitourinary instillation',
            'deskripsi_pendek' => 'Other gu instillation',
          ),
          195 => 
          array (
            'kode' => '96.51',
            'deskripsi_panjang' => 'Irrigation of eye',
            'deskripsi_pendek' => 'Irrigation of eye',
          ),
          196 => 
          array (
            'kode' => '96.52',
            'deskripsi_panjang' => 'Irrigation of ear',
            'deskripsi_pendek' => 'Irrigation of ear',
          ),
          197 => 
          array (
            'kode' => '96.53',
            'deskripsi_panjang' => 'Irrigation of nasal passages',
            'deskripsi_pendek' => 'Irrigation of nasal pass',
          ),
          198 => 
          array (
            'kode' => '96.54',
            'deskripsi_panjang' => 'Dental scaling, polishing, and debridement',
            'deskripsi_pendek' => 'Dental scaling & debride',
          ),
          199 => 
          array (
            'kode' => '96.55',
            'deskripsi_panjang' => 'Tracheostomy toilette',
            'deskripsi_pendek' => 'Tracheostomy toilette',
          ),
          200 => 
          array (
            'kode' => '96.56',
            'deskripsi_panjang' => 'Other lavage of bronchus and trachea',
            'deskripsi_pendek' => 'Bronch/trach lavage NEC',
          ),
          201 => 
          array (
            'kode' => '96.57',
            'deskripsi_panjang' => 'Irrigation of vascular catheter',
            'deskripsi_pendek' => 'Vascular cath irrigation',
          ),
          202 => 
          array (
            'kode' => '96.58',
            'deskripsi_panjang' => 'Irrigation of wound catheter',
            'deskripsi_pendek' => 'Wound catheter irrigat',
          ),
          203 => 
          array (
            'kode' => '96.59',
            'deskripsi_panjang' => 'Other irrigation of wound',
            'deskripsi_pendek' => 'Wound irrigation NEC',
          ),
          204 => 
          array (
            'kode' => '96.6',
            'deskripsi_panjang' => 'Enteral infusion of concentrated nutritional substances',
            'deskripsi_pendek' => 'Entral infus nutrit sub',
          ),
          205 => 
          array (
            'kode' => '96.70',
            'deskripsi_panjang' => 'Continuous invasive mechanical ventilation of unspecified duration',
            'deskripsi_pendek' => 'Con inv mec ven-unsp dur',
          ),
          206 => 
          array (
            'kode' => '96.71',
            'deskripsi_panjang' => 'Continuous invasive mechanical ventilation for less than 96 consecutive hours',
            'deskripsi_pendek' => 'Cont inv mec ven <96 hrs',
          ),
          207 => 
          array (
            'kode' => '96.72',
            'deskripsi_panjang' => 'Continuous invasive mechanical ventilation for 96 consecutive hours or more',
            'deskripsi_pendek' => 'Cont inv mec ven 96+ hrs',
          ),
          208 => 
          array (
            'kode' => '97.01',
            'deskripsi_panjang' => 'Replacement of (naso-)gastric or esophagostomy tube',
            'deskripsi_pendek' => 'Replace gast/esoph tube',
          ),
          209 => 
          array (
            'kode' => '97.02',
            'deskripsi_panjang' => 'Replacement of gastrostomy tube',
            'deskripsi_pendek' => 'Replace gastrostomy tube',
          ),
          210 => 
          array (
            'kode' => '97.03',
            'deskripsi_panjang' => 'Replacement of tube or enterostomy device of small intestine',
            'deskripsi_pendek' => 'Replace small bowel tube',
          ),
          211 => 
          array (
            'kode' => '97.04',
            'deskripsi_panjang' => 'Replacement of tube or enterostomy device of large intestine',
            'deskripsi_pendek' => 'Replace large bowel tube',
          ),
          212 => 
          array (
            'kode' => '97.05',
            'deskripsi_panjang' => 'Replacement of stent (tube) in biliary or pancreatic duct',
            'deskripsi_pendek' => 'Repl stent in bile duct',
          ),
          213 => 
          array (
            'kode' => '97.11',
            'deskripsi_panjang' => 'Replacement of cast on upper limb',
            'deskripsi_pendek' => 'Replace upper limb cast',
          ),
          214 => 
          array (
            'kode' => '97.12',
            'deskripsi_panjang' => 'Replacement of cast on lower limb',
            'deskripsi_pendek' => 'Replace lower limb cast',
          ),
          215 => 
          array (
            'kode' => '97.13',
            'deskripsi_panjang' => 'Replacement of other cast',
            'deskripsi_pendek' => 'Replace cast NEC',
          ),
          216 => 
          array (
            'kode' => '97.14',
            'deskripsi_panjang' => 'Replacement of other device for musculoskeletal immobilization',
            'deskripsi_pendek' => 'Replac m/s immob dev NEC',
          ),
          217 => 
          array (
            'kode' => '97.15',
            'deskripsi_panjang' => 'Replacement of wound catheter',
            'deskripsi_pendek' => 'Replace wound catheter',
          ),
          218 => 
          array (
            'kode' => '97.16',
            'deskripsi_panjang' => 'Replacement of wound packing or drain',
            'deskripsi_pendek' => 'Replace wound pack/drain',
          ),
          219 => 
          array (
            'kode' => '97.21',
            'deskripsi_panjang' => 'Replacement of nasal packing',
            'deskripsi_pendek' => 'Replace nasal packing',
          ),
          220 => 
          array (
            'kode' => '97.22',
            'deskripsi_panjang' => 'Replacement of dental packing',
            'deskripsi_pendek' => 'Replace dental packing',
          ),
          221 => 
          array (
            'kode' => '97.23',
            'deskripsi_panjang' => 'Replacement of tracheostomy tube',
            'deskripsi_pendek' => 'Replace trach tube',
          ),
          222 => 
          array (
            'kode' => '97.24',
            'deskripsi_panjang' => 'Replacement and refitting of vaginal diaphragm',
            'deskripsi_pendek' => 'Replace vag diaphragm',
          ),
          223 => 
          array (
            'kode' => '97.25',
            'deskripsi_panjang' => 'Replacement of other vaginal pessary',
            'deskripsi_pendek' => 'Replace vaginal pessary',
          ),
          224 => 
          array (
            'kode' => '97.26',
            'deskripsi_panjang' => 'Replacement of vaginal or vulvar packing or drain',
            'deskripsi_pendek' => 'Replace vag/vulv packing',
          ),
          225 => 
          array (
            'kode' => '97.29',
            'deskripsi_panjang' => 'Other nonoperative replacements',
            'deskripsi_pendek' => 'Non-op replacement NEC',
          ),
          226 => 
          array (
            'kode' => '97.31',
            'deskripsi_panjang' => 'Removal of eye prosthesis',
            'deskripsi_pendek' => 'Remove eye prosthesis',
          ),
          227 => 
          array (
            'kode' => '97.32',
            'deskripsi_panjang' => 'Removal of nasal packing',
            'deskripsi_pendek' => 'Remove nasal packing',
          ),
          228 => 
          array (
            'kode' => '97.33',
            'deskripsi_panjang' => 'Removal of dental wiring',
            'deskripsi_pendek' => 'Remove dental wiring',
          ),
          229 => 
          array (
            'kode' => '97.34',
            'deskripsi_panjang' => 'Removal of dental packing',
            'deskripsi_pendek' => 'Remove dental packing',
          ),
          230 => 
          array (
            'kode' => '97.35',
            'deskripsi_panjang' => 'Removal of dental prosthesis',
            'deskripsi_pendek' => 'Remove dental prosthesis',
          ),
          231 => 
          array (
            'kode' => '97.36',
            'deskripsi_panjang' => 'Removal of other external mandibular fixation device',
            'deskripsi_pendek' => 'Remove ext mand fix dev',
          ),
          232 => 
          array (
            'kode' => '97.37',
            'deskripsi_panjang' => 'Removal of tracheostomy tube',
            'deskripsi_pendek' => 'Remove tracheostomy tube',
          ),
          233 => 
          array (
            'kode' => '97.38',
            'deskripsi_panjang' => 'Removal of sutures from head and neck',
            'deskripsi_pendek' => 'Remove head/neck sutures',
          ),
          234 => 
          array (
            'kode' => '97.39',
            'deskripsi_panjang' => 'Removal of other therapeutic device from head and neck',
            'deskripsi_pendek' => 'Remove head/neck dev NEC',
          ),
          235 => 
          array (
            'kode' => '97.41',
            'deskripsi_panjang' => 'Removal of thoracotomy tube or pleural cavity drain',
            'deskripsi_pendek' => 'Remov thoracotomy tube',
          ),
          236 => 
          array (
            'kode' => '97.42',
            'deskripsi_panjang' => 'Removal of mediastinal drain',
            'deskripsi_pendek' => 'Remov mediastinal drain',
          ),
          237 => 
          array (
            'kode' => '97.43',
            'deskripsi_panjang' => 'Removal of sutures from thorax',
            'deskripsi_pendek' => 'Remov thorax sutures',
          ),
          238 => 
          array (
            'kode' => '97.44',
            'deskripsi_panjang' => 'Nonoperative removal of heart assist system',
            'deskripsi_pendek' => 'Nonop remov hrt asst sys',
          ),
          239 => 
          array (
            'kode' => '97.49',
            'deskripsi_panjang' => 'Removal of other device from thorax',
            'deskripsi_pendek' => 'Remov thor ther dev NEC',
          ),
          240 => 
          array (
            'kode' => '97.51',
            'deskripsi_panjang' => 'Removal of gastrostomy tube',
            'deskripsi_pendek' => 'Remov gastrostomy tube',
          ),
          241 => 
          array (
            'kode' => '97.52',
            'deskripsi_panjang' => 'Removal of tube from small intestine',
            'deskripsi_pendek' => 'Remov small bowel tube',
          ),
          242 => 
          array (
            'kode' => '97.53',
            'deskripsi_panjang' => 'Removal of tube from large intestine or appendix',
            'deskripsi_pendek' => 'Remov large bowel tube',
          ),
          243 => 
          array (
            'kode' => '97.54',
            'deskripsi_panjang' => 'Removal of cholecystostomy tube',
            'deskripsi_pendek' => 'Remov cholecystost tube',
          ),
          244 => 
          array (
            'kode' => '97.55',
            'deskripsi_panjang' => 'Removal of T-tube, other bile duct tube, or liver tube',
            'deskripsi_pendek' => 'Remov biliary/liver tube',
          ),
          245 => 
          array (
            'kode' => '97.56',
            'deskripsi_panjang' => 'Removal of pancreatic tube or drain',
            'deskripsi_pendek' => 'Remov pancreatic tube',
          ),
          246 => 
          array (
            'kode' => '97.59',
            'deskripsi_panjang' => 'Removal of other device from digestive system',
            'deskripsi_pendek' => 'Remov other GI device',
          ),
          247 => 
          array (
            'kode' => '97.61',
            'deskripsi_panjang' => 'Removal of pyelostomy and nephrostomy tube',
            'deskripsi_pendek' => 'Remov pyelos/nephros tub',
          ),
          248 => 
          array (
            'kode' => '97.62',
            'deskripsi_panjang' => 'Removal of ureterostomy tube and ureteral catheter',
            'deskripsi_pendek' => 'Remov ureteral drain',
          ),
          249 => 
          array (
            'kode' => '97.63',
            'deskripsi_panjang' => 'Removal of cystostomy tube',
            'deskripsi_pendek' => 'Remov cystostomy tube',
          ),
          250 => 
          array (
            'kode' => '97.64',
            'deskripsi_panjang' => 'Removal of other urinary drainage device',
            'deskripsi_pendek' => 'Remov urin drainage NEC',
          ),
          251 => 
          array (
            'kode' => '97.65',
            'deskripsi_panjang' => 'Removal of urethral stent',
            'deskripsi_pendek' => 'Remov urethral stent',
          ),
          252 => 
          array (
            'kode' => '97.69',
            'deskripsi_panjang' => 'Removal of other device from urinary system',
            'deskripsi_pendek' => 'Remov other urin device',
          ),
          253 => 
          array (
            'kode' => '97.71',
            'deskripsi_panjang' => 'Removal of intrauterine contraceptive device',
            'deskripsi_pendek' => 'Removal iud',
          ),
          254 => 
          array (
            'kode' => '97.72',
            'deskripsi_panjang' => 'Removal of intrauterine pack',
            'deskripsi_pendek' => 'Remov intrauterine pack',
          ),
          255 => 
          array (
            'kode' => '97.73',
            'deskripsi_panjang' => 'Removal of vaginal diaphragm',
            'deskripsi_pendek' => 'Remov vaginal diaphragm',
          ),
          256 => 
          array (
            'kode' => '97.74',
            'deskripsi_panjang' => 'Removal of other vaginal pessary',
            'deskripsi_pendek' => 'Removal oth vag pessary',
          ),
          257 => 
          array (
            'kode' => '97.75',
            'deskripsi_panjang' => 'Removal of vaginal or vulvar packing',
            'deskripsi_pendek' => 'Remov vag/vulv packing',
          ),
          258 => 
          array (
            'kode' => '97.79',
            'deskripsi_panjang' => 'Removal of other device from genital tract',
            'deskripsi_pendek' => 'Remov other genit device',
          ),
          259 => 
          array (
            'kode' => '97.81',
            'deskripsi_panjang' => 'Removal of retroperitoneal drainage device',
            'deskripsi_pendek' => 'Remov retroperiton drain',
          ),
          260 => 
          array (
            'kode' => '97.82',
            'deskripsi_panjang' => 'Removal of peritoneal drainage device',
            'deskripsi_pendek' => 'Remov peritoneal drain',
          ),
          261 => 
          array (
            'kode' => '97.83',
            'deskripsi_panjang' => 'Removal of abdominal wall sutures',
            'deskripsi_pendek' => 'Remov abdom wall suture',
          ),
          262 => 
          array (
            'kode' => '97.84',
            'deskripsi_panjang' => 'Removal of sutures from trunk, not elsewhere classified',
            'deskripsi_pendek' => 'Remov trunk suture NEC',
          ),
          263 => 
          array (
            'kode' => '97.85',
            'deskripsi_panjang' => 'Removal of packing from trunk, not elsewhere classified',
            'deskripsi_pendek' => 'Remov trunk packing NEC',
          ),
          264 => 
          array (
            'kode' => '97.86',
            'deskripsi_panjang' => 'Removal of other device from abdomen',
            'deskripsi_pendek' => 'Remov abdomen device NEC',
          ),
          265 => 
          array (
            'kode' => '97.87',
            'deskripsi_panjang' => 'Removal of other device from trunk',
            'deskripsi_pendek' => 'Remov trunk device NEC',
          ),
          266 => 
          array (
            'kode' => '97.88',
            'deskripsi_panjang' => 'Removal of external immobilization device',
            'deskripsi_pendek' => 'Remov ext immobilization',
          ),
          267 => 
          array (
            'kode' => '97.89',
            'deskripsi_panjang' => 'Removal of other therapeutic device',
            'deskripsi_pendek' => 'Remov therapeut dev NEC',
          ),
          268 => 
          array (
            'kode' => '98.01',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from mouth without incision',
            'deskripsi_pendek' => 'Remov intralum mouth FB',
          ),
          269 => 
          array (
            'kode' => '98.02',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from esophagus without incision',
            'deskripsi_pendek' => 'Remov intralum esoph FB',
          ),
          270 => 
          array (
            'kode' => '98.03',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from stomach and small intestine without incision',
            'deskripsi_pendek' => 'Remov intralum gastr FB',
          ),
          271 => 
          array (
            'kode' => '98.04',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from large intestine without incision',
            'deskripsi_pendek' => 'Remov intralum colon FB',
          ),
          272 => 
          array (
            'kode' => '98.05',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from rectum and anus without incision',
            'deskripsi_pendek' => 'Remov intralum rect FB',
          ),
          273 => 
          array (
            'kode' => '98.11',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from ear without incision',
            'deskripsi_pendek' => 'Remov intralum ear FB',
          ),
          274 => 
          array (
            'kode' => '98.12',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from nose without incision',
            'deskripsi_pendek' => 'Remov intralum nose FB',
          ),
          275 => 
          array (
            'kode' => '98.13',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from pharynx without incision',
            'deskripsi_pendek' => 'Remov intralum pharyn FB',
          ),
          276 => 
          array (
            'kode' => '98.14',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from larynx without incision',
            'deskripsi_pendek' => 'Remov intralum laryn FB',
          ),
          277 => 
          array (
            'kode' => '98.15',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from trachea and bronchus without incision',
            'deskripsi_pendek' => 'Remov intralum trach FB',
          ),
          278 => 
          array (
            'kode' => '98.16',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from uterus without incision',
            'deskripsi_pendek' => 'Remov intralum uter FB',
          ),
          279 => 
          array (
            'kode' => '98.17',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from vagina without incision',
            'deskripsi_pendek' => 'Remov intralum vag FB',
          ),
          280 => 
          array (
            'kode' => '98.18',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from artificial stoma without incision',
            'deskripsi_pendek' => 'Remov intralum stoma FB',
          ),
          281 => 
          array (
            'kode' => '98.19',
            'deskripsi_panjang' => 'Removal of intraluminal foreign body from urethra without incision',
            'deskripsi_pendek' => 'Remove intralum ureth FB',
          ),
          282 => 
          array (
            'kode' => '98.20',
            'deskripsi_panjang' => 'Removal of foreign body, not otherwise specified',
            'deskripsi_pendek' => 'Removal of FB NOS',
          ),
          283 => 
          array (
            'kode' => '98.21',
            'deskripsi_panjang' => 'Removal of superficial foreign body from eye without incision',
            'deskripsi_pendek' => 'Removal superfic FB eye',
          ),
          284 => 
          array (
            'kode' => '98.22',
            'deskripsi_panjang' => 'Removal of other foreign body without incision from head and neck',
            'deskripsi_pendek' => 'Removal head/neck FB',
          ),
          285 => 
          array (
            'kode' => '98.23',
            'deskripsi_panjang' => 'Removal of foreign body from vulva without incision',
            'deskripsi_pendek' => 'Removal vulvar FB',
          ),
          286 => 
          array (
            'kode' => '98.24',
            'deskripsi_panjang' => 'Removal of foreign body from scrotum or penis without incision',
            'deskripsi_pendek' => 'Removal scrotal/penis FB',
          ),
          287 => 
          array (
            'kode' => '98.25',
            'deskripsi_panjang' => 'Removal of other foreign body without incision from trunk except scrotum, penis, or vulva',
            'deskripsi_pendek' => 'Removal trunk FB NEC',
          ),
          288 => 
          array (
            'kode' => '98.26',
            'deskripsi_panjang' => 'Removal of foreign body from hand without incision',
            'deskripsi_pendek' => 'Removal FB from hand',
          ),
          289 => 
          array (
            'kode' => '98.27',
            'deskripsi_panjang' => 'Removal of foreign body without incision from upper limb, except hand',
            'deskripsi_pendek' => 'Removal FB from arm',
          ),
          290 => 
          array (
            'kode' => '98.28',
            'deskripsi_panjang' => 'Removal of foreign body from foot without incision',
            'deskripsi_pendek' => 'Removal FB from foot',
          ),
          291 => 
          array (
            'kode' => '98.29',
            'deskripsi_panjang' => 'Removal of foreign body without incision from lower limb, except foot',
            'deskripsi_pendek' => 'Removal FB from leg',
          ),
          292 => 
          array (
            'kode' => '98.51',
            'deskripsi_panjang' => 'Extracorporeal shockwave lithotripsy [ESWL] of the kidney, ureter and/or bladder',
            'deskripsi_pendek' => 'Eswl kid/ureter/bladder',
          ),
          293 => 
          array (
            'kode' => '98.52',
            'deskripsi_panjang' => 'Extracorporeal shockwave lithotripsy [ESWL] of the gallbladder and/or bile duct',
            'deskripsi_pendek' => 'Eswl gb/bile duct',
          ),
          294 => 
          array (
            'kode' => '98.59',
            'deskripsi_panjang' => 'Extracorporeal shockwave lithotripsy of other sites',
            'deskripsi_pendek' => 'Eswl other sites',
          ),
          295 => 
          array (
            'kode' => '99.00',
            'deskripsi_panjang' => 'Perioperative autologous transfusion of whole blood or blood components',
            'deskripsi_pendek' => 'Periop aut trans hol bld',
          ),
          296 => 
          array (
            'kode' => '99.01',
            'deskripsi_panjang' => 'Exchange transfusion',
            'deskripsi_pendek' => 'Exchange transfusion',
          ),
          297 => 
          array (
            'kode' => '99.02',
            'deskripsi_panjang' => 'Transfusion of previously collected autologous blood',
            'deskripsi_pendek' => 'Transfus prev auto blood',
          ),
          298 => 
          array (
            'kode' => '99.03',
            'deskripsi_panjang' => 'Other transfusion of whole blood',
            'deskripsi_pendek' => 'Whole blood transfus NEC',
          ),
          299 => 
          array (
            'kode' => '99.04',
            'deskripsi_panjang' => 'Transfusion of packed cells',
            'deskripsi_pendek' => 'Packed cell transfusion',
          ),
          300 => 
          array (
            'kode' => '99.05',
            'deskripsi_panjang' => 'Transfusion of platelets',
            'deskripsi_pendek' => 'Platelet transfusion',
          ),
          301 => 
          array (
            'kode' => '99.06',
            'deskripsi_panjang' => 'Transfusion of coagulation factors',
            'deskripsi_pendek' => 'Coag factor transfusion',
          ),
          302 => 
          array (
            'kode' => '99.07',
            'deskripsi_panjang' => 'Transfusion of other serum',
            'deskripsi_pendek' => 'Serum transfusion NEC',
          ),
          303 => 
          array (
            'kode' => '99.08',
            'deskripsi_panjang' => 'Transfusion of blood expander',
            'deskripsi_pendek' => 'Blood expander transfus',
          ),
          304 => 
          array (
            'kode' => '99.09',
            'deskripsi_panjang' => 'Transfusion of other substance',
            'deskripsi_pendek' => 'Transfusion NEC',
          ),
          305 => 
          array (
            'kode' => '99.10',
            'deskripsi_panjang' => 'Injection or infusion of thrombolytic agent',
            'deskripsi_pendek' => 'Inject/inf thrombo agent',
          ),
          306 => 
          array (
            'kode' => '99.11',
            'deskripsi_panjang' => 'Injection of Rh immune globulin',
            'deskripsi_pendek' => 'Inject rh immune globul',
          ),
          307 => 
          array (
            'kode' => '99.12',
            'deskripsi_panjang' => 'Immunization for allergy',
            'deskripsi_pendek' => 'Allergy immunization',
          ),
          308 => 
          array (
            'kode' => '99.13',
            'deskripsi_panjang' => 'Immunization for autoimmune disease',
            'deskripsi_pendek' => 'Autoimmune dis immunizat',
          ),
          309 => 
          array (
            'kode' => '99.14',
            'deskripsi_panjang' => 'Injection or infusion of immunoglobulin',
            'deskripsi_pendek' => 'Injct/inf immunoglobulin',
          ),
          310 => 
          array (
            'kode' => '99.15',
            'deskripsi_panjang' => 'Parenteral infusion of concentrated nutritional substances',
            'deskripsi_pendek' => 'Parent infus nutrit sub',
          ),
          311 => 
          array (
            'kode' => '99.16',
            'deskripsi_panjang' => 'Injection of antidote',
            'deskripsi_pendek' => 'Inject antidote',
          ),
          312 => 
          array (
            'kode' => '99.17',
            'deskripsi_panjang' => 'Injection of insulin',
            'deskripsi_pendek' => 'Inject insulin',
          ),
          313 => 
          array (
            'kode' => '99.18',
            'deskripsi_panjang' => 'Injection or infusion of electrolytes',
            'deskripsi_pendek' => 'Inject/infuse electrolyt',
          ),
          314 => 
          array (
            'kode' => '99.19',
            'deskripsi_panjang' => 'Injection of anticoagulant',
            'deskripsi_pendek' => 'Inject anticoagulant',
          ),
          315 => 
          array (
            'kode' => '99.20',
            'deskripsi_panjang' => 'Injection or infusion of platelet inhibitor',
            'deskripsi_pendek' => 'Inj/inf platelet inhibit',
          ),
          316 => 
          array (
            'kode' => '99.21',
            'deskripsi_panjang' => 'Injection of antibiotic',
            'deskripsi_pendek' => 'Inject antibiotic',
          ),
          317 => 
          array (
            'kode' => '99.22',
            'deskripsi_panjang' => 'Injection of other anti-infective',
            'deskripsi_pendek' => 'Inject anti-infect NEC',
          ),
          318 => 
          array (
            'kode' => '99.23',
            'deskripsi_panjang' => 'Injection of steroid',
            'deskripsi_pendek' => 'Inject steroid',
          ),
          319 => 
          array (
            'kode' => '99.24',
            'deskripsi_panjang' => 'Injection of other hormone',
            'deskripsi_pendek' => 'Inject hormone NEC',
          ),
          320 => 
          array (
            'kode' => '99.25',
            'deskripsi_panjang' => 'Injection or infusion of cancer chemotherapeutic substance',
            'deskripsi_pendek' => 'Inject ca chemother NEC',
          ),
          321 => 
          array (
            'kode' => '99.26',
            'deskripsi_panjang' => 'Injection of tranquilizer',
            'deskripsi_pendek' => 'Inject tranquilizer',
          ),
          322 => 
          array (
            'kode' => '99.27',
            'deskripsi_panjang' => 'Iontophoresis',
            'deskripsi_pendek' => 'Iontophoresis',
          ),
          323 => 
          array (
            'kode' => '99.28',
            'deskripsi_panjang' => 'Injection or infusion of biological response modifier [BRM] as an antineoplastic agent',
            'deskripsi_pendek' => 'Immunotherapy as antineo',
          ),
          324 => 
          array (
            'kode' => '99.29',
            'deskripsi_panjang' => 'Injection or infusion of other therapeutic or prophylactic substance',
            'deskripsi_pendek' => 'Inject/infuse NEC',
          ),
          325 => 
          array (
            'kode' => '99.31',
            'deskripsi_panjang' => 'Vaccination against cholera',
            'deskripsi_pendek' => 'Cholera vaccination',
          ),
          326 => 
          array (
            'kode' => '99.32',
            'deskripsi_panjang' => 'Vaccination against typhoid and paratyphoid fever',
            'deskripsi_pendek' => 'Typhoid/paratyphoid vacc',
          ),
          327 => 
          array (
            'kode' => '99.33',
            'deskripsi_panjang' => 'Vaccination against tuberculosis',
            'deskripsi_pendek' => 'Tuberculosis vaccination',
          ),
          328 => 
          array (
            'kode' => '99.34',
            'deskripsi_panjang' => 'Vaccination against plague',
            'deskripsi_pendek' => 'Plague vaccination',
          ),
          329 => 
          array (
            'kode' => '99.35',
            'deskripsi_panjang' => 'Vaccination against tularemia',
            'deskripsi_pendek' => 'Tularemia vaccination',
          ),
          330 => 
          array (
            'kode' => '99.36',
            'deskripsi_panjang' => 'Administration of diphtheria toxoid',
            'deskripsi_pendek' => 'Diphtheria toxoid admin',
          ),
          331 => 
          array (
            'kode' => '99.37',
            'deskripsi_panjang' => 'Vaccination against pertussis',
            'deskripsi_pendek' => 'Pertussis vaccination',
          ),
          332 => 
          array (
            'kode' => '99.38',
            'deskripsi_panjang' => 'Administration of tetanus toxoid',
            'deskripsi_pendek' => 'Tetanus toxoid administ',
          ),
          333 => 
          array (
            'kode' => '99.39',
            'deskripsi_panjang' => 'Administration of diphtheria-tetanus-pertussis, combined',
            'deskripsi_pendek' => 'Dpt administration',
          ),
          334 => 
          array (
            'kode' => '99.41',
            'deskripsi_panjang' => 'Administration of poliomyelitis vaccine',
            'deskripsi_pendek' => 'Polio vaccine administra',
          ),
          335 => 
          array (
            'kode' => '99.42',
            'deskripsi_panjang' => 'Vaccination against smallpox',
            'deskripsi_pendek' => 'Smallpox vaccination',
          ),
          336 => 
          array (
            'kode' => '99.43',
            'deskripsi_panjang' => 'Vaccination against yellow fever',
            'deskripsi_pendek' => 'Yellow fever vaccination',
          ),
          337 => 
          array (
            'kode' => '99.44',
            'deskripsi_panjang' => 'Vaccination against rabies',
            'deskripsi_pendek' => 'Rabies vaccination',
          ),
          338 => 
          array (
            'kode' => '99.45',
            'deskripsi_panjang' => 'Vaccination against measles',
            'deskripsi_pendek' => 'Measles vaccination',
          ),
          339 => 
          array (
            'kode' => '99.46',
            'deskripsi_panjang' => 'Vaccination against mumps',
            'deskripsi_pendek' => 'Mumps vaccination',
          ),
          340 => 
          array (
            'kode' => '99.47',
            'deskripsi_panjang' => 'Vaccination against rubella',
            'deskripsi_pendek' => 'Rubella vaccination',
          ),
          341 => 
          array (
            'kode' => '99.48',
            'deskripsi_panjang' => 'Administration of measles-mumps-rubella vaccine',
            'deskripsi_pendek' => 'Mmr administration',
          ),
          342 => 
          array (
            'kode' => '99.51',
            'deskripsi_panjang' => 'Prophylactic vaccination against the common cold',
            'deskripsi_pendek' => 'Common cold vaccination',
          ),
          343 => 
          array (
            'kode' => '99.52',
            'deskripsi_panjang' => 'Prophylactic vaccination against influenza',
            'deskripsi_pendek' => 'Influenza vaccination',
          ),
          344 => 
          array (
            'kode' => '99.53',
            'deskripsi_panjang' => 'Prophylactic vaccination against arthropod-borne viral encephalitis',
            'deskripsi_pendek' => 'Arbovirus enceph vaccin',
          ),
          345 => 
          array (
            'kode' => '99.54',
            'deskripsi_panjang' => 'Prophylactic vaccination against other arthropod-borne viral diseases',
            'deskripsi_pendek' => 'Arbovirus vaccinat NEC',
          ),
          346 => 
          array (
            'kode' => '99.55',
            'deskripsi_panjang' => 'Prophylactic administration of vaccine against other diseases',
            'deskripsi_pendek' => 'Vaccination NEC',
          ),
          347 => 
          array (
            'kode' => '99.56',
            'deskripsi_panjang' => 'Administration of tetanus antitoxin',
            'deskripsi_pendek' => 'Tetanus antitoxin admini',
          ),
          348 => 
          array (
            'kode' => '99.57',
            'deskripsi_panjang' => 'Administration of botulism antitoxin',
            'deskripsi_pendek' => 'Botulism antitoxin admin',
          ),
          349 => 
          array (
            'kode' => '99.58',
            'deskripsi_panjang' => 'Administration of other antitoxins',
            'deskripsi_pendek' => 'Antitoxin administra NEC',
          ),
          350 => 
          array (
            'kode' => '99.59',
            'deskripsi_panjang' => 'Other vaccination and inoculation',
            'deskripsi_pendek' => 'Vaccination/innocula NEC',
          ),
          351 => 
          array (
            'kode' => '99.60',
            'deskripsi_panjang' => 'Cardiopulmonary resuscitation, not otherwise specified',
            'deskripsi_pendek' => 'Cardiopulm resuscita NOS',
          ),
          352 => 
          array (
            'kode' => '99.61',
            'deskripsi_panjang' => 'Atrial cardioversion',
            'deskripsi_pendek' => 'Atrial cardioversion',
          ),
          353 => 
          array (
            'kode' => '99.62',
            'deskripsi_panjang' => 'Other electric countershock of heart',
            'deskripsi_pendek' => 'Heart countershock NEC',
          ),
          354 => 
          array (
            'kode' => '99.63',
            'deskripsi_panjang' => 'Closed chest cardiac massage',
            'deskripsi_pendek' => 'Closed chest card massag',
          ),
          355 => 
          array (
            'kode' => '99.64',
            'deskripsi_panjang' => 'Carotid sinus stimulation',
            'deskripsi_pendek' => 'Carotid sinus stiumlat',
          ),
          356 => 
          array (
            'kode' => '99.69',
            'deskripsi_panjang' => 'Other conversion of cardiac rhythm',
            'deskripsi_pendek' => 'Cardiac rhythm conv NEC',
          ),
          357 => 
          array (
            'kode' => '99.71',
            'deskripsi_panjang' => 'Therapeutic plasmapheresis',
            'deskripsi_pendek' => 'Therapeu plasmapheresis',
          ),
          358 => 
          array (
            'kode' => '99.72',
            'deskripsi_panjang' => 'Therapeutic leukopheresis',
            'deskripsi_pendek' => 'Therapeutc leukopheresis',
          ),
          359 => 
          array (
            'kode' => '99.73',
            'deskripsi_panjang' => 'Therapeutic erythrocytapheresis',
            'deskripsi_pendek' => 'Therapeu erythropheresis',
          ),
          360 => 
          array (
            'kode' => '99.74',
            'deskripsi_panjang' => 'Therapeutic plateletpheresis',
            'deskripsi_pendek' => 'Therapeu plateltpheresis',
          ),
          361 => 
          array (
            'kode' => '99.75',
            'deskripsi_panjang' => 'Administration of neuroprotective agent',
            'deskripsi_pendek' => 'Adm neuroprotective agnt',
          ),
          362 => 
          array (
            'kode' => '99.76',
            'deskripsi_panjang' => 'Extracorporeal immunoadsorption',
            'deskripsi_pendek' => 'Extracorp immunoabsorpt',
          ),
          363 => 
          array (
            'kode' => '99.77',
            'deskripsi_panjang' => 'Application or administration of an adhesion barrier substance',
            'deskripsi_pendek' => 'App adhesion barrier sub',
          ),
          364 => 
          array (
            'kode' => '99.78',
            'deskripsi_panjang' => 'Aquapheresis',
            'deskripsi_pendek' => 'Aquapheresis',
          ),
          365 => 
          array (
            'kode' => '99.79',
            'deskripsi_panjang' => 'Other therapeutic apheresis',
            'deskripsi_pendek' => 'Other therapeu apheresis',
          ),
          366 => 
          array (
            'kode' => '99.81',
            'deskripsi_panjang' => 'Hypothermia (central) (local)',
            'deskripsi_pendek' => 'Hypothermia',
          ),
          367 => 
          array (
            'kode' => '99.82',
            'deskripsi_panjang' => 'Ultraviolet light therapy',
            'deskripsi_pendek' => 'Ultraviolet light therap',
          ),
          368 => 
          array (
            'kode' => '99.83',
            'deskripsi_panjang' => 'Other phototherapy',
            'deskripsi_pendek' => 'Other phototherapy',
          ),
          369 => 
          array (
            'kode' => '99.84',
            'deskripsi_panjang' => 'Isolation',
            'deskripsi_pendek' => 'Isolation',
          ),
          370 => 
          array (
            'kode' => '99.85',
            'deskripsi_panjang' => 'Hyperthermia for treatment of cancer',
            'deskripsi_pendek' => 'Hyperthermia ca therapy',
          ),
          371 => 
          array (
            'kode' => '99.86',
            'deskripsi_panjang' => 'Non-invasive placement of bone growth stimulator',
            'deskripsi_pendek' => 'Non-invasive bone stimul',
          ),
          372 => 
          array (
            'kode' => '99.88',
            'deskripsi_panjang' => 'Therapeutic photopheresis',
            'deskripsi_pendek' => 'Therapeutc photopheresis',
          ),
          373 => 
          array (
            'kode' => '99.91',
            'deskripsi_panjang' => 'Acupuncture for anesthesia',
            'deskripsi_pendek' => 'Anesthesia acupuncture',
          ),
          374 => 
          array (
            'kode' => '99.92',
            'deskripsi_panjang' => 'Other acupuncture',
            'deskripsi_pendek' => 'Other acupuncture',
          ),
          375 => 
          array (
            'kode' => '99.93',
            'deskripsi_panjang' => 'Rectal massage (for levator spasm)',
            'deskripsi_pendek' => 'Rectal massage',
          ),
          376 => 
          array (
            'kode' => '99.94',
            'deskripsi_panjang' => 'Prostatic massage',
            'deskripsi_pendek' => 'Prostatic massage',
          ),
          377 => 
          array (
            'kode' => '99.95',
            'deskripsi_panjang' => 'Stretching of foreskin',
            'deskripsi_pendek' => 'Stretching of foreskin',
          ),
          378 => 
          array (
            'kode' => '99.96',
            'deskripsi_panjang' => 'Collection of sperm for artificial insemination',
            'deskripsi_pendek' => 'Sperm collection',
          ),
          379 => 
          array (
            'kode' => '99.97',
            'deskripsi_panjang' => 'Fitting of denture',
            'deskripsi_pendek' => 'Denture fitting',
          ),
          380 => 
          array (
            'kode' => '99.98',
            'deskripsi_panjang' => 'Extraction of milk from lactating breast',
            'deskripsi_pendek' => 'Milk extraction',
          ),
          381 => 
          array (
            'kode' => '99.99',
            'deskripsi_panjang' => 'Other miscellaneous procedures',
            'deskripsi_pendek' => 'Miscellaneous proc NEC',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}