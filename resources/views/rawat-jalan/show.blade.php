@extends('layouts.app')

@section('title', 'Detail Data Rawat Jalan')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Detail Data Rawat Jalan</h3>
                    <div class="card-tools">
                        <a href="{{ route('rawat-jalan.index') }}" class="btn btn-secondary btn-sm">
                            <i class="fas fa-arrow-left"></i> Kembali
                        </a>
                        <a href="{{ route('rawat-jalan.edit', $rawatJalan->no_rawat) }}" class="btn btn-warning btn-sm">
                            <i class="fas fa-edit"></i> Edit
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Informasi Registrasi</h5>
                            <table class="table table-borderless">
                                <tr>
                                    <td width="40%"><strong>No. Rawat</strong></td>
                                    <td>: {{ $rawatJalan->no_rawat }}</td>
                                </tr>
                                <tr>
                                    <td><strong>No. Registrasi</strong></td>
                                    <td>: {{ $rawatJalan->no_reg ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal Registrasi</strong></td>
                                    <td>: {{ $rawatJalan->tgl_registrasi_formatted }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Jam Registrasi</strong></td>
                                    <td>: {{ $rawatJalan->jam_reg_formatted }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Kode Dokter</strong></td>
                                    <td>: {{ $rawatJalan->kd_dokter ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Kode Poli</strong></td>
                                    <td>: {{ $rawatJalan->kd_poli ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Kode Penjamin</strong></td>
                                    <td>: {{ $rawatJalan->kd_pj ?? '-' }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <h5>Status & Keputusan</h5>
                            <table class="table table-borderless">
                                <tr>
                                    <td width="40%"><strong>Status</strong></td>
                                    <td>: {!! $rawatJalan->status_badge !!}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status Daftar</strong></td>
                                    <td>: {{ $rawatJalan->stts_daftar ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status Lanjut</strong></td>
                                    <td>: {{ $rawatJalan->status_lanjut ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status Bayar</strong></td>
                                    <td>: 
                                        <span class="badge {{ $rawatJalan->status_bayar == 'Sudah Bayar' ? 'badge-success' : 'badge-warning' }}">
                                            {{ $rawatJalan->status_bayar ?? '-' }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Status Poli</strong></td>
                                    <td>: {{ $rawatJalan->status_poli ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Keputusan</strong></td>
                                    <td>: {{ $rawatJalan->keputusan ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Biaya Registrasi</strong></td>
                                    <td>: {{ $rawatJalan->biaya_reg ? 'Rp ' . number_format($rawatJalan->biaya_reg, 0, ',', '.') : '-' }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-md-6">
                            <h5>Informasi Pasien</h5>
                            @if($rawatJalan->patient)
                                <table class="table table-borderless">
                                    <tr>
                                        <td width="40%"><strong>No. RM</strong></td>
                                        <td>: {{ $rawatJalan->patient->no_rkm_medis }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Nama Pasien</strong></td>
                                        <td>: {{ $rawatJalan->patient->nm_pasien }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Jenis Kelamin</strong></td>
                                        <td>: {{ $rawatJalan->patient->jenis_kelamin_lengkap }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Tanggal Lahir</strong></td>
                                        <td>: {{ $rawatJalan->patient->tanggal_lahir_formatted }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Alamat</strong></td>
                                        <td>: {{ $rawatJalan->patient->alamat_lengkap }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>No. Telepon</strong></td>
                                        <td>: {{ $rawatJalan->patient->no_tlp ?? '-' }}</td>
                                    </tr>
                                </table>
                            @else
                                <p class="text-muted">Data pasien tidak ditemukan</p>
                            @endif
                        </div>
                        <div class="col-md-6">
                            <h5>Informasi Penanggung Jawab</h5>
                            <table class="table table-borderless">
                                <tr>
                                    <td width="40%"><strong>Nama Penanggung Jawab</strong></td>
                                    <td>: {{ $rawatJalan->p_jawab ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Hubungan</strong></td>
                                    <td>: {{ $rawatJalan->hubunganpj ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Alamat</strong></td>
                                    <td>: {{ $rawatJalan->almt_pj ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Umur Daftar</strong></td>
                                    <td>: {{ $rawatJalan->umurdaftar ?? '-' }} {{ $rawatJalan->sttsumur ?? '' }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-12">
                            <h5>Riwayat Rawat Jalan Pasien</h5>
                            @if($rawatJalan->patient && $rawatJalan->patient->rawatJalan->count() > 0)
                                <div class="table-responsive">
                                    <table class="table table-sm table-bordered">
                                        <thead>
                                            <tr>
                                                <th>No. Rawat</th>
                                                <th>Tanggal</th>
                                                <th>Jam</th>
                                                <th>Dokter</th>
                                                <th>Poli</th>
                                                <th>Status</th>
                                                <th>Status Bayar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($rawatJalan->patient->rawatJalan->take(5) as $riwayat)
                                                <tr class="{{ $riwayat->no_rawat == $rawatJalan->no_rawat ? 'table-primary' : '' }}">
                                                    <td>{{ $riwayat->no_rawat }}</td>
                                                    <td>{{ $riwayat->tgl_registrasi_formatted }}</td>
                                                    <td>{{ $riwayat->jam_reg_formatted }}</td>
                                                    <td>{{ $riwayat->kd_dokter ?? '-' }}</td>
                                                    <td>{{ $riwayat->kd_poli ?? '-' }}</td>
                                                    <td>{!! $riwayat->status_badge !!}</td>
                                                    <td>
                                                        <span class="badge {{ $riwayat->status_bayar == 'Sudah Bayar' ? 'badge-success' : 'badge-warning' }}">
                                                            {{ $riwayat->status_bayar }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                                @if($rawatJalan->patient->rawatJalan->count() > 5)
                                    <p class="text-muted">Menampilkan 5 data terbaru dari {{ $rawatJalan->patient->rawatJalan->count() }} total riwayat</p>
                                @endif
                            @else
                                <p class="text-muted">Tidak ada riwayat rawat jalan</p>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="{{ route('rawat-jalan.edit', $rawatJalan->no_rawat) }}" class="btn btn-warning">
                        <i class="fas fa-edit"></i> Edit Data
                    </a>
                    <form action="{{ route('rawat-jalan.destroy', $rawatJalan->no_rawat) }}" 
                          method="POST" style="display: inline-block;"
                          onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">
                            <i class="fas fa-trash"></i> Hapus Data
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
